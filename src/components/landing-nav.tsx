'use client';

import Link from 'next/link';
import { LanguageSelector } from '@/components/language-selector';
import { useI18n } from '@/lib/i18n/context';

export function LandingNav() {
  const { t } = useI18n();

  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-4 py-3">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <span className="text-lg font-bold text-brand">{t.common.appName}</span>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Link
            href="/auth/login"
            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:border-brand hover:text-brand"
          >
            {t.common.signIn}
          </Link>
        </div>
      </div>
    </header>
  );
}
