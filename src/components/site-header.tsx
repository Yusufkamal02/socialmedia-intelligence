"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="bilum block h-6 w-6 rounded-sm" aria-hidden />
          <span className="font-display text-xl font-extrabold tracking-tight">Kirap</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                pathname === item.href ? "bg-ink text-paper" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/join" className="rounded-full bg-red px-4 py-2 text-sm font-semibold text-paper hover:brightness-110">
          I&apos;m interested
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-full px-3 py-1 text-sm ${
              pathname === item.href ? "bg-ink text-paper" : "border border-line text-muted"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
