// Resolve the visitor IP from the headers set by the hosting platform or
// reverse proxy. The first entry of x-forwarded-for is the original client.
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0].trim();
  const ip =
    forwarded ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    headers.get("x-vercel-forwarded-for") ||
    "unknown";
  // Node reports IPv4 clients on a dual-stack socket as "::ffff:1.2.3.4".
  return ip.replace(/^::ffff:/, "");
}
