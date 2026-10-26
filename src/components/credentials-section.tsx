import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { credentials, historicalCredentials, type Credential } from "@/content/credentials";

function CredentialCard({ credential }: { credential: Credential }) {
  const headingId = `credential-${credential.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7"
    >
      <div className="flex-1 pb-6">
        <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
          {credential.type}
        </p>
        <h3
          id={headingId}
          className="mt-4 font-display text-2xl leading-snug tracking-tight text-ink"
        >
          {credential.title}
        </h3>
        {credential.detail ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{credential.detail}</p>
        ) : null}
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-line pt-5 text-sm">
        <dt className="text-subtle">Issuer</dt>
        <dd className="text-ink">{credential.issuer}</dd>
        <dt className="text-subtle">Issued</dt>
        <dd className="text-ink">
          <time dateTime={credential.issued}>{credential.issuedLabel}</time>
        </dd>
      </dl>
    </article>
  );
}

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="border-t border-line pt-16 pb-20 sm:pt-20 sm:pb-28"
    >
      <Container>
        <SectionHeading
          id="credentials-heading"
          eyebrow="Credentials"
          title="Credentials & professional development"
          description="Assessments, program certificates, and job simulations that support my data and AI work. These are certificates, not academic degrees."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential) => (
            <li key={credential.slug}>
              <CredentialCard credential={credential} />
            </li>
          ))}
        </ul>

        {historicalCredentials.length > 0 ? (
          <div className="mt-10 border-t border-line pt-8">
            <h3 className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">
              Earlier credentials
            </h3>
            <ul className="mt-4 divide-y divide-line">
              {historicalCredentials.map((credential) => (
                <li
                  key={credential.slug}
                  className="grid gap-x-8 gap-y-1 py-4 text-sm md:grid-cols-[1fr_auto] md:items-baseline"
                >
                  <div>
                    <p className="font-medium text-ink">{credential.title}</p>
                    <p className="mt-1 text-muted">
                      {credential.type}
                      {credential.detail ? ` · ${credential.detail}` : null}
                    </p>
                  </div>
                  <p className="text-muted md:text-right">
                    {credential.issuer} ·{" "}
                    <time dateTime={credential.issued}>{credential.issuedLabel}</time>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
