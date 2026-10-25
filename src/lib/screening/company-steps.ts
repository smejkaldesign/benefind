import type { ScreeningStep } from "./steps";
import type { CompanyScreeningInput } from "../benefits/company-types";
import type { Dictionary } from "../i18n/dictionaries";

/** Company screening steps with display text in the active locale. */
export function getCompanyScreeningSteps(t: Dictionary): ScreeningStep[] {
  const c = t.company;
  const s = c.steps;
  return [
    {
      id: "companyName",
      question: s.companyName.question,
      helpText: s.companyName.helpText,
      type: "text",
      required: true,
      validation: (v) => {
        if (v.length > 100) return s.companyName.tooLong;
        return null;
      },
    },
    {
      id: "state",
      question: s.state.question,
      helpText: s.state.helpText,
      type: "state",
      required: true,
    },
    {
      id: "industry",
      question: s.industry.question,
      type: "select",
      options: [
        { label: c.industries.technology, value: "technology" },
        { label: c.industries.healthcare, value: "healthcare" },
        { label: c.industries.manufacturing, value: "manufacturing" },
        { label: c.industries.agriculture, value: "agriculture" },
        { label: c.industries["clean-energy"], value: "clean-energy" },
        { label: c.industries.retail, value: "retail" },
        { label: c.industries.services, value: "services" },
        { label: c.industries.construction, value: "construction" },
        { label: c.industries.other, value: "other" },
      ],
      required: true,
    },
    {
      id: "companyAge",
      question: s.companyAge.question,
      helpText: s.companyAge.helpText,
      type: "select",
      options: [
        { label: s.companyAge.lessThan1, value: "<1" },
        { label: s.companyAge.y1to5, value: "1-5" },
        { label: s.companyAge.y5to10, value: "5-10" },
        { label: s.companyAge.y10plus, value: "10+" },
      ],
      required: true,
    },
    {
      id: "employeeCount",
      question: s.employeeCount.question,
      type: "select",
      options: [
        { label: "1-10", value: "1-10" },
        { label: "11-50", value: "11-50" },
        { label: "51-100", value: "51-100" },
        { label: "101-500", value: "101-500" },
        { label: "500+", value: "500+" },
      ],
      required: true,
    },
    {
      id: "annualRevenue",
      question: s.annualRevenue.question,
      helpText: s.annualRevenue.helpText,
      type: "select",
      options: [
        { label: s.annualRevenue.under250k, value: "<250k" },
        { label: "$250K - $1M", value: "250k-1m" },
        { label: "$1M - $5M", value: "1m-5m" },
        { label: "$5M - $25M", value: "5m-25m" },
        { label: "$25M+", value: "25m+" },
      ],
      required: true,
    },
    {
      id: "hasRnd",
      question: s.hasRnd.question,
      helpText: s.hasRnd.helpText,
      type: "select",
      options: [
        { label: c.yes, value: "yes" },
        { label: c.no, value: "no" },
      ],
      required: true,
    },
    {
      id: "rndPercentage",
      question: s.rndPercentage.question,
      helpText: s.rndPercentage.helpText,
      type: "select",
      options: [
        { label: s.rndPercentage.under5, value: "3" },
        { label: "5-10%", value: "7" },
        { label: "10-20%", value: "15" },
        { label: "20-40%", value: "30" },
        { label: "40%+", value: "50" },
      ],
      required: true,
    },
    {
      id: "ownershipDemographics",
      question: s.ownership.question,
      helpText: s.ownership.helpText,
      type: "multi-select",
      options: [
        { label: s.ownership.minority, value: "minority" },
        { label: s.ownership.woman, value: "woman" },
        { label: s.ownership.veteran, value: "veteran" },
        { label: s.ownership.none, value: "none" },
      ],
      required: true,
    },
    {
      id: "isRural",
      question: s.isRural.question,
      helpText: s.isRural.helpText,
      type: "select",
      options: [
        { label: c.yes, value: "yes" },
        { label: c.no, value: "no" },
        { label: s.isRural.notSure, value: "not-sure" },
      ],
      required: true,
    },
    {
      id: "exportsOrPlans",
      question: s.exports.question,
      type: "select",
      options: [
        { label: s.exports.yesExport, value: "yes" },
        { label: s.exports.planning, value: "yes" },
        { label: c.no, value: "no" },
      ],
      required: true,
    },
    {
      id: "isHiring",
      question: s.hiring.question,
      helpText: s.hiring.helpText,
      type: "select",
      options: [
        { label: s.hiring.yesActive, value: "yes" },
        { label: s.hiring.planning, value: "yes" },
        { label: c.no, value: "no" },
      ],
      required: true,
    },
    {
      id: "hasCleanEnergy",
      question: s.cleanEnergy.question,
      helpText: s.cleanEnergy.helpText,
      type: "select",
      options: [
        { label: c.yes, value: "yes" },
        { label: c.no, value: "no" },
        { label: s.cleanEnergy.considering, value: "yes" },
      ],
      required: true,
    },
  ];
}

