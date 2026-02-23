import { ContactForm } from '../components/contact/ContactForm'

export function ContactPage() {
  return (
    <main className="app-container py-12 md:py-16">
      <section className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-text md:text-4xl">Contact</h1>
          <p className="max-w-2xl text-base leading-7 text-text/75">
            Have an opportunity, collaboration idea, or question? Send me a message below, or email me
            directly.
          </p>
          <a
            href="mailto:patrickccc47@gmail.com"
            className="inline-flex rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-text/90 transition hover:border-accent/45 hover:text-accent"
          >
            patrickccc47@gmail.com
          </a>
        </div>

        <ContactForm />
      </section>
    </main>
  )
}
