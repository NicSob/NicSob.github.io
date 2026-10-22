import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTypingEffect } from '../hooks/useTypingEffect'
import './Hero.css'

const asciiArt = `
███╗   ███╗███████╗ ██████╗ ██████╗  ██████╗███████╗██╗   ██╗██╗  ██╗
████╗ ████║██╔════╝██╔═══██╗██╔══██╗██╔════╝╚══███╔╝╚██╗ ██╔╝██║ ██╔╝
██╔████╔██║███████╗██║   ██║██████╔╝██║       ███╔╝  ╚████╔╝ █████╔╝
██║╚██╔╝██║╚════██║██║   ██║██╔══██╗██║      ███╔╝    ╚██╔╝  ██╔═██╗
██║ ╚═╝ ██║███████║╚██████╔╝██████╔╝╚██████╗███████╗   ██║   ██║  ██╗
╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
`

const introText = "Mikołaj Sobczyk"
const subtitleText = "Cybersecurity Specialist & Systems Programmer"

const bootSequence = [
  '> Initializing secure connection...',
  '> Loading credentials...',
  '> Decrypting profile data...',
  '> Access granted.',
  '> Welcome.'
]

function Hero() {
  const [bootComplete, setBootComplete] = useState(false)
  const [currentBootLine, setCurrentBootLine] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const { displayedText: nameText, isComplete: nameComplete } = useTypingEffect(
    introText,
    80,
    bootComplete ? 500 : 999999
  )
  const { displayedText: subtitleDisplayed } = useTypingEffect(
    subtitleText,
    40,
    nameComplete ? 300 : 999999
  )

  useEffect(() => {
    if (currentBootLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentBootLine(prev => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setBootComplete(true)
        setTimeout(() => setShowContent(true), 200)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [currentBootLine])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="boot-sequence">
          {bootSequence.slice(0, currentBootLine).map((line, index) => (
            <motion.div
              key={index}
              className="boot-line"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {line}
            </motion.div>
          ))}
          {!bootComplete && currentBootLine < bootSequence.length && (
            <span className="cursor" />
          )}
        </div>

        {showContent && (
          <motion.div
            className="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <pre className="ascii-art" aria-hidden="true">
              {asciiArt}
            </pre>

            <div className="hero-text">
              <h1 className="hero-title">
                <span className="prompt-symbol">&gt; </span>
                <span className="typing-text">{nameText}</span>
                {!nameComplete && <span className="cursor" />}
              </h1>

              <p className="hero-subtitle">
                <span className="prompt-symbol">&gt; </span>
                <span className="typing-text">{subtitleDisplayed}</span>
                {nameComplete && subtitleDisplayed.length < subtitleText.length && (
                  <span className="cursor" />
                )}
                {subtitleDisplayed.length === subtitleText.length && (
                  <span className="cursor" />
                )}
              </p>
            </div>

            <motion.div
              className="hero-nav-hints"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <p className="nav-hint">
                <span className="text-muted"># Navigate using commands:</span>
              </p>
              <div className="command-examples">
                <button onClick={() => scrollToSection('about')} className="command-btn">
                  <span className="cmd-prompt">$</span> cat about.txt
                </button>
                <button onClick={() => scrollToSection('projects')} className="command-btn">
                  <span className="cmd-prompt">$</span> ls ./projects
                </button>
                <button onClick={() => scrollToSection('contact')} className="command-btn">
                  <span className="cmd-prompt">$</span> ./contact.sh
                </button>
              </div>
            </motion.div>

            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <button onClick={() => scrollToSection('about')} className="scroll-btn">
                <span className="scroll-text">[SCROLL DOWN]</span>
                <span className="scroll-arrow">▼</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Hero
