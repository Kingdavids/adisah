"use client";

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition hover:border-maroon hover:text-maroon">
      Print QR card
    </button>
  );
}
