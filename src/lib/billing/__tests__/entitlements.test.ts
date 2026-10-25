import { describe, it, expect } from "vitest";
import { getEntitlements } from "../entitlements";

describe("getEntitlements", () => {
  it("personal free: results only, every paid feature off", () => {
    expect(getEntitlements({ tier: "free", type: "individual" })).toEqual({
      plan: "personal_free",
      paid: false,
      screeningHistory: false,
      rescreenPrefill: false,
      documents: false,
      newMatchAlerts: false,
      prioritySupport: false,
      companyProgramDetails: false,
    });
  });

  it("personal premium: history, prefill, documents, alerts, support", () => {
    expect(getEntitlements({ tier: "premium", type: "individual" })).toEqual({
      plan: "personal_premium",
      paid: true,
      screeningHistory: true,
      rescreenPrefill: true,
      documents: true,
      newMatchAlerts: true,
      prioritySupport: true,
      companyProgramDetails: false,
    });
  });

  it("business free: no program details and no paid features", () => {
    expect(getEntitlements({ tier: "free", type: "company" })).toEqual({
      plan: "business_free",
      paid: false,
      screeningHistory: false,
      rescreenPrefill: false,
      documents: false,
      newMatchAlerts: false,
      prioritySupport: false,
      companyProgramDetails: false,
    });
  });

  it("business: program details, documents, support; no personal alerts", () => {
    expect(getEntitlements({ tier: "premium", type: "company" })).toEqual({
      plan: "business",
      paid: true,
      screeningHistory: false,
      rescreenPrefill: false,
      documents: true,
      newMatchAlerts: false,
      prioritySupport: true,
      companyProgramDetails: true,
    });
  });

  it("no workspace (signed out) gets the free plan of the fallback type", () => {
    expect(getEntitlements(null).plan).toBe("personal_free");
    expect(getEntitlements(null, "company")).toMatchObject({
      plan: "business_free",
      companyProgramDetails: false,
    });
  });
});
