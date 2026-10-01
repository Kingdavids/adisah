import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Analytics } from "@/components/analytics";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActionBar } from "@/components/mobile-action-bar";

const display = Baloo_2({ subsets: ["latin"], variable: "--font-baloo", display: "swap" });
const sans = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Adisah African Store | African Grocery in Upper Marlboro, MD",
    template: "%s | Adisah African Store",
  },
  description: site.description,
  keywords: [
    "African store Upper Marlboro",
    "African grocery store near me",
    "Nigerian food store Maryland",
    "African market Prince George's County",
    "palm oil Upper Marlboro",
    "garri poundo yam Maryland",
    "stockfish Maryland",
    "African grocery delivery Maryland",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Adisah African Store | Upper Marlboro, MD",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Search Console: paste the HTML-tag verification code into this env var
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#140c0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans pb-20 md:pb-0">
        <LocalBusinessJsonLd />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <Analytics />
      </body>
    </html>
  );
}
