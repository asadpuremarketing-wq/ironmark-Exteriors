import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import SmartImage from "@/components/SmartImage";
import GoogleReviews from "@/components/GoogleReviews";
import { services, serviceAreas, serviceAreaNames, business, serviceCityPages, serviceProjects } from "@/lib/data";
import { blogPosts } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import GutterCleaningOffer, { gutterCleaningMeta } from "@/components/GutterCleaningOffer";
import WindowCleaningOffer, { windowCleaningMeta } from "@/components/WindowCleaningOffer";
import PressureWashingOffer, { pressureWashingMeta } from "@/components/PressureWashingOffer";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  if (slug === "gutters") {
    const { title, description } = gutterCleaningMeta();
    return {
      title,
      description,
      alternates: { canonical: "/services/gutters" },
      openGraph: { title, description, url: `${business.siteUrl}/services/gutters` },
    };
  }

  if (slug === "windows") {
    const { title, description } = windowCleaningMeta();
    return {
      title,
      description,
      alternates: { canonical: "/services/windows" },
      openGraph: { title, description, url: `${business.siteUrl}/services/windows` },
    };
  }

  if (slug === "pressure-washing") {
    const { title, description } = pressureWashingMeta();
    return {
      title,
      description,
      alternates: { canonical: "/services/pressure-washing" },
      openGraph: { title, description, url: `${business.siteUrl}/services/pressure-washing` },
    };
  }

  const title = `${service.name} Services | Hamilton, Burlington, Niagara & More`;
  const description = `${service.shortDescription} Serving homeowners across ${serviceAreaNames}. Free estimates.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  if (slug === "gutters") {
    return <GutterCleaningOffer />;
  }

  if (slug === "windows") {
    return <WindowCleaningOffer />;
  }

  if (slug === "pressure-washing") {
    return <PressureWashingOffer />;
  }

  const cityPages = serviceCityPages.find((scp) => scp.slug === slug);
  const recentProjects = serviceProjects(slug);
  const relatedPosts = blogPosts.filter((p) => p.relatedService === slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} Services`,
    description: service.description,
    provider: {
      "@type": "RoofingContractor",
      name: business.name,
      telephone: business.phone,
      url: business.siteUrl,
    },
    areaServed: serviceAreas.map((a) => `${a.name}, ${a.province}`),
  };

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: service.name, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Hero
        eyebrow={`Serving ${serviceAreas.length} Cities Across the Region`}
        title={`${service.name} Services Across Our Service Area`}
        subtitle={`${service.shortDescription} We serve homeowners throughout ${serviceAreaNames}, not just one city.`}
      />

      <GoogleReviews />

      <section className="section-y bg-white">
        <div className="container-max grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-navy-900">
              About Our {service.name} Service
            </h2>
            <p className="mt-4 text-navy-900/75">{service.description}</p>
            <p className="mt-4 text-navy-900/75">
              Ironmark Exteriors is based in Hamilton, but we&apos;re not a
              Hamilton-only crew. We provide {service.name.toLowerCase()}{" "}
              services to homeowners throughout {serviceAreaNames}, with the
              same free estimates, pricing, and process no matter which of
              these cities you&apos;re in.
            </p>

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
                href={cityPages ? `/${cityPages.pathPrefix}/${area.slug}` : `/service-areas/${area.slug}`}
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

      {recentProjects.length > 0 && (
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
            <div className="mx-auto flex max-w-3xl flex-col gap-10">
              {recentProjects.map((project) => (
                <div key={project.title}>
                  <h3 className="text-lg font-bold text-navy-900">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{project.description}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {project.photoPairs.map((pair, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 gap-1 overflow-hidden rounded-2xl border border-navy-900/10 shadow-sm"
                      >
                        <SmartImage
                          src={pair.before}
                          alt={pair.beforeAlt}
                          fallbackLabel="Before"
                          className="aspect-4/5"
                        />
                        <SmartImage
                          src={pair.after}
                          alt={pair.afterAlt}
                          fallbackLabel="After"
                          className="aspect-4/5"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-max">
            <h2 className="mb-8 text-center font-heading text-2xl font-extrabold text-navy-900">
              From the Blog
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-navy-900/10 bg-[#f7f9fb] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lg"
                >
                  <span className="mb-2 inline-block text-xs font-bold uppercase tracking-wide text-brand-blue">
                    {p.category}
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/65">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-navy-900">
            Other Services We Offer
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
                >
                  {s.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
