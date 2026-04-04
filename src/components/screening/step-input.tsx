'use client';

import { useState } from 'react';
import type { ScreeningStep } from '@/lib/screening/steps';
import { US_STATES } from '@/lib/screening/us-states';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface StepInputProps {
  step: ScreeningStep;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export function StepInput({ step, onSubmit, disabled }: StepInputProps) {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (disabled) return;

    let submitValue = value;

    if (step.type === 'multi-select') {
      submitValue = selected.join(',');
    }

    if (step.required && !submitValue.trim()) {
      setError('Please provide an answer');
      return;
    }

    if (step.validation) {
      const err = step.validation(submitValue);
      if (err) {
        setError(err);
        return;
      }
    }

    setError(null);
    onSubmit(submitValue);
    setValue('');
    setSelected([]);
  }

  if (step.type === 'select') {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {step.options?.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                if (!disabled) onSubmit(opt.value);
              }}
              disabled={disabled}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-brand hover:bg-brand/5 disabled:opacity-50"
            >
              {opt.label}
            </button>
          ))}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }

  if (step.type === 'multi-select') {
    return (
      <div className="space-y-3">
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
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  isSelected
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-border bg-surface text-text hover:border-brand hover:bg-brand/5'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <Button size="sm" onClick={handleSubmit} disabled={disabled}>
            Continue
          </Button>
        )}
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }

  if (step.type === 'state') {
    return (
      <div className="space-y-2">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          className="block h-11 w-full max-w-xs rounded-xl border border-border bg-surface px-3 text-sm text-text focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:opacity-50"
        >
          <option value="">Select your state...</option>
          {US_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {value && (
          <Button size="sm" onClick={handleSubmit} disabled={disabled}>
            Continue
          </Button>
        )}
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }

  // number or text input
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          {step.type === 'number' && step.id !== 'householdSize' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-subtle">$</span>
          )}
          <input
            type={step.type === 'number' ? 'number' : 'text'}
            inputMode={step.type === 'number' ? 'numeric' : 'text'}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            disabled={disabled}
            placeholder={step.type === 'number' && step.id !== 'householdSize' ? '0' : ''}
            className={`block h-11 w-full rounded-xl border border-border bg-surface text-sm text-text transition-colors placeholder:text-text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:opacity-50 ${
              step.type === 'number' && step.id !== 'householdSize' ? 'pl-7 pr-3' : 'px-3'
            }`}
          />
        </div>
        <Button size="md" onClick={handleSubmit} disabled={disabled || !value.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
