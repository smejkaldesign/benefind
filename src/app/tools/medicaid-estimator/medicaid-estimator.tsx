"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// States that have expanded Medicaid under the ACA (as of 2026)
const EXPANSION_STATES = new Set([
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Dakota",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "District of Columbia",
]);

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "District of Columbia",
];

// 2026 FPL annual amounts by household size (48 states + DC)
const FPL_ANNUAL: Record<number, number> = {
  1: 15060,
  2: 20440,
  3: 25820,
  4: 31200,
  5: 36580,
  6: 41960,
  7: 47340,
  8: 52720,
};

function getFPL(householdSize: number): number {
  const capped = Math.min(householdSize, 8);
  return FPL_ANNUAL[capped] ?? FPL_ANNUAL[8]!;
}

type ResultKind =
  | "noState"
  | "disability"
  | "pregnancy"
  | "eligible"
  | "gap"
  | "marketplace"
  | "over";

type EligibilityResult = {
  status: "likely" | "notQualify" | "checkState";
  badge: "green" | "yellow" | "gray";
  kind: ResultKind;
  isExpansion: boolean;
  params: Record<string, string | number>;
};

function estimateMedicaid(
  state: string,
  householdSize: number,
  annualIncome: number,
  age: number,
  isPregnant: boolean,
  hasDisability: boolean,
): EligibilityResult {
  if (!state) {
    return {
      status: "checkState",
      badge: "gray",
      kind: "noState",
      isExpansion: false,
      params: {},
    };
  }

  const fpl = getFPL(householdSize);
  const isExpansion = EXPANSION_STATES.has(state);
  const threshold = isExpansion ? 1.38 : 1.0; // 138% vs 100% FPL
  const thresholdIncome = Math.round(fpl * threshold);

  // Pregnancy: most states cover up to 185-200% FPL
  const pregnancyThreshold = Math.round(fpl * 1.85);
  // Disability/SSI: typically qualify if on SSI or SSDI regardless of income in most states
  const disabilityQualifies = hasDisability && age >= 18;

  const base = {
    isExpansion,
    params: {
      state,
      size: householdSize,
      income: annualIncome.toLocaleString(),
    },
  };

  if (disabilityQualifies) {
    return { ...base, status: "likely", badge: "green", kind: "disability" };
  }

  if (isPregnant && annualIncome <= pregnancyThreshold) {
    return {
      ...base,
      status: "likely",
      badge: "green",
      kind: "pregnancy",
      params: { ...base.params, limit: pregnancyThreshold.toLocaleString() },
    };
  }

  if (annualIncome <= thresholdIncome) {
    return {
      ...base,
      status: "likely",
      badge: "green",
      kind: "eligible",
      params: {
        ...base.params,
        pct: isExpansion ? "138%" : "100%",
        limit: thresholdIncome.toLocaleString(),
      },
    };
  }

  if (!isExpansion && annualIncome <= Math.round(fpl * 1.38)) {
    return { ...base, status: "checkState", badge: "yellow", kind: "gap" };
  }

  if (annualIncome <= Math.round(fpl * 4.0)) {
    return {
      ...base,
      status: "checkState",
      badge: "yellow",
      kind: "marketplace",
      params: {
        ...base.params,
        low: Math.round(fpl).toLocaleString(),
        high: Math.round(fpl * 4).toLocaleString(),
      },
    };
  }

  return { ...base, status: "notQualify", badge: "gray", kind: "over" };
}

function resultText(
  tm: Dictionary["tools"]["medicaid"],
  result: EligibilityResult,
): { headline: string; detail: string; stateDetail: string } {
  const r = tm.results;
  const p = result.params;
  switch (result.kind) {
    case "noState":
      return {
        headline: r.noState.headline,
        detail: r.noState.detail,
        stateDetail: "",
      };
    case "disability":
      return {
        headline: r.disability.headline,
        detail: fmt(
          result.isExpansion
            ? r.disability.detailExpansion
            : r.disability.detailNonExpansion,
          p,
        ),
        stateDetail: fmt(r.disability.stateDetail, p),
      };
    case "eligible":
      return {
        headline: fmt(r.eligible.headline, p),
        detail: fmt(r.eligible.detail, p),
        stateDetail: fmt(
          result.isExpansion
            ? r.eligible.stateDetailExpansion
            : r.eligible.stateDetailNonExpansion,
          p,
        ),
      };
    default: {
      const entry = r[result.kind];
      return {
        headline: fmt(entry.headline, p),
        detail: fmt(entry.detail, p),
        stateDetail: fmt(entry.stateDetail, p),
      };
    }
  }
}

const BADGE_CLASSES: Record<string, string> = {
  green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  yellow: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  gray: "bg-surface-bright text-text-subtle border-border",
};

