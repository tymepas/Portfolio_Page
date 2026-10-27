// Verdict case study. Every statement below was checked against the
// repository at `repository.commit`; source paths refer to that commit.
// Where the README and the code disagree (the README lists React 19 and
// Tailwind CSS 4, while package.json pins React 18 and Tailwind CSS 3), the
// code is treated as the source of truth. The repository's benchmark notes
// are not cited: the test images and runs behind them are not published.

import type { DiagramStep } from "@/content/projects";
import type {
  CaseStudyFact,
  CaseStudyRepository,
  EngineeringDecision,
  LaneDiagram,
  Limitation,
  NextStep,
  Principle,
  SectionHeading,
  SourceRef,
  SummaryRow,
} from "./shared";

export type VerdictRating = "Excellent" | "Good" | "Fair" | "Poor" | "Unable to Evaluate";

export type VerdictDimension = {
  key: string;
  label: string;
  /** Share of the weighted score. Null when the dimension is shown but not scored. */
  weight: number | null;
};

export type JourneyStep = Pick<DiagramStep, "kind"> & {
  name: string;
  see: string;
  behind: string;
  source: SourceRef;
};

type VerdictSectionKey =
  | "problem"
  | "architecture"
  | "decisions"
  | "journey"
  | "approach"
  | "limits"
  | "summary";

