"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Scenario = {
  id: string;
  label: string;
  outcome: string;
};

/**
 * Follows one route through the swimlane rendered inside it. Steps whose
 * `data-paths` leave out the chosen scenario are marked off-path, so the
 * diagram emphasises only the steps that run. Every step stays readable: the
 * picker adds emphasis, not content, and without JavaScript the full diagram
 * shows with the first scenario's outcome.
 */
export function TicketScenarios({
  scenarios,
  children,
}: {
  scenarios: Scenario[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(scenarios[0]?.id ?? "");
  const rootRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    const steps = rootRef.current?.querySelectorAll<HTMLElement>("[data-paths]") ?? [];
    for (const step of steps) {
      const paths = (step.dataset.paths ?? "").split(" ");
      step.dataset.offPath = paths.includes(active) ? "false" : "true";
    }
  }, [active]);

  return (
    <div ref={rootRef} className="scenarios">
      <div className="scenario-bar">
        <fieldset className="scenario-picker">
          <legend className="diagram-label">Follow a scenario</legend>
          <div className="scenario-options">
            {scenarios.map((scenario) => (
              <label key={scenario.id} className="scenario-option">
                <input
                  type="radio"
                  name={`${baseId}-scenario`}
                  value={scenario.id}
                  checked={active === scenario.id}
                  onChange={() => setActive(scenario.id)}
                  aria-describedby={`${baseId}-${scenario.id}`}
                />
                <span>{scenario.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="scenario-outcome">
          <p className="diagram-label">Outcome</p>
          {scenarios.map((scenario) => (
            <p key={scenario.id} id={`${baseId}-${scenario.id}`} hidden={scenario.id !== active}>
              {scenario.outcome}
            </p>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
