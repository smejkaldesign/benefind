"use server";

import { getStripe } from "./client";
import { createServerSupabase } from "@/lib/supabase/server";
import { getSubscription } from "@/lib/db/billing";
import { listWorkspacesForUser } from "@/lib/db/workspaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3010";

// Stub price IDs: Eric will configure real prices later.
// Throws at checkout time if stubs are still in place.
const PRICE_IDS = {
  premium_monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
  premium_annual: process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
};

/**
 * Verify the authenticated user is a member of the workspace from the cookie.
 * Returns the verified workspace ID or throws.
 */
async function verifyWorkspaceMembership(
  supabase: Awaited<ReturnType<typeof createServerSupabase>>,
  userId: string,
): Promise<string> {
  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;
  if (!workspaceId) throw new Error("No workspace selected");

  const { data: memberships } = await listWorkspacesForUser(supabase, userId);
  const isMember = memberships?.some((m) => m.workspace_id === workspaceId);
  if (!isMember) throw new Error("Not a member of this workspace");

  return workspaceId;
}

/**
 * Create a Stripe Checkout session for a workspace subscription.
 */
export async function createCheckoutSession(
  priceKey: "premium_monthly" | "premium_annual",
) {
  const priceId = PRICE_IDS[priceKey];
  if (!priceId) {
    throw new Error(
      `Stripe price not configured: STRIPE_PRICE_${priceKey.toUpperCase()} env var is missing`,
    );
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // SECURITY: verify workspace membership before creating checkout
  const workspaceId = await verifyWorkspaceMembership(supabase, user.id);

  const { data: existingSub } = await getSubscription(supabase, user.id);
  let customerId = existingSub?.stripe_customer_id;

  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: user.email,
      metadata: {
        supabase_user_id: user.id,
        workspace_id: workspaceId,
      },
    });
    customerId = customer.id;
  }

  const session = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
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

  // SECURITY: verify workspace membership
  await verifyWorkspaceMembership(supabase, user.id);

  const { data: portalSub } = await getSubscription(supabase, user.id);
  const portalCustomerId = portalSub?.stripe_customer_id;
  if (!portalCustomerId) {
    throw new Error("No subscription found");
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: portalCustomerId,
    return_url: `${APP_URL}/dashboard/billing`,
  });

  redirect(session.url);
}
