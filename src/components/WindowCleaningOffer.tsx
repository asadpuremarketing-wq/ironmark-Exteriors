import Link from "next/link";
import Hero from "@/components/Hero";
import WindowCleaningQuoteCard from "@/components/WindowCleaningQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import CTA from "@/components/CTA";
import { business, serviceAreas, windowCleaningAreaSlugs, windowCleaningPricing } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/breadcrumb";

export function windowCleaningMeta() {
  const title = `Window Cleaning Services | Starting at $${windowCleaningPricing.oneStorey}`;
  const description = `Interior & exterior window cleaning for residential properties starting at $${windowCleaningPricing.oneStorey} for 1-storey homes and $${windowCleaningPricing.twoStorey} for 2-storey homes. Serving Hamilton, Burlington, Brantford, Stoney Creek, Grimsby, St. Catharines, and Niagara Falls. Commercial properties available by custom quote.`;
  return { title, description };
}

/**
 * The main Window Cleaning offer page content, rendered at
 * /services/windows (the URL the Services nav links to). Extracted as a
 * component so /window-cleaning/[area] city pages can share the same
 * pricing/schema constants without duplicating the whole page.
 */
export default function WindowCleaningOffer() {
  const { description } = windowCleaningMeta();
  const areas = windowCleaningAreaSlugs
    .map((slug) => serviceAreas.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Window Cleaning",
    name: "Window Cleaning Services",
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
        name: "Window Cleaning, 1 Storey House",
        price: windowCleaningPricing.oneStorey,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Window Cleaning, 2 Storey House",
        price: windowCleaningPricing.twoStorey,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  const breadcrumbSchemaData = breadcrumbSchema([{ name: "Window Cleaning", path: "/services/windows" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <Hero
        eyebrow="Hamilton, ON & Surrounding Areas"
        title={`Window Cleaning Services, Starting at $${windowCleaningPricing.oneStorey}`}
        subtitle="Interior & exterior window cleaning for residential properties. Licensed, insured, and trusted across Southern Ontario."
        showCta={false}
        formSlot={<WindowCleaningQuoteCard source="services-windows" />}
      />

      <GoogleReviews />

      {/* Pricing */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Window Cleaning Pricing</h2>
          </div>
          <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy-900/10 p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-navy-900/50">1 Storey House</p>
              <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
                ${windowCleaningPricing.oneStorey}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-navy-900/40">Starting At</p>
            </div>
            <div className="rounded-2xl border-2 border-brand-blue bg-brand-blue/5 p-8 text-center shadow-lg shadow-brand-blue/10">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">2 Storey House</p>
              <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
                ${windowCleaningPricing.twoStorey}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-navy-900/40">Starting At</p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-navy-900/50">
            Pricing may vary based on the number, size, and accessibility of windows. Commercial properties available
            by custom quote.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-navy-900">What&apos;s Included</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Interior & exterior glass cleaning",
                "Window sill & track wipe-down",
                "Screen cleaning (on request)",
                "Streak-free finish, every time",
                "Careful, insured crews around landscaping & property",
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
            <h2 className="text-2xl font-extrabold text-navy-900">We Also Install &amp; Replace Windows</h2>
            <p className="mt-4 text-navy-900/75">
              Beyond cleaning, Ironmark Exteriors supplies and installs energy-efficient windows, repairs trim and
              flashing, and handles custom sizing for any opening, everything your windows need to look great and
              perform well year-round.
            </p>
            <p className="mt-4 text-navy-900/75">
              Contact us for a free quote on new window installation or replacement alongside your cleaning.
            </p>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Where We Work</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Window Cleaning Near You</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/window-cleaning/${area.slug}`}
                className="group rounded-2xl border border-navy-900/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <h3 className="mb-2 text-lg font-bold text-navy-900">Window Cleaning in {area.name}</h3>
                <p className="text-sm leading-relaxed text-navy-900/70">
                  Starting at ${windowCleaningPricing.oneStorey} for 1-storey homes, ${windowCleaningPricing.twoStorey}{" "}
                  for 2-storey homes.
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
