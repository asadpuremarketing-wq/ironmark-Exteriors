import LeadForm from "./LeadForm";
import { business, gutterCleaningPricing } from "@/lib/data";

export default function GutterCleaningQuoteCard({ source }: { source: string }) {
  return (
    <div className="relative w-full max-w-md justify-self-center lg:justify-self-end">
      <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-linear-to-br from-brand-blue/30 via-transparent to-brand-blue-light/20 blur-xl" />
      <div className="shimmer-border relative overflow-hidden rounded-2xl bg-white/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7">
        <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-blue">
          <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-brand-blue" />
          Limited-Time Offer
        </div>
        <h2 className="font-heading text-xl font-bold text-navy-900">
          Gutter Cleaning — Starting at ${gutterCleaningPricing.oneStorey}
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-navy-900/10 bg-[#f7f9fb] p-3 text-center">
            <div className="text-2xl font-extrabold text-navy-900">${gutterCleaningPricing.oneStorey}</div>
            <div className="text-xs font-semibold text-navy-900/60">1 Storey House</div>
          </div>
          <div className="rounded-lg border border-navy-900/10 bg-[#f7f9fb] p-3 text-center">
            <div className="text-2xl font-extrabold text-navy-900">${gutterCleaningPricing.twoStorey}</div>
            <div className="text-xs font-semibold text-navy-900/60">2 Storey House</div>
          </div>
        </div>
        <p className="mt-3 text-sm text-navy-900/60">We respond within 1 business hour.</p>
        <LeadForm variant="compact" source={source} className="mt-5" />
        <p className="mt-4 text-center text-xs text-navy-900/50">
          Prefer to talk?{" "}
          <a href={business.phoneHref} className="font-semibold text-brand-blue hover:underline">
            Call {business.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
