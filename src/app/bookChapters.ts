export type BookChapter = {
  path: string
  title: string
  shortTitle: string
}

export const bookChapters: BookChapter[] = [
  {
    path: '/contents',
    title: 'Table of Contents',
    shortTitle: 'Contents',
  },
  {
    path: '/about',
    title: 'Chapter 1 · About Me',
    shortTitle: 'About Me',
  },
  {
    path: '/projects',
    title: 'Chapter 2 · Projects',
    shortTitle: 'Projects',
  },
  {
    path: '/awards',
    title: 'Chapter 3 · Awards & Certifications',
    shortTitle: 'Awards',
  },
  {
    path: '/contact',
    title: 'Chapter 4 · Contact',
    shortTitle: 'Contact',
  },
  {
    path: '/hobbies',
    title: 'Chapter 5 · Hobbies',
    shortTitle: 'Hobbies',
  },
]
