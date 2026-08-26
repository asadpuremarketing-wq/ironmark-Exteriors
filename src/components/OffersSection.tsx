import Link from "next/link";
import { offers, areaOffers, serviceAreas } from "@/lib/data";
import Reveal from "./Reveal";

export default function OffersSection() {
  if (offers.length === 0) return null;

  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(47,127,214,0.06), transparent 45%)",
        }}
      />
      <div className="container-max relative">
        <Reveal className="mb-12 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Save Today
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Current Offers
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {offers.map((offer) => {
            const relatedOffer = areaOffers.find((o) => offer.href === `/services/${o.slug}`);
            return (
              <div
                key={offer.slug}
                className="group relative overflow-hidden rounded-2xl border-2 border-brand-blue/30 bg-brand-blue/5 p-8 transition duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-xl hover:shadow-brand-blue/10"
              >
                <Link href={offer.href} className="block">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-blue">
                    <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-brand-blue" />
                    {offer.badge}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">{offer.title}</h3>
                  <p className="mt-1 text-2xl font-extrabold text-brand-blue">{offer.priceLabel}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-900/70">{offer.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue">
                    See Pricing &amp; Book
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      fill="none"
                    >
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>

                {relatedOffer && (
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-brand-blue/10 pt-4">
                    {relatedOffer.areaSlugs.slice(0, 4).map((areaSlug) => {
                      const a = serviceAreas.find((sa) => sa.slug === areaSlug);
                      if (!a) return null;
                      return (
                        <Link
                          key={areaSlug}
                          href={`/${relatedOffer.pathPrefix}/${areaSlug}`}
                          className="rounded-full border border-brand-blue/20 bg-white px-3 py-1 text-xs font-semibold text-navy-900/60 transition hover:border-brand-blue hover:text-brand-blue"
                        >
                          {a.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
