import { describe, it, expect } from "vitest";
import { renderNewMatchEmail } from "../new-match-alert";

const input = {
  programNames: ["Supplemental Nutrition Assistance Program (SNAP)", "WIC"],
  dashboardUrl: "https://benefind.ai/dashboard",
  unsubscribeUrl: "https://benefind.ai/api/alerts/unsubscribe?token=a.b",
};

describe("renderNewMatchEmail", () => {
  it("lists every program and links to the dashboard and unsubscribe", () => {
    const { html, text } = renderNewMatchEmail(input);
    for (const out of [html, text]) {
      expect(out).toContain("Supplemental Nutrition Assistance Program (SNAP)");
      expect(out).toContain("WIC");
      expect(out).toContain("https://benefind.ai/dashboard");
      expect(out).toContain("/api/alerts/unsubscribe?token=a.b");
    }
    expect(html).toContain("Log in to view");
    expect(text).toContain("2 programs");
  });

  it("keeps program names out of the subject", () => {
    const { subject } = renderNewMatchEmail(input);
    expect(subject).not.toContain("SNAP");
  });

  it("escapes program names", () => {
    const { html } = renderNewMatchEmail({
      ...input,
      programNames: ['<script>alert("x")</script>'],
    });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("uses singular copy for one program", () => {
    const { text } = renderNewMatchEmail({ ...input, programNames: ["WIC"] });
    expect(text).toContain("1 program that");
  });

  it("contains no em dashes", () => {
    const { html, text, subject } = renderNewMatchEmail(input);
    expect(`${subject}${html}${text}`).not.toContain("—");
  });
});
