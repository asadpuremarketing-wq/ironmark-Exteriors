import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceQuoteCard from "@/components/ServiceQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import SmartImage from "@/components/SmartImage";
import CardCarousel from "@/components/CardCarousel";
import { business, serviceAreas, sidingRepairProjects } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/breadcrumb";

const area = serviceAreas.find((a) => a.slug === "stoney-creek")!;
const projects = sidingRepairProjects["stoney-creek"] ?? [];

const title = "Siding Repair in Stoney Creek, ON | Ironmark Exteriors";
const description =
  "Siding repair for wind-damaged, loose, cracked, and missing vinyl and insulated siding in Stoney Creek, ON. Isolated panel and section repairs, free on-site estimates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/siding-repair/stoney-creek" },
  openGraph: { title, description, url: `${business.siteUrl}/siding-repair/stoney-creek` },
};

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  wind: "M3 8h12.5a2.3 2.3 0 1 0-2.1-3.2M3 12.5h15.5a2.3 2.3 0 1 1-2.1 3.2M3 17h9",
  loose: "M7 7l10 10M7 17 17 7",
  crack: "M3 13l4-1 2-6 3 11 2-7 3 2 4-1",
  missing: "M4 4h7v7H4zM13 13h7v7h-7z",
  seam: "M4 8h16M4 8v8M20 8v8M8 16h8",
  section: "M4 4h16v16H4V4Zm0 10.7h16M10.7 4v16",
  check: "M5 10.5l3.5 3.5 6.5-8",
  flag: "M12 9v4M12 17h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  panel: "M4 4h16v16H4V4Zm0 5.3h16M4 14.7h16M9.3 4v16M14.7 4v16",
  snow: "M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17M12 2 9 5M12 2l3 3M12 22l-3-3M12 22l3-3",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  wave: "M3 16c2-3 4 3 6 0s4-3 6 0 4 3 6 0",
  thermometer: "M12 3a2 2 0 0 0-2 2v8.3a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2Z",
  bolt: "M12 2 4 13h5l-1 9 9-14h-6l1-6Z",
};

const damageWeRepair = [
  { title: "Wind-Damaged Siding", icon: ICONS.wind, image: "/images/siding-repair/wind-damaged-siding.jpg", text: "Panels lifted, bent, or torn loose by strong wind, re-secured or replaced as needed." },
  { title: "Loose Panels", icon: ICONS.loose, image: "/images/siding-repair/loose-panels.jpg", text: "Siding that has pulled away from its fastening strip, re-attached before the gap grows." },
  { title: "Cracked Vinyl Siding", icon: ICONS.crack, image: "/images/siding-repair/cracked-vinyl-siding.jpg", text: "A split or cracked panel replaced and matched to the surrounding siding." },
  { title: "Missing Panels", icon: ICONS.missing, image: "/images/siding-repair/missing-panels-stoney-creek.jpg", text: "A gap left by a blown-off panel filled with a matching replacement." },
  { title: "Damaged Seams", icon: ICONS.seam, image: "/images/siding-repair/damaged-seams.jpg", text: "Separated or gapped seams resealed or refitted so water has nowhere to get in." },
  { title: "Small-Area Siding Replacement", icon: ICONS.section, image: "/images/siding-repair/small-area-replacement.jpg", text: "A contained section repaired without touching the rest of the wall." },
];

const likelyRepairable = ["One or a few damaged panels", "Loose panels", "Isolated cracks", "Wind damage", "Small holes", "Damaged seams"];
const mayRequireReplacement = ["Widespread deterioration", "Substantial moisture or sheathing damage", "Unavailable or discontinued siding", "Damage across several walls"];

const costFactors = [
  { title: "Number of panels affected", text: "A single panel is a smaller job than damage spread across a wall." },
  { title: "Siding material", text: "Vinyl, insulated vinyl, and composite repair differently and at different costs." },
  { title: "Height & accessibility", text: "A second-storey or hard-to-reach section takes more time to access safely." },
  { title: "Colour & material matching", text: "Older or discontinued siding can take longer to match closely." },
  { title: "Trim & corner involvement", text: "Repairs touching corner posts or trim add steps beyond the panel itself." },
  { title: "Hidden damage underneath", text: "Moisture that's reached the sheathing adds to the scope of the repair." },
];

const materials = [
  { title: "Vinyl Siding", icon: ICONS.panel, image: "/images/siding-repair/vinyl-siding.jpg", text: "The most common siding in Stoney Creek, repaired by panel replacement and colour matching." },
  { title: "Insulated Vinyl", icon: ICONS.snow, image: "/images/siding-repair/insulated-vinyl.png", text: "Foam-backed vinyl, repaired carefully so the insulation layer stays intact." },
  { title: "Composite & Engineered", icon: ICONS.layers, image: "/images/siding-repair/composite-engineered.jpg", text: "Rigid, wood-look siding repaired at damaged edges and fastener points." },
];

