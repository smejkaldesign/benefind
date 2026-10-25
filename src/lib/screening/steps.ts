import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Screening steps: defines the conversation flow */
export interface ScreeningStep {
  id: string;
  question: string;
  helpText?: string;
  type: "select" | "number" | "text" | "multi-select" | "state";
  options?: { label: string; value: string }[];
  required?: boolean;
  validation?: (value: string) => string | null;
}

export function getScreeningSteps(t: Dictionary): ScreeningStep[] {
  const m = t.screeningFlow.steps;
  const yesNo = [
    { label: m.yes, value: "yes" },
    { label: m.no, value: "no" },
  ];
  const validAmount = (v: string) => {
    const n = parseInt(v);
    if (isNaN(n) || n < 0) return m.invalidAmount;
    return null;
  };

  return [
    {
      id: "state",
      question: m.state.question,
      helpText: m.state.helpText,
      type: "state",
      required: true,
    },
    {
      id: "householdSize",
      question: m.householdSize.question,
      helpText: m.householdSize.helpText,
      type: "number",
      required: true,
      validation: (v) => {
        const n = parseInt(v);
        if (isNaN(n) || n < 1 || n > 20) return m.householdSize.error;
        return null;
      },
    },
    {
      id: "hasChildren",
      question: m.hasChildren.question,
      type: "select",
      options: yesNo,
      required: true,
    },
    {
      id: "childrenAges",
      question: m.childrenAges.question,
      helpText: m.childrenAges.helpText,
      type: "text",
      required: false,
    },
    {
      id: "annualIncome",
      question: m.annualIncome.question,
      helpText: m.annualIncome.helpText,
      type: "number",
      required: true,
      validation: validAmount,
    },
    {
      id: "isEmployed",
      question: m.isEmployed.question,
      type: "select",
      options: yesNo,
      required: true,
    },
    {
      id: "hasHealthInsurance",
      question: m.hasHealthInsurance.question,
      type: "select",
      options: [
        { label: m.hasHealthInsurance.all, value: "all" },
        { label: m.hasHealthInsurance.some, value: "some" },
        { label: m.no, value: "no" },
      ],
      required: true,
    },
    {
      id: "monthlyRent",
      question: m.monthlyRent.question,
      helpText: m.monthlyRent.helpText,
      type: "number",
      required: false,
      validation: validAmount,
    },
    {
      id: "specialCircumstances",
      question: m.specialCircumstances.question,
      helpText: m.specialCircumstances.helpText,
      type: "multi-select",
      options: [
        { label: m.specialCircumstances.pregnant, value: "pregnant" },
        { label: m.specialCircumstances.elderly, value: "elderly" },
        { label: m.specialCircumstances.disabled, value: "disabled" },
        { label: m.specialCircumstances.veteran, value: "veteran" },
        { label: m.specialCircumstances.student, value: "student" },
        { label: m.specialCircumstances.none, value: "none" },
      ],
      required: true,
    },
  ];
}

/** Convert chat answers to ScreeningInput */
export function answersToScreeningInput(
  answers: Record<string, string>,
): import("../benefits/types").ScreeningInput {
  const householdSize = parseInt(answers.householdSize) || 1;
  const monthlyIncome = Math.round((parseInt(answers.annualIncome) || 0) / 12);
  const circumstances = (answers.specialCircumstances || "").split(",");

  // Build household members
  const members: import("../benefits/types").HouseholdMember[] = [
    {
      age: 30, // Default for self
      relationship: "self",
      isDisabled: circumstances.includes("disabled"),
      isPregnant: circumstances.includes("pregnant"),
      isVeteran: circumstances.includes("veteran"),
      isStudent: circumstances.includes("student"),
      isCitizen: true,
    },
  ];

  // Add children if present
  if (answers.hasChildren === "yes" && answers.childrenAges) {
    const ages = answers.childrenAges
      .split(",")
      .map((a) => parseInt(a.trim()))
      .filter((a) => !isNaN(a));
    ages.forEach((age) => {
      members.push({
        age,
        relationship: "child",
        isCitizen: true,
      });
    });
  }

  // Fill remaining household members as generic adults
  while (members.length < householdSize) {
    members.push({
      age: 30,
      relationship: "other",
      isCitizen: true,
    });
  }

  // Apply elderly flag
  if (circumstances.includes("elderly") && !members.some((m) => m.age >= 60)) {
    const other = members.find((m) => m.relationship === "other");
    if (other) other.age = 65;
    else members[0]!.age = 65;
  }

  return {
    state: answers.state || "CA",
    householdSize,
    householdMembers: members,
    monthlyIncome,
    monthlyExpenses: {
      rent: parseInt(answers.monthlyRent) || 0,
    },
    isEmployed: answers.isEmployed === "yes",
    hasHealthInsurance: answers.hasHealthInsurance === "all",
  };
}
