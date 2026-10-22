import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Contact.css'

const contactMethods = [
  {
    type: 'EMAIL',
    value: 'mikolaj.sobczyk03@outlook.com',
    href: 'mailto:mikolaj.sobczyk03@outlook.com',
    icon: '📧',
  },
  {
    type: 'LINKEDIN',
    value: 'linkedin.com/in/mikolaj-sobczyk',
    href: 'https://www.linkedin.com/in/mikolaj-sobczyk',
    icon: '💼',
  },
  {
    type: 'GITHUB',
    value: 'github.com/NicSob',
    href: 'https://github.com/NicSob',
    icon: '🐙',
  },
  {
    type: 'CV',
    value: 'Download CV (PDF)',
    href: '/Mikolaj_Sobczyk_CV.pdf',
    icon: '📄',
    download: true,
  },
]

function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <section id="contact" className="contact section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">contact --methods</h2>
          <div className="terminal-output">
            <span className="output-prefix">[AVAILABLE CHANNELS]</span>
          </div>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-terminal"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="terminal-dots">● ○ ○</span>
                <span className="terminal-title">~/contact/methods.sh</span>
              </div>

              <div className="terminal-body">
                <div className="terminal-line comment">
                  # Available contact methods
                </div>
                <div className="terminal-line command">
                  <span className="prompt">$</span> cat ./contact/info.json
                </div>

                <motion.div className="contact-list" variants={containerVariants}>
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      className="contact-item"
                      variants={itemVariants}
                    >
                      <span className="contact-bracket">[</span>
                      <span className="contact-type">{method.type}</span>
                      <span className="contact-bracket">]</span>
                      <span className="contact-separator">→</span>
                      <a
                        href={method.href}
                        target={method.type !== 'EMAIL' ? '_blank' : undefined}
                        rel={method.type !== 'EMAIL' ? 'noopener noreferrer' : undefined}
                        download={method.download ? 'Mikolaj_Sobczyk_CV.pdf' : undefined}
                        className="contact-value"
                      >
                        {method.value}
                        {method.placeholder && (
                          <span className="placeholder-note"> [UPDATE URL]</span>
                        )}
                      </a>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="terminal-line spacer" />

                <div className="terminal-line comment">
                  # Send a message
                </div>
                <div className="terminal-line command">
                  <span className="prompt">$</span> ./send_message.sh
                </div>

                <motion.div
                  className="message-prompt"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p className="message-text">
                    Interested in collaborating or have a question?
                  </p>
                  <p className="message-instruction">
                    Feel free to reach out via email or connect on LinkedIn.
                  </p>
                  <a
                    href="mailto:mikolaj.sobczyk03@outlook.com?subject=Hello from your portfolio"
                    className="contact-btn"
                  >
                    <span className="btn-prefix">&gt;</span>
                    <span className="btn-text">compose --to=mikolaj</span>
                    <span className="btn-cursor" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-ascii"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <pre className="ascii-art">
{`
    ╔═══════════════════════════════╗
    ║                               ║
    ║   TRANSMISSION READY          ║
    ║   ━━━━━━━━━━━━━━━━━━          ║
    ║                               ║
    ║   STATUS: ONLINE              ║
    ║   RESPONSE: < 24H             ║
    ║   ENCRYPTION: ENABLED         ║
    ║                               ║
    ╚═══════════════════════════════╝
`}
            </pre>
          </motion.div>
        </div>

        <motion.footer
          className="contact-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="footer-divider">
            <span className="divider-text">EOF</span>
          </div>
          <p className="footer-copyright">
            <span className="copyright-symbol">©</span> {new Date().getFullYear()} Mikołaj Sobczyk
          </p>
          <p className="footer-built">
            <span className="built-prefix">#</span> Built with React + Terminal aesthetics
          </p>
          <p className="footer-version">
            v1.0.1 | Last updated: 2026-10-22
          </p>
        </motion.footer>
      </div>
    </section>
  )
}

export default Contact
