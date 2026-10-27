"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { focusSection } from "@/lib/focus-section";

const pageKey = () => window.location.pathname + window.location.search;

/**
 * Progressive enhancement for server-rendered markup. Server Components opt in
 * through data attributes, so sections ship no JavaScript of their own:
 *
 * - `data-reveal`: fades and lifts the element in the first time it scrolls into
 *   view. Anything already on screen after hydration is left untouched, so
 *   content is never hidden before or without JavaScript.
 * - `data-loop`: decorative loops inside pause while the element is off screen.
 * - `data-spotlight`: exposes the pointer position as `--mx`/`--my` (px) and
 *   `--tx`/`--ty` (-0.5 to 0.5) for hover lighting and tilt.
 *
 * It also moves focus to the destination of in-page links, including links
 * from another page to a section, and returns the window to where each page
 * was left on back and forward navigation.
 */
export function InteractionLayer() {
  const pathname = usePathname();
  const scrollPositions = useRef(new Map<string, number>());
  const currentPage = useRef<string | null>(null);
  const traversing = useRef(false);

  // Remember each page's scroll position. Hidden routes keep their DOM, but the
  // window's scroll offset otherwise carries over from the page being left.
  useEffect(() => {
    let frame = 0;
    const save = () => {
      frame = 0;
      if (!traversing.current) scrollPositions.current.set(pageKey(), window.scrollY);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(save);
    };
    // A hash-only step, such as back from an in-page link, stays on the page.
    const onPopState = () => {
      traversing.current = pageKey() !== currentPage.current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Back or forward to another page: restore that page's position before the
  // reveal scan below measures what is on screen.
  useEffect(() => {
    const restore = traversing.current;
    traversing.current = false;
    currentPage.current = pageKey();
    const top = scrollPositions.current.get(currentPage.current);
    if (restore && top !== undefined) window.scrollTo({ top, behavior: "instant" });
  }, [pathname]);

  // Scroll reveals. Re-scanned when the route changes.
  useEffect(() => {
    const pending = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ).filter((el) => {
      const state = el.dataset.revealState;
      return state !== "visible" && state !== "shown";
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      for (const el of pending) el.dataset.revealState = "visible";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealState = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const fold = window.innerHeight * 0.88;
    for (const el of pending) {
      if (el.getBoundingClientRect().top < fold) {
        el.dataset.revealState = "visible";
      } else {
        el.dataset.revealState = "hidden";
        observer.observe(el);
      }
    }

    // Content near the very end of the page may never cross the reveal line,
    // so reaching the bottom shows anything still waiting.
    const revealRemaining = () => {
      const { scrollHeight } = document.documentElement;
      if (window.scrollY + window.innerHeight < scrollHeight - 4) return;
      for (const el of document.querySelectorAll<HTMLElement>('[data-reveal-state="hidden"]')) {
        el.dataset.revealState = "shown";
        observer.unobserve(el);
      }
    };
    window.addEventListener("scroll", revealRemaining, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealRemaining);
    };
  }, [pathname]);

  // Pause decorative loops while they are off screen.
  useEffect(() => {
    const loops = document.querySelectorAll<HTMLElement>("[data-loop]");
    if (loops.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.inview = entry.isIntersecting ? "true" : "false";
      }
    });
    loops.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Pointer lighting and tilt, delegated from one listener.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;

    const release = (el: HTMLElement) => {
      delete el.dataset.pointer;
      el.style.setProperty("--tx", "0");
      el.style.setProperty("--ty", "0");
    };

    const update = () => {
      frame = 0;
      if (!active) return;
      const rect = active.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      active.style.setProperty("--mx", `${px.toFixed(1)}px`);
      active.style.setProperty("--my", `${py.toFixed(1)}px`);
      active.style.setProperty("--tx", (px / rect.width - 0.5).toFixed(3));
      active.style.setProperty("--ty", (py / rect.height - 0.5).toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-spotlight]")
          : null;
      if (target !== active) {
        if (active) release(active);
        active = target;
        if (active) active.dataset.pointer = "in";
      }
      if (!active) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onLeave = () => {
      if (active) release(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      onLeave();
    };
  }, []);

  // Arriving from another page at a section (a case study's link to /#work, say):
  // focus follows the scroll there, as it does for same-page links below.
  useEffect(() => {
    if (window.location.hash) focusSection(window.location.hash);
  }, [pathname]);

  // Same-page links: follow the scroll with focus.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link =
        event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      if (url.hash) focusSection(url.hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
