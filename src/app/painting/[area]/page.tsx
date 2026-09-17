import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceCityPage from "@/components/ServiceCityPage";
import { business, services, serviceAreas } from "@/lib/data";
import { paintingFaqPool } from "@/lib/serviceCityFaqs";

const service = services.find((s) => s.slug === "painting")!;

type Params = Promise<{ area: string }>;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `Exterior Painting Services in ${area.name}, ON`;
  const description = `Professional exterior painting for homes in ${area.name}, ON, including trim, soffit, and deck staining. Licensed & insured, free estimates.`;
  return {
    title,
    description,
    alternates: { canonical: `/painting/${area.slug}` },
    openGraph: { title, description, url: `${business.siteUrl}/painting/${area.slug}` },
  };
}

export default async function PaintingAreaPage({ params }: { params: Params }) {
  const { area: slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const index = serviceAreas.findIndex((a) => a.slug === slug);

  return (
    <ServiceCityPage
      service={service}
      area={area}
      pathPrefix="painting"
      index={index}
      siblingAreas={serviceAreas}
      faqPool={paintingFaqPool}
    />
  );
}
