import { Container } from "@/components/container";
import { contactLinks } from "@/content/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line bg-surface py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">Contact</p>
          <h2
            id="contact-heading"
            className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl"
          >
            Let&rsquo;s talk about data, AI, or a project you&rsquo;re building.
          </h2>
        </div>

        <ul className="border-t border-line-strong lg:col-span-5 lg:col-start-8 lg:self-end">
          {contactLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.label} className="border-b border-line">
                <a
                  href={link.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="font-mono text-xs tracking-[0.12em] text-subtle uppercase">
                    {link.label}
                  </span>
                  <span className="min-w-0 truncate text-right text-ink transition-colors group-hover:text-accent">
                    {link.display}
                    <span aria-hidden="true" className="ml-1.5 text-subtle group-hover:text-accent">
                      {isExternal ? "↗" : "→"}
                    </span>
                    {isExternal ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
