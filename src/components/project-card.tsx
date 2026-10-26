import type { Project, ProjectLink } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

function ExternalLink({ link, projectTitle }: { link: ProjectLink; projectTitle: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-strong hover:decoration-accent-strong"
    >
      {link.label}
      <span className="sr-only">
        {" "}
        for {projectTitle} (opens in a new tab)
      </span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;
  const collaborators = project.collaborators ?? [];
  const isCollaborative = collaborators.length > 0;

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4 font-mono text-xs tracking-[0.12em] uppercase">
        <span className="text-accent">{project.category}</span>
        {index !== undefined ? (
          <span aria-hidden="true" className="text-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <h3 id={headingId} className="mt-5 font-display text-3xl tracking-tight text-ink">
        {project.title}
      </h3>

      <p className="mt-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            isCollaborative
              ? "border border-accent/30 bg-accent-soft text-accent-strong"
              : "border border-line bg-paper text-muted"
          }`}
        >
          {isCollaborative
            ? `Team project · with ${collaborators.join(", ")}`
            : "Individual project"}
        </span>
      </p>

      <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

      <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-ink">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="grid grid-cols-[1rem_1fr] gap-1">
            <span aria-hidden="true" className="mt-2.5 block h-px w-2.5 bg-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <h4 className="sr-only">Technologies</h4>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-paper px-2 py-1 font-mono text-[0.7rem] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.role || project.context ? (
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-line pt-5 text-sm">
            {project.role ? (
              <>
                <dt className="text-subtle">My role</dt>
                <dd className="text-ink">{project.role}</dd>
              </>
            ) : null}
            {project.context ? (
              <>
                <dt className="text-subtle">Context</dt>
                <dd className="text-ink">{project.context}</dd>
              </>
            ) : null}
          </dl>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <ExternalLink link={project.repository} projectTitle={project.title} />
          {project.demo ? (
            <ExternalLink link={project.demo} projectTitle={project.title} />
          ) : null}
        </div>
      </div>
    </article>
  );
}
