import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceQuoteCard from "@/components/ServiceQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import SmartImage from "@/components/SmartImage";
import { business, serviceAreas, sidingRepairProjects } from "@/lib/data";
import { neighbourhoodLine } from "@/lib/offerContent";
import { breadcrumbSchema } from "@/lib/breadcrumb";

const area = serviceAreas.find((a) => a.slug === "hamilton")!;
const projects = sidingRepairProjects.hamilton ?? [];

const title = "Siding Repair in Hamilton, ON | Ironmark Exteriors";
const description =
  "Siding repair for cracked, warped, and storm-damaged vinyl, insulated, and composite siding in Hamilton, ON. Cost factors, repair-vs-replace guidance, and a free quote, just send photos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/siding-repair/hamilton" },
  openGraph: { title, description, url: `${business.siteUrl}/siding-repair/hamilton` },
};

const sidingTypes = [
  {
    title: "Vinyl Siding",
    text: "The most common siding material on Hamilton homes. Vinyl holds up well most of the year but gets brittle in cold temperatures, which is when impact cracks and cold-weather splits tend to show up. Repairs usually mean replacing the damaged panel or section and blending it with the surrounding colour and profile.",
  },
  {
    title: "Insulated Vinyl Siding",
    text: "Vinyl siding with a foam backing for extra insulation. It repairs similarly to standard vinyl, but the foam layer means a damaged panel needs to be removed carefully to avoid disturbing the insulation behind it.",
  },
  {
    title: "Composite & Engineered Siding",
    text: "A more rigid, wood-look material used on some newer Hamilton builds and renovations. Composite siding resists impact better than vinyl but can suffer from moisture absorption at cut edges or fastener points if it wasn't sealed correctly during the original install.",
  },
];

const problems = [
  {
    title: "Cracked or Split Panels",
    text: "Vinyl siding becomes brittle below freezing, so a stray hockey puck, hail, or even a ladder leaned against the wall in winter can crack a panel that would have flexed fine in summer.",
  },
  {
    title: "Warping & Buckling",
    text: "Siding installed too tightly, with no room to expand and contract with temperature swings, can warp or buckle over time. Hamilton's wide seasonal temperature range makes this more likely on older installs.",
  },
  {
    title: "Moisture Behind the Siding",
    text: "Gaps around window and door trim, or siding that's come loose from its fastening strip, let water get behind the panel. Over time this can damage the sheathing underneath, not just the siding itself.",
  },
  {
    title: "Loose or Detached Panels",
    text: "Wind off Lake Ontario can work siding loose at the fastening strip over several seasons, especially on homes with more direct wind exposure.",
  },
  {
    title: "Faded or Discoloured Sections",
    text: "South- and west-facing walls see more direct sun and tend to fade faster than the rest of the house, which can make a spot repair noticeably mismatched if the original colour has sun-faded.",
  },
  {
    title: "Pest or Insect Entry Points",
    text: "A gap where a panel has pulled loose or a seam has opened up is an easy entry point for insects, particularly around older homes with original trim detailing.",
  },
];

const signs = [
  "Visible cracks, holes, or splits in one or more panels",
  "Siding that looks warped, wavy, or buckled against the wall",
  "Panels that rattle or feel loose when pressed",
  "Soft spots or bubbling paint around seams and trim",
  "A noticeable gap or overlap where two panels meet",
  "Water stains or discoloration on the wall just inside from the siding",
];

const costFactors = [
  {
    title: "How Much Siding Needs Attention",
    text: "A single cracked panel is a small, contained repair. Damage spread across a full wall, or storm damage affecting multiple sides of the house, takes more time and material.",
  },
  {
    title: "Matching the Existing Siding",
    text: "If your siding is an older colour or profile that's been discontinued, finding a close match (or sourcing a full replacement section) can add time and cost compared to a straightforward swap with current stock.",
  },
  {
    title: "What's Underneath",
    text: "If moisture has gotten behind the siding and damaged the sheathing or framing underneath, that underlying repair adds to the scope beyond just the visible siding panel.",
  },
  {
    title: "Access & Height",
    text: "A repair at ground level on a bungalow is quicker and safer to access than one up near a roofline or dormer on a two-storey home, which affects labour time.",
  },
];

