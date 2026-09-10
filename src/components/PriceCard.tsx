type Props = {
  label: string;
  price: number;
  priceLabel?: string;
  note: string;
  highlighted?: boolean;
};

function HouseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3.5 11.5 12 4l8.5 7.5M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A premium, rounded pricing card used across the offer city/hub pages. */
export default function PriceCard({ label, price, priceLabel = "Starting At", note, highlighted = false }: Props) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] p-8 text-center transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "border-2 border-brand-blue bg-linear-to-b from-brand-blue/[0.07] to-transparent shadow-xl shadow-brand-blue/10"
          : "border border-navy-900/10 bg-white shadow-sm hover:shadow-lg hover:shadow-navy-900/5"
      }`}
    >
      {highlighted && (
        <span className="absolute right-5 top-5 rounded-full bg-brand-blue px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Most Booked
        </span>
      )}
      <span
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
          highlighted ? "bg-brand-blue text-white" : "bg-brand-blue/10 text-brand-blue"
        }`}
      >
        <HouseIcon className="h-7 w-7" />
      </span>
      <p
        className={`mt-5 text-sm font-bold uppercase tracking-wide ${
          highlighted ? "text-brand-blue" : "text-navy-900/50"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-navy-900/35">{priceLabel}</p>
      <p className="mt-2 font-heading text-5xl font-extrabold text-navy-900">${price}</p>
      <p className="mt-4 text-sm leading-relaxed text-navy-900/60">{note}</p>
    </div>
  );
}
