"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { services } from "@/lib/data";
import Reveal from "./Reveal";

const icons: Record<string, string> = {
  roofing: "M12 3 2 11h3v9h6v-6h2v6h6v-9h3L12 3z",
  siding: "M3 4h18v4H3V4zm0 6h18v4H3v-4zm0 6h18v4H3v-4z",
  gutters: "M4 5h16v3H4V5zm2 3v2a6 6 0 0 0 12 0V8H6z",
  windows: "M4 3h16v18H4V3zm8 0v18M4 12h16",
  painting: "M7 3h10l-1 6H8L7 3zM9 9h6l1 12H8L9 9z",
  "pressure-washing": "M5 12l4-9 4 9-2 9H7l-2-9zm10-6l3 6-1 4h-4",
};

const FEATURED_SLUG = "roofing";

export default function ServicesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const goToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    setActiveIndex(Math.round(ratio * (services.length - 1)));
  };

  return (
    <section className="section-y relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(47,127,214,0.16), transparent 45%)",
        }}
      />
      <div className="container-max relative">
        <Reveal className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light">
              What We Do
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Our Services
            </h2>
          </div>
          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="glass-dark rounded-full p-3 text-white transition hover:border-brand-blue/50 hover:bg-brand-blue/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="glass-dark rounded-full p-3 text-white transition hover:border-brand-blue/50 hover:bg-brand-blue/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </Reveal>

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => {
            const featured = service.slug === FEATURED_SLUG;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group shimmer-border relative w-[82vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/10 sm:w-[300px] sm:p-8 ${
                  featured
                    ? "bg-linear-to-br from-brand-blue/20 via-navy-900 to-navy-900 ring-1 ring-brand-blue/40 hover:bg-white/[0.06]"
                    : "glass-dark hover:bg-white/[0.08]"
                }`}
              >
                {featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-light px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                    Most Popular
                  </span>
                )}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-blue/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                />
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-brand-blue/25 to-brand-blue/5 text-brand-blue-light transition duration-300 group-hover:from-brand-blue group-hover:to-brand-blue-dark group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d={icons[service.slug]} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="relative mb-2 font-heading text-lg font-bold text-white">
                  {service.name}
                </h3>
                <p className="relative text-sm leading-relaxed text-brand-silver/65">
                  {service.shortDescription}
                </p>
                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-light">
                  Learn more
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-1" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {services.map((service, i) => (
            <button
              key={service.slug}
              onClick={() => goToIndex(i)}
              aria-label={`Go to ${service.name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-brand-blue" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
