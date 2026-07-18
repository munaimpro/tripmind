import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Checks for an active Better Auth session by calling the /api/auth/get-session
 * endpoint with the current request cookies forwarded.
 */
async function getSession(request: NextRequest) {
  const sessionUrl = new URL("/api/auth/get-session", request.nextUrl.origin);
  const response = await fetch(sessionUrl.toString(), {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
    // Opt out of Next.js fetch cache so session is always fresh
    cache: "no-store",
  });

  if (!response.ok) return null;

  try {
    const json = await response.json();
    return json;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  try {
    const session = await getSession(request);

    if (!session?.session) {
      // Preserve the intended destination so we can redirect after login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[Middleware] Auth check failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    // Protect all dashboard routes (user & admin)
    "/dashboard/:path*",
    // Protect AI Planner
    "/planner",
    "/planner/:path*",
    // Protect top-level protected pages
    "/profile",
    "/settings",
    "/my-trips",
    "/saved-trips",
  ],
};
