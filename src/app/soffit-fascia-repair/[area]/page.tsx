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
import { business, serviceAreas, soffitFasciaRepairProjects } from "@/lib/data";
import { neighbourhoodLine } from "@/lib/offerContent";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import {
  soffitFasciaRepairCityContent,
  soffitFasciaRepairIntroFallback,
  soffitFasciaRepairFaqs,
  soffitFasciaRepairSigns,
  soffitFasciaRepairProblems,
  soffitFasciaRepairProcessSteps,
  getArchetype,
} from "@/lib/soffitFasciaRepairContent";

type Params = Promise<{ area: string }>;

const areaSlugs = serviceAreas.map((a) => a.slug);

export function generateStaticParams() {
  return areaSlugs.map((slug) => ({ area: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `Soffit & Fascia Repair in ${area.name}, ON`;
  const description = `Professional soffit and fascia repair in ${area.name}, ON, rotted fascia boards, loose soffit panels, and pest entry points fixed by licensed, insured crews. Free assessments.`;
  return {
    title,
    description,
    alternates: { canonical: `/soffit-fascia-repair/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/soffit-fascia-repair/${area.slug}` },
  };
}

export default async function SoffitFasciaRepairAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const index = areaSlugs.indexOf(slug);
  const archetype = getArchetype(index);
  const cityContent = soffitFasciaRepairCityContent[area.slug];
  const intro = cityContent?.intro ?? soffitFasciaRepairIntroFallback(area, index);
  const localConditions = cityContent?.localConditions ?? [];
  const faqs = soffitFasciaRepairFaqs(area, index);
  const signs = soffitFasciaRepairSigns(index);
  const problems = soffitFasciaRepairProblems(index, archetype === 2 ? 8 : 6);
  const projects = soffitFasciaRepairProjects[area.slug] ?? [];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Soffit & Fascia Repair",
    name: `Soffit & Fascia Repair Services in ${area.name}, ON`,
    description: `Soffit and fascia repair for rotted boards, loose panels, and pest entry points in ${area.name}, ON.`,
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

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: "Soffit & Fascia Repair", path: "/services/soffit-fascia-repair" },
    { name: `Soffit & Fascia Repair in ${area.name}`, path: `/soffit-fascia-repair/${area.slug}` },
  ]);

  // ---- Reusable section blocks, each with a visual style parameter ----

  const introSection = (
    <section key="intro" className="bg-white pt-10">
      <div className="container-max max-w-3xl text-center">
        <p className="text-navy-900/70">{intro}</p>
      </div>
    </section>
  );

  const localConditionsSection = localConditions.length > 0 && (
    <section key="local" className="section-y bg-[#f7f9fb]">
      <div className="container-max max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Local Conditions</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Soffit & Fascia Repair in {area.name}
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-navy-900/75">
          {localConditions.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );

  // Problems: grid cards (A), compact list with icons (B), or a wide
  // single-column list with larger descriptions (C).
  const problemsGrid = (
    <section key="problems" className="section-y bg-white">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Fix</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Common Soffit & Fascia Problems</h2>
        </div>
        <CardCarousel>
          {problems.map((p) => (
            <div key={p.title} className="h-full rounded-[28px] border border-navy-900/10 p-6 transition-shadow duration-300 hover:shadow-lg">
              <h3 className="mb-2 text-base font-bold text-navy-900">{p.title}</h3>
              <p className="text-sm leading-relaxed text-navy-900/65">{p.text}</p>
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );

  const problemsCompactList = (
    <section key="problems" className="section-y bg-[#f7f9fb]">
      <div className="container-max max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Fix</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Common Soffit & Fascia Problems</h2>
        </div>
        <div className="flex flex-col gap-3">
          {problems.map((p) => (
            <div key={p.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                  <path d="M10 2 3 5v5c0 5 3.4 8.7 7 9 3.6-.3 7-4 7-9V5l-7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-sm font-bold text-navy-900">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-900/65">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const problemsWideList = (
    <section key="problems" className="section-y bg-white">
      <div className="container-max max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Fix</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Common Soffit & Fascia Issues in {area.name}
          </h2>
        </div>
        <div className="flex flex-col divide-y divide-navy-900/10 rounded-[28px] border border-navy-900/10">
          {problems.map((p) => (
            <div key={p.title} className="p-6 sm:p-7">
              <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Process: numbered grid (A), vertical timeline (B), horizontal stepper (C)
  const processGrid = (
    <section key="process" className="section-y bg-[#f7f9fb]">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How We Work</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Our Soffit & Fascia Repair Process</h2>
        </div>
        <CardCarousel>
          {soffitFasciaRepairProcessSteps.map((step) => (
            <div key={step.number} className="h-full rounded-[28px] border border-navy-900/10 bg-white p-7 transition-shadow duration-300 hover:shadow-lg">
              <span className="font-heading text-4xl font-extrabold text-brand-blue/20">{step.number}</span>
              <h3 className="mt-3 text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{step.text}</p>
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );

  const processTimeline = (
    <section key="process" className="section-y bg-white">
      <div className="container-max max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How We Work</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Our Soffit & Fascia Repair Process</h2>
        </div>
        <div className="relative flex flex-col gap-10 pl-10">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-navy-900/10" aria-hidden="true" />
          {soffitFasciaRepairProcessSteps.map((step) => (
            <div key={step.number} className="relative">
              <span className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                {step.number.replace("0", "")}
              </span>
              <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-900/65">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const processStepper = (
    <section key="process" className="section-y bg-[#f7f9fb]">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How We Work</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Our Soffit & Fascia Repair Process</h2>
        </div>
        <div className="flex flex-wrap items-stretch justify-center gap-4">
          {soffitFasciaRepairProcessSteps.map((step) => (
            <div key={step.number} className="flex w-full max-w-xs flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center shadow-sm sm:w-[18%]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                {step.number.replace("0", "")}
              </span>
              <h3 className="text-sm font-bold text-navy-900">{step.title}</h3>
              <p className="text-xs leading-relaxed text-navy-900/60">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Signs: checklist cards (A), icon grid (B), pill row (C)
  const signsCards = (
    <section key="signs" className="section-y bg-white">
      <div className="container-max">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Know the Warning Signs</p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Signs You Need Soffit & Fascia Repair</h2>
        </div>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {signs.map((sign) => (
            <div key={sign} className="flex items-start gap-3 rounded-2xl border border-navy-900/10 p-5">
              <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" fill="none">
                <path d="M10 6v5M10 14h.01M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm text-navy-900/80">{sign}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const signsIconGrid = (
    <section key="signs" className="relative overflow-hidden bg-navy-950 py-14 sm:py-20">
      <div className="container-max relative">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light">Know the Warning Signs</p>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">Signs You Need Soffit & Fascia Repair</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((sign) => (
            <div key={sign} className="glass-dark rounded-2xl p-5">
              <p className="text-sm text-brand-silver/85">{sign}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const signsPillRow = (
    <section key="signs" className="section-y bg-[#f7f9fb]">
      <div className="container-max max-w-3xl text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Know the Warning Signs</p>
        <h2 className="mb-8 text-3xl font-extrabold text-navy-900 sm:text-4xl">Signs You Need Soffit & Fascia Repair</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {signs.map((sign) => (
            <span key={sign} className="rounded-full border border-navy-900/10 bg-white px-5 py-2.5 text-sm text-navy-900/80 shadow-sm">
              {sign}
            </span>
          ))}
        </div>
      </div>
    </section>
  );

  const faqSection = (
    <section key="faq" className="section-y bg-white">
      <div className="container-max max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );

  const projectsSection = projects.length > 0 && (
    <>
      {projects.map((project, projectIndex) => (
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
                <div key={i} className="rounded-[28px] border border-navy-900/10 bg-white p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative overflow-hidden rounded-2xl">
                      <SmartImage src={pair.before} alt={pair.beforeAlt} fallbackLabel="Before" className="aspect-4/5" />
                      <span className="absolute left-2 top-2 rounded-full bg-navy-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Before
                      </span>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl">
                      <SmartImage src={pair.after} alt={pair.afterAlt} fallbackLabel="After" className="aspect-4/5" />
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
    </>
  );

  const nearbyAreasSection = (
    <section key="nearby" className="section-y bg-navy-950">
      <div className="container-max">
        <h2 className="mb-4 text-center text-2xl font-extrabold text-white">Soffit & Fascia Repair in Nearby Areas</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {areaSlugs
            .filter((s) => s !== area.slug)
            .map((s) => {
              const a = serviceAreas.find((sa) => sa.slug === s);
              if (!a) return null;
              return (
                <Link
                  key={s}
                  href={`/soffit-fascia-repair/${s}`}
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

  // ---- Assemble the page body per archetype ----

  let sections: React.ReactNode[];

  if (archetype === 0) {
    // A: Intro -> Process (grid) -> Problems (grid) -> Local Conditions -> Signs (pill row) -> FAQ
    sections = [
      introSection,
      ...(projects.length > 0 ? [projectsSection] : []),
      processGrid,
      problemsGrid,
      localConditionsSection,
      signsPillRow,
      faqSection,
    ];
  } else if (archetype === 1) {
    // B: Signs (icon grid, leads with urgency) -> Intro -> Local Conditions -> Process (timeline) -> Problems (compact list) -> FAQ
    sections = [
      signsIconGrid,
      introSection,
      localConditionsSection,
      ...(projects.length > 0 ? [projectsSection] : []),
      processTimeline,
      problemsCompactList,
      faqSection,
    ];
  } else {
    // C: Problems (wide list) -> Process (stepper) -> Intro+Local combined -> Signs (cards) -> FAQ
    sections = [
      problemsWideList,
      processStepper,
      introSection,
      localConditionsSection,
      ...(projects.length > 0 ? [projectsSection] : []),
      signsCards,
      faqSection,
    ];
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Soffit & Fascia Repair in ${area.name}, ON`}
        subtitle={`Rotted fascia boards, loose soffit panels, and pest entry points fixed by licensed, insured crews. Free on-site assessments for homeowners in ${area.name}.`}
        showCta={false}
        formSlot={<ServiceQuoteCard title="Get Your Free Soffit & Fascia Assessment" source={`soffit-fascia-repair-${area.slug}`} />}
      />

      <GoogleReviews />

      {sections}

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
