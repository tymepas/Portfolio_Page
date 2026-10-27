"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { NavItem } from "@/content/site";

type MobileNavProps = {
  items: NavItem[];
  githubUrl: string;
  email: { href: string; display: string };
};

export function MobileNav({ items, githubUrl, email }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Cache Components keeps hidden routes mounted; reset this transient menu when hidden.
  useLayoutEffect(() => {
    return () => setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }

    // Close when the viewport grows past the breakpoint where the desktop nav takes over.
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="menu-button"
      >
        Menu
        <span aria-hidden="true" className="menu-icon" data-open={open} />
      </button>

      <nav ref={panelRef} id={menuId} aria-label="Primary" hidden={!open} className="mobile-panel">
        <ul className="px-[var(--gutter)] pt-3 pb-2">
          {items.map((item, index) => (
            <li key={item.href} className="mobile-item" style={{ "--i": index } as CSSProperties}>
              <Link href={item.href} onClick={() => setOpen(false)} className="mobile-link">
                <span aria-hidden="true" className="font-mono text-label text-teal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line px-[var(--gutter)] py-5 text-sm">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1 text-fg"
          >
            GitHub
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href={email.href} onClick={() => setOpen(false)} className="text-muted">
            {email.display}
          </a>
        </div>
      </nav>
    </div>
  );
}
