type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">{eyebrow}</p>
      <h2
        id={id}
        className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
