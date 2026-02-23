type HeroIntroProps = {
  name: string
  title: string
  intro: string
}

export function HeroIntro({ name, title, intro }: HeroIntroProps) {
  return (
    <div className="animate-hero-enter space-y-5">
      <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
        About Me
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-text md:text-5xl">
        {name}
      </h1>
      <h2 className="max-w-2xl text-xl font-medium text-text/90 md:text-2xl">{title}</h2>
      <p className="max-w-2xl text-base leading-7 text-text/75 md:text-lg">{intro}</p>
    </div>
  )
}
