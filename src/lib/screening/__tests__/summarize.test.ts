import { describe, it, expect } from "vitest";
import { getDictionary } from "../../i18n/dictionaries";
import { summarizeEligible } from "../summarize";

const en = getDictionary("en");

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
    expect(summarizeEligible([lifeline, wic], 4200, en)).toBe(
      "Great news! We found 2 programs you may qualify for, worth up to $4,200/year.",
    );
  });

  it("describes a single program instead of quoting $0", () => {
    expect(summarizeEligible([lifeline], 0, en)).toBe(
      "Great news! You may qualify for Lifeline. Discounted phone or internet service for low-income households.",
    );
  });

  it("uses the whole description when it has no sentence break", () => {
    expect(summarizeEligible([wic], 0, en)).toBe(
      "Great news! You may qualify for WIC. Nutrition support for pregnant women and young children.",
    );
  });

  it("names every program when several have no dollar value", () => {
    expect(summarizeEligible([lifeline, wic], 0, en)).toBe(
      "Great news! We found 2 programs you may qualify for: Lifeline, WIC.",
    );
  });

  it("uses the active locale's strings", () => {
    const es = getDictionary("es");
    expect(summarizeEligible([lifeline, wic], 4200, es)).toBe(
      "¡Buenas noticias! Encontramos 2 programas para los que podría calificar, con un valor de hasta $4,200 al año.",
    );
    expect(summarizeEligible([lifeline, wic], 0, getDictionary("zh"))).toBe(
      "好消息！我们找到 2 个项目，您可能符合资格：Lifeline、WIC。",
    );
  });
});
