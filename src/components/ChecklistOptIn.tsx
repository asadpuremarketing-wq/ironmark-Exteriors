"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Low-friction lead magnet: a free seasonal maintenance checklist in
 * exchange for an email address, for visitors who aren't ready to
 * request a full estimate yet. Posts to the existing /api/lead endpoint
 * (email-only submissions are accepted there) so the business owner
 * gets notified the same way as a regular lead, no separate email
 * marketing service required to start capturing these.
 */
export default function ChecklistOptIn({ source = "checklist-optin" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          service: "Seasonal Maintenance Checklist",
          message: "Requested the free seasonal exterior maintenance checklist.",
          source,
          company: String(data.get("company") || ""),
        }),
      });

      if (!res.ok) {
        const resBody = await res.json().catch(() => ({}));
        throw new Error(resBody.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="section-y bg-[#f7f9fb]">
      <div className="container-max">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-navy-900/10 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Free Download</p>
          <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Get Your Free Seasonal Exterior Maintenance Checklist
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-900/70">
            A simple spring and fall checklist for your roof, gutters, siding, and windows, so small issues get
            caught before they turn into expensive repairs.
          </p>

          {status === "success" ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white">
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
                  <path d="M5 10.5l3.5 3.5 6.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-navy-900">
                Thanks! We&apos;ll send the checklist to your inbox shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" noValidate>
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <label htmlFor={`${source}-email`} className="sr-only">
                Email address
              </label>
              <input
                id={`${source}-email`}
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-navy-900/15 px-5 py-3.5 text-sm outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-6 py-3.5 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right disabled:pointer-events-none disabled:opacity-70"
              >
                {status === "submitting" ? "Sending..." : "Send Me the Checklist"}
              </button>
            </form>
          )}
          {status === "error" && <p className="mt-3 text-sm font-medium text-red-600">{errorMsg}</p>}
          <p className="mt-4 text-xs text-navy-900/40">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
