import { useState, useEffect } from 'react'
import './ReadableToggle.css'

// Readable mode: a high-contrast light theme with the CRT effects, glow and
// blinking removed. Persisted per-viewer in localStorage; falls back safely
// if storage is unavailable (private window, blocked site data).
function readStored() {
  // Readable is the default; only an explicit 'terminal' choice opts out.
  try {
    return localStorage.getItem('theme') !== 'terminal'
  } catch {
    return true
  }
}

function ReadableToggle() {
  const [readable, setReadable] = useState(readStored)

  useEffect(() => {
    const root = document.documentElement
    if (readable) {
      root.setAttribute('data-theme', 'readable')
    } else {
      root.removeAttribute('data-theme')
    }
    try {
      localStorage.setItem('theme', readable ? 'readable' : 'terminal')
    } catch {
      /* ignore: storage may be unavailable */
    }
  }, [readable])

  return (
    <button
      className="readable-toggle"
      onClick={() => setReadable((v) => !v)}
      title={readable ? 'Switch to terminal theme' : 'Switch to a simpler, readable theme'}
      aria-pressed={readable}
    >
      {readable ? '[THEME:READABLE]' : '[THEME:TERMINAL]'}
    </button>
  )
}

export default ReadableToggle
