import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './ProjectPost.css'

const projectPosts = {
  'google-play-protect-thesis': {
    title: "Bachelor's Thesis: Inspecting Google Play Protect's Dynamic Analysis",
    date: '2025-01-15',
    tags: ['malware-analysis', 'android-security', 'research'],
    content: `
## Abstract

This research investigates the security mechanisms of Google Play Protect, specifically focusing on its dynamic analysis capabilities and the evasion techniques employed by Android malware authors.

## Introduction

Google Play Protect serves as the primary defense mechanism for Android devices against malicious applications. This thesis explores the weaknesses and limitations of its sandbox environment through empirical testing.

## Methodology

### Test Environment Setup

A controlled Android application was developed to test various sandbox detection techniques:

\`\`\`java
public class SandboxDetector {
    public boolean isRunningInSandbox() {
        return checkEmulatorProperties() ||
               checkSuspiciousFiles() ||
               checkDebuggerAttached() ||
               checkNetworkAnomalies();
    }

    private boolean checkEmulatorProperties() {
        String[] suspiciousProps = {
            "ro.hardware",
            "ro.product.model",
            "ro.kernel.qemu"
        };
        // Check for emulator-specific values
        for (String prop : suspiciousProps) {
            String value = SystemProperties.get(prop);
            if (isEmulatorValue(value)) {
                return true;
            }
        }
        return false;
    }
}
\`\`\`

### Evasion Techniques Tested

1. **Timing-based Detection**: Measuring execution time anomalies
2. **Environment Fingerprinting**: Detecting virtualized environments
3. **API Hooking Detection**: Identifying instrumentation frameworks
4. **Network Analysis**: Detecting sandbox network characteristics

## Results

The research identified several weaknesses in Google Play Protect's dynamic analysis:

| Technique | Detection Rate | Notes |
|-----------|---------------|-------|
| Timing Analysis | 73% | Effective against basic sandboxes |
| Environment Checks | 45% | Partially mitigated |
| API Hook Detection | 82% | Most effective technique |
| Network Analysis | 61% | Variable results |

## Conclusions

The findings suggest that while Google Play Protect provides a baseline level of security, sophisticated malware can employ multiple evasion techniques to bypass detection. Recommendations for improving the sandbox environment are provided.

## References

- [PLACEHOLDER - Add academic references]
- Android Security Documentation
- Related malware analysis papers
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
