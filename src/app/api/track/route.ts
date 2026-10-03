import type { VisitEvent } from "@/lib/store";
import { recordVisit } from "@/lib/track";

// External collector for visit events (e.g. from another service). The site's
// own visits are recorded in-process by src/proxy.ts and don't go through here.
export async function POST(request: Request) {
  if (!process.env.TRACK_SECRET || request.headers.get("x-kirap-track") !== process.env.TRACK_SECRET) {
    return new Response("Forbidden", { status: 403 });
  }

  await recordVisit((await request.json()) as VisitEvent);
  return new Response(null, { status: 204 });
}
