import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { focusAreas, site } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-line">
      <Container className="grid gap-14 pt-16 pb-20 sm:pt-24 sm:pb-24 lg:grid-cols-12 lg:gap-10 lg:pt-28 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">
            {site.role} · {site.location}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            I build AI-powered applications and turn data into{" "}
            <em className="text-accent">clear, usable insight.</em>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            I&rsquo;m {site.name}, a project manager with 5+ years in market
            research and research operations. I also build analytics dashboards
            and AI applications with LLM APIs and agentic workflows, focused on
            structured outputs, explainable decisions, and practical automation.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#work">View selected work</ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <h2 className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">
            Areas of focus
          </h2>
          <ol className="mt-5 border-t border-line-strong">
            {focusAreas.map((area, index) => (
              <li
                key={area.title}
                className="grid grid-cols-[2.25rem_1fr] border-b border-line py-4"
              >
                <span className="font-mono text-xs leading-6 text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium text-ink">{area.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {area.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
