type Achievement = {
  title: string
  summary: string
  imageUrl: string
  imageAlt: string
}

const achievements: Achievement[] = [
  {
    title: 'Euclid Contest Honor Roll (Top ~2%)',
    summary:
      'Recognized on the Euclid honor roll for placing in approximately the top 2% of participants.',
    imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d0.svg',
    imageAlt: 'Triangular ruler icon representing mathematics achievement',
  },
  {
    title: 'Canadian Computing Competition Senior Honor Roll (Top ~2%)',
    summary:
      'Placed on the CCC Senior honor roll, performing in roughly the top 2% among competitors.',
    imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bb.svg',
    imageAlt: 'Computer icon representing computing competition achievement',
  },
  {
    title: 'Inspirit AI Program Completion',
    summary:
      'Inpsirit AI Scholars is an artificial intelligence program for high school students, developed and taught by Stanford and MIT alumni and graduate students.',
    imageUrl: '/images/inspiritAI.webp',
    imageAlt: 'Inspirit AI program logo',
  },
  {
    title: 'Governor General’s Academic Medal',
    summary:
      'Awarded for achieving the highest high school GPA.',
    imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c5.svg',
    imageAlt: 'Medal icon representing top academic award',
  },
]

export function AwardsPage() {
  return (
    <main className="py-4 md:py-6">
      <header className="mb-6 space-y-2 md:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Awards & Certifications</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Academic and Technical Recognition</h1>
      </header>

      <section className="awards-grid" aria-label="Awards and certifications">
        {achievements.map((achievement) => (
          <article key={achievement.title} className="award-card">
            <img src={achievement.imageUrl} alt={achievement.imageAlt} className="award-icon" loading="lazy" />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-text md:text-xl">{achievement.title}</h2>
              <p className="text-sm leading-relaxed text-text/80 md:text-base">{achievement.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
