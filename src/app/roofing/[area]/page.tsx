import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceCityPage from "@/components/ServiceCityPage";
import { business, services, serviceAreas } from "@/lib/data";
import { roofingFaqPool } from "@/lib/serviceCityFaqs";

const service = services.find((s) => s.slug === "roofing")!;

type Params = Promise<{ area: string }>;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `Roofing Services in ${area.name}, ON`;
  const description = `Roof repairs, replacements, and inspections for homeowners in ${area.name}, ON. Licensed & insured, free estimates.`;
  return {
    title,
    description,
    alternates: { canonical: `/roofing/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/roofing/${area.slug}` },
  };
}

export default async function RoofingAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const index = serviceAreas.findIndex((a) => a.slug === slug);

  return (
    <ServiceCityPage
      service={service}
      area={area}
      pathPrefix="roofing"
      index={index}
      siblingAreas={serviceAreas}
      faqPool={roofingFaqPool}
    />
  );
}
