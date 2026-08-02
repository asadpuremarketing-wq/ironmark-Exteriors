import SmartImage from "./SmartImage";
import Reveal from "./Reveal";

export default function TruckTeam() {
  return (
    <section className="section-y bg-white">
      <div className="container-max">
        <Reveal className="mb-14 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Meet Ironmark
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Our Fleet &amp; Our Gear
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-900/65">
            Look for our wrapped trucks around Hamilton, Stoney Creek, Burlington,
            Ancaster, and Dundas.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="group relative overflow-hidden rounded-2xl border border-navy-900/10 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/15">
              <SmartImage
                src="/images/truck.png"
                alt="Ironmark Exteriors branded truck"
                fallbackLabel="Ironmark Exteriors Truck"
                className="aspect-video"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="glass-dark absolute bottom-3 left-3 rounded-full px-4 py-1.5 text-xs font-bold text-white">
                Our Fleet
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="group relative overflow-hidden rounded-2xl border border-navy-900/10 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/15">
              <SmartImage
                src="/images/hat.png"
                alt="Ironmark Exteriors branded hat"
                fallbackLabel="Ironmark Exteriors Gear"
                className="aspect-video"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="glass-dark absolute bottom-3 left-3 rounded-full px-4 py-1.5 text-xs font-bold text-white">
                Our Gear
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
