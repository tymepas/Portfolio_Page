import { Container } from "@/components/container";
import { ProjectCard, ProjectFeature } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects } from "@/content/projects";

/** The first two projects get the large, two-column treatment. */
const FEATURED_COUNT = 2;

export function FeaturedProjects() {
  const total = featuredProjects.length;

  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-[var(--section-space)]">
      <Container>
        <SectionHeading
          id="work-heading"
          index="01"
          eyebrow="Selected work"
          title="AI projects"
          description="Applications built with LLM APIs and agentic workflows. Each card states whether it was an individual or team project, and links to its public repository."
        />

        <ul className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {featuredProjects.map((project, index) =>
            index < FEATURED_COUNT ? (
              <li key={project.slug} className="lg:col-span-2">
                <ProjectFeature
                  project={project}
                  index={index}
                  total={total}
                  reverse={index % 2 === 1}
                />
              </li>
            ) : (
              <li key={project.slug} className="lg:row-span-3 lg:grid lg:grid-rows-subgrid">
                <ProjectCard project={project} index={index} total={total} />
              </li>
            ),
          )}
        </ul>
      </Container>
    </section>
  );
}
