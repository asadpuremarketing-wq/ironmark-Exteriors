import Link from "next/link";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";

const projects = [
  { slug: "project-1", label: "Project 1" },
  { slug: "project-2", label: "Project 2" },
];

export default function BeforeAfter() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-14 sm:py-16 md:py-20">
      <div
        className="blob animate-float pointer-events-none right-1/4 top-0 h-72 w-72 bg-brand-blue/10"
        aria-hidden="true"
      />
      <div className="container-max relative">
        <Reveal className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light">
            Real Results
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Before &amp; After
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-silver/70">
            A glimpse at recent work — more project photos added regularly.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.label} delay={i * 100}>
              <div className="glass-dark group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-2xl hover:shadow-black/40">
                <div className="grid grid-cols-2 gap-px bg-white/5">
                  <div className="relative">
                    <SmartImage
                      src={`/images/before-after/${p.slug}-before.jpg`}
                      alt={`${p.label} before`}
                      fallbackLabel={`Before — ${p.label} Project`}
                      className="aspect-4/5"
                    />
                    <span className="glass-dark absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-silver/80">
                      Before
                    </span>
                  </div>
                  <div className="relative">
                    <SmartImage
                      src={`/images/before-after/${p.slug}-after.jpg`}
                      alt={`${p.label} after`}
                      fallbackLabel={`After — ${p.label} Project`}
                      className="aspect-4/5"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-linear-to-r from-brand-blue to-brand-blue-light px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                      After
                    </span>
                  </div>
                </div>
                <div className="bg-navy-950/60 px-5 py-3.5 text-center text-sm font-bold text-white backdrop-blur-sm">
                  {p.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <p className="mb-3 text-sm text-brand-silver/60">
            Want to see your home transformed?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-light hover:underline"
          >
            Get your free estimate
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
