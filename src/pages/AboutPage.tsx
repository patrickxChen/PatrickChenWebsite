import { HeroCta } from '../components/hero/HeroCta'
import { HeroIntro } from '../components/hero/HeroIntro'

export function AboutPage() {
  return (
    <main className="app-container py-12 md:py-16">
      <section className="futuristic-panel relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12">
        <div aria-hidden className="panel-laser-grid" />
        <div aria-hidden className="panel-laser-streak" />
        <div aria-hidden className="panel-laser-orb" />

        <div className="grid items-center gap-8 md:grid-cols-[1.35fr_0.95fr] md:gap-12">
          <div className="relative z-10">
            <HeroIntro
              name="Patrick Chen"
              title="Software Developer building modern web experiences"
              intro="I build responsive, performant web apps with clean architecture and thoughtful user experience. I enjoy turning product ideas into polished interfaces that are fast, accessible, and maintainable."
            />

            <p className="mt-5 inline-flex rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-medium text-accent">
              University of Waterloo · Software Engineering · Class of 2030
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/patrick-chen-94192a276/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-text/90 transition hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5S1.11 1 2.48 1S4.98 2.12 4.98 3.5ZM.5 8h4V24h-4V8Zm7.5 0h3.83v2.18h.05c.53-1.01 1.84-2.18 3.79-2.18C19.74 8 24 10.66 24 16.5V24h-4v-6.67c0-1.59-.03-3.64-2.22-3.64c-2.22 0-2.56 1.73-2.56 3.53V24h-4V8Z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/patrickxChen"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-text/90 transition hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12C0 17.3 3.44 21.8 8.21 23.39C8.81 23.5 9.03 23.13 9.03 22.82C9.03 22.54 9.02 21.8 9.02 20.92C5.67 21.65 4.97 19.31 4.97 19.31C4.42 17.91 3.63 17.53 3.63 17.53C2.55 16.79 3.71 16.8 3.71 16.8C4.9 16.88 5.53 18.03 5.53 18.03C6.6 19.86 8.34 19.33 9.02 19.02C9.13 18.25 9.44 17.73 9.79 17.44C7.11 17.13 4.34 16.1 4.34 11.5C4.34 10.19 4.81 9.12 5.57 8.28C5.45 7.98 5.03 6.76 5.69 5.11C5.69 5.11 6.7 4.79 9 6.35C9.96 6.08 10.98 5.95 12 5.95C13.02 5.95 14.04 6.08 15 6.35C17.3 4.79 18.31 5.11 18.31 5.11C18.97 6.76 18.55 7.98 18.43 8.28C19.19 9.12 19.66 10.19 19.66 11.5C19.66 16.11 16.88 17.12 14.2 17.43C14.64 17.81 15.04 18.56 15.04 19.71C15.04 21.36 15.03 22.39 15.03 22.82C15.03 23.13 15.25 23.51 15.86 23.39C20.63 21.79 24 17.3 24 12C24 5.37 18.63 0 12 0Z" />
                </svg>
                GitHub
              </a>
              <a
                href="/resume/Patrick_Chen_External_Resume2026.pdf"
                download
                className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Resume
              </a>
            </div>

            <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="org-badge">
                <img src="/images/simplyEmbedded.png" alt="Simply Embedded logo" className="h-12 w-12 rounded object-contain" />
                <p className="text-sm text-text/85">Previously at Simply Embedded</p>
              </div>
              <div className="org-badge">
                <img src="/images/CodeUnity.png" alt="CodeUnity logo" className="h-12 w-12 rounded object-contain" />
                <p className="text-sm text-text/85">Co-Founder at CodeUnity</p>
              </div>
            </div>

            <div className="mt-8">
              <HeroCta label="View Projects" to="/projects#projects-section" />
            </div>
          </div>

          <div className="hero-image-frame animate-hero-enter relative z-10">
            <img
              src="/images/PatrickChenProtrait.JPG"
              alt="Portrait of Patrick Chen"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
