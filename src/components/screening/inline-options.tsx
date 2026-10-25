"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { ScreeningStep } from "@/lib/screening/steps";
import { US_STATES } from "@/lib/screening/us-states";

interface InlineOptionsProps {
  step: ScreeningStep;
  onSubmit: (value: string) => void;
  disabled?: boolean;
  /** Pre-filled value from a previous screening */
  defaultValue?: string;
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
  defaultValue,
}: InlineOptionsProps) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<string[]>(
    defaultValue && step.type === "multi-select"
      ? defaultValue.split(",").filter(Boolean)
      : [],
  );
  const [stateValue, setStateValue] = useState(
    defaultValue && step.type === "state" ? defaultValue : "",
  );
  const continueRef = useRef<HTMLButtonElement>(null);
  const hasSelection = selected.length > 0;

  // The Continue button appears below the options after the first pick and
  // would otherwise sit under the sticky answer bar until the next message.
  useEffect(() => {
    if (hasSelection) {
      continueRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [hasSelection]);

  if (step.type === "select") {
    return (
      <div className="flex flex-wrap gap-2 pt-1 ps-1">
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
      <div className="space-y-3 pt-1 ps-1">
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
        {hasSelection && (
          <button
            ref={continueRef}
            onClick={() => {
              if (!disabled) onSubmit(selected.join(","));
            }}
            disabled={disabled}
            className="scroll-mb-28 inline-flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-stone-900 transition-all hover:bg-brand-dark active:scale-95 disabled:opacity-40"
          >
            {t.screeningFlow.input.continue}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rtl:-scale-x-100"
            />
          </button>
        )}
      </div>
    );
  }

  if (step.type === "state") {
    return (
      <div className="flex items-center gap-2 pt-1 ps-1">
        <div className="relative">
          <select
            value={stateValue}
            onChange={(e) => setStateValue(e.target.value)}
            disabled={disabled}
            className="h-10 appearance-none rounded-lg border border-border bg-surface-bright pe-10 ps-4 text-sm font-semibold text-text focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:opacity-40"
          >
            <option value="">{t.screeningFlow.input.selectState}</option>
            {US_STATES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 end-3 h-4 w-4 -translate-y-1/2 text-text-muted"
          />
        </div>
        {stateValue && (
          <button
            onClick={() => {
              if (!disabled) onSubmit(stateValue);
            }}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-stone-900 transition-all hover:bg-brand-dark active:scale-95 disabled:opacity-40"
          >
            {t.screeningFlow.input.continue}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rtl:-scale-x-100"
            />
          </button>
        )}
      </div>
    );
  }

  return null;
}
