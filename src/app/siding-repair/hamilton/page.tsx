import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceQuoteCard from "@/components/ServiceQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import SmartImage from "@/components/SmartImage";
import { business, serviceAreas, sidingRepairProjects } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/breadcrumb";

const area = serviceAreas.find((a) => a.slug === "hamilton")!;
const projects = sidingRepairProjects.hamilton ?? [];

const title = "Siding Repair in Hamilton, ON | Ironmark Exteriors";
const description =
  "Siding repair for cracked, warped, loose, and storm-damaged vinyl, insulated, and composite siding in Hamilton, ON. Send photos for a free, no-obligation quote.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/siding-repair/hamilton" },
  openGraph: { title, description, url: `${business.siteUrl}/siding-repair/hamilton` },
};

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  crack: "M3 13l4-1 2-6 3 11 2-7 3 2 4-1",
  loose: "M7 7l10 10M7 17 17 7",
  wind: "M3 8h12.5a2.3 2.3 0 1 0-2.1-3.2M3 12.5h15.5a2.3 2.3 0 1 1-2.1 3.2M3 17h9",
  missing: "M4 4h7v7H4zM13 13h7v7h-7z",
  warp: "M3 14c2-4 4 4 6 0s4-4 6 0 4 4 6 0",
  section: "M4 4h16v16H4V4Zm0 10.7h16M10.7 4v16",
  check: "M5 10.5l3.5 3.5 6.5-8",
  flag: "M12 9v4M12 17h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  panel: "M4 4h16v16H4V4Zm0 5.3h16M4 14.7h16M9.3 4v16M14.7 4v16",
  snow: "M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17M12 2 9 5M12 2l3 3M12 22l-3-3M12 22l3-3",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  home: "M3.5 11.5 12 4l8.5 7.5M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9",
  water: "M12 3s6 7.2 6 11.2a6 6 0 1 1-12 0C6 10.2 12 3 12 3Z",
};

const whatWeRepair = [
  { title: "Cracked Panels", icon: ICONS.crack, text: "A single cracked panel, usually from cold-weather brittleness or impact, replaced and colour-matched." },
  { title: "Loose Siding", icon: ICONS.loose, text: "Panels that have pulled away from the fastening strip, re-secured before wind or moisture make it worse." },
  { title: "Wind Damage", icon: ICONS.wind, text: "Sections lifted, bent, or torn loose by wind off Lake Ontario, repaired and re-fastened properly." },
  { title: "Missing Panels", icon: ICONS.missing, text: "Gaps left by a blown-off or removed panel, filled with a matching replacement." },
  { title: "Warped Siding", icon: ICONS.warp, text: "Panels installed too tight that have buckled with temperature swings, replaced with proper expansion room." },
  { title: "Small Section Replacement", icon: ICONS.section, text: "A contained area of damage replaced without re-siding the whole wall." },
];

const repairWhen = ["Isolated panels", "Wind damage", "Cracks or small holes", "Small, contained areas"];
const replaceWhen = ["Widespread deterioration", "Moisture damage underneath", "Discontinued material", "Damage across multiple walls"];

const costFactorChips = [
  "Number of damaged panels",
  "Siding material",
  "Accessibility",
  "Colour matching",
  "Damage underneath",
];

const sidingTypes = [
  { title: "Vinyl Siding", icon: ICONS.panel, text: "The most common siding on Hamilton homes, repaired by panel replacement and colour matching." },
  { title: "Insulated Vinyl", icon: ICONS.snow, text: "Foam-backed vinyl, repaired carefully so the insulation layer isn't disturbed." },
  { title: "Composite & Engineered", icon: ICONS.layers, text: "Rigid, wood-look siding used on newer builds, repaired at damaged edges and fastener points." },
];

const processSteps = [
  { number: "01", title: "Inspection", text: "We take a close look at the damaged area and the wall around it." },
  { number: "02", title: "Diagnose Damage", text: "We identify what's actually wrong and why." },
  { number: "03", title: "Repair the Affected Area", text: "Matching material, not a bigger job than needed." },
  { number: "04", title: "Final Check", text: "We confirm the repair holds before we leave." },
];

