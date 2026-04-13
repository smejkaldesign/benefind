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
  "Wisconsin",
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

type EligibilityResult = {
  status: "Likely eligible" | "May not qualify" | "Check with your state";
  badge: "green" | "yellow" | "gray";
  headline: string;
  detail: string;
  stateDetail: string;
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
      status: "Check with your state",
      badge: "gray",
      headline: "Select a state to continue",
      detail:
        "Medicaid rules vary significantly by state. Select your state above for a personalized estimate.",
      stateDetail: "",
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

  const stateName = state;
  const expansionLabel = isExpansion ? "expansion" : "non-expansion";

  if (disabilityQualifies) {
    return {
      status: "Likely eligible",
      badge: "green",
      headline: "Likely eligible through disability pathway",
      detail: `People receiving SSI or SSDI benefits typically qualify for Medicaid automatically in most states, regardless of income limits. ${stateName} is a ${expansionLabel} state.`,
      stateDetail: `In ${stateName}, individuals with a qualifying disability are often auto-enrolled in Medicaid when they receive federal disability benefits. Verify your specific benefit type with your state agency.`,
    };
  }

  if (isPregnant && annualIncome <= pregnancyThreshold) {
    return {
      status: "Likely eligible",
      badge: "green",
      headline: "Likely eligible through pregnancy Medicaid",
      detail: `${stateName} covers pregnant individuals with incomes up to approximately 185% FPL ($${pregnancyThreshold.toLocaleString()}/year for a household of ${householdSize}). Your income appears to be within this threshold.`,
      stateDetail: `Pregnancy Medicaid in ${stateName} covers prenatal care, labor and delivery, and postpartum care. Coverage often continues for 60 days postpartum, with some states extending to 12 months.`,
    };
  }

  if (annualIncome <= thresholdIncome) {
    return {
      status: "Likely eligible",
      badge: "green",
      headline: `Likely eligible in ${stateName}`,
      detail: `Your income ($${annualIncome.toLocaleString()}/year) appears to be within the ${stateName} Medicaid limit of ${isExpansion ? "138%" : "100%"} FPL ($${thresholdIncome.toLocaleString()}/year for a household of ${householdSize}).`,
      stateDetail: `${stateName} ${isExpansion ? "expanded Medicaid under the ACA, covering" : "has not expanded Medicaid. Coverage is primarily available for"} adults with incomes up to ${isExpansion ? "138%" : "100%"} of the federal poverty level. Children, pregnant individuals, and people with disabilities may qualify at higher thresholds.`,
    };
  }

  if (!isExpansion && annualIncome <= Math.round(fpl * 1.38)) {
    return {
      status: "Check with your state",
      badge: "yellow",
      headline: `Coverage gap in ${stateName}`,
      detail: `Your income ($${annualIncome.toLocaleString()}/year) is above ${stateName}'s Medicaid limit but below 138% FPL. Because ${stateName} has not expanded Medicaid, you may fall in the coverage gap.`,
      stateDetail: `In the coverage gap, income is too high for traditional Medicaid but too low to qualify for ACA marketplace subsidies (which start at 100% FPL). Check whether ${stateName} has any limited expansion or special programs. You may also be eligible for marketplace coverage.`,
    };
  }

  if (annualIncome <= Math.round(fpl * 4.0)) {
    return {
      status: "Check with your state",
      badge: "yellow",
      headline: "Income above Medicaid limit — marketplace may help",
      detail: `Your income ($${annualIncome.toLocaleString()}/year) is likely above the Medicaid threshold for ${stateName}, but you may qualify for subsidized marketplace coverage through Healthcare.gov.`,
      stateDetail: `In ${stateName}, households earning between 100% and 400% FPL ($${Math.round(fpl).toLocaleString()} to $${Math.round(fpl * 4).toLocaleString()}/year) may qualify for premium tax credits. A full Benefind screening will check marketplace eligibility as well.`,
    };
  }

  return {
    status: "May not qualify",
    badge: "gray",
    headline: "Income likely above eligibility thresholds",
    detail: `Your income ($${annualIncome.toLocaleString()}/year) appears to exceed Medicaid and marketplace subsidy thresholds for ${stateName}. However, other household factors may change this.`,
    stateDetail: `A full Benefind screening will check for other programs, including CHIP for children in the household, state-specific programs, and employer coverage alternatives.`,
  };
}

