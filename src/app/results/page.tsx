"use client";

import { useEffect, useState, useRef } from "react";
import type { EligibilityTier, ScreeningResult } from "@/lib/benefits/types";
import { DocumentChecklist } from "@/components/screening/document-checklist";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DollarSign,
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
  CheckCircle2,
  CircleDot,
  HelpCircle as QuestionMark,
  CircleSlash,
  XCircle,
  ChevronDown,
} from "lucide-react";

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  food: Utensils,
  healthcare: Heart,
  housing: Home,
  income: DollarSign,
  energy: Zap,
  education: GraduationCap,
  childcare: Baby,
  "tax-credit": Receipt,
};

const CATEGORY_COLORS: Record<string, string> = {
  food: "bg-brand/15 text-brand",
  healthcare: "bg-brand/15 text-brand",
  housing: "bg-brand/15 text-brand",
  income: "bg-brand/15 text-brand",
  energy: "bg-brand/15 text-brand",
  education: "bg-brand/15 text-brand",
  childcare: "bg-brand/15 text-brand",
  "tax-credit": "bg-brand/15 text-brand",
};

type TierMeta = {
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  badgeClass: string;
  accentClass: string;
  sortGroup: number; // lower = shown first
};

const TIER_META: Record<EligibilityTier, TierMeta> = {
  eligible_with_requirements: {
    label: "Eligible (gather these docs)",
    shortLabel: "Eligible",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-200",
    accentClass: "border-l-4 border-emerald-500",
    sortGroup: 1,
  },
  probably_eligible: {
    label: "Probably eligible",
    shortLabel: "Probably",
    icon: CircleDot,
    iconClass: "text-lime-600",
    badgeClass: "bg-lime-100 text-lime-900 border-lime-200",
    accentClass: "border-l-4 border-lime-500",
    sortGroup: 2,
  },
  maybe_eligible: {
    label: "Maybe eligible",
    shortLabel: "Maybe",
    icon: QuestionMark,
    iconClass: "text-amber-600",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-200",
    accentClass: "border-l-4 border-amber-500",
    sortGroup: 3,
  },
  not_likely: {
    label: "Not likely",
    shortLabel: "Unlikely",
    icon: CircleSlash,
    iconClass: "text-slate-500",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    accentClass: "border-l-4 border-slate-400",
    sortGroup: 4,
  },
  ineligible: {
    label: "Not eligible",
    shortLabel: "No",
    icon: XCircle,
    iconClass: "text-slate-400",
    badgeClass: "bg-slate-100 text-slate-500 border-slate-200",
    accentClass: "border-l-4 border-slate-300",
    sortGroup: 5,
  },
};

