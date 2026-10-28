import type { MetadataRoute } from "next";
import { analyticsProjects, featuredProjects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * The homepage and every case-study page. Modification dates are left out
 * rather than guessed: the content files record none for the pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = [...featuredProjects, ...analyticsProjects].flatMap((project) =>
    project.caseStudy ? [project.caseStudy] : [],
  );

  return ["/", ...caseStudies].map((path) => ({ url: new URL(path, site.url).toString() }));
}
