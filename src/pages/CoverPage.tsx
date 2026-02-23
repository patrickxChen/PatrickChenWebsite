import { Link } from 'react-router-dom'

export function CoverPage() {
  return (
    <main className="book-scene min-h-screen">
      <div className="table-surface" />

      <div className="book-cover-wrapper app-container">
        <Link to="/contents" className="book-cover" aria-label="Open book and go to table of contents">
          <div className="book-cover-inner">
            <p className="book-cover-subtitle">Click to open</p>
            <h1 className="book-cover-title">All About Patrick Chen</h1>
            <p className="book-cover-hint">Interactive Portfolio</p>
          </div>
        </Link>
      </div>
    </main>
  )
}
