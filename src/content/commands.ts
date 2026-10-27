// Quick-navigation entries for the command palette. Derived from the other
// content files so destinations, labels, and links stay in one place.
import { analyticsProjects, featuredProjects } from "@/content/projects";
import { contactLinks, navItems } from "@/content/site";

export type PaletteCommand = {
  id: string;
  label: string;
  group: "Sections" | "Projects" | "Project links" | "Contact";
  href: string;
  hint?: string;
  external?: boolean;
};

const sectionHints: Record<string, string> = {
  "/#work": "AI projects",
  "/#analytics": "Data analysis and dashboards",
  "/#credentials": "Assessments and certificates",
  "/#contact": "Email, LinkedIn, GitHub",
};

export function getPaletteCommands(): PaletteCommand[] {
  const projects = [...featuredProjects, ...analyticsProjects];

  const sections: PaletteCommand[] = navItems.map((item) => ({
    id: `section:${item.href}`,
    label: item.label,
    group: "Sections",
    href: item.href,
    hint: sectionHints[item.href],
  }));

  const projectEntries: PaletteCommand[] = projects.map((project) => ({
    id: `project:${project.slug}`,
    label: project.title,
    group: "Projects",
    href: `/#${project.slug}`,
    hint: project.collaborators?.length ? `${project.category} · team project` : project.category,
  }));

  // Live apps, static report exports, and repositories, in that order per project.
  const projectLinks: PaletteCommand[] = projects.flatMap((project) =>
    [
      project.demo ? { kind: "demo", link: project.demo } : null,
      project.report ? { kind: "report", link: project.report } : null,
      { kind: "repo", link: project.repository },
    ]
      .filter((entry) => entry !== null)
      .map(({ kind, link }) => ({
        id: `${kind}:${project.slug}`,
        label: `${project.title}: ${kind === "report" ? link.label : link.label.toLowerCase()}`,
        group: "Project links" as const,
        href: link.href,
        external: true,
      })),
  );

  const contact: PaletteCommand[] = contactLinks.map((link) => ({
    id: `contact:${link.label}`,
    label: link.label === "Email" ? "Email Garvit" : link.label,
    group: "Contact",
    href: link.href,
    hint: link.display,
    external: link.href.startsWith("http"),
  }));

  return [...sections, ...projectEntries, ...projectLinks, ...contact];
}
