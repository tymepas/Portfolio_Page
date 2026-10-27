"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The sticky header element. Marks the header once the page scrolls, which
 * gives it a surface, and drives the reading-progress line along its edge.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      headerRef.current?.toggleAttribute("data-scrolled", y > 12);
      progressRef.current?.style.setProperty(
        "transform",
        `scaleX(${scrollable > 0 ? Math.min(1, y / scrollable).toFixed(4) : 0})`,
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      {children}
      <span aria-hidden="true" className="scroll-progress">
        <span ref={progressRef} />
      </span>
    </header>
  );
}
