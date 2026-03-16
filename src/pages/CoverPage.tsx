import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function CoverPage() {
  const navigate = useNavigate()
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    if (!isOpening) {
      return
    }

    const timer = window.setTimeout(() => {
      navigate('/contents')
    }, 950)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isOpening, navigate])

  function handleOpen() {
    if (isOpening) {
      return
    }

    setIsOpening(true)
  }

  return (
    <main className={`book-scene min-h-screen ${isOpening ? 'book-scene-opening' : ''}`}>
      <div className="table-surface" />
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="cinematic-flash" aria-hidden="true" />

      <div className="book-cover-wrapper app-container">
        <button
          type="button"
          className={`book-cover ${isOpening ? 'book-cover-opening' : ''}`}
          onClick={handleOpen}
          aria-label="Open book and go to table of contents"
        >
          <div className="book-cover-inner">
            <div className="book-cover-portrait-frame" aria-hidden="true">
              <img src="/images/PatrickChenProtrait.JPG" alt="" className="book-cover-portrait" />
            </div>
            <h1 className="book-cover-title">The Chronicle of Patrick Chen</h1>
          </div>
        </button>
      </div>
    </main>
  )
}
