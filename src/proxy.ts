import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { clientIp } from "@/lib/client-ip";
import type { VisitEvent } from "@/lib/store";
import { recordVisit } from "@/lib/track";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. This file is the
// middleware: it runs before every matched route, records who visited
// which route, and guards the /admin dashboard.

const VISITOR_COOKIE = "kirap_vid";
const REF_COOKIE = "kirap_ref";
const ONE_YEAR = 60 * 60 * 24 * 365;

function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

function checkBasicAuth(request: NextRequest): boolean {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return false;
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false; // malformed base64 → treat as unauthenticated, not a 500
  }
  const [u, ...rest] = decoded.split(":");
  return u === user && rest.join(":") === pass;
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname, searchParams } = request.nextUrl;

  if (isAdminPath(pathname)) {
    if (!checkBasicAuth(request)) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Kirap admin"' },
      });
    }
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Skip probes (HEAD/OPTIONS), prefetches, and router RSC fetches; in-site
  // navigations are counted once, via the route beacon below.
  if (request.method === "HEAD" || request.method === "OPTIONS") return response;
  const isRouterFetch =
    request.headers.has("rsc") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-segment-prefetch") ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("sec-purpose")?.includes("prefetch");
  if (isRouterFetch) return response;

  let visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  const newVisitor = !visitorId;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    response.cookies.set(VISITOR_COOKIE, visitorId, { maxAge: ONE_YEAR, sameSite: "lax", httpOnly: true });
  }

  // `?ref=<code>` on a shared link tags the visitor for all later visits.
  let ref = request.cookies.get(REF_COOKIE)?.value ?? null;
  const refParam = searchParams.get("ref");
  if (refParam) {
    ref = refParam.slice(0, 64);
    response.cookies.set(REF_COOKIE, ref, { maxAge: ONE_YEAR, sameSite: "lax", httpOnly: true });
  }

  // /api/pv is the client-side route beacon (src/components/route-beacon.tsx);
  // log the page it reports rather than the beacon URL itself.
  const isBeacon = pathname === "/api/pv";
  const path = isBeacon ? (searchParams.get("p") ?? "/").slice(0, 200) : pathname;
  const kind = isBeacon ? "client-nav" : pathname.startsWith("/api/") ? "api" : "page";

  // `_rsc` is Next's internal cache-busting param, not part of the visit.
  const query = new URLSearchParams(isBeacon ? "" : searchParams);
  query.delete("_rsc");
  const search = query.size ? `?${query}` : "";

  const visit: VisitEvent = {
    ts: new Date().toISOString(),
    ip: clientIp(request.headers),
    method: request.method,
    path,
    query: search,
    kind,
    visitorId,
    newVisitor,
    ref,
    userAgent: request.headers.get("user-agent") ?? "",
    referer: request.headers.get("referer"),
    country: request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry"),
    city: request.headers.get("x-vercel-ip-city"),
  };

  // Record in-process (proxy runs on Node.js) rather than POSTing to our own
  // public URL, which fails behind tunnels like ngrok. Doesn't delay the response.
  event.waitUntil(recordVisit(visit).catch((err) => console.error("[kirap] track failed", err)));

  return response;
}

export const config = {
  matcher: [
    // Every route except the collector itself, Vercel Analytics (/_vercel), build assets and static files.
    "/((?!api/track|_vercel|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|woff2?)$).*)",
  ],
};
