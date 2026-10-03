import type { Metadata } from "next";
import Link from "next/link";
import { RoadmapStepper } from "@/components/roadmap-stepper";

export const metadata: Metadata = { title: "Roadmap — Kirap" };

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="font-display text-4xl font-extrabold md:text-5xl">The first 90 days</h1>
      <p className="mt-3 max-w-2xl text-muted">
        We start where your network is strongest and expand step by step. Each month ends with a review, so we
        only scale what works.
      </p>

      <RoadmapStepper />

      <div className="mt-14 rounded-2xl bg-ink p-8 text-paper">
        <h2 className="font-display text-2xl font-bold">Ready to talk?</h2>
        <p className="mt-2 text-paper/70">Tell us which role and programs interest you, and pick a time for a call.</p>
        <Link href="/join" className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-ink hover:brightness-110">
          I&apos;m interested →
        </Link>
      </div>
    </div>
  );
}
