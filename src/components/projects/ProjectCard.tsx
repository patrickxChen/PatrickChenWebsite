import type { Project } from '../../types/project'

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="project-card animate-card-enter rounded-xl border border-white/10 p-6"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="icon-box mb-5 h-14 w-14 rounded-lg border border-accent/40 bg-accent/10 text-lg font-semibold text-accent">
        {project.iconText}
      </div>

      <h2 className="text-xl font-semibold text-text">{project.title}</h2>

      <div className="project-image mt-4 overflow-hidden rounded-lg border border-white/10">
        <img
          src={project.imageUrl}
          alt={`${project.title} preview`}
          className="h-44 w-full object-cover transition duration-300 hover:scale-[1.02]"
        />
      </div>

      <p className="mt-3 text-sm leading-6 text-text/75">{project.summary}</p>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-text/60">Technologies Used</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-white/15 bg-bg/60 px-3 py-1 text-xs font-medium text-text/85"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>

      {(project.repoUrl || project.liveUrl) ? (
        <div className="mt-6 flex items-center gap-3">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-accent/40 px-3 py-2 text-xs font-semibold text-accent transition hover:bg-accent hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              GitHub
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/20 px-3 py-2 text-xs font-semibold text-text/90 transition hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Live Demo
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
