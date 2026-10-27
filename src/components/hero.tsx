import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { KineticHeadline } from "@/components/kinetic-headline";
import { SystemMap } from "@/components/visuals/system-map";
import { WorkflowPipeline } from "@/components/visuals/workflow-pipeline";
import { focusAreas, hero, site } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" data-map-area="" className="hero">
      <div aria-hidden="true" className="hero-backdrop" />

      <Container className="relative">
        <p className="hero-eyebrow">
          <span aria-hidden="true" className="hero-beacon" />
          {site.role}
          <span aria-hidden="true" className="text-line-bright">
            /
          </span>
          {site.location}
        </p>

        <KineticHeadline
          id="hero-heading"
          words={hero.headline}
          className="mt-6 font-display text-hero font-semibold text-fg"
        />

        <div className="mt-10 grid items-start gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-6">
          <div className="hero-copy lg:col-span-5">
            <p className="max-w-xl text-lede text-muted">{hero.intro}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#work">View selected work</ButtonLink>
              <ButtonLink href="/#contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>

            <h2 className="mt-14 font-mono text-label text-subtle uppercase">Areas of focus</h2>
            <ol className="mt-4 border-t border-line">
              {focusAreas.map((area, index) => (
                <li
                  key={area.title}
                  className="grid grid-cols-[2.5rem_1fr] border-b border-line py-3.5"
                >
                  <span className="font-mono text-label leading-6 text-teal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium text-fg">{area.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{area.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <SystemMap className="hero-map lg:col-span-6 lg:col-start-7" />
        </div>

        <div className="mt-16 pb-12 sm:mt-20 sm:pb-16" data-reveal="">
          <WorkflowPipeline />
        </div>
      </Container>
    </section>
  );
}
