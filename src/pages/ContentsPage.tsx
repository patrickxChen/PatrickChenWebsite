import { Link } from 'react-router-dom'
import { bookChapters } from '../app/bookChapters'

export function ContentsPage() {
  const chapterEntries = bookChapters.filter((chapter) => chapter.path !== '/contents')

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Table of Contents</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All About Patrick Chen</h1>
      </header>

      <ol className="toc-list" aria-label="Book chapters">
        {chapterEntries.map((chapter, index) => (
          <li key={chapter.path}>
            <Link to={chapter.path} className="toc-link">
              <span className="toc-index">{index + 1}.</span>
              <span className="toc-title">{chapter.shortTitle}</span>
              <span className="toc-dots" aria-hidden="true" />
              <span className="toc-page">{index + 2}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
