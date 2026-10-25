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

// 2026 Federal Poverty Level (130%) for gross income test
const FPL_130: Record<number, number> = {
  1: 1632,
  2: 2215,
  3: 2798,
  4: 3381,
  5: 3964,
  6: 4547,
  7: 5130,
  8: 5713,
  9: 6296,
  10: 6879,
};

// 2026 maximum monthly SNAP allotments
const MAX_BENEFIT: Record<number, number> = {
  1: 292,
  2: 536,
  3: 768,
  4: 975,
  5: 1158,
  6: 1390,
  7: 1536,
  8: 1756,
  9: 1975,
  10: 2195,
};

// Standard deductions by household size (2026)
const STANDARD_DEDUCTION: Record<number, number> = {
  1: 204,
  2: 204,
  3: 204,
  4: 204,
  5: 240,
  6: 273,
  7: 307,
  8: 341,
  9: 375,
  10: 409,
};

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

type Eligibility = "High" | "Medium" | "Low";

type CalcResult =
  | {
      eligible: false;
      eligibility: Eligibility;
      estimatedBenefit: number;
      income: number;
      limit: number;
      size: number;
    }
  | {
      eligible: true;
      eligibility: Eligibility;
      estimatedBenefit: number;
      netIncome: number;
    };

function calculateSNAP(
  householdSize: number,
  grossIncome: number,
  shelterCosts: number,
  hasElderly: boolean,
): CalcResult {
  const fplLimit = FPL_130[householdSize] ?? FPL_130[10]!;
  const maxBenefit = MAX_BENEFIT[householdSize] ?? MAX_BENEFIT[10]!;
  const stdDeduction =
    STANDARD_DEDUCTION[householdSize] ?? STANDARD_DEDUCTION[10]!;

  if (!hasElderly && grossIncome > fplLimit) {
    return {
      eligible: false,
      eligibility: "Low",
      estimatedBenefit: 0,
      income: grossIncome,
      limit: fplLimit,
      size: householdSize,
    };
  }

  const earnedIncomeDeduction = Math.round(grossIncome * 0.2);
  const netAfterDeductions = Math.max(
    0,
    grossIncome - stdDeduction - earnedIncomeDeduction,
  );

  const shelterCap = hasElderly ? Infinity : 672;
  const halfNet = Math.round(netAfterDeductions * 0.5);
  const excessShelter = Math.max(0, shelterCosts - halfNet);
  const shelterDeduction = Math.min(excessShelter, shelterCap);

  const netIncome = Math.max(0, netAfterDeductions - shelterDeduction);
  const expectedContribution = Math.round(netIncome * 0.3);
  const rawBenefit = maxBenefit - expectedContribution;
  const estimatedBenefit = Math.max(23, rawBenefit);

  const incomeRatio = grossIncome / fplLimit;
  let eligibility: Eligibility;
  if (incomeRatio <= 0.8) eligibility = "High";
  else if (incomeRatio <= 1.0) eligibility = "Medium";
  else eligibility = hasElderly ? "Medium" : "Low";

  return {
    eligible: true,
    eligibility,
    estimatedBenefit,
    netIncome,
  };
}

const ELIGIBILITY_COLORS: Record<Eligibility, string> = {
  High: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Low: "bg-red-500/15 text-red-400 border-red-500/30",
};

const LIKELIHOOD_KEYS = {
  High: "likelihoodHigh",
  Medium: "likelihoodMedium",
  Low: "likelihoodLow",
} as const;

