// The conceptual workflow shown in the hero. It describes a design pattern, not
// a running system, and the hero labels it that way. Each "seenIn" entry must
// match behaviour recorded for that project in projects.ts.

export type WorkflowStage = {
  id: string;
  name: string;
  /** "model": a model produces it. "control": schema checks, fixed rules, or people. */
  kind: "endpoint" | "model" | "control";
  description: string;
  seenIn?: string[];
};

export const workflowStages: WorkflowStage[] = [
  {
    id: "input",
    name: "Input",
    kind: "endpoint",
    description: "A photo, a set of financial documents, or a question.",
  },
  {
    id: "analysis",
    name: "AI analysis",
    kind: "model",
    description: "Vision and language models interpret the input.",
    seenIn: ["Verdict", "AuditFlow", "AirWise AI"],
  },
  {
    id: "validation",
    name: "Validation",
    kind: "control",
    description: "Model output is checked against a strict schema before anything uses it.",
    seenIn: ["Verdict"],
  },
  {
    id: "decision",
    name: "Decision",
    kind: "control",
    description: "Fixed rules or a human reviewer make the final call.",
    seenIn: ["Verdict", "AuditFlow"],
  },
  {
    id: "output",
    name: "Output",
    kind: "endpoint",
    description: "An explainable result: a recommendation, a workpaper, or a cited answer.",
    seenIn: ["Verdict", "AuditFlow", "AirWise AI"],
  },
];
