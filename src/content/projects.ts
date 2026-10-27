// Project content. Every field below was checked against the project's public
// repository (README, dependency manifests, file tree, commit history, and
// contributor list) and, where a demo is listed, against the live URL.
// Do not add outcomes, metrics, or links that are not verifiable in those sources.

export type ProjectLink = {
  label: string;
  href: string;
};

/**
 * How a step is produced. "model": a language or vision model. "rule": code with
 * fixed logic (schemas, scoring, checks). "human": a person. "data": a data
 * source or store. "service": application code that moves data along.
 */
export type DiagramStepKind = "model" | "rule" | "human" | "data" | "service" | "output";

export type DiagramStep = {
  label: string;
  detail: string;
  kind: DiagramStepKind;
  /** A second kind of work in the same step, such as code checks inside a model step. */
  alsoKind?: DiagramStepKind;
};

/**
 * An architecture diagram drawn from the repository's code, not a screenshot.
 * The site labels it as a diagram.
 */
export type ProjectDiagram = {
  title: string;
  /** "rail" runs the steps in a row when there is room; "column" stacks them. */
  layout: "column" | "rail";
  inputs: string[];
  steps: DiagramStep[];
  facet?: {
    label: string;
    items: { name: string; note?: string; weight?: number }[];
  };
  /** Possible results, where the code defines a fixed set. */
  outcomes?: string[];
};

