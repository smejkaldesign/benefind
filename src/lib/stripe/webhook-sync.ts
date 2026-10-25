import type Stripe from "stripe";
import type { Database } from "@/types/database";
import type { WorkspaceTier } from "@/lib/billing/entitlements";

export type DbSubscriptionStatus =
  Database["public"]["Enums"]["subscription_status"];

export interface SubscriptionFields {
  stripe_subscription_id: string;
  status: DbSubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
}

type DbResult = { error: { message: string } | null };

export interface WebhookStore {
  /** Insert or replace the user's subscription row (unique on user_id). */
  upsertSubscriptionForUser(
    row: SubscriptionFields & { user_id: string; stripe_customer_id: string },
  ): PromiseLike<DbResult>;
  /** Update the row for a Stripe subscription. Matching no rows is not an error. */
  updateSubscription(
    stripeSubscriptionId: string,
    fields: Omit<SubscriptionFields, "stripe_subscription_id">,
  ): PromiseLike<DbResult>;
  setWorkspaceTier(
    workspaceId: string,
    tier: WorkspaceTier,
  ): PromiseLike<DbResult>;
}

export interface WebhookDeps {
  store: WebhookStore;
  retrieveSubscription(id: string): Promise<Stripe.Subscription>;
}

export interface WebhookOutcome {
  status: 200 | 500;
  error?: string;
}

/** Statuses that keep paid features on. past_due keeps access while Stripe retries the card. */
const PAID_STATUSES = new Set<Stripe.Subscription.Status>([
  "active",
  "trialing",
  "past_due",
]);

/**
 * Maps a Stripe subscription status to the stored status and workspace tier.
 * Stripe's "paused" (a trial that ended without a payment method) is not in
 * the subscription_status enum, so it is stored as "unpaid": both mean the
 * subscription exists but is not being paid, and both give the free tier.
 */
export function mapSubscriptionStatus(status: Stripe.Subscription.Status): {
  status: DbSubscriptionStatus;
  tier: WorkspaceTier;
} {
  const tier: WorkspaceTier = PAID_STATUSES.has(status) ? "premium" : "free";
  if (status === "paused") return { status: "unpaid", tier };
  return { status, tier };
}

function toIso(seconds: number | null | undefined): string | null {
  return typeof seconds === "number"
    ? new Date(seconds * 1000).toISOString()
    : null;
}

/**
 * Billing period of a subscription. Since API version 2025-03-31 the period
 * fields live on each subscription item, not on the subscription. With one
 * item (our case) this is that item's period; with several it spans them.
 */
export function subscriptionPeriod(subscription: Stripe.Subscription): {
  start: string | null;
  end: string | null;
} {
  const items = subscription.items?.data ?? [];
  const starts = items
    .map((i) => i.current_period_start)
    .filter((n): n is number => typeof n === "number");
  const ends = items
    .map((i) => i.current_period_end)
    .filter((n): n is number => typeof n === "number");
  return {
    start: starts.length ? toIso(Math.min(...starts)) : null,
    end: ends.length ? toIso(Math.max(...ends)) : null,
  };
}

export function subscriptionFields(
  subscription: Stripe.Subscription,
): SubscriptionFields {
  const { start, end } = subscriptionPeriod(subscription);
  return {
    stripe_subscription_id: subscription.id,
    status: mapSubscriptionStatus(subscription.status).status,
    current_period_start: start,
    current_period_end: end,
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    canceled_at: toIso(subscription.canceled_at),
  };
}

function idOf(
  value: string | { id: string } | null | undefined,
): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

/**
 * Applies a verified Stripe event to the database. Returns 500 when a write
 * fails so Stripe retries the event; events we do not handle return 200.
 * The workspace tier only changes for the workspace named in metadata.
 */
export async function handleStripeEvent(
  event: Stripe.Event,
  deps: WebhookDeps,
): Promise<WebhookOutcome> {
  switch (event.type) {
    case "checkout.session.completed":
      return handleCheckoutCompleted(event.data.object, deps);
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      return handleSubscriptionChange(event.data.object, deps);
    default:
      return { status: 200 };
  }
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  { store, retrieveSubscription }: WebhookDeps,
): Promise<WebhookOutcome> {
  if (session.mode !== "subscription") return { status: 200 };

  const userId = session.metadata?.user_id;
  const subscriptionId = idOf(session.subscription);
  const customerId = idOf(session.customer);
  if (!userId || !subscriptionId || !customerId) {
    // Retrying cannot fix a session that lacks these fields.
    console.error("Checkout session missing metadata", session.id);
    return { status: 200 };
  }

  let subscription: Stripe.Subscription;
  try {
    subscription = await retrieveSubscription(subscriptionId);
  } catch {
    return { status: 500, error: "subscription_retrieve_failed" };
  }

  const { error } = await store.upsertSubscriptionForUser({
    user_id: userId,
    stripe_customer_id: customerId,
    ...subscriptionFields(subscription),
  });
  if (error) return { status: 500, error: "subscription_upsert_failed" };

  const workspaceId =
    session.metadata?.workspace_id ?? subscription.metadata?.workspace_id;
  if (workspaceId) {
    const { error: tierError } = await store.setWorkspaceTier(
      workspaceId,
      mapSubscriptionStatus(subscription.status).tier,
    );
    if (tierError) return { status: 500, error: "workspace_tier_failed" };
  }

  return { status: 200 };
}

async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  { store }: WebhookDeps,
): Promise<WebhookOutcome> {
  const { stripe_subscription_id, ...fields } =
    subscriptionFields(subscription);
  const { error } = await store.updateSubscription(
    stripe_subscription_id,
    fields,
  );
  if (error) return { status: 500, error: "subscription_update_failed" };

  const workspaceId = subscription.metadata?.workspace_id;
  if (!workspaceId) {
    console.error(
      "Subscription missing workspace_id metadata",
      subscription.id,
    );
    return { status: 200 };
  }

  const { error: tierError } = await store.setWorkspaceTier(
    workspaceId,
    mapSubscriptionStatus(subscription.status).tier,
  );
  if (tierError) return { status: 500, error: "workspace_tier_failed" };

  return { status: 200 };
}
