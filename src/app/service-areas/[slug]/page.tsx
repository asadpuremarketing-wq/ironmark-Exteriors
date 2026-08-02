import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import GoogleReviews from "@/components/GoogleReviews";
import Breadcrumbs from "@/components/Breadcrumbs";
import { serviceAreas, services, business } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `Exterior Services in ${area.name}, ${area.province}`;
  const description = `${area.blurb} Licensed & insured. Free estimates on roofing, siding, gutters, windows, painting, and pressure washing.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/service-areas/${area.slug}` },
  };
}

export default async function ServiceAreaPage({ params }: { params: Params }) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: `${business.name} — ${area.name}`,
    description: area.blurb,
    telephone: business.phone,
    url: `${business.siteUrl}/service-areas/${area.slug}`,
    areaServed: { "@type": "City", name: `${area.name}, ${area.province}` },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema) }}
      />
      <Breadcrumbs items={[{ label: "Service Areas", href: "/service-areas" }, { label: area.name }]} />
      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`Exterior Services in ${area.name}, ON`}
        subtitle={area.blurb}
      />

      <section className="section-y bg-white">
        <div className="container-max">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              What We Offer
            </p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Services Available in {area.name}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-navy-900/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <h3 className="mb-2 text-lg font-bold text-navy-900">
                  {service.name} in {area.name}
                </h3>
                <p className="text-sm leading-relaxed text-navy-900/70">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <section className="section-y bg-navy-950">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-white">
            Also Serving Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/service-areas/${a.slug}`}
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
