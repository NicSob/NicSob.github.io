import { useState } from 'react'
import './Scanlines.css'

function Scanlines() {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      {enabled && <div className="scanlines" />}
      <button
        className="scanlines-toggle"
        onClick={() => setEnabled(!enabled)}
        title={enabled ? 'Disable scanlines' : 'Enable scanlines'}
        aria-label={enabled ? 'Disable scanlines effect' : 'Enable scanlines effect'}
      >
        {enabled ? '[CRT:ON]' : '[CRT:OFF]'}
      </button>
    </>
  )
}

export default Scanlines
