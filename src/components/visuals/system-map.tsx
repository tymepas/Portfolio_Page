import type { CSSProperties } from "react";
import { SystemMapInteractive } from "@/components/visuals/system-map-interactive";

/*
 * The AI system map: a conceptual diagram of how data, models, analysis,
 * validation, decisions, and applications connect. It is rendered as static
 * SVG on the server; a small client wrapper adds pointer response.
 *
 * Coordinates are in the SVG's 720 x 440 viewBox.
 */

type Tone = "data" | "model" | "control" | "app";

type Hub = {
  id: string;
  label: string;
  x: number;
  y: number;
  tone: Tone;
  labelAt: "above" | "below";
};

const hubs: Hub[] = [
  { id: "data", label: "Data", x: 70, y: 220, tone: "data", labelAt: "below" },
  { id: "models", label: "Models", x: 250, y: 100, tone: "model", labelAt: "above" },
  { id: "analysis", label: "Analysis", x: 260, y: 330, tone: "model", labelAt: "below" },
  { id: "validation", label: "Validation", x: 430, y: 215, tone: "control", labelAt: "below" },
  { id: "decisions", label: "Decisions", x: 600, y: 110, tone: "control", labelAt: "above" },
  { id: "applications", label: "Applications", x: 620, y: 330, tone: "app", labelAt: "below" },
];

// Small unlabelled nodes around each hub. `optional` ones are dropped on small screens.
const satellites = [
  { id: "d1", hub: "data", x: 24, y: 150 },
  { id: "d2", hub: "data", x: 18, y: 250, optional: true },
  { id: "d3", hub: "data", x: 44, y: 318 },
  { id: "d4", hub: "data", x: 116, y: 148, optional: true },
  { id: "m1", hub: "models", x: 192, y: 42 },
  { id: "m2", hub: "models", x: 306, y: 34, optional: true },
  { id: "m3", hub: "models", x: 338, y: 122 },
  { id: "a1", hub: "analysis", x: 194, y: 398, optional: true },
  { id: "a2", hub: "analysis", x: 314, y: 412 },
  { id: "a3", hub: "analysis", x: 344, y: 342, optional: true },
  { id: "v1", hub: "validation", x: 474, y: 150 },
  { id: "v2", hub: "validation", x: 486, y: 288, optional: true },
  { id: "c1", hub: "decisions", x: 670, y: 50 },
  { id: "c2", hub: "decisions", x: 694, y: 164, optional: true },
  { id: "p1", hub: "applications", x: 694, y: 288, optional: true },
  { id: "p2", hub: "applications", x: 688, y: 404 },
  { id: "p3", hub: "applications", x: 560, y: 412, optional: true },
];

const crossLinks = [
  ["m3", "v1"],
  ["a3", "v2"],
  ["d4", "m1"],
] as const;

type Edge = {
  id: string;
  from: string;
  to: string;
  /** Vertical tangents for edges that run mostly up or down. */
  vertical?: boolean;
  /** Dashed edges are secondary relationships; feedback runs backwards. */
  style?: "dashed" | "feedback";
  duration: number;
  delay: number;
};

const edges: Edge[] = [
  { id: "e1", from: "data", to: "models", duration: 4.2, delay: 0 },
  { id: "e2", from: "data", to: "analysis", duration: 4.8, delay: 1.1 },
  { id: "e3", from: "models", to: "validation", duration: 4.4, delay: 0.6 },
  { id: "e4", from: "analysis", to: "validation", duration: 5, delay: 1.8 },
  { id: "e5", from: "validation", to: "decisions", duration: 3.8, delay: 0.3 },
  { id: "e6", from: "validation", to: "applications", duration: 4.6, delay: 2.2 },
  { id: "e7", from: "decisions", to: "applications", vertical: true, duration: 3.6, delay: 1.4 },
  { id: "e8", from: "models", to: "analysis", vertical: true, style: "dashed", duration: 0, delay: 0 },
  { id: "f1", from: "applications", to: "data", style: "feedback", duration: 9, delay: 2.6 },
];

const hubById = new Map(hubs.map((hub) => [hub.id, hub]));
const pointById = new Map<string, { x: number; y: number }>([
  ...hubs.map((hub) => [hub.id, hub] as const),
  ...satellites.map((sat) => [sat.id, sat] as const),
]);

