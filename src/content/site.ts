// Profile details come from Garvit's resume (primary source for summary, role,
// location, and skills) and his public GitHub profile (github.com/tymepas).
// Resume metrics and employment details are deliberately not published here
// until Garvit confirms them.

export type NavItem = {
  label: string;
  href: string;
};

export type ContactLink = {
  label: string;
  href: string;
  display: string;
};

export const site = {
  name: "Garvit Mathur",
  role: "Project Manager, Analytics & AI",
  location: "Delhi, India",
  title: "Garvit Mathur — Project Manager, Analytics & AI",
  description:
    "Portfolio of Garvit Mathur, a project manager in market research operations who builds analytics dashboards and AI applications with LLM APIs, structured outputs, and agentic workflows.",
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Analytics", href: "/#analytics" },
  { label: "Credentials", href: "/#credentials" },
  { label: "Contact", href: "/#contact" },
];

export const focusAreas = [
  {
    title: "Analytics & BI",
    detail: "SQL, Python, Power BI, Tableau, Excel and DAX",
  },
  {
    title: "AI applications",
    detail: "LLM APIs, AI agents, structured outputs, workflow automation",
  },
  {
    title: "Research operations",
    detail: "Project delivery, stakeholder coordination, data validation, reporting",
  },
] as const;

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    // Confirmed by Garvit as the public contact address (matches his resume).
    href: "mailto:garvit542@gmail.com",
    display: "garvit542@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/garvitai/",
    display: "linkedin.com/in/garvitai",
  },
  {
    label: "GitHub",
    href: "https://github.com/tymepas",
    display: "github.com/tymepas",
  },
];

export const githubUrl = "https://github.com/tymepas";
