"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

type Msg = { from: "me" | "store"; lines: string[]; time: string };

// Illustrative conversation only: no prices or delivery fees, since those are confirmed per order.
const script: Msg[] = [
  { from: "me", lines: ["Hi Adisah! Can I order:", "• 2 bags of garri", "• 1 red palm oil", "• 3 titus fish", "Delivery to Bowie please 🙏"], time: "10:02" },
  { from: "store", lines: ["Hello! All in stock ✅", "Sending your total now.", "Delivery today, 4 to 6pm 🛵"], time: "10:04" },
  { from: "me", lines: ["Perfect, thank you!"], time: "10:05" },
  { from: "store", lines: ["Your order is packed and on its way 📦"], time: "16:12" },
];

// Each step: show `shown` messages, with a typing indicator for the next one if `typing` is set.
const timeline: { shown: number; typing?: "me" | "store"; ms: number }[] = [
  { shown: 0, ms: 900 },
  { shown: 0, typing: "me", ms: 1600 },
  { shown: 1, ms: 1300 },
  { shown: 1, typing: "store", ms: 1700 },
  { shown: 2, ms: 1500 },
  { shown: 2, typing: "me", ms: 1000 },
  { shown: 3, ms: 1400 },
  { shown: 3, typing: "store", ms: 1500 },
  { shown: 4, ms: 4200 },
];

export function WhatsAppDemo() {
  const [step, setStep] = useState(timeline.length - 1);
  const [playing, setPlaying] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // Only animate when on screen and the visitor hasn't asked for reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.3 });
    if (box.current) io.observe(box.current);
    setStep(0);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % timeline.length), timeline[step].ms);
    return () => clearTimeout(t);
  }, [step, playing]);

  const { shown, typing } = timeline[step];

  return (
    <div ref={box} className="relative mx-auto w-full max-w-[340px]">
      <div className="absolute -inset-6 -z-10 rounded-[3.5rem] bg-gradient-to-br from-wa/30 via-gold/20 to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-[2.6rem] border-[10px] border-ink-2 bg-ink-2 shadow-2xl ring-1 ring-white/10">
        {/* Chat header */}
        <div className="flex items-center gap-3 bg-[#075e54] px-4 pb-3 pt-4 text-white">
          <span className="grid size-9 place-items-center rounded-full bg-maroon font-display text-sm font-bold text-gold">A</span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{site.name}</p>
            <p className="text-[11px] text-white/70">{typing === "store" ? "typing…" : "online"}</p>
          </div>
          <WhatsAppIcon className="ml-auto size-5 text-white/80" />
        </div>

        {/* Messages */}
        <div
          className="flex h-[380px] flex-col justify-end gap-2 px-3 py-4"
          style={{ backgroundColor: "#efe7dd", backgroundImage: "radial-gradient(#d9cfc2 1px, transparent 1px)", backgroundSize: "16px 16px" }}
          aria-live="off"
        >
          {script.slice(0, shown).map((m, i) => (
            <Bubble key={i} msg={m} read={i < shown - 1 || m.from === "store"} />
          ))}
          {typing && <Typing side={typing} />}
        </div>

        {/* Composer */}
        <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2.5">
          <div className="flex-1 rounded-full bg-white px-4 py-2 text-xs text-ink/40">Message</div>
          <span className="grid size-9 place-items-center rounded-full bg-[#00a884] text-white">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </span>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-cream/50">How a WhatsApp order works</p>
    </div>
  );
}

function Bubble({ msg, read }: { msg: Msg; read: boolean }) {
  const me = msg.from === "me";
  return (
    <div className={`chat-pop flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-xl px-3 py-2 text-[13px] leading-snug text-[#111b21] shadow-sm ${
          me ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white"
        }`}
      >
        {msg.lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
        <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
          {msg.time}
          {me && (
            <svg viewBox="0 0 16 11" className={`h-2.5 w-3.5 ${read ? "text-[#53bdeb]" : "text-[#8696a0]"}`} fill="currentColor" aria-hidden>
              <path d="M11.07.65 4.98 6.74 2.9 4.66 1.84 5.72l3.14 3.14 7.15-7.15zM14.16.65 8.07 6.74l-.7-.7-1.06 1.06 1.76 1.76 7.15-7.15z" />
            </svg>
          )}
        </p>
      </div>
    </div>
  );
}

function Typing({ side }: { side: "me" | "store" }) {
  return (
    <div className={`chat-pop flex ${side === "me" ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-1 rounded-xl px-3 py-3 shadow-sm ${side === "me" ? "bg-[#d9fdd3]" : "bg-white"}`}>
        {[0, 1, 2].map((d) => (
          <span key={d} className="typing-dot size-1.5 rounded-full bg-[#8696a0]" style={{ animationDelay: `${d * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}
