import type { Metadata } from "next";
import Link from "next/link";
import { ProgramDemos } from "@/components/program-demos";
import { programs } from "@/lib/content";

export const metadata: Metadata = { title: "Programs — Kirap" };

const accent = {
  red: { bar: "bg-red", text: "text-red" },
  leaf: { bar: "bg-leaf", text: "text-leaf" },
  gold: { bar: "bg-gold", text: "text-gold" },
  ink: { bar: "bg-ink", text: "text-ink" },
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold md:text-5xl">Programs you would bring</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Four ready-made programs. You choose which ones fit your communities. We provide the curriculum,
        materials and kits, plus a free guide to scholarships abroad.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((p) => (
          <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-paper">
            <div className={`h-2 ${accent[p.accent].bar}`} />
            <div className="flex flex-1 flex-col p-6">
              <p className={`text-sm font-semibold italic ${accent[p.accent].text}`}>“{p.tok}”</p>
              <h2 className="mt-1 font-display text-2xl font-bold">{p.name}</h2>
              {"summary" in p && <p className="mt-2 text-muted">{p.summary}</p>}
              <dl className="mt-4 space-y-2 text-sm">
                <div>
                  <dt className="text-muted">Who it&apos;s for</dt>
                  <dd>{p.audience}</dd>
                </div>
                <div>
                  <dt className="text-muted">Format</dt>
                  <dd>{p.duration}</dd>
                </div>
              </dl>
              <ul className="mt-5 flex-1 space-y-2">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className={accent[p.accent].text}>✓</span>
                    {o}
                  </li>
                ))}
              </ul>
              {"href" in p && (
                <Link
                  href={p.href}
                  className="mt-6 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-red"
                >
                  See scholarships →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      <h2 className="mt-16 font-display text-3xl font-extrabold">Try a lesson yourself</h2>
      <p className="mt-2 text-muted">These are simplified versions of real exercises from each program. Go ahead, play with them.</p>
      <div className="mt-6">
        <ProgramDemos />
      </div>

      <div className="mt-14 text-center">
        <Link href="/partnership" className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-red">
          Next: choose your role →
        </Link>
      </div>
    </div>
  );
}