export function MedicaidEstimator() {
  const { t } = useI18n();
  const ts = t.tools.shared;
  const tm = t.tools.medicaid;
  const people = (n: number) =>
    fmt(n === 1 ? ts.personOne : ts.personOther, { n });
  const [state, setState] = useState<string>("");
  const [householdSize, setHouseholdSize] = useState<string>("2");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  function handleEstimate() {
    const size = parseInt(householdSize, 10);
    const income = Math.max(0, parseFloat(annualIncome) || 0);
    const ageNum = Math.max(0, Math.min(120, parseInt(age, 10) || 35));
    setResult(
      estimateMedicaid(state, size, income, ageNum, isPregnant, hasDisability),
    );
  }

  const text = result ? resultText(tm, result) : null;

  return (
    <>
      {/* Hero */}
      <div className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1520px] px-6 py-12 md:py-16">
          <nav className="mb-4 flex items-center gap-2 font-mono text-xs text-text-subtle">
            <Link href="/" className="hover:text-text">
              {t.common.home}
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-text">
              {ts.breadcrumbTools}
            </Link>
            <span>/</span>
            <span className="text-text">{tm.breadcrumb}</span>
          </nav>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
            {tm.eyebrow}
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            {tm.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            {tm.intro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1520px] px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* SEO content column */}
          <div className="order-2 lg:order-1">
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tm.expansionTitle}
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tm.expansionP1}
              </p>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tm.expansionP2}
              </p>
              <p className="leading-relaxed text-text-muted">
                {tm.expansionP3}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tm.limitsTitle}
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tm.limitsIntro}
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface-dim">
                    <tr>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tm.colHousehold}
                      </th>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tm.col100}
                      </th>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tm.col138}
                      </th>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tm.col185}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map((size, i) => {
                      const fpl = getFPL(size);
                      return (
                        <tr
                          key={size}
                          className={
                            i % 2 === 0 ? "bg-surface" : "bg-surface-dim"
                          }
                        >
                          <td className="px-4 py-3 text-text-muted">
                            {people(size)}
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            ${fpl.toLocaleString()}
                            {ts.perYear}
                          </td>
                          <td className="px-4 py-3 font-medium text-text">
                            ${Math.round(fpl * 1.38).toLocaleString()}
                            {ts.perYear}
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            ${Math.round(fpl * 1.85).toLocaleString()}
                            {ts.perYear}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-mono text-xs text-text-subtle">
                {tm.limitsFootnote}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tm.whoTitle}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {tm.who.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-surface-dim p-5"
                  >
                    <h3 className="mb-2 font-semibold text-text">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-text">
                {ts.faqTitle}
              </h2>
              <div className="flex flex-col gap-4">
                {tm.faqs.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-xl border border-border bg-surface-dim p-5"
                  >
                    <h3 className="mb-2 font-semibold text-text">{item.q}</h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="rounded-xl border border-brand/30 bg-brand/5 p-6">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-brand">
                {tm.ctaEyebrow}
              </p>
              <h3 className="mb-2 font-display text-lg font-semibold text-text">
                {tm.ctaTitle}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                {tm.ctaBody}
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                {tm.ctaLink}{" "}
                <span aria-hidden className="inline-block rtl:-scale-x-100">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Estimator sticky column */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <Card className="border-border bg-surface-dim">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-text">
                    {tm.cardTitle}
                  </CardTitle>
                  <CardDescription className="text-text-muted">
                    {tm.cardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="med-state" className="text-sm text-text">
                      {ts.state}
                    </Label>
                    <Select
                      value={state}
                      onValueChange={(v) => {
                        if (v) setState(v);
                      }}
                    >
                      <SelectTrigger
                        id="med-state"
                        className="border-border bg-surface text-text"
                      >
                        <SelectValue placeholder={ts.selectState} />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {US_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {state && (
                      <p className="font-mono text-[11px] text-text-subtle">
                        {EXPANSION_STATES.has(state)
                          ? tm.expansionHint
                          : tm.nonExpansionHint}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="med-household"
                      className="text-sm text-text"
                    >
                      {ts.householdSize}
                    </Label>
                    <Select
                      value={householdSize}
                      onValueChange={(v) => {
                        if (v) setHouseholdSize(v);
                      }}
                    >
                      <SelectTrigger
                        id="med-household"
                        className="border-border bg-surface text-text"
                      >
                        <SelectValue>
                          {(v: string) => people(Number(v))}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {people(n)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="med-income" className="text-sm text-text">
                      {tm.incomeLabel}
                    </Label>
                    <Input
                      id="med-income"
                      type="number"
                      min={0}
                      placeholder={fmt(ts.eg, { value: "24000" })}
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tm.incomeHelp}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="med-age" className="text-sm text-text">
                      {tm.ageLabel}
                    </Label>
                    <Input
                      id="med-age"
                      type="number"
                      min={0}
                      max={120}
                      placeholder={fmt(ts.eg, { value: "34" })}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
                    <div>
                      <p className="text-sm font-medium text-text">
                        {tm.pregnantLabel}
                      </p>
                      <p className="font-mono text-[11px] text-text-subtle">
                        {tm.pregnantHelp}
                      </p>
                    </div>
                    <Switch
                      checked={isPregnant}
                      onCheckedChange={setIsPregnant}
                      aria-label={tm.pregnantLabel}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
                    <div>
                      <p className="text-sm font-medium text-text">
                        {tm.disabilityLabel}
                      </p>
                      <p className="font-mono text-[11px] text-text-subtle">
                        {tm.disabilityHelp}
                      </p>
                    </div>
                    <Switch
                      checked={hasDisability}
                      onCheckedChange={setHasDisability}
                      aria-label={tm.disabilityLabel}
                    />
                  </div>

                  <Button
                    onClick={handleEstimate}
                    className="w-full bg-brand text-white hover:bg-brand-dark"
                  >
                    {tm.check}
                  </Button>

                  {result && text && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">
                          {tm.resultLabel}
                        </p>
                        <span
                          className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold ${BADGE_CLASSES[result.badge]}`}
                        >
                          {tm.status[result.status]}
                        </span>
                      </div>
                      <p className="font-display text-xl font-semibold text-text">
                        {text.headline}
                      </p>
                      <p className="text-sm leading-relaxed text-text-muted">
                        {text.detail}
                      </p>
                      {text.stateDetail && (
                        <p className="text-sm leading-relaxed text-text-subtle">
                          {text.stateDetail}
                        </p>
                      )}
                      <Link
                        href="/get-started"
                        className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-brand/10 px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
                      >
                        {ts.startFullScreening}{" "}
                        <span
                          aria-hidden
                          className="inline-block rtl:-scale-x-100"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  )}

                  <p className="font-mono text-[10px] text-text-subtle">
                    {tm.disclaimer}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
