import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Projects.css'

const featuredProjects = [
  {
    id: 'google-play-protect-thesis',
    title: "Bachelor's Thesis: Bypassing Google Play Protect",
    year: '2025',
    description: 'Built an instrumented Android app (Kotlin, Jetpack Compose, FastAPI backend) and submitted it to Google Play so the vetting run itself became the dataset. Google Play Protect\'s dynamic analysis ran once, for about 6 minutes, on a Google-hosted device and never exercised form input, so simple environment checks combined with time or logic bombs would likely evade it.',
    tags: ['malware-analysis', 'android-security', 'research'],
  },
  {
    id: 'bama-neuralinq',
    title: 'Reverse Engineering the "Neuralinq" Malware (BAMA)',
    year: '2026',
    description: 'A six-stage reverse-engineering chain for the Binary and Malware Analysis course, escalating from binary patching to symbolic execution: HyperDbg syscall-level patching and anti-debugging bypass, unpacking a packed ELF (ptrace + auxv checks) with a custom Python repair tool, Intel Pin taint analysis to recover a hidden input, automatic deobfuscation and CFG recovery, and angr symbolic execution to solve a checker.',
    tags: ['reverse-engineering', 'malware-analysis', 'ghidra', 'symbolic-execution'],
  },
  {
    id: 'ijvm-simulator',
    title: 'IJVM Machine Simulator in C',
    year: '2023',
    description: 'Built an IJVM simulator in C that loads and executes IJVM binaries, implementing the instruction set, stack and control flow, and validated it against a test suite.',
    tags: ['systems-programming', 'C', 'low-level'],
  },
  {
    id: 'tcp-chat-client',
    title: 'Text-based Chat Client and Server in Python with TCP',
    year: '2023',
    description: 'Built a text-based chat client and a multi-threaded server in Python over TCP, handling multiple concurrent user connections.',
    tags: ['networking', 'python', 'concurrency'],
  },
]

function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="projects section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">ls ./projects</h2>
          <div className="terminal-output">
            <span className="output-prefix">
              total {featuredProjects.length}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="projects-listing"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="listing-header">
            <span className="col-permissions">drwxr-xr-x</span>
            <span className="col-owner">msobczyk</span>
            <span className="col-size">4.0K</span>
            <span className="col-date">Date</span>
            <span className="col-name">Name</span>
          </div>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
            >
              <div className="project-listing-row">
                <span className="col-permissions">-rw-r--r--</span>
                <span className="col-owner">msobczyk</span>
                <span className="col-size">{project.year}</span>
                <span className="col-name project-filename">
                  {project.id}/
                </span>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-footer">
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag">
                        [{tag}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="footer-note text-muted">
            # See detailed writeups in the blog section below
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
