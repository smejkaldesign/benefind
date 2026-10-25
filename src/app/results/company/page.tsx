"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { CompanyScreeningResult } from "@/lib/benefits/company-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { STORAGE_KEYS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import {
  localizeCompanyProgram,
  localizeCompanyResult,
} from "@/lib/i18n/localize-company-program";
import { toCompanyMatchViews } from "@/lib/billing/company-matches";
import { CompanyMatchList } from "@/components/company/company-match-list";
import { TrendingUp, RotateCcw } from "lucide-react";

export default function CompanyResultsPage() {
  const router = useRouter();
  const { t } = useI18n();
  const c = t.company;
  const [result, setResult] = useState<CompanyScreeningResult | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [showStickyTotal, setShowStickyTotal] = useState(false);

  // Redirect authenticated users to dashboard, unauthenticated without data to screening
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/dashboard");
        return;
      }

      try {
        const stored = sessionStorage.getItem(
          STORAGE_KEYS.COMPANY_SCREENING_RESULT,
        );
        if (!stored) {
          router.replace("/screening/company");
          return;
        }
        const parsed = JSON.parse(stored);
        if (
          parsed &&
          Array.isArray(parsed.programs) &&
          typeof parsed.totalMatched === "number"
        ) {
          setResult(parsed);
        } else {
          router.replace("/screening/company");
          return;
        }
      } catch {
        router.replace("/screening/company");
        return;
      }
      setAuthChecked(true);
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setShowStickyTotal(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [authChecked]);

  if (!authChecked || !result) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </main>
    );
  }

  const localized = result.programs.map((p) => ({
    program: localizeCompanyProgram(p.program, t),
    result: localizeCompanyResult(p.result, t),
  }));
  // Signed-out visitors are never on the Business plan, so only program
  // names and categories are shown here.
  const matches = toCompanyMatchViews(localized, false);
  const notEligible = localized.filter((p) => !p.result.eligible);

  return (
    <main className="min-h-dvh bg-surface">
      {/* Header */}
      <div ref={heroRef} className="bg-brand px-4 py-8 text-stone-900">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-stone-900/60">
            {c.results.programsMatched}
          </p>
          <p className="mt-1 text-4xl font-bold">
            {result.totalMatched}
            <span className="text-lg font-normal text-stone-900/60">
              {" "}
              {result.totalMatched === 1
                ? c.results.programOne
                : c.results.programOther}
            </span>
          </p>
          <p className="mt-1 text-sm text-stone-900/60">{c.results.across}</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4 text-stone-900/60" />
            <p className="text-xs text-stone-900/60">
              {c.results.matchedAgainst}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky summary */}
      {showStickyTotal && (
        <div className="sticky top-banner z-20 border-b border-border bg-brand/5 px-4 py-1.5 text-center">
          <p className="text-sm font-semibold text-brand">
            {fmt(
              result.totalMatched === 1
                ? c.results.stickyOne
                : c.results.stickyOther,
              { count: result.totalMatched },
            )}
          </p>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-8">
        <CompanyMatchList matches={matches} signedIn={false} />

        {/* Not eligible */}
        {notEligible.length > 0 && (
          <details className="rounded-xl border border-border bg-surface p-4">
            <summary className="cursor-pointer text-sm font-medium text-text-muted">
              {fmt(c.results.notEligible, { count: notEligible.length })}
            </summary>
            <div className="mt-3 divide-y divide-border">
              {notEligible.map(({ program, result: r }) => (
                <div key={program.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-medium text-text">
                    {program.shortName}
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">{r.reason}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <Link href="/screening/company">
            <Button variant="secondary" size="default">
              <RotateCcw className="h-4 w-4" />
              {c.results.updateInfo}
            </Button>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border bg-surface-dim px-4 py-4 text-center">
        <p className="mx-auto max-w-lg text-xs text-text-subtle">
          {c.results.disclaimer}
        </p>
      </div>
    </main>
  );
}
