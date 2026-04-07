'use client';

import { useI18n } from '@/lib/i18n/context';
import { LOCALES } from '@/lib/i18n/types';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LOCALES.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-bright hover:text-text"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        {!compact && <span className="hidden sm:inline">{current?.nativeName}</span>}
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-1 w-44 rounded-xl border border-border bg-surface py-1 shadow-lg">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-surface-bright ${
                l.code === locale ? 'font-semibold text-brand' : 'text-text'
              }`}
            >
              <span>{l.nativeName}</span>
              <span className="text-xs text-text-subtle">{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
