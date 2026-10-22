import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const navItems = [
  { id: 'home', label: 'home', section: 'hero' },
  { id: 'about', label: 'about', section: 'about' },
  { id: 'education', label: 'education', section: 'education' },
  { id: 'experience', label: 'experience', section: 'experience' },
  { id: 'projects', label: 'projects', section: 'projects' },
  { id: 'blog', label: 'writeups', section: 'blog' },
  { id: 'contact', label: 'contact', section: 'contact' },
]

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      if (location.pathname !== '/') return

      const sections = navItems.map(item => document.getElementById(item.section))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location])

  const handleNavClick = (sectionId) => {
    setIsOpen(false)
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo glitch" onClick={() => handleNavClick('hero')}>
          <span className="logo-bracket">[</span>
          <span className="logo-text">MSobczyk</span>
          <span className="logo-bracket">]</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="toggle-text">{isOpen ? '[CLOSE]' : '[MENU]'}</span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id} className={`nav-item ${item.id === 'blog' ? 'nav-item-blog' : ''}`}>
              <button
                className={`nav-link ${activeSection === item.section ? 'active' : ''} ${item.id === 'blog' ? 'nav-link-blog' : ''}`}
                onClick={() => handleNavClick(item.section)}
              >
                <span className="nav-prefix">&gt; nav --section=</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
