import { links } from "@/lib/site";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

// Thumb-reach actions pinned to the bottom of phones.
export function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold";
  return (
    <nav
      aria-label="Quick actions"
      className="no-print fixed inset-x-0 bottom-0 z-50 flex border-t border-white/10 bg-ink/95 text-cream backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={links.call} data-track="call_click" data-track-location="mobile_bar" className={item}>
        <PhoneIcon /> Call
      </a>
      <a
        href={links.whatsapp("Hello Adisah African Store, I'd like to place an order.")}
        target="_blank"
        rel="noopener"
        data-track="whatsapp_click"
        data-track-location="mobile_bar"
        className={`${item} bg-wa text-ink`}
      >
        <WhatsAppIcon /> WhatsApp
      </a>
      <a href={links.directions} target="_blank" rel="noopener" data-track="directions_click" data-track-location="mobile_bar" className={item}>
        <PinIcon /> Directions
      </a>
    </nav>
  );
}
