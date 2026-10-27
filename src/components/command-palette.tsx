"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useEffectEvent,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { PaletteCommand } from "@/content/commands";
import { focusSection } from "@/lib/focus-section";

const subscribeNever = () => () => {};
const isApplePlatform = () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
const notApplePlatform = () => false;

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none">
      <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.5 10.5 3.25 3.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Quick navigation, opened with Ctrl+K / Cmd+K or the header button. A modal
 * <dialog> keeps focus inside and closes on Escape; the input drives a listbox
 * with arrow keys, and focus returns to where it was when the palette closes.
 */
export function CommandPalette({ commands }: { commands: PaletteCommand[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const apple = useSyncExternalStore(subscribeNever, isApplePlatform, notApplePlatform);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const titleId = `${baseId}-title`;

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return commands;
    return commands.filter((command) => {
      const text = `${command.label} ${command.hint ?? ""} ${command.group}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [commands, query]);

  const groups = useMemo(() => {
    const byGroup = new Map<string, { command: PaletteCommand; index: number }[]>();
    results.forEach((command, index) => {
      const entries = byGroup.get(command.group) ?? [];
      entries.push({ command, index });
      byGroup.set(command.group, entries);
    });
    return Array.from(byGroup, ([name, entries]) => ({ name, entries }));
  }, [results]);

  const current = results.length > 0 ? Math.min(activeIndex, results.length - 1) : -1;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  function openPalette() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActiveIndex(0);
    dialog.showModal();
    inputRef.current?.focus();
  }

  function closePalette() {
    dialogRef.current?.close();
  }

  const onShortcut = useEffectEvent((event: KeyboardEvent) => {
    if (event.key.toLowerCase() !== "k" || !(event.ctrlKey || event.metaKey)) return;
    if (event.altKey || event.shiftKey) return;
    event.preventDefault();
    if (dialogRef.current?.open) closePalette();
    else openPalette();
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => onShortcut(event);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  // Keep the active option in view while moving through a long list.
  useEffect(() => {
    if (current < 0) return;
    document.getElementById(`${baseId}-option-${current}`)?.scrollIntoView({ block: "nearest" });
  }, [baseId, current]);

  function run(command: PaletteCommand) {
    // Returning focus first means a section destination can take it over afterwards.
    closePalette();
    if (command.external) {
      window.open(command.href, "_blank", "noopener,noreferrer");
    } else if (command.href.startsWith("mailto:")) {
      window.location.href = command.href;
    } else {
      router.push(command.href);
      focusSection(command.href);
    }
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[current]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        className="palette-trigger"
      >
        <SearchIcon className="size-3.5" />
        <span className="sr-only">Open quick navigation</span>
        <kbd aria-hidden="true">{apple ? "⌘" : "Ctrl"} K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="palette"
        onClose={() => {
          // Browsers restore focus when a modal dialog closes; this covers those that don't,
          // without taking focus back from a section the palette just navigated to.
          const target = returnFocusRef.current;
          returnFocusRef.current = null;
          const focused = document.activeElement;
          const focusLost =
            focused === null || focused === document.body || dialogRef.current?.contains(focused);
          if (target?.isConnected && focusLost) target.focus();
        }}
        onClick={(event) => {
          // A click on the dialog element itself lands on the backdrop.
          if (event.target === event.currentTarget) closePalette();
        }}
      >
        <div className="palette-panel">
          <h2 id={titleId} className="sr-only">
            Quick navigation
          </h2>
          <div className="palette-search">
            <SearchIcon className="size-4 shrink-0 text-subtle" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={current >= 0 ? optionId(current) : undefined}
              aria-label="Search sections, projects, and links"
              placeholder="Jump to a section, project, or link"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onInputKeyDown}
            />
            <button type="button" onClick={closePalette} className="palette-esc">
              Esc
              <span className="sr-only"> (close quick navigation)</span>
            </button>
          </div>

          <div id={listId} role="listbox" aria-label="Results" className="palette-list">
            {groups.map((group) => (
              <div key={group.name} role="group" aria-labelledby={`${listId}-${group.name}`}>
                <div id={`${listId}-${group.name}`} role="presentation" className="palette-group">
                  {group.name}
                </div>
                {group.entries.map(({ command, index }) => (
                  <div
                    key={command.id}
                    id={optionId(index)}
                    role="option"
                    aria-selected={index === current}
                    onPointerMove={() => {
                      if (index !== current) setActiveIndex(index);
                    }}
                    onClick={() => run(command)}
                    className="palette-option"
                  >
                    <span className="truncate">{command.label}</span>
                    {command.hint ? (
                      <span className="palette-hint truncate">{command.hint}</span>
                    ) : null}
                    <span aria-hidden="true" className="palette-go">
                      {command.external ? "↗" : "→"}
                    </span>
                    {command.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </div>
                ))}
              </div>
            ))}
            {results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted">
                No matches for &ldquo;{query}&rdquo;.
              </p>
            ) : null}
          </div>

          <p className="sr-only" aria-live="polite">
            {results.length === 1 ? "1 result" : `${results.length} results`}
          </p>
          <div className="palette-footer" aria-hidden="true">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> move
            </span>
            <span>
              <kbd>Enter</kbd> open
            </span>
            <span>
              <kbd>Esc</kbd> close
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