const VALID_INDUSTRIES: CompanyScreeningInput["industry"][] = [
  "technology",
  "healthcare",
  "manufacturing",
  "agriculture",
  "clean-energy",
  "retail",
  "services",
  "construction",
  "other",
];
const VALID_AGES: CompanyScreeningInput["companyAge"][] = [
  "<1",
  "1-5",
  "5-10",
  "10+",
];
const VALID_EMPLOYEE_RANGES: CompanyScreeningInput["employeeCount"][] = [
  "1-10",
  "11-50",
  "51-100",
  "101-500",
  "500+",
];
const VALID_REVENUE_RANGES: CompanyScreeningInput["annualRevenue"][] = [
  "<250k",
  "250k-1m",
  "1m-5m",
  "5m-25m",
  "25m+",
];
const VALID_OWNERSHIP: CompanyScreeningInput["ownershipDemographics"][number][] =
  ["minority", "woman", "veteran", "none"];

/** Convert chat answers to CompanyScreeningInput */
export function answersToCompanyInput(
  answers: Record<string, string>,
): CompanyScreeningInput {
  const ownership = (answers.ownershipDemographics || "none")
    .split(",")
    .filter(
      (v): v is CompanyScreeningInput["ownershipDemographics"][number] =>
        VALID_OWNERSHIP.includes(
          v as CompanyScreeningInput["ownershipDemographics"][number],
        ) && v !== "none",
    );

  const rawIndustry = answers.industry || "other";
  const rawAge = answers.companyAge || "1-5";
  const rawEmployees = answers.employeeCount || "1-10";
  const rawRevenue = answers.annualRevenue || "<250k";
  const rndParsed = parseInt(answers.rndPercentage);

  return {
    companyName: (answers.companyName || "Your Company").slice(0, 100),
    state: answers.state || "CA",
    industry: VALID_INDUSTRIES.includes(
      rawIndustry as CompanyScreeningInput["industry"],
    )
      ? (rawIndustry as CompanyScreeningInput["industry"])
      : "other",
    companyAge: VALID_AGES.includes(
      rawAge as CompanyScreeningInput["companyAge"],
    )
      ? (rawAge as CompanyScreeningInput["companyAge"])
      : "1-5",
    employeeCount: VALID_EMPLOYEE_RANGES.includes(
      rawEmployees as CompanyScreeningInput["employeeCount"],
    )
      ? (rawEmployees as CompanyScreeningInput["employeeCount"])
      : "1-10",
    annualRevenue: VALID_REVENUE_RANGES.includes(
      rawRevenue as CompanyScreeningInput["annualRevenue"],
    )
      ? (rawRevenue as CompanyScreeningInput["annualRevenue"])
      : "<250k",
    hasRnd: answers.hasRnd === "yes",
    rndPercentage: Number.isFinite(rndParsed) ? rndParsed : 0,
    ownershipDemographics: ownership.length > 0 ? ownership : ["none"],
    isRural: answers.isRural === "yes",
    exportsOrPlans: answers.exportsOrPlans === "yes",
    isHiring: answers.isHiring === "yes",
    hasCleanEnergy: answers.hasCleanEnergy === "yes",
  };
}
