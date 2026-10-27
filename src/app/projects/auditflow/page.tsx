import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CaseStudyHero } from "@/components/case-study/hero";
import {
  CaseSection,
  DecisionGrid,
  LimitationsPanel,
  MoreWork,
  SourceLink,
  TechSummary,
} from "@/components/case-study/parts";
import {
  AuditflowPipeline,
  AuditflowRibbon,
  FileExcerpt,
  IssueTaxonomy,
} from "@/components/visuals/auditflow-visuals";
import { ProjectScreenshotFigure } from "@/components/visuals/project-visual";
import { SwimlaneFigure } from "@/components/visuals/swimlane";
import { TicketScenarios } from "@/components/visuals/ticket-scenarios";
import { auditflowCaseStudy as study, type Contribution } from "@/content/case-studies/auditflow";
import { commitUrl, sourceUrl } from "@/content/case-studies/shared";
import { verdictCaseStudy } from "@/content/case-studies/verdict";
import { featuredProjects, type Project } from "@/content/projects";

function projectBySlug(slug: string): Project {
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`No featured project with slug "${slug}"`);
  return project;
}

const project = projectBySlug(study.slug);
const nextProject = projectBySlug(verdictCaseStudy.slug);
const { repository, sections } = study;

export const metadata: Metadata = {
  title: study.meta.title,
  description: study.meta.description,
  openGraph: {
    title: study.meta.title,
    description: study.meta.description,
    type: "article",
  },
};

