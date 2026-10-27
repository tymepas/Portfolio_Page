import type { CSSProperties } from "react";
import { workflowStages } from "@/content/workflow";

/**
 * The conceptual five-stage workflow. A signal relays from stage to stage in a
 * slow loop: each stage lights as the signal arrives and passes it along its
 * connector. It illustrates a pattern; nothing on the page is being processed.
 */
export function WorkflowPipeline() {
  return (
    <div className="pipeline" data-loop="">
      <div className="flex flex-col gap-4 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h2 id="workflow-heading" className="font-mono text-label text-fg uppercase">
          Conceptual workflow
          <span className="ml-3 text-subtle normal-case tracking-normal">
            Model output is checked before it becomes a decision
          </span>
        </h2>
        <p className="pipe-legend" aria-hidden="true">
          <span>
            <span className="pipe-key" data-kind="model" /> Model step
          </span>
          <span>
            <span className="pipe-key" data-kind="control" /> Schema, rules, or people
          </span>
        </p>
      </div>

      <ol className="pipe-list" aria-labelledby="workflow-heading">
        {workflowStages.map((stage, index) => (
          <li
            key={stage.id}
            className="pipe-stage"
            data-kind={stage.kind}
            data-last={index === workflowStages.length - 1 ? "" : undefined}
            style={{ "--i": index } as CSSProperties}
          >
            <span aria-hidden="true" className="pipe-node">
              <span className="pipe-marker" />
            </span>
            <p className="font-mono text-label text-subtle">
              {String(index + 1).padStart(2, "0")}
              <span className="sr-only">
                {stage.kind === "model" ? " (model step)" : stage.kind === "control" ? " (schema, rules, or people)" : ""}
              </span>
            </p>
            <p className="pipe-name">{stage.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
            {stage.seenIn ? (
              <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.08em] text-subtle uppercase">
                In {stage.seenIn.join(" · ")}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="border-t border-line px-5 py-3 font-mono text-[0.6875rem] tracking-[0.08em] text-subtle uppercase sm:px-6">
        Illustration of a design pattern · not a live process
      </p>
    </div>
  );
}
