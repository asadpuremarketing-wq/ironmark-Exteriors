import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import SmartImage from "@/components/SmartImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { serviceAreaNames } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about Ironmark Exteriors — a Hamilton-based roofing, siding & exterior renovation company serving ${serviceAreaNames} with quality craftsmanship and honest service.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Quality Craftsmanship",
    text: "Every project is completed with attention to detail and materials built to last through Ontario's toughest seasons.",
  },
  {
    title: "Honest Communication",
    text: "Clear estimates, realistic timelines, and no surprises — we keep you informed from the first call to the final walkthrough.",
  },
  {
    title: "Local & Reliable",
    text: "As a Hamilton-based team, we show up on time and stand behind our work for homeowners across the region.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <Hero
        eyebrow="About Ironmark Exteriors"
        title="Built on Trust, Backed by Craftsmanship"
        subtitle="Ironmark Exteriors is a Hamilton-based exterior renovation company dedicated to protecting and enhancing homes across the region with quality workmanship and honest service."
        showCta={false}
      />

      <section className="section-y bg-white">
        <div className="container-max grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              Our Story
            </p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Protecting Homes Across the Hamilton Area
            </h2>
            <p className="mt-5 text-navy-900/75">
              Ironmark Exteriors was founded on a simple idea: homeowners deserve
              exterior work that&apos;s done right the first time. From roofing and
              siding to gutters, windows, painting, and pressure washing, our
              crews bring the skill and care needed to protect your home&apos;s
              most exposed surfaces.
            </p>
            <p className="mt-4 text-navy-900/75">
              We proudly serve homeowners throughout Hamilton, Stoney Creek,
              Burlington, Ancaster, Dundas, and the surrounding areas — bringing
              a local, dependable presence to every job site.
            </p>
          </div>
          <SmartImage
            src="/images/truck.png"
            alt="Ironmark Exteriors branded truck"
            fallbackLabel="Ironmark Exteriors Truck"
            className="aspect-4/3 rounded-xl"
          />
        </div>
      </section>

      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              Why Homeowners Choose Us
            </p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-navy-900/10 bg-white p-7 shadow-sm"
              >
                <h3 className="mb-3 text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-navy-900/65">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