function TextList({ items, tone }: { items: string[]; tone: "yes" | "no" }) {
  return (
    <ul className="text-list" data-tone={tone}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function MyContribution({ items }: { items: Contribution[] }) {
  return (
    <ol className="contrib-list">
      {items.map((item) => (
        <li key={item.title}>
          <p className="font-medium text-fg">{item.title}</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.detail}</p>
          {item.commits.length > 0 ? (
            <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.75rem] text-subtle">
              <span>{item.commits.length === 1 ? "Commit" : "Commits"}</span>
              {item.commits.map((sha) => (
                <a
                  key={sha}
                  href={commitUrl(repository, sha)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  <code>{sha.slice(0, 7)}</code>
                  <span className="sr-only"> (commit on GitHub, opens in a new tab)</span>
                </a>
              ))}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function AuditflowCaseStudy() {
  const { contribution, evaluation, tickets } = study;

  return (
    <article aria-labelledby="auditflow-title">
      <CaseStudyHero
        project={project}
        titleId="auditflow-title"
        eyebrow={study.hero.eyebrow}
        lede={study.hero.lede}
        facts={study.hero.facts}
        sections={Object.values(sections)}
        visual={<AuditflowRibbon stages={study.pipeline.stages} />}
      />

      <CaseSection heading={sections.problem} index={1}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="max-w-3xl space-y-5 text-[1.0625rem] leading-relaxed text-muted" data-reveal="">
              {study.problem.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="objectives" data-reveal="">
              {study.problem.objectives.map((objective, index) => (
                <li key={objective.title}>
                  <p className="font-mono text-label text-teal">
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")} </span>
                    {objective.title}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{objective.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside
            aria-label="What AuditFlow does not decide"
            className="lg:col-span-5 lg:self-start"
            data-reveal=""
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <figure className="quote-card">
              <blockquote>
                <p>&ldquo;{study.problem.disclaimer}&rdquo;</p>
              </blockquote>
              <figcaption>
                The closing line of every Zoho Desk ticket AuditFlow creates. Findings are document
                check results for an auditor to review, never conclusions about fraud or compliance.
                <span className="mt-3 block">
                  <SourceLink repository={repository} source={study.problem.disclaimerSource} />
                </span>
              </figcaption>
            </figure>
          </aside>
        </div>
      </CaseSection>

      <CaseSection heading={sections.pipeline} index={2}>
        <div data-reveal="">
          <AuditflowPipeline
            inputs={study.pipeline.inputs}
            inputNote={study.pipeline.inputNote}
            stages={study.pipeline.stages}
            outcomes={study.pipeline.outcomes}
            repository={repository}
          />
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {study.pipeline.where.map((item, index) => (
            <li
              key={item.title}
              className="note-card"
              data-reveal=""
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
            >
              <h3 className="diagram-label">{item.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-subtle" data-reveal="fade">
          The stages run in sequence behind one API call; see{" "}
          <SourceLink repository={repository} source={study.pipeline.orchestration} />.
        </p>
      </CaseSection>

      <CaseSection heading={sections.tickets} index={3}>
        <p className="attribution" data-reveal="">
          <span className="badge badge-team">
            <span aria-hidden="true" className="badge-dot" />
            Teammate&rsquo;s work
          </span>
          <span>{tickets.attribution}</span>
        </p>
        <div className="mt-6" data-reveal="">
          <TicketScenarios scenarios={tickets.scenarios}>
            <SwimlaneFigure diagram={tickets.diagram} figure="03" repository={repository} />
          </TicketScenarios>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="note-card" data-reveal="">
            <h3 className="diagram-label">What a ticket request carries</h3>
            <TextList items={tickets.sent} tone="yes" />
          </div>
          <div
            className="note-card"
            data-reveal=""
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <h3 className="diagram-label">What the integration doesn&rsquo;t do</h3>
            <TextList items={tickets.notDone} tone="no" />
          </div>
        </div>
      </CaseSection>

      <CaseSection heading={sections.evaluation} index={4}>
        <div data-reveal="">
          <IssueTaxonomy
            issues={evaluation.issues}
            source={<SourceLink repository={repository} source={evaluation.issuesSource} />}
          />
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal="">
            <h3 className="font-display text-heading font-semibold text-fg">The benchmark</h3>
            <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-muted">
              {evaluation.benchmark.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <h4 className="diagram-label mt-8">Tested</h4>
            <TextList items={evaluation.tested} tone="yes" />
            <h4 className="diagram-label mt-6">Not established</h4>
            <TextList items={evaluation.notEstablished} tone="no" />
          </div>
          <div
            className="min-w-0 lg:col-span-6"
            data-reveal=""
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <FileExcerpt
              figure="05"
              title="Ground truth for a multi-issue case"
              path={evaluation.groundTruthPath}
              content={evaluation.groundTruth}
              href={sourceUrl(repository, { path: evaluation.groundTruthPath })}
            />
          </div>
        </div>
        {project.screenshot ? (
          <div className="mt-10" data-reveal="">
            <ProjectScreenshotFigure
              screenshot={project.screenshot}
              sizes="(min-width: 1376px) 1280px, 100vw"
            />
          </div>
        ) : null}
      </CaseSection>

      <CaseSection heading={sections.contribution} index={5}>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <section aria-labelledby="auditflow-mine" className="contrib-card lg:col-span-7" data-reveal="">
            <h3 id="auditflow-mine" className="contrib-title">
              Garvit Mathur <span className="text-subtle">(me)</span>
            </h3>
            <MyContribution items={contribution.mine} />
          </section>
          <section
            aria-labelledby="auditflow-teammate"
            className="contrib-card contrib-card-team lg:col-span-5 lg:self-start"
            data-reveal=""
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <h3 id="auditflow-teammate" className="contrib-title">
              {contribution.teammate.name}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              <span className="text-fg">README:</span> {contribution.teammate.readme}
            </p>
            <h4 className="diagram-label mt-6">From the commit history</h4>
            <TextList items={contribution.teammate.items} tone="yes" />
            <p className="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-subtle">
              The pipeline described on this page follows Abhijit&rsquo;s agent specification. Only
              the parts listed under my name are ones I built.
            </p>
          </section>
        </div>
      </CaseSection>

      <CaseSection heading={sections.decisions} index={6}>
        <DecisionGrid decisions={study.decisions} repository={repository} />
      </CaseSection>

      <CaseSection heading={sections.limits} index={7}>
        <LimitationsPanel limitations={study.limitations} nextSteps={study.nextSteps} />
      </CaseSection>

      <CaseSection heading={sections.summary} index={8}>
        <TechSummary rows={study.summary} project={project} repository={repository} />
      </CaseSection>

      <MoreWork next={nextProject} teaser={verdictCaseStudy.teaser} currentTitle={project.title} />
    </article>
  );
}
