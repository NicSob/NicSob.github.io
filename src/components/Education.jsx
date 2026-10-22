import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Education.css'

const education = [
  {
    period: '2025-2027',
    degree: 'MSc in Computer Security',
    institution: 'Vrije Universiteit Amsterdam',
    location: 'Amsterdam, Netherlands',
    details: [
      'Focus: Cryptography, Software & Systems Security, Malware Analysis',
      'GPA: [PLACEHOLDER]',
    ],
    courses: [
      'Advanced Cryptography',
      'Malware Analysis',
      'Software Security',
      'Systems Security',
      'Binary Analysis',
    ],
    current: true,
  },
  {
    period: '2022-2025',
    degree: 'BSc in Computer Science',
    institution: 'Vrije Universiteit Amsterdam',
    location: 'Amsterdam, Netherlands',
    details: [
      'Expertise: Algorithms, Operating Systems, Systems Programming',
      'Thesis: Android Malware Evasion Techniques and Weaknesses in Google Play Protect',
      'GPA: [PLACEHOLDER]',
    ],
    courses: [
      'Computer Networks',
      'Operating Systems',
      'Computer Architecture',
      'Algorithms & Data Structures',
      'Software Design',
    ],
    current: false,
  },
  {
    period: 'Jul-Dec 2024',
    degree: 'Exchange Program',
    institution: 'The Australian National University',
    location: 'Canberra, Australia',
    details: [],
    courses: [
      'Data Wrangling',
      'Scientific HPC',
      'Cyber Security Foundations',
    ],
    current: false,
  },
]

function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <section id="education" className="education section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">education --query=all</h2>
          <div className="terminal-output">
            <span className="output-prefix">[QUERY RESULTS: {education.length} records found]</span>
          </div>
        </motion.div>

        <motion.div
          className="education-timeline"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className={`education-item ${edu.current ? 'current' : ''}`}
              variants={itemVariants}
            >
              <div className="education-marker">
                <span className="marker-dot">{edu.current ? '◉' : '○'}</span>
                <span className="marker-line" />
              </div>

              <div className="education-content">
                <div className="education-header">
                  <span className="education-period">[{edu.period}]</span>
                  {edu.current && <span className="current-badge">ACTIVE</span>}
                </div>

                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-institution">
                  <span className="institution-icon">🏛</span>
                  {edu.institution}
                </p>
                <p className="education-location text-muted">
                  📍 {edu.location}
                </p>

                {edu.details.length > 0 && (
                  <ul className="education-details">
                    {edu.details.map((detail, idx) => (
                      <li key={idx}>
                        <span className="detail-bullet">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                {edu.courses.length > 0 && (
                  <div className="education-courses">
                    <span className="courses-label">Key Courses:</span>
                    <div className="courses-list">
                      {edu.courses.map((course, idx) => (
                        <span key={idx} className="course-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Education
