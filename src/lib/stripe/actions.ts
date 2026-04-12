"use server";

import { stripe } from "./client";
import { createServerSupabase } from "@/lib/supabase/server";
import { getSubscription } from "@/lib/db/billing";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3010";

// Stub price IDs: Eric will configure real prices later
const PRICE_IDS = {
  premium_monthly:
    process.env.STRIPE_PRICE_PREMIUM_MONTHLY ?? "price_stub_monthly",
  premium_annual:
    process.env.STRIPE_PRICE_PREMIUM_ANNUAL ?? "price_stub_annual",
};

/**
 * Create a Stripe Checkout session for a workspace subscription.
 */
export async function createCheckoutSession(
  priceKey: "premium_monthly" | "premium_annual",
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;
  if (!workspaceId) throw new Error("No workspace selected");

  // Check if user already has a Stripe customer ID
  const { data: existingSub } = await getSubscription(supabase, user.id);
  let customerId = existingSub?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        supabase_user_id: user.id,
        workspace_id: workspaceId,
      },
    });
    customerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: PRICE_IDS[priceKey], quantity: 1 }],
    success_url: `${APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      workspace_id: workspaceId,
      user_id: user.id,
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}

/**
 * Create a Stripe Customer Portal session for managing subscriptions.
 */
export async function createPortalSession() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: portalSub } = await getSubscription(supabase, user.id);
  const portalCustomerId = portalSub?.stripe_customer_id;
  if (!portalCustomerId) {
    throw new Error("No subscription found");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: portalCustomerId,
    return_url: `${APP_URL}/dashboard/billing`,
  });

  redirect(session.url);
}
