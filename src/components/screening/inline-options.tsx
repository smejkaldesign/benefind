'use client';

import { useState } from 'react';
import type { ScreeningStep } from '@/lib/screening/steps';
import { US_STATES } from '@/lib/screening/us-states';

interface InlineOptionsProps {
  step: ScreeningStep;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export function hasInlineOptions(step: ScreeningStep): boolean {
  return step.type === 'select' || step.type === 'multi-select' || step.type === 'state';
}

export function InlineOptions({ step, onSubmit, disabled }: InlineOptionsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [stateValue, setStateValue] = useState('');

  if (step.type === 'select') {
    return (
      <div className="flex flex-wrap gap-2 pt-1 pl-1">
        {step.options?.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { if (!disabled) onSubmit(opt.value); }}
            disabled={disabled}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 active:scale-95 disabled:opacity-40"
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === 'multi-select') {
    return (
      <div className="space-y-3 pt-1 pl-1">
        <div className="flex flex-wrap gap-2">
          {step.options?.map((opt) => {
            const isSelected = selected.includes(opt.value);
            const isNone = opt.value === 'none';
            return (
              <button
                key={opt.value}
                onClick={() => {
                  if (disabled) return;
                  if (isNone) {
                    setSelected(['none']);
                  } else {
                    setSelected((prev) => {
                      const without = prev.filter((v) => v !== 'none');
                      return isSelected
                        ? without.filter((v) => v !== opt.value)
                        : [...without, opt.value];
                    });
                  }
                }}
                disabled={disabled}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95 disabled:opacity-40 ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <button
            onClick={() => { if (!disabled) onSubmit(selected.join(',')); }}
            disabled={disabled}
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-40"
          >
            Continue &rarr;
          </button>
        )}
      </div>
    );
  }

  if (step.type === 'state') {
    return (
      <div className="flex items-center gap-2 pt-1 pl-1">
        <select
          value={stateValue}
          onChange={(e) => setStateValue(e.target.value)}
          disabled={disabled}
          className="h-10 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none disabled:opacity-40"
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
            onClick={() => { if (!disabled) onSubmit(stateValue); }}
            disabled={disabled}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-40"
          >
            Continue &rarr;
          </button>
        )}
      </div>
    );
  }

  return null;
}
