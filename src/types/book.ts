export type BookEntry = {
  id: string
  title: string
  author: string
  description: string
  coverQuery: string
}

export type BookWithCover = BookEntry & {
  coverUrl: string | null
}