export type ProjectScreenshot = {
  /** Path under public/. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

/** Static images of a multi-page report, shown one page at a time. */
export type ReportPreview = {
  /** Says where the images come from and that they are not interactive. */
  caption: string;
  /** Index of the page shown first. */
  initialPage: number;
  pages: {
    /** The page name as it appears in the report file. */
    name: string;
    src: string;
    width: number;
    height: number;
    alt: string;
  }[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Other people who built the project. Omit for individual projects. */
  collaborators?: string[];
  /** Garvit's contribution. Required in practice for collaborative projects. */
  role?: string;
  context?: string;
  repository: ProjectLink;
  demo?: ProjectLink;
  /** A static export, such as a PDF. Never use it for a hosted or interactive report. */
  report?: ProjectLink;
  /** Path of the project's case-study page on this site, when it has one. */
  caseStudy?: string;
  diagram?: ProjectDiagram;
  screenshot?: ProjectScreenshot;
  preview?: ReportPreview;
};

export const featuredProjects: Project[] = [
  {
    slug: "verdict",
    title: "Verdict",
    category: "AI decision support",
    summary:
      "A fashion purchase-decision assistant. Upload a photo, the garment, and the occasion, and Verdict returns an explainable recommendation before you buy.",
    highlights: [
      "A vision model rates six dimensions, including occasion fit, color harmony, formality, and seasonality",
      "Model output is validated against a Zod schema, and the final verdict is calculated by fixed rules rather than by the model",
      "A reusable Style DNA profile, kept in the browser's local storage, personalizes each analysis",
    ],
    stack: ["Next.js", "TypeScript", "OpenAI Responses API", "Zod", "Tailwind CSS", "Jest"],
    context: "Built during OpenAI Build Week, with Codex as a coding assistant",
    repository: {
      label: "Repository",
      href: "https://github.com/tymepas/AI_Stylist_Assistant",
    },
    demo: {
      label: "Live app",
      href: "https://verdictai-fawn.vercel.app/",
    },
    caseStudy: "/projects/verdict",
    // Sources: app/api/[[...path]]/route.js, lib/services/openai/openAIAnalysisService.ts,
    // openAIAnalysisSchema.ts, and computeVerdict in lib/services/analysisService.ts.
    diagram: {
      title: "From two photos to a rule-based verdict",
      layout: "column",
      inputs: ["Your photo", "Garment photo", "Occasion", "Style profile"],
      steps: [
        {
          kind: "rule",
          label: "Input checks",
          detail: "File type, size, and a 512 px minimum, before any model call",
        },
        {
          kind: "model",
          label: "Vision model",
          detail: "Rates six dimensions, each with a reason and a confidence",
        },
        {
          kind: "rule",
          label: "Zod schema",
          detail: "Strict validation. A mismatched response fails; nothing is guessed",
        },
        {
          kind: "rule",
          label: "Fixed rules",
          detail: "A weighted score maps to one of four verdicts",
        },
        {
          kind: "output",
          label: "Explained verdict",
          detail: "Reasons per dimension, and what to consider",
        },
      ],
      facet: {
        label: "Rule weights per dimension",
        items: [
          { name: "Occasion fit", weight: 30 },
          { name: "Formality", weight: 25 },
          { name: "Style preference match", weight: 20 },
          { name: "Color harmony", weight: 15 },
          { name: "Seasonality", weight: 10 },
          { name: "Style consistency", note: "Shown, not scored" },
        ],
      },
      outcomes: ["Highly Recommended", "Recommended", "Consider Alternatives", "Not Recommended"],
    },
  },
  {
    slug: "auditflow",
    title: "AuditFlow",
    category: "AI-assisted audit evidence workflow",
    summary:
      "Audit-evidence review for finance teams. Claude reads and cross-checks invoices, purchase orders, receipts, and bank and ledger records; code routes every finding to a person and compiles the review-ready workpaper.",
    highlights: [
      // Checked 28 Oct 2026 against agents/*_agent.py at commit 2c9abd4: decision_agent.py
      // sets the action in code and workpaper_agent.py builds rows, totals, and finding IDs;
      // their model calls only write the reason and the row labels.
      "Intake, Evidence, and Anomaly run on Anthropic Claude; Decision and Workpaper set their outcomes in code, and the model writes only the wording",
      // Verified 27 Oct 2026 against the current code, not the README (which still describes
      // the older /feedback decision flow): frontend/lib/zoho-desk.ts sends one finding at a
      // time to POST /send-to-zoho-desk, and no frontend file calls /feedback (commit 2fc2764).
      "Reviewers can raise each finding as a Zoho Desk ticket, with its supporting files attached",
      "Tested on 14 synthetic benchmark cases; some cases varied between runs, and the current code has not been fully re-measured",
    ],
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "Anthropic Claude"],
    collaborators: ["Abhijit Manna"],
    role: "Dataset, frontend, testing, and integration; later added PDF reports and Google Drive saving",
    context: "Built for the Syndicate by Maximor AO Hackathon",
    repository: {
      label: "Repository",
      href: "https://github.com/abhijitmanna912001/auditflow",
    },
    demo: {
      label: "Live app",
      href: "https://auditflow-kohl.vercel.app/",
    },
    caseStudy: "/projects/auditflow",
    // Sources: agents/*_agent.py (run in sequence by run_full_pipeline in workpaper_agent.py).
    // The Decision and Workpaper steps set their outcomes in code; the model writes the wording.
    // Anomaly is model plus code: anomaly_agent.py puts a subtotal-plus-tax check in the prompt,
    // and presence_check.py replaces the model's missing PO and missing receipt answers.
    diagram: {
      title: "Five stages in sequence, then a person",
      layout: "rail",
      inputs: ["Invoices", "Receipts", "Purchase orders", "Bank statements", "Ledger entries"],
      steps: [
        {
          kind: "model",
          label: "Intake",
          detail: "Classifies documents and extracts amounts, dates, and references",
        },
        {
          kind: "model",
          label: "Evidence",
          detail: "Groups a transaction's documents and lists what is missing",
        },
        {
          kind: "model",
          alsoKind: "rule",
          label: "Anomaly",
          detail: "Checks eight issue types; code does the tax arithmetic and flags missing POs and receipts",
        },
        {
          kind: "rule",
          label: "Decision",
          detail: "Code routes any finding to review; the model explains why",
        },
        {
          kind: "rule",
          label: "Workpaper",
          detail: "Rows and totals computed in code, labelled by the model",
        },
        {
          kind: "human",
          label: "Human review",
          detail: "A person reviews every finding",
        },
      ],
    },
    screenshot: {
      src: "/images/projects/auditflow-case-09.png",
      width: 1764,
      height: 772,
      alt: "AuditFlow review register for CASE_09: one transaction flagged for a duplicate invoice, an amount above the purchase order, and a missing receipt, with the agent action set to human review.",
      caption: "Screenshot: synthetic benchmark CASE_09 routed to human review. Added to the repository in September 2026; the reviewer controls have changed since.",
    },
  },
  {
    slug: "writewise",
    title: "WriteWise",
    category: "AI writing assistant",
    summary:
      "A writing tool for job seekers and professionals that combines general editing modes with job-focused features, such as application emails personalized to the user's own background.",
    highlights: [
      "Ten writing modes, from grammar and tone to paraphrasing, summarizing, and prompt rewriting",
      // Verified 27 Oct 2026: the rule lives in prompt text in backend/server.py. Code only
      // drops invented placeholder lines and empty bullets; it does not check claims.
      "Job-email prompts instruct the model to use only the experience supplied by the user, rather than presenting job-posting requirements as their background",
      "Stateless FastAPI backend calling the OpenAI API, with no login or database",
    ],
    stack: ["React", "FastAPI", "Python", "OpenAI API", "Tailwind CSS"],
    repository: {
      label: "Repository",
      href: "https://github.com/tymepas/WriteWise_Project",
    },
    demo: {
      label: "Live app",
      href: "https://write-wise-project.vercel.app/",
    },
    // Sources: frontend/src/App.js (modes), backend/server.py (prompting and the OpenAI call).
    diagram: {
      title: "One stateless request path",
      layout: "column",
      inputs: ["Your text", "Optional profile, kept in the browser"],
      steps: [
        {
          kind: "service",
          label: "React interface",
          detail: "Ten modes, each with its own options",
        },
        {
          kind: "service",
          label: "FastAPI backend",
          detail: "Builds the prompt for the chosen mode. No login, no database",
        },
        {
          kind: "model",
          label: "OpenAI API",
          detail: "Returns structured JSON for the interface",
        },
      ],
      facet: {
        label: "Writing modes",
        items: [
          { name: "Auto" },
          { name: "Grammar" },
          { name: "Email" },
          { name: "Tone" },
          { name: "Rewrite" },
          { name: "Paraphrase" },
          { name: "Summarize" },
          { name: "Expand / Shorten" },
          { name: "Humanize" },
          { name: "Prompt" },
        ],
      },
    },
  },
  {
    slug: "airwise-ai",
    title: "AirWise AI",
    category: "Retrieval-augmented assistant",
    summary:
      "A Delhi air-quality and health companion that retrieves WHO and CPCB guidance from Elasticsearch before Gemini generates an answer, so responses are grounded in cited sources.",
    highlights: [
      "Retrieval step injects matching health guidance into the model prompt",
      "Structured responses: a decision, the reasoning, recommended actions, and sources",
      "Includes a retrieval evaluation script with test cases",
    ],
    stack: ["Next.js", "TypeScript", "Elasticsearch", "Google Gemini", "Tailwind CSS"],
    context: "Built for an AI + Elasticsearch hackathon",
    repository: {
      label: "Repository",
      href: "https://github.com/tymepas/airwise-ai",
    },
    // Sources: app/api/chat/route.ts and lib/rag.ts. Retrieval is keyword-based (BM25) only.
    diagram: {
      title: "Retrieve first, then generate",
      layout: "column",
      inputs: ["A health or air-quality question"],
      steps: [
        {
          kind: "model",
          label: "Query planning",
          detail: "Gemini suggests search phrases; a fixed health ontology adds terms",
        },
        {
          kind: "data",
          label: "Elasticsearch",
          detail: "Three keyword searches over WHO and CPCB guidance, run in parallel",
        },
        {
          kind: "rule",
          label: "Re-rank",
          detail: "Results are merged and ranked in code; the top four are kept",
        },
        {
          kind: "model",
          label: "Gemini answer",
          detail: "Answers from the retrieved guidance as structured JSON",
        },
      ],
      facet: {
        label: "Response fields",
        items: [
          { name: "Decision" },
          { name: "Reason" },
          { name: "Actions" },
          { name: "Sources", note: "Filtered in code to retrieved documents" },
        ],
      },
    },
  },
];

export const analyticsProjects: Project[] = [
  // Sources: README.md and ElectionResult_Dashboard.{pbix,pdf,png} in
  // github.com/tymepas/Power-BI-Projects-Portfolio. Page names follow the PBIX report
  // layout. Page 1 is the repository's PNG screenshot; pages 2 to 6 are rendered from the
  // PDF export with its white margins trimmed. The README offers no hosted interactive
  // report: the PDF is the online view and the .pbix opens in Power BI Desktop.
  {
    slug: "india-election-2024",
    title: "India General Election 2024 – Results Analysis",
    category: "Power BI report",
    summary:
      "A six-page Power BI report on the results of India's 2024 general election, from national alliance totals down to individual constituencies.",
    highlights: [
      "State-wise and constituency-wise result analysis",
      "Alliance seat-share comparison between the NDA and I.N.D.I.A",
      "Geospatial visuals on Bing Maps, with drill-downs and tooltips",
      "Winning margins, vote share, and candidate performance metrics",
    ],
    stack: ["Power BI", "DAX", "Power Query", "Bing Maps API"],
    repository: {
      label: "Repository",
      href: "https://github.com/tymepas/Power-BI-Projects-Portfolio",
    },
    report: {
      label: "PDF export",
      href: "https://github.com/tymepas/Power-BI-Projects-Portfolio/blob/main/ElectionResult_Dashboard.pdf",
    },
    preview: {
      caption:
        "Static images: page 1 is the screenshot from the repository, and pages 2 to 6 come from the PDF export. The interactive report is the .pbix file in the repository, opened in Power BI Desktop.",
      initialPage: 2,
      pages: [
        {
          name: "Landing Page",
          src: "/images/projects/india-election-2024-landing.webp",
          width: 1800,
          height: 1001,
          alt: "Landing page of the India General Election Results Analysis 2024 report: the title, voting dates of 19 April to 1 June 2024, the 4 June 2024 counting date, an introduction, and navigation tiles for the Overview, State Demographic, Political Analysis by State, and Constituency Analysis dashboards.",
        },
        {
          name: "Overview Analysis",
          src: "/images/projects/india-election-2024-overview.webp",
          width: 1800,
          height: 1008,
          alt: "Overview Analysis page: seats won out of 543 by alliance, NDA 292 (54%), I.N.D.I.A 234 (43%), and others or independents 17 (3%), followed by seats won by each party in the 14-party NDA and the 20-party I.N.D.I.A alliance.",
        },
        {
          name: "State Demographics Analysis",
          src: "/images/projects/india-election-2024-state-demographics.webp",
          width: 1800,
          height: 1008,
          alt: "State Demographics Analysis page: three Bing Maps visuals of India showing seats by state with alliance totals in tooltips, the winning candidate and party in each constituency, and states coloured by the alliance that won most of their seats.",
        },
        {
          name: "Political analysis by State",
          src: "/images/projects/india-election-2024-political-by-state.webp",
          width: 1800,
          height: 1008,
          alt: "Political analysis by State page, filtered to Uttar Pradesh: I.N.D.I.A 43, NDA 36, and other 1 of 80 seats, with a state map, a party-wise results table, and a party-wise seat-share donut chart.",
        },
        {
          name: "Constituency Analysis",
          src: "/images/projects/india-election-2024-constituency.webp",
          width: 1800,
          height: 1008,
          alt: "Constituency Analysis page, filtered to Mathura in Uttar Pradesh: total, EVM, and postal votes, 16 candidates, and cards for the winner, runner-up, and second runner-up with each one's party, votes, and vote share.",
        },
        {
          name: "Details Grid",
          src: "/images/projects/india-election-2024-details-grid.webp",
          width: 1800,
          height: 1008,
          alt: "Details Grid page: a table of constituencies with the winning and runner-up candidates, party, alliance, EVM votes, postal votes, total votes, and winning margin, with data bars on total votes and margin.",
        },
      ],
    },
  },
  {
    slug: "world-indicators-dashboard",
    title: "World Indicators Dashboard",
    category: "Analytics dashboard",
    summary:
      "An end-to-end pipeline that pulls World Bank API data with Python, cleans and merges it with pandas, and feeds an interactive Power BI report.",
    highlights: [
      "Seven indicator categories, including economy, labour, trade, health, and technology",
      "Python connector inside Power Query so the report can refresh from the live API",
      "KPI cards, trend lines, scatter plots, and correlation heatmaps",
    ],
    stack: ["Python", "pandas", "Power BI", "World Bank API"],
    repository: {
      label: "Repository",
      href: "https://github.com/tymepas/world-indicators-dashboard",
    },
    // Sources: powerbi_connector.py, Realtime_Dashboard_python.ipynb, and the README.
    diagram: {
      title: "From a public API to a refreshable report",
      layout: "rail",
      inputs: ["World Bank API"],
      steps: [
        {
          kind: "data",
          label: "Fetch",
          detail: "Country metadata and 26 indicators, paged, from 2016 onward",
        },
        {
          kind: "rule",
          label: "Clean and merge",
          detail: "pandas adds region and income level and joins on country",
        },
        {
          kind: "data",
          label: "Seven tables",
          detail: "One per indicator category",
        },
        {
          kind: "service",
          label: "Power Query",
          detail: "The same Python script runs as a data source, so the report can refresh",
        },
        {
          kind: "output",
          label: "Power BI report",
          detail: "KPI cards, trend lines, scatter plots, and correlation heatmaps",
        },
      ],
      facet: {
        label: "Indicator categories",
        items: [
          { name: "Economic activity" },
          { name: "Labour market" },
          { name: "Trade" },
          { name: "Poverty and inequality" },
          { name: "Environment" },
          { name: "Health" },
          { name: "Technology" },
        ],
      },
    },
    screenshot: {
      src: "/images/projects/world-indicators-dashboard.png",
      width: 1561,
      height: 1036,
      alt: "The World Indicators Analysis Power BI report: KPI cards for GDP per capita, trade, health spending, GDP growth, and forest cover; a bar chart of health spending by region; indicator trend lines; two scatter charts; poverty-reduction tables; a correlation heatmap; and a regression plot of health expenditure against life expectancy.",
      caption: "Screenshot of the Power BI report, from the project repository.",
    },
  },
];
