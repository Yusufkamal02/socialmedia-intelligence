import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EarningsSimulator } from "@/components/earnings-simulator";
import { roles } from "@/lib/content";

export const metadata: Metadata = { title: "Partnership — Kirap" };

export default function PartnershipPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold md:text-5xl">Pick how you want to be involved</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Start small as an Ambassador, or go deeper as a Trainer or Reseller. You can change roles as the
        partnership grows.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {roles.map((r) => (
          <article key={r.id} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
            <h2 className="font-display text-2xl font-bold">{r.name}</h2>
            <p className="mt-1 text-sm text-muted">{r.time}</p>
            <p className="mt-4 font-display text-4xl font-extrabold text-red">
              {Math.round(r.commission * 100)}%
              <span className="ml-1 align-middle text-sm font-normal text-muted">revenue share</span>
            </p>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">You</h3>
            <ul className="mt-2 space-y-1.5">
              {r.you.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wider text-muted">We provide</h3>
            <ul className="mt-2 space-y-1.5">
              {r.we.map((x) => (
                <li key={x} className="text-leaf">✓ <span className="text-ink">{x}</span></li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section id="calculator" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-3xl font-extrabold">Estimate your monthly earnings</h2>
        <p className="mt-2 text-muted">Move the sliders to see what a month could look like.</p>
        <Suspense>
          <EarningsSimulator />
        </Suspense>
      </section>

      <div className="mt-14 flex flex-wrap justify-center gap-3">
        <Link href="/roadmap" className="rounded-full border border-ink px-6 py-3 font-semibold hover:bg-paper-2">
          See the 90-day plan
        </Link>
        <Link href="/join" className="rounded-full bg-red px-6 py-3 font-semibold text-paper hover:brightness-110">
          I&apos;m interested →
        </Link>
      </div>
    </div>
  );
}
