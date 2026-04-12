"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import type { ScreeningStep } from "@/lib/screening/steps";

interface StepInputProps {
  step: ScreeningStep;
  onSubmit: (value: string) => void;
  disabled?: boolean;
  /** When true, shows "Or type your answer..." placeholder (inline options are primary) */
  isSecondary?: boolean;
  /** Pre-filled value from a previous screening */
  defaultValue?: string;
}

export function StepInput({
  step,
  onSubmit,
  disabled,
  isSecondary,
  defaultValue,
}: StepInputProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);

  const isNumber = step.type === "number";
  const isMoney = isNumber && step.id !== "householdSize";
  const placeholder = isSecondary
    ? "Or type your answer..."
    : isMoney
      ? "0"
      : "Type your answer...";

  function handleSubmit() {
    if (disabled || !value.trim()) return;

    if (step.validation) {
      const err = step.validation(value.trim());
      if (err) {
        setError(err);
        return;
      }
    }

    setError(null);
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className="space-y-1">
      <div className="relative">
        {isMoney && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-subtle">
            $
          </span>
        )}
        <input
          type={isNumber ? "number" : "text"}
          inputMode={isNumber ? "numeric" : "text"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={step.question}
          className={`block h-11 w-full rounded-lg border border-border bg-surface-bright text-sm text-text transition-colors placeholder:text-text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:opacity-50 ${
            isMoney ? "pl-7 pr-14" : "pl-4 pr-14"
          }`}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-surface transition-all hover:bg-brand-dark disabled:bg-surface-bright disabled:text-text-subtle"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      {error && (
        <p className="px-2 text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
