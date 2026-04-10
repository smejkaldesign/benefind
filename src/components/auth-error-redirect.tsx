"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Catches Supabase auth errors that land on the site URL (homepage).
 * Supabase appends error params to both the query string and URL hash
 * when a magic link fails (expired, already used, etc.).
 * Redirects to /auth/login with a descriptive error code.
 */
export function AuthErrorRedirect() {
  const router = useRouter();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));

    const error = search.get("error") ?? hash.get("error");
    const errorCode = search.get("error_code") ?? hash.get("error_code");

    if (error === "access_denied") {
      const msg = errorCode === "otp_expired" ? "link_expired" : "auth_failed";
      router.replace(`/auth/login?error=${msg}`);
    }
  }, [router]);

  return null;
}
