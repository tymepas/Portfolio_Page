import type { CSSProperties, ReactNode } from "react";
import { pad, SourceLink } from "@/components/case-study/parts";
import { DiagramFrame } from "@/components/visuals/diagram";
import type { Decider, IssueType, PipelineStage } from "@/content/case-studies/auditflow";
import type { CaseStudyRepository } from "@/content/case-studies/shared";

/*
 * AuditFlow's figures. Each stage and issue type says who decides it: the
 * model, code, or the model given a check computed in code. Teal marks code
 * and violet marks the model, as everywhere on the site, and the marker shape
 * and text carry the same meaning without colour.
 */

const deciderText: Record<Decider, string> = {
  model: "Model",
  code: "Code",
  checked: "Model + code check",
};

// For narrow places, such as the hero figure's five columns.
const deciderShortText: Record<Decider, string> = {
  ...deciderText,
  checked: "Model + code",
};

// The diagram kinds whose markers stand for each decider.
const deciderKinds: Record<Decider, ("model" | "rule")[]> = {
  model: ["model"],
  code: ["rule"],
  checked: ["model", "rule"],
};

function DeciderTag({ decider, short = false }: { decider: Decider; short?: boolean }) {
  return (
    <span className="decider" data-decider={decider}>
      <span aria-hidden="true" className="decider-marks">
        {deciderKinds[decider].map((kind) => (
          <span key={kind} className="kind-scope" data-kind={kind}>
            <span className="flow-marker" />
          </span>
        ))}
      </span>
      {(short ? deciderShortText : deciderText)[decider]}
    </span>
  );
}

/** The hero figure: a bundle of documents through five stages to a person. */
export function AuditflowRibbon({ stages }: { stages: PipelineStage[] }) {
  return (
    <DiagramFrame figure="01" title="One check, from documents to a person">
      <div className="ribbon">
        <ul className="ribbon-docs" aria-label="Documents in a check">
          {["INV", "PO", "REC", "BNK", "LED"].map((code, index) => (
            <li key={code} className="ribbon-doc" style={{ "--i": index } as CSSProperties}>
              <span aria-hidden="true" className="ribbon-doc-fold" />
              {code}
            </li>
          ))}
        </ul>
        <p className="sr-only">
          Invoice, purchase order, receipt, bank statement, and ledger entry.
        </p>

        <ol className="ribbon-stages" style={{ "--count": stages.length } as CSSProperties}>
          {stages.map((stage, index) => (
            <li
              key={stage.name}
              className="ribbon-stage"
              data-decider={stage.decidedBy}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="font-mono text-[0.6875rem] text-subtle">{pad(index + 1)}</span>
              <span className="ribbon-name">{stage.name}</span>
              <DeciderTag decider={stage.decidedBy} short />
            </li>
          ))}
        </ol>

        <div className="ribbon-end">
          <p className="ribbon-person kind-scope" data-kind="human">
            <span aria-hidden="true" className="flow-node">
              <span className="flow-marker" />
            </span>
            <span>
              <span className="block font-medium text-fg">A person reviews every finding</span>
              <span className="block text-subtle">and can raise each one in Zoho Desk</span>
            </span>
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}

/** The five-stage pipeline in full: each stage's model work and code work. */
export function AuditflowPipeline({
  inputs,
  inputNote,
  stages,
  outcomes,
  repository,
}: {
  inputs: string[];
  inputNote: string;
  stages: PipelineStage[];
  outcomes: { clear: string; review: string; ticket: string; report: string };
  repository: CaseStudyRepository;
}) {
  return (
    <DiagramFrame figure="02" title="Five stages, and who decides each one">
      <div className="flow-inputs">
        <p className="diagram-label">Documents in</p>
        <ul className="flex flex-wrap gap-1.5">
          {inputs.map((input, index) => (
            <li key={input} className="chip" style={{ "--i": index } as CSSProperties}>
              {input}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[0.8125rem] text-subtle">{inputNote}</p>
      </div>

      <ol className="stages" style={{ "--count": stages.length } as CSSProperties}>
        {stages.map((stage, index) => (
          <li
            key={stage.name}
            className="stage"
            data-decider={stage.decidedBy}
            style={{ "--i": index } as CSSProperties}
          >
            <div className="stage-head">
              <span aria-hidden="true" className="stage-node" />
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-subtle uppercase">
                {pad(index + 1)} · shown as “{stage.shownAs}”
              </p>
              <h3 className="stage-name">{stage.name}</h3>
              <p className="stage-decider">
                <span className="text-subtle">Decided by</span> <DeciderTag decider={stage.decidedBy} />
              </p>
              {stage.marks ? <p className="stage-mark">{stage.marks}</p> : null}
            </div>
            <dl className="stage-work">
              <div className="kind-scope" data-kind="model">
                <dt>
                  <span aria-hidden="true" className="flow-marker" />
                  Model
                </dt>
                <dd>{stage.model}</dd>
              </div>
              <div className="kind-scope" data-kind="rule">
                <dt>
                  <span aria-hidden="true" className="flow-marker" />
                  Code
                </dt>
                <dd>{stage.code}</dd>
              </div>
            </dl>
            <SourceLink repository={repository} source={stage.source} />
          </li>
        ))}
      </ol>

      <div className="stage-exits">
        <p className="diagram-label">After the Decision stage</p>
        <ul>
          <li className="kind-scope" data-kind="rule">
            <span aria-hidden="true" className="flow-marker" />
            {outcomes.clear}
          </li>
          <li className="kind-scope" data-kind="human">
            <span aria-hidden="true" className="flow-marker" />
            {outcomes.review}
          </li>
          <li className="kind-scope" data-kind="service">
            <span aria-hidden="true" className="flow-marker" />
            {outcomes.ticket}
          </li>
          <li className="kind-scope" data-kind="output">
            <span aria-hidden="true" className="flow-marker" />
            {outcomes.report}
          </li>
        </ul>
      </div>
    </DiagramFrame>
  );
}

/** The bounded issue taxonomy, with who decides each type and its benchmark cases. */
export function IssueTaxonomy({
  issues,
  source,
}: {
  issues: IssueType[];
  source: ReactNode;
}) {
  return (
    <DiagramFrame figure="04" title="Eight issue types, and nothing else">
      <ul className="issues">
        {issues.map((issue, index) => (
          <li key={issue.type} className="issue" style={{ "--i": index } as CSSProperties}>
            <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
              <span className="font-medium text-fg">{issue.label}</span>
              <DeciderTag decider={issue.decidedBy} />
            </p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{issue.rule}</p>
            <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.06em] text-subtle">
              <code className="text-muted">{issue.type}</code>
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {issue.cases.length === 1 ? "case" : "cases"} {issue.cases.join(", ")}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="text-[0.8125rem] text-subtle">
          Cases are the synthetic benchmark cases that expect the finding.
        </p>
        {source}
      </div>
    </DiagramFrame>
  );
}

/** A file from the repository, shown verbatim. */
export function FileExcerpt({
  path,
  content,
  figure,
  title,
  href,
}: {
  path: string;
  content: string;
  figure: string;
  title: string;
  href: string;
}) {
  return (
    <DiagramFrame figure={figure} title={title} note="From the repository">
      <p className="excerpt-path">
        <a href={href} target="_blank" rel="noopener noreferrer" className="source-link">
          <code>{path}</code>
          <span className="sr-only"> (source on GitHub, opens in a new tab)</span>
        </a>
      </p>
      <pre className="excerpt">
        <code>{content}</code>
      </pre>
    </DiagramFrame>
  );
}
