import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './ProjectPost.css'

const projectPosts = {
  'bama-neuralinq': {
    title: 'Reverse Engineering the "Neuralinq" Malware',
    date: '2026-06-25',
    tags: ['reverse-engineering', 'malware-analysis', 'ghidra'],
    content: `
## Overview

My coursework for Binary and Malware Analysis at VU Amsterdam (grade 7.0): a chained reverse-engineering series against a fictional "Neuralinq" malware, where each challenge builds on the last. Below are the two challenges I wrote up in full.

## Challenge 1 — Syscall-level binary patching (Windows)

Two Windows processes talk to each other through a shared memory region (a \`Local\Handshake\` file mapping). Instead of a normal channel, they read and write each other's address space with ReadProcessMemory and WriteProcessMemory, exchanging short messages. The host asks a question, the guest answers, and a wrong answer eventually drives the host into an OTP (one-time-password) check and then process termination.

I solved this with **HyperDbg**, a hypervisor-level debugger that can hook individual syscalls from outside the process:

- **Flip the reply:** intercepted the guest's write syscall and rewrote its outgoing message so the host took the branch I wanted.
- **Bypass the OTP check:** the comparison lives at a fixed offset in the host; an EPT (page-table) hook let me feed it the value it was comparing against, so the check always passed.
- **Short-circuit termination:** hooked the process-termination syscall and returned a failure status, so the host stayed alive instead of exiting.

The takeaway: with a debugger below the OS you can neutralise checks without ever patching the binary on disk.

## Challenge 3 — Unpacking a packed ELF

A later stage shipped a packed Linux binary: a small loader that unpacks the real "control panel" into memory at runtime, with several layers of protection.

1. **Anti-debugging:** two \`ptrace\` checks had to be patched out statically (one needed to return 1, the other 0) before the binary would run under a debugger.
2. **Self-unpacking dump:** I let the loader run under gdb until it had reconstructed the inner program, then dumped its full memory range from its program headers.
3. **ELF repair:** a raw memory dump is not a valid file, so I wrote a Python tool (\`unpack.py\`) to rebuild it — fixing the ELF header, rewriting every program header so file offsets match virtual addresses, repairing the dynamic init/fini arrays, and stripping the runtime load base. The result loads cleanly in Ghidra and runs.
4. **Genuineness check:** the panel read a value the packer had hidden in the process's \`auxv\` (AT_FLAGS) and refused to work without it. I hooked the entry point to restore the expected value before \`main\`, so the unpacked binary behaves like the original.

## Tools & skills

Ghidra, HyperDbg, gdb, Intel Pin, Python; ELF internals, Windows process internals and syscalls, anti-debugging and anti-unpacking bypass.
    `,
  },
  'google-play-protect-thesis': {
    title: "Bachelor's Thesis: Bypassing Google Play Protect",
    date: '2025-07-18',
    tags: ['android-security', 'malware-analysis', 'research'],
    content: `
## Summary

My BSc thesis at VU Amsterdam (supervised by Prof. Herbert Bos, daily supervisor Dyon Goos, grade 7.0). It asks how capable Google Play Protect's dynamic analysis is today, and whether Android app vetting has improved since *Adventures in BouncerLand* (Percoco & Schulte, 2012) showed that Google Bouncer could be evaded.

## Approach

Google Play Protect is a closed system, so instead of guessing what it does I made the vetting run itself the dataset:

- I built **PennyTracker**, a benign expense-tracker app (Kotlin, Jetpack Compose, Room, MVVM).
- The app logs every screen navigation, UI event and lifecycle change with timestamps, plus the device environment (build, hardware, locale, network, emulator and ADB flags, uptime).
- The logs go to a small **FastAPI** backend, so whatever runs the app during review reports back to me.
- I submitted the signed app bundle to Google Play closed testing, where Play Protect scans it right after upload.

The app never contained malicious behaviour. Environment detection, logic bombs and time bombs were evaluated as *potential* evasions based on what the scan revealed.

## What the scan looked like

| Observation | Value |
|---|---|
| When | immediately on upload, run once |
| Duration | about 6 min 15 s |
| Reported device | OnePlus 8 Pro, Android 11 (SDK 30) |
| Public IP | a Google address |
| Emulator / ADB flags | both false |
| Device uptime | 5 min 40 s |
| Interaction | 33 navigation events, main screens only |

The scan never filled in a form, opened the date picker or category drop-down, toggled expense/income, pressed Save, or opened the edit/delete menu.

## Findings

- Simple environment checks (a Google-owned IP, very short uptime) combined with a **time bomb**, or a **logic bomb** behind a form submission, would very likely evade this analysis.
- Compared with Google Bouncer in 2012: analysis is longer (minutes instead of under 30 seconds) but still runs once at upload and still has shallow interaction depth, so similar weaknesses persist.

## Recommendations

Longer analysis, randomised and deeper interaction (including form input), and not exposing an IP that points straight back to Google.

## Limitations

One app category; the closed-testing barrier; a limited time window; on-device protection not studied; no root access, so no syscall, file-system or memory traces.

## Reference

- N. J. Percoco and S. Schulte, *Adventures in BouncerLand*, Black Hat USA 2012.
    `,
  },
}

const customStyle = {
  ...atomDark,
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    background: '#0a0a0a',
    border: '1px solid #00FF00',
    borderRadius: '0',
    margin: '1.5rem 0',
  },
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: "'Fira Code', monospace",
    fontSize: '0.9rem',
  },
}

function ProjectPost() {
  const { slug } = useParams()
  const post = projectPosts[slug]

  if (!post) {
    return (
      <div className="project-post not-found">
        <div className="container">
          <div className="error-box">
            <h1>404: File Not Found</h1>
            <p className="error-message">
              <span className="cmd-prompt">$</span> cat ./projects/{slug}/README.md
            </p>
            <p className="error-output">cat: ./projects/{slug}/README.md: No such file or directory</p>
            <Link to="/#projects" className="back-btn">
              <span className="btn-arrow">←</span>
              cd ../projects
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.article
      className="project-post"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <nav className="post-nav">
          <Link to="/#projects" className="back-link">
            <span className="nav-arrow">←</span>
            <span className="nav-text">cd ../projects</span>
          </Link>
        </nav>

        <header className="post-header">
          <div className="post-path">
            <span className="path-prefix">~/projects/{slug}/</span>
            <span className="path-file">README.md</span>
          </div>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="meta-date">
              <span className="meta-label">Last modified:</span>
              {post.date}
            </span>
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag">[{tag}]</span>
              ))}
            </div>
          </div>
        </header>

        <div className="post-content">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={customStyle}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              table({ children }) {
                return (
                  <div className="table-wrapper">
                    <table>{children}</table>
                  </div>
                )
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="post-footer">
          <div className="footer-nav">
            <Link to="/#projects" className="footer-link">
              <span className="footer-arrow">←</span>
              Back to Projects
            </Link>
            <Link to="/#contact" className="footer-link">
              Contact
              <span className="footer-arrow">→</span>
            </Link>
          </div>
        </footer>
      </div>
    </motion.article>
  )
}

export default ProjectPost