const BADGE_CLASSES: Record<string, string> = {
  green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  yellow: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  gray: "bg-surface-bright text-text-subtle border-border",
};

export function MedicaidEstimator() {
  const [state, setState] = useState<string>("");
  const [householdSize, setHouseholdSize] = useState<string>("2");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  function handleEstimate() {
    const size = parseInt(householdSize, 10);
    const income = parseFloat(annualIncome) || 0;
    const ageNum = parseInt(age, 10) || 35;
    setResult(
      estimateMedicaid(state, size, income, ageNum, isPregnant, hasDisability),
    );
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
            <span className="text-text">Medicaid Estimator</span>
          </nav>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
            [Medicaid]
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Medicaid Eligibility Estimator 2026
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            Find out if your income qualifies for Medicaid in your state. We
            handle expansion and non-expansion states separately so you get an
            accurate picture, not a generic answer.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1520px] px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* SEO content column */}
          <div className="order-2 lg:order-1">
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                Medicaid Expansion: What It Means for You
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                The Affordable Care Act (ACA) gave states the option to expand
                Medicaid to cover adults earning up to 138% of the federal
                poverty level. As of 2026, 41 states and Washington DC have
                expanded. In expansion states, a single adult earning up to
                about $20,783 per year qualifies regardless of family structure
                or disability status.
              </p>
              <p className="mb-4 leading-relaxed text-text-muted">
                In non-expansion states, coverage for adults without children is
                often extremely limited or nonexistent. Many non-expansion
                states require disability status, pregnancy, or very low income
                to qualify. This creates what policy experts call the coverage
                gap — too much income for traditional Medicaid, too little for
                marketplace subsidies.
              </p>
              <p className="leading-relaxed text-text-muted">
                The federal government continues to incentivize expansion, and
                several additional states have passed expansion legislation that
                takes effect in 2025-2026. Your state's status can change, so
                always verify current rules through your state Medicaid agency
                or a full Benefind screening.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                Medicaid Income Limits by State Type (2026)
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                Income limits vary by household size, state, and whether you
                fall into a specific category (pregnant, disabled, child,
                elderly). These are the general adult thresholds:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface-dim">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        Household Size
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        100% FPL
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        138% FPL (Expansion)
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-text">
                        185% FPL (Pregnancy)
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
                            {size} {size === 1 ? "person" : "people"}
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            ${fpl.toLocaleString()}/yr
                          </td>
                          <td className="px-4 py-3 font-medium text-text">
                            ${Math.round(fpl * 1.38).toLocaleString()}/yr
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            ${Math.round(fpl * 1.85).toLocaleString()}/yr
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-mono text-xs text-text-subtle">
                * Annual income figures. Alaska and Hawaii have higher FPL
                baselines.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                Who Qualifies for Medicaid?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Low-Income Adults (Expansion States)",
                    desc: "Adults 19-64 with income at or below 138% FPL automatically qualify in expansion states. There are no asset tests or work requirements for this group.",
                  },
                  {
                    title: "Children (CHIP or Medicaid)",
                    desc: "Children qualify at much higher income thresholds, typically 200-300% FPL, through Medicaid or the Children's Health Insurance Program (CHIP). Many states cover children up to 400% FPL.",
                  },
                  {
                    title: "Pregnant Individuals",
                    desc: "Pregnancy Medicaid typically covers income up to 185-200% FPL, sometimes higher. Coverage includes prenatal care, delivery, and postpartum care, often extended to 12 months post-delivery.",
                  },
                  {
                    title: "People with Disabilities",
                    desc: "Individuals receiving SSI (Supplemental Security Income) are typically automatically eligible for Medicaid. Those receiving SSDI may qualify after a 24-month waiting period for Medicare, but Medicaid can fill the gap.",
                  },
                  {
                    title: "Elderly Adults (65+)",
                    desc: "Seniors with limited income and assets may qualify for full Medicaid in addition to Medicare. Medicaid covers services Medicare does not, including long-term care and nursing home costs.",
                  },
                  {
                    title: "Non-Expansion State Adults",
                    desc: "Without expansion, coverage depends heavily on your category. Parents with very low income, pregnant individuals, and people with disabilities may still qualify. Childless adults often have no pathway in non-expansion states.",
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
                    q: "What is the income limit for Medicaid in 2026?",
                    a: "In states that expanded Medicaid, adults qualify with incomes up to 138% FPL, about $20,783 per year for a single person in 2026. Non-expansion states set their own thresholds, often much lower.",
                  },
                  {
                    q: "Which states expanded Medicaid?",
                    a: "As of 2026, 41 states and DC have expanded Medicaid. States that have not expanded include Alabama, Florida, Georgia, Kansas, Mississippi, South Carolina, Tennessee, Texas, and Wyoming.",
                  },
                  {
                    q: "How do I apply for Medicaid?",
                    a: "You can apply through your state Medicaid agency, Healthcare.gov during open enrollment, or year-round with a qualifying life event. A Benefind screening guides you directly to your state's application portal.",
                  },
                  {
                    q: "Does pregnancy affect Medicaid eligibility?",
                    a: "Yes. Pregnant individuals typically qualify at higher income thresholds, usually 185-250% FPL. In many states, pregnancy Medicaid is available regardless of immigration status.",
                  },
                  {
                    q: "Can I get Medicaid if I have Medicare?",
                    a: "Yes. Dual-eligible individuals qualify for both. Medicaid covers Medicare premiums, copays, and services Medicare excludes, such as long-term care and dental.",
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
                [Full screening]
              </p>
              <h3 className="mb-2 font-display text-lg font-semibold text-text">
                Get an exact determination
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                This estimator covers the basics. A full Benefind screening
                checks every Medicaid pathway, CHIP, marketplace credits, and
                40+ other programs in one pass.
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                Start your free screening &rarr;
              </Link>
            </div>
          </div>

          {/* Estimator sticky column */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <Card className="border-border bg-surface-dim">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-text">
                    Medicaid Eligibility Estimator
                  </CardTitle>
                  <CardDescription className="text-text-muted">
                    Based on 2026 federal and state Medicaid rules. Estimates
                    only.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="med-state" className="text-sm text-text">
                      State
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
                    {state && (
                      <p className="font-mono text-[11px] text-text-subtle">
                        {EXPANSION_STATES.has(state)
                          ? "Expansion state (138% FPL threshold)"
                          : "Non-expansion state (thresholds vary)"}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="med-household"
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
                        id="med-household"
                        className="border-border bg-surface text-text"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n} {n === 1 ? "person" : "people"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="med-income" className="text-sm text-text">
                      Annual household income ($)
                    </Label>
                    <Input
                      id="med-income"
                      type="number"
                      min={0}
                      placeholder="e.g. 24000"
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Gross income before taxes
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="med-age" className="text-sm text-text">
                      Age (primary applicant)
                    </Label>
                    <Input
                      id="med-age"
                      type="number"
                      min={0}
                      max={120}
                      placeholder="e.g. 34"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
                    <div>
                      <p className="text-sm font-medium text-text">
                        Currently pregnant
                      </p>
                      <p className="font-mono text-[11px] text-text-subtle">
                        Higher income thresholds may apply
                      </p>
                    </div>
                    <Switch
                      checked={isPregnant}
                      onCheckedChange={setIsPregnant}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
                    <div>
                      <p className="text-sm font-medium text-text">
                        Has disability or receives SSI/SSDI
                      </p>
                      <p className="font-mono text-[11px] text-text-subtle">
                        May qualify through disability pathway
                      </p>
                    </div>
                    <Switch
                      checked={hasDisability}
                      onCheckedChange={setHasDisability}
                    />
                  </div>

                  <Button
                    onClick={handleEstimate}
                    className="w-full bg-brand text-white hover:bg-brand-dark"
                  >
                    Check eligibility
                  </Button>

                  {result && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">
                          Result
                        </p>
                        <span
                          className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold ${BADGE_CLASSES[result.badge]}`}
                        >
                          {result.status}
                        </span>
                      </div>
                      <p className="font-display text-xl font-semibold text-text">
                        {result.headline}
                      </p>
                      <p className="text-sm leading-relaxed text-text-muted">
                        {result.detail}
                      </p>
                      {result.stateDetail && (
                        <p className="text-sm leading-relaxed text-text-subtle">
                          {result.stateDetail}
                        </p>
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
                    Estimates only. Rules change frequently. Verify eligibility
                    with your state Medicaid agency.
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
