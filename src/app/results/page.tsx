'use client';

import { useEffect, useState } from 'react';
import type { ScreeningResult } from '@/lib/benefits/types';
import { DocumentChecklist } from '@/components/screening/document-checklist';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DollarSign,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  Utensils,
  Heart,
  Home,
  Zap,
  GraduationCap,
  Baby,
  Receipt,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  food: Utensils,
  healthcare: Heart,
  housing: Home,
  income: DollarSign,
  energy: Zap,
  education: GraduationCap,
  childcare: Baby,
  'tax-credit': Receipt,
};

const CATEGORY_COLORS: Record<string, string> = {
  food: 'bg-orange-500/10 text-orange-600',
  healthcare: 'bg-red-500/10 text-red-600',
  housing: 'bg-blue-500/10 text-blue-600',
  income: 'bg-green-500/10 text-green-600',
  energy: 'bg-yellow-500/10 text-yellow-600',
  education: 'bg-purple-500/10 text-purple-600',
  childcare: 'bg-pink-500/10 text-pink-600',
  'tax-credit': 'bg-emerald-500/10 text-emerald-600',
};

export default function ResultsPage() {
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [activeTab, setActiveTab] = useState<'programs' | 'documents'>('programs');

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('screening_result');
      if (stored) setResult(JSON.parse(stored));
    } catch {
      // No stored results
    }
  }, []);

  if (!result) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-4">
        <div className="text-center space-y-4">
          <HelpCircle className="mx-auto h-10 w-10 text-text-subtle" />
          <h1 className="text-xl font-bold text-text">No screening results</h1>
          <p className="text-sm text-text-muted">Complete a screening to see your results here.</p>
          <Link href="/screening">
            <Button>Start Screening</Button>
          </Link>
        </div>
      </main>
    );
  }

  const eligible = result.programs.filter((p) => p.result.eligible);
  const notEligible = result.programs.filter((p) => !p.result.eligible);
  const eligibleIds = eligible.map((p) => p.program.id);

  return (
    <main className="min-h-dvh bg-surface">
      {/* Header with total */}
      <div className="bg-brand px-4 py-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-white/70">You may qualify for</p>
          <p className="mt-1 text-4xl font-bold">
            ${result.totalEstimatedMonthly.toLocaleString()}
            <span className="text-lg font-normal text-white/70">/month</span>
          </p>
          <p className="mt-1 text-sm text-white/70">
            ${result.totalEstimatedAnnual.toLocaleString()}/year across {eligible.length} program
            {eligible.length !== 1 ? 's' : ''}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4 text-white/70" />
            <p className="text-xs text-white/70">Estimates based on your household information</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-2xl">
          <button
            onClick={() => setActiveTab('programs')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'programs'
                ? 'border-b-2 border-brand text-brand'
                : 'text-text-muted hover:text-text'
            }`}
          >
            Programs ({eligible.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'documents'
                ? 'border-b-2 border-brand text-brand'
                : 'text-text-muted hover:text-text'
            }`}
          >
            Documents
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {activeTab === 'programs' ? (
          <div className="space-y-4">
            {/* Eligible programs */}
            {eligible.map(({ program, result: r }) => {
              const Icon = CATEGORY_ICONS[program.category] ?? ShieldCheck;
              const colorClass = CATEGORY_COLORS[program.category] ?? 'bg-gray-500/10 text-gray-600';

              return (
                <Card key={program.id} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-text">{program.shortName}</h3>
                        {r.estimatedMonthlyValue ? (
                          <Badge variant="success">~${r.estimatedMonthlyValue.toLocaleString()}/mo</Badge>
                        ) : r.estimatedAnnualValue ? (
                          <Badge variant="success">~${r.estimatedAnnualValue.toLocaleString()}/yr</Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-text-muted">{program.description}</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-surface-dim px-3 py-2">
                    <p className="text-sm text-text">{r.reason}</p>
                    <Badge variant={r.confidence === 'high' ? 'success' : r.confidence === 'medium' ? 'warning' : 'default'} className="mt-1">
                      {r.confidence} confidence
                    </Badge>
                  </div>

                  {r.nextSteps && r.nextSteps.length > 0 && (
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
                      Apply now <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </Card>
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
              <Link href="/screening">
                <Button variant="secondary" size="md">
                  <RotateCcw className="h-4 w-4" />
                  Update My Information
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <DocumentChecklist programIds={eligibleIds} />
        )}
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border bg-surface-dim px-4 py-4 text-center">
        <p className="mx-auto max-w-lg text-xs text-text-subtle">
          These results are estimates based on the information you provided. Actual eligibility
          is determined by each program&apos;s administering agency. Benefind does not guarantee
          eligibility or benefit amounts.
        </p>
      </div>
    </main>
  );
}
