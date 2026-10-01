import type { Metadata } from "next";
import QRCode from "qrcode";
import { site } from "@/lib/site";
import { KenteBand, StarIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Leave a Google Review",
  description: "Enjoyed shopping at Adisah African Store in Upper Marlboro? Leave us a quick Google review.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const reviewLink = `${site.url}/review`;
  const qr = await QRCode.toString(reviewLink, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "H",
    color: { dark: "#140c0a", light: "#ffffff" },
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="no-print text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Reviews</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Loved your shop? Tell Google.</h1>
        <p className="mx-auto mt-4 max-w-lg text-ink/65">It takes 30 seconds and helps other families find African groceries nearby.</p>
        <a
          href="/review"
          target="_blank"
          rel="noopener"
          data-track="review_click"
          data-track-location="reviews_page"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-ink transition hover:-translate-y-0.5"
        >
          <StarIcon /> Write a Google review
        </a>
        {!site.googleReviewUrl && process.env.NODE_ENV !== "production" && (
          <p className="mx-auto mt-4 max-w-md rounded-2xl bg-sand p-3 text-xs text-ink/60">
            Setup note: set NEXT_PUBLIC_GOOGLE_REVIEW_URL once the Google Business Profile is verified. Until then this opens the Maps listing.
          </p>
        )}
      </div>

      {/* Printable counter card */}
      <div className="mx-auto mt-16 max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-ink/10 print:mt-0 print:shadow-none">
        <div className="flex justify-center bg-ink px-6 py-6 text-cream">
          <Logo variant="full" className="w-36" />
        </div>
        <KenteBand className="h-2 w-full" />
        <div className="px-8 pb-8 pt-7 text-center">
          <div className="flex justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="size-6" />
            ))}
          </div>
          <p className="mt-3 font-display text-2xl font-bold leading-tight">Scan to review us on Google</p>
          <div className="mx-auto mt-5 w-56" dangerouslySetInnerHTML={{ __html: qr }} />
          <p className="mt-4 text-sm text-ink/60">Point your phone camera at the code</p>
          <p className="mt-1 text-xs font-medium text-maroon">Thank you for shopping with us!</p>
        </div>
      </div>

      <div className="no-print mt-8 text-center">
        <PrintButton />
        <p className="mt-2 text-xs text-ink/50">Print on card stock for the counter, the door, and delivery bags.</p>
      </div>
    </section>
  );
}
