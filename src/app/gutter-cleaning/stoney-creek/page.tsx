import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import GutterCleaningQuoteCard from "@/components/GutterCleaningQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import OtherOffersInCity from "@/components/OtherOffersInCity";
import SmartImage from "@/components/SmartImage";
import {
  business,
  serviceAreas,
  gutterCleaningAreaSlugs,
  gutterCleaningPricing,
  gutterCleaningProjects,
} from "@/lib/data";
import { neighbourhoodLine } from "@/lib/offerContent";
import { breadcrumbSchema } from "@/lib/breadcrumb";

const area = serviceAreas.find((a) => a.slug === "stoney-creek")!;
const projects = gutterCleaningProjects["stoney-creek"] ?? [];

export const metadata: Metadata = {
  title: `Gutter Cleaning ${area.name}, ON | Starting at $${gutterCleaningPricing.oneStorey}`,
  description: `Real completed gutter cleaning jobs in ${area.name}, ON. Full leaf and debris removal, downspout flush, and drainage check starting at $${gutterCleaningPricing.oneStorey} for 1-storey homes. Licensed & insured.`,
  alternates: { canonical: "/gutter-cleaning/stoney-creek" },
  openGraph: {
    title: `Gutter Cleaning ${area.name}, ON | Starting at $${gutterCleaningPricing.oneStorey}`,
    description: `Real completed gutter cleaning jobs in ${area.name}, ON, starting at $${gutterCleaningPricing.oneStorey}.`,
    url: `${business.siteUrl}/gutter-cleaning/stoney-creek`,
  },
};

const steps = [
  {
    number: "01",
    title: "Book Your Free Quote",
    text: "Tell us a bit about your home, one or two storeys, and we'll confirm your price on the spot. No in-person visit needed to get started.",
  },
  {
    number: "02",
    title: "We Clear Every Gutter by Hand",
    text: "Our crew removes leaves, pine needles, and built-up debris from every section, then checks each downspout for blockages.",
  },
  {
    number: "03",
    title: "Flush Test & Cleanup",
    text: "We run water through the system to confirm proper drainage, then haul away all debris so your property looks exactly like we found it.",
  },
];

