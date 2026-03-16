import { Link } from 'react-router-dom'

type HeroCtaProps = {
  label: string
  to: string
}

export function HeroCta({ label, to }: HeroCtaProps) {
  return (
    <Link
      to={to}
      className="hero-cta-ink animate-hero-enter inline-flex items-center rounded-md border px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </Link>
  )
}
