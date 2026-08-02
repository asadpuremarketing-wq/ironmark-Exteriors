"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business, services } from "@/lib/data";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">

      <div
        className={`border-b border-white/10 bg-navy-950/95 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
      >
        <div className="container-max flex h-[4.5rem] items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-9 sm:h-11 md:h-12" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-brand-silver transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-brand-silver transition hover:text-white"
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  className={`h-3 w-3 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  servicesOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <div className="shimmer-border overflow-hidden rounded-xl border border-white/10 bg-navy-900 shadow-2xl shadow-black/50">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-center justify-between border-b border-white/5 px-5 py-3.5 text-sm font-medium text-brand-silver last:border-b-0 hover:bg-navy-800/70 hover:text-white"
                    >
                      {service.name}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brand-blue-light" fill="none">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/service-areas"
              className="text-sm font-semibold text-brand-silver transition hover:text-white"
            >
              Service Areas
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-brand-silver transition hover:text-white"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a href={business.phoneHref} className="group flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-brand-blue-light transition group-hover:bg-brand-blue/20">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                  <path d="M2.5 4A1.5 1.5 0 0 1 4 2.5h2.1c.4 0 .74.27.84.66l.82 3.16a.9.9 0 0 1-.25.87L6.2 8.5a11.7 11.7 0 0 0 5.3 5.3l1.3-1.3a.9.9 0 0 1 .87-.25l3.16.82c.39.1.66.44.66.84V16a1.5 1.5 0 0 1-1.5 1.5H15C7.82 17.5 2.5 12.18 2.5 5V4z" />
                </svg>
              </span>
              <span className="text-sm font-bold text-white">{business.phone}</span>
            </a>
            <Link
              href="/contact"
              className="btn-shine rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left px-6 py-2.5 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-right"
            >
              Free Estimate
            </Link>
          </div>

          <button
            className="-mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={`h-0.5 w-6 bg-white transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[4.5rem] z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-navy-950 shadow-2xl shadow-black/50 md:hidden">
            <div className="container-max flex max-h-[calc(100vh-4.5rem-52px)] flex-col gap-1 overflow-y-auto py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-3 text-sm font-semibold text-brand-silver hover:bg-navy-800 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              className="flex items-center justify-between rounded px-2 py-3 text-left text-sm font-semibold text-brand-silver hover:bg-navy-800 hover:text-white"
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              Services
              <svg
                className={`h-3 w-3 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 8"
                fill="none"
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col border-l border-white/10 pl-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded px-2 py-2.5 text-sm text-brand-silver hover:bg-navy-800 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/service-areas"
              className="rounded px-2 py-3 text-sm font-semibold text-brand-silver hover:bg-navy-800 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Service Areas
            </Link>
            <Link
              href="/contact"
              className="rounded px-2 py-3 text-sm font-semibold text-brand-silver hover:bg-navy-800 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            <a
              href={business.phoneHref}
              className="mt-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark px-5 py-3 text-center text-sm font-bold text-white shadow-glow"
            >
              Call {business.phone}
            </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
