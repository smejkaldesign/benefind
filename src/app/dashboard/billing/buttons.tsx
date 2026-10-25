"use client";

import { Button } from "@/components/ui/button";
import {
  createCheckoutSession,
  createPortalSession,
} from "@/lib/stripe/actions";
import type { PriceKey } from "@/lib/billing/plans";
import { Settings } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function CheckoutButton({
  priceKey,
  label,
  variant = "default",
}: {
  priceKey: PriceKey;
  label: string;
  variant?: "default" | "secondary";
}) {
  return (
    <form action={() => createCheckoutSession(priceKey)}>
      <Button type="submit" variant={variant} className="w-full">
        {label}
      </Button>
    </form>
  );
}

export function PortalButton() {
  const { t } = useI18n();
  return (
    <form action={() => createPortalSession()}>
      <Button type="submit" variant="secondary">
        <Settings className="h-4 w-4" aria-hidden="true" />
        {t.plans.billing.manageSubscription}
      </Button>
    </form>
  );
}
