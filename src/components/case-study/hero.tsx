import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { pad, ProjectActions } from "@/components/case-study/parts";
import { Container } from "@/components/container";
import { KineticHeadline } from "@/components/kinetic-headline";
import { ContributionBadge } from "@/components/project-card";
import type { CaseStudyFact, SectionHeading } from "@/content/case-studies/shared";
import type { Project } from "@/content/projects";

type CaseStudyHeroProps = {
  project: Project;
  titleId: string;
  eyebrow: string;
  lede: string;
  facts: CaseStudyFact[];
  sections: SectionHeading[];
  /** The technical figure beside the introduction. */
  visual: ReactNode;
};

/**
 * The opening of a case study: where it sits in the site, what the project
 * is, who built it, and a figure of how it works. Like the homepage hero, the
 * entrance is plain CSS, so it plays on first paint.
 */
export function CaseStudyHero({
  project,
  titleId,
  eyebrow,
  lede,
  facts,
  sections,
  visual,
}: CaseStudyHeroProps) {
  return (
    <header className="cs-hero">
      <div aria-hidden="true" className="hero-backdrop" />

      <Container className="relative">
        <nav aria-label="Breadcrumb" className="cs-crumbs">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#work">Work</Link>
            </li>
            <li>
              <span aria-current="page">{project.title}</span>
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid items-start gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <div className="cs-hero-copy lg:col-span-5">
            <p className="hero-eyebrow">
              <span aria-hidden="true" className="hero-beacon" />
              {eyebrow}
            </p>
            <KineticHeadline
              id={titleId}
              words={[{ text: project.title }]}
              className="mt-6 font-display text-hero font-semibold text-fg"
            />
            <p className="mt-6 max-w-xl text-lede text-muted">{lede}</p>
            <p className="mt-6">
              <ContributionBadge project={project} />
            </p>
            <div className="mt-8">
              <ProjectActions project={project} />
            </div>
          </div>

          <div className="cs-hero-visual hero-map lg:col-span-7">{visual}</div>
        </div>

        <dl className="cs-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt>Stack</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <nav aria-label="On this page" className="cs-toc">
          <p className="cs-toc-label">On this page</p>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id} style={{ "--i": index } as CSSProperties}>
                <a href={`#${section.id}`}>
                  <span aria-hidden="true">{pad(index + 1)}</span>
                  {section.nav}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </header>
  );
}
