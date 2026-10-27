import type { CSSProperties } from "react";

type SectionHeadingProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="section-index" data-reveal="fade">
        <span className="text-teal">{index}</span>
        <span>{eyebrow}</span>
        <span aria-hidden="true" className="section-rule" data-reveal="line" />
      </p>
      <h2
        id={id}
        data-reveal=""
        style={{ "--reveal-delay": "80ms" } as CSSProperties}
        className="mt-6 max-w-4xl font-display text-display font-semibold text-balance-safe text-fg"
      >
        {title}
      </h2>
      {description ? (
        <p
          data-reveal=""
          style={{ "--reveal-delay": "160ms" } as CSSProperties}
          className="mt-6 max-w-2xl text-lede text-muted"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
