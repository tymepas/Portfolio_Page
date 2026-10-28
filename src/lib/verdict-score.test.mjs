// The Verdict scoring rule behind the rule explorer on /projects/verdict, run
// against the case study's own weights, thresholds, and samples. `npm test`
// runs it with Node's test runner, which loads the TypeScript sources directly.
import assert from "node:assert/strict";
import { test } from "node:test";
import { verdictCaseStudy } from "../content/case-studies/verdict.ts";
import { computeVerdict } from "./verdict-score.ts";

const { rule } = verdictCaseStudy;
const RATINGS = ["Excellent", "Good", "Fair", "Poor", "Unable to Evaluate"];
const allGood = Object.fromEntries(rule.dimensions.map((dimension) => [dimension.key, "Good"]));
const sample = (id) => rule.presets.find((preset) => preset.id === id).ratings;
const run = (ratings) => computeVerdict(ratings, rule);
const outcome = ({ score, verdict }) => ({ score, verdict });

test("Style consistency is shown but never changes the score or verdict", () => {
  assert.equal(rule.dimensions.find((dimension) => dimension.key === "style").weight, null);
  for (const rating of RATINGS) {
    assert.deepEqual(run({ ...allGood, style: rating }), run(allGood));
    assert.deepEqual(run({ ...sample("sample-b"), style: rating }), run(sample("sample-b")));
  }
});

test("every dimension Good scores 4.0, Recommended", () => {
  assert.deepEqual(outcome(run(allGood)), { score: 4, verdict: "Recommended" });
});

test("a lower scored rating recalculates the score and verdict", () => {
  assert.deepEqual(outcome(run({ ...allGood, occasion: "Poor" })), {
    score: 3.4,
    verdict: "Consider Alternatives",
  });
});

test("Unable to Evaluate leaves its weight out and rescales the rest", () => {
  const result = run({ ...allGood, occasion: "Poor", formality: "Unable to Evaluate" });
  // (0.30 × 2 + 0.20 × 4 + 0.15 × 4 + 0.10 × 4) ÷ 0.75 = 3.2
  assert.deepEqual(result.terms, ["0.30 × 2", "0.20 × 4", "0.15 × 4", "0.10 × 4"]);
  assert.ok(Math.abs(result.weightTotal - 0.75) < 1e-9);
  assert.deepEqual(outcome(result), { score: 3.2, verdict: "Consider Alternatives" });
});

test("repository samples A and B give the app's mock-mode verdicts", () => {
  // buildMockA and buildMockB in the app's analysisService.ts, scored by its computeVerdict.
  assert.deepEqual(outcome(run(sample("sample-a"))), { score: 4.7, verdict: "Highly Recommended" });
  assert.deepEqual(outcome(run(sample("sample-b"))), { score: 2.3, verdict: "Not Recommended" });
});

test("with no scored dimension, the fallback verdict and no score", () => {
  const none = Object.fromEntries(rule.dimensions.map((dimension) => [dimension.key, "Unable to Evaluate"]));
  assert.deepEqual(run(none), { scored: false, score: 0, verdict: "Consider Alternatives" });
});
