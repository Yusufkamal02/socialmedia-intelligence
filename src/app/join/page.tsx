import type { Metadata } from "next";
import { Suspense } from "react";
import { InterestForm } from "@/components/interest-form";

export const metadata: Metadata = { title: "I'm interested — Kirap" };

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold md:text-5xl">Let&apos;s kirap together</h1>
      <p className="mt-3 text-muted">
        Three quick steps, no commitment. Tell us what interests you and when you are free for a short video call.
      </p>
      <Suspense>
        <InterestForm />
      </Suspense>
    </div>
  );
}
