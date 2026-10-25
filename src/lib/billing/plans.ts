import type { WorkspaceType } from "./entitlements";

export type BillingInterval = "monthly" | "annual";
export type PlanFamily = "premium" | "business";
export type PriceKey = `${PlanFamily}_${BillingInterval}`;

/** Display prices in whole US dollars. Stripe prices must match these. */
export const PLAN_PRICES: Record<
  PlanFamily,
  Record<BillingInterval, number>
> = {
  premium: { monthly: 5, annual: 50 },
  business: { monthly: 29, annual: 290 },
};

export const PRICE_ENV_VARS: Record<PriceKey, string> = {
  premium_monthly: "STRIPE_PRICE_PREMIUM_MONTHLY",
  premium_annual: "STRIPE_PRICE_PREMIUM_ANNUAL",
  business_monthly: "STRIPE_PRICE_BUSINESS_MONTHLY",
  business_annual: "STRIPE_PRICE_BUSINESS_ANNUAL",
};

export function planFamilyFor(type: WorkspaceType): PlanFamily {
  return type === "company" ? "business" : "premium";
}

export function isPriceKey(value: unknown): value is PriceKey {
  return typeof value === "string" && value in PRICE_ENV_VARS;
}

export type PriceSelection =
  | { ok: true; priceId: string }
  | {
      ok: false;
      error: "invalid_price" | "plan_mismatch" | "price_not_configured";
    };

/**
 * Picks the Stripe price for a checkout. Personal workspaces may only buy
 * premium prices and company workspaces may only buy business prices, so a
 * forged price key cannot put a company on the $5 plan.
 */
export function selectPrice(
  workspaceType: WorkspaceType,
  priceKey: unknown,
  env: Record<string, string | undefined>,
): PriceSelection {
  if (!isPriceKey(priceKey)) return { ok: false, error: "invalid_price" };
  if (!priceKey.startsWith(`${planFamilyFor(workspaceType)}_`)) {
    return { ok: false, error: "plan_mismatch" };
  }
  const priceId = env[PRICE_ENV_VARS[priceKey]];
  if (!priceId) return { ok: false, error: "price_not_configured" };
  return { ok: true, priceId };
}
