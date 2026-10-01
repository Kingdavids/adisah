import { NextResponse } from "next/server";
import { fullAddress, site } from "@/lib/site";

// Printed QR codes point here, not straight at Google, so the code never needs reprinting
// if the review link changes. Falls back to the Maps listing until the GBP review link is set.
export function GET() {
  const target =
    site.googleReviewUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`;
  return NextResponse.redirect(target, 307);
}