export const verdictCaseStudy = {
  slug: "verdict",
  repository: {
    url: "https://github.com/tymepas/AI_Stylist_Assistant",
    commit: "012504c8a0aae6120d3488c5040f4a20d1594dc1",
    committed: "2026-07-19",
    checked: "2026-10-28",
  } satisfies CaseStudyRepository,

  meta: {
    title: "Verdict case study · Garvit Mathur",
    description:
      "How Verdict pairs a vision model with strict schema validation and fixed rules to explain clothing purchase decisions. A case study by Garvit Mathur.",
  },
  /** Shown where another page links to this case study. */
  teaser:
    "A vision model rates a garment on six dimensions; strict validation and fixed rules turn those ratings into an explained verdict.",

  hero: {
    eyebrow: "Case study · AI decision support",
    lede: "Verdict helps someone decide whether a garment is right for them and for an occasion before they buy it. A vision model rates the garment on six dimensions; the application checks those ratings against a strict schema and turns them into a verdict with fixed rules.",
    facts: [
      { label: "Role", value: "Sole developer, working with AI coding assistants" },
      { label: "Context", value: "Built during OpenAI Build Week" },
      { label: "Status", value: "Hackathon build with a public demo" },
    ] satisfies CaseStudyFact[],
  },

  sections: {
    problem: {
      id: "verdict-problem",
      nav: "Problem",
      eyebrow: "Problem and goal",
      title: "A purchase question has more than one part",
      intro:
        "Shopping online means guessing how a garment will look on you, whether it suits the occasion, and whether it matches how you dress.",
    },
    architecture: {
      id: "verdict-architecture",
      nav: "Architecture",
      eyebrow: "System architecture",
      title: "From two photos to a verdict",
      intro:
        "One request path. The model sits in the middle with code on both sides of it, and the API key and the model call stay on the server.",
    },
    decisions: {
      id: "verdict-decisions",
      nav: "Decisions",
      eyebrow: "Engineering decisions",
      title: "Four decisions that shape the system",
      intro:
        "Each card separates what the code does from why. A reason that isn't written down in the repository is marked as inferred from the code.",
    },
    journey: {
      id: "verdict-journey",
      nav: "User journey",
      eyebrow: "User journey",
      title: "Input, analysis, validation, verdict",
      intro:
        "What a person sees at each step, and what the system does behind it. A walkthrough of the interface, not a live run.",
    },
    approach: {
      id: "verdict-approach",
      nav: "Approach",
      eyebrow: "My engineering approach",
      title: "The model observes; the code decides",
      intro:
        "The model does the part that needs vision. Everything that has to be consistent, checkable, or private is application code.",
    },
    limits: {
      id: "verdict-limits",
      nav: "Limitations",
      eyebrow: "Limitations and next steps",
      title: "What it can't promise yet",
      intro:
        "Known gaps in the current code, then possible next steps. Nothing in the second list is built.",
    },
    summary: {
      id: "verdict-summary",
      nav: "Summary",
      eyebrow: "Technical summary",
      title: "At a glance",
    },
  } satisfies Record<VerdictSectionKey, SectionHeading>,

  problem: {
    paragraphs: [
      "A garment can suit the occasion and still clash with someone's coloring, or match their style and be wrong for the season. A single opinion, or a single score, hides which of those failed and why.",
      "Verdict's goal is to split the decision into named dimensions, give a reason and a confidence for each, and derive the overall verdict from them in a way a person can follow and question.",
    ],
    considered: ["Your photo", "The garment", "The occasion", "Your style preferences"],
    notConsidered: ["Price", "Material quality", "Brand", "Durability", "Comfort"],
    scopeSource: { path: "lib/services/analysisResultService.ts" } satisfies SourceRef,
    caveat:
      "Verdict supports a decision; it doesn't make one. Its ratings come from a model and can be wrong, which is why the report shows the reason behind every rating.",
  },

  architecture: {
    diagram: {
      title: "One analysis request, end to end",
      lanes: [
        { id: "browser", label: "Browser", note: "Next.js pages" },
        { id: "server", label: "API route", note: "POST /api/analyze" },
        { id: "openai", label: "OpenAI", note: "Responses API" },
      ],
      steps: [
        {
          id: "inputs",
          lane: "browser",
          kind: "human",
          label: "Choose the inputs",
          detail: "Three steps: your photo, the garment, and the occasion.",
          source: { path: "app/dashboard/analysis/page.tsx" },
        },
        {
          id: "profiles",
          lane: "browser",
          kind: "data",
          label: "Attach saved profiles",
          detail:
            "Style preferences and Style DNA are read from localStorage and sent with the form when present.",
          source: { path: "app/dashboard/analysis/page.tsx" },
        },
        {
          id: "checks",
          lane: "server",
          kind: "rule",
          via: "multipart form",
          label: "Check the inputs",
          detail:
            "JPEG, PNG, or WebP, at most 10 MB, and at least 512 × 512 px, read from the file's own bytes. An invalid Style DNA is dropped rather than failing the request.",
          source: { path: "lib/services/analysisService.ts", symbol: "validateImageFile" },
        },
        {
          id: "request",
          lane: "server",
          kind: "service",
          label: "Build the model request",
          detail:
            "A server-only module adds the system prompt, the context, and both images. The API key never reaches the browser.",
          source: { path: "lib/services/openai/openAIAnalysisService.ts" },
        },
        {
          id: "model",
          lane: "openai",
          kind: "model",
          via: "text + 2 images",
          label: "Rate six dimensions",
          detail:
            "A rating, a reason, and a confidence for each, or an answer that the photos can't be analyzed.",
          source: { path: "memory/SYSTEM_PROMPT.md" },
        },
        {
          id: "schema",
          lane: "server",
          kind: "rule",
          via: "JSON text",
          boundary: "Model output is untrusted until it passes this check",
          label: "Validate with Zod",
          detail:
            "A strict schema. Wrong values, an empty reason, or an extra field such as a model-made verdict end the request with an error. Nothing is repaired.",
          source: { path: "lib/services/openai/openAIAnalysisSchema.ts" },
        },
        {
          id: "verdict",
          lane: "server",
          kind: "rule",
          label: "Calculate the verdict",
          detail:
            "Fixed weights turn the ratings into a score, and fixed thresholds map the score to one of four verdicts.",
          source: { path: "lib/services/analysisService.ts", symbol: "computeVerdict" },
        },
        {
          id: "extras",
          lane: "server",
          kind: "rule",
          label: "Check the extras",
          detail:
            "Shopping alternatives are validated separately and offered only with Style DNA. Invalid ones are dropped; the verdict is unaffected.",
          source: { path: "lib/services/shoppingAdvisorService.ts" },
        },
        {
          id: "report",
          lane: "browser",
          kind: "output",
          via: "JSON result",
          label: "Show the report",
          detail:
            "The verdict, a reason per dimension, things to consider, and what the analysis did not consider.",
          source: { path: "components/fashion/DecisionReport.tsx" },
        },
      ],
    } satisfies LaneDiagram,
    mockNote:
      "When ANALYSIS_MODE is unset or set to mock, the same route returns one of three fixed sample results instead of calling the model, so the interface can be built and tested without API calls.",
    mockSource: { path: "app/api/[[...path]]/route.js" } satisfies SourceRef,
    styleDna: {
      title: "Style DNA, created once from a separate photo",
      steps: [
        { kind: "data", label: "One photo", detail: "Chosen on the profile page" },
        {
          kind: "model",
          label: "Profile model",
          detail: "Describes coloring, proportions, and style signals",
        },
        {
          kind: "rule",
          label: "Strict schema",
          detail: "Rejects any field outside it, such as an attractiveness score or an estimated age",
        },
        { kind: "data", label: "This browser", detail: "Saved to localStorage as schema version 1.0" },
      ] satisfies DiagramStep[],
      source: { path: "lib/services/openai/aiStyleProfileSchema.ts" } satisfies SourceRef,
    },
  },

  decisions: [
    {
      title: "Use a vision model for the judgment calls",
      implemented:
        "Both photos go to the OpenAI Responses API at high image detail, with the occasion and any saved profiles as text. The model is chosen by an environment variable, and the request times out after 20 seconds.",
      sources: [{ path: "lib/services/openai/openAIAnalysisService.ts" }],
      rationale: {
        basis: "inferred",
        text: "Occasion fit, color harmony, and formality depend on how the garment and the person look together, which a form can't capture.",
      },
      tradeoff:
        "Each analysis depends on an external service. It adds cost and waiting time, and the same photos can get different ratings on different runs.",
    },
    {
      title: "Validate every model response against a schema",
      implemented:
        "The model is asked for JSON, which is parsed and checked by a strict Zod schema: either a complete analysis with all six dimensions, or an explicit “unable to analyze”. Ratings and confidence levels must be exact values, and every reason must be non-empty. A failure returns an error the user can retry.",
      sources: [
        { path: "lib/services/openai/openAIAnalysisSchema.ts" },
        { path: "lib/services/openai/openAIAnalysisService.ts" },
      ],
      rationale: {
        basis: "documented",
        text: "The README sets the rule that model output is never rendered without being checked first.",
        source: { path: "README.md", symbol: "Privacy & Security" },
      },
      tradeoff:
        "A strict schema also rejects responses that are almost right, so some analyses fail outright instead of showing a partial result.",
    },
    {
      title: "Keep the verdict out of the model's hands",
      implemented:
        "The prompt tells the model it does not decide the verdict, and the strict schema rejects a response that includes one. computeVerdict weights five ratings (occasion fit 30%, formality 25%, style preference 20%, color 15%, seasonality 10%), and fixed thresholds map the score to one of four verdicts. Style consistency is shown but not scored.",
      sources: [
        { path: "lib/services/analysisService.ts", symbol: "computeVerdict" },
        { path: "memory/SYSTEM_PROMPT.md" },
      ],
      rationale: {
        basis: "documented",
        text: "The README states that the final verdict comes from deterministic rules rather than the model, so that it stays transparent and consistent.",
        source: { path: "README.md", symbol: "Deterministic Verdict Engine" },
      },
      tradeoff:
        "The same ratings always give the same verdict, but the ratings still come from the model. The weights and thresholds are product choices, not calibrated against real outcomes.",
    },
    {
      title: "Keep Style DNA in the browser",
      implemented:
        "Two profiles live in localStorage: manual style preferences, and the generated Style DNA (schema version 1.0). Style DNA is validated with Zod whenever it is read, and a corrupt or outdated copy is deleted. The server validates it again on every analysis and ignores an invalid one instead of failing.",
      sources: [
        { path: "lib/services/aiStyleProfileService.ts" },
        { path: "lib/services/styleProfileService.ts" },
      ],
      rationale: {
        basis: "documented",
        text: "The README lists local, user-controlled storage of Style DNA as a privacy goal.",
        source: { path: "README.md", symbol: "Privacy First" },
      },
      tradeoff:
        "The profile doesn't follow the user to another browser or device, and clearing site data deletes it.",
    },
  ] satisfies EngineeringDecision[],

  journey: [
    {
      name: "Input",
      kind: "human",
      see: "Three short steps: a current photo, the garment, and an occasion picked from grouped lists such as Work and Social.",
      behind:
        "Saved preferences and Style DNA are attached automatically. The server rejects unsupported, oversized, or small images before any model call.",
      source: { path: "app/dashboard/analysis/page.tsx" },
    },
    {
      name: "Analysis",
      kind: "model",
      see: "A loading state while the request runs.",
      behind:
        "The vision model rates six dimensions, each with a reason and a confidence, or reports that the photos can't be analyzed.",
      source: { path: "lib/services/openai/openAIAnalysisService.ts" },
    },
    {
      name: "Validation",
      kind: "rule",
      see: "If the response fails, an error with a retry button. Never a partial report.",
      behind:
        "Zod checks the response's shape and allowed values, and that nothing extra was added.",
      source: { path: "lib/services/openai/openAIAnalysisSchema.ts" },
    },
    {
      name: "Verdict",
      kind: "output",
      see: "The verdict and its score, a reason and confidence per dimension, things to consider, and what was not considered.",
      behind:
        "Code calculates the verdict. Shopping alternatives appear only when Style DNA is saved.",
      source: { path: "components/fashion/DecisionReport.tsx" },
    },
  ] satisfies JourneyStep[],

  principles: [
    {
      title: "Give the model a narrow job",
      detail:
        "The prompt asks only for a rating, a reason, and a confidence per dimension, and states that the application calculates the verdict.",
      sources: [{ path: "memory/SYSTEM_PROMPT.md" }],
    },
    {
      title: "Treat its output as untrusted input",
      detail:
        "The response is parsed and validated before any code uses it. A response that fails is an error, not something to repair or guess around.",
      sources: [{ path: "lib/services/openai/openAIAnalysisService.ts" }],
    },
    {
      title: "Fail closed on the core, degrade on the extras",
      detail:
        "The verdict needs a valid analysis; optional parts don't. An invalid Style DNA is ignored, and invalid shopping suggestions are dropped without changing the verdict.",
      sources: [
        { path: "lib/services/shoppingAdvisorService.ts" },
        { path: "lib/services/aiStyleProfileService.ts", symbol: "parseAIStyleProfile" },
      ],
    },
    {
      title: "Keep secrets and decisions on the server",
      detail:
        "The OpenAI call lives in a server-only module. The browser sends the form to the API route and receives the finished result.",
      sources: [{ path: "lib/services/openai/openAIAnalysisService.ts" }],
    },
    {
      title: "Test the deterministic parts",
      detail:
        "The repository's Jest suites cover image validation, the Style DNA schema and storage, the shopping-suggestion schema, retail links, and that suggestions never change the verdict.",
      sources: [{ path: "tests/phase4/analysisResultShopping.test.ts" }],
    },
  ] satisfies Principle[],

  // The scoring rule exactly as computeVerdict implements it.
  rule: {
    dimensions: [
      { key: "occasion", label: "Occasion fit", weight: 0.3 },
      { key: "formality", label: "Formality", weight: 0.25 },
      { key: "style_preference_match", label: "Style preference match", weight: 0.2 },
      { key: "color", label: "Color harmony", weight: 0.15 },
      { key: "seasonality", label: "Seasonality", weight: 0.1 },
      { key: "style", label: "Style consistency", weight: null },
    ] satisfies VerdictDimension[],
    points: { Excellent: 5, Good: 4, Fair: 3, Poor: 2 },
    // Checked from the top: the first threshold the score reaches wins.
    thresholds: [
      { min: 4.5, verdict: "Highly Recommended" },
      { min: 3.5, verdict: "Recommended" },
      { min: 2.5, verdict: "Consider Alternatives" },
      { min: 0, verdict: "Not Recommended" },
    ],
    /** Returned when no scored dimension could be evaluated. */
    fallbackVerdict: "Consider Alternatives",
    // Sample ratings from buildMockA and buildMockB in analysisService.ts.
    presets: [
      {
        id: "sample-a",
        label: "Repository sample A",
        description: "A tailored blazer for an interview",
        ratings: {
          occasion: "Excellent",
          formality: "Excellent",
          style_preference_match: "Good",
          color: "Excellent",
          seasonality: "Good",
          style: "Excellent",
        },
      },
      {
        id: "sample-b",
        label: "Repository sample B",
        description: "A distressed denim jacket for a wedding",
        ratings: {
          occasion: "Poor",
          formality: "Poor",
          style_preference_match: "Poor",
          color: "Fair",
          seasonality: "Fair",
          style: "Poor",
        },
      },
    ] satisfies {
      id: string;
      label: string;
      description: string;
      ratings: Record<string, VerdictRating>;
    }[],
    source: { path: "lib/services/analysisService.ts", symbol: "computeVerdict" } satisfies SourceRef,
  },

  limitations: [
    {
      title: "The ratings can vary",
      detail:
        "Each analysis is a single model call, and the same photos can get different ratings on different runs. The fixed rules make the verdict traceable to its ratings, not stable across runs.",
    },
    {
      title: "No published evaluation",
      detail:
        "The repository's benchmark notes report results, but the test images and runs behind them aren't published, so this page cites no accuracy figure.",
    },
    {
      title: "Weights are product choices",
      detail:
        "The weights and thresholds were set by hand and haven't been calibrated against what people actually bought or kept.",
    },
    {
      title: "Photos leave the device",
      detail:
        "Each analysis sends both photos to the server and on to OpenAI. The app doesn't save them and sets store: false on the request, but users have to trust both services.",
    },
    {
      title: "Prompt rules aren't guarantees",
      detail:
        "The prompt tells the model not to judge attractiveness, infer health, or comment on the person's body beyond how the garment works with it. The Style DNA schema enforces part of this by rejecting fields such as an estimated age, but free-text reasons are only checked for being present.",
    },
  ] satisfies Limitation[],

  nextSteps: [
    {
      origin: "proposed",
      title: "A reproducible evaluation set",
      detail:
        "Consented test photos with expected ratings, run repeatedly to measure how often each dimension's rating agrees with the expectation and how much it varies.",
    },
    {
      origin: "proposed",
      title: "Schema-constrained output",
      detail:
        "Use the Responses API's JSON-schema output format, so the model is held to the schema while it generates, and keep Zod as the final check.",
    },
    {
      origin: "proposed",
      title: "Calibrated weights",
      detail: "Adjust the weights and thresholds using feedback on past verdicts.",
    },
    {
      origin: "roadmap",
      title: "Accounts and profile sync",
      detail: "User accounts and cloud sync for Style DNA, from the README's future enhancements.",
    },
    {
      origin: "roadmap",
      title: "Comparison and history",
      detail:
        "Comparing several garments at once and keeping an outfit history. The history page is a placeholder today.",
    },
  ] satisfies NextStep[],

  summary: [
    { label: "Project", value: "Individual project, built during OpenAI Build Week" },
    { label: "Application", value: "Next.js App Router, React, TypeScript, Tailwind CSS" },
    {
      label: "Model API",
      value:
        "OpenAI Responses API, called with fetch from a server-only module: two images in, JSON out. The model is set by OPENAI_MODEL; the README names GPT-4.1",
    },
    { label: "Validation", value: "Strict Zod schemas for the analysis, Style DNA, and shopping suggestions" },
    { label: "Decision logic", value: "computeVerdict: a weighted average of five ratings and three thresholds" },
    { label: "Storage", value: "Browser localStorage. The analysis and profile routes use no database" },
    { label: "Testing", value: "Jest with ts-jest" },
    { label: "Hosting", value: "Vercel" },
    {
      label: "Built with",
      value:
        "AI coding assistants. The README credits Codex, and the earliest commits came from the Emergent platform's agent",
    },
  ] satisfies SummaryRow[],
};
