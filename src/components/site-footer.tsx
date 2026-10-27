import { Container } from "@/components/container";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-3 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-muted">{site.name}</span> · {site.location}
        </p>
        <p className="font-mono text-[0.6875rem] tracking-[0.1em] uppercase">
          Built with Next.js, React, and Tailwind CSS
        </p>
        <a href="#main" className="transition-colors hover:text-fg">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </Container>
    </footer>
  );
}
