import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import { serviceAreas, serviceAreaNames, business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Service Areas",
  description: `${business.name} proudly serves ${serviceAreaNames} and surrounding areas with roofing, siding, gutters, windows, painting, and pressure washing.`,
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Service Areas" }]} />
      <Hero
        eyebrow="Where We Work"
        title="Our Service Areas"
        subtitle="Ironmark Exteriors proudly serves homeowners throughout Hamilton and the surrounding communities."
        showCta={false}
      />

      <section className="section-y bg-white">
        <div className="container-max grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group rounded-2xl border border-navy-900/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-navy-900/10"
            >
              <h2 className="mb-2 text-xl font-bold text-navy-900">
                {area.name}, {area.province}
              </h2>
              <p className="text-sm leading-relaxed text-navy-900/70">
                {area.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                View services in {area.name}
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-1" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
