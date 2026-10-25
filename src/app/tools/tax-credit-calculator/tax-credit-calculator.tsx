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
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";

type NoteKey = "base" | "excess" | "rate" | "noHistory" | "offset" | "cap";

interface RDNote {
  key: NoteKey;
  amount?: number;
}

interface RDResult {
  ascCredit: number;
  payrollOffsetEligible: boolean;
  payrollOffsetAmount: number;
  method: "ASC" | "ASC_NO_HISTORY";
  baseAmount: number;
  excessQREs: number;
  notes: RDNote[];
}

function calculateRDCredit(
  totalQREs: number,
  priorYearAvgQREs: number,
  grossReceipts: number,
  yearsInBusiness: number,
): RDResult {
  const notes: RDNote[] = [];

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
    notes.push({ key: "base", amount: baseAmount });
    notes.push({ key: "excess", amount: excessQREs });
    notes.push({ key: "rate" });
  } else {
    method = "ASC_NO_HISTORY";
    baseAmount = 0;
    excessQREs = totalQREs;
    ascCredit = Math.round(totalQREs * 0.06);
    notes.push({ key: "noHistory" });
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
    notes.push({ key: "offset" });
    if (ascCredit > 500_000) {
      notes.push({ key: "cap" });
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
  const { t } = useI18n();
  const ts = t.tools.shared;
  const tr = t.tools.rd;
  const [rdSpending, setRdSpending] = useState<string>("");
  const [totalQREs, setTotalQREs] = useState<string>("");
  const [grossReceipts, setGrossReceipts] = useState<string>("");
  const [yearsInBusiness, setYearsInBusiness] = useState<string>("");
  const [priorQREs, setPriorQREs] = useState<string>("");
  const [result, setResult] = useState<RDResult | null>(null);

  function handleCalculate() {
    const qre = Math.max(
      0,
      parseFloat(totalQREs) || (parseFloat(rdSpending) || 0) * 0.65 || 0,
    );
    const receipts = Math.max(0, parseFloat(grossReceipts) || 0);
    const years = Math.max(0, parseInt(yearsInBusiness, 10) || 0);
    const avgPrior = Math.max(0, parseFloat(priorQREs) || 0);
    setResult(calculateRDCredit(qre, avgPrior, receipts, years));
  }

  const [offsetBefore = "", offsetAfter = ""] =
    tr.offsetEligibleBody.split("{amount}");

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
            <span className="text-text">{tr.breadcrumb}</span>
          </nav>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
            {tr.eyebrow}
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            {tr.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            {tr.intro}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1520px] px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* SEO content column */}
          <div className="order-2 lg:order-1">
            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tr.whatTitle}
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tr.whatP1}
              </p>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tr.whatP2}
              </p>
              <p className="leading-relaxed text-text-muted">{tr.whatP3}</p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tr.offsetTitle}
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tr.offsetP1}
              </p>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tr.offsetP2}
              </p>
              <div className="rounded-xl border border-brand/20 bg-brand/5 p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand">
                  {tr.exampleEyebrow}
                </p>
                <p className="text-sm leading-relaxed text-text-muted">
                  {tr.exampleBody}
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-text">
                {tr.qreTitle}
              </h2>
              <p className="mb-4 leading-relaxed text-text-muted">
                {tr.qreIntro}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: tr.qualifiesTitle,
                    items: tr.qualifies,
                    positive: true,
                  },
                  {
                    title: tr.notQualifiesTitle,
                    items: tr.notQualifies,
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
                {ts.faqTitle}
              </h2>
              <div className="flex flex-col gap-4">
                {tr.faqs.map((item) => (
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
                {tr.ctaEyebrow}
              </p>
              <h3 className="mb-2 font-display text-lg font-semibold text-text">
                {tr.ctaTitle}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                {tr.ctaBody}
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                {tr.ctaLink}{" "}
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
                    {tr.cardTitle}
                  </CardTitle>
                  <CardDescription className="text-text-muted">
                    {tr.cardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="rd-spending" className="text-sm text-text">
                      {tr.spendingLabel}
                    </Label>
                    <Input
                      id="rd-spending"
                      type="number"
                      min={0}
                      placeholder={fmt(ts.eg, { value: "500000" })}
                      value={rdSpending}
                      onChange={(e) => setRdSpending(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tr.spendingHelp}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="total-qres" className="text-sm text-text">
                      {tr.qresLabel}
                    </Label>
                    <Input
                      id="total-qres"
                      type="number"
                      min={0}
                      placeholder={fmt(ts.eg, { value: "350000" })}
                      value={totalQREs}
                      onChange={(e) => setTotalQREs(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tr.qresHelp}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="prior-qres" className="text-sm text-text">
                      {tr.priorLabel}
                    </Label>
                    <Input
                      id="prior-qres"
                      type="number"
                      min={0}
                      placeholder={tr.priorPlaceholder}
                      value={priorQREs}
                      onChange={(e) => setPriorQREs(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tr.priorHelp}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="gross-receipts"
                      className="text-sm text-text"
                    >
                      {tr.receiptsLabel}
                    </Label>
                    <Input
                      id="gross-receipts"
                      type="number"
                      min={0}
                      placeholder={fmt(ts.eg, { value: "1200000" })}
                      value={grossReceipts}
                      onChange={(e) => setGrossReceipts(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tr.receiptsHelp}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="years-in-business"
                      className="text-sm text-text"
                    >
                      {tr.yearsLabel}
                    </Label>
                    <Input
                      id="years-in-business"
                      type="number"
                      min={0}
                      max={30}
                      placeholder={fmt(ts.eg, { value: "3" })}
                      value={yearsInBusiness}
                      onChange={(e) => setYearsInBusiness(e.target.value)}
                      className="border-border bg-surface text-text"
                    />
                    <p className="font-mono text-[11px] text-text-subtle">
                      {tr.yearsHelp}
                    </p>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-brand text-white hover:bg-brand-dark"
                  >
                    {tr.calculate}
                  </Button>

                  {result && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
                    >
                      <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">
                        {fmt(tr.resultLabel, {
                          method:
                            result.method === "ASC"
                              ? tr.methodAsc
                              : tr.methodNoHistory,
                        })}
                      </p>
                      <p className="font-display text-4xl font-semibold text-brand">
                        <span dir="ltr">
                          ${result.ascCredit.toLocaleString()}
                        </span>
                        <span className="ms-1 font-mono text-sm font-normal text-text-muted">
                          {tr.creditSuffix}
                        </span>
                      </p>

                      {result.payrollOffsetEligible ? (
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                          <p className="mb-1 font-mono text-xs font-semibold text-emerald-400">
                            {tr.offsetEligible}
                          </p>
                          <p className="text-sm text-text-muted">
                            {offsetBefore}
                            <span className="font-semibold text-text" dir="ltr">
                              ${result.payrollOffsetAmount.toLocaleString()}
                            </span>
                            {offsetAfter}
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-border bg-surface-dim p-3">
                          <p className="mb-1 font-mono text-xs text-text-subtle">
                            {tr.offsetNotEligible}
                          </p>
                          <p className="text-sm text-text-muted">
                            {tr.offsetNotEligibleBody}
                          </p>
                        </div>
                      )}

                      <ul className="flex flex-col gap-1">
                        {result.notes.map((note) => (
                          <li
                            key={note.key}
                            className="flex items-start gap-1.5 font-mono text-[11px] text-text-subtle"
                          >
                            <span className="text-brand">·</span>
                            {fmt(tr.notes[note.key], {
                              amount: (note.amount ?? 0).toLocaleString(),
                            })}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/get-started"
                        className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-brand/10 px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
                      >
                        {tr.ctaLink}{" "}
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
                    {tr.disclaimer}
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
