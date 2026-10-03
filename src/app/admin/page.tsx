import type { Metadata } from "next";
import { connection } from "next/server";
import { AutoRefresh } from "@/components/auto-refresh";
import { readInterests, readQuiz, readVisits, type VisitEvent } from "@/lib/store";

export const metadata: Metadata = { title: "Visitor monitor — Kirap", robots: { index: false } };

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Jakarta", dateStyle: "short", timeStyle: "medium" }) + " WIB";

function browser(ua: string) {
  const os = /iPhone|iPad/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Mac OS/.test(ua) ? "macOS" : /Windows/.test(ua) ? "Windows" : /Linux/.test(ua) ? "Linux" : "?";
  const b = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : ua.split(" ")[0] || "?";
  return `${b} · ${os}`;
}

function groupBy<K extends string>(visits: VisitEvent[], key: (v: VisitEvent) => K) {
  const map = new Map<K, VisitEvent[]>();
  for (const v of visits) map.set(key(v), [...(map.get(key(v)) ?? []), v]);
  return map;
}

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  await connection();
  const { ref } = await searchParams;
  const all = await readVisits();
  const visits = (typeof ref === "string" ? all.filter((v) => v.ref === ref) : all).filter((v) => v.kind !== "api");
  const interests = await readInterests();
  const allQuiz = await readQuiz();
  const quizResults = (typeof ref === "string" ? allQuiz.filter((q) => q.ref === ref) : allQuiz).slice().reverse();
  const latestQuizByIp = new Map(quizResults.map((q) => [q.ip, q] as const).reverse());
  const roleCounts = [...quizResults.reduce((m, q) => m.set(q.role, (m.get(q.role) ?? 0) + 1), new Map<string, number>())].sort(
    (a, b) => b[1] - a[1],
  );
  const refs = [...new Set(all.map((v) => v.ref).filter(Boolean))] as string[];

  const byRoute = [...groupBy(visits, (v) => v.path)].sort((a, b) => b[1].length - a[1].length);
  const byIp = [...groupBy(visits, (v) => v.ip)].sort(
    (a, b) => b[1].at(-1)!.ts.localeCompare(a[1].at(-1)!.ts),
  );
  const recent = visits.slice(-50).reverse();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Kirap admin</p>
          <h1 className="font-display text-3xl font-extrabold">Visitor monitor</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <a href="/admin" className={`rounded-full px-3 py-1 ${!ref ? "bg-ink text-paper" : "border border-line"}`}>All</a>
          {refs.map((r) => (
            <a key={r} href={`/admin?ref=${encodeURIComponent(r)}`} className={`rounded-full px-3 py-1 ${ref === r ? "bg-ink text-paper" : "border border-line"}`}>
              ref={r}
            </a>
          ))}
          <AutoRefresh seconds={10} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        <Stat label="Page views" value={visits.length} />
        <Stat label="Unique IPs" value={byIp.length} />
        <Stat label="Unique visitors" value={new Set(visits.map((v) => v.visitorId)).size} />
        <Stat label="Quizzes completed" value={quizResults.length} />
        <Stat label="Interest forms" value={interests.length} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <Panel title="Views per route">
          <table className="w-full text-sm">
            <tbody>
              {byRoute.map(([path, vs]) => (
                <tr key={path} className="border-t border-line">
                  <td className="py-2 font-mono">{path}</td>
                  <td className="py-2 text-right font-semibold">{vs.length}</td>
                  <td className="py-2 pl-3 text-right text-muted">{fmt(vs.at(-1)!.ts)}</td>
                </tr>
              ))}
              {byRoute.length === 0 && <Empty cols={3} />}
            </tbody>
          </table>
        </Panel>

        <Panel title="Visitors by IP">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr>
                <th className="py-2">IP</th>
                <th>Ref</th>
                <th>Device</th>
                <th>Quiz result</th>
                <th className="text-right">Views</th>
                <th className="text-right">Last seen</th>
              </tr>
            </thead>
            <tbody>
              {byIp.map(([ip, vs]) => {
                const last = vs.at(-1)!;
                return (
                  <tr key={ip} className="border-t border-line align-top">
                    <td className="py-2 font-mono">
                      {ip}
                      {last.country && <span className="ml-1 text-muted">({last.country}{last.city ? `, ${decodeURIComponent(last.city)}` : ""})</span>}
                      <div className="text-xs text-muted">{[...new Set(vs.map((v) => v.path))].join(" → ")}</div>
                    </td>
                    <td>{last.ref ?? "—"}</td>
                    <td>{browser(last.userAgent)}</td>
                    <td>{latestQuizByIp.get(ip)?.role ?? "—"}</td>
                    <td className="text-right font-semibold">{vs.length}</td>
                    <td className="text-right text-muted">{fmt(last.ts)}</td>
                  </tr>
                );
              })}
              {byIp.length === 0 && <Empty cols={6} />}
            </tbody>
          </table>
        </Panel>
      </div>

      <Panel title="Quiz results" className="mt-6">
        {roleCounts.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {roleCounts.map(([role, n]) => (
              <span key={role} className="rounded-full bg-paper-2 px-3 py-1 text-sm">
                {role} <span className="font-semibold">· {n}</span>
              </span>
            ))}
          </div>
        )}
        <table className="w-full text-sm">
          <thead className="text-left text-muted">
            <tr>
              <th className="py-2">When</th>
              <th>IP</th>
              <th>Ref</th>
              <th>Result</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            {quizResults.map((q, idx) => (
              <tr key={`${q.ts}-${idx}`} className="border-t border-line align-top">
                <td className="py-2 text-muted">{fmt(q.ts)}</td>
                <td className="font-mono">{q.ip}</td>
                <td>{q.ref ?? "—"}</td>
                <td>
                  <div className="font-semibold">{q.role}</div>
                  <div className="text-muted">{q.program}</div>
                </td>
                <td>
                  <ol className="space-y-0.5">
                    {q.answers.map((a) => (
                      <li key={a.question}>
                        <span className="text-muted">{a.question}</span> {a.answer}
                      </li>
                    ))}
                  </ol>
                </td>
              </tr>
            ))}
            {quizResults.length === 0 && <Empty cols={5} />}
          </tbody>
        </table>
      </Panel>

      <Panel title="Interest form submissions" className="mt-6">
        <table className="w-full text-sm">
          <thead className="text-left text-muted">
            <tr>
              <th className="py-2">When</th>
              <th>Name / contact</th>
              <th>Role</th>
              <th>Programs</th>
              <th>Call</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {interests.slice().reverse().map((i) => (
              <tr key={i.ts} className="border-t border-line align-top">
                <td className="py-2 text-muted">{fmt(i.ts)}</td>
                <td>
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-muted">{i.email}{i.whatsapp && ` · ${i.whatsapp}`}</div>
                  {i.message && <div className="mt-1 italic">“{i.message}”</div>}
                </td>
                <td>{i.role}</td>
                <td>{i.programs.join(", ") || "—"}</td>
                <td>{i.callDay}<div className="text-muted">{i.callSlot}</div></td>
                <td className="font-mono">{i.ip}</td>
              </tr>
            ))}
            {interests.length === 0 && <Empty cols={6} />}
          </tbody>
        </table>
      </Panel>

      <Panel title="Latest activity" className="mt-6">
        <table className="w-full text-sm">
          <thead className="text-left text-muted">
            <tr>
              <th className="py-2">Time</th>
              <th>IP</th>
              <th>Route</th>
              <th>Type</th>
              <th>Ref</th>
              <th>Came from</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((v, idx) => (
              <tr key={`${v.ts}-${idx}`} className="border-t border-line">
                <td className="py-2 text-muted">{fmt(v.ts)}</td>
                <td className="font-mono">{v.ip}</td>
                <td className="font-mono">{v.path}{v.query}</td>
                <td>{v.kind === "page" ? "Page load" : "In-site nav"}</td>
                <td>{v.ref ?? "—"}</td>
                <td className="max-w-48 truncate text-muted">{v.referer ?? "direct"}</td>
              </tr>
            ))}
            {recent.length === 0 && <Empty cols={6} />}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="font-display text-3xl font-extrabold">{value}</p>
    </div>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`overflow-x-auto rounded-2xl border border-line bg-paper p-5 ${className}`}>
      <h2 className="mb-2 font-display text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Empty({ cols }: { cols: number }) {
  return (
    <tr>
      <td colSpan={cols} className="py-6 text-center text-muted">No data yet</td>
    </tr>
  );
}
