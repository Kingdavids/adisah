import Image from "next/image";

// Logo cut from the store's flyer. White lettering, so only use it on dark backgrounds.
// "mark": the A emblem beside a text wordmark (header). "full": the complete logo with lettering.
export function Logo({ variant = "mark", className = "" }: { variant?: "mark" | "full"; className?: string }) {
  if (variant === "full") {
    return <Image src="/images/logo-full.png" alt="Adisah African Store" width={640} height={534} className={`h-auto ${className || "w-40"}`} />;
  }
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image src="/images/logo-mark.png" alt="" width={440} height={267} priority className="h-12 w-auto shrink-0" />
      <span className="leading-none">
        <span className="block font-display text-lg font-bold tracking-tight">Adisah African</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-gold">Store</span>
      </span>
    </span>
  );
}
