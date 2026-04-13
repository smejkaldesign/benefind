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

interface CalcResult {
  eligible: boolean;
  eligibility: Eligibility;
  estimatedBenefit: number;
  reason: string;
}

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
      reason: `Gross income ($${grossIncome.toLocaleString()}/mo) exceeds the 130% FPL limit of $${fplLimit.toLocaleString()}/mo for a household of ${householdSize}.`,
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
    reason: `Based on a net income of ~$${netIncome.toLocaleString()}/mo after deductions.`,
  };
}

const ELIGIBILITY_COLORS: Record<Eligibility, string> = {
  High: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Low: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function SNAPCalculator() {
  const [householdSize, setHouseholdSize] = useState<string>("2");
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [hasElderly, setHasElderly] = useState(false);
  const [shelterCosts, setShelterCosts] = useState<string>("");
  const [result, setResult] = useState<CalcResult | null>(null);

  function handleCalculate() {
    const size = parseInt(householdSize, 10);
    const income = parseFloat(grossIncome) || 0;
    const shelter = parseFloat(shelterCosts) || 0;
    setResult(calculateSNAP(size, income, shelter, hasElderly));
  }

  return (
    <>
      {/* Hero */}
      <div className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1520px] px-6 py-12 md:py-16">
          <nav className="mb-4 flex items-center gap-2 font-mono text-xs text-text-subtle">
            <Link href="/" className="hover:text-text">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-text">
              Tools
            </Link>
            <span>/</span>
            <span className="text-text">SNAP Calculator</span>
          </nav>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
            [SNAP]
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            SNAP Benefit Calculator 2026
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            Estimate your monthly food stamp benefit in under 60 seconds. Enter
            your household details to see how much you could receive and whether
            you are likely to qualify.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1520px] px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* SEO content column */}
          <div className="order-2 lg:order-1">
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                How SNAP Benefits Are Calculated
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                The Supplemental Nutrition Assistance Program (SNAP) uses a
                two-step formula to determine both eligibility and benefit
                amount. First, your household must pass the gross income test.
                Then, your actual benefit is calculated from your net income
                after allowable deductions.
              </p>
              <p className="mb-4 leading-relaxed text-text-muted">
                The core formula is straightforward: your estimated monthly
                benefit equals the maximum benefit for your household size minus
                30% of your net income. The maximum benefit is set each fiscal
                year by the USDA and adjusts for cost of living. In 2026, a
                family of four can receive up to $975 per month.
              </p>
              <p className="leading-relaxed text-text-muted">
                Net income is not the same as gross income. Several deductions
                are applied before the 30% calculation runs, which means your
                actual benefit is usually higher than you might expect if you
                calculate it from gross income alone. Understanding these
                deductions is the single most important thing you can do to
                maximize your benefit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                SNAP Income Limits by Household Size (2026)
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                The gross income limit is 130% of the federal poverty level.
                Households with an elderly (60+) or disabled member are exempt
                from the gross income test and only need to pass the net income
                test at 100% FPL.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface-dim">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        Gross Limit (130%)
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        Net Limit (100%)
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        Max Benefit
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
                            {size} {size === 1 ? "person" : "people"}
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            ${gross.toLocaleString()}/mo
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            ${net.toLocaleString()}/mo
                          </td>
                          <td className="px-4 py-3 font-medium text-text">
                            ${MAX_BENEFIT[size]!.toLocaleString()}/mo
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-surface">
                      <td className="px-4 py-3 text-text-muted">
                        Each add&apos;l
                      </td>
                      <td className="px-4 py-3 text-text-muted">+$583/mo</td>
                      <td className="px-4 py-3 text-text-muted">+$449/mo</td>
                      <td className="px-4 py-3 font-medium text-text">
                        +$219/mo
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-mono text-xs text-text-subtle">
                * Limits for 48 contiguous states and DC. Alaska and Hawaii have
                higher limits.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                SNAP Deductions Explained
              </h2>
              <p className="mb-6 leading-relaxed text-text-muted">
                Deductions are subtracted from your gross income before the
                benefit formula runs. The more deductions you qualify for, the
                higher your estimated benefit. Many households leave money on
                the table by not claiming every deduction they are entitled to.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Standard Deduction",
                    desc: "All households receive a standard deduction based on household size. In 2026, it ranges from $204 for 1-4 person households up to $409 for 10-person households. This deduction is automatic and requires no documentation.",
                  },
                  {
                    title: "Earned Income Deduction",
                    desc: "If anyone in your household earns wages or self-employment income, 20% of that earned income is deducted. This rewards working households by reducing their countable income and increasing their benefit.",
                  },
                  {
                    title: "Shelter Deduction",
                    desc: "If your shelter costs (rent, mortgage, utilities) exceed 50% of your net income after other deductions, the excess counts as a shelter deduction. For most households this is capped at $672/month in 2026. There is no cap for elderly or disabled households.",
                  },
                  {
                    title: "Dependent Care Deduction",
                    desc: "If you pay for child care or adult dependent care in order to work, look for work, or attend training, those costs are fully deductible. Keep your receipts as the state agency will ask for documentation.",
                  },
                  {
                    title: "Child Support Deduction",
                    desc: "Legally obligated child support payments made to a non-household member can be deducted from gross income. This often helps single-parent households who are paying support for children who do not live with them.",
                  },
                  {
                    title: "Medical Expense Deduction",
                    desc: "Elderly or disabled household members can deduct medical expenses that exceed $35/month. This includes prescription costs, doctor visits, health insurance premiums, and transportation to medical appointments.",
                  },
                ].map((item) => (
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
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    q: "What is the income limit for SNAP in 2026?",
                    a: "For most households, gross monthly income must be at or below 130% of the federal poverty level (FPL). For a household of 4, that is $3,381/month ($40,572/year) in 2026. Households with an elderly or disabled member only need to pass the net income test at 100% FPL.",
                  },
                  {
                    q: "How is my SNAP benefit amount calculated?",
                    a: "SNAP uses a formula: start with the maximum benefit for your household size, then subtract 30% of your net income. Net income is your gross income minus standard deductions, earned income deductions (20%), and excess shelter costs.",
                  },
                  {
                    q: "What counts as income for SNAP?",
                    a: "SNAP counts most types of income including wages, self-employment, Social Security, and disability payments. It does not count Supplemental Security Income (SSI), child tax credits, or most educational assistance.",
                  },
                  {
                    q: "What deductions can reduce my SNAP countable income?",
                    a: "Standard deductions apply to all households. You also get a 20% earned income deduction if you work, a dependent care deduction if you pay for child or adult care, and a shelter deduction for housing costs that exceed half your net income.",
                  },
                  {
                    q: "How long does SNAP approval take?",
                    a: "Most states process regular SNAP applications within 30 days. If your household has very little money, you may qualify for expedited SNAP, which can be approved within 7 days.",
                  },
                  {
                    q: "Does SNAP vary by state?",
                    a: "Federal rules set income and benefit levels, but each state administers its own program. Some states have higher shelter cost caps or additional deductions. Hawaii and Alaska have separate, higher benefit levels.",
                  },
                  {
                    q: "Can I get SNAP if I am working?",
                    a: "Yes. Working households benefit from the 20% earned income deduction, which lowers countable income. Many working families, especially those with children, receive SNAP benefits.",
                  },
                ].map((item) => (
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
                [Deep dive]
              </p>
              <h3 className="mb-2 font-display text-lg font-semibold text-text">
                Want the full picture?
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                Our complete guide to SNAP eligibility covers every rule, every
                deduction, and every state variation in detail.
              </p>
              <Link
                href="/blog/snap-eligibility-2026"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                Read: SNAP Eligibility 2026 Complete Guide &rarr;
              </Link>
            </div>
          </div>

          {/* Calculator sticky column */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <Card className="border-border bg-surface-dim">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-text">
                    SNAP Benefit Estimator
                  </CardTitle>
                  <CardDescription className="text-text-muted">
                    Estimates based on 2026 federal SNAP rules. Results are
                    approximate.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="household-size"
                      className="text-sm text-text"
                    >
                      Household size
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
                        <SelectValue placeholder="Select household size" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n} {n === 1 ? "person" : "people"}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="gross-income" className="text-sm text-text">
                      Gross monthly income ($)
                    </Label>
                    <Input
                      id="gross-income"
                      type="number"
                      min={0}
                      placeholder="e.g. 2400"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Before taxes; include wages, benefits, and other income
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="state" className="text-sm text-text">
                      State
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
                        <SelectValue placeholder="Select your state" />
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
                        Elderly or disabled member
                      </p>
                      <p className="font-mono text-[11px] text-text-subtle">
                        Age 60+ or receiving disability benefits
                      </p>
                    </div>
                    <Switch
                      checked={hasElderly}
                      onCheckedChange={setHasElderly}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="shelter-costs"
                      className="text-sm text-text"
                    >
                      Monthly shelter costs ($)
                    </Label>
                    <Input
                      id="shelter-costs"
                      type="number"
                      min={0}
                      placeholder="e.g. 1200"
                      value={shelterCosts}
                      onChange={(e) => setShelterCosts(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Rent or mortgage + utilities (heat, electric, water)
                    </p>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-brand text-white hover:bg-brand-dark"
                  >
                    Calculate my estimate
                  </Button>

                  {result && (
                    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">
                          Estimated benefit
                        </p>
                        <span
                          className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold ${ELIGIBILITY_COLORS[result.eligibility]}`}
                        >
                          {result.eligibility} likelihood
                        </span>
                      </div>
                      {result.eligible ? (
                        <>
                          <p className="font-display text-4xl font-semibold text-brand">
                            ${result.estimatedBenefit.toLocaleString()}
                            <span className="ml-1 font-mono text-sm font-normal text-text-muted">
                              /mo
                            </span>
                          </p>
                          <p className="text-sm text-text-muted">
                            {result.reason}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-display text-2xl font-semibold text-text">
                            May not qualify
                          </p>
                          <p className="text-sm text-text-muted">
                            {result.reason}
                          </p>
                          <p className="text-sm text-text-muted">
                            A full screening may uncover deductions that change
                            your result.
                          </p>
                        </>
                      )}
                      <Link
                        href="/get-started"
                        className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-brand/10 px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
                      >
                        Start full screening for exact results &rarr;
                      </Link>
                    </div>
                  )}

                  <p className="font-mono text-[10px] text-text-subtle">
                    This calculator provides estimates only and does not
                    constitute an eligibility determination. Results may differ
                    from official state determinations.
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
