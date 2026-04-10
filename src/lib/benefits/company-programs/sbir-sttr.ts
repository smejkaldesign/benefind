import type { CompanyProgram, CompanyScreeningInput } from "../company-types";
import { isSmallBusiness } from "../company-types";

const SBIR_INDUSTRIES = [
  "technology",
  "healthcare",
  "clean-energy",
  "agriculture",
  "manufacturing",
] as const;

export const sbirPhaseI: CompanyProgram = {
  id: "sbir-phase-i",
  name: "Small Business Innovation Research (SBIR) Phase I",
  shortName: "SBIR Phase I",
  description:
    "Federal grants for small businesses to conduct feasibility research on innovative ideas. $50K-$305K awards from 11 federal agencies.",
  category: "grant",
  tier: "industry",
  agency: "Multiple (NSF, NIH, DOE, DOD, etc.)",
  status: "paused",
  applicationUrl: "https://www.sbir.gov",
  deadlineInfo:
    "Currently paused pending congressional reauthorization. Monitor SBIR.gov for updates.",

  checkEligibility(input: CompanyScreeningInput) {
    const hasMatchingIndustry = SBIR_INDUSTRIES.includes(
      input.industry as (typeof SBIR_INDUSTRIES)[number],
    );
    const small = isSmallBusiness(input.employeeCount);

    if (!small) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: "high",
        reason: "SBIR requires fewer than 500 employees.",
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    if (!input.hasRnd) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: "high",
        reason: "SBIR is for companies conducting research and development.",
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    const whyYouQualify: string[] = [
      "You have fewer than 500 employees",
      "You conduct R&D activities",
    ];
    if (hasMatchingIndustry) {
      whyYouQualify.push(
        `Your industry (${input.industry}) aligns with SBIR focus areas`,
      );
    }

    const score = hasMatchingIndustry ? 80 : 55;

    return {
      eligible: true,
      matchScore: score,
      confidence: "medium",
      reason:
        "Your company profile matches SBIR eligibility criteria. Note: program is currently paused pending reauthorization.",
      estimatedValue: "$50K-$305K",
      nextSteps: [
        "Register on SBIR.gov and SAM.gov (required)",
        "Monitor SBIR.gov for reauthorization and new solicitations",
        "Identify which agency aligns with your research focus",
        "Prepare a Phase I proposal (feasibility study, 6-18 months)",
      ],
      whyYouQualify,
    };
  },
};

export const sbirPhaseII: CompanyProgram = {
  id: "sbir-phase-ii",
  name: "Small Business Innovation Research (SBIR) Phase II",
  shortName: "SBIR Phase II",
  description:
    "Full R&D funding for companies that completed Phase I. $500K-$2.1M awards over 1-3 years.",
  category: "grant",
  tier: "industry",
  agency: "Multiple (NSF, NIH, DOE, DOD, etc.)",
  status: "paused",
  applicationUrl: "https://www.sbir.gov",
  deadlineInfo: "Requires Phase I completion. Currently paused.",

  checkEligibility(input: CompanyScreeningInput) {
    const small = isSmallBusiness(input.employeeCount);
    if (!small || !input.hasRnd) {
      return {
        eligible: false,
        matchScore: 0,
        confidence: "high",
        reason:
          "SBIR Phase II requires fewer than 500 employees and active R&D.",
        nextSteps: [],
        whyYouQualify: [],
      };
    }

    const hasMatchingIndustry = SBIR_INDUSTRIES.includes(
      input.industry as (typeof SBIR_INDUSTRIES)[number],
    );
    const score = hasMatchingIndustry ? 70 : 45;

    return {
      eligible: true,
      matchScore: score,
      confidence: "low",
      reason:
        "You meet the basic criteria for SBIR Phase II, but it requires a completed Phase I award.",
      estimatedValue: "$500K-$2.1M",
      nextSteps: [
        "Complete a SBIR Phase I award first",
        "Prepare a Phase II proposal with full R&D plan",
        "Budget for 1-3 year research timeline",
      ],
      whyYouQualify: [
        "You have fewer than 500 employees",
        "You conduct R&D activities",
        ...(hasMatchingIndustry
          ? [`Your industry aligns with SBIR focus areas`]
          : []),
      ],
    };
  },
};
