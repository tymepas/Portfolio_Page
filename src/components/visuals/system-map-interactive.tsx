"use client";

import { useEffect, useRef, type ReactNode } from "react";

const RADIUS = 170; // viewBox units within which the pointer lights nodes

/**
 * Pointer response for the server-rendered system map. Nodes and edges near
 * the pointer brighten (via a --p custom property from 0 to 1), the map drifts
 * slightly for depth, and a soft halo follows the cursor. It listens on the
 * nearest [data-map-area], so the whole hero can influence the map. Only on
 * devices with a fine pointer; touch screens get the ambient animation alone.
 */
export function SystemMapInteractive({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = root?.querySelector("svg");
    if (!root || !svg) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const area = root.closest<HTMLElement>("[data-map-area]") ?? root;

    const nodes = Array.from(svg.querySelectorAll<SVGElement>("[data-node]")).map((el) => ({
      el,
      id: el.dataset.node ?? "",
      x: Number(el.dataset.x),
      y: Number(el.dataset.y),
    }));
    const labels = new Map(
      Array.from(root.querySelectorAll<HTMLElement>("[data-label-for]")).map((el) => [
        el.dataset.labelFor ?? "",
        el,
      ]),
    );
    const edges = Array.from(svg.querySelectorAll<SVGElement>("[data-edge]")).map((el) => ({
      el,
      from: el.dataset.from ?? "",
      to: el.dataset.to ?? "",
    }));

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const apply = () => {
      frame = 0;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const point = new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse());

      const proximity = new Map<string, number>();
      for (const node of nodes) {
        const p = Math.max(0, 1 - Math.hypot(node.x - point.x, node.y - point.y) / RADIUS);
        proximity.set(node.id, p);
        node.el.style.setProperty("--p", p.toFixed(3));
        labels.get(node.id)?.style.setProperty("--p", p.toFixed(3));
      }
      for (const edge of edges) {
        const p = Math.max(proximity.get(edge.from) ?? 0, proximity.get(edge.to) ?? 0);
        edge.el.style.setProperty("--p", p.toFixed(3));
      }

      const rect = root.getBoundingClientRect();
      root.style.setProperty("--cx", `${(clientX - rect.left).toFixed(1)}px`);
      root.style.setProperty("--cy", `${(clientY - rect.top).toFixed(1)}px`);
      if (!reduceMotion) {
        const clamp = (value: number) => Math.max(-0.5, Math.min(0.5, value)).toFixed(3);
        root.style.setProperty("--px", clamp((clientX - rect.left) / rect.width - 0.5));
        root.style.setProperty("--py", clamp((clientY - rect.top) / rect.height - 0.5));
      }
      root.dataset.pointer = "in";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      for (const node of nodes) node.el.style.setProperty("--p", "0");
      for (const label of labels.values()) label.style.setProperty("--p", "0");
      for (const edge of edges) edge.el.style.setProperty("--p", "0");
      root.style.setProperty("--px", "0");
      root.style.setProperty("--py", "0");
      delete root.dataset.pointer;
    };

    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  return (
    <div ref={rootRef} data-loop="" className={className}>
      {children}
    </div>
  );
}
