"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { services } from "@/lib/data";

type Variant = "full" | "compact";

type Props = {
  variant?: Variant;
  source: string;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({ variant = "full", source, className = "" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""),
      source,
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-8 text-center ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white">
          <svg viewBox="0 0 20 20" className="h-6 w-6" fill="none">
            <path d="M5 10.5l3.5 3.5 6.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-heading text-lg font-bold text-navy-900">
          Request Received
        </h3>
        <p className="text-sm text-navy-900/70">
          Thanks for reaching out — we&apos;ll contact you within 1 business hour
          to schedule your free estimate.
        </p>
      </div>
    );
  }

  const inputClasses =
    "rounded-lg border border-navy-900/15 px-3.5 py-3 text-base md:text-sm outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10";

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`} noValidate>
      {/* Honeypot field — hidden from real users, bots tend to fill every input */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className={variant === "full" ? "grid gap-4 sm:grid-cols-2" : "flex flex-col gap-4"}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`name-${source}`} className="text-sm font-semibold text-navy-900">
            Full Name
          </label>
          <input
            id={`name-${source}`}
            name="name"
            type="text"
            required
            placeholder="John Smith"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`phone-${source}`} className="text-sm font-semibold text-navy-900">
            Phone
          </label>
          <input
            id={`phone-${source}`}
            name="phone"
            type="tel"
            required
            placeholder="(647) 555-0123"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`email-${source}`} className="text-sm font-semibold text-navy-900">
          Email
        </label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`service-${source}`} className="text-sm font-semibold text-navy-900">
          Service Needed
        </label>
        <select
          id={`service-${source}`}
          name="service"
          required
          className={inputClasses}
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`message-${source}`} className="text-sm font-semibold text-navy-900">
          Message <span className="font-normal text-navy-900/40">(Optional)</span>
        </label>
        <textarea
          id={`message-${source}`}
          name="message"
          rows={4}
          placeholder="Tell us a bit about your project..."
          className={inputClasses}
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-shine mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-6 py-3.5 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right disabled:pointer-events-none disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Sending...
          </>
        ) : variant === "compact" ? (
          "Get My Free Quote"
        ) : (
          "Send Message"
        )}
      </button>
      <p className="text-center text-xs text-navy-900/50">
        No spam, ever. We respond within 1 business hour. By submitting, you
        agree to our{" "}
        <Link href="/privacy-policy" className="underline hover:text-brand-blue">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
