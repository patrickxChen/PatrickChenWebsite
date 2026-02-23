import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

type NavItem = {
  label: string
  to: string
}

const navItems: NavItem[] = [
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
  { label: 'Hobbies', to: '/hobbies' },
]

const resumePath = '/resume/Patrick_Chen_External_Resume2026.pdf'

const baseLinkClass =
  'nav-link-animated rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function linkClassName(isActive: boolean) {
  return `${baseLinkClass} ${
    isActive
      ? 'nav-link-active bg-accent/10 text-accent'
      : 'text-text/80 hover:bg-surface hover:text-text'
  }`
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg/95 backdrop-blur">
      <div className="app-container flex items-center justify-between py-4">
        <NavLink
          to="/about"
          className="rounded-md px-2 py-1 text-sm font-semibold tracking-wide text-text transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Patrick Chen
        </NavLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/about'}
                  className={({ isActive }) => linkClassName(isActive)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="ml-1">
              <a
                href={resumePath}
                download
                className="inline-flex items-center rounded-md border border-accent/50 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm text-text md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </div>

      {isMobileMenuOpen ? (
        <nav id="mobile-nav" aria-label="Mobile primary" className="border-t border-white/10 md:hidden">
          <ul className="app-container flex flex-col gap-2 py-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/about'}
                  className={({ isActive }) => `block ${linkClassName(isActive)}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={resumePath}
                download
                className="block rounded-md border border-accent/50 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
