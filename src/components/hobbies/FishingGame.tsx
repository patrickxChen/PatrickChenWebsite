import { useEffect, useMemo, useRef, useState } from 'react'
import type { BookWithCover } from '../../types/book'

type FishingGameProps = {
  books: BookWithCover[]
}

type CatchResult = {
  message: string
  caughtBookId: string | null
}

type FishingPhase = 'idle' | 'casting' | 'bite'

function pickRandomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

export function FishingGame({ books }: FishingGameProps) {
  const [phase, setPhase] = useState<FishingPhase>('idle')
  const [caughtIds, setCaughtIds] = useState<string[]>([])
  const [lastCatch, setLastCatch] = useState<CatchResult | null>(null)
  const biteTimerRef = useRef<number | null>(null)
  const castTimerRef = useRef<number | null>(null)

  const caughtBooks = useMemo(
    () => books.filter((book) => caughtIds.includes(book.id)),
    [books, caughtIds],
  )

  const remainingBooks = useMemo(
    () => books.filter((book) => !caughtIds.includes(book.id)),
    [books, caughtIds],
  )

  useEffect(() => {
    return () => {
      if (biteTimerRef.current) {
        window.clearTimeout(biteTimerRef.current)
      }

      if (castTimerRef.current) {
        window.clearTimeout(castTimerRef.current)
      }
    }
  }, [])

  function resolveCatch() {
    const catchRoll = Math.random()

    if (catchRoll < 0.16) {
      setLastCatch({
        message: 'The fish tugged hard and escaped. Cast again.',
        caughtBookId: null,
      })
      setPhase('idle')
      return
    }

    if (remainingBooks.length > 0) {
      const randomBook = remainingBooks[pickRandomIndex(remainingBooks.length)]
      setCaughtIds((previous) => [...previous, randomBook.id])
      setLastCatch({
        message: `Great catch — “${randomBook.title}” is now on your shelf.`,
        caughtBookId: randomBook.id,
      })
      setPhase('idle')
      return
    }

    const randomBook = books[pickRandomIndex(books.length)]
    setLastCatch({
      message: `You reeled in a familiar favorite: “${randomBook.title}.”`,
      caughtBookId: randomBook.id,
    })
    setPhase('idle')
  }

  function startBiteWindow() {
    setPhase('bite')
    setLastCatch({
      message: 'A fish is biting! Reel now!',
      caughtBookId: null,
    })

    biteTimerRef.current = window.setTimeout(() => {
      setPhase('idle')
      setLastCatch({
        message: 'Too slow — the fish got away. Cast again.',
        caughtBookId: null,
      })
    }, 1300)
  }

  function castLine() {
    if (phase !== 'idle') {
      return
    }

    setPhase('casting')
    setLastCatch({ message: 'Line cast… waiting for a bite.', caughtBookId: null })

    const timeToBiteMs = 1200 + Math.floor(Math.random() * 1200)

    castTimerRef.current = window.setTimeout(() => {
      startBiteWindow()
    }, timeToBiteMs)
  }

  function reelLine() {
    if (phase !== 'bite') {
      return
    }

    if (biteTimerRef.current) {
      window.clearTimeout(biteTimerRef.current)
      biteTimerRef.current = null
    }

    resolveCatch()
  }

  const completionPercent = Math.round((caughtBooks.length / books.length) * 100)

  const isCasting = phase === 'casting'
  const hasBite = phase === 'bite'

  return (
    <section className="space-y-5" aria-label="Fishing mini game">
      <div className="fishing-panel">
        <div className="fishing-water" aria-hidden="true">
          <span className="pond-ripple pond-ripple-primary" />
          <span className="pond-ripple pond-ripple-secondary" />
          <span className={`pond-bobber ${hasBite ? 'pond-bobber-bite' : ''}`} />
          <span className="pond-lily lily-one" />
          <span className="pond-lily lily-two" />
          <span className="pond-reed-group" />
        </div>

        <div className="relative z-10 mt-52 flex flex-col gap-4 md:mt-56 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Mini Game</p>
            <h2 className="mt-1 text-2xl font-semibold text-text md:text-3xl">Book Fishing</h2>
            <p className="mt-2 text-sm text-text/80 md:text-base">
              Cast your line, wait for a bite, then reel at the right time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={castLine}
              disabled={phase !== 'idle'}
              className="fishing-button"
            >
              {isCasting ? 'Waiting…' : 'Cast'}
            </button>
            <button
              type="button"
              onClick={reelLine}
              disabled={!hasBite}
              className="fishing-button fishing-button-reel"
            >
              Reel
            </button>
          </div>
        </div>

        <p className="fishing-status mt-4" aria-live="polite">
          {lastCatch?.message ?? 'The pond is still. Cast to begin.'}
        </p>

        <div className="mt-4">
          <div className="fishing-progress-track">
            <span className="fishing-progress-fill" style={{ width: `${completionPercent}%` }} />
          </div>
          <p className="mt-2 text-xs text-text/70">
            Shelf progress: {caughtBooks.length}/{books.length} books ({completionPercent}%)
          </p>
        </div>
      </div>

      <section aria-label="Caught books shelf">
        <h3 className="text-lg font-semibold text-text md:text-xl">Caught Shelf</h3>
        {caughtBooks.length === 0 ? (
          <p className="mt-3 text-sm text-text/75">No books caught yet. Cast your line to begin.</p>
        ) : (
          <div className="caught-shelf mt-4">
            {caughtBooks.map((book) => (
              <article key={book.id} className="caught-book-card">
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="caught-book-cover" loading="lazy" />
                ) : (
                  <div className="caught-book-cover-placeholder" aria-hidden="true">
                    No cover
                  </div>
                )}
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-text md:text-lg">{book.title}</h4>
                  <p className="text-xs font-medium uppercase tracking-wide text-accent/90">{book.author}</p>
                  <p className="text-sm leading-relaxed text-text/80">{book.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section aria-label="Books in pond">
        <h3 className="text-lg font-semibold text-text md:text-xl">Books in the Pond</h3>
        <p className="mt-2 text-sm text-text/75">These are the books you can catch. Covers appear here even before catching.</p>
        <div className="pond-library mt-4">
          {books.map((book) => (
            <article key={book.id} className="pond-book-tile">
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="pond-book-cover" loading="lazy" />
              ) : (
                <div className="caught-book-cover-placeholder" aria-hidden="true">
                  No cover
                </div>
              )}
              <p className="text-xs font-medium text-text/85">{book.title}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