const faqs = [
  {
    q: `How much does gutter cleaning cost in ${area.name}?`,
    a: `Gutter cleaning in ${area.name} starts at $${gutterCleaningPricing.oneStorey} for a 1-storey home and $${gutterCleaningPricing.twoStorey} for a 2-storey home. That covers full debris removal, a downspout check, and a flush test.`,
  },
  {
    q: `Do you have photos of gutter cleaning jobs you've done in ${area.name}?`,
    a: "Yes, you can see real before-and-after photos from a recent job in this area further up the page. We take photos of most jobs on request.",
  },
  {
    q: "How long does a typical gutter cleaning job take?",
    a: "Most homes take under an hour for a single-storey and slightly longer for two-storey homes with more linear footage of gutter to clear.",
  },
  {
    q: "Do I need to be home for the appointment?",
    a: "No, as long as we can access the property. Many homeowners have us come by while they're at work and pay afterward.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Yes. Ironmark Exteriors is fully licensed and insured, and every job in ${area.name} is completed by trained, experienced crews.`,
  },
];

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
      name: "Gutter Cleaning, 1 Storey House",
      price: gutterCleaningPricing.oneStorey,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "City", name: `${area.name}, ${area.province}` },
    },
    {
      "@type": "Offer",
      name: "Gutter Cleaning, 2 Storey House",
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
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchemaData = breadcrumbSchema([
  { name: "Gutter Cleaning", path: "/services/gutters" },
  { name: `Gutter Cleaning in ${area.name}`, path: "/gutter-cleaning/stoney-creek" },
]);

export default function StoneyCreekGutterCleaningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Real Jobs, Real Results in ${area.name}, ${area.province}`}
        title={`Gutter Cleaning in ${area.name}, ON`}
        subtitle={`See an actual completed job below. $${gutterCleaningPricing.oneStorey} for 1-storey homes, $${gutterCleaningPricing.twoStorey} for 2-storey homes. Licensed & insured.`}
        showCta={false}
        formSlot={<GutterCleaningQuoteCard source="gutter-cleaning-stoney-creek" />}
      />

      <GoogleReviews />

      {/* Real project, shown as a large stacked before/after rather than the small side-by-side grid used elsewhere */}
      {projects.map((project) => (
        <section key={project.title} className="section-y bg-white">
          <div className="container-max max-w-4xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
                A Job We Just Finished
              </p>
              <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">{project.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-navy-900/70">{project.description}</p>
            </div>
            <div className="flex flex-col gap-10">
              {project.photoPairs.map((pair, i) => (
                <div key={i} className="grid gap-4 sm:grid-cols-2 sm:items-center">
                  <div className="relative overflow-hidden rounded-2xl border border-navy-900/10 shadow-sm">
                    <SmartImage src={pair.before} alt={pair.beforeAlt} fallbackLabel="Before" className="aspect-square sm:aspect-4/5" />
                    <span className="absolute left-3 top-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-navy-900/10 shadow-sm">
                    <SmartImage src={pair.after} alt={pair.afterAlt} fallbackLabel="After" className="aspect-square sm:aspect-4/5" />
                    <span className="absolute left-3 top-3 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      After
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* How it works, a 3-step process not used on other city pages */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How It Works</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Booking Gutter Cleaning in {area.name}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative rounded-2xl border border-navy-900/10 bg-white p-7">
                <span className="font-heading text-4xl font-extrabold text-brand-blue/20">{step.number}</span>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing as a single comparison bar instead of two separate cards */}
      <section className="section-y bg-white">
        <div className="container-max max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Gutter Cleaning Prices in {area.name}
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-navy-900/10">
            <div className="flex flex-col divide-y divide-navy-900/10 sm:flex-row sm:divide-x sm:divide-y-0">
              <div className="flex flex-1 items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-navy-900/50">1 Storey House</p>
                  <p className="mt-1 text-xs text-navy-900/50">Full gutter & downspout cleaning</p>
                </div>
                <p className="font-heading text-4xl font-extrabold text-navy-900">${gutterCleaningPricing.oneStorey}</p>
              </div>
              <div className="flex flex-1 items-center justify-between gap-4 bg-brand-blue/5 p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">2 Storey House</p>
                  <p className="mt-1 text-xs text-navy-900/50">Full gutter & downspout cleaning</p>
                </div>
                <p className="font-heading text-4xl font-extrabold text-navy-900">${gutterCleaningPricing.twoStorey}</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-navy-900/50">
            Serving {neighbourhoodLine(area)} and the rest of {area.name}, {area.province}.
          </p>
        </div>
      </section>

      {/* Single trust narrative instead of a bullet list + separate why-choose block */}
      <section className="section-y bg-navy-950">
        <div className="container-max max-w-3xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light">
            Why {area.name} Homeowners Call Us Back
          </p>
          <p className="mt-4 text-lg leading-relaxed text-brand-silver/85">
            We don&apos;t just clear leaves out and leave. Every job in {area.name} gets a full downspout check and a
            flush test to confirm water is actually draining before we call it done, and we haul away every bit of
            debris so you&apos;re not left with a mess in the yard. It&apos;s the reason homeowners around{" "}
            {neighbourhoodLine(area)} book us again the following year instead of shopping around.
          </p>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-max max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <OtherOffersInCity currentSlug="gutters" area={area} />

      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-navy-900">
            Gutter Cleaning in Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {gutterCleaningAreaSlugs
              .filter((s) => s !== "stoney-creek")
              .map((s) => {
                const a = serviceAreas.find((sa) => sa.slug === s);
                if (!a) return null;
                return (
                  <Link
                    key={s}
                    href={`/gutter-cleaning/${s}`}
                    className="rounded-full border-2 border-brand-blue/20 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
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
