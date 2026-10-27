import type { CSSProperties, ReactNode } from "react";
import { SourceLink } from "@/components/case-study/parts";
import { DiagramFrame, kindLabel } from "@/components/visuals/diagram";
import type { CaseStudyRepository, LaneDiagram } from "@/content/case-studies/shared";

/**
 * A swimlane sequence drawn from the code: one column per lane (the browser,
 * the server, an outside service), one row per step, read top to bottom.
 * Connectors show every hand-off between lanes, and a boundary line can mark
 * where untrusted data must pass a check. In a narrow figure the lanes
 * collapse into a single column and each step names its lane instead.
 *
 * Steps are server-rendered list items; connectors are decoration. A step's
 * `paths` let a scenario picker highlight one route through the sequence.
 */
export function SwimlaneFigure({
  diagram,
  figure,
  repository,
  note,
  children,
}: {
  diagram: LaneDiagram;
  figure: string;
  repository: CaseStudyRepository;
  note?: string;
  /** Extra content below the lanes, inside the same figure. */
  children?: ReactNode;
}) {
  const column = new Map(diagram.lanes.map((lane, index) => [lane.id, index]));
  const laneLabel = new Map(diagram.lanes.map((lane) => [lane.id, lane.label]));

  return (
    <DiagramFrame figure={figure} title={diagram.title} note={note}>
      <div className="lanes" style={{ "--lanes": diagram.lanes.length } as CSSProperties}>
        <div aria-hidden="true" className="lane-columns">
          {diagram.lanes.map((lane) => (
            <span key={lane.id} />
          ))}
        </div>

        <ul className="lane-heads">
          {diagram.lanes.map((lane) => (
            <li key={lane.id}>
              <span className="lane-head-label">{lane.label}</span>
              <span className="lane-head-note">{lane.note}</span>
            </li>
          ))}
        </ul>

        <ol className="lane-steps">
          {diagram.steps.map((step, index) => {
            const col = column.get(step.lane) ?? 0;
            const from = index > 0 ? (column.get(diagram.steps[index - 1].lane) ?? col) : col;
            // Which way the connector arriving at this step travels.
            const direction = index === 0 ? undefined : from === col ? "down" : from < col ? "right" : "left";

            return (
              <li
                key={step.id}
                className="lane-step kind-scope"
                data-kind={step.kind}
                data-dir={direction}
                data-paths={step.paths?.join(" ")}
                data-boundary={step.boundary ? "" : undefined}
                style={
                  {
                    "--col": col + 1,
                    "--row": index + 1,
                    "--span": Math.abs(from - col),
                    "--i": index,
                  } as CSSProperties
                }
              >
                {step.boundary ? (
                  <p className="lane-boundary">
                    <span>{step.boundary}</span>
                  </p>
                ) : null}
                {direction ? (
                  <span aria-hidden="true" className="lane-link">
                    {step.via ? <span className="lane-via">{step.via}</span> : null}
                  </span>
                ) : null}
                <div className="lane-card">
                  <p className="lane-card-head">
                    <span aria-hidden="true" className="flow-node">
                      <span className="flow-marker" />
                    </span>
                    <span className="lane-label">{step.label}</span>
                    <span className="flow-kind">{kindLabel[step.kind]}</span>
                  </p>
                  <p className="lane-detail">{step.detail}</p>
                  <div className="lane-meta">
                    <span className="lane-tag">
                      <span className="sr-only">Lane: </span>
                      {laneLabel.get(step.lane)}
                    </span>
                    {step.source ? <SourceLink repository={repository} source={step.source} /> : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      {children}
    </DiagramFrame>
  );
}
