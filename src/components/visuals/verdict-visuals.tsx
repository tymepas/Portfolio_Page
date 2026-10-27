import type { CSSProperties } from "react";
import { pad, SourceLink } from "@/components/case-study/parts";
import { DiagramFrame, kindLabel } from "@/components/visuals/diagram";
import type { JourneyStep, VerdictDimension } from "@/content/case-studies/verdict";
import type { CaseStudyRepository } from "@/content/case-studies/shared";

/**
 * The hero figure: model output above a trust boundary, application logic
 * below it. On first paint the six ratings arrive, the boundary draws in, and
 * the verdict side settles last, in that order.
 */
export function VerdictBoundary({
  dimensions,
  verdicts,
}: {
  dimensions: VerdictDimension[];
  verdicts: string[];
}) {
  return (
    <DiagramFrame figure="01" title="Where the model stops and the code decides">
      <div className="boundary">
        <div className="boundary-zone kind-scope" data-kind="model">
          <p className="boundary-head">
            <span aria-hidden="true" className="flow-node">
              <span className="flow-marker" />
            </span>
            <span className="text-fg">Model output</span>
            <span className="flow-kind">Untrusted</span>
          </p>
          <ul className="boundary-dims" aria-label="Rated dimensions">
            {dimensions.map((dimension, index) => (
              <li key={dimension.key} style={{ "--i": index } as CSSProperties}>
                {dimension.label}
              </li>
            ))}
          </ul>
          <p className="boundary-note">Each: a rating, a reason, and a confidence</p>
        </div>

        <p className="boundary-line">
          <span>Zod strict schema</span>
        </p>

        <div className="boundary-zone kind-scope" data-kind="rule">
          <p className="boundary-head">
            <span aria-hidden="true" className="flow-node">
              <span className="flow-marker" />
            </span>
            <span className="text-fg">Application logic</span>
            <span className="flow-kind">Fixed rules</span>
          </p>
          <ol className="boundary-calc">
            <li>Weight five ratings</li>
            <li>One score</li>
            <li>Three thresholds</li>
          </ol>
          <ol className="outcome-scale boundary-verdicts" aria-label="Possible verdicts">
            {verdicts.map((verdict, index) => (
              <li
                key={verdict}
                style={{ "--level": 1 - index / verdicts.length } as CSSProperties}
              >
                {verdict}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </DiagramFrame>
  );
}

/**
 * The user journey as an animated sequence. Steps arrive in order once the
 * figure is revealed, and a signal relays through them while it is hovered or
 * focused. It describes the interface; nothing here calls a model.
 */
export function VerdictJourney({
  steps,
  repository,
}: {
  steps: JourneyStep[];
  repository: CaseStudyRepository;
}) {
  return (
    <DiagramFrame
      figure="04"
      title="What a person sees, and what runs behind it"
      note="Interface walkthrough"
    >
      <ol className="journey" style={{ "--count": steps.length } as CSSProperties}>
        {steps.map((step, index) => (
          <li
            key={step.name}
            className="journey-step kind-scope"
            data-kind={step.kind}
            style={{ "--i": index } as CSSProperties}
          >
            <span aria-hidden="true" className="flow-node">
              <span className="flow-marker" />
            </span>
            <h3 className="journey-name">
              <span className="font-mono text-label text-subtle">{pad(index + 1)}</span>
              {step.name}
              <span className="flow-kind">{kindLabel[step.kind]}</span>
            </h3>
            <dl className="journey-facts">
              <div>
                <dt>On screen</dt>
                <dd>{step.see}</dd>
              </div>
              <div>
                <dt>Behind it</dt>
                <dd>{step.behind}</dd>
              </div>
            </dl>
            <SourceLink repository={repository} source={step.source} />
          </li>
        ))}
      </ol>
      <p className="figure-footnote">Walkthrough of the interface · not a live model run</p>
    </DiagramFrame>
  );
}
