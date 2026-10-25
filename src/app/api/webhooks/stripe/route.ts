import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { createServiceClient } from "@/lib/supabase/server";
import {
  handleStripeEvent,
  type WebhookStore,
} from "@/lib/stripe/webhook-sync";
import type Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const store: WebhookStore = {
    upsertSubscriptionForUser: (row) =>
      supabase.from("subscriptions").upsert(row, { onConflict: "user_id" }),
    updateSubscription: (stripeSubscriptionId, fields) =>
      supabase
        .from("subscriptions")
        .update(fields)
        .eq("stripe_subscription_id", stripeSubscriptionId),
    setWorkspaceTier: (workspaceId, tier) =>
      supabase.from("workspaces").update({ tier }).eq("id", workspaceId),
  };

  let outcome;
  try {
    outcome = await handleStripeEvent(event, {
      store,
      retrieveSubscription: (id) => getStripe().subscriptions.retrieve(id),
    });
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  if (outcome.status === 500) {
    console.error(`Error handling ${event.type}: ${outcome.error}`);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