const faqs = [
  {
    q: "How much does siding repair cost in Hamilton?",
    a: "It depends mainly on how much siding is damaged, whether the colour or profile needs to be matched, and whether there's any damage underneath the siding itself. A single-panel repair is a relatively small job; storm damage spread across a wall or multiple sides of the house costs more. We give you an exact, itemized quote after seeing photos or inspecting in person, never a flat number over the phone.",
  },
  {
    q: "Can cracked vinyl siding be repaired, or does it need to be replaced?",
    a: "In most cases a cracked panel can simply be replaced with a matching one rather than re-siding the whole wall. Replacement of the full elevation only makes sense if the damage is widespread, the existing siding is old enough that matching panels aren't available, or there are multiple unrelated issues across the same wall.",
  },
  {
    q: "Why does my vinyl siding keep cracking in winter?",
    a: "Vinyl becomes more brittle as temperatures drop, so impacts that wouldn't mark it in summer, a thrown snowball, a ladder, debris in strong wind, can crack it in colder months. If the same section keeps cracking, it's worth having us check whether it was installed without enough room to expand and contract with temperature changes.",
  },
  {
    q: "Can you match my existing siding if it's an older colour or style?",
    a: "We do our best to match existing panels by colour, profile, and manufacturer whenever a close match is available. If your specific siding has been discontinued, we'll walk you through the closest realistic options, which sometimes means replacing a full section or wall rather than a single mismatched panel.",
  },
  {
    q: "Does home insurance cover siding damage from storms?",
    a: "Many home insurance policies cover siding damage from wind, hail, or falling debris, but coverage and deductibles vary by policy. We can provide photos and a written assessment of the damage to support a claim, but you'll want to confirm coverage details directly with your insurer.",
  },
  {
    q: "How long does a typical siding repair take?",
    a: "A single-panel or small-section repair is often completed in a few hours. Larger repairs involving multiple walls, matching discontinued siding, or underlying moisture damage take longer, we'll give you a realistic timeline once we've seen the scope of the work.",
  },
  {
    q: "What's the difference between a hairline crack and storm damage?",
    a: "A hairline crack is usually isolated to one panel and caused by age, a minor impact, or cold-weather brittleness. Storm damage tends to affect a wider area, often with multiple panels cracked, dented, or torn loose in a pattern consistent with wind or hail direction. We note the difference in our assessment, which matters if you're filing an insurance claim.",
  },
  {
    q: "Do you repair siding around windows and doors?",
    a: "Yes. Siding around window and door trim is a common place for gaps to open up and let moisture in, so we check and reseal or repair this area as part of any siding repair call, not just the panel you flagged.",
  },
  {
    q: "Can I just send photos of the damage to get a quote?",
    a: "Yes, this is often the fastest way to get a starting estimate. Clear photos of the damaged area, plus a wide shot showing where it is on the house, let us give you a realistic initial range before we confirm with an in-person look for anything more involved.",
  },
  {
    q: "What areas of Hamilton do you service for siding repair?",
    a: `We repair siding throughout Hamilton, including ${neighbourhoodLine(area)} and the rest of the city, on both original century-home siding and newer installations.`,
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

const photoQuoteSubject = encodeURIComponent("Siding Repair Quote Request - Photos Attached");
const photoQuoteBody = encodeURIComponent(
  "Hi Ironmark Exteriors,\n\nI'd like a quote for siding repair. I've attached photos of the damaged area(s).\n\nAddress:\nBest time to reach me:\n"
);

export default function HamiltonSidingRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title="Siding Repair in Hamilton, ON"
        subtitle="Cracked, warped, loose, or storm-damaged siding repaired by our local crew. Send us photos for a fast, no-obligation quote, no need to wait for an in-person visit to get started."
        showCta={false}
        formSlot={<ServiceQuoteCard title="Get Your Free Siding Repair Quote" source="siding-repair-hamilton" />}
      />

      {/* Visible breadcrumb trail */}
      <nav aria-label="Breadcrumb" className="border-b border-navy-900/5 bg-white">
        <div className="container-max flex flex-wrap items-center gap-2 py-3 text-xs text-navy-900/50">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          {breadcrumbItems.map((item) => (
            <span key={item.path} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link href={item.path} className="hover:text-brand-blue">{item.name}</Link>
            </span>
          ))}
        </div>
      </nav>

      <GoogleReviews />

      {/* Intro, repair-focused */}
      <section className="bg-white pt-10">
        <div className="container-max max-w-3xl text-center">
          <p className="text-navy-900/70">
            Hamilton&apos;s mix of century homes and newer builds means siding problems here come from both ends of
            the spectrum, original or early-replacement siding that&apos;s reached the end of its life, and newer
            vinyl that was never quite installed to handle the city&apos;s temperature swings. Most of the siding
            calls we get aren&apos;t full tear-offs, they&apos;re a cracked panel, a section that&apos;s come loose,
            or storm damage limited to one side of the house. We focus on fixing what&apos;s actually broken, and
            we&apos;ll tell you plainly if your situation is one of the exceptions where replacement makes more
            sense.
          </p>
        </div>
      </section>

      {/* Types of siding we repair */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Work With</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Types of Siding We Repair</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {sidingTypes.map((t) => (
              <div key={t.title} className="rounded-[28px] border border-navy-900/10 bg-white p-7 shadow-sm">
                <h3 className="text-lg font-bold text-navy-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common problems */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">What We Fix</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Common Siding Problems in Hamilton
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <div key={p.title} className="h-full rounded-[28px] border border-navy-900/10 p-6 transition-shadow duration-300 hover:shadow-lg">
                <h3 className="mb-2 text-base font-bold text-navy-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-navy-900/65">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Know the Warning Signs</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Signs You Need Siding Repair</h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {signs.map((sign) => (
              <div key={sign} className="flex items-start gap-3 rounded-2xl border border-navy-900/10 bg-white p-5">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" fill="none">
                  <path d="M10 6v5M10 14h.01M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-navy-900/80">{sign}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Siding Repair Cost in Hamilton */}
      <section className="section-y bg-white">
        <div className="container-max max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Pricing</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Siding Repair Cost in Hamilton</h2>
            <p className="mx-auto mt-4 max-w-2xl text-navy-900/70">
              Siding repair pricing varies enough from job to job that a flat number wouldn&apos;t be accurate.
              A single damaged panel is generally one of our smaller repairs, while a repair involving multiple
              sections, hard-to-match siding, or underlying moisture damage costs more. Here&apos;s what actually
              drives the price:
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {costFactors.map((c) => (
              <div key={c.title} className="rounded-2xl border border-navy-900/10 bg-[#f7f9fb] p-6">
                <h3 className="text-sm font-bold text-navy-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-navy-900/50">
            For an accurate number, send us photos of the damage or request an on-site assessment, we&apos;ll give
            you a clear, itemized quote before any work starts.
          </p>
        </div>
      </section>

      {/* Repair vs Replace */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Making the Right Call</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Repair vs. Replace Your Siding</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[28px] border border-navy-900/10 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-navy-900">Repair Usually Makes Sense When</h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-navy-900/70">
                <li>• The damage is limited to one panel or a small section</li>
                <li>• The rest of the siding is in good structural condition</li>
                <li>• A reasonably close colour or profile match is available</li>
                <li>• There&apos;s no significant moisture damage behind the siding</li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-navy-900/10 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-navy-900">Replacement Is Worth Considering When</h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-navy-900/70">
                <li>• Damage is spread across multiple walls or elevations</li>
                <li>• The existing siding is old enough that matching material isn&apos;t available</li>
                <li>• Moisture has already reached the sheathing or framing underneath</li>
                <li>• You&apos;re already planning an upgrade for appearance or insulation</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-navy-900/60">
            We&apos;ll always tell you honestly which category your home falls into, our goal is to fix what&apos;s
            broken, not to upsell a replacement you don&apos;t need.
          </p>
        </div>
      </section>

      {/* Recent Siding Repairs in Hamilton */}
      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Real Results</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Recent Siding Repairs in Hamilton</h2>
          </div>
          {projects.length > 0 ? (
            <div className="flex flex-col gap-10">
              {projects.map((project) => (
                <div key={project.title} className="rounded-[28px] border border-navy-900/10 bg-[#f7f9fb] p-6 sm:p-8">
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
                        <div key={i} className="rounded-[20px] border border-navy-900/10 bg-white p-2 shadow-sm">
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
            <div className="mx-auto max-w-xl rounded-[28px] border border-dashed border-navy-900/15 bg-[#f7f9fb] p-10 text-center">
              <p className="text-sm text-navy-900/60">
                We&apos;re adding real before-and-after photos from completed Hamilton siding repairs here soon.
                Check back, or ask us for recent examples when you request your quote.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Local conditions */}
      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max max-w-3xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Local Conditions</p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Why Hamilton Siding Needs Different Care
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-navy-900/75">
            <p>
              Older homes around Westdale and Kirkendall often have original or early-replacement siding, and at
              that age it&apos;s the fasteners, seams, and trim details that tend to fail first, not the siding
              material itself. A targeted repair at these failure points usually restores the wall without
              touching sections that are still performing fine.
            </p>
            <p>
              Neighbourhoods closer to Crown Point see more foot traffic and activity right up against the house,
              which is where we most often find impact cracks near grade level. Waterdown&apos;s newer builds, by
              contrast, tend to show installation-related issues, panels hung too tight with no room to expand, or
              trim that wasn&apos;t sealed properly around windows.
            </p>
            <p>
              Hamilton&apos;s proximity to Lake Ontario adds humidity that can linger behind a loose panel longer
              than it would in a drier inland location, and the city&apos;s wide swing between summer heat and
              winter cold puts real stress on seams and fastening strips over time. Both are reasons we check the
              full wall during a repair call, not just the spot you flagged.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-white">
        <div className="container-max max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Send photos CTA */}
      <section className="section-y bg-navy-950">
        <div className="container-max max-w-2xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light">Skip the Wait</p>
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
            Send Us Photos for a Free Quote
          </h2>
          <p className="mt-4 text-brand-silver/80">
            No need to schedule a visit just to get a starting number. Take a few clear photos of the damaged
            siding, plus one wide shot showing where it is on the house, and email them to us. We&apos;ll follow up
            with an initial assessment and, if needed, book an in-person visit to confirm.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${business.email}?subject=${photoQuoteSubject}&body=${photoQuoteBody}`}
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-8 py-4 text-center text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right"
            >
              Email Photos to {business.email}
            </a>
            <a
              href={business.phoneHref}
              className="glass-dark inline-flex items-center justify-center rounded-full px-8 py-4 text-center text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Call {business.phone}
            </a>
          </div>
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
