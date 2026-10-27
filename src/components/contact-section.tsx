import type { CSSProperties } from "react";
import { Container } from "@/components/container";
import { CopyEmailButton } from "@/components/copy-email-button";
import { contactLinks } from "@/content/site";

/**
 * The closing figure: several flows converge on a single endpoint, echoing the
 * hero's workflow. Decorative only.
 */
function Endpoint() {
  const paths = [
    "M0 40 C 180 40, 220 120, 380 120",
    "M0 120 C 160 120, 240 120, 380 120",
    "M0 200 C 180 200, 220 120, 380 120",
  ];

  return (
    <svg viewBox="0 0 440 240" aria-hidden="true" focusable="false" className="endpoint" data-loop="">
      {paths.map((d, index) => (
        <g key={d} style={{ "--order": index } as CSSProperties}>
          <path d={d} pathLength={1} className="endpoint-line" />
          <path
            d={d}
            pathLength={100}
            className="map-packet"
            style={{ "--dur": `${3.6 + index * 0.7}s`, "--delay": `${index * 1.1}s` } as CSSProperties}
          />
        </g>
      ))}
      <circle cx="380" cy="120" r="34" className="endpoint-halo" />
      <circle cx="380" cy="120" r="15" className="endpoint-pulse" />
      <circle cx="380" cy="120" r="15" className="endpoint-ring" />
      <circle cx="380" cy="120" r="5.5" className="endpoint-core" />
    </svg>
  );
}

export function ContactSection() {
  const email = contactLinks.find((link) => link.label === "Email");
  const others = contactLinks.filter((link) => link !== email);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="contact relative isolate overflow-clip pt-[var(--section-space)] pb-24 sm:pb-32"
    >
      <div aria-hidden="true" className="contact-backdrop" />
      <Container className="relative">
        <p className="section-index" data-reveal="fade">
          <span className="text-teal">04</span>
          <span>Contact</span>
          <span aria-hidden="true" className="section-rule" data-reveal="line" />
        </p>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          <h2
            id="contact-heading"
            data-reveal=""
            className="font-display text-display font-semibold text-balance-safe text-fg lg:col-span-8"
          >
            Let&rsquo;s talk about data, AI, or a project you&rsquo;re building.
          </h2>
          <div className="hidden lg:col-span-4 lg:block" data-reveal="fade">
            <Endpoint />
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          {email ? (
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-4 lg:col-span-7"
              data-reveal=""
              style={{ "--reveal-delay": "120ms" } as CSSProperties}
            >
              <a href={email.href} className="contact-email">
                <span className="sr-only">Email: </span>
                {email.display}
                <svg viewBox="0 0 16 16" aria-hidden="true" className="contact-email-arrow" fill="none">
                  <path
                    d="M3 8h9.5M8.5 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <CopyEmailButton email={email.display} />
            </div>
          ) : null}

          <ul
            className="border-t border-line-strong lg:col-span-5"
            data-reveal=""
            style={{ "--reveal-delay": "200ms" } as CSSProperties}
          >
            {others.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <li key={link.label} className="border-b border-line">
                  <a
                    href={link.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="contact-row group"
                  >
                    <span className="font-mono text-label text-subtle uppercase">{link.label}</span>
                    <span className="min-w-0 truncate text-right text-fg transition-colors group-hover:text-teal-strong">
                      {link.display}
                      <span aria-hidden="true" className="contact-row-arrow">
                        {isExternal ? "↗" : "→"}
                      </span>
                      {isExternal ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
