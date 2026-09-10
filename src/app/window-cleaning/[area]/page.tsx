import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import WindowCleaningQuoteCard from "@/components/WindowCleaningQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import OtherOffersInCity from "@/components/OtherOffersInCity";
import { business, serviceAreas, windowCleaningAreaSlugs, windowCleaningPricing } from "@/lib/data";
import { whyChooseParagraph, bookingLine, rotateFaqs, neighbourhoodLine } from "@/lib/offerContent";

type Params = Promise<{ area: string }>;

function getArea(slug: string) {
  if (!windowCleaningAreaSlugs.includes(slug as (typeof windowCleaningAreaSlugs)[number])) return undefined;
  return serviceAreas.find((a) => a.slug === slug);
}

export function generateStaticParams() {
  return windowCleaningAreaSlugs.map((slug) => ({ area: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const title = `Window Cleaning ${area.name}, ON | Starting at $${windowCleaningPricing.oneStorey}`;
  const description = `Interior & exterior window cleaning in ${area.name}, ON starting at $${windowCleaningPricing.oneStorey} for 1-storey homes and $${windowCleaningPricing.twoStorey} for 2-storey homes. Licensed & insured. Book your free estimate today.`;
  return {
    title,
    description,
    alternates: { canonical: `/window-cleaning/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/window-cleaning/${area.slug}` },
  };
}

const faqPool = (areaName: string) => [
  {
    q: `How much does window cleaning cost in ${areaName}?`,
    a: `Window cleaning in ${areaName} starts at $${windowCleaningPricing.oneStorey} for a 1-storey home and $${windowCleaningPricing.twoStorey} for a 2-storey home. Pricing may vary based on the number, size, and accessibility of windows.`,
  },
  {
    q: "Do you clean the interior and exterior of the windows?",
    a: "Yes, our standard service covers both interior and exterior glass, plus sills and tracks. Screens can be cleaned on request.",
  },
  {
    q: "Do you offer window cleaning for commercial properties?",
    a: "Yes. Commercial properties are available by custom quote, contact us with your building details and we'll put together a price.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every window cleaning job is completed by trained, experienced crews.",
  },
  {
    q: "How long does a typical window cleaning take?",
    a: "Most 1-storey homes take about an hour to an hour and a half. 2-storey homes and properties with more windows take longer, we'll give you a time estimate when you book.",
  },
  {
    q: "What time of year is best for window cleaning?",
    a: "Spring and fall are the most popular, but window cleaning can be done any time weather permits. Many homeowners book twice a year to keep windows consistently streak-free.",
  },
];

export default async function WindowCleaningAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const index = windowCleaningAreaSlugs.indexOf(slug as (typeof windowCleaningAreaSlugs)[number]);
  const areaFaqs = rotateFaqs(faqPool(area.name), index, 4);
  const swapSections = index % 2 === 1;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Window Cleaning",
    name: `Window Cleaning Services in ${area.name}, ON`,
    description: `Interior & exterior window cleaning for 1 and 2 storey residential homes in ${area.name}, ON. Commercial properties available by custom quote.`,
    provider: {
      "@type": "RoofingContractor",
      name: business.name,
      telephone: business.phone,
      url: business.siteUrl,
    },
    areaServed: { "@type": "City", name: `${area.name}, ${area.province}` },
    offers: [
      {
        "@type": "Offer",
        name: "Window Cleaning, 1 Storey House",
        price: windowCleaningPricing.oneStorey,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: `${area.name}, ${area.province}` },
      },
      {
        "@type": "Offer",
        name: "Window Cleaning, 2 Storey House",
        price: windowCleaningPricing.twoStorey,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: `${area.name}, ${area.province}` },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: areaFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const includedSection = (
    <section key="included" className="section-y bg-[#f7f9fb]">
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
          <h2 className="text-2xl font-extrabold text-navy-900">Why {area.name} Homeowners Choose Us</h2>
          <p className="mt-4 text-navy-900/75">{whyChooseParagraph("window cleaning", area, index)}</p>
          <p className="mt-4 text-navy-900/75">{bookingLine(index)}</p>
        </div>
      </div>
    </section>
  );

  const faqSection = (
    <section key="faq" className="section-y bg-white">
      <div className="container-max max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
        <FaqAccordion faqs={areaFaqs} />
      </div>
    </section>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Window Cleaning in ${area.name}, ON, Starting at $${windowCleaningPricing.oneStorey}`}
        subtitle={`Interior & exterior window cleaning for homeowners in ${area.name}. $${windowCleaningPricing.oneStorey} for 1-storey homes, $${windowCleaningPricing.twoStorey} for 2-storey homes. Licensed & insured.`}
        showCta={false}
        formSlot={<WindowCleaningQuoteCard source={`window-cleaning-${area.slug}`} />}
      />

      <GoogleReviews />

      {/* Pricing */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Window Cleaning Prices in {area.name}
            </h2>
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
            Pricing may vary based on the number, size, and accessibility of windows. Commercial properties
            available by custom quote.
          </p>
          <p className="mt-4 text-center text-sm text-navy-900/50">
            Serving {neighbourhoodLine(area)} and the rest of {area.name}, {area.province}.
          </p>
        </div>
      </section>

      {swapSections ? [faqSection, includedSection] : [includedSection, faqSection]}

      <OtherOffersInCity currentSlug="windows" area={area} />

      {/* Nearby areas */}
      <section className="section-y bg-navy-950">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-white">
            Window Cleaning in Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {windowCleaningAreaSlugs
              .filter((s) => s !== area.slug)
              .map((s) => {
                const a = serviceAreas.find((sa) => sa.slug === s);
                if (!a) return null;
                return (
                  <Link
                    key={s}
                    href={`/window-cleaning/${s}`}
                    className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-brand-silver transition hover:border-brand-blue hover:text-white"
                  >
                    {a.name}, {a.province}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
