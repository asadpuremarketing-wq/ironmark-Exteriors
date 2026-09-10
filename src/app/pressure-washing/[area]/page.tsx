import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import PressureWashingQuoteCard from "@/components/PressureWashingQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import CTA from "@/components/CTA";
import OtherOffersInCity from "@/components/OtherOffersInCity";
import { business, serviceAreas, pressureWashingAreaSlugs, pressureWashingPricing } from "@/lib/data";
import { whyChooseParagraph, bookingLine, rotateFaqs, neighbourhoodLine } from "@/lib/offerContent";

type Params = Promise<{ area: string }>;

function getArea(slug: string) {
  if (!pressureWashingAreaSlugs.includes(slug as (typeof pressureWashingAreaSlugs)[number])) return undefined;
  return serviceAreas.find((a) => a.slug === slug);
}

export function generateStaticParams() {
  return pressureWashingAreaSlugs.map((slug) => ({ area: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const title = `Pressure Washing ${area.name}, ON | Starting from $${pressureWashingPricing.startingFrom} | Ironmark Exteriors`;
  const description = `Professional pressure washing in ${area.name}, ON for driveways, patios, and walkways starting from $${pressureWashingPricing.startingFrom}. Free quotes, licensed & insured.`;
  return {
    title,
    description,
    alternates: { canonical: `/pressure-washing/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/pressure-washing/${area.slug}` },
  };
}

const faqPool = (areaName: string) => [
  {
    q: `How much does pressure washing cost in ${areaName}?`,
    a: `Pressure washing in ${areaName} starts from $${pressureWashingPricing.startingFrom}. The final price depends on the size, condition, and type of surface being cleaned, contact us for a free quote.`,
  },
  {
    q: "What surfaces can you pressure wash?",
    a: "Driveways, patios, walkways, house siding, decks, and fences. If you're not sure whether a surface is a good fit, send us a photo and we'll let you know.",
  },
  {
    q: "Will pressure washing damage my driveway or patio?",
    a: "No. We adjust pressure and technique based on the surface material, concrete, interlock, wood, or siding all get treated differently to clean effectively without causing damage.",
  },
  {
    q: "How often should I pressure wash my property?",
    a: "Most homeowners in the area get driveways and patios washed once a year, typically in spring, with siding done every 1 to 2 years depending on shade and tree cover.",
  },
  {
    q: "Do I need to be home during the service?",
    a: "Not necessarily, as long as we have clear access to the areas being cleaned and a water source. We'll confirm the details when you book.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every pressure washing job is completed by trained, experienced crews.",
  },
];

export default async function PressureWashingAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const index = pressureWashingAreaSlugs.indexOf(slug as (typeof pressureWashingAreaSlugs)[number]);
  const areaFaqs = rotateFaqs(faqPool(area.name), index, 4);
  const swapSections = index % 2 === 1;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pressure Washing",
    name: `Pressure Washing Services in ${area.name}, ON`,
    description: `Pressure washing for driveways, patios, walkways and exterior surfaces in ${area.name}, ON.`,
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
        name: "Pressure Washing",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: pressureWashingPricing.startingFrom,
          priceCurrency: "CAD",
        },
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
          <h2 className="text-2xl font-extrabold text-navy-900">Why {area.name} Homeowners Choose Us</h2>
          <p className="mt-4 text-navy-900/75">{whyChooseParagraph("pressure washing", area, index)}</p>
          <p className="mt-4 text-navy-900/75">{bookingLine(index)}</p>
        </div>
      </div>
    </section>
  );

  const faqSection = (
    <section key="faq" className="section-y bg-white">
      <div className="container-max max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {areaFaqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-navy-900/10 p-6">
              <h3 className="text-base font-bold text-navy-900">{f.q}</h3>
              <p className="mt-2 text-sm text-navy-900/70">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Pressure Washing in ${area.name}, ON, Starting from $${pressureWashingPricing.startingFrom}`}
        subtitle={`Driveways, patios, walkways and more for homeowners in ${area.name}. Pricing varies by surface size and condition.`}
        showCta={false}
        formSlot={<PressureWashingQuoteCard source={`pressure-washing-${area.slug}`} />}
      />

      <GoogleReviews />

      {/* Pricing */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Pressure Washing Prices in {area.name}
            </h2>
          </div>
          <div className="mx-auto max-w-md rounded-2xl border-2 border-brand-blue bg-brand-blue/5 p-8 text-center shadow-lg shadow-brand-blue/10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">Starting From</p>
            <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
              ${pressureWashingPricing.startingFrom}
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-navy-900/50">
            Pricing varies by surface size and condition. Contact Ironmark Exteriors for a free quote covering{" "}
            {neighbourhoodLine(area)} and the rest of {area.name}.
          </p>
        </div>
      </section>

      {swapSections ? [faqSection, includedSection] : [includedSection, faqSection]}

      <OtherOffersInCity currentSlug="pressure-washing" area={area} />

      {/* Nearby areas */}
      <section className="section-y bg-navy-950">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-white">
            Pressure Washing in Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {pressureWashingAreaSlugs
              .filter((s) => s !== area.slug)
              .map((s) => {
                const a = serviceAreas.find((sa) => sa.slug === s);
                if (!a) return null;
                return (
                  <Link
                    key={s}
                    href={`/pressure-washing/${s}`}
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
