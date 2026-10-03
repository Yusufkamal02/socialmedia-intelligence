import { cookies } from "next/headers";
import { clientIp } from "@/lib/client-ip";
import { saveInterest } from "@/lib/store";
import { esc, notifyTelegram } from "@/lib/telegram";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const role = str(body.role, 40);
  const callDay = str(body.callDay, 20);
  if (!name || !email || !role) {
    return Response.json({ error: "Please fill in your name, email and preferred role." }, { status: 400 });
  }
  if (callDay === "Saturday") {
    return Response.json({ error: "Saturday is reserved — please pick another day." }, { status: 400 });
  }

  const entry = {
    ts: new Date().toISOString(),
    ip: clientIp(request.headers),
    visitorId: (await cookies()).get("kirap_vid")?.value ?? null,
    name,
    email,
    whatsapp: str(body.whatsapp, 40),
    role,
    programs: Array.isArray(body.programs) ? body.programs.map((p: unknown) => str(p, 60)).slice(0, 5) : [],
    callDay,
    callSlot: str(body.callSlot, 40),
    message: str(body.message, 2000),
  };
  await saveInterest(entry);

  await notifyTelegram(
    [
      `📝 <b>New interest form</b>`,
      `Name: <b>${esc(entry.name)}</b>`,
      `Email: ${esc(entry.email)}${entry.whatsapp ? ` · WA: ${esc(entry.whatsapp)}` : ""}`,
      `Role: ${esc(entry.role)}`,
      `Programs: ${esc(entry.programs.join(", ") || "—")}`,
      `Call: ${esc(entry.callDay)} ${esc(entry.callSlot)}`,
      entry.message && `Message: <i>${esc(entry.message.slice(0, 500))}</i>`,
      `IP: <code>${esc(entry.ip)}</code>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return Response.json({ ok: true });
}
