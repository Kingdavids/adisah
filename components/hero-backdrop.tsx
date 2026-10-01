import Image from "next/image";

// Slow cross-fading photos with a gentle zoom. Pure CSS, so it costs nothing on the main thread.
const slides = ["/images/store.webp", "/images/vegetables.webp", "/images/spices.webp", "/images/fish.webp"];

export function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {slides.map((src, i) => (
        <div key={src} className="hero-slide absolute inset-0" style={{ animationDelay: `${i * 6}s` }}>
          <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
        </div>
      ))}
      {/* Warm wash keeps the headline readable over any photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
    </div>
  );
}
