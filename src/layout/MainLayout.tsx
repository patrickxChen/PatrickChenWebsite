import { Link, Outlet, useLocation } from 'react-router-dom'
import { bookChapters } from '../app/bookChapters'

export function MainLayout() {
  const location = useLocation()
  const chapterIndex = bookChapters.findIndex((chapter) => chapter.path === location.pathname)
  const previousChapter = chapterIndex > 0 ? bookChapters[chapterIndex - 1] : null
  const nextChapter = chapterIndex >= 0 && chapterIndex < bookChapters.length - 1 ? bookChapters[chapterIndex + 1] : null
  const pageNumber = chapterIndex >= 0 ? chapterIndex + 1 : 1
  const pageThemeClass =
    location.pathname === '/about'
      ? 'page-theme-about'
      : location.pathname === '/projects'
        ? 'page-theme-projects'
        : location.pathname === '/awards'
          ? 'page-theme-awards'
          : location.pathname === '/contact'
            ? 'page-theme-contact'
            : location.pathname === '/hobbies'
              ? 'page-theme-hobbies'
              : 'page-theme-contents'

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <main className="flex-1 py-8 md:py-12">
        <section className="app-container">
          <div className="book-chapter-shell">
            <div key={location.pathname} className={`book-page animate-page-turn ${pageThemeClass}`}>
              <div className="book-page-topbar" aria-label="Chapter navigation">
                <div className="book-page-top-actions">
                  {location.pathname !== '/contents' ? (
                    <Link to="/contents" className="book-page-button" aria-label="Go to table of contents">
                      Contents
                    </Link>
                  ) : (
                    <span className="book-page-button-disabled">Contents</span>
                  )}

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
                <div className="book-page-number">Page {pageNumber}</div>
              </div>

              <div className="book-page-content">
                <Outlet />
              </div>
            </div>

            <footer className="medieval-footer" aria-label="Decorative footer">
              <span className="medieval-footer-motif" aria-hidden="true" />
              <span>Chronicles of Patrick Chen</span>
              <span className="medieval-footer-motif" aria-hidden="true" />
            </footer>
          </div>
        </section>
      </main>
    </div>
  )
}
