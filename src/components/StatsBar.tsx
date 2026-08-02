import CountUp from "./CountUp";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 5, decimals: 1, suffix: "", label: "Average Google Rating" },
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "%", label: "Licensed & Insured" },
];

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-10 sm:py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 50%, rgba(47,127,214,0.18), transparent 45%), radial-gradient(circle at 90% 50%, rgba(47,127,214,0.14), transparent 45%)",
        }}
      />
      <div className="container-max relative grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-dark rounded-2xl px-4 py-6 text-center transition duration-300 hover:-translate-y-1"
          >
            <div className="text-gradient font-heading text-3xl font-extrabold sm:text-4xl">
              <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </div>
            <div className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-brand-silver/60">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
