import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Experience.css'

const experiences = [
  {
    period: 'Jun 2025-Jan 2026',
    title: 'Junior Technological Solutions Engineer',
    company: 'Coliving Ventures',
    location: 'Amsterdam',
    responsibilities: [
      'Implemented cybersecurity compliance policies and data protection measures',
      'Collected, processed and analysed large-scale data with Python',
      'Developed automated web scraping pipelines for structured data acquisition',
      'Explored Retrieval-Augmented Generation (RAG) for AI-driven insights',
    ],
    tags: ['Python', 'Web Scraping', 'Data Analysis', 'RAG'],
    current: false,
  },
  {
    period: 'Nov 2023-Jun 2025',
    title: 'Core Team Member',
    company: 'Google Developer Student Clubs',
    location: 'Amsterdam',
    responsibilities: [],
    tags: ['Community'],
    current: false,
  },
  {
    period: 'Nov 2023-Feb 2024',
    title: 'Teaching Assistant',
    company: 'Vrije Universiteit Amsterdam',
    location: 'Amsterdam',
    responsibilities: [
      'Guided students in programming practices, debugging, and secure coding',
      'Simplified complex computer science concepts to enhance comprehension',
    ],
    tags: ['Teaching', 'Programming', 'Mentoring'],
    current: false,
  },
  {
    period: 'Jul 2023-Feb 2024',
    title: 'Co-Head of IT',
    company: 'International Congress of Polish Student Societies',
    location: 'Amsterdam',
    responsibilities: [
      'Built the congress website, which also served as its e-commerce platform',
      'Deployed an encrypted ticket management and database system',
      'Streamlined IT infrastructure for event operations',
    ],
    tags: ['IT Infrastructure', 'Security', 'Database Management'],
    current: false,
  },
  {
    period: 'Jul-Nov 2023',
    title: 'Student in Robotic Process Automation',
    company: 'Nordea',
    location: 'Łódź',
    responsibilities: [
      'Internship in Nordea\'s Robotics Centre of Excellence',
      'Automated manual workflows with RPA, reducing human error and improving resilience',
      'Supported process auditing and monitoring',
    ],
    tags: ['RPA', 'Blue Prism', 'Automation', 'Process Optimization'],
    current: false,
  },
]

function Experience() {
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
    <section id="experience" className="experience section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">experience --list</h2>
          <div className="terminal-output">
            <span className="output-prefix">[LISTING {experiences.length} ENTRIES]</span>
          </div>
        </motion.div>

        <motion.div
          className="experience-list"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`experience-item ${exp.current ? 'current' : ''}`}
              variants={itemVariants}
            >
              <div className="experience-header">
                <div className="experience-meta">
                  <span className="experience-period">[{exp.period}]</span>
                  {exp.current && (
                    <span className="status-badge">
                      <span className="status-dot"></span>
                      ACTIVE
                    </span>
                  )}
                </div>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">
                  <span className="company-icon">@</span>
                  {exp.company}
                  <span className="company-divider">|</span>
                  <span className="company-location">{exp.location}</span>
                </p>
              </div>

              <div className="experience-body">
                {exp.responsibilities.length > 0 && (
                  <ul className="experience-responsibilities">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>
                        <span className="resp-prefix">→</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="experience-tags">
                  {exp.tags.map((tag, idx) => (
                    <span key={idx} className="exp-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="experience-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="footer-text">
            <span className="cmd-prompt">$</span> echo "More experiences coming soon..."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
