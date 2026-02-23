import { ProjectsGrid } from '../components/projects/ProjectsGrid'
import { projects } from '../data/projects'

export function ProjectsPage() {
  return (
    <main id="projects-section" className="app-container py-12 md:py-16">
      <section className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-text md:text-4xl">Projects</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text/75">
            Selected work from my GitHub and personal builds. Each card highlights the project focus and
            technologies used.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </section>
    </main>
  )
}
