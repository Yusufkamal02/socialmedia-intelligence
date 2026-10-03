import { saveVisit, type VisitEvent } from "@/lib/store";
import { esc, isBot, notifyTelegram } from "@/lib/telegram";

// Stores a visit event and fans it out (Telegram, TRACK_WEBHOOK_URL). Called
// in-process by src/proxy.ts, so it works behind any tunnel or reverse proxy
// (ngrok, Cloudflare) without the server having to reach its own public URL.
export async function recordVisit(visit: VisitEvent) {
  await saveVisit(visit);
  console.log(`[kirap] ${visit.ts} ${visit.ip} ${visit.method} ${visit.path}${visit.query} (${visit.kind}) ref=${visit.ref ?? "-"}`);

  // Ping Telegram for a new visitor's first page, and for every full page load
  // from a tagged (?ref=) prospect — not for each in-site click.
  if (visit.kind === "page" && (visit.newVisitor || visit.ref) && !isBot(visit.userAgent)) {
    const place = [visit.city && decodeURIComponent(visit.city), visit.country].filter(Boolean).join(", ");
    await notifyTelegram(
      [
        `👀 <b>${visit.newVisitor ? "New visitor" : "Returning visitor"}</b>${visit.ref ? ` · ref=<b>${esc(visit.ref)}</b>` : ""}`,
        `IP: <code>${esc(visit.ip)}</code>${place ? ` (${esc(place)})` : ""}`,
        `Page: ${esc(visit.path + visit.query)}`,
        `From: ${esc(visit.referer ?? "direct")}`,
        `Device: ${esc(visit.userAgent.slice(0, 120))}`,
      ].join("\n"),
    );
  }

  const webhook = process.env.TRACK_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `Kirap visit: ${visit.ip} → ${visit.path} (${visit.kind}, ref=${visit.ref ?? "-"})`,
        ...visit,
      }),
    }).catch((err) => console.error("[kirap] webhook failed", err));
  }
}
