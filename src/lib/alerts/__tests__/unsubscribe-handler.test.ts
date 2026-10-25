import { describe, it, expect, vi } from "vitest";
import { handleUnsubscribe } from "../unsubscribe-handler";
import { createUnsubscribeToken } from "../unsubscribe-token";

const SECRET = "test-signing-secret";
const USER = "3f2b8c1e-4d5a-4b6c-8d7e-9f0a1b2c3d4e";
const TOKEN = createUnsubscribeToken(USER, SECRET);
const URL_WITH_TOKEN = `https://benefind.ai/api/alerts/unsubscribe?token=${encodeURIComponent(TOKEN)}`;

function deps(result = true) {
  return { secret: SECRET, optOut: vi.fn(async () => result) };
}

describe("handleUnsubscribe GET", () => {
  it("shows a confirm form and does not opt out", async () => {
    const d = deps();
    const res = await handleUnsubscribe(new Request(URL_WITH_TOKEN), d);
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(d.optOut).not.toHaveBeenCalled();
    expect(html).toContain('method="post"');
    expect(html).toContain(`name="token" value="${TOKEN}"`);
  });

  it("rejects a bad token without opting out", async () => {
    const d = deps();
    const res = await handleUnsubscribe(
      new Request("https://benefind.ai/api/alerts/unsubscribe?token=bad"),
      d,
    );
    expect(res.status).toBe(400);
    expect(d.optOut).not.toHaveBeenCalled();
  });
});

describe("handleUnsubscribe POST", () => {
  it("opts out from the confirmation form body", async () => {
    const d = deps();
    const body = new URLSearchParams({ token: TOKEN });
    const res = await handleUnsubscribe(
      new Request("https://benefind.ai/api/alerts/unsubscribe", {
        method: "POST",
        body,
      }),
      d,
    );
    expect(res.status).toBe(200);
    expect(d.optOut).toHaveBeenCalledWith(USER);
    expect(await res.text()).toContain("You are unsubscribed");
  });

  it("supports RFC 8058 one-click (token in URL, One-Click body)", async () => {
    const d = deps();
    const res = await handleUnsubscribe(
      new Request(URL_WITH_TOKEN, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "List-Unsubscribe=One-Click",
      }),
      d,
    );
    expect(res.status).toBe(200);
    expect(d.optOut).toHaveBeenCalledWith(USER);
  });

  it("rejects a missing or forged token", async () => {
    const d = deps();
    const forged = new URLSearchParams({ token: `${USER}.forged` });
    for (const body of [new URLSearchParams(), forged]) {
      const res = await handleUnsubscribe(
        new Request("https://benefind.ai/api/alerts/unsubscribe", {
          method: "POST",
          body,
        }),
        d,
      );
      expect(res.status).toBe(400);
    }
    expect(d.optOut).not.toHaveBeenCalled();
  });

  it("reports a failed write", async () => {
    const d = deps(false);
    const res = await handleUnsubscribe(
      new Request(URL_WITH_TOKEN, { method: "POST" }),
      d,
    );
    expect(res.status).toBe(500);
  });
});