const processSteps = [
  { number: "01", title: "Send Photos or Request Inspection", text: "Start with photos, or book an on-site look." },
  { number: "02", title: "Assess Damage & Matching Options", text: "We confirm scope and what's available to match." },
  { number: "03", title: "Repair the Affected Section", text: "Only the damaged area, not the whole wall." },
  { number: "04", title: "Check Seams, Fastening & Water Entry Points", text: "We check the surrounding area, not just the spot flagged." },
  { number: "05", title: "Final Inspection", text: "We confirm the repair is secure before we leave." },
];

const faqs = [
  {
    q: "Can wind-damaged siding be repaired without replacing the whole wall?",
    a: "In most cases, yes. Wind usually loosens or tears off a limited number of panels rather than damaging an entire wall, so repair typically means re-securing or replacing just the affected panels.",
  },
  {
    q: "How much does siding repair cost in Stoney Creek?",
    a: "It depends on how many panels are affected, the siding material, accessibility, colour matching, and whether trim or corners are involved. We provide an exact, itemized quote after seeing photos or inspecting in person.",
  },
  {
    q: "Can you replace only one or two vinyl siding panels?",
    a: "Yes. If the surrounding siding is in good condition, we replace just the damaged panels rather than re-siding the wall.",
  },
  {
    q: "Can old siding be colour-matched?",
    a: "We do our best to match existing colour and profile. Older or discontinued siding can be harder to match exactly, in which case we'll walk you through the closest realistic options.",
  },
  {
    q: "What happens if water has gotten behind damaged siding?",
    a: "We check the sheathing underneath before closing up any repair. If moisture has already caused damage there, that gets addressed as part of the job, not left behind the new panel.",
  },
  {
    q: "Why does vinyl siding come loose during strong winds?",
    a: "Vinyl panels hang on a fastening strip rather than being fully fixed in place, which allows for expansion and contraction, but it also means repeated strong wind can work a panel loose over time, especially if it wasn't fastened correctly to begin with.",
  },
  {
    q: "Can I send photos before scheduling an inspection?",
    a: "Yes. Clear photos of the damage, plus a wider shot showing where it is on the house, let us give you a realistic starting estimate before confirming anything in person.",
  },
  {
    q: "When is siding damage too extensive to repair?",
    a: "When deterioration is spread across multiple walls, moisture has caused significant damage underneath, or the siding is old enough that matching material isn't available. Outside of those situations, repair is usually the more practical option.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Siding Repair",
  name: `Siding Repair Services in ${area.name}, ON`,
  description:
    "Repair of wind-damaged, loose, cracked, and missing vinyl, insulated vinyl, and composite siding for homes in Stoney Creek, ON.",
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
  { name: `Siding Repair in ${area.name}`, path: "/siding-repair/stoney-creek" },
];

const breadcrumbSchemaData = breadcrumbSchema(breadcrumbItems);

const quickNav = [
  { href: "#damage-we-repair", label: "Damage We Repair" },
  { href: "#wind-weather", label: "Wind & Weather" },
  { href: "#repairable", label: "Repair or Replace" },
  { href: "#cost", label: "Cost" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export default function StoneyCreekSidingRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title="Siding Repair in Stoney Creek, ON"
        subtitle="Wind-damaged, loose, cracked, or missing siding repaired by our local crew. Free on-site estimates."
        showCta={false}
        formSlot={<ServiceQuoteCard title="Get Your Free Siding Repair Quote" source="siding-repair-stoney-creek" />}
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

      {/* AI Quick Answer */}
      <section className="bg-white pt-10">
        <div className="container-max">
          <div className="mx-auto max-w-3xl rounded-2xl border border-brand-blue/15 bg-brand-blue/[0.04] p-6 sm:p-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Quick Answer</p>
            <p className="text-sm leading-relaxed text-navy-900/80">
              Ironmark Exteriors repairs damaged siding for homes in Stoney Creek, Ontario, including cracked,
              loose, missing, and wind-damaged vinyl and insulated siding. Most jobs involve replacing an isolated
              panel or section rather than the full wall. Homeowners can send photos of the damage for a fast
              starting estimate before booking an in-person assessment.
            </p>
          </div>
        </div>
      </section>

      <GoogleReviews heading="What Our Customers Say" />

      {/* Siding Damage We Repair in Stoney Creek */}
      <section id="damage-we-repair" className="section-y scroll-mt-32 bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Repair</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Siding Damage We Repair in Stoney Creek
            </h2>
          </div>
          <CardCarousel cardWidthClassName="w-[260px] sm:w-[280px]">
            {damageWeRepair.map((d) => (
              <div key={d.title} className="h-full overflow-hidden rounded-[24px] border border-navy-900/10 transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-900/5">
                  <SmartImage src={d.image} alt={d.title} fallbackLabel={d.title} className="absolute inset-0 h-full w-full" />
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-brand-blue shadow-sm backdrop-blur-sm">
                    <Icon path={d.icon} className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy-900">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">{d.text}</p>
                </div>
              </div>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Wind & Weather Damage in Stoney Creek, the key differentiator */}
      <section id="wind-weather" className="section-y scroll-mt-32 bg-[#f7f9fb]">
        <div className="container-max max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Local Conditions</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Wind & Weather Damage in Stoney Creek
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-navy-900/70">
              Stoney Creek sits close enough to Lake Ontario that wind exposure is a bigger factor here than in
              more inland parts of our service area. Homes exposed to open wind off the lake, including stretches
              near Fifty Point, Winona, and Community Beach, can experience more siding stress over time than a
              sheltered property further from the shoreline.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-[24px] border border-navy-900/10 bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Icon path={ICONS.wave} />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">Lake Ontario Exposure</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                Properties closer to the shoreline can see stronger, more sustained wind than homes set further
                back, which puts repeated stress on siding fastening strips over the years.
              </p>
            </div>
            <div className="rounded-[24px] border border-navy-900/10 bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Icon path={ICONS.thermometer} />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">Freeze-Thaw Cycles</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                Southern Ontario&apos;s seasonal temperature swings make vinyl more brittle in winter, so an impact or
                gust that wouldn&apos;t mark a panel in summer can crack it in colder months.
              </p>
            </div>
            <div className="rounded-[24px] border border-navy-900/10 bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Icon path={ICONS.bolt} />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">Loosened Fasteners Over Time</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                Repeated wind load can gradually work panels loose at the fastening strip, and once a seam opens,
                moisture has a way in that wasn&apos;t there before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Can This Siding Be Repaired? Decision-style section */}
      <section id="repairable" className="section-y scroll-mt-32 bg-white">
        <div className="container-max max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Making the Right Call</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Can This Siding Be Repaired?</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[28px] border border-brand-blue/20 bg-[#f7f9fb] p-7">
              <h3 className="text-base font-bold text-navy-900">Likely Repairable</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-navy-900/75">
                {likelyRepairable.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Icon path={ICONS.check} className="h-4 w-4 shrink-0 text-brand-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] border border-navy-900/10 bg-[#f7f9fb] p-7">
              <h3 className="text-base font-bold text-navy-900">May Require Larger Replacement</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-navy-900/75">
                {mayRequireReplacement.map((item) => (
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

      {/* Siding Repair Cost in Stoney Creek */}
      <section id="cost" className="section-y scroll-mt-32 bg-[#f7f9fb]">
        <div className="container-max max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Siding Repair Cost in Stoney Creek</h2>
            <p className="mx-auto mt-4 max-w-2xl text-navy-900/70">
              Siding repair pricing depends on the specifics of the job. Here&apos;s what actually drives the cost:
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
              Send Photos for a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Siding Materials We Work With */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Work With</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Siding Materials We Work With</h2>
          </div>
          <CardCarousel cardWidthClassName="w-[280px] sm:w-[320px]">
            {materials.map((m) => (
              <div key={m.title} className="h-full overflow-hidden rounded-[24px] border border-navy-900/10 bg-white text-center">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-900/5">
                  <SmartImage src={m.image} alt={m.title} fallbackLabel={m.title} className="absolute inset-0 h-full w-full" />
                  <span className="absolute left-1/2 top-full flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white text-brand-blue shadow-md">
                    <Icon path={m.icon} />
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

      {/* Repair process, unique to this page */}
      <section id="process" className="section-y scroll-mt-32 bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How It Works</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Our Siding Repair Process</h2>
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

      {/* Recent Siding Repairs in Stoney Creek, hidden entirely until real project data exists */}
      {projects.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-max">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Project Proof</p>
              <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
                Recent Siding Repairs in Stoney Creek
              </h2>
            </div>
            <div className="flex flex-col gap-10">
              {projects.map((project) => (
                <div key={project.title} className="rounded-[28px] border border-navy-900/10 bg-[#f7f9fb] p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-navy-900">{project.title}</h3>
                  {project.location && (
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-blue">
                      {project.location}
                    </p>
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
      )}

      {/* FAQ */}
      <section id="faq" className="section-y scroll-mt-32 bg-[#f7f9fb]">
        <div className="container-max max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Related Stoney Creek services */}
      <section className="section-y bg-white">
        <div className="container-max">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-navy-900">
            Related Services in Stoney Creek
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/soffit-fascia-repair/stoney-creek"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Soffit & Fascia Repair
            </Link>
            <Link
              href="/gutter-repair/stoney-creek"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Gutter Repair
            </Link>
            <Link
              href="/gutter-installation/stoney-creek"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Gutter Installation
            </Link>
            <Link
              href="/downspout-repair/stoney-creek"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Downspout Repair
            </Link>
            <Link
              href="/service-areas/stoney-creek"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              All Stoney Creek Services
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
              .filter((a) => a.slug !== "stoney-creek")
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
