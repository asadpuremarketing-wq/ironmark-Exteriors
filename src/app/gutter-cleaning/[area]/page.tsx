import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import GutterCleaningQuoteCard from "@/components/GutterCleaningQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import OtherOffersInCity from "@/components/OtherOffersInCity";
import SmartImage from "@/components/SmartImage";
import PriceCard from "@/components/PriceCard";
import {
  business,
  serviceAreas,
  gutterCleaningAreaSlugs,
  gutterCleaningPricing,
  gutterCleaningProjects,
} from "@/lib/data";
import { whyChooseParagraph, bookingLine, rotateFaqs, neighbourhoodLine } from "@/lib/offerContent";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { gutterCleaningCityContent } from "@/lib/gutterCleaningCityContent";

type Params = Promise<{ area: string }>;

// Stoney Creek and Hamilton have their own bespoke pages (static routes,
// which Next.js prioritizes over this dynamic one) so they can have a
// genuinely different structure and deeper content than the shared template.
const templatedAreaSlugs = gutterCleaningAreaSlugs.filter((s) => s !== "stoney-creek" && s !== "hamilton");

function getArea(slug: string) {
  if (!templatedAreaSlugs.includes(slug as (typeof templatedAreaSlugs)[number])) return undefined;
  return serviceAreas.find((a) => a.slug === slug);
}

