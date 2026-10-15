"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { business, googleReviews } from "@/lib/data";

function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.27a12 12 0 0 0 0 10.76l4-3.11z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
    </svg>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#fbbc04" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L10 14.9l-5.5 3.1 1.4-6.1-4.7-4.1 6.2-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

const AUTO_ROTATE_MS = 5000;

export default function GoogleReviews({ heading = "Trusted by Homeowners Across Hamilton" }: { heading?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    // Scroll only within the carousel track, scrollIntoView can also move
    // the whole page's vertical scroll position, which is jarring here
    // since this fires on an auto-rotate timer, not just a user click.
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const scroll = (dir: 1 | -1) => {
    setActiveIndex((i) => {
      const next = (i + dir + googleReviews.length) % googleReviews.length;
      goToIndex(next);
      return next;
    });
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    setActiveIndex(Math.round(ratio * (googleReviews.length - 1)));
  };

  // Auto-rotate through the reviews, pausing while a visitor is
  // hovering/touching the carousel so it doesn't fight manual swiping.
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => {
        const next = (i + 1) % googleReviews.length;
        goToIndex(next);
        return next;
      });
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <section className="relative section-y overflow-hidden bg-[#f7f9fb]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(47,127,214,0.08), transparent 45%), radial-gradient(circle at 0% 100%, rgba(47,127,214,0.06), transparent 45%)",
        }}
      />
      <div className="container-max relative">
        <Reveal className="mb-14 flex flex-col items-center text-center">
          <div className="glass-light mb-4 flex items-center gap-2 rounded-full px-4 py-2 shadow-sm">
            <GoogleLogo className="h-5 w-5" />
            <span className="text-sm font-bold text-navy-900">Google Reviews</span>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
              {heading}
            </h2>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous review"
                className="rounded-full border border-navy-900/10 bg-white p-2.5 text-navy-900/60 transition hover:border-brand-blue/40 hover:text-brand-blue"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next review"
                className="rounded-full border border-navy-900/10 bg-white p-2.5 text-navy-900/60 transition hover:border-brand-blue/40 hover:text-brand-blue"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Stars />
            <span className="text-sm font-semibold text-navy-900/60">
              5.0 rating from verified customers
            </span>
          </div>
        </Reveal>

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:gap-6 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {googleReviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90} className="w-[82vw] max-w-sm shrink-0 snap-start sm:w-[360px]">
              <div className="relative h-full rounded-2xl border border-navy-900/10 bg-white p-6 font-sans shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium text-white"
                      style={{ backgroundColor: r.avatarColor }}
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#202124]">{r.name}</div>
                      <div className="flex items-center gap-1 text-xs text-[#70757a]">
                        {r.meta}
                      </div>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#5f6368]" fill="currentColor">
                    <circle cx="5" cy="12" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="19" cy="12" r="1.8" />
                  </svg>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Stars />
                  {r.isNew && (
                    <span className="rounded border border-[#dadce0] px-1.5 py-0.5 text-[10px] font-medium text-[#202124]">
                      NEW
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-xs text-[#70757a]">{r.timeAgo}</div>

                <p className="mt-3 text-sm leading-relaxed text-[#3c4043]">
                  {r.text}
                </p>

                <div className="mt-4 flex items-center gap-5 border-t border-navy-900/5 pt-3 text-xs font-medium text-[#5f6368]">
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                      <path d="M7 10v11M2 13.5V21a1.5 1.5 0 0 0 1.5 1.5H17a2 2 0 0 0 2-1.63l1.38-8A2 2 0 0 0 18.4 10H14V5a3 3 0 0 0-3-3l-4 8v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Like
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Share
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {googleReviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                setIsPaused(true);
                setActiveIndex(i);
                goToIndex(i);
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-brand-blue" : "w-1.5 bg-navy-900/15 hover:bg-navy-900/30"
              }`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={business.googleBusinessProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:underline"
          >
            Read all our reviews on Google
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
