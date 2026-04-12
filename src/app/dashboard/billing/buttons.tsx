"use client";

import { Button } from "@/components/ui/button";
import {
  createCheckoutSession,
  createPortalSession,
} from "@/lib/stripe/actions";
import { Settings } from "lucide-react";

export function CheckoutButton({
  priceKey,
  label,
  variant = "default",
}: {
  priceKey: "premium_monthly" | "premium_annual";
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
  return (
    <form action={() => createPortalSession()}>
      <Button type="submit" variant="secondary">
        <Settings className="h-4 w-4" aria-hidden="true" />
        Manage Subscription
      </Button>
    </form>
  );
}
