import Reveal from "./Reveal";

const reviews = [
  {
    name: "Sarah M.",
    location: "Hamilton, ON",
    text: "Ironmark replaced our roof and gutters in a day and a half. Clean, professional, and the crew left the property spotless. Highly recommend.",
  },
  {
    name: "Mike D.",
    location: "Stoney Creek, ON",
    text: "Great communication from quote to completion. The new siding completely transformed the look of our house. Fair pricing too.",
  },
  {
    name: "Priya K.",
    location: "Burlington, ON",
    text: "Fast, reliable, and the crew genuinely cared about doing the job right. Our new windows have made a noticeable difference in comfort.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-brand-blue">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L10 14.9l-5.5 3.1 1.4-6.1-4.7-4.1 6.2-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviews() {
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
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.27a12 12 0 0 0 0 10.76l4-3.11z" />
              <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
            </svg>
            <span className="text-sm font-bold text-navy-900">Google Reviews</span>
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Trusted by Homeowners Across Hamilton
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <Stars />
            <span className="text-sm font-semibold text-navy-900/60">
              5.0 rating from verified customers
            </span>
          </div>
        </Reveal>

        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90} className="w-[82vw] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink">
              <div className="glass-light relative h-full rounded-2xl p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
                <svg viewBox="0 0 32 24" className="mb-4 h-7 w-7 text-brand-blue/20" fill="currentColor">
                  <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 4.4C9.6 5.6 6.4 8.4 6.4 12.8H12.8V24H0zM17.6 24V14.4C17.6 6.4 22.4 1.2 30.4 0L32 4.4c-4.8 1.2-8 4-8 8.4h6.4V24H17.6z" />
                </svg>
                <Stars />
                <p className="mt-4 text-sm leading-relaxed text-navy-900/75">
                  {r.text}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-navy-900/5 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-navy-800 to-navy-950 text-xs font-bold text-white">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy-900">{r.name}</div>
                    <div className="text-xs text-navy-900/50">{r.location}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-navy-900/40 sm:hidden">
          Swipe to see more reviews →
        </p>
      </div>
    </section>
  );
}
