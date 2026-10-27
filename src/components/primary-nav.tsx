"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/site";

function sectionId(href: string) {
  return href.split("#")[1] ?? "";
}

/**
 * Desktop navigation. Highlights the section currently in view with an
 * indicator that slides between links. Navigation itself never depends on it.
 */
export function PrimaryNav({ items, githubUrl }: { items: NavItem[]; githubUrl: string }) {
  const [active, setActive] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  // The header outlives page changes, so the sections are looked up again on each route.
  const pathname = usePathname();

  // A section is "current" while it crosses a thin band just above mid-screen.
  useEffect(() => {
    const ids = items.map((item) => sectionId(item.href)).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const crossing = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }
        setActive(ids.find((id) => crossing.has(id)) ?? null);
      },
      { rootMargin: "-38% 0px -58% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [items, pathname]);

  useEffect(() => {
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    if (!track || !indicator) return;

    const place = () => {
      const link = active
        ? track.querySelector<HTMLElement>(`[data-section="${active}"]`)
        : null;
      if (!link) {
        indicator.dataset.visible = "false";
        return;
      }
      indicator.style.setProperty("--x", `${link.offsetLeft}px`);
      indicator.style.setProperty("--w", `${link.offsetWidth}px`);
      indicator.dataset.visible = "true";
    };

    place();
    const resize = new ResizeObserver(place);
    resize.observe(track);
    return () => resize.disconnect();
  }, [active]);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
      <div ref={trackRef} className="nav-track">
        <span ref={indicatorRef} aria-hidden="true" className="nav-indicator" data-visible="false" />
        <ul className="relative flex items-center">
          {items.map((item) => {
            const id = sectionId(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-section={id}
                  aria-current={active === id ? "true" : undefined}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="nav-external">
        GitHub
        <span aria-hidden="true">↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </nav>
  );
}
