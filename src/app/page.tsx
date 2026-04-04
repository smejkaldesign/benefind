import Link from 'next/link';
import { ArrowRight, Shield, Globe, FileCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Find Every Benefit
            <br />
            <span className="text-brand">You Deserve</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg text-text-muted">
            Answer a few simple questions and discover government programs you qualify for —
            explained in plain language, in your language.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/screening"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              Check My Eligibility
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border px-6 text-base font-medium text-text-muted transition-colors hover:border-brand hover:text-brand"
            >
              Sign In
            </Link>
          </div>
          <p className="text-sm text-text-subtle">
            100% free. No account required to check eligibility.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-border bg-surface-dim px-4 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
              <Globe className="h-6 w-6 text-brand" />
            </div>
            <h3 className="font-semibold text-text">5 Languages</h3>
            <p className="text-sm text-text-muted">
              English, Spanish, Mandarin, Vietnamese, and Arabic. More coming soon.
            </p>
          </div>
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <FileCheck className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-text">Step-by-Step Guidance</h3>
            <p className="text-sm text-text-muted">
              We explain every question on every form in plain language. No jargon.
            </p>
          </div>
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
              <Shield className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold text-text">Private & Secure</h3>
            <p className="text-sm text-text-muted">
              Your data is encrypted end-to-end. We never sell your information.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-6 text-center text-sm text-text-subtle">
        <p>&copy; {new Date().getFullYear()} Benefind. Free for everyone.</p>
      </footer>
    </main>
  );
}
