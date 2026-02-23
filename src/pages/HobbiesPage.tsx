import { useEffect, useState } from 'react'
import { FishingGame } from '../components/hobbies/FishingGame'
import { favoriteBooks } from '../data/favoriteBooks'
import type { BookWithCover } from '../types/book'

type OpenLibrarySearchResponse = {
  docs?: Array<{
    cover_i?: number
  }>
}

type GoogleBooksResponse = {
  items?: Array<{
    volumeInfo?: {
      imageLinks?: {
        thumbnail?: string
        smallThumbnail?: string
      }
    }
  }>
}

async function findCoverFromOpenLibrary(query: string): Promise<string | null> {
  const endpoint = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=1`
  const response = await fetch(endpoint)

  if (!response.ok) {
    return null
  }

  const data = (await response.json()) as OpenLibrarySearchResponse
  const coverId = data.docs?.[0]?.cover_i

  if (!coverId) {
    return null
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
}

async function findCoverUrl(query: string): Promise<string | null> {
  const openLibraryCover = await findCoverFromOpenLibrary(query)

  if (openLibraryCover) {
    return openLibraryCover
  }

  const googleEndpoint = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`
  const googleResponse = await fetch(googleEndpoint)

  if (!googleResponse.ok) {
    return null
  }

  const data = (await googleResponse.json()) as GoogleBooksResponse
  const thumbnail = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail
  const smallThumbnail = data.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail

  return thumbnail ?? smallThumbnail ?? null
}

export function HobbiesPage() {
  const [books, setBooks] = useState<BookWithCover[]>(
    favoriteBooks.map((book) => ({
      ...book,
      coverUrl: null,
    })),
  )

  useEffect(() => {
    let isMounted = true

    async function loadCovers() {
      const withCovers = await Promise.all(
        favoriteBooks.map(async (book) => ({
          ...book,
          coverUrl: await findCoverUrl(book.coverQuery),
        })),
      )

      if (isMounted) {
        setBooks(withCovers)
      }
    }

    void loadCovers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="py-4 md:py-6">
      <header className="mb-6 space-y-2 md:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Hobbies</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Fishing the Reading Shelf</h1>
        <p className="max-w-2xl text-sm text-text/80 md:text-base">
          I love reading sci-fi and fantasy, especially worldbuilding-heavy stories with creative magic systems.
        </p>
      </header>

      <FishingGame books={books} />
    </main>
  )
}
