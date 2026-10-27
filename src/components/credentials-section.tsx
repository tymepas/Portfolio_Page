import type { CSSProperties } from "react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { credentials, historicalCredentials, type Credential } from "@/content/credentials";

const year = (credential: Credential) => credential.issued.slice(0, 4);

function CredentialCard({ credential, index }: { credential: Credential; index: number }) {
  const headingId = `credential-${credential.slug}`;

  return (
    <li
      className="cred-item"
      data-reveal=""
      style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
    >
      <span aria-hidden="true" className="cred-node" />
      <article aria-labelledby={headingId} className="cred-card" data-spotlight="">
        <p className="font-mono text-label text-teal uppercase">{credential.type}</p>
        <h3
          id={headingId}
          className="mt-3 font-display text-heading font-semibold text-balance-safe text-fg"
        >
          {credential.title}
        </h3>
        {credential.detail ? (
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{credential.detail}</p>
        ) : null}
        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 border-t border-line pt-4 text-sm">
          <dt className="font-mono text-[0.6875rem] leading-5 tracking-[0.12em] text-subtle uppercase">
            Issuer
          </dt>
          <dd className="text-fg">{credential.issuer}</dd>
          <dt className="font-mono text-[0.6875rem] leading-5 tracking-[0.12em] text-subtle uppercase">
            Issued
          </dt>
          <dd className="text-fg">
            <time dateTime={credential.issued}>{credential.issuedLabel}</time>
          </dd>
        </dl>
      </article>
    </li>
  );
}

export function CredentialsSection() {
  const years = Array.from(new Set(credentials.map(year)));

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="relative py-[var(--section-space)]"
    >
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="credentials-heading"
              index="03"
              eyebrow="Credentials"
              title="Credentials & professional development"
              description="Assessments, program certificates, and job simulations that support my data and AI work. These are certificates, not academic degrees."
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          {years.map((group) => (
            <div key={group} className="cred-group">
              <p className="cred-year" data-reveal="fade">
                <time dateTime={group}>{group}</time>
              </p>
              <ol className="cred-list">
                {credentials
                  .filter((credential) => year(credential) === group)
                  .map((credential, index) => (
                    <CredentialCard key={credential.slug} credential={credential} index={index} />
                  ))}
              </ol>
            </div>
          ))}

          {historicalCredentials.length > 0 ? (
            <div className="cred-group cred-group-earlier" data-reveal="">
              <h3 className="cred-year">Earlier credentials</h3>
              <ul className="cred-list">
                {historicalCredentials.map((credential) => (
                  <li key={credential.slug} className="cred-item cred-item-muted">
                    <span aria-hidden="true" className="cred-node" />
                    <div className="grid gap-x-8 gap-y-1 py-1 text-sm md:grid-cols-[1fr_auto] md:items-baseline">
                      <div>
                        <p className="font-medium text-fg">{credential.title}</p>
                        <p className="mt-1 text-muted">
                          {credential.type}
                          {credential.detail ? ` · ${credential.detail}` : null}
                        </p>
                      </div>
                      <p className="text-muted md:text-right">
                        {credential.issuer} ·{" "}
                        <time dateTime={credential.issued}>{credential.issuedLabel}</time>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
