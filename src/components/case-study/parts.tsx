import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Container } from "@/components/container";
import {
  commitUrl,
  sourceUrl,
  type CaseStudyRepository,
  type EngineeringDecision,
  type Limitation,
  type NextStep,
  type Principle,
  type SectionHeading,
  type SourceRef,
  type SummaryRow,
} from "@/content/case-studies/shared";
import type { Project } from "@/content/projects";

/*
 * Building blocks shared by the case-study pages. Claims link to the code
 * they describe, and every label says how a statement is known: confirmed in
 * the code, documented in the repository, inferred, or only proposed.
 */

export const pad = (value: number) => String(value).padStart(2, "0");

/** Text that can wrap after any slash, rather than in the middle of a name. */
function SlashBreaks({ text }: { text: string }) {
  const parts = text.split("/");
  return parts.map((part, index) => (
    <Fragment key={`${index}-${part}`}>
      {part}
      {index < parts.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </Fragment>
  ));
}

function BreakablePath({ path }: { path: string }) {
  return (
    <code>
      <SlashBreaks text={path} />
    </code>
  );
}

/** A repository path, linked at the exact commit the page was checked against. */
export function SourceLink({
  repository,
  source,
}: {
  repository: CaseStudyRepository;
  source: SourceRef;
}) {
  return (
    <a
      href={sourceUrl(repository, source)}
      target="_blank"
      rel="noopener noreferrer"
      className="source-link"
    >
      <BreakablePath path={source.path} />
      {source.symbol ? <span className="source-symbol">{source.symbol}</span> : null}
      <span className="sr-only"> (source on GitHub, opens in a new tab)</span>
    </a>
  );
}

export function SourceList({
  repository,
  sources,
  className = "",
}: {
  repository: CaseStudyRepository;
  sources: SourceRef[];
  className?: string;
}) {
  return (
    <ul className={`source-list ${className}`}>
      {sources.map((source) => (
        <li key={`${source.path}#${source.symbol ?? ""}`}>
          <SourceLink repository={repository} source={source} />
        </li>
      ))}
    </ul>
  );
}

/** A numbered case-study section: index, eyebrow, heading, and optional intro. */
export function CaseSection({
  heading,
  index,
  children,
  className = "",
}: {
  heading: SectionHeading;
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${heading.id}-heading`;

  return (
    <section id={heading.id} aria-labelledby={headingId} className={`cs-section ${className}`}>
      <Container>
        <p className="section-index" data-reveal="fade">
          <span className="text-teal">{pad(index)}</span>
          <span>{heading.eyebrow}</span>
          <span aria-hidden="true" className="section-rule" data-reveal="line" />
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2
            id={headingId}
            data-reveal=""
            className="font-display text-title font-semibold text-balance-safe text-fg lg:col-span-7"
          >
            {heading.title}
          </h2>
          {heading.intro ? (
            <p
              data-reveal=""
              style={{ "--reveal-delay": "100ms" } as CSSProperties}
              className="max-w-2xl text-lede text-muted lg:col-span-5"
            >
              {heading.intro}
            </p>
          ) : null}
        </div>
        <div className="mt-12 lg:mt-14">{children}</div>
      </Container>
    </section>
  );
}

const basisLabel: Record<EngineeringDecision["rationale"]["basis"], string> = {
  documented: "Documented in the repository",
  inferred: "Inferred from the code",
};

export function DecisionGrid({
  decisions,
  repository,
}: {
  decisions: EngineeringDecision[];
  repository: CaseStudyRepository;
}) {
  return (
    <ol className="grid gap-5 lg:grid-cols-2">
      {decisions.map((decision, index) => (
        <li
          key={decision.title}
          data-reveal=""
          style={{ "--reveal-delay": `${(index % 2) * 100}ms` } as CSSProperties}
        >
          <article className="decision-card" data-spotlight="">
            <p className="font-mono text-label text-subtle">
              <span className="text-teal">D{index + 1}</span>
            </p>
            <h3 className="mt-3 font-display text-heading font-semibold text-balance-safe text-fg">
              {decision.title}
            </h3>
            <dl className="decision-facts">
              <div>
                <dt>
                  <span className="cs-tag" data-tone="code">
                    Implemented
                  </span>
                </dt>
                <dd>
                  <p>{decision.implemented}</p>
                  <SourceList repository={repository} sources={decision.sources} className="mt-3" />
                </dd>
              </div>
              <div>
                <dt>
                  <span className="cs-tag" data-tone={decision.rationale.basis}>
                    Why · {basisLabel[decision.rationale.basis]}
                  </span>
                </dt>
                <dd>
                  <p>{decision.rationale.text}</p>
                  {decision.rationale.source ? (
                    <SourceList
                      repository={repository}
                      sources={[decision.rationale.source]}
                      className="mt-3"
                    />
                  ) : null}
                </dd>
              </div>
              <div>
                <dt>
                  <span className="cs-tag">Trade-off</span>
                </dt>
                <dd>
                  <p>{decision.tradeoff}</p>
                </dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ol>
  );
}

export function PrincipleList({
  principles,
  repository,
}: {
  principles: Principle[];
  repository: CaseStudyRepository;
}) {
  return (
    <ol className="principles">
      {principles.map((principle, index) => (
        <li
          key={principle.title}
          className="principle"
          data-reveal=""
          style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
        >
          <p aria-hidden="true" className="font-mono text-label text-teal">
            {pad(index + 1)}
          </p>
          <h3 className="mt-3 text-lg font-semibold text-fg">{principle.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{principle.detail}</p>
          <SourceList repository={repository} sources={principle.sources} className="mt-4" />
        </li>
      ))}
    </ol>
  );
}

const originLabel: Record<NextStep["origin"], string> = {
  roadmap: "From the project README",
  proposed: "Proposed here",
};

export function LimitationsPanel({
  limitations,
  nextSteps,
}: {
  limitations: Limitation[];
  nextSteps: NextStep[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="limits-card" data-reveal="">
        <h3 className="limits-title">
          <span className="cs-tag" data-tone="code">
            Current code
          </span>
          Known limitations
        </h3>
        <ul className="limits-list">
          {limitations.map((item) => (
            <li key={item.title}>
              <p className="font-medium text-fg">{item.title}</p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="limits-card limits-card-future"
        data-reveal=""
        style={{ "--reveal-delay": "100ms" } as CSSProperties}
      >
        <h3 className="limits-title">
          <span className="cs-tag" data-tone="proposed">
            Not built
          </span>
          Possible next steps
        </h3>
        <ul className="limits-list">
          {nextSteps.map((item) => (
            <li key={item.title}>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-medium text-fg">{item.title}</span>
                <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-subtle uppercase">
                  {originLabel[item.origin]}
                </span>
              </p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExternalArrow() {
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

/** The verified stack and links, as a spec sheet. */
export function TechSummary({
  rows,
  project,
  repository,
}: {
  rows: SummaryRow[];
  project: Project;
  repository: CaseStudyRepository;
}) {
  const links = [project.demo, project.repository].filter((link) => link !== undefined);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <dl className="spec-sheet lg:col-span-8" data-reveal="">
        {rows.map((row) => (
          <div key={row.label} className="spec-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <div
        className="lg:col-span-4"
        data-reveal=""
        style={{ "--reveal-delay": "100ms" } as CSSProperties}
      >
        <h3 className="diagram-label">Links</h3>
        <ul className="border-t border-line-strong">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row group"
              >
                <span className="font-mono text-label text-subtle uppercase">{link.label}</span>
                <span className="min-w-0 text-right [overflow-wrap:anywhere] text-fg transition-colors group-hover:text-teal-strong">
                  <SlashBreaks text={link.href.replace(/^https:\/\//, "").replace(/\/$/, "")} />
                  <span aria-hidden="true" className="contact-row-arrow">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-subtle">
          Checked against commit{" "}
          <a
            href={commitUrl(repository, repository.commit)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-muted underline decoration-line-bright underline-offset-4 transition-colors hover:text-teal-strong"
          >
            {repository.commit.slice(0, 7)}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          from <time dateTime={repository.committed}>{formatDate(repository.committed)}</time>, on{" "}
          <time dateTime={repository.checked}>{formatDate(repository.checked)}</time>. Links to
          source files point at that commit.
        </p>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  // Fixed locale and time zone so server and browser render the same text.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The live app and repository, as the hero's calls to action. */
export function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {project.demo ? (
        <a href={project.demo.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <span>Open the live app</span>
          <ExternalArrow />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
      <a
        href={project.repository.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary"
      >
        <span>View the repository</span>
        <ExternalArrow />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

/** Closing navigation: the other case study, and the way back to all work. */
export function MoreWork({
  next,
  teaser,
  currentTitle,
}: {
  next: Project;
  /** One line on the next case study, in that case study's own words. */
  teaser: string;
  currentTitle: string;
}) {
  return (
    <nav aria-label="More work" className="cs-more">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <Link href={next.caseStudy ?? "/#work"} className="cs-next lg:col-span-8" data-spotlight="">
            <span className="font-mono text-label text-subtle uppercase">Next case study</span>
            <span className="cs-next-title">{next.title}</span>
            <span className="text-[0.9375rem] leading-relaxed text-muted">{teaser}</span>
            <span aria-hidden="true" className="cs-next-arrow">
              →
            </span>
          </Link>
          <div className="cs-back lg:col-span-4">
            <p className="font-mono text-label text-subtle uppercase">After {currentTitle}</p>
            <ul className="mt-3 border-t border-line-strong">
              {[
                { href: "/#work", label: "All AI projects" },
                { href: "/#analytics", label: "Analytics work" },
                { href: "/#contact", label: "Get in touch" },
              ].map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link href={item.href} className="contact-row group">
                    <span className="text-fg transition-colors group-hover:text-teal-strong">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="contact-row-arrow">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
}
