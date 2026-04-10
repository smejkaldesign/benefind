import type { CompanyProgram, CompanyScreeningInput } from "../company-types";
import { employeeRangeToNumber } from "../company-types";

export const wotc: CompanyProgram = {
  id: "wotc",
  name: "Work Opportunity Tax Credit (WOTC)",
  shortName: "WOTC",
  description:
    "Tax credit for hiring individuals from targeted groups (veterans, SNAP recipients, ex-felons, etc.). Up to $2,400-$9,600 per qualifying hire.",
  category: "tax-credit",
  tier: "universal",
  agency: "IRS / State Workforce Agency",
  status: "expired",
  applicationUrl:
    "https://www.irs.gov/businesses/small-businesses-self-employed/work-opportunity-tax-credit",
  deadlineInfo: "Expired Dec 31, 2025. Monitor for reauthorization.",

  checkEligibility(input: CompanyScreeningInput) {
    if (!input.isHiring) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: "high",
        reason: "WOTC applies to employers who are actively hiring.",
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    const employees = employeeRangeToNumber(input.employeeCount);
    const estimatedHires = Math.max(Math.round(employees * 0.15), 1);
    const lowEstimate = estimatedHires * 2400;
    const highEstimate = estimatedHires * 4800;

    return {
      eligible: true,
      matchScore: 65,
      confidence: "medium",
      reason:
        "You are actively hiring, which makes you eligible for WOTC if you hire from qualifying groups. Note: program expired Dec 2025, monitor for reauthorization.",
      estimatedValue: `$${(lowEstimate / 1000).toFixed(0)}K-$${(highEstimate / 1000).toFixed(0)}K/year`,
      nextSteps: [
        "Screen all new hires using IRS Form 8850 within 28 days of start",
        "Submit to your state workforce agency for certification",
        "Monitor for congressional reauthorization (may be retroactive)",
        "Continue screening to protect future eligibility",
      ],
      whyYouQualify: [
        "You are actively hiring",
        `Estimated ${estimatedHires} qualifying hires per year`,
      ],
    };
  },
};
