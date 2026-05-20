"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Recovers a session when a Supabase magic link lands the user on a page
 * with auth tokens in the URL hash fragment (implicit flow). The server-side
 * `/auth/callback` route only handles PKCE (`?code=`) and OTP (`?token_hash=`)
 * flows — hash fragments are invisible to the server, so without this the
 * user just sits on the home page with tokens in the URL bar.
 *
 * Mount once near the root of any page that a magic link might land on.
 */
export function HashAuthBootstrap() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || !hash.includes("access_token=")) return;

    const params = new URLSearchParams(hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    if (!access_token || !refresh_token) return;

    const supabase = createClient();
    (async () => {
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      // Strip the hash either way so a refresh doesn't re-trigger this.
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      if (error) return;
      router.replace("/dashboard");
    })();
  }, [router]);

  return null;
}
