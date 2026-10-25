import { describe, it, expect, vi } from "vitest";
import type Stripe from "stripe";
import {
  handleStripeEvent,
  mapSubscriptionStatus,
  subscriptionFields,
  type WebhookStore,
} from "../webhook-sync";

const WS = "11111111-1111-4111-8111-111111111111";
const USER = "22222222-2222-4222-8222-222222222222";
const START = 1_793_000_000;
const END = 1_795_592_000;

function subscription(
  overrides: Partial<Stripe.Subscription> = {},
): Stripe.Subscription {
  return {
    id: "sub_123",
    object: "subscription",
    status: "active",
    cancel_at_period_end: false,
    canceled_at: null,
    metadata: { workspace_id: WS, user_id: USER },
    items: {
      object: "list",
      data: [
        { current_period_start: START, current_period_end: END },
      ] as Stripe.SubscriptionItem[],
      has_more: false,
      url: "",
    },
    ...overrides,
  } as Stripe.Subscription;
}

function event(type: string, object: unknown): Stripe.Event {
  return { type, data: { object } } as unknown as Stripe.Event;
}

function store(fail: Partial<Record<keyof WebhookStore, boolean>> = {}) {
  const result = (name: keyof WebhookStore) => ({
    error: fail[name] ? { message: "db down" } : null,
  });
  return {
    upsertSubscriptionForUser: vi.fn(async () =>
      result("upsertSubscriptionForUser"),
    ),
    updateSubscription: vi.fn(async () => result("updateSubscription")),
    setWorkspaceTier: vi.fn(async () => result("setWorkspaceTier")),
  } satisfies WebhookStore;
}

const checkoutSession = {
  id: "cs_123",
  mode: "subscription",
  customer: "cus_123",
  subscription: "sub_123",
  metadata: { workspace_id: WS, user_id: USER },
};

describe("mapSubscriptionStatus", () => {
  it.each([
    ["active", "active", "premium"],
    ["trialing", "trialing", "premium"],
    ["past_due", "past_due", "premium"],
    ["canceled", "canceled", "free"],
    ["unpaid", "unpaid", "free"],
    ["incomplete", "incomplete", "free"],
    ["incomplete_expired", "incomplete_expired", "free"],
    ["paused", "unpaid", "free"],
  ] as const)("%s -> status %s, tier %s", (stripeStatus, status, tier) => {
    expect(mapSubscriptionStatus(stripeStatus)).toEqual({ status, tier });
  });
});

describe("subscriptionFields", () => {
  it("reads the billing period from the subscription items", () => {
    expect(
      subscriptionFields(
        subscription({ cancel_at_period_end: true, canceled_at: START + 60 }),
      ),
    ).toEqual({
      stripe_subscription_id: "sub_123",
      status: "active",
      current_period_start: new Date(START * 1000).toISOString(),
      current_period_end: new Date(END * 1000).toISOString(),
      cancel_at_period_end: true,
      canceled_at: new Date((START + 60) * 1000).toISOString(),
    });
  });

  it("stores null periods when there are no items", () => {
    const fields = subscriptionFields(
      subscription({
        items: { object: "list", data: [], has_more: false, url: "" },
      }),
    );
    expect(fields.current_period_start).toBeNull();
    expect(fields.current_period_end).toBeNull();
  });
});

describe("checkout.session.completed", () => {
  it("stores the real subscription status and periods, then upgrades the workspace", async () => {
    const s = store();
    const retrieveSubscription = vi.fn(async () =>
      subscription({ status: "trialing" }),
    );
    const outcome = await handleStripeEvent(
      event("checkout.session.completed", checkoutSession),
      { store: s, retrieveSubscription },
    );

    expect(outcome.status).toBe(200);
    expect(retrieveSubscription).toHaveBeenCalledWith("sub_123");
    expect(s.upsertSubscriptionForUser).toHaveBeenCalledWith({
      user_id: USER,
      stripe_customer_id: "cus_123",
      stripe_subscription_id: "sub_123",
      status: "trialing",
      current_period_start: new Date(START * 1000).toISOString(),
      current_period_end: new Date(END * 1000).toISOString(),
      cancel_at_period_end: false,
      canceled_at: null,
    });
    expect(s.setWorkspaceTier).toHaveBeenCalledWith(WS, "premium");
  });

  it("does not upgrade when the subscription is incomplete", async () => {
    const s = store();
    await handleStripeEvent(
      event("checkout.session.completed", checkoutSession),
      {
        store: s,
        retrieveSubscription: async () =>
          subscription({ status: "incomplete" }),
      },
    );
    expect(s.setWorkspaceTier).toHaveBeenCalledWith(WS, "free");
  });

  it("returns 500 when the subscription write fails so Stripe retries", async () => {
    const s = store({ upsertSubscriptionForUser: true });
    const outcome = await handleStripeEvent(
      event("checkout.session.completed", checkoutSession),
      { store: s, retrieveSubscription: async () => subscription() },
    );
    expect(outcome.status).toBe(500);
    expect(s.setWorkspaceTier).not.toHaveBeenCalled();
  });

  it("returns 500 when the tier write fails", async () => {
    const outcome = await handleStripeEvent(
      event("checkout.session.completed", checkoutSession),
      {
        store: store({ setWorkspaceTier: true }),
        retrieveSubscription: async () => subscription(),
      },
    );
    expect(outcome.status).toBe(500);
  });

  it("returns 500 when Stripe cannot return the subscription", async () => {
    const outcome = await handleStripeEvent(
      event("checkout.session.completed", checkoutSession),
      {
        store: store(),
        retrieveSubscription: async () => {
          throw new Error("network");
        },
      },
    );
    expect(outcome.status).toBe(500);
  });

  it("acknowledges a session without metadata and writes nothing", async () => {
    const s = store();
    const outcome = await handleStripeEvent(
      event("checkout.session.completed", { ...checkoutSession, metadata: {} }),
      { store: s, retrieveSubscription: async () => subscription() },
    );
    expect(outcome.status).toBe(200);
    expect(s.upsertSubscriptionForUser).not.toHaveBeenCalled();
    expect(s.setWorkspaceTier).not.toHaveBeenCalled();
  });
});

