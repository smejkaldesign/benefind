import type { CompanyProgram, CompanyScreeningInput } from "../company-types";
import { revenueRangeToNumber, isSmallBusiness } from "../company-types";

export const rndTaxCredit: CompanyProgram = {
  id: "rnd-tax-credit",
  name: "Research & Development Tax Credit (IRC Section 41)",
  shortName: "R&D Tax Credit",
  description:
    "Permanent federal tax credit for companies investing in research, product development, or process improvement. Up to 20% of qualifying R&D expenses.",
  category: "tax-credit",
  tier: "universal",
  agency: "IRS",
  status: "active",
  applicationUrl: "https://www.irs.gov/businesses/research-credit",
  deadlineInfo: "Filed with annual tax return",

  checkEligibility(input: CompanyScreeningInput) {
    if (!input.hasRnd) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: "high",
        reason: "This credit requires R&D or product development spending.",
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    const revenue = revenueRangeToNumber(input.annualRevenue);
    const rndSpend = revenue * (input.rndPercentage / 100);
    const estimatedCredit = Math.round(rndSpend * 0.14); // ASC method (14%)
    const isStartup = input.companyAge === "<1" || input.companyAge === "1-5";
    const isSmall = isSmallBusiness(input.employeeCount);

    const whyYouQualify: string[] = ["You spend on R&D or product development"];
    if (isSmall) whyYouQualify.push("You have fewer than 500 employees");
    if (isStartup)
      whyYouQualify.push(
        "As a startup (< 5 years), you can offset up to $250K in payroll taxes",
      );

    const low = Math.round(estimatedCredit * 0.7);
    const high = Math.round(estimatedCredit * 1.3);

    return {
      eligible: true,
      matchScore: 95,
      confidence: "high",
      reason:
        "Companies spending on R&D, product development, or process improvement qualify for this permanent federal credit.",
      estimatedValue: `$${(low / 1000).toFixed(0)}K-$${(high / 1000).toFixed(0)}K/year`,
      nextSteps: [
        "Document all qualifying R&D activities (four-part test)",
        "Track employee time spent on R&D projects",
        "File Form 6765 with your annual tax return",
        ...(isStartup
          ? ["File Form 8974 to offset payroll taxes (startup benefit)"]
          : []),
      ],
      whyYouQualify,
    };
  },
};
