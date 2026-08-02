import Link from "next/link";
import { business, services, serviceAreas } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-brand-silver">
      <div className="container-max grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="mb-4">
            <Logo className="h-9" />
          </div>
          <p className="text-sm leading-relaxed text-brand-silver/60">
            {business.tagline}. Roofing, siding, gutters, windows, painting &
            pressure washing for homes across the Hamilton area.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-brand-blue-light" fill="currentColor">
              <path d="M2.5 4A1.5 1.5 0 0 1 4 2.5h2.1c.4 0 .74.27.84.66l.82 3.16a.9.9 0 0 1-.25.87L6.2 8.5a11.7 11.7 0 0 0 5.3 5.3l1.3-1.3a.9.9 0 0 1 .87-.25l3.16.82c.39.1.66.44.66.84V16a1.5 1.5 0 0 1-1.5 1.5H15C7.82 17.5 2.5 12.18 2.5 5V4z" />
            </svg>
            <a href={business.phoneHref} className="text-sm font-bold text-white hover:text-brand-blue-light">
              {business.phone}
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-blue-light">
            Services
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-blue-light">
            Service Areas
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {serviceAreas.map((c) => (
              <li key={c.slug}>
                <Link href={`/service-areas/${c.slug}`} className="transition hover:text-white">
                  {c.name}, {c.province}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-blue-light">
            Contact
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-silver/60">
            <li>{business.address}</li>
            <li>{business.city}</li>
            <li>
              <a href={business.phoneHref} className="transition hover:text-white">
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="transition hover:text-white">
                {business.email}
              </a>
            </li>
          </ul>
          <Link
            href="/contact"
            className="btn-shine mt-6 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark px-5 py-2.5 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            Free Estimate
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-silver/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>{business.website}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