function WhyPanel({
  reasons,
}: {
  reasons: ScreeningResult["programs"][number]["result"]["reasons"];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text transition-colors"
      >
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
        Why this result?
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 rounded-lg border border-border bg-surface-dim p-3 text-xs">
          {reasons.rules.length > 0 && (
            <div>
              <p className="font-semibold text-text-muted uppercase tracking-wide mb-1.5">
                Rules
              </p>
              <ul className="space-y-1.5">
                {reasons.rules.map((rule, i) => (
                  <li
                    key={`${rule.name}-${i}`}
                    className="flex items-start gap-2"
                  >
                    {rule.passed ? (
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    ) : (
                      <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                    )}
                    <div className="min-w-0">
                      <p className="text-text">{rule.label}</p>
                      {(rule.actual || rule.threshold) && (
                        <p className="text-text-muted">
                          {rule.actual && <span>You: {rule.actual}</span>}
                          {rule.actual && rule.threshold && " · "}
                          {rule.threshold && (
                            <span>Required: {rule.threshold}</span>
                          )}
                        </p>
                      )}
                      {rule.veto && !rule.passed && (
                        <p className="mt-0.5 text-rose-600 font-medium">
                          Critical requirement
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reasons.signals.length > 0 && (
            <div>
              <p className="font-semibold text-text-muted uppercase tracking-wide mb-1.5">
                Contributing factors
              </p>
              <ul className="space-y-1">
                {reasons.signals.map((signal, i) => (
                  <li
                    key={`${signal.name}-${i}`}
                    className="flex items-start gap-2"
                  >
                    <CircleDot
                      className={`mt-0.5 h-3 w-3 shrink-0 ${
                        signal.matched ? "text-lime-600" : "text-slate-400"
                      }`}
                    />
                    <span
                      className={
                        signal.matched ? "text-text" : "text-text-muted"
                      }
                    >
                      {signal.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reasons.missing.length > 0 && (
            <div>
              <p className="font-semibold text-text-muted uppercase tracking-wide mb-1.5">
                Missing information
              </p>
              <ul className="space-y-1 text-text-muted">
                {reasons.missing.map((m, i) => (
                  <li key={`${m.field}-${i}`}>• {m.label}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-2 text-[11px] text-text-muted">
            <span>Confidence score: {reasons.computed_score}/100</span>
            <span>Engine v{reasons.engine_version}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [activeTab, setActiveTab] = useState<"programs" | "documents">(
    "programs",
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const [showStickyTotal, setShowStickyTotal] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("screening_result");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      // Validate shape before trusting parsed data
      if (
        parsed &&
        Array.isArray(parsed.programs) &&
        typeof parsed.totalEstimatedMonthly === "number" &&
        typeof parsed.totalEstimatedAnnual === "number"
      ) {
        setResult(parsed);
      }
    } catch {
      // Malformed or missing stored results
    }
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyTotal(!entry?.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [result]);

  if (!result) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-4">
        <div className="text-center space-y-4">
          <HelpCircle className="mx-auto h-10 w-10 text-text-subtle" />
          <h1 className="text-xl font-bold text-text">No screening results</h1>
          <p className="text-sm text-text-muted">
            Complete a screening to see your results here.
          </p>
          <Link href="/screening">
            <Button>Start Screening</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Group programs by tier for clean rendering
  const byTier: Record<
    EligibilityTier,
    typeof result.programs
  > = {
    eligible_with_requirements: [],
    probably_eligible: [],
    maybe_eligible: [],
    not_likely: [],
    ineligible: [],
  };
  for (const p of result.programs) {
    byTier[p.result.eligibilityTier].push(p);
  }

  // Programs the user should actually pursue (top 2 tiers)
  const pursuable = [
    ...byTier.eligible_with_requirements,
    ...byTier.probably_eligible,
  ];
  const maybe = byTier.maybe_eligible;
  const unlikely = [...byTier.not_likely, ...byTier.ineligible];
  const pursuableIds = pursuable.map((p) => p.program.id);

  return (
    <main className="min-h-dvh bg-surface">
      {/* Header with total */}
      <div ref={heroRef} className="bg-brand px-4 py-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-white/70">
            You may qualify for
          </p>
          <p className="mt-1 text-4xl font-bold">
            ${result.totalEstimatedMonthly.toLocaleString()}
            <span className="text-lg font-normal text-white/70">/month</span>
          </p>
          <p className="mt-1 text-sm text-white/70">
            ${result.totalEstimatedAnnual.toLocaleString()}/year across{" "}
            {pursuable.length} program
            {pursuable.length !== 1 ? "s" : ""}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4 text-white/70" />
            <p className="text-xs text-white/70">
              Estimates based on your household information
            </p>
          </div>
        </div>
      </div>

      {/* Tabs + sticky summary */}
      <div className="sticky top-0 z-20 border-b border-border bg-surface">
        {showStickyTotal && (
          <div className="border-b border-border bg-brand/5 px-4 py-1.5 text-center">
            <p className="text-sm font-semibold text-brand">
              ${result.totalEstimatedMonthly.toLocaleString()}/mo across{" "}
              {pursuable.length} program{pursuable.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
        <div className="mx-auto flex max-w-2xl">
          <button
            onClick={() => setActiveTab("programs")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "programs"
                ? "border-b-2 border-brand text-brand"
                : "text-text-muted hover:text-text"
            }`}
          >
            Programs ({pursuable.length})
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "documents"
                ? "border-b-2 border-brand text-brand"
                : "text-text-muted hover:text-text"
            }`}
          >
            Documents
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {activeTab === "programs" ? (
          <div className="space-y-4">
            {/* Pursuable programs (tiers 1+2) */}
            {pursuable.map(({ program, result: r }) => {
              const Icon = CATEGORY_ICONS[program.category] ?? ShieldCheck;
              const colorClass =
                CATEGORY_COLORS[program.category] ??
                "bg-surface-bright text-text-muted";
              const tier = TIER_META[r.eligibilityTier];
              const TierIcon = tier.icon;

              return (
                <Card
                  key={program.id}
                  className={`space-y-3 ${tier.accentClass}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-text">
                          {program.shortName}
                        </h3>
                        {r.estimatedMonthlyValue ? (
                          <Badge variant="success">
                            ~${r.estimatedMonthlyValue.toLocaleString()}/mo
                          </Badge>
                        ) : r.estimatedAnnualValue ? (
                          <Badge variant="success">
                            ~${r.estimatedAnnualValue.toLocaleString()}/yr
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-text-muted">
                        {program.description}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-surface-dim px-3 py-2">
                    <div className="flex items-center gap-2">
                      <TierIcon className={`h-4 w-4 ${tier.iconClass}`} />
                      <Badge
                        className={`${tier.badgeClass} border text-xs font-medium`}
                      >
                        {tier.label}
                      </Badge>
                      <span className="text-xs text-text-muted ml-auto">
                        {r.confidenceScore}/100
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text">{r.reason}</p>
                    <WhyPanel reasons={r.reasons} />
                  </div>

                  {r.nextSteps && r.nextSteps.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                        Next Steps
                      </p>
                      {r.nextSteps.map((step, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-text-muted"
                        >
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

            {/* Maybe eligible — worth knowing about */}
            {maybe.length > 0 && (
              <details className="rounded-xl border border-border bg-surface p-4">
                <summary className="cursor-pointer text-sm font-medium text-text-muted">
                  Maybe eligible ({maybe.length} program
                  {maybe.length !== 1 ? "s" : ""})
                </summary>
                <div className="mt-3 divide-y divide-border">
                  {maybe.map(({ program, result: r }) => {
                    const tier = TIER_META[r.eligibilityTier];
                    const TierIcon = tier.icon;
                    return (
                      <div
                        key={program.id}
                        className="py-3 first:pt-0 last:pb-0 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <TierIcon className={`h-4 w-4 ${tier.iconClass}`} />
                          <p className="text-sm font-medium text-text">
                            {program.shortName}
                          </p>
                          <span className="text-xs text-text-muted ml-auto">
                            {r.confidenceScore}/100
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">{r.reason}</p>
                        <WhyPanel reasons={r.reasons} />
                      </div>
                    );
                  })}
                </div>
              </details>
            )}

            {/* Not likely / ineligible — hidden by default */}
            {unlikely.length > 0 && (
              <details className="rounded-xl border border-border bg-surface p-4">
                <summary className="cursor-pointer text-sm font-medium text-text-muted">
                  Not currently eligible ({unlikely.length} program
                  {unlikely.length !== 1 ? "s" : ""})
                </summary>
                <div className="mt-3 divide-y divide-border">
                  {unlikely.map(({ program, result: r }) => {
                    const tier = TIER_META[r.eligibilityTier];
                    const TierIcon = tier.icon;
                    return (
                      <div key={program.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <TierIcon className={`h-4 w-4 ${tier.iconClass}`} />
                          <p className="text-sm font-medium text-text">
                            {program.shortName}
                          </p>
                          <span className="text-xs text-text-muted ml-auto">
                            {r.confidenceScore}/100
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-text-muted">
                          {r.reason}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 pt-4">
              <Link href="/screening">
                <Button variant="secondary" size="default">
                  <RotateCcw className="h-4 w-4" />
                  Update My Information
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <DocumentChecklist programIds={pursuableIds} />
        )}
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border bg-surface-dim px-4 py-4 text-center">
        <p className="mx-auto max-w-lg text-xs text-text-subtle">
          These results are estimates based on the information you provided.
          Actual eligibility is determined by each program&apos;s administering
          agency. Benefind does not guarantee eligibility or benefit amounts.
        </p>
      </div>
    </main>
  );
}
