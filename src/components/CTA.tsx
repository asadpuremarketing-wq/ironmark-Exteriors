import Link from "next/link";
import { business } from "@/lib/data";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 50%, rgba(47,127,214,0.08), transparent 55%), radial-gradient(circle at 85% 50%, rgba(47,127,214,0.06), transparent 55%)",
        }}
      />
      <div className="container-max relative">
        <div className="flex flex-col items-center gap-8 rounded-3xl border border-navy-900/10 bg-[#f7f9fb] px-6 py-12 text-center shadow-sm sm:px-10 md:flex-row md:justify-between md:px-12 md:text-left">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              Let&apos;s Get Started
            </p>
            <h2 className="font-heading text-2xl font-extrabold text-navy-900 sm:text-3xl">
              Ready to Protect &amp; Refresh Your Home?
            </h2>
            <p className="mt-3 text-navy-900/65">
              Get a free, no-obligation estimate from Ironmark Exteriors today.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-shine rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-8 py-4 text-center text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right"
            >
              Request a Free Estimate
            </Link>
            <a
              href={business.phoneHref}
              className="rounded-full border border-navy-900/15 px-8 py-4 text-center text-sm font-bold text-navy-900 transition hover:border-brand-blue/40 hover:bg-white"
            >
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
