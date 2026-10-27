"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { ReportPreview } from "@/content/projects";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Shows a static multi-page report one page at a time. The page list follows
 * the ARIA tabs pattern (arrow keys, Home, and End move between pages). Every
 * image stays rendered in the same cell, so changing pages crossfades without
 * waiting on the network.
 */
export function ReportViewer({ preview, label }: { preview: ReportPreview; label: string }) {
  const { pages, caption } = preview;
  const [selected, setSelected] = useState(preview.initialPage);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // Size the stage to the tallest page so no page is cropped.
  const ratio = pages.reduce(
    (tallest, page) => Math.min(tallest, page.width / page.height),
    Number.POSITIVE_INFINITY,
  );

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = pages.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <figure className="report-viewer">
      <div className="report-layout">
        <div role="tablist" aria-label={label} className="report-tabs">
          {pages.map((page, index) => (
            <button
              key={page.src}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={index === selected ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="report-tab"
            >
              <span aria-hidden="true" className="report-tab-index">
                {pad(index + 1)}
              </span>
              <span>{page.name}</span>
            </button>
          ))}
        </div>

        <div className="report-frame">
          <p className="shot-bar flex justify-between" aria-hidden="true">
            <span>Static page</span>
            <span>
              <span className="text-teal">{pad(selected + 1)}</span> / {pad(pages.length)}
            </span>
          </p>
          <div className="report-stage" style={{ aspectRatio: String(ratio) }}>
            {pages.map((page, index) => (
              <div
                key={page.src}
                id={`${baseId}-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${index}`}
                data-active={index === selected}
                className="report-page"
              >
                <Image
                  src={page.src}
                  width={page.width}
                  height={page.height}
                  alt={page.alt}
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="report-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="report-caption">
        {caption}{" "}
        {/* Whole pages are small on phones; the original image can be zoomed. */}
        <a
          href={pages[selected].src}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-muted underline decoration-line-bright underline-offset-4 transition-colors hover:text-teal-strong"
        >
          Open page {selected + 1} at full size
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> (image, opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
