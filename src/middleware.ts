import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PATHS = [
  "/",
  "/auth",
  "/screening",
  "/results",
  "/programs",
  "/docs",
  "/blog",
  "/api/health",
  "/sitemap.xml",
];

/**
 * Routes where authenticated users should be redirected to /dashboard.
 * Unauthenticated users hitting these without sessionStorage data will be
 * caught by the page-level check and sent to /screening.
 */
const AUTH_REDIRECT_PATHS = ["/results"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // Always refresh the session cookie
  const response = await updateSession(request);

  // Authenticated users hitting /results should go to /dashboard instead
  const isAuthRedirect = AUTH_REDIRECT_PATHS.some(
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
