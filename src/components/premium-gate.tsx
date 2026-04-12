"use client";

import Link from "next/link";
import { Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  feature = "this feature",
}: PremiumGateProps) {
  if (isPremium) {
    return <>{children}</>;
  }

  // SECURITY: do NOT render children for free users. Sensitive data
  // (benefit amounts, screening results) would be in the DOM even if
  // visually hidden behind a blur overlay.
  return (
    <div className="rounded-xl border border-brand/20 bg-surface-dim p-8 text-center">
      <Lock className="mx-auto mb-3 h-8 w-8 text-brand" aria-hidden="true" />
      <h3 className="font-semibold text-text">Upgrade to Premium</h3>
      <p className="mt-2 text-sm text-text-muted">
        {feature} is available on the Premium plan. Upgrade to unlock unlimited
        screenings, document storage, and more.
      </p>
      <Link href="/dashboard/billing" className="mt-4 inline-block">
        <Button size="default">
          <Crown className="h-4 w-4" aria-hidden="true" />
          View Plans
        </Button>
      </Link>
    </div>
  );
}
