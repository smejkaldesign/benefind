'use client';

import { useEffect, useState, useRef } from 'react';
import type { CompanyScreeningResult, CompanyProgramCategory } from '@/lib/benefits/company-types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  Receipt,
  Landmark,
  Award,
  FileCheck,
  HelpCircle,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const CATEGORY_ICONS: Record<CompanyProgramCategory, React.ComponentType<{ className?: string }>> = {
  'tax-credit': Receipt,
  grant: Landmark,
  incentive: Award,
  contracting: FileCheck,
};

const CATEGORY_COLORS: Record<CompanyProgramCategory, string> = {
  'tax-credit': 'bg-emerald-500/10 text-emerald-600',
  grant: 'bg-blue-500/10 text-blue-600',
  incentive: 'bg-purple-500/10 text-purple-600',
  contracting: 'bg-amber-500/10 text-amber-600',
};

const CATEGORY_LABELS: Record<CompanyProgramCategory, string> = {
  'tax-credit': 'Tax Credits',
  grant: 'Grants',
  incentive: 'Incentives',
  contracting: 'Contracting',
};

const STATUS_BADGES: Record<string, { label: string; variant: 'success' | 'warning' | 'default' }> = {
  active: { label: 'Active', variant: 'success' },
  paused: { label: 'Paused', variant: 'warning' },
  expired: { label: 'Expired', variant: 'default' },
};

export default function CompanyResultsPage() {
  const [result, setResult] = useState<CompanyScreeningResult | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('company_screening_result');
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (parsed && Array.isArray(parsed.programs) && typeof parsed.totalMatched === 'number') {
        setResult(parsed);
      }
    } catch {}
  }, []);

  if (!result) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-4">
        <div className="text-center space-y-4">
          <HelpCircle className="mx-auto h-10 w-10 text-text-subtle" />
          <h1 className="text-xl font-bold text-text">No screening results</h1>
          <p className="text-sm text-text-muted">Complete a company screening to see your results here.</p>
          <Link href="/screening/company">
            <Button>Start Company Screening</Button>
          </Link>
        </div>
      </main>
    );
  }

  const eligible = result.programs.filter((p) => p.result.eligible);
  const notEligible = result.programs.filter((p) => !p.result.eligible);

  // Group eligible programs by category
  const grouped = eligible.reduce<Record<CompanyProgramCategory, typeof eligible>>((acc, item) => {
    const cat = item.program.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<CompanyProgramCategory, typeof eligible>);

  const categoryOrder: CompanyProgramCategory[] = ['tax-credit', 'grant', 'incentive', 'contracting'];

  const heroRef = useRef<HTMLDivElement>(null);
  const [showStickyTotal, setShowStickyTotal] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry) setShowStickyTotal(!entry.isIntersecting); },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-dvh bg-surface">
      {/* Header */}
      <div ref={heroRef} className="bg-brand px-4 py-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-white/70">Programs matched</p>
          <p className="mt-1 text-4xl font-bold">
            {result.totalMatched}
            <span className="text-lg font-normal text-white/70"> program{result.totalMatched !== 1 ? 's' : ''}</span>
          </p>
          <p className="mt-1 text-sm text-white/70">
            Across grants, tax credits, incentives, and contracting preferences
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4 text-white/70" />
            <p className="text-xs text-white/70">Matched against your company profile</p>
          </div>
        </div>
      </div>

      {/* Sticky summary */}
      {showStickyTotal && (
        <div className="sticky top-0 z-20 border-b border-border bg-brand/5 px-4 py-1.5 text-center">
          <p className="text-sm font-semibold text-brand">
            {result.totalMatched} program{result.totalMatched !== 1 ? 's' : ''} matched
          </p>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-8">
        {/* Eligible programs grouped by category */}
        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;

          const Icon = CATEGORY_ICONS[cat];
          const colorClass = CATEGORY_COLORS[cat];
          const label = CATEGORY_LABELS[cat];

          return (
            <section key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-semibold text-text uppercase tracking-wide">
                  {label} ({items.length})
                </h2>
              </div>

              <div className="space-y-3">
                {items.map(({ program, result: r }) => {
                  const statusBadge = STATUS_BADGES[program.status];

                  return (
                    <Card key={program.id} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-text">{program.shortName}</h3>
                              <p className="text-xs text-text-subtle">{program.agency}</p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {r.estimatedValue && (
                                <Badge variant="success">{r.estimatedValue}</Badge>
                              )}
                              <Badge variant={statusBadge?.variant ?? 'default'}>
                                {statusBadge?.label ?? program.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="mt-1.5 text-sm text-text-muted">{program.description}</p>
                        </div>
                      </div>

                      {/* Match score bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all ${
                              r.matchScore >= 80 ? 'bg-emerald-500' :
                              r.matchScore >= 50 ? 'bg-yellow-400' :
                              'bg-gray-300'
                            }`}
                            style={{ width: `${r.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-text-muted tabular-nums w-10 text-right">
                          {r.matchScore}%
                        </span>
                      </div>

                      {/* Why you qualify */}
                      {r.whyYouQualify && r.whyYouQualify.length > 0 && (
                        <div className="rounded-lg bg-emerald-500/5 px-3 py-2 space-y-1">
                          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                            Why you qualify
                          </p>
                          {r.whyYouQualify.map((reason, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-sm text-text-muted">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                              {reason}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Status warning for paused/expired */}
                      {program.status !== 'active' && program.deadlineInfo && (
                        <div className="flex items-start gap-1.5 rounded-lg bg-yellow-500/5 px-3 py-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-yellow-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-yellow-700">{program.deadlineInfo}</p>
                        </div>
                      )}

                      {/* Deadline info for active programs */}
                      {program.status === 'active' && program.deadlineInfo && (
                        <div className="flex items-start gap-1.5 text-xs text-text-subtle">
                          <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          {program.deadlineInfo}
                        </div>
                      )}

                      {/* Next steps */}
                      {r.nextSteps.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Next Steps</p>
                          {r.nextSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-text-muted">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                                {i + 1}
                              </span>
                              {step}
                            </div>
                          ))}
                        </div>
                      )}

                      {program.applicationUrl && (
                        <a
                          href={program.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark"
                        >
                          Learn more <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Not eligible */}
        {notEligible.length > 0 && (
          <details className="rounded-xl border border-border bg-surface p-4">
            <summary className="cursor-pointer text-sm font-medium text-text-muted">
              Not currently eligible ({notEligible.length} programs)
            </summary>
            <div className="mt-3 divide-y divide-border">
              {notEligible.map(({ program, result: r }) => (
                <div key={program.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-medium text-text">{program.shortName}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{r.reason}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <Link href="/screening/company">
            <Button variant="secondary" size="md">
              <RotateCcw className="h-4 w-4" />
              Update Company Info
            </Button>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border bg-surface-dim px-4 py-4 text-center">
        <p className="mx-auto max-w-lg text-xs text-text-subtle">
          These are preliminary matches based on the information you provided. Actual eligibility
          is determined by each program&apos;s administering agency. Benefind does not guarantee
          eligibility or award amounts. Consult a tax advisor for tax credit claims.
        </p>
      </div>
    </main>
  );
}
