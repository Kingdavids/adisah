import Link from "next/link";
import { fmtTime, fullAddress, links, site } from "@/lib/site";
import { Logo } from "./logo";
import { KenteBand } from "./icons";

export function SiteFooter() {
  return (
    <footer className="no-print bg-ink text-cream/70">
      <KenteBand className="h-1.5 w-full" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-cream">
            <Logo variant="full" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            African groceries, provisions, frozen foods and household goods in Upper Marlboro, Maryland. Delivery across Prince
            George&apos;s County.
          </p>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-cream">Visit</h3>
          <address className="not-italic leading-relaxed">
            <a href={links.directions} target="_blank" rel="noopener" data-track="directions_click" data-track-location="footer" className="hover:text-gold">
              {fullAddress}
            </a>
          </address>
          <ul className="mt-3 space-y-1">
            {site.hours.map((h) => (
              <li key={h.label}>
                {h.label}: {fmtTime(h.opens)} – {fmtTime(h.closes)}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-cream">Contact</h3>
          <ul className="space-y-2">
            <li>
              <a href={links.call} data-track="call_click" data-track-location="footer" className="hover:text-gold">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={links.whatsapp()} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="footer" className="hover:text-gold">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={links.email} className="hover:text-gold">
                {site.email}
              </a>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-gold">
                Leave a Google review
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
