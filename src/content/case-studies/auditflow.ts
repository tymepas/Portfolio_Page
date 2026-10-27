// AuditFlow case study. AuditFlow was built with Abhijit Manna. Every
// statement below was checked against the repository at `repository.commit`,
// and contributions against its commit history. The README still describes
// the older reviewer-decision flow (POST /feedback); since commit 2fc2764 the
// interface sends findings to Zoho Desk instead, so the code is treated as the
// source of truth. No benchmark percentages are published: the README says the
// current code has not been fully re-measured.

import type {
  CaseStudyFact,
  CaseStudyRepository,
  EngineeringDecision,
  LaneDiagram,
  Limitation,
  NextStep,
  SectionHeading,
  SourceRef,
  SummaryRow,
} from "./shared";

/** Who determines a stage's outcome, or an issue type's presence. */
export type Decider = "model" | "code" | "checked";

export type PipelineStage = {
  name: string;
  /** The stage's name in the AuditFlow interface. */
  shownAs: string;
  model: string;
  code: string;
  decidedBy: Decider;
  /** A short tag for what happens here, such as "Findings created". */
  marks?: string;
  source: SourceRef;
};

export type IssueType = {
  type: string;
  label: string;
  decidedBy: Decider;
  rule: string;
  /** Synthetic benchmark cases that expect this finding. */
  cases: string[];
};

export type Contribution = {
  title: string;
  detail: string;
  /** Full SHAs of representative commits. */
  commits: string[];
};

type AuditflowSectionKey =
  | "problem"
  | "pipeline"
  | "tickets"
  | "evaluation"
  | "contribution"
  | "decisions"
  | "limits"
  | "summary";

