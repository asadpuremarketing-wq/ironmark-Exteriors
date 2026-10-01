"use client";

import { Children, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode[];
  cardWidthClassName?: string;
};

/**
 * A horizontally scrolling carousel for a row of cards. Every card is
 * rendered into the DOM up front (just inside an overflow-x-auto strip),
 * nothing is mounted/unmounted as the user scrolls, so search engines and
 * AI crawlers reading the page source see the full content, not only
 * whatever card happens to be in view. The arrows/dots are a pure
 * convenience layer on top of plain scroll position.
 */
export default function CardCarousel({ children, cardWidthClassName = "w-[300px] sm:w-[320px]" }: Props) {
  const items = Children.toArray(children);
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
    setActiveIndex(Math.round(ratio * (items.length - 1)));
  };

  return (
    <div className="relative">
      <div className="mb-4 hidden justify-end gap-3 sm:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="rounded-full border border-navy-900/10 p-2.5 text-navy-900/60 transition hover:border-brand-blue/40 hover:text-brand-blue"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next"
          className="rounded-full border border-navy-900/10 p-2.5 text-navy-900/60 transition hover:border-brand-blue/40 hover:text-brand-blue"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:gap-6 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <div key={i} className={`shrink-0 snap-start ${cardWidthClassName}`}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToIndex(i)}
            aria-label={`Go to card ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-brand-blue" : "w-1.5 bg-navy-900/15 hover:bg-navy-900/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
