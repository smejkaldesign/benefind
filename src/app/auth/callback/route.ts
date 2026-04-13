import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { ensureWorkspace } from "@/lib/workspace/ensure-workspace";

function safePath(raw: string | null): string {
  const fallback = "/dashboard";
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  try {
    const url = new URL(raw, "http://localhost");
    if (url.hostname !== "localhost") return fallback;
  } catch {
    return fallback;
  }
  return raw;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const origin = requestUrl.origin;
  const next = safePath(searchParams.get("next"));
  const supabase = await createServerSupabase();

  let authenticated = false;

  // PKCE flow — OAuth / email signup confirmation
  const code = searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) authenticated = true;
  }

  // OTP flow — magic link
  if (!authenticated) {
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash });
      if (!error) authenticated = true;
    }
  }

  if (!authenticated) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
  }

  // Ensure user has at least one workspace (creates default on first login)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isFirstLogin = false;
  if (user) {
    const { data: memberships } = await ensureWorkspace(supabase, user.id);
    // First login: user has no onboarding_completed flag yet
    isFirstLogin = !user.user_metadata?.onboarding_completed;

    // If ensureWorkspace just created the workspace, that also signals first login
    if (!isFirstLogin && memberships && memberships.length === 1) {
      // Could be first login if workspace was just created
      // The onboarding_completed flag is the canonical check
    }
  }

  // First-time users go to onboarding; returning users go to their intended destination
  const destination = isFirstLogin ? "/onboarding" : next;
  return NextResponse.redirect(`${origin}${destination}`);
}
