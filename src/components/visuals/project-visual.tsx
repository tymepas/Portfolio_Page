import Image from "next/image";
import type { CSSProperties } from "react";
import { DiagramFrame, FlowInputs, FlowSteps } from "@/components/visuals/diagram";
import type { ProjectDiagram, ProjectScreenshot } from "@/content/projects";

type Facet = NonNullable<ProjectDiagram["facet"]>;

/** Rule weights drawn to scale against the largest weight. */
function WeightBars({ facet }: { facet: Facet }) {
  const max = Math.max(...facet.items.map((item) => item.weight ?? 0));

  return (
    <div className="facet">
      <p className="diagram-label">{facet.label}</p>
      <ul className="mt-3 space-y-2.5">
        {facet.items.map((item, index) => (
          <li
            key={item.name}
            className="weight-row"
            style={{ "--i": index, "--share": item.weight ? item.weight / max : 0 } as CSSProperties}
          >
            <span className="truncate text-[0.8125rem] text-muted">{item.name}</span>
            {item.weight ? (
              <>
                <span aria-hidden="true" className="weight-track">
                  <span className="weight-fill" />
                </span>
                <span className="font-mono text-[0.75rem] text-fg">{item.weight}%</span>
              </>
            ) : (
              <span className="col-span-2 text-right font-mono text-[0.6875rem] tracking-[0.06em] text-subtle uppercase">
                {item.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FacetList({ facet }: { facet: Facet }) {
  return (
    <div className="facet">
      <p className="diagram-label">{facet.label}</p>
      <ul className="facet-list mt-3">
        {facet.items.map((item, index) => (
          <li key={item.name} className="facet-item" style={{ "--i": index } as CSSProperties}>
            <span>{item.name}</span>
            {item.note ? <span className="facet-note">{item.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Outcomes({ outcomes }: { outcomes: string[] }) {
  return (
    <div className="outcomes">
      <p className="diagram-label">Possible verdicts</p>
      <ol className="outcome-scale">
        {outcomes.map((outcome, index) => (
          <li
            key={outcome}
            style={{ "--i": index, "--level": 1 - index / outcomes.length } as CSSProperties}
          >
            {outcome}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProjectDiagramView({
  diagram,
  figure,
}: {
  diagram: ProjectDiagram;
  figure: string;
}) {
  const facet = diagram.facet;
  const weighted = facet?.items.some((item) => item.weight !== undefined) ?? false;
  const facetView = facet ? (weighted ? <WeightBars facet={facet} /> : <FacetList facet={facet} />) : null;

  return (
    <DiagramFrame figure={figure} title={diagram.title}>
      <FlowInputs inputs={diagram.inputs} />
      {diagram.layout === "rail" ? (
        <>
          <FlowSteps steps={diagram.steps} layout="rail" className="mt-7" />
          {facetView ? <div className="mt-7 border-t border-line pt-5">{facetView}</div> : null}
        </>
      ) : (
        <div className="diagram-split mt-7">
          <FlowSteps steps={diagram.steps} />
          {facetView}
        </div>
      )}
      {diagram.outcomes ? <Outcomes outcomes={diagram.outcomes} /> : null}
    </DiagramFrame>
  );
}

/** An authentic screenshot, framed and captioned as one. */
export function ProjectScreenshotFigure({
  screenshot,
  sizes,
  priority = false,
  className = "",
}: {
  screenshot: ProjectScreenshot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`shot ${className}`}>
      <div className="shot-frame">
        {/* Labelled outside the image so the label never covers real content. */}
        <p className="shot-bar" aria-hidden="true">
          Screenshot
        </p>
        <Image
          src={screenshot.src}
          width={screenshot.width}
          height={screenshot.height}
          alt={screenshot.alt}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-subtle">
        {screenshot.caption}
      </figcaption>
    </figure>
  );
}
