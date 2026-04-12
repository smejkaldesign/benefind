import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createServiceClient } from "@/lib/supabase/server";
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
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const supabase = createServiceClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        await handleCheckoutComplete(supabase, session);
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        await handleSubscriptionChange(supabase, subscription);
        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutComplete(supabase: any, session: any) {
  const userId = session.metadata?.user_id;
  const workspaceId = session.metadata?.workspace_id;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!userId || !subscriptionId) {
    console.error("Checkout session missing metadata", session.id);
    return;
  }

  // Upsert subscription record
  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscriptionId,
      status: "active",
    },
    { onConflict: "user_id" },
  );

  if (error) {
    console.error("Failed to upsert subscription:", error.message);
  }

  // Upgrade workspace tier if workspace ID provided
  if (workspaceId) {
    await supabase
      .from("workspaces")
      .update({ tier: "premium" })
      .eq("id", workspaceId);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionChange(supabase: any, subscription: any) {
  const status = subscription.status as string;

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status,
      cancel_at_period_end: subscription.cancel_at_period_end ?? false,
      canceled_at: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000).toISOString()
        : null,
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error("Failed to update subscription:", error.message);
  }

  // Downgrade workspace if subscription ended
  if (status === "canceled" || status === "unpaid") {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", subscription.id)
      .single();

    if (sub?.user_id) {
      // Find workspaces owned by this user and downgrade
      await supabase
        .from("workspaces")
        .update({ tier: "free" })
        .eq("owner_user_id", sub.user_id);
    }
  }
}
