"use server";

import { cookies } from "next/headers";

/**
 * Set the bf-workspace cookie as HttpOnly via a server action.
 * This replaces the client-side document.cookie approach so the
 * cookie cannot be read by injected scripts (XSS protection).
 */
export async function setWorkspaceCookie(workspaceId: string) {
  const cookieStore = await cookies();
  cookieStore.set("bf-workspace", workspaceId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
