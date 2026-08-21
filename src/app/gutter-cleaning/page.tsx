import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import GutterCleaningQuoteCard from "@/components/GutterCleaningQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import CTA from "@/components/CTA";
import { business, serviceAreas, gutterCleaningAreaSlugs, gutterCleaningPricing } from "@/lib/data";

const title = `Gutter Cleaning Services | Starting at $${gutterCleaningPricing.oneStorey} — Ironmark Exteriors`;
const description = `Professional gutter cleaning starting at $${gutterCleaningPricing.oneStorey} for 1-storey homes and $${gutterCleaningPricing.twoStorey} for 2-storey homes. Serving Hamilton, Burlington, Brantford, Stoney Creek, Grimsby, St. Catharines, and Niagara Falls. Licensed & insured.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gutter-cleaning" },
  openGraph: { title, description, url: `${business.siteUrl}/gutter-cleaning` },
};

export default function GutterCleaningHubPage() {
  const areas = gutterCleaningAreaSlugs
    .map((slug) => serviceAreas.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Gutter Cleaning",
    name: "Gutter Cleaning Services",
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
        name: "Gutter Cleaning — 1 Storey House",
        price: gutterCleaningPricing.oneStorey,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Gutter Cleaning — 2 Storey House",
        price: gutterCleaningPricing.twoStorey,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <Hero
        eyebrow="Hamilton, ON & Surrounding Areas"
        title={`Gutter Cleaning Services — Starting at $${gutterCleaningPricing.oneStorey}`}
        subtitle="Fast, affordable gutter cleaning for 1 and 2 storey homes. Licensed, insured, and trusted across Southern Ontario."
        showCta={false}
        formSlot={<GutterCleaningQuoteCard source="gutter-cleaning-hub" />}
      />

      {/* Pricing */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Gutter Cleaning Pricing</h2>
          </div>
          <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy-900/10 p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-navy-900/50">1 Storey House</p>
              <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
                ${gutterCleaningPricing.oneStorey}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-brand-blue bg-brand-blue/5 p-8 text-center shadow-lg shadow-brand-blue/10">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">2 Storey House</p>
              <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
                ${gutterCleaningPricing.twoStorey}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Where We Work</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Gutter Cleaning Near You
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/gutter-cleaning/${area.slug}`}
                className="group rounded-2xl border border-navy-900/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <h3 className="mb-2 text-lg font-bold text-navy-900">
                  Gutter Cleaning in {area.name}
                </h3>
                <p className="text-sm leading-relaxed text-navy-900/70">
                  Starting at ${gutterCleaningPricing.oneStorey} for 1-storey homes, ${gutterCleaningPricing.twoStorey}{" "}
                  for 2-storey homes.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />
      <CTA />
    </>
  );
}
