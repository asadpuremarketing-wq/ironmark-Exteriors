import { business } from "@/lib/data";

/**
 * A persistent, mobile-only call button. Deliberately a small floating
 * pill in the corner (not a full-width bottom bar) so it stays visible
 * while scrolling through project photos and pricing without covering
 * page content or sitting on top of the quote form's fields/submit button.
 */
export default function MobileCallButton() {
  return (
    <a
      href={business.phoneHref}
      aria-label={`Call Ironmark Exteriors at ${business.phone}`}
      className="btn-shine fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-dark bg-[length:150%_100%] bg-left py-3 pl-3.5 pr-4 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:bg-right active:scale-95 sm:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/30" />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none">
          <path
            d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      Call Now
    </a>
  );
}
