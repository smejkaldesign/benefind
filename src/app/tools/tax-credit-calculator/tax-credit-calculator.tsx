"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RDResult {
  ascCredit: number;
  payrollOffsetEligible: boolean;
  payrollOffsetAmount: number;
  method: "ASC" | "ASC_NO_HISTORY";
  baseAmount: number;
  excessQREs: number;
  notes: string[];
}

function calculateRDCredit(
  totalQREs: number,
  priorYearAvgQREs: number,
  grossReceipts: number,
  yearsInBusiness: number,
): RDResult {
  const notes: string[] = [];

  // ASC method: 14% of QREs above 50% of avg prior 3-year QREs
  // If no prior QREs, use 6% of current QREs
  let ascCredit: number;
  let baseAmount: number;
  let excessQREs: number;
  let method: "ASC" | "ASC_NO_HISTORY";

  if (priorYearAvgQREs > 0) {
    method = "ASC";
    baseAmount = Math.round(priorYearAvgQREs * 0.5);
    excessQREs = Math.max(0, totalQREs - baseAmount);
    ascCredit = Math.round(excessQREs * 0.14);
    notes.push(
      `Base amount: 50% of avg prior QREs = $${baseAmount.toLocaleString()}`,
    );
    notes.push(`Excess QREs above base: $${excessQREs.toLocaleString()}`);
    notes.push("Credit rate: 14% of excess QREs (ASC method)");
  } else {
    method = "ASC_NO_HISTORY";
    baseAmount = 0;
    excessQREs = totalQREs;
    ascCredit = Math.round(totalQREs * 0.06);
    notes.push(
      "No prior QRE history — using 6% rate for startups with no prior-year QREs",
    );
  }

  // Payroll offset eligibility:
  // < $5M gross receipts AND < 5 years with gross receipts
  const payrollOffsetEligible =
    grossReceipts < 5_000_000 && yearsInBusiness <= 5;
  // Capped at $500,000 per year (as of 2023 PATH Act expansion)
  const payrollOffsetAmount = payrollOffsetEligible
    ? Math.min(ascCredit, 500_000)
    : 0;

  if (payrollOffsetEligible) {
    notes.push(
      "Qualifies for payroll tax offset (< $5M gross receipts, <= 5 years)",
    );
    if (ascCredit > 500_000) {
      notes.push(
        "Payroll offset capped at $500,000; remainder offsets income tax",
      );
    }
  }

  return {
    ascCredit,
    payrollOffsetEligible,
    payrollOffsetAmount,
    method,
    baseAmount,
    excessQREs,
    notes,
  };
}

