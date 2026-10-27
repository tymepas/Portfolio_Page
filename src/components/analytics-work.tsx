import { Container } from "@/components/container";
import {
  ContributionBadge,
  ProjectDetails,
  ProjectHeader,
  ProjectHighlights,
  ProjectLinks,
  ProjectStack,
  ProjectTitle,
} from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ProjectDiagramView, ProjectScreenshotFigure } from "@/components/visuals/project-visual";
import { ReportViewer } from "@/components/visuals/report-viewer";
import {
  analyticsProjects,
  featuredProjects,
  type Project,
  type ReportPreview,
} from "@/content/projects";
import { githubUrl } from "@/content/site";

type Position = { index: number; total: number };

/** A report project leads with its own pages: the report is the main visual. */
function ReportShowcase({
  project,
  preview,
  position,
}: {
  project: Project;
  preview: ReportPreview;
  position: Position;
}) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`project-${project.slug}`}
      data-spotlight=""
      data-reveal=""
      className="project-card analytics-showcase"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <ProjectTitle project={project} position={position} />
        </div>
        <div className="lg:col-span-5">
          <ContributionBadge project={project} />
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{project.summary}</p>
        </div>
      </div>

      <div className="mt-10">
        <ReportViewer preview={preview} label={`${project.title}: report pages`} />
      </div>

      <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h4 className="diagram-label">Analytical capabilities</h4>
          <ProjectHighlights project={project} className="grid gap-x-8 gap-y-3 sm:grid-cols-2" />
        </div>
        <div className="lg:col-span-5">
          <ProjectStack project={project} className="" />
          <ProjectLinks project={project} className="mt-6" />
        </div>
      </div>
    </article>
  );
}

/** A complementary dashboard: screenshot beside the details, data flow below. */
function DashboardCard({
  project,
  position,
  figure,
}: {
  project: Project;
  position: Position;
  figure: string;
}) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`project-${project.slug}`}
      data-spotlight=""
      data-reveal=""
      className="project-card analytics-card"
    >
      <div className="project-head">
        <ProjectHeader project={project} position={position} />
      </div>
      {project.screenshot ? (
        <div className="project-visual">
          <ProjectScreenshotFigure
            screenshot={project.screenshot}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="shot-dashboard"
          />
        </div>
      ) : null}
      <div className="project-body">
        <ProjectDetails project={project} />
      </div>
      {project.diagram ? (
        <div className="analytics-diagram">
          <ProjectDiagramView diagram={project.diagram} figure={figure} />
        </div>
      ) : null}
    </article>
  );
}

export function AnalyticsWork() {
  const total = analyticsProjects.length;
  // Figure numbers continue from the AI project diagrams.
  const firstFigure = featuredProjects.filter((project) => project.diagram).length + 1;
  const figureFor = (index: number) =>
    String(
      firstFigure + analyticsProjects.slice(0, index).filter((project) => project.diagram).length,
    ).padStart(2, "0");

  return (
    <section
      id="analytics"
      aria-labelledby="analytics-heading"
      className="analytics relative isolate py-[var(--section-space)]"
    >
      <div aria-hidden="true" className="analytics-backdrop" />
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="analytics-heading"
            index="02"
            eyebrow="Analytics"
            title="Data analysis and dashboards"
            description="Alongside AI applications, I clean, analyze, and report on data with Python, SQL, and Power BI. These projects range from a six-page election results report to a pipeline that connects a live public API to a Power BI report."
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:justify-self-end lg:pb-2" data-reveal="fade">
            <a
              href={`${githubUrl}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <span>More analytics repositories on GitHub</span>
              <svg viewBox="0 0 16 16" aria-hidden="true" className="btn-arrow" fill="none">
                <path
                  d="M5 11 11 5M6 5h5v5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <ul className="mt-16 grid gap-8 lg:mt-20">
          {analyticsProjects.map((project, index) => (
            <li key={project.slug}>
              {project.preview ? (
                <ReportShowcase
                  project={project}
                  preview={project.preview}
                  position={{ index, total }}
                />
              ) : (
                <DashboardCard
                  project={project}
                  position={{ index, total }}
                  figure={figureFor(index)}
                />
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
