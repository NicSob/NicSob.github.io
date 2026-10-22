import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Blog from './components/Blog'
import ProjectPost from './components/ProjectPost'
import Contact from './components/Contact'
import Scanlines from './components/Scanlines'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <Scanlines />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
