import { faq } from "@/lib/content";

export function Faq() {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
      {faq.map((item, i) => (
        <details key={item.q} className="group p-5" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
            {item.q}
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:bg-ink group-open:text-paper">
              +
            </span>
          </summary>
          <p className="mt-3 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
