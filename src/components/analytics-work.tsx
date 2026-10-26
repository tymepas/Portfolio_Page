import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { analyticsProjects } from "@/content/projects";
import { githubUrl } from "@/content/site";

export function AnalyticsWork() {
  return (
    <section
      id="analytics"
      aria-labelledby="analytics-heading"
      className="border-t border-line pt-16 pb-20 sm:pt-20 sm:pb-28"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="analytics-heading"
            eyebrow="Analytics"
            title="Data analysis and dashboards"
            description="Alongside AI applications, I clean, analyze, and report on data with Python, SQL, and Power BI. This project connects a live public API to a Power BI report."
          />
          <a
            href={`${githubUrl}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-strong hover:decoration-accent-strong"
          >
            More analytics repositories on GitHub
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <ul className="grid gap-5 lg:col-span-6 lg:col-start-7">
          {analyticsProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
