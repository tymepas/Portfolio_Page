import Link from "next/link";
import { CommandPalette } from "@/components/command-palette";
import { Container } from "@/components/container";
import { HeaderShell } from "@/components/header-shell";
import { MobileNav } from "@/components/mobile-nav";
import { PrimaryNav } from "@/components/primary-nav";
import { getPaletteCommands } from "@/content/commands";
import { contactLinks, githubUrl, navItems, site } from "@/content/site";

/** Three connected nodes: the system-map motif at its smallest. */
function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-mark" fill="none">
      <path d="M6 17.5 12 6.5l6 11H6Z" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.25" />
      <circle cx="12" cy="6.5" r="2.5" fill="var(--violet)" />
      <circle cx="6" cy="17.5" r="2.5" fill="var(--teal)" />
      <circle cx="18" cy="17.5" r="2.5" fill="var(--fg)" />
    </svg>
  );
}

export function SiteHeader() {
  const email = contactLinks.find((link) => link.label === "Email");

  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="brand">
          <BrandMark />
          <span>{site.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          <PrimaryNav items={navItems} githubUrl={githubUrl} />
          {/* The trigger shows from md up; the shortcut and dialog work at every width. */}
          <CommandPalette commands={getPaletteCommands()} />
          <MobileNav
            items={navItems}
            githubUrl={githubUrl}
            email={{ href: email?.href ?? "", display: email?.display ?? "" }}
          />
        </div>
      </Container>
    </HeaderShell>
  );
}
