import Link from "next/link";

/**
 * Cross-links a per-city service page up to its service hub and up to the
 * city's service-areas hub, so every page sits inside a reachable link
 * cluster rather than only linking sideways to other cities/services.
 */
export default function ServiceHubLinks({
  serviceHref,
  serviceName,
  areaSlug,
  areaName,
}: {
  serviceHref: string;
  serviceName: string;
  areaSlug: string;
  areaName: string;
}) {
  return (
    <section className="pb-14 sm:pb-20">
      <div className="container-max flex flex-wrap justify-center gap-3">
        <Link
          href={serviceHref}
          className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
        >
          All {serviceName} Locations
        </Link>
        <Link
          href={`/service-areas/${areaSlug}`}
          className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/20 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:border-brand-blue hover:text-brand-blue"
        >
          All {areaName} Services
        </Link>
      </div>
    </section>
  );
}
