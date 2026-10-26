// Project content. Every field below was checked against the project's public
// repository (README, dependency manifests, file tree, commit history, and
// contributor list) and, where a demo is listed, against the live URL.
// Do not add outcomes, metrics, or links that are not verifiable in those sources.

export type ProjectLink = {
  label: string;
  href: string;
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
  },
  {
    slug: "auditflow",
    title: "AuditFlow",
    category: "Multi-agent AI workflow",
    summary:
      "Audit-evidence review for finance teams. Five agents compare invoices, purchase orders, receipts, and bank and ledger records, flag exceptions, and compile a review-ready workpaper.",
    highlights: [
      "Intake, Evidence, Anomaly, Decision, and Workpaper agents running on Anthropic Claude",
      "Any finding is routed to a human reviewer, and reviewer decisions are saved server-side",
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
  },
  {
    slug: "writewise",
    title: "WriteWise",
    category: "AI writing assistant",
    summary:
      "A writing tool for job seekers and professionals that combines general editing modes with job-focused features, such as application emails personalized to the user's own background.",
    highlights: [
      "Ten writing modes, from grammar and tone to paraphrasing, summarizing, and prompt rewriting",
      "Job emails only state experience the user supplied; posting requirements are never presented as their background",
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
  },
];

export const analyticsProjects: Project[] = [
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
  },
];
