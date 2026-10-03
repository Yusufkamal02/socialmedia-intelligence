"use client";

import { contact } from "@/lib/content";

export default function ScholarshipsError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div role="alert" className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold">Something went wrong</h1>
      <p className="mt-3 text-muted">
        We could not show the scholarship list. Please try again, or email{" "}
        <a className="underline" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        .
      </p>
      <button type="button" onClick={() => retry()} className="mt-6 rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-red">
        Try again
      </button>
    </div>
  );
}