export function generateStaticParams() {
  return templatedAreaSlugs.map((slug) => ({ area: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const title = `Gutter Cleaning ${area.name}, ON | Starting at $${gutterCleaningPricing.oneStorey}`;
  const description = `Professional gutter cleaning in ${area.name}, ON starting at $${gutterCleaningPricing.oneStorey} for 1-storey homes and $${gutterCleaningPricing.twoStorey} for 2-storey homes. Licensed & insured. Book your free estimate today.`;
  return {
    title,
    description,
    alternates: { canonical: `/gutter-cleaning/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/gutter-cleaning/${area.slug}` },
  };
}

const faqPool = (areaName: string) => [
  {
    q: `How much does gutter cleaning cost in ${areaName}?`,
    a: `Gutter cleaning in ${areaName} starts at $${gutterCleaningPricing.oneStorey} for a 1-storey home and $${gutterCleaningPricing.twoStorey} for a 2-storey home. The price covers full removal of leaves and debris, a downspout check, and a flush test.`,
  },
  {
    q: "How often should I get my gutters cleaned?",
    a: "Most homes benefit from gutter cleaning twice a year, once in late spring and once in late fall after leaves have dropped. Homes surrounded by mature trees may need cleaning more often.",
  },
  {
    q: "What's included in your gutter cleaning service?",
    a: "We remove all leaves, debris, and buildup from your gutters, clear and check downspouts for blockages, flush the system with water to confirm proper flow, and haul away all debris, no mess left behind.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every gutter cleaning job is completed by trained, experienced crews.",
  },
  {
    q: "What happens if my gutters are damaged during cleaning?",
    a: "Our crews are trained to work carefully around existing gutter systems. If we spot damage, loose brackets, or separated seams while cleaning, we'll flag it and quote any repair work separately, no surprise charges.",
  },
  {
    q: "Can you install gutter guards to reduce how often I need cleaning?",
    a: "Yes. We supply and install gutter guards that cut down significantly on debris buildup, especially useful for homes with heavy tree cover. Ask about guards when you book your cleaning.",
  },
  {
    q: "How long does gutter cleaning take?",
    a: "Most 1-storey homes take under an hour. 2-storey homes or properties with a lot of linear footage of gutter can take a bit longer, we'll give you a time estimate when you book.",
  },
  {
    q: "Do I need to be home?",
    a: "No, as long as we have access to the property. Many homeowners have us come by during the day while they're at work and pay afterward.",
  },
  {
    q: "Do you clean gutter guards?",
    a: "Yes. If you already have gutter guards installed, we clear debris off the top and check that they're seated properly. If a guard is damaged or letting debris through, we'll flag it.",
  },
  {
    q: "What happens if a downspout is blocked?",
    a: "We clear it as part of the standard cleaning. If a downspout is cracked, disconnected, or too small to keep up with heavy rain, we'll point it out and quote a repair or extension separately.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Inspection",
    text: "We walk the roofline and check every section of gutter and downspout for buildup, damage, or loose brackets before we start.",
  },
  {
    number: "02",
    title: "Debris Removal",
    text: "Leaves, pine needles, shingle grit, and any other buildup are removed by hand from every section of gutter.",
  },
  {
    number: "03",
    title: "Downspout Clearing",
    text: "Each downspout is checked and cleared of blockages so water has a clear path off the roof and away from the foundation.",
  },
  {
    number: "04",
    title: "Water-Flow Testing",
    text: "We run water through the system to confirm it drains properly end to end, not just that the gutter looks clear.",
  },
  {
    number: "05",
    title: "Final Inspection",
    text: "A last pass to check for anything missed, along with any damage worth flagging, like a separated seam or a sagging section.",
  },
  {
    number: "06",
    title: "Cleanup",
    text: "All debris is bagged and hauled away. We don't leave leaves or gutter waste on your lawn, driveway, or landscaping.",
  },
];

const signsPool = [
  "Water spilling over the sides of the gutter during or after rain",
  "Visible sagging or gutters pulling away from the fascia",
  "Plants, weeds, or moss growing inside the gutter",
  "Water stains or streaking on the siding below the gutter line",
  "Standing water or a sluggish drain after you run a hose through it",
  "Birds, squirrels, or other pests nesting in the gutter",
];

export default async function GutterCleaningAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const index = gutterCleaningAreaSlugs.indexOf(slug as (typeof gutterCleaningAreaSlugs)[number]);
  const areaFaqs = rotateFaqs(faqPool(area.name), index, 7);
  const areaSigns = rotateFaqs(signsPool, index, signsPool.length);
  const swapSections = index % 2 === 1;
  const projects = gutterCleaningProjects[area.slug];
  const cityContent = gutterCleaningCityContent[area.slug];

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
    mainEntity: areaFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: "Gutter Cleaning", path: "/services/gutters" },
    { name: `Gutter Cleaning in ${area.name}`, path: `/gutter-cleaning/${area.slug}` },
  ]);

  const includedSection = (
    <section key="included" className="section-y bg-[#f7f9fb]">
      <div className="container-max grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-navy-900/10 bg-white p-8 shadow-sm">
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
        <div className="rounded-[28px] border border-navy-900/10 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-navy-900">Why {area.name} Homeowners Choose Us</h2>
          <p className="mt-4 text-navy-900/75">{whyChooseParagraph("gutter cleaning", area, index)}</p>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Gutter Cleaning in ${area.name}, ON, Starting at $${gutterCleaningPricing.oneStorey}`}
        subtitle={`Fast, affordable gutter cleaning for homeowners in ${area.name}. $${gutterCleaningPricing.oneStorey} for 1-storey homes, $${gutterCleaningPricing.twoStorey} for 2-storey homes. Licensed & insured.`}
        showCta={false}
        formSlot={<GutterCleaningQuoteCard source={`gutter-cleaning-${area.slug}`} />}
      />

      <GoogleReviews />

      {/* Our process */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How We Work</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Our Gutter Cleaning Process in {area.name}
            </h2>
            {cityContent && (
              <p className="mx-auto mt-4 max-w-2xl text-navy-900/70">{cityContent.processIntro}</p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-[28px] border border-navy-900/10 bg-[#f7f9fb] p-7 transition-shadow duration-300 hover:shadow-lg"
              >
                <span className="font-heading text-4xl font-extrabold text-brand-blue/20">{step.number}</span>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real completed projects, only shown for cities with one or more on file */}
      {projects?.map((project, projectIndex) => (
        <section
          key={project.title}
          className={`section-y ${projectIndex % 2 === 0 ? "bg-[#f7f9fb]" : "bg-white"}`}
        >
          <div className="container-max">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Real Results</p>
              <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">{project.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-navy-900/70">{project.description}</p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {project.photoPairs.map((pair, i) => (
                <div
                  key={i}
                  className="rounded-[28px] border border-navy-900/10 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative overflow-hidden rounded-2xl">
                      <SmartImage
                        src={pair.before}
                        alt={pair.beforeAlt}
                        fallbackLabel="Before"
                        className="aspect-4/5"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-navy-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Before
                      </span>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl">
                      <SmartImage
                        src={pair.after}
                        alt={pair.afterAlt}
                        fallbackLabel="After"
                        className="aspect-4/5"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                        After
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Signs your gutters need cleaning */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Know the Warning Signs</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Signs Your Gutters Need Cleaning</h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {areaSigns.map((sign) => (
              <div key={sign} className="flex items-start gap-3 rounded-2xl border border-navy-900/10 p-5">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" fill="none">
                  <path
                    d="M10 6v5M10 14h.01M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm text-navy-900/80">{sign}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal gutter care, unique per city */}
      {cityContent && (
        <section className="section-y bg-[#f7f9fb]">
          <div className="container-max max-w-3xl">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Local Conditions</p>
              <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
                Seasonal Gutter Care in {area.name}
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-navy-900/75">
              {cityContent.seasonal.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <PriceCard
              label="1 Storey House"
              price={gutterCleaningPricing.oneStorey}
              note="Full gutter and downspout cleaning for single-storey homes."
            />
            <PriceCard
              label="2 Storey House"
              price={gutterCleaningPricing.twoStorey}
              note="Full gutter and downspout cleaning for two-storey homes."
              highlighted
            />
          </div>
          <p className="mt-8 text-center text-sm text-navy-900/50">
            Serving {neighbourhoodLine(area)} and the rest of {area.name}, {area.province}.
          </p>
        </div>
      </section>

      {swapSections ? [faqSection, includedSection] : [includedSection, faqSection]}

      {/* Related gutter services */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-navy-900">
            Related Gutter Services in {area.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/services/gutters#repair"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Gutter Repair
            </Link>
            <Link
              href="/services/gutters#installation"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Gutter Installation
            </Link>
            <Link
              href="/services/gutters#guards"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Gutter Guards
            </Link>
            <Link
              href="/services/gutters#downspouts"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Downspout Services
            </Link>
          </div>
        </div>
      </section>

      <OtherOffersInCity currentSlug="gutters" area={area} />

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
