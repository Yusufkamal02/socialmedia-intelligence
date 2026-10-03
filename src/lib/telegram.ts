// Sends a notification to a Telegram chat via the Bot API. Does nothing when
// TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set, and never throws, so a
// Telegram outage can't break tracking or form submissions.
export async function notifyTelegram(html: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (!res.ok) console.error("[kirap] telegram failed", res.status, await res.text());
  } catch (err) {
    console.error("[kirap] telegram failed", err);
  }
}

// Escape user-controlled values for Telegram's HTML parse mode.
export const esc = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Crawlers and link-preview fetchers (incl. WhatsApp/Telegram unfurling a
// shared link) are not real visitors and shouldn't ping the phone.
export const isBot = (ua: string) =>
  !ua || /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|slack|headless|lighthouse/i.test(ua);
