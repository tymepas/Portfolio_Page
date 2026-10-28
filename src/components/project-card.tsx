import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/button-link";
import { ProjectDiagramView, ProjectScreenshotFigure } from "@/components/visuals/project-visual";
import type { Project, ProjectLink } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

type ProjectHeaderProps = {
  project: Project;
  /** Position within a numbered set, shown as "01 / 04". Omit to hide. */
  position?: { index: number; total: number };
};

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="btn-arrow" fill="none">
      <path
        d="M5 11 11 5M6 5h5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLink({
  link,
  projectTitle,
  prominent = false,
}: {
  link: ProjectLink;
  projectTitle: string;
  prominent?: boolean;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={prominent ? "btn btn-secondary btn-compact" : "text-link"}
    >
      <span>{link.label}</span>
      <ArrowUpRight />
      <span className="sr-only">
        {" "}
        for {projectTitle} (opens in a new tab)
      </span>
    </a>
  );
}

export function ContributionBadge({ project }: { project: Project }) {
  const collaborators = project.collaborators ?? [];
  if (collaborators.length > 0) {
    return (
      <span className="badge badge-team">
        <span aria-hidden="true" className="badge-dot" />
        Team project · with {collaborators.join(", ")}
      </span>
    );
  }
  return <span className="badge badge-solo">Individual project</span>;
}

export function ProjectHighlights({
  project,
  className = "space-y-3",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <ul className={`text-[0.9375rem] leading-relaxed text-fg/90 ${className}`}>
      {project.highlights.map((highlight) => (
        <li key={highlight} className="grid grid-cols-[1.125rem_1fr] gap-1">
          <span aria-hidden="true" className="mt-[0.7rem] block h-px w-2.5 bg-teal" />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectFacts({ project }: { project: Project }) {
  if (!project.role && !project.context) return null;
  return (
    <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-line pt-5 text-sm">
      {project.role ? (
        <>
          <dt className="font-mono text-[0.6875rem] leading-5 tracking-[0.12em] text-subtle uppercase">
            My role
          </dt>
          <dd className="text-fg">{project.role}</dd>
        </>
      ) : null}
      {project.context ? (
        <>
          <dt className="font-mono text-[0.6875rem] leading-5 tracking-[0.12em] text-subtle uppercase">
            Context
          </dt>
          <dd className="text-muted">{project.context}</dd>
        </>
      ) : null}
    </dl>
  );
}

export function ProjectStack({ project, className = "mt-6" }: { project: Project; className?: string }) {
  return (
    <>
      <h4 className="sr-only">Technologies</h4>
      <ul className={`flex flex-wrap gap-1.5 ${className}`}>
        {project.stack.map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * A case study leads; a live app or a static export gets the secondary
 * button; the repository is a text link.
 */
export function ProjectLinks({ project, className = "mt-8" }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {project.caseStudy ? (
        <ButtonLink href={project.caseStudy} className="btn-compact">
          Read the case study
          <span className="sr-only">: {project.title}</span>
        </ButtonLink>
      ) : null}
      {project.demo ? (
        <ExternalLink link={project.demo} projectTitle={project.title} prominent />
      ) : null}
      {project.report ? (
        <ExternalLink link={project.report} projectTitle={project.title} prominent={!project.demo} />
      ) : null}
      <ExternalLink link={project.repository} projectTitle={project.title} />
    </div>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <ProjectHighlights project={project} />
      <ProjectFacts project={project} />
      <ProjectStack project={project} />
      <ProjectLinks project={project} />
    </>
  );
}

/** Category, position in the set, and the project's heading. */
export function ProjectTitle({ project, position }: ProjectHeaderProps) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4 font-mono text-label uppercase">
        <span className="text-muted">{project.category}</span>
        {position ? (
          <span aria-hidden="true" className="shrink-0 whitespace-nowrap text-subtle">
            <span className="text-teal">{String(position.index + 1).padStart(2, "0")}</span> /{" "}
            {String(position.total).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3
        id={`project-${project.slug}`}
        className="mt-5 font-display text-title font-semibold text-balance-safe text-fg"
      >
        {project.title}
      </h3>
    </>
  );
}

export function ProjectHeader({ project, position }: ProjectHeaderProps) {
  return (
    <>
      <ProjectTitle project={project} position={position} />
      <p className="mt-4">
        <ContributionBadge project={project} />
      </p>
      <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{project.summary}</p>
    </>
  );
}

/*
 * Both layouts place the header, visual, and details in named grid areas. The
 * header is never placed below the diagram, so a diagram is never shown before
 * the reader knows which project it belongs to.
 */

/**
 * A large, two-column presentation: the architecture diagram (and any
 * authentic screenshot) beside the project details. `reverse` swaps sides.
 */
export function ProjectFeature({
  project,
  index,
  total,
  reverse = false,
}: ProjectCardProps & { reverse?: boolean }) {
  const figure = String(index + 1).padStart(2, "0");

  return (
    <article
      id={project.slug}
      aria-labelledby={`project-${project.slug}`}
      data-spotlight=""
      data-reveal=""
      data-reverse={reverse ? "" : undefined}
      className="project-card project-feature"
    >
      <div className="project-head">
        <ProjectHeader project={project} position={{ index, total }} />
      </div>
      <div className="project-visual flex flex-col gap-6" data-tilt="">
        {project.diagram ? <ProjectDiagramView diagram={project.diagram} figure={figure} /> : null}
        {project.screenshot ? (
          <ProjectScreenshotFigure
            screenshot={project.screenshot}
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        ) : null}
      </div>
      <div className="project-body">
        <ProjectDetails project={project} />
      </div>
    </article>
  );
}

/** A compact presentation, at every width: the header, then the diagram, then the details. */
export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const figure = String(index + 1).padStart(2, "0");

  return (
    <article
      id={project.slug}
      aria-labelledby={`project-${project.slug}`}
      data-spotlight=""
      data-reveal=""
      style={{ "--reveal-delay": `${(index % 2) * 120}ms` } as CSSProperties}
      className="project-card project-compact h-full"
    >
      <div className="project-head">
        <ProjectHeader project={project} position={{ index, total }} />
      </div>
      {project.diagram ? (
        <div className="project-visual">
          <ProjectDiagramView diagram={project.diagram} figure={figure} />
        </div>
      ) : null}
      <div className="project-body">
        <ProjectDetails project={project} />
      </div>
    </article>
  );
}
