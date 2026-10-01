import { site, fullAddress, categories } from "@/lib/site";

// schema.org GroceryStore markup so Google can tie the site to the Business Profile.
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "@id": `${site.url}/#store`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    priceRange: "$",
    servesCuisine: ["Nigerian", "Ghanaian", "West African"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "African groceries",
      itemListElement: categories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        itemListElement: c.items.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: i } })),
      })),
    },
    potentialAction: {
      "@type": "OrderAction",
      target: `https://wa.me/${site.whatsapp}`,
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet", "http://purl.org/goodrelations/v1#DeliveryModePickUp"],
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
