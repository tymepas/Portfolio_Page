import { Fragment, type CSSProperties } from "react";
import type { HeadlineWord } from "@/content/site";

type KineticHeadlineProps = {
  id: string;
  words: HeadlineWord[];
  className?: string;
};

function Word({ word, index }: { word: HeadlineWord; index: number }) {
  return (
    <span className="kinetic-mask">
      <span
        className={word.tone === "accent" ? "kinetic-word kinetic-accent" : "kinetic-word"}
        style={{ "--w": index } as CSSProperties}
      >
        {word.text}
      </span>
    </span>
  );
}

/**
 * The hero headline. Each word rises out of its own mask in sequence, driven by
 * CSS so it plays on first paint, before any JavaScript loads. The animated
 * copy is hidden from assistive technology, which reads the plain sentence.
 */
export function KineticHeadline({ id, words, className = "" }: KineticHeadlineProps) {
  const sentence = words.map((word) => word.text).join(" ");
  const firstMark = words.findIndex((word) => word.tone === "mark");
  const lastMark = words.findLastIndex((word) => word.tone === "mark");

  const plain = (from: number, to: number) =>
    words.slice(from, to).map((word, offset) => (
      <Fragment key={from + offset}>
        {from + offset > 0 ? " " : null}
        <Word word={word} index={from + offset} />
      </Fragment>
    ));

  return (
    <h1 id={id} className={`kinetic ${className}`}>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden="true">
        {firstMark === -1 ? (
          plain(0, words.length)
        ) : (
          <>
            {plain(0, firstMark)}{" "}
            {/* One underline runs beneath the marked phrase, across line breaks. */}
            <span className="kinetic-mark" style={{ "--w": lastMark } as CSSProperties}>
              {words.slice(firstMark, lastMark + 1).map((word, offset) => (
                <Fragment key={firstMark + offset}>
                  {offset > 0 ? " " : null}
                  <Word word={word} index={firstMark + offset} />
                </Fragment>
              ))}
            </span>
            {plain(lastMark + 1, words.length)}
          </>
        )}
      </span>
    </h1>
  );
}
