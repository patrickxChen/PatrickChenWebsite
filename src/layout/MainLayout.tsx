import { Link, Outlet, useLocation } from 'react-router-dom'
import { bookChapters } from '../app/bookChapters'

export function MainLayout() {
  const location = useLocation()
  const chapterIndex = bookChapters.findIndex((chapter) => chapter.path === location.pathname)
  const chapter = chapterIndex >= 0 ? bookChapters[chapterIndex] : bookChapters[0]
  const previousChapter = chapterIndex > 0 ? bookChapters[chapterIndex - 1] : null
  const nextChapter = chapterIndex >= 0 && chapterIndex < bookChapters.length - 1 ? bookChapters[chapterIndex + 1] : null
  const pageNumber = chapterIndex >= 0 ? chapterIndex + 1 : 1

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <main className="flex-1 py-8 md:py-12">
        <section className="app-container">
          <div className="book-chapter-shell">
            <p className="book-chapter-label">{chapter.title}</p>
            <div key={location.pathname} className="book-page animate-page-turn">
              <div className="book-running-header" aria-hidden="true">
                <span>All About Patrick Chen</span>
                <span>{chapter.shortTitle}</span>
              </div>

              <div className="book-page-content">
                <Outlet />
              </div>

              <footer className="book-page-footer" aria-label="Chapter navigation">
                <div className="book-page-number">Page {pageNumber}</div>
                <div className="book-pagination">
                  {location.pathname !== '/contents' ? (
                    <Link to="/contents" className="book-page-button" aria-label="Go to table of contents">
                      Contents
                    </Link>
                  ) : null}

                  {previousChapter ? (
                    <Link to={previousChapter.path} className="book-page-button" rel="prev">
                      ← Previous
                    </Link>
                  ) : (
                    <span className="book-page-button-disabled">← Previous</span>
                  )}

                  {nextChapter ? (
                    <Link to={nextChapter.path} className="book-page-button" rel="next">
                      Next →
                    </Link>
                  ) : (
                    <span className="book-page-button-disabled">Next →</span>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
