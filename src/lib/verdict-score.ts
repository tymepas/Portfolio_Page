import type { VerdictDimension, VerdictRating } from "@/content/case-studies/verdict";

export type Threshold = { min: number; verdict: string };

export type VerdictRule = {
  dimensions: VerdictDimension[];
  points: Record<string, number>;
  /** Highest first; the first one the score reaches wins. */
  thresholds: Threshold[];
  fallbackVerdict: string;
};

/**
 * The same arithmetic as computeVerdict in Verdict's analysisService.ts, in
 * the same order, so it rounds identically: a weighted mean of the scored
 * ratings, skipping "Unable to Evaluate", rounded to one decimal place.
 */
export function computeVerdict(
  ratings: Record<string, VerdictRating>,
  { dimensions, points, thresholds, fallbackVerdict }: VerdictRule,
) {
  let weightedSum = 0;
  let weightTotal = 0;
  const terms: string[] = [];

  for (const dimension of dimensions) {
    const rating = ratings[dimension.key];
    if (dimension.weight === null || rating === "Unable to Evaluate") continue;
    weightedSum += points[rating] * dimension.weight;
    weightTotal += dimension.weight;
    terms.push(`${dimension.weight.toFixed(2)} × ${points[rating]}`);
  }

  if (weightTotal === 0) {
    return { scored: false as const, score: 0, verdict: fallbackVerdict };
  }

  const raw = weightedSum / weightTotal;
  const score = Math.round(raw * 10) / 10;
  const verdict = thresholds.find((threshold) => score >= threshold.min)?.verdict ?? fallbackVerdict;
  return { scored: true as const, score, raw, verdict, terms, weightTotal };
}
