// Wordmark stand-in until the owner sends the original logo file (see docs/discovery-questions.md).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <rect width="40" height="40" rx="11" fill="#6e1611" />
        <path d="M8 30 20 9l12 21" fill="none" stroke="#f5c518" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 23h14" stroke="#f5c518" strokeWidth="3.2" strokeLinecap="round" />
        <rect x="8" y="32" width="6" height="2.4" rx="1" fill="#c8261e" />
        <rect x="17" y="32" width="6" height="2.4" rx="1" fill="#1f8a4c" />
        <rect x="26" y="32" width="6" height="2.4" rx="1" fill="#1e5aa8" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-lg font-bold tracking-tight">Adisah African</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-gold">Store</span>
      </span>
    </span>
  );
}