const faqs = [
  {
    q: "How much does siding repair cost in Hamilton?",
    a: "It depends on the number of damaged panels, the siding material, accessibility, colour matching, and whether there's damage underneath. We give you an exact, itemized quote after seeing photos or inspecting in person, never a flat number over the phone.",
  },
  {
    q: "Can cracked vinyl siding be repaired, or does it need to be replaced?",
    a: "In most cases a cracked panel can simply be replaced with a matching one rather than re-siding the whole wall. Full replacement only makes sense if the damage is widespread, the siding is too old to match, or there are multiple unrelated issues on the same wall.",
  },
  {
    q: "Why does my vinyl siding keep cracking in winter?",
    a: "Vinyl becomes brittle as temperatures drop, so impacts that wouldn't mark it in summer can crack it in colder months. If the same section keeps cracking, it may have been installed without enough room to expand and contract.",
  },
  {
    q: "Can you match my existing siding if it's an older colour or style?",
    a: "We do our best to match colour, profile, and manufacturer whenever a close match is available. If your siding has been discontinued, we'll walk you through the closest realistic options.",
  },
  {
    q: "Does home insurance cover siding damage from storms?",
    a: "Many policies cover wind, hail, or debris damage, but coverage varies. We can provide photos and a written assessment to support a claim, though you'll want to confirm coverage with your insurer directly.",
  },
  {
    q: "How long does a typical siding repair take?",
    a: "A single-panel or small-section repair is often done in a few hours. Larger repairs involving multiple walls or discontinued materials take longer, we'll give you a realistic timeline after seeing the scope.",
  },
  {
    q: "Do you repair siding around windows and doors?",
    a: "Yes. Gaps around window and door trim are a common place for moisture to get in, so we check and repair this area as part of any siding repair call.",
  },
  {
    q: "Can I just send photos of the damage to get a quote?",
    a: "Yes, it's often the fastest way to get a starting estimate. Clear photos of the damage, plus a wide shot of where it is on the house, let us give you a realistic initial range before confirming anything in person.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Siding Repair",
  name: `Siding Repair Services in ${area.name}, ON`,
  description:
    "Repair of cracked, warped, loose, and storm-damaged vinyl, insulated vinyl, and composite siding for homes in Hamilton, ON.",
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
  { name: "Siding Repair", path: "/services/siding" },
  { name: `Siding Repair in ${area.name}`, path: "/siding-repair/hamilton" },
];

const breadcrumbSchemaData = breadcrumbSchema(breadcrumbItems);

const quickNav = [
  { href: "#what-we-repair", label: "What We Repair" },
  { href: "#cost", label: "Cost" },
  { href: "#repair-or-replace", label: "Repair or Replace" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export default function HamiltonSidingRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      {/* 1. Hero with the standard lead-capture form, same as other service pages */}
      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title="Siding Repair in Hamilton, ON"
        subtitle="Cracked, loose, or storm-damaged siding, repaired fast by our local crew. Free on-site estimates."
        showCta={false}
        formSlot={<ServiceQuoteCard title="Get Your Free Siding Repair Quote" source="siding-repair-hamilton" />}
      />

      {/* Breadcrumb + sticky quick nav */}
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

      {/* 2. What We Repair, 6 visual cards, immediately */}
      <section id="what-we-repair" className="section-y scroll-mt-32 bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Repair</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Siding Problems We Fix in Hamilton</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeRepair.map((p) => (
              <div key={p.title} className="rounded-[24px] border border-navy-900/10 p-6 transition-shadow duration-300 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Icon path={p.icon} />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cost, premium highlighted box */}
      <section id="cost" className="section-y scroll-mt-32 bg-[#f7f9fb]">
        <div className="container-max">
          <div className="shimmer-border mx-auto max-w-3xl overflow-hidden rounded-[28px] bg-white p-8 text-center shadow-xl shadow-navy-900/5 sm:p-10">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Siding Repair Cost in Hamilton</p>
            <p className="text-navy-900/75">
              Repair pricing depends on the number of damaged panels, siding material, accessibility, colour
              matching, and whether damage exists underneath.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {costFactorChips.map((c) => (
                <span key={c} className="rounded-full bg-brand-blue/5 px-4 py-1.5 text-xs font-bold text-navy-900">
                  {c}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="btn-shine mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-8 py-4 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Repair or Replace, 2-column comparison */}
      <section id="repair-or-replace" className="section-y scroll-mt-32 bg-white">
        <div className="container-max max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Making the Right Call</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Repair or Replace?</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[28px] border border-brand-blue/20 bg-[#f7f9fb] p-7">
              <h3 className="text-base font-bold text-navy-900">Repair Makes Sense When</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-navy-900/75">
                {repairWhen.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Icon path={ICONS.check} className="h-4 w-4 shrink-0 text-brand-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] border border-navy-900/10 bg-[#f7f9fb] p-7">
              <h3 className="text-base font-bold text-navy-900">Replacement May Make Sense When</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-navy-900/75">
                {replaceWhen.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Icon path={ICONS.flag} className="h-4 w-4 shrink-0 text-navy-900/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Types of siding we repair, 3 clean cards */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Work With</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Types of Siding We Repair</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {sidingTypes.map((t) => (
              <div key={t.title} className="rounded-[24px] border border-navy-900/10 bg-white p-6 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Icon path={t.icon} />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Hamilton-specific, shortened to two cards */}
      <section className="section-y bg-white">
        <div className="container-max max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Local Conditions</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Hamilton Siding, Up Close</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[24px] border border-navy-900/10 bg-[#f7f9fb] p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Icon path={ICONS.home} />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">Century Homes & New Builds</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                Older homes around Westdale and Kirkendall tend to fail at the fasteners and seams first, not the
                siding itself. Waterdown&apos;s newer builds more often show installation issues, like panels hung
                too tight to expand.
              </p>
            </div>
            <div className="rounded-[24px] border border-navy-900/10 bg-[#f7f9fb] p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Icon path={ICONS.water} />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">Lake Humidity & Freeze-Thaw</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                Proximity to Lake Ontario adds humidity that lingers behind loose panels, and Hamilton&apos;s wide
                swing between summer and winter stresses seams over time, especially near Crown Point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How Siding Repair Works, 4 compact steps */}
      <section id="process" className="section-y scroll-mt-32 bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How It Works</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">How Siding Repair Works</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="rounded-[24px] border border-navy-900/10 bg-white p-6 text-center">
                <span className="font-heading text-3xl font-extrabold text-brand-blue/25">{step.number}</span>
                <h3 className="mt-2 text-sm font-bold text-navy-900">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-navy-900/60">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Reviews, honestly labelled */}
      <GoogleReviews heading="What Our Customers Say" />

      {/* Recent Siding Repairs in Hamilton */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Project Proof</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Recent Siding Repairs in Hamilton</h2>
          </div>
          {projects.length > 0 ? (
            <div className="flex flex-col gap-10">
              {projects.map((project) => (
                <div key={project.title} className="rounded-[28px] border border-navy-900/10 bg-white p-6 sm:p-8">
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">{project.title}</h3>
                      {project.location && (
                        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-blue">
                          {project.location}
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-navy-900/70">{project.description}</p>
                      {project.problem && (
                        <p className="mt-4 text-sm text-navy-900/70">
                          <span className="font-bold text-navy-900">Problem: </span>
                          {project.problem}
                        </p>
                      )}
                      {project.solution && (
                        <p className="mt-2 text-sm text-navy-900/70">
                          <span className="font-bold text-navy-900">Solution: </span>
                          {project.solution}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {project.photoPairs.map((pair, i) => (
                        <div key={i} className="rounded-[20px] border border-navy-900/10 bg-[#f7f9fb] p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative overflow-hidden rounded-xl">
                              <SmartImage src={pair.before} alt={pair.beforeAlt} fallbackLabel="Before" className="aspect-4/5" />
                              <span className="absolute left-1.5 top-1.5 rounded-full bg-navy-950/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                                Before
                              </span>
                            </div>
                            <div className="relative overflow-hidden rounded-xl">
                              <SmartImage src={pair.after} alt={pair.afterAlt} fallbackLabel="After" className="aspect-4/5" />
                              <span className="absolute left-1.5 top-1.5 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-light px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-lg">
                                After
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-[28px] border border-dashed border-navy-900/15 bg-white p-10 text-center">
              <p className="text-sm text-navy-900/60">
                We&apos;re adding real before-and-after photos from completed Hamilton siding repairs here soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 9. FAQ, collapsed, full text server-rendered */}
      <section id="faq" className="section-y scroll-mt-32 bg-white">
        <div className="container-max max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Related Hamilton services */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-navy-900">
            Related Services in Hamilton
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/soffit-fascia-repair/hamilton"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Soffit & Fascia Repair
            </Link>
            <Link
              href="/gutter-repair/hamilton"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Gutter Repair
            </Link>
            <Link
              href="/gutter-installation/hamilton"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Gutter Installation
            </Link>
            <Link
              href="/service-areas/hamilton"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              All Hamilton Services
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="section-y bg-navy-950">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-white">Siding Repair in Nearby Areas</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas
              .filter((a) => a.slug !== "hamilton")
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/siding-repair/${a.slug}`}
                  className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-brand-silver transition hover:border-brand-blue hover:text-white"
                >
                  {a.name}, {a.province}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
