import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceQuoteCard from "@/components/ServiceQuoteCard";
import GoogleReviews from "@/components/GoogleReviews";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import CTA from "@/components/CTA";
import { business, type Service, type ServiceArea } from "@/lib/data";
import { introParagraph, whyChooseParagraph, bookingLine, rotateFaqs, neighbourhoodLine } from "@/lib/offerContent";
import { breadcrumbSchema } from "@/lib/breadcrumb";

type Props = {
  service: Service;
  area: ServiceArea;
  pathPrefix: string;
  index: number;
  siblingAreas: ServiceArea[];
  faqPool: (areaName: string) => Faq[];
};

/**
 * Shared city-landing-page template for services that don't have fixed
 * promotional pricing (roofing, painting), mirroring the local-SEO
 * approach already used for gutter/window/pressure-washing city pages,
 * but pointed at a free-quote flow instead of a set price.
 */
export default function ServiceCityPage({ service, area, pathPrefix, index, siblingAreas, faqPool }: Props) {
  const areaFaqs = rotateFaqs(faqPool(area.name), index, 5);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} Services in ${area.name}, ON`,
    description: `${service.description} Serving ${area.name}, ${area.province}.`,
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
    mainEntity: areaFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: service.name, path: `/services/${service.slug}` },
    { name: `${service.name} in ${area.name}`, path: `/${pathPrefix}/${area.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      <Hero
        eyebrow={`Serving ${area.name}, ${area.province}`}
        title={`${service.name} in ${area.name}, ON`}
        subtitle={`${service.shortDescription} Licensed & insured, free estimates for homeowners in ${area.name}.`}
        showCta={false}
        formSlot={
          <ServiceQuoteCard
            title={`Get Your Free ${service.name} Estimate`}
            source={`${pathPrefix}-${area.slug}`}
          />
        }
      />

      <GoogleReviews />

      {/* Intro / local context, unique per city */}
      <section className="bg-white pt-10">
        <div className="container-max max-w-3xl text-center">
          <p className="text-navy-900/70">{introParagraph(service.name.toLowerCase(), area, index)}</p>
        </div>
      </section>

      <section className="section-y bg-[#f7f9fb]">
        <div className="container-max grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-navy-900/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-navy-900">What&apos;s Included</h2>
            <ul className="mt-6 flex flex-col gap-3">
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
          <div className="rounded-[28px] border border-navy-900/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-navy-900">Why {area.name} Homeowners Choose Us</h2>
            <p className="mt-4 text-navy-900/75">{whyChooseParagraph(service.name.toLowerCase(), area, index)}</p>
            <p className="mt-4 text-navy-900/75">{bookingLine(index)}</p>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-max max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h2>
          <FaqAccordion faqs={areaFaqs} />
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="container-max max-w-2xl text-center">
          <p className="text-sm text-navy-900/50">
            Serving {neighbourhoodLine(area)} and the rest of {area.name}, {area.province}.
          </p>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="section-y bg-navy-950">
        <div className="container-max">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-white">
            {service.name} in Nearby Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {siblingAreas
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/${pathPrefix}/${a.slug}`}
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
