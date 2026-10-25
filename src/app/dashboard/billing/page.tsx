import { requireAuth } from "@/components/auth-guard";
import { createServerSupabase } from "@/lib/supabase/server";
import { getSubscription } from "@/lib/db/billing";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Crown } from "lucide-react";
import { CheckoutButton, PortalButton } from "./buttons";
import { getServerI18n } from "@/lib/i18n/server";
import { fmt } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

export default async function BillingPage() {
  const user = await requireAuth();
  const supabase = await createServerSupabase();
  const { data: subscription } = await getSubscription(supabase, user.id);
  const { t, locale } = await getServerI18n();

  const isActive =
    subscription?.status === "active" || subscription?.status === "trialing";

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.app.billing.title}
        description={t.app.billing.description}
      />

      {isActive ? (
        <ActiveSubscriptionCard
          subscription={subscription!}
          t={t}
          locale={locale}
        />
      ) : (
        <PricingCards t={t} />
      )}
    </div>
  );
}

function ActiveSubscriptionCard({
  subscription,
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
  subscription: {
    status: string;
    current_period_end: string | null;
    cancel_at_period_end: boolean | null;
  };
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <Crown className="h-6 w-6 text-brand" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-text">
            {t.app.billing.premiumPlan}
          </h2>
          <Badge variant="success" className="mt-1 text-xs">
            {t.app.billing.active}
          </Badge>
        </div>
      </div>

      {subscription.current_period_end && (
        <p className="text-sm text-text-muted">
          {fmt(
            subscription.cancel_at_period_end
              ? t.app.billing.cancelsOn
              : t.app.billing.nextBilling,
            {
              date: new Date(
                subscription.current_period_end,
              ).toLocaleDateString(locale, {
                month: "long",
                day: "numeric",
                year: "numeric",
                numberingSystem: "latn",
              }),
            },
          )}
        </p>
      )}

      <PortalButton />
    </Card>
  );
}

function PricingCards({ t }: { t: Dictionary }) {
  const features = [
    t.app.billing.unlimitedScreenings,
    t.app.billing.screeningHistory,
    t.app.billing.documentStorage,
    t.app.billing.rescreenPrefill,
    t.app.billing.prioritySupport,
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Free Tier */}
      <Card className="space-y-4">
        <div>
          <h2 className="font-semibold text-text">{t.app.billing.free}</h2>
          <p className="mt-1 text-3xl font-bold text-text">
            $0
            <span className="text-sm font-normal text-text-muted">
              {t.app.billing.perMonth}
            </span>
          </p>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-text-muted">
            <CheckCircle2
              className="h-4 w-4 text-text-subtle"
              aria-hidden="true"
            />
            {t.app.billing.singleScreening}
          </li>
          <li className="flex items-center gap-2 text-sm text-text-muted">
            <CheckCircle2
              className="h-4 w-4 text-text-subtle"
              aria-hidden="true"
            />
            {t.app.billing.resultsView}
          </li>
        </ul>
        <p className="text-xs text-text-subtle">{t.app.billing.currentPlan}</p>
      </Card>

      {/* Premium Tier */}
      <Card className="space-y-4 border-brand/40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-text">{t.app.billing.premium}</h2>
            <p className="mt-1 text-3xl font-bold text-brand">
              $9
              <span className="text-sm font-normal text-text-muted">
                {t.app.billing.perMonth}
              </span>
            </p>
          </div>
          <Badge variant="brand" className="text-xs">
            <Zap className="me-1 h-3 w-3" aria-hidden="true" />
            {t.app.billing.recommended}
          </Badge>
        </div>
        <ul className="space-y-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-sm text-text-muted"
            >
              <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <CheckoutButton
            priceKey="premium_monthly"
            label={t.app.billing.subscribeMonthly}
          />
          <CheckoutButton
            priceKey="premium_annual"
            label={t.app.billing.subscribeAnnually}
            variant="secondary"
          />
        </div>
      </Card>
    </div>
  );
}
