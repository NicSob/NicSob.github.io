import { useState, useEffect } from 'react'

export function useTypingEffect(text, speed = 50, delay = 0) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    setIsStarted(false)

    const startTimeout = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, delay])

  useEffect(() => {
    if (!isStarted) return

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [displayedText, text, speed, isStarted])

  return { displayedText, isComplete, isStarted }
}

export function useMultiLineTyping(lines, speed = 50, lineDelay = 500) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [isAllComplete, setIsAllComplete] = useState(false)

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsAllComplete(true)
      return
    }

    const currentLine = lines[currentLineIndex]

    if (currentText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.slice(0, currentText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentLine])
        setCurrentText('')
        setCurrentLineIndex(prev => prev + 1)
      }, lineDelay)
      return () => clearTimeout(timeout)
    }
  }, [currentText, currentLineIndex, lines, speed, lineDelay])

  return { displayedLines, currentText, isAllComplete, currentLineIndex }
}