export function RDTaxCreditCalculator() {
  const [rdSpending, setRdSpending] = useState<string>("");
  const [totalQREs, setTotalQREs] = useState<string>("");
  const [grossReceipts, setGrossReceipts] = useState<string>("");
  const [yearsInBusiness, setYearsInBusiness] = useState<string>("");
  const [priorQREs, setPriorQREs] = useState<string>("");
  const [result, setResult] = useState<RDResult | null>(null);

  function handleCalculate() {
    const qre = parseFloat(totalQREs) || parseFloat(rdSpending) * 0.65 || 0;
    const receipts = parseFloat(grossReceipts) || 0;
    const years = parseInt(yearsInBusiness, 10) || 0;
    const avgPrior = parseFloat(priorQREs) || 0;
    setResult(calculateRDCredit(qre, avgPrior, receipts, years));
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
            <span className="text-text">R&amp;D Tax Credit Calculator</span>
          </nav>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
            [R&amp;D Tax Credit]
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            R&amp;D Tax Credit Calculator 2026
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            Estimate your federal research and development tax credit using the
            Alternative Simplified Credit (ASC) method. Startups under $5M in
            gross receipts may be able to offset payroll taxes directly.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1520px] px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* SEO content column */}
          <div className="order-2 lg:order-1">
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                What Is the R&amp;D Tax Credit?
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                The federal Research and Development tax credit (Section 41 of
                the Internal Revenue Code) allows businesses to receive a
                dollar-for-dollar reduction in federal tax liability for
                qualified research activities. Unlike a deduction, which reduces
                taxable income, a credit directly reduces what you owe.
              </p>
              <p className="mb-4 leading-relaxed text-text-muted">
                The credit was made permanent by the PATH Act of 2015 and
                expanded in 2023 to allow qualifying small businesses to offset
                up to $500,000 per year in payroll taxes. This was a
                game-changer for pre-revenue startups that historically could
                not use the credit because they had no income tax liability.
              </p>
              <p className="leading-relaxed text-text-muted">
                The most common calculation method is the Alternative Simplified
                Credit (ASC), which equals 14% of qualified research expenses
                (QREs) that exceed 50% of the average QREs from the three
                preceding years. Companies without prior QRE history use a
                simplified 6% rate. Most companies prefer the ASC because the
                Regular Credit method requires detailed records going back to
                the mid-1980s.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                The Payroll Tax Offset for Startups
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                Pre-revenue and early-stage companies often have no income tax
                liability, which historically made the R&D credit useless for
                them. The startup payroll offset changes this. If your company
                has less than $5 million in gross receipts and fewer than 5
                years of gross receipts, you can elect to apply your R&D credit
                (up to $500,000) against the employer share of Social Security
                payroll taxes.
              </p>
              <p className="mb-4 leading-relaxed text-text-muted">
                This means every qualifying dollar of R&D spending can generate
                real cash savings, even if your company has never turned a
                profit. For a startup spending $2 million on qualifying
                engineering salaries, this could mean $140,000+ in annual
                payroll tax savings.
              </p>
              <div className="rounded-xl border border-brand/20 bg-brand/5 p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand">
                  [Example]
                </p>
                <p className="text-sm leading-relaxed text-text-muted">
                  A 3-year-old SaaS company with $800K in engineering salaries
                  (75% R&D), $150K in R&D cloud costs, and $1.2M in gross
                  receipts calculates QREs of $750K. With no prior QRE history,
                  the ASC credit is 6% of $750K = $45,000. As a qualifying
                  startup, they apply the full $45,000 against payroll taxes,
                  reducing their quarterly 941 payments by $45,000.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                What Counts as a Qualified Research Expense?
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                Not all R&D spending qualifies. The IRS uses a four-part test to
                determine whether an activity is qualified research: it must be
                undertaken for a permitted purpose (developing or improving a
                business component), be technological in nature, eliminate
                uncertainty, and involve a process of experimentation.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "What Qualifies",
                    items: [
                      "Wages for engineers, scientists, and software developers engaged in qualified activities",
                      "Costs of supplies and materials consumed in research",
                      "65% of payments to third-party contractors for qualified research",
                      "Cloud computing costs used in development and testing (may qualify)",
                      "Software development for new or improved products or processes",
                    ],
                    positive: true,
                  },
                  {
                    title: "What Does Not Qualify",
                    items: [
                      "Management, marketing, and business development activities",
                      "Funded research (if another party pays for it and bears the risk)",
                      "Research after commercial production begins",
                      "Market research, surveys, or social science research",
                      "Research conducted outside the United States",
                    ],
                    positive: false,
                  },
                ].map((group) => (
                  <div
                    key={group.title}
                    className="rounded-xl border border-border bg-surface-dim p-5"
                  >
                    <h3
                      className={`mb-3 font-semibold ${group.positive ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {group.title}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-text-muted"
                        >
                          <span
                            className={`mt-0.5 font-mono text-xs ${group.positive ? "text-emerald-400" : "text-red-400"}`}
                          >
                            {group.positive ? "+" : "-"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
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
                    q: "What is the R&D tax credit?",
                    a: "The federal R&D tax credit (Section 41) lets businesses reduce their tax bill for qualified research expenses. The Alternative Simplified Credit (ASC) equals 14% of QREs above 50% of average prior-year QREs, or 6% if there is no prior history.",
                  },
                  {
                    q: "Who qualifies for the R&D tax credit?",
                    a: "Any US company with qualified research expenses may be eligible. Activities must meet the four-part test: permitted purpose, technological in nature, eliminates uncertainty, and involves experimentation. Software development and engineering commonly qualify.",
                  },
                  {
                    q: "What is the payroll tax offset for startups?",
                    a: "Qualified small businesses with less than $5M in gross receipts and no more than 5 years of gross receipts can apply up to $500,000 of their R&D credit against payroll taxes. This helps pre-revenue companies that have no income tax liability to offset.",
                  },
                  {
                    q: "What counts as a qualified research expense (QRE)?",
                    a: "QREs include wages for employees doing qualified research, supplies consumed in research, and 65% of payments to third-party contractors. Cloud costs may qualify. Management, marketing, and funded research do not qualify.",
                  },
                  {
                    q: "What is the ASC method?",
                    a: "The Alternative Simplified Credit calculates the credit as 14% of QREs above 50% of the average QREs for the prior three years. Companies with no prior QREs use a 6% rate. Most companies prefer ASC because it requires less historical documentation.",
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
                Ready for a detailed R&amp;D analysis?
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                This calculator gives you a ballpark. A full Benefind company
                screening checks R&D credit eligibility alongside 20+ other
                business tax programs.
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                Start company screening &rarr;
              </Link>
            </div>
          </div>

          {/* Calculator sticky column */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <Card className="border-border bg-surface-dim">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-text">
                    R&amp;D Tax Credit Estimator
                  </CardTitle>
                  <CardDescription className="text-text-muted">
                    ASC method estimate. Consult a tax professional for official
                    calculations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="rd-spending" className="text-sm text-text">
                      Annual R&amp;D spending ($)
                    </Label>
                    <Input
                      id="rd-spending"
                      type="number"
                      min={0}
                      placeholder="e.g. 500000"
                      value={rdSpending}
                      onChange={(e) => setRdSpending(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Total R&amp;D budget including salaries, contractors, and
                      supplies
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="total-qres" className="text-sm text-text">
                      Total QREs — Qualified Research Expenses ($)
                    </Label>
                    <Input
                      id="total-qres"
                      type="number"
                      min={0}
                      placeholder="e.g. 350000"
                      value={totalQREs}
                      onChange={(e) => setTotalQREs(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Qualifying wages + supplies + 65% of contractor costs.
                      Leave blank to estimate from spending above.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="prior-qres" className="text-sm text-text">
                      Average QREs — prior 3 years ($)
                    </Label>
                    <Input
                      id="prior-qres"
                      type="number"
                      min={0}
                      placeholder="e.g. 200000 (or 0 if startup)"
                      value={priorQREs}
                      onChange={(e) => setPriorQREs(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Leave blank or 0 if you have no prior QRE history
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="gross-receipts"
                      className="text-sm text-text"
                    >
                      Gross receipts — current year ($)
                    </Label>
                    <Input
                      id="gross-receipts"
                      type="number"
                      min={0}
                      placeholder="e.g. 1200000"
                      value={grossReceipts}
                      onChange={(e) => setGrossReceipts(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Total revenue. Must be under $5M for payroll offset.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="years-in-business"
                      className="text-sm text-text"
                    >
                      Years with gross receipts
                    </Label>
                    <Input
                      id="years-in-business"
                      type="number"
                      min={0}
                      max={30}
                      placeholder="e.g. 3"
                      value={yearsInBusiness}
                      onChange={(e) => setYearsInBusiness(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      Must be 5 or fewer years for payroll offset eligibility
                    </p>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-brand text-white hover:bg-brand-dark"
                  >
                    Calculate my credit
                  </Button>

                  {result && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
                    >
                      <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">
                        Estimated R&amp;D credit (
                        {result.method === "ASC"
                          ? "ASC 14%"
                          : "ASC 6% — no prior history"}
                        )
                      </p>
                      <p className="font-display text-4xl font-semibold text-brand">
                        ${result.ascCredit.toLocaleString()}
                        <span className="ml-1 font-mono text-sm font-normal text-text-muted">
                          credit
                        </span>
                      </p>

                      {result.payrollOffsetEligible ? (
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                          <p className="mb-1 font-mono text-xs font-semibold text-emerald-400">
                            Payroll offset eligible
                          </p>
                          <p className="text-sm text-text-muted">
                            You may apply up to{" "}
                            <span className="font-semibold text-text">
                              ${result.payrollOffsetAmount.toLocaleString()}
                            </span>{" "}
                            against payroll taxes instead of income tax.
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-border bg-surface-dim p-3">
                          <p className="mb-1 font-mono text-xs text-text-subtle">
                            Payroll offset: not eligible
                          </p>
                          <p className="text-sm text-text-muted">
                            Credit applies against income tax liability. Unused
                            credits carry forward 20 years.
                          </p>
                        </div>
                      )}

                      <ul className="flex flex-col gap-1">
                        {result.notes.map((note) => (
                          <li
                            key={note}
                            className="flex items-start gap-1.5 font-mono text-[11px] text-text-subtle"
                          >
                            <span className="text-brand">·</span>
                            {note}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/get-started"
                        className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-brand/10 px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
                      >
                        Start company screening &rarr;
                      </Link>
                    </div>
                  )}

                  <p className="font-mono text-[10px] text-text-subtle">
                    Estimates only. R&D credit calculations require detailed
                    activity analysis. Consult a qualified tax professional
                    before filing.
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
