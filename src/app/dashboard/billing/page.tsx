import { requireAuth } from "@/components/auth-guard";
import { createServerSupabase } from "@/lib/supabase/server";
import { getSubscription } from "@/lib/db/billing";
import { getWorkspaceAccess } from "@/lib/billing/workspace-access";
import { PLAN_PRICES, planFamilyFor } from "@/lib/billing/plans";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Crown, AlertTriangle } from "lucide-react";
import { CheckoutButton, PortalButton } from "./buttons";
import { getServerI18n } from "@/lib/i18n/server";
import { fmt } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import type { Tables } from "@/types/database";

type BillingMessages = Dictionary["plans"]["billing"];
type ErrorCode = keyof BillingMessages["errors"];

const LIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    canceled?: string;
    error?: string;
  }>;
}) {
  const user = await requireAuth();
  const supabase = await createServerSupabase();
  const [{ data: subscription }, access, params, { t, locale }] =
    await Promise.all([
      getSubscription(supabase, user.id),
      getWorkspaceAccess(supabase, user.id),
      searchParams,
      getServerI18n(),
    ]);
  const b = t.plans.billing;

  const family = planFamilyFor(access?.workspace.type ?? "individual");
  const paid = access?.entitlements.paid ?? false;
  const liveSubscription =
    subscription && LIVE_STATUSES.has(subscription.status)
      ? subscription
      : null;
  const errorMessage =
    params.error && params.error in b.errors
      ? b.errors[params.error as ErrorCode]
      : null;

  return (
    <div className="space-y-6">
      <PageHeader title={b.title} description={b.description} />

      {params.success === "true" && (
        <Notice tone="success">{b.notices.success}</Notice>
      )}
      {params.canceled === "true" && <Notice>{b.notices.canceled}</Notice>}
      {errorMessage && <Notice tone="error">{errorMessage}</Notice>}

      {paid ? (
        <PaidPlanCard
          family={family}
          subscription={liveSubscription}
          b={b}
          locale={locale}
        />
      ) : (
        <PricingCards family={family} b={b} />
      )}
    </div>
  );
}

function Notice({
  tone = "default",
  children,
}: {
  tone?: "default" | "success" | "error";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "success"
      ? "border-success/40 bg-success/5"
      : tone === "error"
        ? "border-error/40 bg-error/5"
        : "border-border bg-surface-dim";
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-lg border px-4 py-3 text-sm text-text ${toneClass}`}
    >
      {children}
    </p>
  );
}

function FeatureList({
  features,
  muted = false,
}: {
  features: string[];
  muted?: boolean;
}) {
  return (
    <ul className="space-y-2">
      {features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-sm text-text-muted">
          <CheckCircle2
            className={`h-4 w-4 shrink-0 ${muted ? "text-text-subtle" : "text-brand"}`}
            aria-hidden="true"
          />
          {f}
        </li>
      ))}
    </ul>
  );
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    numberingSystem: "latn",
  });
}

function PaidPlanCard({
  family,
  subscription,
  b,
  locale,
}: {
  family: "premium" | "business";
  subscription: Tables<"subscriptions"> | null;
  b: BillingMessages;
  locale: Locale;
}) {
  const features =
    family === "business" ? b.features.business : b.features.personalPremium;
  const status = subscription?.status ?? "active";

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <Crown className="h-6 w-6 text-brand" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-text">
            {family === "business" ? b.business : b.premium}
          </h2>
          <Badge
            variant={status === "past_due" ? "warning" : "success"}
            className="mt-1 text-xs"
          >
            {b.statuses[status]}
          </Badge>
        </div>
      </div>

      <FeatureList features={features} />

      {subscription?.current_period_end ? (
        <p className="text-sm text-text-muted">
          {fmt(subscription.cancel_at_period_end ? b.cancelsOn : b.renewsOn, {
            date: formatDate(subscription.current_period_end, locale),
          })}
        </p>
      ) : (
        !subscription && (
          <p className="text-sm text-text-muted">{b.compedNote}</p>
        )
      )}

      {status === "past_due" && (
        <p className="flex items-start gap-2 text-sm text-text-muted">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0 text-warning"
            aria-hidden="true"
          />
          {b.pastDueNote}
        </p>
      )}

      {subscription?.stripe_customer_id && <PortalButton />}
    </Card>
  );
}

function PricingCards({
  family,
  b,
}: {
  family: "premium" | "business";
  b: BillingMessages;
}) {
  const prices = PLAN_PRICES[family];
  const isBusiness = family === "business";

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
        {isBusiness ? b.plansForBusiness : b.plansForPersonal}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-4">
          <div>
            <h3 className="font-semibold text-text">{b.free}</h3>
            <p className="mt-1 text-3xl font-bold text-text" dir="ltr">
              $0
            </p>
          </div>
          <FeatureList
            features={
              isBusiness ? b.features.businessFree : b.features.personalFree
            }
            muted
          />
          <p className="text-xs text-text-subtle">{b.currentPlan}</p>
        </Card>

        <Card className="space-y-4 border-brand/40">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-text">
                {isBusiness ? b.business : b.premium}
              </h3>
              <p className="mt-1 text-3xl font-bold text-brand">
                <span dir="ltr">${prices.monthly}</span>
                <span className="text-sm font-normal text-text-muted">
                  {b.perMonth}
                </span>
              </p>
              <p className="mt-1 text-xs text-text-muted">
                {fmt(b.annualOption, { price: prices.annual })}
              </p>
            </div>
            <Badge variant="brand" className="text-xs">
              <Zap className="me-1 h-3 w-3" aria-hidden="true" />
              {b.recommended}
            </Badge>
          </div>
          <FeatureList
            features={
              isBusiness ? b.features.business : b.features.personalPremium
            }
          />
          <div className="space-y-2">
            <CheckoutButton
              priceKey={`${family}_monthly`}
              label={fmt(b.subscribeMonthly, { price: prices.monthly })}
            />
            <CheckoutButton
              priceKey={`${family}_annual`}
              label={fmt(b.subscribeAnnually, { price: prices.annual })}
              variant="secondary"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
