import { describe, it, expect } from "vitest";
import {
  parseEstimatedValue,
  totalEstimatedAnnualValue,
} from "../company-types";

describe("parseEstimatedValue", () => {
  it.each([
    ["$5K-$50K", 27_500],
    ["$10K-$500K", 255_000],
    ["$500K-$2.1M", 1_300_000],
    ["$48K-$96K/year", 72_000],
    ["Up to $250K", 250_000],
    ["$150K", 150_000],
    ["$1,500,000", 1_500_000],
    ["$1,000-$2,500", 1_750],
  ])("reads %s as %d", (value, expected) => {
    expect(parseEstimatedValue(value)).toBe(expected);
  });

  it.each([
    "30% of clean energy investment",
    "$0.59-$1.19/sq ft",
    "$5 per employee",
    "Federal contracting preferences",
    "Tax deferral + potential exclusion",
    "Apply by 2026",
    "",
    undefined,
  ])("has no fixed dollar value for %s", (value) => {
    expect(parseEstimatedValue(value)).toBe(0);
  });
});

describe("totalEstimatedAnnualValue", () => {
  it("sums only eligible programs with dollar amounts", () => {
    expect(
      totalEstimatedAnnualValue([
        { result: { eligible: true, estimatedValue: "$10K-$15K" } },
        { result: { eligible: true, estimatedValue: "30% of investment" } },
        { result: { eligible: true, estimatedValue: "$0.59-$1.19/sq ft" } },
        { result: { eligible: false, estimatedValue: "$500K-$2.1M" } },
      ]),
    ).toBe(12_500);
  });

  it("leaves paused and expired programs out of the total", () => {
    expect(
      totalEstimatedAnnualValue([
        {
          program: { status: "active" },
          result: { eligible: true, estimatedValue: "$10K-$15K" },
        },
        {
          program: { status: "paused" },
          result: { eligible: true, estimatedValue: "$500K-$2.1M" },
        },
        {
          program: { status: "expired" },
          result: { eligible: true, estimatedValue: "$5K-$50K" },
        },
      ]),
    ).toBe(12_500);
  });
});
