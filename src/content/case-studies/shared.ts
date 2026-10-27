// Shapes shared by the case-study pages. Every technical claim on those pages
// cites the code it describes: a `SourceRef` is a path in the project
// repository, linked at the exact commit the page was checked against.
// Rationale is labelled as documented (written down in the repository) or
// inferred (read from the code), and future work as roadmap or proposed.

import type { DiagramStepKind } from "@/content/projects";

export type SourceRef = {
  /** Path from the repository root. */
  path: string;
  /** A function or section inside the file. */
  symbol?: string;
};

export type CaseStudyRepository = {
  url: string;
  /** Full SHA of the commit every claim was checked against. */
  commit: string;
  /** Date of that commit (ISO). */
  committed: string;
  /** Date the page was last checked against it (ISO). */
  checked: string;
};

export function sourceUrl(repository: CaseStudyRepository, source: SourceRef) {
  const path = source.path.split("/").map(encodeURIComponent).join("/");
  return `${repository.url}/blob/${repository.commit}/${path}`;
}

export function commitUrl(repository: CaseStudyRepository, sha: string) {
  return `${repository.url}/commit/${sha}`;
}

export type SectionHeading = {
  /** Unique across the whole site: hidden routes stay in the DOM. */
  id: string;
  /** Short label for the in-page navigation. */
  nav: string;
  eyebrow: string;
  title: string;
  intro?: string;
};

export type CaseStudyFact = {
  label: string;
  value: string;
};

export type EngineeringDecision = {
  title: string;
  /** What the code does, confirmed by reading it. */
  implemented: string;
  sources: SourceRef[];
  rationale: {
    text: string;
    /** "documented": written down in the repository. "inferred": read from the code. */
    basis: "documented" | "inferred";
    /** Where a documented reason is written down. */
    source?: SourceRef;
  };
  tradeoff: string;
};

export type Limitation = {
  title: string;
  detail: string;
};

/** Not built. "roadmap": listed in the project's own README. "proposed": suggested here. */
export type NextStep = {
  title: string;
  detail: string;
  origin: "roadmap" | "proposed";
};

export type SummaryRow = {
  label: string;
  value: string;
};

export type Principle = {
  title: string;
  detail: string;
  sources: SourceRef[];
};

/** A swimlane sequence: each step sits in one lane and follows the previous one. */
export type Lane = {
  id: string;
  label: string;
  note: string;
};

export type LaneStep = {
  id: string;
  lane: string;
  kind: DiagramStepKind;
  label: string;
  detail: string;
  source?: SourceRef;
  /** Label on the connector that arrives at this step. */
  via?: string;
  /** Draws a labelled boundary across every lane, above this step. */
  boundary?: string;
  /** Scenario ids whose path includes this step. Omit when every path does. */
  paths?: string[];
};

export type LaneDiagram = {
  title: string;
  lanes: Lane[];
  steps: LaneStep[];
};
