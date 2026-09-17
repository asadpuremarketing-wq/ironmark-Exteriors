"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export default function CountUp({ value, suffix = "", decimals = 0, duration = 1400, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value.toFixed(decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let started = false;
    let rafId: number;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay((value * eased).toFixed(decimals));
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    // Reset to 0 so the animation has something to count up from, then
    // start immediately if already on-screen (covers browsers/extensions
    // where IntersectionObserver can be slow or silently blocked) or when
    // the browser doesn't support IntersectionObserver at all.
    setDisplay((0).toFixed(decimals));

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      run();
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);

    // Fallback in case the observer never fires for some reason (e.g. a
    // browser extension interfering with it), so the stat never gets
    // stuck showing 0.
    const fallback = window.setTimeout(run, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      cancelAnimationFrame(rafId);
    };
  }, [value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
