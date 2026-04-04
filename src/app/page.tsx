'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Globe, FileCheck } from 'lucide-react';
import { LandingNav } from '@/components/landing-nav';
import { useI18n } from '@/lib/i18n/context';

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="flex min-h-dvh flex-col">
      <LandingNav />

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
            {t.hero.title1}
            <br />
            <span className="text-brand">{t.hero.title2}</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg text-text-muted">{t.hero.subtitle}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/screening"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              {t.hero.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border px-6 text-base font-medium text-text-muted transition-colors hover:border-brand hover:text-brand"
            >
              {t.common.signIn}
            </Link>
          </div>
          <p className="text-sm text-text-subtle">{t.hero.noAccount}</p>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-border bg-surface-dim px-4 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
              <Globe className="h-6 w-6 text-brand" />
            </div>
            <h3 className="font-semibold text-text">{t.values.languages}</h3>
            <p className="text-sm text-text-muted">{t.values.languagesDesc}</p>
          </div>
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <FileCheck className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-text">{t.values.guidance}</h3>
            <p className="text-sm text-text-muted">{t.values.guidanceDesc}</p>
          </div>
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
              <Shield className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold text-text">{t.values.privacy_}</h3>
            <p className="text-sm text-text-muted">{t.values.privacyDesc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-6 text-center text-sm text-text-subtle">
        <p>
          &copy; {new Date().getFullYear()} {t.common.appName}. {t.common.free}
        </p>
      </footer>
    </main>
  );
}
