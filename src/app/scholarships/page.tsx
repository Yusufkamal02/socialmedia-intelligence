import type { Metadata } from "next";
import Link from "next/link";
import { ScholarshipBrowser } from "@/components/scholarship-browser";
import { scholarships } from "@/data/scholarships";
import { contact } from "@/lib/content";
import { closingSoon, countries, formatDate, latestVerified, sortScholarships, usedLevels } from "@/lib/scholarships";

// Statuses are computed from dates at render time. Re-render at least hourly so
// a card flips to "Closed for now" soon after its deadline, without a redeploy.
export const revalidate = 3600;

const description =
  "International scholarships open to Papua New Guineans, with requirements, dates and official links. Free guidance, official links only.";

export const metadata: Metadata = {
  title: "Scholarships — Kirap",
  description,
  openGraph: {
    title: "Scholarship Pathway — Kirap",
    description,
    url: "/scholarships",
    type: "website",
  },
};

const steps = [
  { title: "Find", text: "See which scholarships accept PNG citizens, at which level of study, and when they open and close." },
  { title: "Prepare", text: "Get guidance on requirements, documents and deadlines with a Kirap partner in your community." },
  {
    title: "Apply officially",
    text: "Send your application on the provider's or embassy's own website. Every link on this page goes to an official source.",
  },
];

const honesty = [
  { title: "Free", text: "Our guidance is free, and so is every official scholarship application listed here." },
  { title: "No guarantees", text: "We cannot promise you will be selected. Only the scholarship provider decides." },
  { title: "Not the provider", text: "Kirap does not give these scholarships and is not part of any scholarship provider or government." },
  { title: "We never ask for money or private details", text: "We will never ask for money, bank PINs, passwords or ID documents." },
  { title: "Talk to a real person", text: "You can meet our team on a video call before you decide anything." },
  {
    title: "Report scams",
    text: `If anyone asks you to pay in Kirap's name, email ${contact.email}.`,
  },
];

const faq = [
  {
    q: "Do I have to pay anything?",
    a: "No. Kirap's guidance is free, and official scholarship applications do not charge a fee. If someone asks you to pay to get a scholarship, it is a scam. Please report it to us.",
  },
  {
    q: "Does Kirap guarantee I will get a scholarship?",
    a: "No. Each scholarship provider chooses its own scholars. We help you find options and prepare, but we cannot influence or promise the result.",
  },
  {
    q: "How do I know if I am eligible?",
    a: "Read the \"For PNG\" part of each card, then check the full rules on the official page. Rules can change each year, and the official page is always right.",
  },
  {
    q: "The scholarship I want is closed. What now?",
    a: "Most scholarships open once a year. Use the time to prepare: check the requirements, gather your documents and plan your references. Dates marked \"unconfirmed\" are not official yet, so check the official page again later.",
  },
];

export default function ScholarshipsPage() {
  const now = new Date();
  const items = sortScholarships(scholarships, now);
  const soon = closingSoon(scholarships, now);
  const checked = latestVerified(scholarships);

  return (
    <>
      <section className="grain">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="mb-4 inline-block rounded-full border border-line bg-paper px-3 py-1 text-sm text-muted">
            Scholarship Pathway · Free guide · Official links only
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
            Find the scholarship that fits you.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            International scholarships open to Papua New Guineans, with who can apply, what they pay for and when they
            open. Free guidance, official links only. Kirap does not give scholarships and cannot promise you a place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#list" className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-red">
              See the scholarships
            </a>
            <Link href="/join?program=scholarship" className="rounded-full border border-ink px-6 py-3 font-semibold hover:bg-paper-2">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      {soon.length > 0 && (
        <section aria-labelledby="closing-soon" className="border-y border-red/30 bg-paper-2">
          <div className="mx-auto max-w-6xl px-4 py-5">
            <h2 id="closing-soon" className="font-display text-lg font-bold text-red">
              Closing soon
            </h2>
            <ul className="mt-2 space-y-1">
              {soon.map(({ scholarship: s, daysLeft }) => (
                <li key={s.slug}>
                  <a href={s.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4 hover:text-red">
                    {s.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{" "}
                  — {daysLeft === 0 ? "closes today" : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`} (closes{" "}
                  {formatDate(s.closesAt!)})
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="how" className="mx-auto max-w-6xl px-4 py-14">
        <h2 id="how" className="font-display text-3xl font-extrabold md:text-4xl">
          How it works
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-line bg-paper p-6">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-bold text-paper">{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="list" aria-labelledby="list-title" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-14">
        <h2 id="list-title" className="font-display text-3xl font-extrabold md:text-4xl">
          Scholarships open to PNG citizens
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          &ldquo;Open now&rdquo; means you can apply today. &ldquo;Plan ahead&rdquo; shows scholarships that are closed for now
          or have no confirmed dates yet.
        </p>
        <div className="mt-8">
          {items.length > 0 ? (
            <ScholarshipBrowser items={items} now={now.toISOString()} countries={countries(items)} levels={usedLevels(items)} />
          ) : (
            <div role="alert" className="rounded-2xl border border-dashed border-line p-8 text-center">
              <p className="font-display text-xl font-bold">The scholarship list is not available right now</p>
              <p className="mt-2 text-muted">
                Please try again later, or email <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>.
              </p>
            </div>
          )}
        </div>
        {checked && (
          <p className="mt-6 rounded-xl bg-paper-2 p-4 text-sm">
            Information checked on {formatDate(checked)}. Dates marked unconfirmed are estimates. Always confirm on the
            official page.
          </p>
        )}
      </section>

      <section aria-labelledby="honest" className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 id="honest" className="font-display text-3xl font-extrabold md:text-4xl">
            How we keep this honest
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {honesty.map((h) => (
              <li key={h.title} className="rounded-2xl border-2 border-leaf/30 bg-paper p-5">
                <h3 className="font-display text-lg font-bold text-leaf">{h.title}</h3>
                <p className="mt-2 text-sm">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq" className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 id="faq" className="font-display text-3xl font-extrabold md:text-4xl">
            Common questions
          </h2>
          <p className="mt-3 text-muted">Short, honest answers before you start.</p>
        </div>
        <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
          {faq.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded font-display text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                {item.q}
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:bg-ink group-open:text-paper"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl bg-ink p-8 text-paper md:p-10">
          <h2 className="font-display text-3xl font-extrabold">Not sure where to start?</h2>
          <p className="mt-3 max-w-2xl text-paper/80">
            Tell us what you want to study. A Kirap team member will set up a free video call to talk through your
            options. No payment, no commitment.
          </p>
          <Link
            href="/join?program=scholarship"
            className="mt-6 inline-block rounded-full bg-red px-6 py-3 font-semibold text-paper hover:brightness-110"
          >
            Talk to our team →
          </Link>
        </div>
      </section>
    </>
  );
}
