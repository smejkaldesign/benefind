"use client";

import Link from "next/link";
import { Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";

interface PremiumGateProps {
  children: React.ReactNode;
  /** Whether the user has premium access. */
  isPremium: boolean;
  /** Feature name for the upgrade CTA. */
  feature?: string;
}

/**
 * Wraps premium-only content. Shows an upgrade CTA if the user is on
 * the free tier, otherwise renders children.
 */
export function PremiumGate({
  children,
  isPremium,
  feature,
}: PremiumGateProps) {
  const { t } = useI18n();
  if (isPremium) {
    return <>{children}</>;
  }

  // SECURITY: do NOT render children for free users. Sensitive data
  // (benefit amounts, screening results) would be in the DOM even if
  // visually hidden behind a blur overlay.
  return (
    <div className="rounded-xl border border-brand/20 bg-surface-dim p-8 text-center">
      <Lock className="mx-auto mb-3 h-8 w-8 text-brand" aria-hidden="true" />
      <h3 className="font-semibold text-text">{t.app.premiumGate.title}</h3>
      <p className="mt-2 text-sm text-text-muted">
        {fmt(t.app.premiumGate.body, {
          feature: feature ?? t.app.premiumGate.defaultFeature,
        })}
      </p>
      <Link href="/dashboard/billing" className="mt-4 inline-block">
        <Button size="default">
          <Crown className="h-4 w-4" aria-hidden="true" />
          {t.app.premiumGate.viewPlans}
        </Button>
      </Link>
    </div>
  );
}
