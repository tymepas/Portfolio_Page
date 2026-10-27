import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CaseStudyHero } from "@/components/case-study/hero";
import {
  CaseSection,
  DecisionGrid,
  LimitationsPanel,
  MoreWork,
  PrincipleList,
  SourceLink,
  TechSummary,
} from "@/components/case-study/parts";
import { DiagramFrame, FlowSteps } from "@/components/visuals/diagram";
import { RuleExplorer } from "@/components/visuals/rule-explorer";
import { SwimlaneFigure } from "@/components/visuals/swimlane";
import { VerdictBoundary, VerdictJourney } from "@/components/visuals/verdict-visuals";
import { auditflowCaseStudy } from "@/content/case-studies/auditflow";
import { verdictCaseStudy as study } from "@/content/case-studies/verdict";
import { featuredProjects, type Project } from "@/content/projects";

function projectBySlug(slug: string): Project {
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`No featured project with slug "${slug}"`);
  return project;
}

const project = projectBySlug(study.slug);
const nextProject = projectBySlug(auditflowCaseStudy.slug);
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

export default function VerdictCaseStudy() {
  return (
    <article aria-labelledby="verdict-title">
      <CaseStudyHero
        project={project}
        titleId="verdict-title"
        eyebrow={study.hero.eyebrow}
        lede={study.hero.lede}
        facts={study.hero.facts}
        sections={Object.values(sections)}
        visual={
          <VerdictBoundary
            dimensions={study.rule.dimensions}
            verdicts={study.rule.thresholds.map((threshold) => threshold.verdict)}
          />
        }
      />

      <CaseSection heading={sections.problem} index={1}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div
            className="max-w-3xl space-y-5 text-[1.0625rem] leading-relaxed text-muted lg:col-span-7"
            data-reveal=""
          >
            {study.problem.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside
            aria-label="Scope of an analysis"
            className="scope-card lg:col-span-5"
            data-reveal=""
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <h3 className="diagram-label">What an analysis uses</h3>
            <ul className="flex flex-wrap gap-1.5">
              {study.problem.considered.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="diagram-label mt-6">What it does not consider</h3>
            <ul className="flex flex-wrap gap-1.5">
              {study.problem.notConsidered.map((item) => (
                <li key={item} className="chip chip-out">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-subtle">
              Every report lists both, from fixed values in code.
            </p>
            <div className="mt-3">
              <SourceLink repository={repository} source={study.problem.scopeSource} />
            </div>
            <p className="scope-caveat">{study.problem.caveat}</p>
          </aside>
        </div>
      </CaseSection>

      <CaseSection heading={sections.architecture} index={2}>
        <div data-reveal="">
          <SwimlaneFigure diagram={study.architecture.diagram} figure="02" repository={repository} />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8" data-reveal="">
            <DiagramFrame figure="03" title={study.architecture.styleDna.title}>
              <FlowSteps steps={study.architecture.styleDna.steps} layout="rail" />
              <div className="mt-6 border-t border-line pt-4">
                <SourceLink repository={repository} source={study.architecture.styleDna.source} />
              </div>
            </DiagramFrame>
          </div>
          <aside
            aria-label="Development mode"
            className="note-card lg:col-span-4"
            data-reveal=""
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <h3 className="diagram-label">Development mode</h3>
            <p className="text-[0.9375rem] leading-relaxed text-muted">{study.architecture.mockNote}</p>
            <div className="mt-4">
              <SourceLink repository={repository} source={study.architecture.mockSource} />
            </div>
          </aside>
        </div>
      </CaseSection>

      <CaseSection heading={sections.decisions} index={3}>
        <DecisionGrid decisions={study.decisions} repository={repository} />
      </CaseSection>

      <CaseSection heading={sections.journey} index={4}>
        <div data-reveal="">
          <VerdictJourney steps={study.journey} repository={repository} />
        </div>
      </CaseSection>

      <CaseSection heading={sections.approach} index={5}>
        <PrincipleList principles={study.principles} repository={repository} />
        <div className="mt-14" data-reveal="">
          <DiagramFrame figure="05" title="Try the verdict rule" note="Runs in your browser · no model call">
            <p className="mb-7 max-w-3xl text-[0.9375rem] leading-relaxed text-muted">
              Choose a rating for each dimension to see the score and verdict the app would give.
              This runs the same weights, thresholds, and rounding as the app&rsquo;s code; the
              ratings are yours, not a model&rsquo;s. Samples A and B are the fixed ratings the
              app returns in its mock mode.
            </p>
            <RuleExplorer
              dimensions={study.rule.dimensions}
              points={study.rule.points}
              thresholds={study.rule.thresholds}
              fallbackVerdict={study.rule.fallbackVerdict}
              presets={study.rule.presets}
              source={<SourceLink repository={repository} source={study.rule.source} />}
            />
          </DiagramFrame>
        </div>
      </CaseSection>

      <CaseSection heading={sections.limits} index={6}>
        <LimitationsPanel limitations={study.limitations} nextSteps={study.nextSteps} />
      </CaseSection>

      <CaseSection heading={sections.summary} index={7}>
        <TechSummary rows={study.summary} project={project} repository={repository} />
      </CaseSection>

      <MoreWork next={nextProject} teaser={auditflowCaseStudy.teaser} currentTitle={project.title} />
    </article>
  );
}
