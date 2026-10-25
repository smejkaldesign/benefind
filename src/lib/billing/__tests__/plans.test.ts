import { describe, it, expect } from "vitest";
import { selectPrice, planFamilyFor, PLAN_PRICES } from "../plans";

const env = {
  STRIPE_PRICE_PREMIUM_MONTHLY: "price_pm",
  STRIPE_PRICE_PREMIUM_ANNUAL: "price_pa",
  STRIPE_PRICE_BUSINESS_MONTHLY: "price_bm",
  STRIPE_PRICE_BUSINESS_ANNUAL: "price_ba",
};

describe("selectPrice", () => {
  it("personal workspaces get premium prices", () => {
    expect(selectPrice("individual", "premium_monthly", env)).toEqual({
      ok: true,
      priceId: "price_pm",
    });
    expect(selectPrice("individual", "premium_annual", env)).toEqual({
      ok: true,
      priceId: "price_pa",
    });
  });

  it("company workspaces get business prices", () => {
    expect(selectPrice("company", "business_monthly", env)).toEqual({
      ok: true,
      priceId: "price_bm",
    });
    expect(selectPrice("company", "business_annual", env)).toEqual({
      ok: true,
      priceId: "price_ba",
    });
  });

  it("rejects a business price for a personal workspace", () => {
    expect(selectPrice("individual", "business_monthly", env)).toEqual({
      ok: false,
      error: "plan_mismatch",
    });
  });

  it("rejects a premium price for a company workspace", () => {
    expect(selectPrice("company", "premium_annual", env)).toEqual({
      ok: false,
      error: "plan_mismatch",
    });
  });

  it("rejects unknown keys, including raw Stripe price IDs", () => {
    for (const key of ["price_pm", "premium_weekly", "", null, 5]) {
      expect(selectPrice("individual", key, env)).toEqual({
        ok: false,
        error: "invalid_price",
      });
    }
  });

  it("reports a missing price env var", () => {
    expect(
      selectPrice("company", "business_monthly", {
        ...env,
        STRIPE_PRICE_BUSINESS_MONTHLY: undefined,
      }),
    ).toEqual({ ok: false, error: "price_not_configured" });
  });
});

describe("plan prices", () => {
  it("match the published pricing", () => {
    expect(PLAN_PRICES).toEqual({
      premium: { monthly: 5, annual: 50 },
      business: { monthly: 29, annual: 290 },
    });
    expect(planFamilyFor("individual")).toBe("premium");
    expect(planFamilyFor("company")).toBe("business");
  });
});