function edgePath(edge: Edge) {
  const a = hubById.get(edge.from)!;
  const b = hubById.get(edge.to)!;
  if (edge.style === "feedback") {
    // Returns along the bottom of the map: applications feed new data back in.
    return `M${a.x} ${a.y} C ${a.x - 20} ${a.y + 150}, ${b.x + 40} ${b.y + 260}, ${b.x} ${b.y}`;
  }
  if (edge.vertical) {
    const midY = (a.y + b.y) / 2;
    return `M${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
  }
  const midX = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

const toneColor: Record<Tone, string> = {
  data: "var(--fg)",
  model: "var(--violet)",
  control: "var(--teal)",
  app: "var(--fg)",
};

const VIEW_W = 720;
const VIEW_H = 440;

export function SystemMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`system-map ${className}`}>
      <SystemMapInteractive className="map-stage">
        <div aria-hidden="true" className="map-halo" />
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="map-svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {edges.map((edge) => {
              const a = hubById.get(edge.from)!;
              const b = hubById.get(edge.to)!;
              return (
                <linearGradient
                  key={edge.id}
                  id={`map-grad-${edge.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                >
                  <stop offset="0%" stopColor={toneColor[a.tone]} />
                  <stop offset="100%" stopColor={toneColor[b.tone]} />
                </linearGradient>
              );
            })}
          </defs>

          {/* Spokes and cross-links between small nodes */}
          <g className="map-spokes">
            {satellites.map((sat) => {
              const hub = hubById.get(sat.hub)!;
              return (
                <line
                  key={sat.id}
                  x1={hub.x}
                  y1={hub.y}
                  x2={sat.x}
                  y2={sat.y}
                  data-edge=""
                  data-from={sat.hub}
                  data-to={sat.id}
                  className={sat.optional ? "map-optional" : undefined}
                />
              );
            })}
            {crossLinks.map(([from, to]) => {
              const a = pointById.get(from)!;
              const b = pointById.get(to)!;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  data-edge=""
                  data-from={from}
                  data-to={to}
                  className="map-cross map-optional"
                />
              );
            })}
          </g>

          {/* Main relationships */}
          <g className="map-edges">
            {edges.map((edge, index) => {
              const d = edgePath(edge);
              return (
                <g
                  key={edge.id}
                  className="map-edge"
                  data-edge=""
                  data-from={edge.from}
                  data-to={edge.to}
                  data-style={edge.style}
                  style={{ "--order": index } as CSSProperties}
                >
                  <path d={d} pathLength={1} className="map-edge-line" stroke={`url(#map-grad-${edge.id})`} />
                  {edge.duration > 0 ? (
                    <>
                      <path
                        d={d}
                        pathLength={100}
                        className="map-packet-glow"
                        stroke={`url(#map-grad-${edge.id})`}
                        style={{ "--dur": `${edge.duration}s`, "--delay": `${edge.delay}s` } as CSSProperties}
                      />
                      <path
                        d={d}
                        pathLength={100}
                        className="map-packet"
                        style={{ "--dur": `${edge.duration}s`, "--delay": `${edge.delay}s` } as CSSProperties}
                      />
                    </>
                  ) : null}
                </g>
              );
            })}
          </g>

          {/* Small nodes */}
          <g className="map-satellites">
            {satellites.map((sat, index) => (
              <circle
                key={sat.id}
                cx={sat.x}
                cy={sat.y}
                r={2.6}
                data-node={sat.id}
                data-x={sat.x}
                data-y={sat.y}
                className={sat.optional ? "map-sat map-optional" : "map-sat"}
                style={{ "--order": index } as CSSProperties}
              />
            ))}
          </g>

          {/* Hubs */}
          <g className="map-hubs">
            {hubs.map((hub, index) => (
              <g
                key={hub.id}
                data-node={hub.id}
                data-x={hub.x}
                data-y={hub.y}
                data-tone={hub.tone}
                className="map-hub"
                style={{ "--order": index, "--tone": toneColor[hub.tone] } as CSSProperties}
              >
                <circle cx={hub.x} cy={hub.y} r={26} className="map-hub-halo" />
                <circle cx={hub.x} cy={hub.y} r={13} className="map-hub-pulse" />
                <circle cx={hub.x} cy={hub.y} r={13} className="map-hub-ring" />
                <circle cx={hub.x} cy={hub.y} r={4.5} className="map-hub-core" />
              </g>
            ))}
          </g>
        </svg>

        <div aria-hidden="true" className="map-labels">
          {hubs.map((hub, index) => (
            <span
              key={hub.id}
              data-label-for={hub.id}
              data-at={hub.labelAt}
              data-tone={hub.tone}
              className="map-label"
              style={
                {
                  left: `${(hub.x / VIEW_W) * 100}%`,
                  top: `${(hub.y / VIEW_H) * 100}%`,
                  "--order": index,
                } as CSSProperties
              }
            >
              {hub.label}
            </span>
          ))}
        </div>
      </SystemMapInteractive>

      <figcaption className="map-caption">
        <span className="sr-only">
          Conceptual system map. Data feeds models and analysis; their outputs pass through
          validation; validated results inform decisions and applications, which in turn produce
          new data.
        </span>
        <span aria-hidden="true" className="map-legend">
          <span>
            <span className="map-key" data-tone="model" />
            Model-driven
          </span>
          <span>
            <span className="map-key" data-tone="control" />
            Checks, rules, or people
          </span>
          <span>Conceptual map</span>
        </span>
      </figcaption>
    </figure>
  );
}
