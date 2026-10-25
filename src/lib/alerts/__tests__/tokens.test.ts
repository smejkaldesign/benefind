import { describe, it, expect } from "vitest";
import {
  createUnsubscribeToken,
  verifyUnsubscribeToken,
} from "../unsubscribe-token";
import { isAuthorizedCron } from "../cron-auth";
import { newMatchEmailsEnabled } from "../preferences";

const SECRET = "test-signing-secret";
const USER = "3f2b8c1e-4d5a-4b6c-8d7e-9f0a1b2c3d4e";

describe("unsubscribe token", () => {
  it("round-trips a user id", () => {
    const token = createUnsubscribeToken(USER, SECRET);
    expect(verifyUnsubscribeToken(token, SECRET)).toBe(USER);
  });

  it("is URL safe", () => {
    expect(createUnsubscribeToken(USER, SECRET)).toMatch(/^[A-Za-z0-9._-]+$/);
  });

  it("rejects a token signed with another secret", () => {
    const token = createUnsubscribeToken(USER, "other-secret");
    expect(verifyUnsubscribeToken(token, SECRET)).toBeNull();
  });

  it("rejects a token whose user id was swapped", () => {
    const token = createUnsubscribeToken(USER, SECRET);
    const sig = token.split(".")[1];
    const other = "00000000-0000-4000-8000-000000000000";
    expect(verifyUnsubscribeToken(`${other}.${sig}`, SECRET)).toBeNull();
  });

  it("rejects malformed input", () => {
    for (const bad of [
      null,
      undefined,
      "",
      "abc",
      `${USER}.`,
      `not-a-uuid.x`,
    ]) {
      expect(verifyUnsubscribeToken(bad, SECRET)).toBeNull();
    }
  });

  it("never verifies with an empty secret", () => {
    const token = createUnsubscribeToken(USER, SECRET);
    expect(verifyUnsubscribeToken(token, "")).toBeNull();
    expect(() => createUnsubscribeToken(USER, "")).toThrow();
  });
});

describe("isAuthorizedCron", () => {
  it("accepts the exact bearer secret", () => {
    expect(isAuthorizedCron("Bearer s3cret", "s3cret")).toBe(true);
  });

  it("rejects wrong, missing, or differently shaped headers", () => {
    expect(isAuthorizedCron("Bearer wrong", "s3cret")).toBe(false);
    expect(isAuthorizedCron("s3cret", "s3cret")).toBe(false);
    expect(isAuthorizedCron(null, "s3cret")).toBe(false);
    expect(isAuthorizedCron("Bearer s3cret-and-more", "s3cret")).toBe(false);
  });

  it("never authorizes when the secret is not configured", () => {
    expect(isAuthorizedCron("Bearer ", "")).toBe(false);
    expect(isAuthorizedCron("Bearer undefined", undefined)).toBe(false);
  });
});

describe("newMatchEmailsEnabled", () => {
  const on = { email_notifications: true, new_match_emails: true };

  it("defaults to on with no settings and no onboarding choice", () => {
    expect(newMatchEmailsEnabled(null, {})).toBe(true);
  });

  it("honors the onboarding checkbox when no settings row exists", () => {
    expect(
      newMatchEmailsEnabled(null, { notify_on_eligibility_change: false }),
    ).toBe(false);
  });

  it("lets an explicit settings row override onboarding", () => {
    expect(
      newMatchEmailsEnabled(on, { notify_on_eligibility_change: false }),
    ).toBe(true);
    expect(newMatchEmailsEnabled({ ...on, new_match_emails: false }, {})).toBe(
      false,
    );
    expect(
      newMatchEmailsEnabled({ ...on, email_notifications: false }, {}),
    ).toBe(false);
  });
});
