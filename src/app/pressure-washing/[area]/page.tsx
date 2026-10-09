import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import PressureWashingQuoteCard from "@/components/PressureWashingQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import OtherOffersInCity from "@/components/OtherOffersInCity";
import PriceCard from "@/components/PriceCard";
import SmartImage from "@/components/SmartImage";
import CardCarousel from "@/components/CardCarousel";
import { business, serviceAreas, pressureWashingAreaSlugs, pressureWashingPricing } from "@/lib/data";
import { neighbourhoodLine } from "@/lib/offerContent";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import {
  pressureWashingCityContent,
  pressureWashingIntroFallback,
  pressureWashingFaqs,
  pressureWashingSurfaces,
  pressureWashingProcessSteps,
  getArchetype,
} from "@/lib/pressureWashingContent";

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
  const title = `Pressure Washing in ${area.name}, ON | Starting from $${pressureWashingPricing.startingFrom}`;
  const description = `Professional pressure washing in ${area.name}, ON for driveways, patios, and walkways starting from $${pressureWashingPricing.startingFrom}. Free quotes.`;
  return {
    title,
    description,
    alternates: { canonical: `/pressure-washing/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/pressure-washing/${area.slug}` },
  };
}

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SURFACE_ICONS: Record<string, string> = {
  driveways: "M4 4h16v16H4V4Zm0 5.3h16M4 14.7h16M9.3 4v16M14.7 4v16",
  patios: "M3 16c2-3 4 3 6 0s4-3 6 0 4 3 6 0",
  siding: "M4 4h16v16H4V4Zm0 5.3h16M4 14.7h16M9.3 4v16M14.7 4v16",
  "deck-fence": "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  "pre-paint": "M5 10.5l3.5 3.5 6.5-8",
};

