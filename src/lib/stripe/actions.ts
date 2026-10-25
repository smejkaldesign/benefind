"use server";

import { getStripe } from "./client";
import { createServerSupabase } from "@/lib/supabase/server";
import { getSubscription } from "@/lib/db/billing";
import { getWorkspaceAccess } from "@/lib/billing/workspace-access";
import { selectPrice } from "@/lib/billing/plans";
import { redirect } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3010";

const LIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

function billingError(code: string): never {
  redirect(`/dashboard/billing?error=${code}`);
}

/**
 * Create a Stripe Checkout session for the active workspace. The price must
 * belong to the plan for the workspace type (premium for personal, business
 * for company); anything else is rejected here, not only hidden in the UI.
 */
export async function createCheckoutSession(priceKey: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/dashboard/billing");

  // SECURITY: membership is verified against the database, not the cookie.
  const access = await getWorkspaceAccess(supabase, user.id);
  if (!access) billingError("no_workspace");
  const { workspace } = access;

  const selection = selectPrice(workspace.type, priceKey, process.env);
  if (!selection.ok) {
    console.error("Checkout rejected:", selection.error);
    billingError(
      selection.error === "price_not_configured"
        ? "unavailable"
        : selection.error,
    );
  }

  // subscriptions has one row per user, so a user holds one paid plan at a time.
  const { data: existingSub } = await getSubscription(supabase, user.id);
  if (
    workspace.tier === "premium" ||
    (existingSub && LIVE_STATUSES.has(existingSub.status))
  ) {
    billingError("already_subscribed");
  }

  let customerId = existingSub?.stripe_customer_id;
  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: user.email,
      metadata: {
        supabase_user_id: user.id,
        workspace_id: workspace.id,
      },
    });
    customerId = customer.id;
  }

  const metadata = { workspace_id: workspace.id, user_id: user.id };
  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: selection.priceId, quantity: 1 }],
    success_url: `${APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${APP_URL}/dashboard/billing?canceled=true`,
    client_reference_id: user.id,
    metadata,
    subscription_data: { metadata },
  });

  if (!session.url) billingError("unavailable");
  redirect(session.url);
}

/**
 * Create a Stripe Customer Portal session for managing subscriptions.
 */
export async function createPortalSession() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/dashboard/billing");

  // SECURITY: verify workspace membership
  const access = await getWorkspaceAccess(supabase, user.id);
  if (!access) billingError("no_workspace");

  const { data: portalSub } = await getSubscription(supabase, user.id);
  const portalCustomerId = portalSub?.stripe_customer_id;
  if (!portalCustomerId) billingError("no_subscription");

  const session = await getStripe().billingPortal.sessions.create({
    customer: portalCustomerId,
    return_url: `${APP_URL}/dashboard/billing`,
  });

  redirect(session.url);
}
