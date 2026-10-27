import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const skills = {
  cybersecurity: [
    'Malware Analysis',
    'Reverse Engineering',
    'Android App Analysis',
    'Software Security',
    'Secure Systems',
  ],
  programming: [
    'Python',
    'C',
    'C++',
    'Kotlin',
    'Java',
    'Assembly (x86-64, AT&T)',
    'Bash',
    'Scala',
  ],
  tools: [
    'Linux',
    'Ghidra',
    'Wireshark',
    'Git',
    'Docker',
    'Android Studio',
    'FastAPI',
  ],
  cloud: [
    'Google Cloud',
  ],
}

const certifications = [
  {
    name: 'CAE Certificate',
    year: '2021',
    description: 'Cambridge Assessment English - C1 Advanced',
  },
]

const languages = [
  { name: 'Polish', level: 'Native proficiency' },
  { name: 'English', level: 'Advanced (CAE certificate, 2021)' },
]

function About() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="about section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">cat about.txt</h2>
          <div className="terminal-output">
            <span className="output-prefix">[OUTPUT]</span>
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="about-bio terminal-box" variants={itemVariants}>
            <div className="terminal-header">
              <span className="terminal-title">~/profile/bio.md</span>
            </div>
            <div className="terminal-body">
              <p>
                MSc Computer Security student at Vrije Universiteit Amsterdam, focused on
                offensive and systems security. For my BSc thesis I built an instrumented
                Android app and submitted it to Google Play to study how Google Play
                Protect's dynamic analysis vets apps.
              </p>
              <p>
                Coursework in binary and malware analysis, software security and AI for
                security; this term, hardware security (side channels, firmware attacks)
                and network security. Outside coursework I run a self-hosted Linux homelab
                (Fedora, Docker, Tailscale-only access, SELinux enforcing).
              </p>
              <p>
                I'm looking for a graduation project or security internship in pentesting,
                vulnerability research or malware analysis. Available for an internship or
                part-time role now, and full-time from 2027.
              </p>
            </div>
          </motion.div>

          <motion.div className="skills-section" variants={itemVariants}>
            <h3 className="subsection-title">
              <span className="cmd-prompt">$</span> ls ./skills/
            </h3>

            <div className="skills-grid">
              <div className="skill-category">
                <h4 className="category-title">
                  <span className="folder-icon">📁</span> cybersecurity/
                </h4>
                <ul className="skill-list">
                  {skills.cybersecurity.map((skill, index) => (
                    <li key={index} className="skill-item">
                      <span className="file-icon">├──</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="skill-category">
                <h4 className="category-title">
                  <span className="folder-icon">📁</span> programming/
                </h4>
                <ul className="skill-list">
                  {skills.programming.map((skill, index) => (
                    <li key={index} className="skill-item">
                      <span className="file-icon">├──</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="skill-category">
                <h4 className="category-title">
                  <span className="folder-icon">📁</span> tools/
                </h4>
                <ul className="skill-list">
                  {skills.tools.map((skill, index) => (
                    <li key={index} className="skill-item">
                      <span className="file-icon">├──</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="skill-category">
                <h4 className="category-title">
                  <span className="folder-icon">📁</span> cloud/
                </h4>
                <ul className="skill-list">
                  {skills.cloud.map((skill, index) => (
                    <li key={index} className="skill-item">
                      <span className="file-icon">├──</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>

          <div className="about-bottom-row">
            <motion.div className="certifications-section terminal-box" variants={itemVariants}>
              <div className="terminal-header">
                <span className="terminal-title">~/certifications/</span>
              </div>
              <div className="terminal-body">
                <div className="cert-command">
                  <span className="cmd-prompt">$</span> cat certifications.json
                </div>
                <pre className="cert-json">
{`{
  "certifications": [`}
                  {certifications.map((cert, index) => (
                    <span key={index}>
{`
    {
      "name": "${cert.name}",
      "year": "${cert.year}",
      "description": "${cert.description}"
    }${index < certifications.length - 1 ? ',' : ''}`}
                    </span>
                  ))}
{`
  ]
}`}
                </pre>
              </div>
            </motion.div>

            <motion.div className="languages-section terminal-box" variants={itemVariants}>
              <div className="terminal-header">
                <span className="terminal-title">~/languages/</span>
              </div>
              <div className="terminal-body">
                <div className="lang-command">
                  <span className="cmd-prompt">$</span> echo $LANGUAGES
                </div>
                <ul className="languages-list">
                  {languages.map((lang, index) => (
                    <li key={index} className="language-item">
                      <span className="lang-name">{lang.name}:</span>
                      <span className="lang-level">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
