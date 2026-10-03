// Target of the client-side route beacon. The visit itself is recorded by
// src/proxy.ts before this handler runs, so there is nothing left to do.
export function GET() {
  return new Response(null, { status: 204 });
}
