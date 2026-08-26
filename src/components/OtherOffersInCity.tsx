import Link from "next/link";
import { areaOffers, type ServiceArea } from "@/lib/data";

/**
 * Cross-links to the other offer services available in the same city
 * (e.g. on the Hamilton gutter cleaning page, links to Hamilton window
 * cleaning and Hamilton pressure washing). Strengthens the topical/geo
 * cluster for each city rather than only linking sideways between cities
 * for the same single service.
 */
export default function OtherOffersInCity({
  currentSlug,
  area,
}: {
  currentSlug: (typeof areaOffers)[number]["slug"];
  area: ServiceArea;
}) {
  const others = areaOffers.filter((o) => o.slug !== currentSlug && o.areaSlugs.includes(area.slug));
  if (others.length === 0) return null;

  return (
    <section className="section-y bg-[#f7f9fb]">
      <div className="container-max">
        <h2 className="mb-4 text-center text-2xl font-extrabold text-navy-900">
          Other Services in {area.name}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {others.map((o) => (
            <Link
              key={o.pathPrefix}
              href={`/${o.pathPrefix}/${area.slug}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/30 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              {o.label} in {area.name}, {o.priceLabel}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