export default async function PressureWashingAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const index = pressureWashingAreaSlugs.indexOf(slug as (typeof pressureWashingAreaSlugs)[number]);
  const archetype = getArchetype(index);
  const cityContent = pressureWashingCityContent[area.slug];
  const intro = cityContent?.intro ?? pressureWashingIntroFallback(area, index);
  const quickAnswer = cityContent?.quickAnswer ?? pressureWashingIntroFallback(area, index);
  const localConditions = cityContent?.localConditions ?? [];
  const areaFaqs = pressureWashingFaqs(area, index, pressureWashingPricing.startingFrom);
  const surfaces = pressureWashingSurfaces(index);
  const processSteps = pressureWashingProcessSteps(index);

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

  const breadcrumbItems = [
    { name: "Pressure Washing", path: "/services/pressure-washing" },
    { name: `Pressure Washing in ${area.name}`, path: `/pressure-washing/${area.slug}` },
  ];
  const breadcrumbSchemaData = breadcrumbSchema(breadcrumbItems);

  const quickNav = [
    { href: "#surfaces", label: "Surfaces We Clean" },
    { href: "#pricing", label: "Pricing" },
    { href: "#local", label: "Local Conditions" },
    { href: "#process", label: "Process" },
    { href: "#faq", label: "FAQ" },
  ];

  const quickAnswerSection = (
    <section key="quick-answer" className="bg-white pt-10">
      <div className="container-max">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-blue/15 bg-brand-blue/[0.04] p-6 sm:p-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Quick Answer</p>
          <p className="text-sm leading-relaxed text-navy-900/80">{quickAnswer}</p>
        </div>
      </div>
    </section>
  );

  const surfacesSection = (
    <section key="surfaces" id="surfaces" className="section-y scroll-mt-32 bg-white">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Clean</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Surfaces We Pressure Wash</h2>
        </div>
        <CardCarousel cardWidthClassName="w-[260px] sm:w-[280px]">
          {surfaces.map((s) => (
            <div key={s.title} className="h-full overflow-hidden rounded-[24px] border border-navy-900/10 transition-shadow duration-300 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-900/5">
                <SmartImage src={s.image} alt={s.title} fallbackLabel={s.title} className="absolute inset-0 h-full w-full" />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-brand-blue shadow-sm backdrop-blur-sm">
                  <Icon path={SURFACE_ICONS[s.key]} className="h-4 w-4" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{s.text}</p>
              </div>
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );

  const localConditionsSection = localConditions.length > 0 && (
    <section key="local" id="local" className="section-y scroll-mt-32 bg-[#f7f9fb]">
      <div className="container-max max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Local Conditions</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Pressure Washing in {area.name}</h2>
        </div>
        <div className="flex flex-col gap-5 text-navy-900/75">
          {localConditions.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );

  const pricingSection = (
    <section key="pricing" id="pricing" className="section-y scroll-mt-32 bg-white">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple, Upfront Pricing</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Pressure Washing Prices in {area.name}</h2>
        </div>
        <div className="mx-auto max-w-md">
          <PriceCard
            label="All Exterior Surfaces"
            price={pressureWashingPricing.startingFrom}
            priceLabel="Starting From"
            note="Driveways, patios, walkways, decks, and more."
            highlighted
          />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-navy-900/50">
          Pricing varies by surface size and condition. Contact Ironmark Exteriors for a free quote.
        </p>
      </div>
    </section>
  );

  const processSection = (
    <section key="process" id="process" className="section-y scroll-mt-32 bg-[#f7f9fb]">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How It Works</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Our Pressure Washing Process</h2>
        </div>
        <CardCarousel cardWidthClassName="w-[220px] sm:w-[240px]">
          {processSteps.map((step) => (
            <div key={step.number} className="h-full rounded-[24px] border border-navy-900/10 bg-white p-6 text-center">
              <span className="font-heading text-3xl font-extrabold text-brand-blue/25">{step.number}</span>
              <h3 className="mt-2 text-sm font-bold text-navy-900">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-navy-900/60">{step.text}</p>
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );

  const faqSection = (
    <section key="faq" id="faq" className="section-y scroll-mt-32 bg-white">
      <div className="container-max max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
        <FaqAccordion faqs={areaFaqs} />
      </div>
    </section>
  );

  let middleSections: React.ReactNode[];

  if (archetype === 0) {
    middleSections = [surfacesSection, pricingSection, localConditionsSection, processSection];
  } else if (archetype === 1) {
    middleSections = [pricingSection, surfacesSection, processSection, localConditionsSection];
  } else {
    middleSections = [localConditionsSection, surfacesSection, pricingSection, processSection];
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Pressure Washing in ${area.name}, ON`}
        subtitle={`Driveways, patios, walkways and more, starting from $${pressureWashingPricing.startingFrom}. Licensed & insured.`}
        showCta={false}
        formSlot={<PressureWashingQuoteCard source={`pressure-washing-${area.slug}`} />}
      />

      <div className="sticky top-[72px] z-40 border-b border-navy-900/5 bg-white/95 backdrop-blur-sm">
        <div className="container-max">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 pt-3 text-xs text-navy-900/40">
            <Link href="/" className="hover:text-brand-blue">Home</Link>
            {breadcrumbItems.map((item) => (
              <span key={item.path} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <Link href={item.path} className="hover:text-brand-blue">{item.name}</Link>
              </span>
            ))}
          </nav>
          <div className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {quickNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-navy-900/10 px-4 py-1.5 text-xs font-semibold text-navy-900/70 transition hover:border-brand-blue hover:text-brand-blue"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {quickAnswerSection}

      <section className="bg-white pb-2 pt-6">
        <div className="container-max max-w-3xl text-center">
          <p className="text-navy-900/70">{intro}</p>
        </div>
      </section>

      <GoogleReviews heading="What Our Customers Say" />

      {middleSections}

      {faqSection}

      <OtherOffersInCity currentSlug="pressure-washing" area={area} />

      <section className="pb-14 sm:pb-20">
        <div className="container-max max-w-2xl text-center">
          <p className="text-sm text-navy-900/50">
            Serving {neighbourhoodLine(area)} and the rest of {area.name}, {area.province}.
          </p>
        </div>
      </section>

      <section className="section-y bg-navy-950">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-white">Pressure Washing in Nearby Areas</h2>
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
