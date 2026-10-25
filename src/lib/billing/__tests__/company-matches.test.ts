import { describe, it, expect } from "vitest";
import { toCompanyMatchViews } from "../company-matches";

const programs = [
  {
    program: {
      id: "rnd",
      shortName: "R&D Credit",
      category: "tax-credit" as const,
      agency: "IRS",
      description: "Credit for qualified research",
      status: "active" as const,
      applicationUrl: "https://example.gov/rnd",
      deadlineInfo: "File with your return",
    },
    result: {
      eligible: true,
      estimatedValue: "$48K-$96K/year",
      whyYouQualify: ["You do software R&D"],
      nextSteps: ["Document qualified expenses"],
    },
  },
  {
    program: {
      id: "wotc",
      shortName: "WOTC",
      category: "tax-credit" as const,
      agency: "DOL",
      description: "Hiring credit",
      status: "active" as const,
    },
    result: {
      eligible: false,
      whyYouQualify: [],
      nextSteps: [],
    },
  },
];

describe("toCompanyMatchViews", () => {
  it("without the Business plan, only names and categories leave the loader", () => {
    const views = toCompanyMatchViews(programs, false);
    expect(views).toEqual([
      {
        id: "rnd",
        shortName: "R&D Credit",
        category: "tax-credit",
        details: null,
      },
    ]);
    const payload = JSON.stringify(views);
    for (const secret of [
      "$48K",
      "You do software R&D",
      "Document qualified expenses",
      "IRS",
      "Credit for qualified research",
      "example.gov",
    ]) {
      expect(payload).not.toContain(secret);
    }
  });

  it("with the Business plan, includes details for matched programs only", () => {
    const views = toCompanyMatchViews(programs, true);
    expect(views).toHaveLength(1);
    expect(views[0]?.details).toEqual({
      agency: "IRS",
      description: "Credit for qualified research",
      status: "active",
      estimatedValue: "$48K-$96K/year",
      whyYouQualify: ["You do software R&D"],
      nextSteps: ["Document qualified expenses"],
      applicationUrl: "https://example.gov/rnd",
      deadlineInfo: "File with your return",
    });
  });
});
