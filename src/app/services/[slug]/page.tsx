import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import SmartImage from "@/components/SmartImage";
import GoogleReviews from "@/components/GoogleReviews";
import { services, serviceAreas } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <Hero
        eyebrow="Our Services"
        title={service.name}
        subtitle={service.shortDescription}
      />

      <section className="section-y bg-white">
        <div className="container-max grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-navy-900">
              About Our {service.name} Service
            </h2>
            <p className="mt-4 text-navy-900/75">{service.description}</p>

            <ul className="mt-8 flex flex-col gap-3">
              {service.bullets.map((b) => (
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
          <SmartImage
            src={`/images/services/${service.slug}.jpg`}
            alt={`${service.name} project`}
            fallbackLabel={`${service.name} Project Photo`}
            className="aspect-4/3 rounded-xl"
          />
        </div>
      </section>

      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              Recent Work
            </p>
            <h2 className="font-heading text-2xl font-extrabold text-navy-900 sm:text-3xl">
              See Our {service.name} in Action
            </h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {["project-1", "project-2"].map((slug) => (
              <div
                key={slug}
                className="grid grid-cols-2 gap-1 overflow-hidden rounded-2xl border border-navy-900/10 shadow-sm"
              >
                <SmartImage
                  src={`/images/before-after/${slug}-before.jpg`}
                  alt={`${service.name} before`}
                  fallbackLabel="Before"
                  className="aspect-4/5"
                />
                <SmartImage
                  src={`/images/before-after/${slug}-after.jpg`}
                  alt={`${service.name} after`}
                  fallbackLabel="After"
                  className="aspect-4/5"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      <section className="relative overflow-hidden bg-navy-950 py-14 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(47,127,214,0.16), transparent 45%), radial-gradient(circle at 90% 80%, rgba(47,127,214,0.12), transparent 45%)",
          }}
        />
        <div
          className="blob animate-float pointer-events-none left-1/4 top-0 h-64 w-64 bg-brand-blue/10"
          aria-hidden="true"
        />
        <div className="container-max relative">
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light">
            Where We Work
          </p>
          <h2 className="font-heading mb-3 text-center text-2xl font-extrabold text-white sm:text-3xl">
            {service.name} Services Across Our Service Area
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-brand-silver/70">
            We provide {service.name.toLowerCase()} services to homeowners in:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-navy-900 px-5 py-2.5 text-sm font-semibold text-brand-silver transition duration-300 hover:-translate-y-0.5 hover:border-brand-blue/50 hover:bg-navy-800 hover:text-white hover:shadow-lg hover:shadow-brand-blue/10"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-brand-blue-light" fill="currentColor">
                  <path d="M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" />
                </svg>
                {area.name}, {area.province}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
