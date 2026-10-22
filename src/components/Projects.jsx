import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Projects.css'

const featuredProjects = [
  {
    id: 'google-play-protect-thesis',
    title: "Bachelor's Thesis: Inspecting Google Play Protect's Dynamic Analysis",
    year: '2025',
    description: 'Researched Android malware evasion techniques and assessed security flaws in Google Play Protect. Developed and deployed a controlled Android application to empirically test sandbox limitations.',
    tags: ['malware-analysis', 'android-security', 'research'],
  },
  {
    id: 'ijvm-simulator',
    title: 'IJVM Machine Simulator in C',
    year: '2023',
    description: 'Engineered an IJVM simulator capable of executing binary files, showcasing profound grasp of memory management and control flow. Validated simulator\'s performance against stringent tests, affirming accurate representation of IJVM instructions.',
    tags: ['systems-programming', 'C', 'low-level'],
  },
  {
    id: 'tcp-chat-client',
    title: 'Text-based Chat Client and Server in Python with TCP',
    year: '2023',
    description: 'Crafted TCP-based chat client in Python with user-friendly interface abstracting protocol complexities. Programmed concurrent server handling multiple connections, demonstrating networking and multi-threading proficiency.',
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
