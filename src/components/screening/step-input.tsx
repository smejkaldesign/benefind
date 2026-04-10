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
}

export function StepInput({
  step,
  onSubmit,
  disabled,
  isSecondary,
}: StepInputProps) {
  const [value, setValue] = useState("");
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
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
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
          className={`block h-11 w-full rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 focus:outline-none disabled:opacity-50 ${
            isMoney ? "pl-7 pr-14" : "pl-4 pr-14"
          }`}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white transition-all hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      {error && (
        <p className="px-2 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
