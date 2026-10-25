"use client";

import Link from "next/link";
import { Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import { PLAN_PRICES, type PlanFamily } from "@/lib/billing/plans";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type GatedFeature = keyof Dictionary["plans"]["gate"]["features"];

interface PremiumGateProps {
  children?: React.ReactNode;
  /** Whether the workspace's entitlements include this feature. */
  allowed: boolean;
  feature: GatedFeature;
  /** premium for personal workspaces, business for company workspaces. */
  plan?: PlanFamily;
  /** Signed-out visitors are sent to sign in first, then to billing. */
  signedIn?: boolean;
  compact?: boolean;
}

/**
 * Renders children when the feature is allowed, otherwise an upgrade prompt
 * that links to the billing page. The decision must come from server-side
 * entitlements; this component only controls what is shown.
 */
export function PremiumGate({
  children,
  allowed,
  feature,
  plan = "premium",
  signedIn = true,
  compact = false,
}: PremiumGateProps) {
  const { t } = useI18n();
  if (allowed) {
    return <>{children}</>;
  }

  const g = t.plans.gate;
  const prices = PLAN_PRICES[plan];
  // SECURITY: do NOT render children for users without access. Hidden
  // content would still be in the DOM.
  return (
    <div
      className={`rounded-xl border border-brand/20 bg-surface-dim text-center ${compact ? "p-5" : "p-8"}`}
    >
      <Lock className="mx-auto mb-3 h-8 w-8 text-brand" aria-hidden="true" />
      <h3 className="font-semibold text-text">
        {plan === "business" ? g.businessTitle : g.premiumTitle}
      </h3>
      <p className="mt-2 text-sm text-text-muted">
        {fmt(plan === "business" ? g.businessBody : g.premiumBody, {
          feature: g.features[feature],
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
          {signedIn ? g.viewPlans : g.signedOutCta}
        </Button>
      </Link>
    </div>
  );
}
