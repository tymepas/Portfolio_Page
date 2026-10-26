import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects } from "@/content/projects";

export function FeaturedProjects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="pt-20 pb-16 sm:pt-28 sm:pb-20">
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title="AI projects"
          description="Applications built with LLM APIs and agentic workflows. Each card states whether it was an individual or team project, and links to its public repository."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
