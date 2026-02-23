import { Link } from 'react-router-dom'

type HeroCtaProps = {
  label: string
  to: string
}

export function HeroCta({ label, to }: HeroCtaProps) {
  return (
    <Link
      to={to}
      className="animate-hero-enter inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </Link>
  )
}