describe("customer.subscription.* events", () => {
  it.each([
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ])("%s updates the row and the metadata workspace only", async (type) => {
    const s = store();
    const outcome = await handleStripeEvent(
      event(type, subscription({ status: "canceled", canceled_at: END })),
      { store: s, retrieveSubscription: vi.fn() },
    );
    expect(outcome.status).toBe(200);
    expect(s.updateSubscription).toHaveBeenCalledWith("sub_123", {
      status: "canceled",
      current_period_start: new Date(START * 1000).toISOString(),
      current_period_end: new Date(END * 1000).toISOString(),
      cancel_at_period_end: false,
      canceled_at: new Date(END * 1000).toISOString(),
    });
    expect(s.setWorkspaceTier).toHaveBeenCalledTimes(1);
    expect(s.setWorkspaceTier).toHaveBeenCalledWith(WS, "free");
  });

  it("keeps premium while past_due", async () => {
    const s = store();
    await handleStripeEvent(
      event(
        "customer.subscription.updated",
        subscription({ status: "past_due" }),
      ),
      { store: s, retrieveSubscription: vi.fn() },
    );
    expect(s.setWorkspaceTier).toHaveBeenCalledWith(WS, "premium");
  });

  it("stores paused as unpaid and drops to free", async () => {
    const s = store();
    await handleStripeEvent(
      event(
        "customer.subscription.updated",
        subscription({ status: "paused" }),
      ),
      { store: s, retrieveSubscription: vi.fn() },
    );
    expect(s.updateSubscription).toHaveBeenCalledWith(
      "sub_123",
      expect.objectContaining({ status: "unpaid" }),
    );
    expect(s.setWorkspaceTier).toHaveBeenCalledWith(WS, "free");
  });

  it("leaves every workspace alone when metadata has no workspace_id", async () => {
    const s = store();
    const outcome = await handleStripeEvent(
      event(
        "customer.subscription.deleted",
        subscription({ status: "canceled", metadata: {} }),
      ),
      { store: s, retrieveSubscription: vi.fn() },
    );
    expect(outcome.status).toBe(200);
    expect(s.setWorkspaceTier).not.toHaveBeenCalled();
  });

  it("returns 500 when the subscription update fails", async () => {
    const outcome = await handleStripeEvent(
      event("customer.subscription.updated", subscription()),
      {
        store: store({ updateSubscription: true }),
        retrieveSubscription: vi.fn(),
      },
    );
    expect(outcome.status).toBe(500);
  });

  it("returns 500 when the tier update fails", async () => {
    const outcome = await handleStripeEvent(
      event(
        "customer.subscription.deleted",
        subscription({ status: "canceled" }),
      ),
      {
        store: store({ setWorkspaceTier: true }),
        retrieveSubscription: vi.fn(),
      },
    );
    expect(outcome.status).toBe(500);
  });
});

it("acknowledges unknown events without writing", async () => {
  const s = store();
  const outcome = await handleStripeEvent(event("invoice.paid", {}), {
    store: s,
    retrieveSubscription: vi.fn(),
  });
  expect(outcome).toEqual({ status: 200 });
  expect(s.upsertSubscriptionForUser).not.toHaveBeenCalled();
  expect(s.updateSubscription).not.toHaveBeenCalled();
  expect(s.setWorkspaceTier).not.toHaveBeenCalled();
});
