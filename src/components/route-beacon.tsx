"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// In-site navigations are often served from the router's prefetch cache and
// never hit the server, so the proxy can't see them. This pings /api/pv on
// every client-side route change; src/proxy.ts records it like a page view.
export function RouteBeacon() {
  const pathname = usePathname();
  // Starts at the landing path: the initial page load is already recorded by
  // the proxy. Comparing paths (not a "first run" flag) also survives the
  // double effect run of React StrictMode in dev.
  const last = useRef(pathname);

  useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    if (pathname.startsWith("/admin")) return;
    fetch(`/api/pv?p=${encodeURIComponent(pathname)}`, { keepalive: true }).catch(() => {});
  }, [pathname]);

  return null;
}
