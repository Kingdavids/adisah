import Link from "next/link";
import { links, site } from "@/lib/site";
import { Logo } from "./logo";
import { PhoneIcon, WhatsAppIcon } from "./icons";

const nav = [
  { href: "/#shop", label: "Shop" },
  { href: "/order", label: "Order" },
  { href: "/#delivery", label: "Delivery" },
  { href: "/#visit", label: "Visit" },
  { href: "/reviews", label: "Reviews" },
];

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 text-cream backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-cream/75 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-gold">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={links.call}
            data-track="call_click"
            data-track-location="header"
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-gold hover:text-gold lg:inline-flex"
          >
            <PhoneIcon className="size-4" /> {site.phoneDisplay}
          </a>
          <a
            href={links.whatsapp("Hello Adisah African Store, I'd like to place an order.")}
            target="_blank"
            rel="noopener"
            data-track="whatsapp_click"
            data-track-location="header"
            className="inline-flex items-center gap-2 rounded-full bg-wa px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            <WhatsAppIcon className="size-4" /> <span className="hidden sm:inline">Order on</span> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
