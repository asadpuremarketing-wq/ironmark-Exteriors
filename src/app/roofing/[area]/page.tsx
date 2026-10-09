import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import ServiceQuoteCard from "@/components/ServiceQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import SmartImage from "@/components/SmartImage";
import CardCarousel from "@/components/CardCarousel";
import { business, serviceAreas, roofingProjects } from "@/lib/data";
import { neighbourhoodLine } from "@/lib/offerContent";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import {
  roofingCityContent,
  roofingIntroFallback,
  roofingFaqs,
  roofingProblemCards,
  roofingCostFactors,
  roofingRepairWhen,
  roofingReplaceWhen,
  roofingMaterials,
  roofingProcessSteps,
  getArchetype,
} from "@/lib/roofingContent";

type Params = Promise<{ area: string }>;

const areaSlugs = serviceAreas.map((a) => a.slug);

export function generateStaticParams() {
  return areaSlugs.map((slug) => ({ area: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `Roofing in ${area.name}, ON | Ironmark Exteriors`;
  const description = `Roof repair, replacement, and inspection for homeowners in ${area.name}, ON. Missing shingles, leaks, flashing failures, and storm damage fixed. Free on-site estimates.`;
  return {
    title,
    description,
    alternates: { canonical: `/roofing/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/roofing/${area.slug}` },
  };
}

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PROBLEM_ICONS: Record<string, string> = {
  shingles: "M4 4h7v7H4zM13 13h7v7h-7z",
  leaks: "M12 3s6 7.2 6 11.2a6 6 0 1 1-12 0C6 10.2 12 3 12 3Z",
  flashing: "M4 4h16v16H4V4Zm0 10.7h16M10.7 4v16",
  ice: "M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17M12 2 9 5M12 2l3 3M12 22l-3-3M12 22l3-3",
  sagging: "M3 14c2-4 4 4 6 0s4-4 6 0 4 4 6 0",
  moss: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  ventilation: "M3 8h12.5a2.3 2.3 0 1 0-2.1-3.2M3 12.5h15.5a2.3 2.3 0 1 1-2.1 3.2M3 17h9",
  storm: "M12 9v4M12 17h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
};

const MATERIAL_ICONS: Record<string, string> = {
  asphalt: "M4 4h16v16H4V4Zm0 5.3h16M4 14.7h16M9.3 4v16M14.7 4v16",
  architectural: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  flashing: "M4 4h16v16H4V4Zm0 10.7h16M10.7 4v16",
};

const CHECK_ICON = "M5 10.5l3.5 3.5 6.5-8";
const FLAG_ICON = "M12 9v4M12 17h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z";

export default async function RoofingAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const index = areaSlugs.indexOf(slug);
  const archetype = getArchetype(index);
  const cityContent = roofingCityContent[area.slug];
  const intro = cityContent?.intro ?? roofingIntroFallback(area, index);
  const quickAnswer = cityContent?.quickAnswer ?? roofingIntroFallback(area, index);
  const localConditions = cityContent?.localConditions ?? [];
  const faqs = roofingFaqs(area, index);
  const problemCards = roofingProblemCards(index);
  const costFactors = roofingCostFactors(index);
  const repairWhen = roofingRepairWhen(index);
  const replaceWhen = roofingReplaceWhen(index);
  const processSteps = roofingProcessSteps(index);
  const projects = roofingProjects[area.slug] ?? [];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Roofing",
    name: `Roofing Services in ${area.name}, ON`,
    description: `Roof repair, replacement, and inspection for homes in ${area.name}, ON.`,
    provider: {
      "@type": "RoofingContractor",
      name: business.name,
      telephone: business.phone,
      url: business.siteUrl,
    },
    areaServed: { "@type": "City", name: `${area.name}, ${area.province}` },
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

  const breadcrumbItems = [
    { name: "Roofing", path: "/services/roofing" },
    { name: `Roofing in ${area.name}`, path: `/roofing/${area.slug}` },
  ];
  const breadcrumbSchemaData = breadcrumbSchema(breadcrumbItems);

  const quickNav = [
    { href: "#problems", label: "Roof Problems" },
    { href: "#local", label: "Local Conditions" },
    { href: "#repairable", label: "Repair or Replace" },
    { href: "#cost", label: "Cost" },
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

  const problemsSection = (
    <section key="problems" id="problems" className="section-y scroll-mt-32 bg-white">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Fix</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Common Roof Problems in {area.name}
          </h2>
        </div>
        <CardCarousel cardWidthClassName="w-[260px] sm:w-[280px]">
          {problemCards.map((p) => (
            <div key={p.title} className="h-full overflow-hidden rounded-[24px] border border-navy-900/10 transition-shadow duration-300 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-900/5">
                <SmartImage src={p.image} alt={`${p.title} on a home in ${area.name}, ON`} fallbackLabel={p.title} className="absolute inset-0 h-full w-full" />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-brand-blue shadow-sm backdrop-blur-sm">
                  <Icon path={PROBLEM_ICONS[p.key]} className="h-4 w-4" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{p.text}</p>
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
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Roofing in {area.name}</h2>
        </div>
        <div className="flex flex-col gap-5 text-navy-900/75">
          {localConditions.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );

  const repairableSection = (
    <section key="repairable" id="repairable" className="section-y scroll-mt-32 bg-white">
      <div className="container-max max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Making the Right Call</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Can This Roof Be Repaired?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[28px] border border-brand-blue/20 bg-[#f7f9fb] p-7">
            <h3 className="text-base font-bold text-navy-900">Likely Repairable</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-navy-900/75">
              {repairWhen.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Icon path={CHECK_ICON} className="h-4 w-4 shrink-0 text-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-navy-900/10 bg-[#f7f9fb] p-7">
            <h3 className="text-base font-bold text-navy-900">May Need Full Replacement</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-navy-900/75">
              {replaceWhen.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Icon path={FLAG_ICON} className="h-4 w-4 shrink-0 text-navy-900/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  const costSection = (
    <section key="cost" id="cost" className="section-y scroll-mt-32 bg-[#f7f9fb]">
      <div className="container-max max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Pricing</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Roofing Cost in {area.name}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-900/70">
            Roofing pricing depends on the specifics of the job. Here&apos;s what actually drives the cost:
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {costFactors.map((c) => (
            <div key={c.title} className="rounded-2xl border border-navy-900/10 bg-white p-6">
              <h3 className="text-sm font-bold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-8 py-4 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right"
          >
            Get a Free Roof Inspection
          </Link>
        </div>
      </div>
    </section>
  );

  const materialsSection = (
    <section key="materials" className="section-y bg-white">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Work With</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Roofing Materials We Work With</h2>
        </div>
        <CardCarousel cardWidthClassName="w-[280px] sm:w-[320px]">
          {roofingMaterials.map((m) => (
            <div key={m.title} className="h-full overflow-hidden rounded-[24px] border border-navy-900/10 bg-white text-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-900/5">
                <SmartImage src={m.image} alt={m.title} fallbackLabel={m.title} className="absolute inset-0 h-full w-full" />
                <span className="absolute left-1/2 top-full flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white text-brand-blue shadow-md">
                  <Icon path={MATERIAL_ICONS[m.key]} />
                </span>
              </div>
              <div className="px-6 pb-6 pt-8">
                <h3 className="text-base font-bold text-navy-900">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{m.text}</p>
              </div>
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );

  const processSection = (
    <section key="process" id="process" className="section-y scroll-mt-32 bg-[#f7f9fb]">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How It Works</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Our Roofing Process</h2>
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
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );

  const projectsSection = projects.length > 0 && (
    <section key="projects" className="section-y bg-[#f7f9fb]">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Project Proof</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Recent Roofing Projects in {area.name}</h2>
        </div>
        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <div key={project.title} className="rounded-[28px] border border-navy-900/10 bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-navy-900">{project.title}</h3>
              {project.location && (
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-blue">{project.location}</p>
              )}
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-900/70">{project.description}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-8">
                {project.problem && (
                  <p className="text-sm text-navy-900/70">
                    <span className="font-bold text-navy-900">Problem: </span>
                    {project.problem}
                  </p>
                )}
                {project.solution && (
                  <p className="text-sm text-navy-900/70">
                    <span className="font-bold text-navy-900">Solution: </span>
                    {project.solution}
                  </p>
                )}
              </div>
              {project.photoPairs.map((pair, i) => (
                <div key={i} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="relative overflow-hidden rounded-[20px]">
                    <SmartImage src={pair.before} alt={pair.beforeAlt} fallbackLabel="Before" className="aspect-4/3" />
                    <span className="absolute left-3 top-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-[20px]">
                    <SmartImage src={pair.after} alt={pair.afterAlt} fallbackLabel="After" className="aspect-4/3" />
                    <span className="absolute left-3 top-3 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      After
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const relatedServicesSection = (
    <section key="related" className="section-y bg-white">
      <div className="container-max">
        <h2 className="mb-6 text-center text-2xl font-extrabold text-navy-900">Related Services in {area.name}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`/soffit-fascia-repair/${area.slug}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
          >
            Soffit & Fascia Repair
          </Link>
          <Link
            href={`/gutter-installation/${area.slug}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
          >
            Gutter Installation
          </Link>
          <Link
            href={`/siding-repair/${area.slug}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
          >
            Siding Repair
          </Link>
          <Link
            href={`/service-areas/${area.slug}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
          >
            All {area.name} Services
          </Link>
        </div>
      </div>
    </section>
  );

  const nearbyAreasSection = (
    <section key="nearby" className="section-y bg-navy-950">
      <div className="container-max">
        <h2 className="mb-4 text-center text-2xl font-extrabold text-white">Roofing in Nearby Areas</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {areaSlugs
            .filter((s) => s !== area.slug)
            .map((s) => {
              const a = serviceAreas.find((sa) => sa.slug === s);
              if (!a) return null;
              return (
                <Link
                  key={s}
                  href={`/roofing/${s}`}
                  className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-brand-silver transition hover:border-brand-blue hover:text-white"
                >
                  {a.name}, {a.province}
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );

  let middleSections: React.ReactNode[];

  if (archetype === 0) {
    middleSections = [problemsSection, localConditionsSection, repairableSection, costSection, materialsSection, processSection];
  } else if (archetype === 1) {
    middleSections = [localConditionsSection, problemsSection, costSection, repairableSection, materialsSection, processSection];
  } else {
    middleSections = [repairableSection, problemsSection, localConditionsSection, costSection, materialsSection, processSection];
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Roofing in ${area.name}, ON`}
        subtitle={`Roof repair, replacement, and inspection by our licensed, insured crew. Free on-site estimates for homeowners in ${area.name}.`}
        showCta={false}
        formSlot={<ServiceQuoteCard title="Get Your Free Roofing Estimate" source={`roofing-${area.slug}`} />}
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

      {projectsSection}

      {faqSection}

      {relatedServicesSection}

      <section className="pb-14 sm:pb-20">
        <div className="container-max max-w-2xl text-center">
          <p className="text-sm text-navy-900/50">
            Serving {neighbourhoodLine(area)} and the rest of {area.name}, {area.province}.
          </p>
        </div>
      </section>

      {nearbyAreasSection}

      <CTA />
    </>
  );
}
