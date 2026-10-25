import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";
import { isProtectedPath } from "@/lib/auth/protected-paths";

/**
 * Routes where authenticated users should be redirected to /dashboard.
 * Unauthenticated users hitting these without sessionStorage data will be
 * caught by the page-level check and sent to /screening. /auth/login is here
 * so a returning user with a live session skips the magic link.
 */
const AUTH_REDIRECT_PATHS = ["/results", "/auth/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = !isProtectedPath(pathname);

  // Always refresh the session cookie
  const response = await updateSession(request);

  // Authenticated users hitting these should go to /dashboard instead. Skip
  // when an error is being reported (e.g. workspace_error comes FROM the
  // dashboard, so bouncing back would loop).
  const isAuthRedirect =
    !request.nextUrl.searchParams.has("error") &&
    AUTH_REDIRECT_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    );

  if (isAuthRedirect) {
    const supabaseCheck = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {},
        },
      },
    );
    const {
      data: { user: authUser },
    } = await supabaseCheck.auth.getUser();

    if (authUser) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // For protected routes, check auth and redirect if needed
  if (!isPublic) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // no-op — updateSession already handled cookies
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // First-time users: redirect to onboarding (skip if already on /onboarding)
    if (
      !pathname.startsWith("/onboarding") &&
      !user.user_metadata?.onboarding_completed
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|fonts/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf|eot)$).*)",
  ],
};
