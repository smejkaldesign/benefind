'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { LanguageSelector } from '@/components/language-selector';
import { useI18n } from '@/lib/i18n/context';
import { useTheme } from '@/lib/theme';

export function LandingNav() {
  const { t } = useI18n();
  const { resolved, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled ? 'bg-surface/80 shadow-sm backdrop-blur-xl' : ''
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand">
          {t.common.appName}
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSelector />
          {mounted && (
            <button
              type="button"
              onClick={toggle}
              className="cursor-pointer rounded-lg p-1.5 text-text-muted transition-colors hover:text-brand"
              aria-label={
                resolved === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {resolved === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
          <Link
            href="/auth/login"
            className="cursor-pointer rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-text-muted transition-colors hover:border-brand hover:text-brand sm:px-3 sm:py-1.5 sm:text-sm"
          >
            {t.common.signIn}
          </Link>
        </div>
      </div>
    </header>
  );
}
