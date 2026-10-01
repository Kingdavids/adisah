"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, links, site } from "@/lib/site";
import { track } from "./analytics";
import { WhatsAppIcon } from "./icons";

type Cart = Record<string, number>;
const STORAGE_KEY = "adisah-cart-v1";

export function OrderBuilder() {
  const [active, setActive] = useState(categories[0].slug);
  const [cart, setCart] = useState<Cart>({});
  const [extra, setExtra] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");
  const [when, setWhen] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Keep the list if the customer leaves and comes back
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.cart) setCart(saved.cart);
      if (saved.extra) setExtra(saved.extra);
      if (saved.name) setName(saved.name);
      if (saved.address) setAddress(saved.address);
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, extra, name, address }));
    } catch {}
  }, [cart, extra, name, address, loaded]);

  const lines = useMemo(() => Object.entries(cart).filter(([, q]) => q > 0), [cart]);
  const count = lines.reduce((n, [, q]) => n + q, 0);
  const extraLines = extra.split("\n").map((l) => l.trim()).filter(Boolean);
  const canSend = (lines.length > 0 || extraLines.length > 0) && (mode === "pickup" || address.trim().length > 4);

  const setQty = (item: string, q: number) => setCart((c) => ({ ...c, [item]: Math.max(0, Math.min(99, q)) }));

  const message = [
    `Hello ${site.name}, I'd like to place an order${name ? ` (${name})` : ""}:`,
    "",
    ...lines.map(([item, q]) => `• ${q} x ${item}`),
    ...extraLines.map((l) => `• ${l}`),
    "",
    mode === "delivery" ? `Delivery to: ${address.trim()}` : "Pickup at the store",
    when ? `Preferred time: ${when}` : "",
    "",
    "Please confirm availability and total. Thank you!",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");

  function send() {
    track("whatsapp_order", { items: count + extraLines.length, mode, value_lines: lines.length });
  }

  const current = categories.find((c) => c.slug === active)!;
  const field = "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/15";

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_400px]">
      {/* Picker */}
      <div className="min-w-0">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
          {categories.map((c) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={active === c.slug}
              onClick={() => setActive(c.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                active === c.slug ? "bg-ink text-cream" : "bg-sand text-ink/75 hover:bg-ink/10"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {current.items.map((item) => {
            const q = cart[item] || 0;
            return (
              <li
                key={item}
                className={`flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 transition ${
                  q ? "border-maroon/40 shadow-md" : "border-ink/10"
                }`}
              >
                <span className="text-sm font-medium">{item}</span>
                {q === 0 ? (
                  <button
                    onClick={() => setQty(item, 1)}
                    className="rounded-full bg-maroon px-4 py-1.5 text-xs font-semibold text-cream transition hover:bg-ember"
                  >
                    Add
                  </button>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-sand p-1">
                    <button aria-label={`Fewer ${item}`} onClick={() => setQty(item, q - 1)} className="grid size-7 place-items-center rounded-full bg-white font-bold">
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold tabular-nums">{q}</span>
                    <button aria-label={`More ${item}`} onClick={() => setQty(item, q + 1)} className="grid size-7 place-items-center rounded-full bg-white font-bold">
                      +
                    </button>
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <label className="mt-8 block">
          <span className="text-sm font-semibold">Anything else?</span>
          <span className="block text-xs text-ink/55">One item per line, e.g. &ldquo;2 tubers of yam&rdquo; or &ldquo;Nido 900g&rdquo;</span>
          <textarea rows={4} value={extra} onChange={(e) => setExtra(e.target.value)} className={`${field} mt-2`} placeholder="Type any item we haven't listed" />
        </label>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-xl">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold">Your list</h2>
            <span className="text-sm text-ink/55">{count + extraLines.length} item{count + extraLines.length === 1 ? "" : "s"}</span>
          </div>

          {lines.length + extraLines.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-sand p-4 text-sm text-ink/60">Nothing yet. Tap &ldquo;Add&rdquo; on any item.</p>
          ) : (
            <ul className="mt-4 max-h-56 space-y-1.5 overflow-y-auto text-sm">
              {lines.map(([item, q]) => (
                <li key={item} className="flex justify-between gap-2">
                  <span>{item}</span>
                  <span className="font-semibold tabular-nums">× {q}</span>
                </li>
              ))}
              {extraLines.map((l, i) => (
                <li key={i} className="text-ink/70">
                  {l}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 space-y-3">
            <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            <div className="grid grid-cols-2 gap-1 rounded-full bg-sand p-1 text-sm font-semibold">
              {(["delivery", "pickup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`rounded-full py-2 capitalize transition ${mode === m ? "bg-ink text-cream" : "text-ink/60"}`}
                >
                  {m}
                </button>
              ))}
            </div>
            {mode === "delivery" && (
              <input className={field} placeholder="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
            )}
            <input className={field} placeholder="Preferred day / time (optional)" value={when} onChange={(e) => setWhen(e.target.value)} />
          </div>

          <a
            href={canSend ? links.whatsapp(message) : undefined}
            target="_blank"
            rel="noopener"
            onClick={canSend ? send : (e) => e.preventDefault()}
            aria-disabled={!canSend}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold transition ${
              canSend ? "bg-wa text-ink hover:brightness-110" : "cursor-not-allowed bg-ink/10 text-ink/40"
            }`}
          >
            <WhatsAppIcon /> Send order on WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-ink/50">
            {canSend ? "Opens WhatsApp with your list ready to send." : mode === "delivery" ? "Add items and a delivery address to continue." : "Add at least one item to continue."}
          </p>
          {count + extraLines.length > 0 && (
            <button
              onClick={() => {
                setCart({});
                setExtra("");
              }}
              className="mx-auto mt-3 block text-xs text-ink/50 underline"
            >
              Clear list
            </button>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-ink/60">
          Prefer to talk?{" "}
          <a href={links.call} data-track="call_click" data-track-location="order_page" className="font-semibold text-maroon">
            Call {site.phoneDisplay}
          </a>
        </p>
      </aside>
    </section>
  );
}
