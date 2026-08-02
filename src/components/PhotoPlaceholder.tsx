type Props = {
  label: string;
  className?: string;
};

export default function PhotoPlaceholder({ label, className = "" }: Props) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-linear-to-br from-navy-800 via-navy-900 to-navy-950 text-center ${className}`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-brand-silver/40" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 16l5-4 4 3 3-2.5L21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-medium text-brand-silver/60">{label}</span>
      </div>
    </div>
  );
}
