import { requireAuth } from "@/components/auth-guard";
import { createServerSupabase } from "@/lib/supabase/server";
import { getSubscription } from "@/lib/db/billing";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Crown } from "lucide-react";
import { CheckoutButton, PortalButton } from "./buttons";

export default async function BillingPage() {
  const user = await requireAuth();
  const supabase = await createServerSupabase();
  const { data: subscription } = await getSubscription(supabase, user.id);

  const isActive =
    subscription?.status === "active" || subscription?.status === "trialing";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage your subscription and billing."
      />

      {isActive ? (
        <ActiveSubscriptionCard subscription={subscription!} />
      ) : (
        <PricingCards />
      )}
    </div>
  );
}

function ActiveSubscriptionCard({
  subscription,
}: {
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
          <h2 className="font-semibold text-text">Premium Plan</h2>
          <Badge variant="success" className="mt-1 text-xs">
            Active
          </Badge>
        </div>
      </div>

      {subscription.current_period_end && (
        <p className="text-sm text-text-muted">
          {subscription.cancel_at_period_end
            ? "Cancels on "
            : "Next billing date: "}
          {new Date(subscription.current_period_end).toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" },
          )}
        </p>
      )}

      <PortalButton />
    </Card>
  );
}

function PricingCards() {
  const features = [
    "Unlimited screenings",
    "Screening history",
    "Document storage",
    "Re-screening with pre-fill",
    "Priority support",
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Free Tier */}
      <Card className="space-y-4">
        <div>
          <h2 className="font-semibold text-text">Free</h2>
          <p className="mt-1 text-3xl font-bold text-text">
            $0<span className="text-sm font-normal text-text-muted">/mo</span>
          </p>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-text-muted">
            <CheckCircle2
              className="h-4 w-4 text-text-subtle"
              aria-hidden="true"
            />
            Single screening
          </li>
          <li className="flex items-center gap-2 text-sm text-text-muted">
            <CheckCircle2
              className="h-4 w-4 text-text-subtle"
              aria-hidden="true"
            />
            Results view
          </li>
        </ul>
        <p className="text-xs text-text-subtle">Your current plan</p>
      </Card>

      {/* Premium Tier */}
      <Card className="space-y-4 border-brand/40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-text">Premium</h2>
            <p className="mt-1 text-3xl font-bold text-brand">
              $9
              <span className="text-sm font-normal text-text-muted">/mo</span>
            </p>
          </div>
          <Badge variant="brand" className="text-xs">
            <Zap className="mr-1 h-3 w-3" aria-hidden="true" />
            Recommended
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
            label="Subscribe Monthly"
          />
          <CheckoutButton
            priceKey="premium_annual"
            label="Subscribe Annually ($89/yr)"
            variant="secondary"
          />
        </div>
      </Card>
    </div>
  );
}
