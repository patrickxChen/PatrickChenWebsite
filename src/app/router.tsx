import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { CoverPage } from '../pages/CoverPage'
import { ContentsPage } from '../pages/ContentsPage'
import { AboutPage } from '../pages/AboutPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { AwardsPage } from '../pages/AwardsPage'
import { ContactPage } from '../pages/ContactPage'
import { HobbiesPage } from '../pages/HobbiesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CoverPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'contents',
        element: <ContentsPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'awards',
        element: <AwardsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'hobbies',
        element: <HobbiesPage />,
      },
    ],
  },
])
