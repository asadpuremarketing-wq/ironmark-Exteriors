"use client";

import { useState } from "react";

export type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div key={f.q} className="rounded-xl border border-navy-900/10">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <h3 className="text-base font-bold text-navy-900">{f.q}</h3>
              <svg
                viewBox="0 0 12 8"
                fill="none"
                className={`h-3 w-3 shrink-0 text-brand-blue transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-200 ease-in-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-navy-900/70">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
