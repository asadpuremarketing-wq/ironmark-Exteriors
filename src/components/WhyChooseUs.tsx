import Reveal from "./Reveal";

const points = [
  {
    title: "Licensed & Insured",
    text: "Full coverage on every job, so you can have complete peace of mind from start to finish.",
    icon: "M10 2 3 5v5c0 5 3.4 8.7 7 9 3.6-.3 7-4 7-9V5l-7-3z",
    stat: "100%",
    statLabel: "Compliant",
  },
  {
    title: "Premium Materials",
    text: "We install top-tier roofing, siding, and gutter products built to withstand Ontario winters.",
    icon: "M4 4h12v3H4V4zm0 4.5h12v3H4v-3zM4 13h12v3H4v-3z",
  },
  {
    title: "On-Time, Every Time",
    text: "Clear timelines and dependable crews — we respect your schedule as much as our own.",
    icon: "M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm.5 4v4.4l3.5 2-.7 1.2-4.3-2.5V6h1.5z",
    stat: "10+",
    statLabel: "Years",
  },
  {
    title: "Workmanship Guarantee",
    text: "We stand behind every installation and repair with a workmanship warranty.",
    icon: "M10 1.5l2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L10 14.9l-5.5 3.1 1.4-6.1-4.7-4.1 6.2-.6L10 1.5z",
    stat: "500+",
    statLabel: "Projects",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative section-y overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, rgba(47,127,214,0.06), transparent 50%)",
        }}
      />
      <div className="container-max relative">
        <Reveal className="mb-14 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            The Ironmark Standard
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Why Homeowners Choose Us
          </h2>
        </Reveal>

        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {points.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 90}
              className="w-[75vw] max-w-xs shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-blue/0 blur-2xl transition duration-500 group-hover:bg-brand-blue/10" />
                <div className="relative mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-navy-800 to-navy-950 text-brand-blue-light shadow-lg transition duration-300 group-hover:from-brand-blue group-hover:to-brand-blue-dark group-hover:text-white">
                    <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
                      <path d={p.icon} />
                    </svg>
                  </div>
                  {p.stat && (
                    <div className="text-right">
                      <div className="font-heading text-xl font-extrabold text-brand-blue">
                        {p.stat}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-navy-900/40">
                        {p.statLabel}
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-navy-900">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-navy-900/65">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-navy-900/40 sm:hidden">
          Swipe to see more →
        </p>
      </div>
    </section>
  );
}
