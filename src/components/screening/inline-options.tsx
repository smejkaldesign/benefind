"use client";

import { useState } from "react";
import type { ScreeningStep } from "@/lib/screening/steps";
import { US_STATES } from "@/lib/screening/us-states";

interface InlineOptionsProps {
  step: ScreeningStep;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export function hasInlineOptions(step: ScreeningStep): boolean {
  return (
    step.type === "select" ||
    step.type === "multi-select" ||
    step.type === "state"
  );
}

export function InlineOptions({
  step,
  onSubmit,
  disabled,
}: InlineOptionsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [stateValue, setStateValue] = useState("");

  if (step.type === "select") {
    return (
      <div className="flex flex-wrap gap-2 pt-1 pl-1">
        {step.options?.map((opt, i) => (
          <button
            key={`${opt.value}-${i}`}
            onClick={() => {
              if (!disabled) onSubmit(opt.value);
            }}
            disabled={disabled}
            className="rounded-lg border border-border bg-surface-bright px-4 py-2 text-sm font-semibold text-text-muted transition-all hover:border-brand hover:bg-brand/10 hover:text-brand active:scale-95 disabled:opacity-40"
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === "multi-select") {
    return (
      <div className="space-y-3 pt-1 pl-1">
        <div className="flex flex-wrap gap-2">
          {step.options?.map((opt, i) => {
            const isSelected = selected.includes(opt.value);
            const isNone = opt.value === "none";
            return (
              <button
                key={`${opt.value}-${i}`}
                onClick={() => {
                  if (disabled) return;
                  if (isNone) {
                    setSelected(["none"]);
                  } else {
                    setSelected((prev) => {
                      const without = prev.filter((v) => v !== "none");
                      return isSelected
                        ? without.filter((v) => v !== opt.value)
                        : [...without, opt.value];
                    });
                  }
                }}
                disabled={disabled}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all active:scale-95 disabled:opacity-40 ${
                  isSelected
                    ? "border-brand bg-brand/15 text-brand"
                    : "border-border bg-surface-bright text-text-muted hover:border-brand hover:bg-brand/10 hover:text-brand"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <button
            onClick={() => {
              if (!disabled) onSubmit(selected.join(","));
            }}
            disabled={disabled}
            className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-surface transition-all hover:bg-brand-dark active:scale-95 disabled:opacity-40"
          >
            Continue &rarr;
          </button>
        )}
      </div>
    );
  }

  if (step.type === "state") {
    return (
      <div className="flex items-center gap-2 pt-1 pl-1">
        <select
          value={stateValue}
          onChange={(e) => setStateValue(e.target.value)}
          disabled={disabled}
          className="h-10 rounded-lg border border-border bg-surface-bright px-4 text-sm font-semibold text-text focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:opacity-40"
        >
          <option value="">Select your state...</option>
          {US_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {stateValue && (
          <button
            onClick={() => {
              if (!disabled) onSubmit(stateValue);
            }}
            disabled={disabled}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-surface transition-all hover:bg-brand-dark active:scale-95 disabled:opacity-40"
          >
            Continue &rarr;
          </button>
        )}
      </div>
    );
  }

  return null;
}
