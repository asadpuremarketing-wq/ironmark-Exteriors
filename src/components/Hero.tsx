import Link from "next/link";
import type { ReactNode } from "react";
import { business } from "@/lib/data";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  showCta?: boolean;
  showTrustRow?: boolean;
  formSlot?: ReactNode;
};

const trustItems = [
  "Licensed & Insured",
  "Free Estimates",
  "5-Star Rated",
];

export default function Hero({
  eyebrow,
  title,
  subtitle,
  showCta = true,
  showTrustRow = true,
  formSlot,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(47,127,214,0.4), transparent 45%), radial-gradient(circle at 85% 75%, rgba(47,127,214,0.22), transparent 50%), radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="blob animate-float pointer-events-none -left-24 -top-24 h-80 w-80 bg-brand-blue/25"
        aria-hidden="true"
      />
      <div
        className="blob animate-float-reverse pointer-events-none -right-16 bottom-0 h-96 w-96 bg-brand-blue-light/15"
        aria-hidden="true"
      />

      <div
        className={`container-max relative py-14 sm:py-20 md:py-28 ${
          formSlot ? "grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14" : ""
        }`}
      >
        <div className={formSlot ? "" : "max-w-2xl"}>
          {eyebrow && (
            <p className="glass-dark mb-5 inline-flex animate-pop-in items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-light">
              <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-brand-blue-light" />
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading text-3xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-silver/80 sm:mt-6 sm:text-lg">
            {subtitle}
          </p>

          {showCta && (
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-8 py-4 text-center text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right"
              >
                Get a Free Estimate
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-1" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={business.phoneHref}
                className="glass-dark inline-flex items-center justify-center rounded-full px-8 py-4 text-center text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Call {business.phone}
              </a>
            </div>
          )}

          {showTrustRow && (
            <div
              className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${
                showCta
                  ? "mt-8 border-t border-white/10 pt-6 sm:mt-12 sm:gap-x-8 sm:pt-8"
                  : "mt-6 sm:mt-8"
              }`}
            >
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-silver/80"
                >
                  <svg viewBox="0 0 20 20" className="h-5 w-5 text-brand-blue-light" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M6.5 10.3l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {formSlot}
      </div>

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-[3px] h-16 w-full text-white/[0.03] sm:h-24"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 160V90l120-50 120 50 120-70 120 70 120-45 120 45 120-60 120 60 120-40 120 40 120-55 120 55V160H0Z"
          fill="currentColor"
        />
      </svg>

      <div className="h-[3px] w-full bg-linear-to-r from-brand-blue via-brand-blue-light to-brand-blue" />
    </section>
  );
}
