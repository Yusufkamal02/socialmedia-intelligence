import Link from "next/link";
import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { RoleQuiz } from "@/components/role-quiz";
import { lookingFor, programs, roadmap, trustPoints } from "@/lib/content";

const places = [
  { name: "Port Moresby", note: "Campus Pilot", color: "bg-red" },
  { name: "Southern Highlands", note: "Student & church networks", color: "bg-gold" },
  { name: "East New Britain", note: "Gazelle village outreach", color: "bg-leaf" },
];

export default function Home() {
  return (
    <>
      <section className="grain">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="mb-4 inline-block rounded-full border border-line bg-paper px-3 py-1 text-sm text-muted">
              Partner program · Papua New Guinea
            </p>
            <h1 className="font-display text-5xl leading-[1.05] font-extrabold tracking-tight md:text-7xl">
              Let&apos;s <span className="text-red">kirap</span> together.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              <em>Kirap</em> means to rise up. We want to bring digital money skills, smart farming and data
              analytics to communities across Papua New Guinea, and we are looking for local partners to lead it on
              the ground.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quiz" className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-red">
                Find your role in 30s
              </a>
              <Link href="/programs" className="rounded-full border border-ink px-6 py-3 font-semibold hover:bg-paper-2">
                Explore programs
              </Link>
            </div>
          </div>

          <div className="self-center rounded-2xl border border-line bg-paper p-6 shadow-[6px_6px_0_var(--ink)]">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">Where we start</p>
            <ol className="mt-4 space-y-4">
              {places.map((p, i) => (
                <li key={p.name} className="flex items-start gap-3">
                  <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full ${p.color} text-sm font-bold text-paper`}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{p.name}</p>
                    <p className="text-sm text-muted">{p.note}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="bilum mt-6 h-2 rounded-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl font-extrabold md:text-4xl">Who we&apos;re looking for</h2>
        <p className="mt-2 max-w-2xl text-muted">
          You don&apos;t need to be a tech expert. If any of these sound like you, there is a role for you.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {lookingFor.map((s, i) => (
            <Reveal key={s.role} delay={i * 80}>
            <article className="h-full rounded-2xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--ink)]">
              <p className="text-sm text-muted">{s.from}</p>
              <p className="my-3 font-display text-xl font-bold">
                <span className="text-red">→</span> {s.role}
              </p>
              <p>{s.why}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="quiz" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16">
        <Reveal>
          <RoleQuiz />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-display text-3xl font-extrabold md:text-4xl">How we work with partners</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
            <article className="h-full rounded-2xl border-2 border-leaf/30 bg-paper p-5">
              <p className="font-display text-lg font-bold text-leaf">✓ {t.title}</p>
              <p className="mt-2 text-sm">{t.text}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 md:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Questions you might have</h2>
          <p className="mt-3 text-muted">
            A new offer from people you haven&apos;t met should raise questions. Here are honest answers.
          </p>
        </div>
        <Faq />
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 md:grid-cols-3">
          <Link href="/programs" className="group rounded-2xl bg-paper p-6 hover:shadow-[6px_6px_0_var(--red)]">
            <p className="font-display text-4xl font-extrabold">{programs.length}</p>
            <p className="mt-1 font-semibold">programs ready to teach</p>
            <p className="mt-4 text-sm text-muted group-hover:text-ink">Money, farming and data →</p>
          </Link>
          <Link href="/partnership" className="group rounded-2xl bg-paper p-6 hover:shadow-[6px_6px_0_var(--gold)]">
            <p className="font-display text-4xl font-extrabold">15–35%</p>
            <p className="mt-1 font-semibold">revenue share per role</p>
            <p className="mt-4 text-sm text-muted group-hover:text-ink">Try the earnings calculator →</p>
          </Link>
          <Link href="/roadmap" className="group rounded-2xl bg-paper p-6 hover:shadow-[6px_6px_0_var(--leaf)]">
            <p className="font-display text-4xl font-extrabold">{roadmap.length * 30} days</p>
            <p className="mt-1 font-semibold">low-risk pilot plan</p>
            <p className="mt-4 text-sm text-muted group-hover:text-ink">See the roadmap →</p>
          </Link>
        </div>
      </section>
    </>
  );
}
