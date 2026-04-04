import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`block h-11 w-full rounded-xl border bg-surface px-3 text-sm text-text transition-colors placeholder:text-text-subtle focus:ring-2 focus:outline-none disabled:opacity-50 ${
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-border focus:border-brand focus:ring-brand/20'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