export function SNAPCalculator() {
  const { t } = useI18n();
  const ts = t.tools.shared;
  const tt = t.tools.snap;
  const people = (n: number) =>
    fmt(n === 1 ? ts.personOne : ts.personOther, { n });
  const [householdSize, setHouseholdSize] = useState<string>("2");
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [hasElderly, setHasElderly] = useState(false);
  const [shelterCosts, setShelterCosts] = useState<string>("");
  const [result, setResult] = useState<CalcResult | null>(null);

  function handleCalculate() {
    const size = parseInt(householdSize, 10);
    const income = Math.max(0, parseFloat(grossIncome) || 0);
    const shelter = Math.max(0, parseFloat(shelterCosts) || 0);
    setResult(calculateSNAP(size, income, shelter, hasElderly));
  }

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
            <span className="text-text">{tt.breadcrumb}</span>
          </nav>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
            {tt.eyebrow}
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            {tt.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            {tt.intro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1520px] px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* SEO content column */}
          <div className="order-2 lg:order-1">
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tt.howTitle}
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">{tt.howP1}</p>
              <p className="mb-4 leading-relaxed text-text-muted">{tt.howP2}</p>
              <p className="leading-relaxed text-text-muted">{tt.howP3}</p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tt.limitsTitle}
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tt.limitsIntro}
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface-dim">
                    <tr>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tt.colSize}
                      </th>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tt.colGross}
                      </th>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tt.colNet}
                      </th>
                      <th className="px-4 py-3 text-start font-semibold text-text">
                        {tt.colMax}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((size, i) => {
                      const gross = FPL_130[size]!;
                      const net = Math.round(gross / 1.3);
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
                            ${gross.toLocaleString()}
                            {ts.perMonth}
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            ${net.toLocaleString()}
                            {ts.perMonth}
                          </td>
                          <td className="px-4 py-3 font-medium text-text">
                            ${MAX_BENEFIT[size]!.toLocaleString()}
                            {ts.perMonth}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-surface">
                      <td className="px-4 py-3 text-text-muted">
                        {tt.eachAdditional}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        +$583{ts.perMonth}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        +$449{ts.perMonth}
                      </td>
                      <td className="px-4 py-3 font-medium text-text">
                        +$219{ts.perMonth}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-mono text-xs text-text-subtle">
                {tt.limitsFootnote}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tt.deductionsTitle}
              </h2>
              <p className="mb-6 leading-relaxed text-text-muted">
                {tt.deductionsIntro}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {tt.deductions.map((item) => (
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
                {tt.faqs.map((item) => (
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
                {tt.deepDiveEyebrow}
              </p>
              <h3 className="mb-2 font-display text-lg font-semibold text-text">
                {tt.deepDiveTitle}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                {tt.deepDiveBody}
              </p>
              <Link
                href="/blog/snap-eligibility-2026"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                {tt.deepDiveLink}{" "}
                <span aria-hidden className="inline-block rtl:-scale-x-100">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Calculator sticky column */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <Card className="border-border bg-surface-dim">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-text">
                    {tt.cardTitle}
                  </CardTitle>
                  <CardDescription className="text-text-muted">
                    {tt.cardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="household-size"
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
                        id="household-size"
                        className="border-border bg-surface text-text"
                      >
                        <SelectValue placeholder={tt.householdPlaceholder}>
                          {(v: string) => people(Number(v))}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <SelectItem key={n} value={String(n)}>
                              {people(n)}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="gross-income" className="text-sm text-text">
                      {tt.incomeLabel}
                    </Label>
                    <Input
                      id="gross-income"
                      type="number"
                      min={0}
                      placeholder={fmt(ts.eg, { value: "2400" })}
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tt.incomeHelp}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="state" className="text-sm text-text">
                      {ts.state}
                    </Label>
                    <Select
                      value={state}
                      onValueChange={(v) => {
                        if (v) setState(v);
                      }}
                    >
                      <SelectTrigger
                        id="state"
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
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
                    <div>
                      <p className="text-sm font-medium text-text">
                        {tt.elderlyLabel}
                      </p>
                      <p className="font-mono text-[11px] text-text-subtle">
                        {tt.elderlyHelp}
                      </p>
                    </div>
                    <Switch
                      checked={hasElderly}
                      onCheckedChange={setHasElderly}
                      aria-label={tt.elderlyAria}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="shelter-costs"
                      className="text-sm text-text"
                    >
                      {tt.shelterLabel}
                    </Label>
                    <Input
                      id="shelter-costs"
                      type="number"
                      min={0}
                      placeholder={fmt(ts.eg, { value: "1200" })}
                      value={shelterCosts}
                      onChange={(e) => setShelterCosts(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tt.shelterHelp}
                    </p>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-brand text-white hover:bg-brand-dark"
                  >
                    {tt.calculate}
                  </Button>

                  {result && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">
                          {tt.estimatedBenefit}
                        </p>
                        <span
                          className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold ${ELIGIBILITY_COLORS[result.eligibility]}`}
                        >
                          {tt[LIKELIHOOD_KEYS[result.eligibility]]}
                        </span>
                      </div>
                      {result.eligible ? (
                        <>
                          <p className="font-display text-4xl font-semibold text-brand">
                            <span dir="ltr">
                              ${result.estimatedBenefit.toLocaleString()}
                            </span>
                            <span className="ms-1 font-mono text-sm font-normal text-text-muted">
                              {ts.perMonth}
                            </span>
                          </p>
                          <p className="text-sm text-text-muted">
                            {fmt(tt.netReason, {
                              net: result.netIncome.toLocaleString(),
                            })}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-display text-2xl font-semibold text-text">
                            {tt.mayNotQualify}
                          </p>
                          <p className="text-sm text-text-muted">
                            {fmt(tt.overLimitReason, {
                              income: result.income.toLocaleString(),
                              limit: result.limit.toLocaleString(),
                              size: result.size,
                            })}
                          </p>
                          <p className="text-sm text-text-muted">
                            {tt.fullScreeningHint}
                          </p>
                        </>
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
                    {tt.disclaimer}
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
