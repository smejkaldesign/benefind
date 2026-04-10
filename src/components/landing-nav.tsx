'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageSelector } from '@/components/language-selector';
import { useI18n } from '@/lib/i18n/context';

export function LandingNav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/80 shadow-[0_0_16px_rgba(18,18,18,0.4)] backdrop-blur-[30px]'
          : ''
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/brand/logo-light.svg"
            alt={t.common.appName}
            width={120}
            height={22}
            priority
          />
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">
          <LanguageSelector />
          <Link
            href="/auth/login"
            className="rounded-[50px] border border-border px-4 py-1.5 text-sm font-medium text-text-muted transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            {t.common.signIn}
          </Link>
          <Link
            href="/get-started"
            className="hidden rounded-[50px] bg-brand px-5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none sm:inline-flex"
          >
            {t.landing.heroCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
