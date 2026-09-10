import Link from "next/link";
import Hero from "@/components/Hero";
import PressureWashingQuoteCard from "@/components/PressureWashingQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import CTA from "@/components/CTA";
import { business, serviceAreas, pressureWashingAreaSlugs, pressureWashingPricing } from "@/lib/data";

export function pressureWashingMeta() {
  const title = `Pressure Washing Services | Starting from $${pressureWashingPricing.startingFrom} | Ironmark Exteriors`;
  const description = `Professional pressure washing for driveways, patios, walkways and other exterior surfaces starting from $${pressureWashingPricing.startingFrom}. Serving Hamilton, Burlington, Brantford, Stoney Creek, Grimsby, St. Catharines, and Niagara Falls. Free quotes.`;
  return { title, description };
}

/**
 * The main Pressure Washing offer page content, rendered at
 * /services/pressure-washing (the URL the Services nav links to).
 */
export default function PressureWashingOffer() {
  const { description } = pressureWashingMeta();
  const areas = pressureWashingAreaSlugs
    .map((slug) => serviceAreas.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pressure Washing",
    name: "Pressure Washing Services",
    description,
    provider: {
      "@type": "RoofingContractor",
      name: business.name,
      telephone: business.phone,
      url: business.siteUrl,
    },
    areaServed: areas.map((a) => `${a.name}, ${a.province}`),
    offers: [
      {
        "@type": "Offer",
        name: "Pressure Washing",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: pressureWashingPricing.startingFrom,
          priceCurrency: "CAD",
        },
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <Hero
        eyebrow="Hamilton, ON & Surrounding Areas"
        title={`Pressure Washing, Starting from $${pressureWashingPricing.startingFrom}`}
        subtitle="Professional pressure washing for driveways, patios, walkways and other exterior surfaces. Remove built-up dirt, grime and stains to restore your property's appearance."
        showCta={false}
        formSlot={<PressureWashingQuoteCard source="services-pressure-washing" />}
      />

      <GoogleReviews />

      {/* Pricing */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Pressure Washing Pricing</h2>
          </div>
          <div className="mx-auto max-w-md rounded-2xl border-2 border-brand-blue bg-brand-blue/5 p-8 text-center shadow-lg shadow-brand-blue/10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">Starting From</p>
            <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
              ${pressureWashingPricing.startingFrom}
            </p>
            <p className="mt-4 text-sm text-navy-900/65">
              Driveways, patios, walkways &amp; other exterior surfaces.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-navy-900/50">
            Pricing varies by surface size and condition. Contact Ironmark Exteriors for a free quote.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-navy-900">What We Clean</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Driveways & walkways",
                "Patios & pool decks",
                "House & siding exteriors",
                "Deck & fence washing",
                "Pre-paint surface preparation",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-navy-900/80">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6.5 10.3l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-navy-900">Restore Your Curb Appeal</h2>
            <p className="mt-4 text-navy-900/75">
              Dirt, grime, mold, and algae build up on exterior surfaces over time, making even a well-maintained
              property look neglected. Our pressure washing service safely removes built-up buildup and stains,
              restoring your driveway, patio, or walkway to like-new condition.
            </p>
            <p className="mt-4 text-navy-900/75">
              Contact us for a free, no-obligation quote based on your property&apos;s specific surfaces and condition.
            </p>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Where We Work</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Pressure Washing Near You</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/pressure-washing/${area.slug}`}
                className="group rounded-2xl border border-navy-900/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <h3 className="mb-2 text-lg font-bold text-navy-900">Pressure Washing in {area.name}</h3>
                <p className="text-sm leading-relaxed text-navy-900/70">
                  Starting from ${pressureWashingPricing.startingFrom}. Pricing varies by surface size and condition.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
