import Image from "next/image";
import Link from "next/link";
import { categories, fmtTime, fullAddress, links, site } from "@/lib/site";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { WhatsAppDemo } from "@/components/whatsapp-demo";
import { ArrowIcon, ClockIcon, KenteBand, MailIcon, PhoneIcon, PinIcon, StarIcon, TruckIcon, WhatsAppIcon } from "@/components/icons";

const faqs = [
  {
    q: "Do you deliver African groceries in Maryland?",
    a: `Yes. We deliver to your doorstep across Upper Marlboro and nearby areas including ${site.serviceArea.slice(1, 6).join(", ")}. Send your list on WhatsApp and we'll confirm the total and delivery time.`,
  },
  {
    q: "How do I place an order?",
    a: "Use the order builder on this site or message us directly on WhatsApp at +1 (301) 543-7933. List the items and quantities, tell us whether you want delivery or pickup, and we'll reply with your total.",
  },
  {
    q: "Where is Adisah African Store?",
    a: `We're at ${fullAddress}, on Old Crain Highway in Prince George's County. Tap Directions on this page to open Google Maps.`,
  },
  {
    q: "Do you sell frozen fish and meat?",
    a: "Yes. We stock frozen fish like titus and croaker, stockfish, dried catfish, turkey, chicken and goat meat, along with fresh vegetables like plantain, yam and scotch bonnet peppers.",
  },
];

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <HeroBackdrop />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
          <div className="reveal [text-shadow:0_2px_16px_rgb(20_12_10_/_0.55)]">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <PinIcon className="size-3.5" /> Upper Marlboro, Maryland
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              A taste of home,
              <br />
              <span className="bg-gradient-to-r from-gold via-amber-300 to-ember bg-clip-text text-transparent [text-shadow:none]">at your doorstep.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
              African food items, provisions, fresh vegetables, frozen fish, turkey and chicken. Send us your list on WhatsApp and we&apos;ll
              deliver it, or stop by the store on Old Crain Hwy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/order"
                data-track="order_builder_open"
                data-track-location="hero"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-semibold text-ink shadow-[0_10px_40px_-10px] shadow-gold/60 transition hover:-translate-y-0.5"
              >
                Start your order <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href={links.whatsapp("Hello Adisah African Store, I'd like to place an order.")}
                target="_blank"
                rel="noopener"
                data-track="whatsapp_click"
                data-track-location="hero"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold transition hover:border-wa hover:text-wa"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8 text-sm">
              <div>
                <dt className="text-cream/50">Delivery</dt>
                <dd className="mt-1 font-semibold">To your door</dd>
              </div>
              <div>
                <dt className="text-cream/50">Ordering</dt>
                <dd className="mt-1 font-semibold">WhatsApp & call</dd>
              </div>
              <div>
                <dt className="text-cream/50">Open</dt>
                <dd className="mt-1 font-semibold">7 days a week</dd>
              </div>
            </dl>
          </div>

          {/* Visual: looping WhatsApp order demo */}
          <div className="reveal [animation-delay:150ms]">
            <WhatsAppDemo />
          </div>
        </div>
        <KenteBand className="h-2 w-full" />
      </section>

      {/* VALUE STRIP */}
      <section className="border-b border-ink/10 bg-sand">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
          {[
            { icon: <TruckIcon />, t: "Doorstep delivery", d: "Across Prince George's County" },
            { icon: <WhatsAppIcon />, t: "Order on WhatsApp", d: "Send a list, get a total" },
            { icon: <ClockIcon />, t: "Open 7 days", d: `${site.hours[0].label} until ${fmtTime(site.hours[0].closes)}` },
            { icon: <StarIcon />, t: "Fresh & frozen", d: "Vegetables, fish, meat" },
          ].map((v) => (
            <li key={v.t} className="flex items-center gap-3 py-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-maroon text-gold">{v.icon}</span>
              <span>
                <span className="block text-sm font-semibold">{v.t}</span>
                <span className="block text-xs text-ink/60">{v.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* SHOP */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">The aisles</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Everything for the pot, the pantry and the home.</h2>
          </div>
          <Link href="/order" className="inline-flex items-center gap-2 font-semibold text-maroon hover:gap-3 transition-all">
            Build an order <ArrowIcon />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article
              key={c.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={c.image}
                  alt={`${c.name} at Adisah African Store`}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />
                <h3 className="absolute bottom-4 left-5 font-display text-2xl font-bold text-cream drop-shadow">{c.name}</h3>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm leading-relaxed text-ink/65">{c.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.items.slice(0, 5).map((i) => (
                    <li key={i} className="rounded-full bg-sand px-2.5 py-1 text-xs text-ink/80">
                      {i}
                    </li>
                  ))}
                </ul>
                <a
                  href={links.whatsapp(`Hello Adisah, do you have these in stock from ${c.name}? `)}
                  target="_blank"
                  rel="noopener"
                  data-track="whatsapp_click"
                  data-track-location={`category_${c.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-maroon"
                >
                  <WhatsAppIcon className="size-4" /> Ask about {c.name.toLowerCase()}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink/55">Can&apos;t see what you need? We stock far more in store. Just ask on WhatsApp.</p>
      </section>

      {/* HOW IT WORKS */}
      <section id="delivery" className="grain relative overflow-hidden bg-maroon text-cream">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Order now, we deliver</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Three steps from your list to your door.</h2>
            <p className="mt-5 max-w-md text-cream/70">
              No app, no account. Order the way you already talk to family. On WhatsApp.
            </p>
            <div className="mt-10">
              <p className="text-sm font-semibold text-gold">We deliver to</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.serviceArea.map((a) => (
                  <li key={a} className="rounded-full border border-cream/20 px-3 py-1 text-sm">
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-cream/50">Outside these areas? Message us and we&apos;ll let you know.</p>
            </div>
          </div>
          <ol className="space-y-4">
            {[
              { n: "01", t: "Build your list", d: "Pick items in our order builder, or type them straight into WhatsApp." },
              { n: "02", t: "We confirm your total", d: "We check stock, send the price and a delivery window." },
              { n: "03", t: "Delivered or ready for pickup", d: "Pay on delivery or at the store. Fresh, packed and on time." },
            ].map((s) => (
              <li key={s.n} className="flex gap-5 rounded-3xl border border-cream/10 bg-ink/25 p-6 backdrop-blur">
                <span className="font-display text-4xl font-black text-gold">{s.n}</span>
                <span>
                  <span className="block font-display text-xl font-bold">{s.t}</span>
                  <span className="mt-1 block text-sm text-cream/70">{s.d}</span>
                </span>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/order"
                data-track="order_builder_open"
                data-track-location="how_it_works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
              >
                Start your order <ArrowIcon />
              </Link>
            </li>
          </ol>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Visit the store</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Find us on Old Crain Hwy.</h2>
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-ember" />
                <address className="not-italic">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </address>
              </li>
              <li className="flex gap-4">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-ember" />
                <table className="text-sm">
                  <tbody>
                    {site.hours.map((h) => (
                      <tr key={h.label}>
                        <td className="pr-6 font-medium">{h.label}</td>
                        <td className="text-ink/70">
                          {fmtTime(h.opens)} – {fmtTime(h.closes)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
              <li className="flex gap-4">
                <PhoneIcon className="mt-0.5 size-5 shrink-0 text-ember" />
                <a href={links.call} data-track="call_click" data-track-location="visit" className="font-medium hover:text-maroon">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-4">
                <MailIcon className="mt-0.5 size-5 shrink-0 text-ember" />
                <a href={links.email} className="font-medium hover:text-maroon">
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={links.directions}
                target="_blank"
                rel="noopener"
                data-track="directions_click"
                data-track-location="visit"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-cream transition hover:bg-maroon"
              >
                <PinIcon /> Get directions
              </a>
              <a
                href={links.call}
                data-track="call_click"
                data-track-location="visit_button"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 font-semibold transition hover:border-maroon hover:text-maroon"
              >
                <PhoneIcon /> Call the store
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-sand shadow-xl">
            <iframe
              title={`Map to ${site.name}`}
              src={links.mapEmbed}
              className="h-[420px] w-full lg:h-full lg:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS CTA */}
      <section className="px-4 sm:px-6">
        <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center text-cream sm:px-16">
          <div className="flex justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="size-6" />
            ))}
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">Shopped with us? Tell your neighbours.</h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/65">A quick Google review helps more families find African groceries close to home.</p>
          <Link
            href="/reviews"
            data-track="review_click"
            data-track-location="home_cta"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5"
          >
            Leave a review <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered</h2>
        <div className="mt-10 divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sand text-maroon transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
