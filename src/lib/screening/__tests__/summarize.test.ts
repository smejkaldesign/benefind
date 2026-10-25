import { describe, it, expect } from "vitest";
import { summarizeEligible } from "../summarize";

const lifeline = {
  name: "Lifeline",
  description:
    "Discounted phone or internet service for low-income households. Apply through a participating provider.",
};
const wic = {
  name: "WIC",
  description: "Nutrition support for pregnant women and young children",
};

describe("summarizeEligible", () => {
  it("quotes the annual value when there is one", () => {
    expect(summarizeEligible([lifeline, wic], 4200)).toBe(
      "Great news! We found 2 programs you may qualify for, worth up to $4,200/year.",
    );
  });

  it("describes a single program instead of quoting $0", () => {
    expect(summarizeEligible([lifeline], 0)).toBe(
      "Great news! You may qualify for Lifeline. Discounted phone or internet service for low-income households.",
    );
  });

  it("uses the whole description when it has no sentence break", () => {
    expect(summarizeEligible([wic], 0)).toBe(
      "Great news! You may qualify for WIC. Nutrition support for pregnant women and young children.",
    );
  });

  it("names every program when several have no dollar value", () => {
    expect(summarizeEligible([lifeline, wic], 0)).toBe(
      "Great news! We found 2 programs you may qualify for: Lifeline, WIC.",
    );
  });
});
