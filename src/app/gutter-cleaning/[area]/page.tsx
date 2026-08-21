import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import GutterCleaningQuoteCard from "@/components/GutterCleaningQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import CTA from "@/components/CTA";
import { business, serviceAreas, gutterCleaningAreaSlugs, gutterCleaningPricing } from "@/lib/data";

type Params = Promise<{ area: string }>;

function getArea(slug: string) {
  if (!gutterCleaningAreaSlugs.includes(slug as (typeof gutterCleaningAreaSlugs)[number])) return undefined;
  return serviceAreas.find((a) => a.slug === slug);
}

export function generateStaticParams() {
  return gutterCleaningAreaSlugs.map((slug) => ({ area: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const title = `Gutter Cleaning ${area.name}, ON | Starting at $${gutterCleaningPricing.oneStorey} — Ironmark Exteriors`;
  const description = `Professional gutter cleaning in ${area.name}, ON starting at $${gutterCleaningPricing.oneStorey} for 1-storey homes and $${gutterCleaningPricing.twoStorey} for 2-storey homes. Licensed & insured. Book your free estimate today.`;
  return {
    title,
    description,
    alternates: { canonical: `/gutter-cleaning/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/gutter-cleaning/${area.slug}` },
  };
}

const faqs = (areaName: string) => [
  {
    q: `How much does gutter cleaning cost in ${areaName}?`,
    a: `Gutter cleaning in ${areaName} starts at $${gutterCleaningPricing.oneStorey} for a 1-storey home and $${gutterCleaningPricing.twoStorey} for a 2-storey home. The price covers full removal of leaves and debris, a downspout check, and a flush test.`,
  },
  {
    q: "How often should I get my gutters cleaned?",
    a: "Most homes benefit from gutter cleaning twice a year — once in late spring and once in late fall after leaves have dropped. Homes surrounded by mature trees may need cleaning more often.",
  },
  {
    q: "What's included in your gutter cleaning service?",
    a: "We remove all leaves, debris, and buildup from your gutters, clear and check downspouts for blockages, flush the system with water to confirm proper flow, and haul away all debris — no mess left behind.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every gutter cleaning job is completed by trained, experienced crews.",
  },
];

export default async function GutterCleaningAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const areaFaqs = faqs(area.name);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Gutter Cleaning",
    name: `Gutter Cleaning Services in ${area.name}, ON`,
    description: `Professional gutter cleaning for 1 and 2 storey homes in ${area.name}, ON.`,
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
        name: "Gutter Cleaning — 1 Storey House",
        price: gutterCleaningPricing.oneStorey,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: `${area.name}, ${area.province}` },
      },
      {
        "@type": "Offer",
        name: "Gutter Cleaning — 2 Storey House",
        price: gutterCleaningPricing.twoStorey,
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Gutter Cleaning in ${area.name}, ON — Starting at $${gutterCleaningPricing.oneStorey}`}
        subtitle={`Fast, affordable gutter cleaning for homeowners in ${area.name}. $${gutterCleaningPricing.oneStorey} for 1-storey homes, $${gutterCleaningPricing.twoStorey} for 2-storey homes. Licensed & insured.`}
        showCta={false}
        formSlot={<GutterCleaningQuoteCard source={`gutter-cleaning-${area.slug}`} />}
      />

      {/* Pricing */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Gutter Cleaning Prices in {area.name}
            </h2>
          </div>
          <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy-900/10 p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-navy-900/50">1 Storey House</p>
              <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
                ${gutterCleaningPricing.oneStorey}
              </p>
              <p className="mt-4 text-sm text-navy-900/65">
                Full gutter and downspout cleaning for single-storey homes.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-brand-blue bg-brand-blue/5 p-8 text-center shadow-lg shadow-brand-blue/10">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">2 Storey House</p>
              <p className="mt-3 font-heading text-5xl font-extrabold text-navy-900">
                ${gutterCleaningPricing.twoStorey}
              </p>
              <p className="mt-4 text-sm text-navy-900/65">
                Full gutter and downspout cleaning for two-storey homes.
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-navy-900/50">
            Serving homeowners throughout {area.name}, {area.province} and surrounding neighbourhoods.
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
                "Full removal of leaves & debris from gutters",
                "Downspout inspection & clearing",
                "Flush test to confirm proper water flow",
                "Gutter guard inspection (if installed)",
                "Complete debris cleanup & haul-away",
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
            <p className="mt-4 text-navy-900/75">
              Clogged gutters send water straight down your foundation, siding, and landscaping — a small problem
              that gets expensive fast. Ironmark Exteriors keeps homes across {area.name} protected with fast,
              affordable gutter cleaning backed by licensed, insured crews.
            </p>
            <p className="mt-4 text-navy-900/75">
              Book online in minutes and we&apos;ll confirm a time that works for you — most jobs are completed the
              same week.
            </p>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* FAQ */}
      <section className="section-y bg-white">
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

      {/* Nearby areas */}
      <section className="section-y bg-navy-950">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-white">
            Gutter Cleaning in Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {gutterCleaningAreaSlugs
              .filter((s) => s !== area.slug)
              .map((s) => {
                const a = serviceAreas.find((sa) => sa.slug === s);
                if (!a) return null;
                return (
                  <Link
                    key={s}
                    href={`/gutter-cleaning/${s}`}
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
