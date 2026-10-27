"use client";

import { useEffect, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const labels: Record<CopyState, string> = {
  idle: "Copy address",
  copied: "Copied",
  failed: "Copy unavailable",
};

const announcements: Record<CopyState, string> = {
  idle: "",
  copied: "Email address copied to the clipboard.",
  failed: "Copying is not available here. Select the address to copy it instead.",
};

/** Copies the address with the Clipboard API and reports what actually happened. */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <>
      <button type="button" onClick={copy} className="copy-button" data-state={state}>
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none">
          {state === "copied" ? (
            <path
              d="m3.5 8.5 3 3 6-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <>
              <rect x="5" y="5" width="8" height="8" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
              <path d="M11 3.5V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" stroke="currentColor" strokeWidth="1.4" />
            </>
          )}
        </svg>
        <span>{labels[state]}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {announcements[state]}
      </span>
    </>
  );
}
