"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import type { VerdictRating } from "@/content/case-studies/verdict";
import { computeVerdict, type VerdictRule } from "@/lib/verdict-score";

type Preset = {
  id: string;
  label: string;
  description: string;
  ratings: Record<string, VerdictRating>;
};

type RuleExplorerProps = VerdictRule & {
  presets: Preset[];
  /** A link to the code this mirrors. */
  source: ReactNode;
};

const RATINGS: VerdictRating[] = ["Excellent", "Good", "Fair", "Poor", "Unable to Evaluate"];

// Ratings score 2 to 5, so every weighted score lands in this range.
const SCALE_MIN = 2;
const SCALE_MAX = 5;

/** A band's score range. Scores are rounded to one decimal place first. */
function rangeText(from: number, to: number) {
  if (from <= SCALE_MIN) return `Below ${to.toFixed(1)}`;
  if (to >= SCALE_MAX) return `${from.toFixed(1)} and above`;
  return `${from.toFixed(1)} to ${(to - 0.1).toFixed(1)}`;
}

/** Lets a reader run Verdict's scoring rule on ratings they choose. No model is involved. */
export function RuleExplorer(props: RuleExplorerProps) {
  const { dimensions, presets, thresholds, source } = props;
  const baseId = useId();
  const allGood = Object.fromEntries(
    dimensions.map((dimension) => [dimension.key, "Good" as VerdictRating]),
  );
  const [ratings, setRatings] = useState<Record<string, VerdictRating>>(allGood);
  const [preset, setPreset] = useState<string | null>(null);

  const result = computeVerdict(ratings, props);

  // Bands between thresholds, lowest first, clipped to the possible range.
  const bands = thresholds
    .map((threshold, index) => ({
      verdict: threshold.verdict,
      from: Math.max(threshold.min, SCALE_MIN),
      to: index === 0 ? SCALE_MAX : thresholds[index - 1].min,
    }))
    .reverse();
  const position = result.scored ? (result.score - SCALE_MIN) / (SCALE_MAX - SCALE_MIN) : 0;
  const ticks = [SCALE_MIN, ...bands.slice(1).map((band) => band.from), SCALE_MAX];

  function choose(key: string, rating: VerdictRating) {
    setRatings((current) => ({ ...current, [key]: rating }));
    setPreset(null);
  }

  return (
    <div className="rule">
      <div className="rule-inputs">
        <div className="rule-presets" role="group" aria-label="Load ratings">
          {presets.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={preset === item.id}
              onClick={() => {
                setRatings({ ...item.ratings });
                setPreset(item.id);
              }}
              className="rule-preset"
            >
              <span className="font-medium text-fg">{item.label}</span>
              <span className="text-subtle">{item.description}</span>
            </button>
          ))}
          <button
            type="button"
            aria-pressed={preset === "all-good"}
            onClick={() => {
              setRatings(allGood);
              setPreset("all-good");
            }}
            className="rule-preset"
          >
            <span className="font-medium text-fg">Reset</span>
            <span className="text-subtle">Every dimension Good</span>
          </button>
        </div>

        {dimensions.map((dimension) => (
          <fieldset key={dimension.key} className="rule-row" data-scored={dimension.weight !== null}>
            <legend className="rule-legend">
              <span>
                <span className="text-fg">{dimension.label}</span>
                <span className="rule-weight">
                  {dimension.weight === null
                    ? "Shown, not scored"
                    : `${Math.round(dimension.weight * 100)}% weight`}
                </span>
              </span>
            </legend>
            <div className="rule-options">
              {RATINGS.map((rating) => (
                <label key={rating} className="rule-option">
                  <input
                    type="radio"
                    name={`${baseId}-${dimension.key}`}
                    value={rating}
                    checked={ratings[dimension.key] === rating}
                    onChange={() => choose(dimension.key, rating)}
                  />
                  <span>
                    {rating === "Unable to Evaluate" ? (
                      <>
                        Unable<span className="sr-only"> to evaluate</span>
                      </>
                    ) : (
                      rating
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <p className="rule-points">
          Points: Excellent 5, Good 4, Fair 3, Poor 2. “Unable to evaluate” is left out, and the
          remaining weights are rescaled.
        </p>
      </div>

      <div className="rule-output">
        <p className="diagram-label">Weighted score</p>
        <p className="rule-score" aria-hidden="true">
          {result.scored ? result.score.toFixed(1) : "–"}
        </p>
        <p className="rule-verdict" aria-hidden="true">
          {result.verdict}
        </p>
        <p className="sr-only" aria-live="polite">
          {result.scored
            ? `Score ${result.score.toFixed(1)}. Verdict: ${result.verdict}.`
            : `No scored dimension could be evaluated. Verdict: ${result.verdict}.`}
        </p>

        <div className="rule-scale" aria-hidden="true">
          <div className="rule-bands">
            {bands.map((band) => (
              <span
                key={band.verdict}
                data-active={result.scored && band.verdict === result.verdict}
                style={{ flexGrow: band.to - band.from } as CSSProperties}
              />
            ))}
          </div>
          {result.scored ? (
            <span className="rule-marker" style={{ "--at": position } as CSSProperties} />
          ) : null}
          <div className="rule-ticks">
            {ticks.map((tick) => (
              <span
                key={tick}
                style={{ "--at": (tick - SCALE_MIN) / (SCALE_MAX - SCALE_MIN) } as CSSProperties}
              >
                {tick.toFixed(1)}
              </span>
            ))}
          </div>
        </div>
        <ol className="rule-thresholds" aria-label="Thresholds">
          {[...bands].reverse().map((band) => (
            <li key={band.verdict} data-active={result.verdict === band.verdict}>
              <span className="rule-range">{rangeText(band.from, band.to)}</span>
              {band.verdict}
            </li>
          ))}
        </ol>

        <div className="rule-working">
          <p className="diagram-label">Working</p>
          {result.scored ? (
            <p>
              ({result.terms.join(" + ")}) ÷ {result.weightTotal.toFixed(2)} ={" "}
              {result.raw.toFixed(2)}, rounded to <strong>{result.score.toFixed(1)}</strong>
            </p>
          ) : (
            <p>
              No scored dimension could be evaluated, so the code returns{" "}
              <strong>{result.verdict}</strong> with a score of 0.
            </p>
          )}
        </div>
        <div className="mt-5">{source}</div>
      </div>
    </div>
  );
}