export const auditflowCaseStudy = {
  slug: "auditflow",
  repository: {
    url: "https://github.com/abhijitmanna912001/auditflow",
    commit: "2c9abd43fba5584261529b4e1196fa91094ffa1f",
    committed: "2026-10-25",
    checked: "2026-10-28",
  } satisfies CaseStudyRepository,

  meta: {
    title: "AuditFlow case study · Garvit Mathur",
    description:
      "How AuditFlow, a team-built audit-evidence review tool, combines Claude-based document checks with code-decided routing, human review, and Zoho Desk tickets. A case study by Garvit Mathur.",
  },
  /** Shown where another page links to this case study. */
  teaser:
    "A team-built audit-evidence review tool. Claude reads and compares the documents, code decides the routing, and a person reviews every finding.",

  hero: {
    eyebrow: "Case study · Audit-evidence review",
    lede: "AuditFlow checks a bundle of supporting documents (invoices, purchase orders, receipts, bank statements, and ledger entries), lists mismatches and missing evidence with the documents behind each finding, and routes every finding to a person. It supports an auditor's review; it doesn't decide whether anything is fraud or non-compliance.",
    facts: [
      {
        label: "My role",
        value: "Dataset, frontend, testing, and integration; later the PDF reports and Google Drive saving",
      },
      {
        label: "Context",
        value: "Syndicate by Maximor AO Hackathon, Track 2: Autonomous Office of the CFO",
      },
      { label: "Status", value: "Hackathon build with a public demo, evaluated on synthetic cases" },
    ] satisfies CaseStudyFact[],
  },

  sections: {
    problem: {
      id: "auditflow-problem",
      nav: "Problem",
      eyebrow: "Problem and objective",
      title: "Most of evidence review is matching",
      intro:
        "Checking a payment means confirming that its invoice, purchase order, receipt, bank record, and ledger entry agree, and noticing what is missing.",
    },
    pipeline: {
      id: "auditflow-pipeline",
      nav: "Pipeline",
      eyebrow: "Five-stage pipeline",
      title: "Five stages, two kinds of work",
      intro:
        "Three stages use Claude to read and compare documents. The two that set outcomes, routing and the workpaper, compute them in code and ask the model only for wording.",
    },
    tickets: {
      id: "auditflow-tickets",
      nav: "Tickets",
      eyebrow: "Findings and ticket workflow",
      title: "From a finding to a Zoho Desk ticket",
      intro:
        "A reviewer can raise any finding as a ticket, with the documents behind it attached. Sending the same finding twice never creates a second ticket.",
    },
    evaluation: {
      id: "auditflow-evaluation",
      nav: "Validation",
      eyebrow: "Evidence and validation",
      title: "What it checks, and what has been tested",
      intro:
        "AuditFlow looks for eight issue types only. They are exercised by fourteen synthetic cases; real-world accuracy has not been established.",
    },
    contribution: {
      id: "auditflow-contribution",
      nav: "My contribution",
      eyebrow: "My contribution",
      title: "Who built what",
      intro:
        "AuditFlow was built with Abhijit Manna. The split below follows the README's team section and the commit history.",
    },
    decisions: {
      id: "auditflow-decisions",
      nav: "Decisions",
      eyebrow: "Engineering decisions and trade-offs",
      title: "Where the model stops and code takes over",
      intro:
        "Each card separates what the code does from why. Most of these reasons are written down in the code's own comments; they are team decisions, not mine alone.",
    },
    limits: {
      id: "auditflow-limits",
      nav: "Limitations",
      eyebrow: "Limitations and future work",
      title: "What it doesn't do yet",
      intro:
        "Known limits of the current code, then possible next steps. Nothing in the second list is built.",
    },
    summary: {
      id: "auditflow-summary",
      nav: "Summary",
      eyebrow: "Technical summary",
      title: "At a glance",
    },
  } satisfies Record<AuditflowSectionKey, SectionHeading>,

  problem: {
    paragraphs: [
      "Each check is a cross-reference: does the invoice amount match the purchase order, is the vendor the same everywhere, is there a receipt at all. The project's README makes the same point: the slow part of review is usually gathering evidence and checking that records agree, not the final judgment.",
      "The objective was to do that groundwork in a consistent, traceable way and leave the judgment with a person.",
    ],
    objectives: [
      { title: "Organize", detail: "Group a transaction's documents and list the support that is missing." },
      { title: "Check", detail: "Run a fixed set of consistency checks, never an open-ended search." },
      { title: "Trace", detail: "Tie every finding to its documents and to a stable ID." },
      { title: "Hand over", detail: "Route every finding to a person, with its evidence attached when it becomes a ticket." },
    ],
    // From the closing sentence of every ticket description (ticket_content.py).
    disclaimer: "It is not a conclusion about fraud or compliance.",
    disclaimerSource: { path: "connectors/ticket_content.py" } satisfies SourceRef,
  },

  pipeline: {
    inputs: ["Invoices", "Purchase orders", "Receipts", "Bank statements", "Ledger entries"],
    inputNote: "A sample case's text files, or up to 10 uploaded PDF or image files",
    stages: [
      {
        name: "Intake",
        shownAs: "Read",
        model: "Classifies each document and extracts its amounts, tax, dates, vendor, and references.",
        code: "A JSON schema fixes the output fields. For uploads, the model can only name files that were actually uploaded.",
        decidedBy: "model",
        source: { path: "agents/intake_agent.py" },
      },
      {
        name: "Evidence",
        shownAs: "Match",
        model: "Groups the documents into a transaction, lists missing support, and rates its confidence.",
        code: "Fixes the case and transaction IDs. Optionally runs a second pass below 0.7 confidence and keeps both passes' gaps.",
        decidedBy: "model",
        source: { path: "agents/evidence_agent.py" },
      },
      {
        name: "Anomaly",
        shownAs: "Check",
        model: "Checks for the eight issue types, giving each finding its documents, a severity, and a one-line explanation.",
        code: "Supplies a subtotal-plus-tax check per document, and replaces the model's missing PO and missing receipt answers with its own.",
        decidedBy: "checked",
        marks: "Findings created",
        source: { path: "agents/anomaly_agent.py" },
      },
      {
        name: "Decision",
        shownAs: "Route",
        model: "Writes a one-to-two sentence reason for the decision.",
        code: "Any finding routes to human review; no findings can be cleared. Confidence is reported, never used to route.",
        decidedBy: "code",
        marks: "Routing",
        source: { path: "agents/decision_agent.py" },
      },
      {
        name: "Workpaper",
        shownAs: "Report",
        model: "Writes a short label for each row with findings.",
        code: "Builds the rows, totals, and stable finding IDs. A case with no findings makes no model call.",
        decidedBy: "code",
        marks: "Finding IDs",
        source: { path: "agents/workpaper_agent.py" },
      },
    ] satisfies PipelineStage[],
    outcomes: {
      clear: "No findings: the transaction can be cleared.",
      review: "Any finding: a person reviews it in the results table.",
      ticket: "Optional, per finding: raise it in Zoho Desk.",
      report: "The workpaper can be saved as a PDF report, or to Google Drive.",
    },
    where: [
      {
        title: "Where findings are created",
        detail:
          "In Anomaly: the model's findings plus the two presence checks computed in code. Workpaper then gives each finding a stable ID.",
      },
      {
        title: "Where a person comes in",
        detail:
          "After Decision. Every transaction with a finding waits for a reviewer, who sees each explanation and the documents behind it.",
      },
      {
        title: "Where Zoho Desk fits",
        detail:
          "After review, one finding at a time, when the reviewer chooses to raise it. Only uploaded documents can be sent.",
      },
    ],
    orchestration: { path: "orchestration/api.py" } satisfies SourceRef,
  },

  tickets: {
    attribution:
      "Built by Abhijit Manna. I describe it from the code; it is not part of my contribution.",
    scenarios: [
      {
        id: "created",
        label: "First send",
        outcome:
          "A new ticket with the supporting files attached, or a note naming any file that couldn't be.",
      },
      {
        id: "duplicate",
        label: "Sent again",
        outcome: "The existing ticket's number is returned, and nothing new is created.",
      },
      {
        id: "unconfirmed",
        label: "Older tickets unchecked",
        outcome:
          "The duplicate check couldn't cover every older ticket, so nothing is sent. The reviewer can try again.",
      },
    ],
    diagram: {
      title: "One finding, one ticket",
      lanes: [
        { id: "reviewer", label: "Reviewer", note: "AuditFlow interface" },
        { id: "api", label: "AuditFlow API", note: "POST /send-to-zoho-desk" },
        { id: "zoho", label: "Zoho Desk", note: "Desk REST API" },
      ],
      steps: [
        {
          id: "review",
          lane: "reviewer",
          kind: "human",
          label: "Review the finding",
          detail:
            "Its explanation and the documents behind it. Any finding at all sends the transaction to review.",
          source: { path: "frontend/components/audit-flow-app.tsx" },
        },
        {
          id: "send",
          lane: "reviewer",
          kind: "human",
          label: "Send to Zoho Desk",
          detail:
            "One finding, or every pending one in turn. Needs a company name, and works for uploaded documents, not sample cases.",
          source: { path: "frontend/lib/zoho-desk.ts" },
        },
        {
          id: "validate",
          lane: "api",
          kind: "rule",
          via: "form + files",
          label: "Check access and input",
          detail:
            "A valid access code is required. Text lengths, the finding ID's format, and file sizes are checked.",
          source: { path: "orchestration/api.py", symbol: "send_to_zoho_desk" },
        },
        {
          id: "account",
          lane: "zoho",
          kind: "service",
          label: "Find or create the account",
          detail: "Tickets are grouped under the company name, with a matching contact.",
          source: { path: "connectors/zoho_desk.py" },
        },
        {
          id: "lookup",
          lane: "api",
          kind: "rule",
          label: "Look for an existing ticket",
          detail:
            "Subjects start with the finding ID, so a repeat send finds the first ticket. The check and the creation share a lock.",
          source: { path: "connectors/ticket_content.py", symbol: "find_existing_ticket" },
        },
        {
          id: "attachments",
          lane: "api",
          kind: "rule",
          label: "Plan the attachments",
          detail:
            "The uploaded files behind the cited documents: up to 19 MB each and 50 MB per ticket. Anything left out is listed.",
          source: { path: "connectors/ticket_content.py", symbol: "plan_attachments" },
          paths: ["created"],
        },
        {
          id: "create",
          lane: "zoho",
          kind: "service",
          label: "Create the ticket",
          detail:
            "Subject “[AF-…] label – document”. The body names the exception, the documents, why it was flagged, and the attachments.",
          source: { path: "connectors/ticket_content.py", symbol: "build_description" },
          paths: ["created"],
        },
        {
          id: "attach",
          lane: "zoho",
          kind: "service",
          label: "Attach the files",
          detail:
            "One request per file. A file that fails is named in a private comment; error details are never passed on.",
          source: { path: "orchestration/api.py", symbol: "_send_one_ticket" },
          paths: ["created"],
        },
        {
          id: "result",
          lane: "reviewer",
          kind: "output",
          via: "outcome",
          label: "See the outcome",
          detail: "With the ticket number and a link whenever a ticket exists.",
          source: { path: "frontend/lib/zoho-desk.ts", symbol: "summarizeRun" },
        },
      ],
    } satisfies LaneDiagram,
    sent: [
      "The company name",
      "The finding's ID, type, label, and explanation",
      "Its primary and related documents",
      "Which uploaded file each document was read from",
      "The uploaded files behind those documents",
    ],
    notDone: [
      "Ticket status is never read back from Zoho Desk; follow-up happens there.",
      "Nothing is sent automatically. A person chooses each finding to send.",
      "Sending is turned off unless the server has access codes, and each code has a daily ticket limit.",
    ],
  },

  evaluation: {
    issues: [
      {
        type: "duplicate_invoice",
        label: "Duplicate invoice",
        decidedBy: "model",
        rule: "The same invoice appears more than once in a transaction.",
        cases: ["03", "09"],
      },
      {
        type: "amount_mismatch",
        label: "Amount mismatch",
        decidedBy: "model",
        rule: "Amounts disagree across the transaction's documents.",
        cases: ["04", "09", "11"],
      },
      {
        type: "missing_po",
        label: "Missing purchase order",
        decidedBy: "code",
        rule: "An invoice, and no document typed as a purchase order.",
        cases: ["05", "11"],
      },
      {
        type: "missing_receipt",
        label: "Missing receipt",
        decidedBy: "code",
        rule: "An invoice, and no document typed as a receipt.",
        cases: ["06", "09", "12"],
      },
      {
        type: "vendor_mismatch",
        label: "Vendor mismatch",
        decidedBy: "model",
        rule: "The vendor differs between documents.",
        cases: ["07", "10"],
      },
      {
        type: "date_inconsistency",
        label: "Date inconsistency",
        decidedBy: "model",
        rule: "Dates out of sequence. A receipt dated before its invoice is normal and not flagged.",
        cases: ["08", "10"],
      },
      {
        type: "currency_mismatch",
        label: "Currency mismatch",
        decidedBy: "model",
        rule: "Different currency codes with no stated conversion between them.",
        cases: ["13"],
      },
      {
        type: "tax_mismatch",
        label: "Tax calculation mismatch",
        decidedBy: "checked",
        rule: "Subtotal plus tax doesn't match a document's stated total, within one currency unit. Code does the arithmetic; the model must treat it as authoritative.",
        cases: ["14"],
      },
    ] satisfies IssueType[],
    issuesSource: { path: "agents/anomaly_agent.py" } satisfies SourceRef,
    benchmark: [
      "Fourteen synthetic cases, each a set of plain-text documents with a ground-truth file listing the expected findings and the expected action. Two cases are clean; twelve should go to review, and every issue type appears in at least one.",
      "evaluate.py scores a run at the case and action level: was the transaction flagged or cleared correctly. CI validates every ground-truth file and runs the Python and frontend unit tests.",
    ],
    groundTruthPath: "dataset/case_09.json",
    // dataset/case_09.json at the checked commit, verbatim.
    groundTruth: `{
  "case_id": "CASE_09",
  "transaction_id": "TXN_09",
  "expected_findings": [
    {
      "type": "duplicate_invoice",
      "documents": ["INV-1009-A", "INV-1009-B"],
      "severity": "high"
    },
    {
      "type": "amount_mismatch",
      "documents": ["PO-1009", "INV-1009-A", "INV-1009-B", "BNK-1009", "LED-1009"],
      "severity": "high"
    },
    {
      "type": "missing_receipt",
      "documents": ["PO-1009", "INV-1009-A", "BNK-1009"],
      "severity": "high"
    }
  ],
  "expected_action": "human_review"
}`,
    tested: [
      "Each issue type is exercised by at least one synthetic case.",
      "The README reports that most cases pass on every run, and that missing PO and missing receipt are now decided by code.",
      "Unit tests cover the pipeline code in agents/, the Zoho Desk connector, the PDF report, and Google Drive saving.",
    ],
    notEstablished: [
      "Accuracy on real audit documents: the cases are synthetic fixtures, not customer audits.",
      "Repeatability on the current code: some cases varied between runs in earlier testing, and a full re-measurement hasn't been done.",
      "Anything outside the eight issue types, which AuditFlow doesn't look for.",
    ],
  },

  contribution: {
    mine: [
      {
        title: "Benchmark dataset",
        detail:
          "Wrote the first twelve synthetic cases, CASE_01 to CASE_12: the document fixtures and their ground-truth findings.",
        commits: ["bdd4b0719d2554f2b8562def3dea5ee5ce3d983c"],
      },
      {
        title: "Reviewer interface",
        detail:
          "Moved the frontend to Next.js and TypeScript and connected it to the pipeline API, with sample results shown when the backend is unavailable.",
        commits: [
          "d5ce3d27d499b7c239ffaecff11135fae42ddf9b",
          "56d0a6d0e13b1f7185a2ed676986bc5cb137ee46",
          "7a0b43f14489fc4af7831bc78331d1884e619841",
        ],
      },
      {
        title: "Upload and resolver controls",
        detail:
          "Wired document upload in the interface to the upload endpoint, and added the resolver switch and the badge shown when two Evidence passes disagree.",
        commits: [
          "71089a1a6fc660161b2774b58041163830fdc5c2",
          "e57d2f3ca8cabbf533630bf0e1741b5e1371cd15",
          "5a875d4b2a74fa21d2ba92d1aedb82d89d63040e",
        ],
      },
      {
        title: "The first review workflow",
        detail:
          "Built the original reviewer-decision interface and decision history. It was replaced in October 2026 by the Zoho Desk flow.",
        commits: ["71089a1a6fc660161b2774b58041163830fdc5c2"],
      },
      {
        title: "PDF reports",
        detail:
          "Added the printable report, then a PDF generator that runs in the browser, loads only when used, and can't make network requests while building the file.",
        commits: [
          "44310e26d8ba607abdb5f7460e8b54b857b92c3c",
          "226e64069910a1d7c009692141f79b871b9aba0b",
        ],
      },
      {
        title: "Google Drive",
        detail:
          "Connecting Drive behind a feature flag, adding PDFs and images from Drive to a check, and saving the report to My Drive › AuditFlow › company › month without overwriting. The browser talks to Google directly; the backend isn't involved.",
        commits: [
          "623d70abcbbfa50d0822fe379fc65abc9f65f3c1",
          "028e267a1dc8965e60107084f3c57009e349f4e7",
          "925b0861f5b18aa2c1af8489e8f44be7a57c6644",
          "2e9a1ba156991acf6114c1e873c12c1512131d25",
        ],
      },
      {
        title: "Testing and documentation",
        detail:
          "Unit tests for the PDF and Drive modules, a manual browser test record for Drive saving (22 checks passed, 10 not yet run), CI for feature branches, and the README's screenshots and Drive section.",
        commits: [],
      },
    ] satisfies Contribution[],
    teammate: {
      name: "Abhijit Manna",
      // The README's own description of his part, then what the commits show.
      readme: "Agent logic, orchestration, evaluation, backend reliability, and deployment.",
      items: [
        "The agent specification: data contracts, prompts, and the ground-truth format",
        "The five pipeline stages (the agents/ modules)",
        "The orchestration API, including document upload",
        "The Evidence resolver",
        "Code-decided presence checks and stable finding IDs",
        "The evaluation script and model comparison",
        "Access codes and daily limits",
        "The Zoho Desk integration",
        "Benchmark cases 13 and 14",
      ],
    },
  },

  decisions: [
    {
      title: "Check a fixed list of issues",
      implemented:
        "The Anomaly prompt names exactly eight issue types, and the output schema's enum rejects any other. An empty list is a valid answer.",
      sources: [{ path: "agents/anomaly_agent.py" }],
      rationale: {
        basis: "documented",
        text: "The prompt tells the model to check these types only, not to invent others, and not to force a finding when there is none.",
        source: { path: "agents/anomaly_agent.py", symbol: "SYSTEM_PROMPT" },
      },
      tradeoff: "Issues outside the eight types are not reported at all.",
    },
    {
      title: "Route in code, not by confidence",
      implemented:
        "Any finding sends the transaction to human review, and only a transaction with none can be cleared. Confidence is reported for context but never routes. The model writes only the plain-language reason.",
      sources: [{ path: "agents/decision_agent.py", symbol: "_decide_action" }],
      rationale: {
        basis: "documented",
        text: "An earlier rule gated on confidence and auto-cleared obvious, high-confidence findings, the opposite of what was intended. The docstring records the change.",
        source: { path: "agents/decision_agent.py" },
      },
      tradeoff:
        "Every finding costs a person's time, including minor ones. Review effort isn't reduced for findings that are probably harmless.",
    },
    {
      title: "Compute structural facts instead of asking for them",
      implemented:
        "Missing purchase order and missing receipt are decided after the model call, from the document types Intake extracted, and replace whatever the model said about them.",
      sources: [{ path: "agents/presence_check.py" }],
      rationale: {
        basis: "documented",
        text: "The model used to drop or invent these two findings from run to run, though they are a structural fact about the documents.",
        source: { path: "agents/presence_check.py" },
      },
      tradeoff:
        "The check is only as good as Intake's typing: a purchase order read as a ledger entry produces a missing-PO finding, which a person then reviews.",
    },
    {
      title: "Surface disagreement instead of hiding it",
      implemented:
        "With the resolver on, an Evidence result below 0.7 confidence gets a second, independent pass. If the passes disagree, both lists of missing evidence are kept, the lower confidence wins, and the disagreement is recorded on the workpaper.",
      sources: [{ path: "agents/evidence_agent.py", symbol: "run_evidence_agent_with_resolver" }],
      rationale: {
        basis: "documented",
        text: "Two independent passes that disagree are a stronger signal for review than one low-confidence pass, and a gap either pass found should never be silently dropped.",
        source: { path: "agents/evidence_agent.py" },
      },
      tradeoff:
        "An extra model call on uncertain cases, and no help when the first pass is confidently wrong.",
    },
    {
      title: "Give each finding a stable identity",
      implemented:
        "A finding's ID is a hash of its type and its anchor document, so a re-run produces the same ID. Ticket subjects start with that ID, which is how a repeat send finds the existing ticket. If older tickets can't all be checked, the send stops instead of risking a duplicate.",
      sources: [
        { path: "agents/finding_id.py" },
        { path: "orchestration/api.py", symbol: "_send_one_ticket" },
      ],
      rationale: {
        basis: "documented",
        text: "The model can cite slightly different documents for the same issue from run to run, but a reviewer's ticket still has to match the finding.",
        source: { path: "agents/finding_id.py" },
      },
      tradeoff:
        "Two findings of the same type on the same document get numbered suffixes, which depend on the order the model returns them in.",
    },
  ] satisfies EngineeringDecision[],

  limitations: [
    {
      title: "One transaction per check",
      detail:
        "Evidence groups every document in a check into a single transaction, so a bundle of unrelated payments isn't split apart.",
    },
    {
      title: "Synthetic evidence only",
      detail:
        "The fourteen cases are plain-text fixtures. The upload path accepts real PDFs and images, but no accuracy has been measured on them.",
    },
    {
      title: "Run-to-run variation",
      detail:
        "Model-judged findings can change between runs. The interface hides severity for that reason and labels confidence as reference only.",
    },
    {
      title: "Extraction errors cascade",
      detail: "A misread document type or amount flows into every later stage.",
    },
    {
      title: "One-way integration",
      detail:
        "Tickets are created but their outcomes never come back, so reviewers' decisions don't improve the checks.",
    },
  ] satisfies Limitation[],

  nextSteps: [
    {
      origin: "roadmap",
      title: "Regression tests from reviewer outcomes",
      detail: "Use overturned findings as a regression set, as the README's next steps propose.",
    },
    {
      origin: "roadmap",
      title: "More issue types and audit areas",
      detail: "Additional anomaly types and broader audit-domain coverage, also from the README.",
    },
    {
      origin: "proposed",
      title: "Repeated-run measurement",
      detail:
        "Run each case several times on the current code and publish per-type agreement and variance, with the predictions kept.",
    },
    {
      origin: "proposed",
      title: "Several transactions per upload",
      detail:
        "Let Evidence return more than one transaction, so a mixed bundle is split before anomalies are checked.",
    },
    {
      origin: "proposed",
      title: "Read ticket outcomes back",
      detail:
        "Bring the result of each Zoho Desk ticket back as a labelled example for evaluation.",
    },
  ] satisfies NextStep[],

  summary: [
    { label: "Project", value: "Team project with Abhijit Manna, built for the Syndicate by Maximor AO Hackathon" },
    { label: "Frontend", value: "Next.js, React, TypeScript, Vitest; pdfmake for reports" },
    { label: "Backend", value: "Python, FastAPI, Uvicorn" },
    {
      label: "Models",
      value:
        "Anthropic Claude through the Anthropic Python SDK, with JSON-schema outputs. Each stage's model is set by environment variable; the code defaults to Claude Sonnet 5, and Claude Opus 5 for Anomaly",
    },
    {
      label: "Integrations",
      value: "Zoho Desk REST API with OAuth refresh tokens; Google Drive and Google Picker in the browser",
    },
    { label: "Testing", value: "pytest, Vitest, and GitHub Actions CI; a manual browser test record for Drive saving" },
    { label: "Evaluation", value: "Fourteen synthetic cases with ground-truth files, scored by evaluate.py" },
    { label: "Hosting", value: "Vercel for the frontend; the README lists Render for the backend" },
  ] satisfies SummaryRow[],
};
