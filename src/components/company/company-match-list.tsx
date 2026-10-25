"use client";

import Link from "next/link";
import {
  ExternalLink,
  Receipt,
  Landmark,
  Award,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Lock,
  Crown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import { PLAN_PRICES } from "@/lib/billing/plans";
import type { CompanyMatchView } from "@/lib/billing/company-matches";
import type { CompanyProgramCategory } from "@/lib/benefits/company-types";

const CATEGORY_ICONS: Record<
  CompanyProgramCategory,
  React.ComponentType<{ className?: string }>
> = {
  "tax-credit": Receipt,
  grant: Landmark,
  incentive: Award,
  contracting: FileCheck,
};

const CATEGORY_ORDER: CompanyProgramCategory[] = [
  "tax-credit",
  "grant",
  "incentive",
  "contracting",
];

const STATUS_VARIANTS: Record<string, "success" | "warning" | "default"> = {
  active: "success",
  paused: "warning",
  expired: "default",
};

/**
 * Matched company programs grouped by category. Programs without details
 * (no Business plan) show only their name and a locked row, plus one
 * upgrade prompt above the list.
 */
export function CompanyMatchList({
  matches,
  signedIn,
}: {
  matches: CompanyMatchView[];
  signedIn: boolean;
}) {
  const { t } = useI18n();
  const c = t.company;
  const locked = matches.some((m) => m.details === null);

  return (
    <div className="space-y-8">
      {locked && <LockedBanner count={matches.length} signedIn={signedIn} />}

      {CATEGORY_ORDER.map((cat) => {
        const items = matches.filter((m) => m.category === cat);
        if (items.length === 0) return null;
        const Icon = CATEGORY_ICONS[cat];

        return (
          <section key={cat}>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-text">
                {c.results.categories[cat]} ({items.length})
              </h2>
            </div>
            <div className="space-y-3">
              {items.map((m) =>
                m.details ? (
                  <DetailedMatch key={m.id} match={m} details={m.details} />
                ) : (
                  <Card
                    key={m.id}
                    className="flex-row items-center justify-between gap-3"
                  >
                    <h3 className="font-semibold text-text">{m.shortName}</h3>
                    <span className="flex shrink-0 items-center gap-1.5 text-xs text-text-muted">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.plans.companyLock.locked}
                    </span>
                  </Card>
                ),
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function LockedBanner({
  count,
  signedIn,
}: {
  count: number;
  signedIn: boolean;
}) {
  const { t } = useI18n();
  const l = t.plans.companyLock;
  const prices = PLAN_PRICES.business;
  return (
    <div className="rounded-xl border border-brand/20 bg-surface-dim p-6 text-center">
      <Lock className="mx-auto mb-3 h-7 w-7 text-brand" aria-hidden="true" />
      <h2 className="font-semibold text-text">{l.title}</h2>
      <p className="mt-2 text-sm text-text-muted">
        {fmt(count === 1 ? l.bodyOne : l.bodyOther, {
          count,
          monthly: prices.monthly,
          annual: prices.annual,
        })}
      </p>
      <Link
        href={
          signedIn
            ? "/dashboard/billing"
            : "/auth/login?next=/dashboard/billing"
        }
        className="mt-4 inline-block"
      >
        <Button size="default">
          <Crown className="h-4 w-4" aria-hidden="true" />
          {signedIn ? t.plans.gate.viewPlans : t.plans.gate.signedOutCta}
        </Button>
      </Link>
    </div>
  );
}

function DetailedMatch({
  match,
  details,
}: {
  match: CompanyMatchView;
  details: NonNullable<CompanyMatchView["details"]>;
}) {
  const { t } = useI18n();
  const c = t.company;
  const statusLabel =
    c.results.statuses[details.status as keyof typeof c.results.statuses];

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-text">{match.shortName}</h3>
          <p className="text-xs text-text-subtle">{details.agency}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {details.estimatedValue && (
            <Badge variant="success">{details.estimatedValue}</Badge>
          )}
          <Badge variant={STATUS_VARIANTS[details.status] ?? "default"}>
            {statusLabel ?? details.status}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-text-muted">{details.description}</p>

      {details.whyYouQualify.length > 0 && (
        <div className="space-y-1 rounded-lg bg-brand/10 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {c.results.whyYouQualify}
          </p>
          {details.whyYouQualify.map((reason, i) => (
            <div
              key={i}
              className="flex items-start gap-1.5 text-sm text-text-muted"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              {reason}
            </div>
          ))}
        </div>
      )}

      {details.deadlineInfo &&
        (details.status !== "active" ? (
          <div className="flex items-start gap-1.5 rounded-lg bg-yellow-500/5 px-3 py-2">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-500" />
            <p className="text-xs text-yellow-700">{details.deadlineInfo}</p>
          </div>
        ) : (
          <div className="flex items-start gap-1.5 text-xs text-text-subtle">
            <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {details.deadlineInfo}
          </div>
        ))}

      {details.nextSteps.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {c.results.nextSteps}
          </p>
          {details.nextSteps.map((step, i) => (
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

      {details.applicationUrl && (
        <a
          href={details.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark"
        >
          {t.common.learnMore} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </Card>
  );
}
