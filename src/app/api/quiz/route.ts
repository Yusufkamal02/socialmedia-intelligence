import { cookies } from "next/headers";
import { clientIp } from "@/lib/client-ip";
import { programs, quiz, roles, scoreQuiz } from "@/lib/content";
import { saveQuiz } from "@/lib/store";
import { esc, notifyTelegram } from "@/lib/telegram";

// Records a completed role quiz. The client sends only answer indexes; the
// result is recomputed here so the dashboard can't be fed a made-up outcome.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const picks: unknown = body?.picks;
  const valid =
    Array.isArray(picks) &&
    picks.length === quiz.length &&
    picks.every((p, q) => Number.isInteger(p) && p >= 0 && p < quiz[q].answers.length);
  if (!valid) return Response.json({ error: "Invalid quiz answers" }, { status: 400 });

  const { role, program } = scoreQuiz(picks as number[]);
  const jar = await cookies();
  const result = {
    ts: new Date().toISOString(),
    ip: clientIp(request.headers),
    visitorId: jar.get("kirap_vid")?.value ?? null,
    ref: jar.get("kirap_ref")?.value ?? null,
    role: roles.find((r) => r.id === role)!.name,
    program: programs.find((p) => p.id === program)!.name,
    answers: (picks as number[]).map((p, q) => ({ question: quiz[q].question, answer: quiz[q].answers[p].label })),
  };
  await saveQuiz(result);

  await notifyTelegram(
    [
      `🧩 <b>Quiz completed</b>${result.ref ? ` · ref=<b>${esc(result.ref)}</b>` : ""}`,
      `Result: <b>${esc(result.role)}</b> · ${esc(result.program)}`,
      `IP: <code>${esc(result.ip)}</code>`,
    ].join("\n"),
  );

  return Response.json({ ok: true });
}
