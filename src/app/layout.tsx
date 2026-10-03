import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { RouteBeacon } from "@/components/route-beacon";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { contact, nav } from "@/lib/content";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kirap.vercel.app"),
  title: "Kirap — Partner Program",
  description: "Rise up with digital skills. A partnership proposal to bring digital money, farming and data skills to PNG communities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <RouteBeacon />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line">
          <div className="bilum h-2" />
          <nav aria-label="Footer" className="mx-auto max-w-6xl px-4 pt-8">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {[...nav, { href: "/join", label: "I'm interested" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted underline-offset-4 hover:text-ink hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted flex flex-col gap-3 sm:flex-row sm:justify-between">
            <p>
              <span className="font-display font-bold text-ink">Kirap</span> · Rise up with digital skills ·{" "}
              <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p className="max-w-md">
              Copyright © {new Date().getFullYear()} Kirap. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
