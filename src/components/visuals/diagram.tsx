import type { CSSProperties, ReactNode } from "react";
import type { DiagramStep, DiagramStepKind } from "@/content/projects";

/*
 * Building blocks for project architecture diagrams. Each step carries its
 * kind as text as well as a marker shape and colour, so the distinction
 * between model, code, data, and people never depends on colour alone.
 */

export const kindLabel: Record<DiagramStepKind, string> = {
  model: "Model",
  rule: "Code",
  human: "Person",
  data: "Data",
  service: "App",
  output: "Result",
};

export function DiagramFrame({
  figure,
  title,
  children,
  className = "",
}: {
  figure: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`diagram ${className}`}>
      <figcaption className="diagram-head">
        <span>
          <span className="text-teal">Fig. {figure}</span>
          <span aria-hidden="true"> · </span>
          <span className="normal-case tracking-normal text-muted">{title}</span>
        </span>
        <span className="hidden shrink-0 sm:inline">Diagram from the code</span>
      </figcaption>
      <div className="diagram-body">{children}</div>
    </figure>
  );
}

export function FlowInputs({ inputs, label = "Inputs" }: { inputs: string[]; label?: string }) {
  return (
    <div className="flow-inputs">
      <p className="diagram-label">{label}</p>
      <ul className="flex flex-wrap gap-1.5">
        {inputs.map((input, index) => (
          <li key={input} className="chip" style={{ "--i": index } as CSSProperties}>
            {input}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepText({ step }: { step: DiagramStep }) {
  return (
    <div className="min-w-0">
      <p className="flow-label">
        {step.label}
        <span className="flow-kind">{kindLabel[step.kind]}</span>
      </p>
      <p className="flow-detail">{step.detail}</p>
    </div>
  );
}

/**
 * Steps as a connected sequence. Vertical by default; `rail` lays them out in
 * a row once the diagram is wide enough (a container query, not the viewport).
 */
export function FlowSteps({
  steps,
  layout = "column",
  className = "",
}: {
  steps: DiagramStep[];
  layout?: "column" | "rail";
  className?: string;
}) {
  return (
    <ol
      className={`flow-steps ${className}`}
      data-layout={layout}
      style={{ "--count": steps.length } as CSSProperties}
    >
      {steps.map((step, index) => (
        <li
          key={step.label}
          className="flow-step"
          data-kind={step.kind}
          style={{ "--i": index } as CSSProperties}
        >
          <span aria-hidden="true" className="flow-node">
            <span className="flow-marker" />
          </span>
          <StepText step={step} />
        </li>
      ))}
    </ol>
  );
}
