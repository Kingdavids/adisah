// Single source of truth for store details. Edit here, not in components.
// Items marked TODO are placeholders until the owner confirms them (see docs/discovery-questions.md).

export const site = {
  name: "Adisah African Store",
  shortName: "Adisah",
  tagline: "African groceries in Upper Marlboro, delivered to your door",
  description:
    "Adisah African Store in Upper Marlboro, MD stocks African food items, provisions, fresh vegetables, frozen fish, turkey, chicken and household goods. Order on WhatsApp for doorstep delivery or visit us on Old Crain Hwy.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://adisahafricanstore.com", // TODO: confirm domain
  email: "adisah@gmail.com",
  phoneDisplay: "+1 (301) 543-7933",
  phoneE164: "+13015437933",
  whatsapp: "13015437933",
  address: {
    street: "5436 Old Crain Hwy",
    city: "Upper Marlboro",
    region: "MD",
    postalCode: "20772",
    country: "US",
  },
  // TODO: replace with exact coordinates from the verified Google Business Profile pin
  geo: { lat: 38.8157, lng: -76.7497 },
  // Confirmed by owner 2026-10-01. 24h format for schema.org, label for display.
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], label: "Mon – Sat", opens: "09:00", closes: "20:00" },
    { days: ["Sunday"], label: "Sunday", opens: "14:00", closes: "20:00" },
  ],
  serviceArea: ["Upper Marlboro", "Bowie", "Largo", "Clinton", "Forestville", "District Heights", "Capitol Heights", "Mitchellville", "Waldorf", "Washington, DC"], // TODO: confirm delivery radius
  googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "", // set after GBP is verified
  social: {
    facebook: "", // TODO
    instagram: "", // TODO
  },
};

// "09:00" -> "9am", "20:30" -> "8:30pm"
export function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""}${suffix}`;
}

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const links = {
  call: `tel:${site.phoneE164}`,
  whatsapp: (text?: string) =>
    `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(`${site.name}, ${fullAddress}`)}&output=embed`,
  email: `mailto:${site.email}`,
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  items: string[];
  tone: string; // tailwind gradient classes
};

// Product examples are typical for a West African grocer. TODO: owner to confirm best sellers.
export const categories: Category[] = [
  {
    slug: "grains",
    name: "Grains & Flours",
    blurb: "Garri, semolina, poundo yam, rice and the swallows you grew up on.",
    items: ["Garri (white / yellow)", "Poundo yam flour", "Semolina", "Long grain rice", "Ofada rice", "Beans (honey / oloyin)", "Fufu flour", "Couscous"],
    tone: "from-amber-300 to-orange-500",
  },
  {
    slug: "provisions",
    name: "Provisions & Pantry",
    blurb: "Golden Penny pasta, noodles, seasoning cubes, tomato paste, tins and drinks.",
    items: ["Golden Penny spaghetti", "Indomie noodles", "Maggi / Knorr cubes", "Tomato paste", "Milo", "Peak milk", "Custard", "Malt drinks"],
    tone: "from-yellow-300 to-amber-500",
  },
  {
    slug: "oils-spices",
    name: "Oils & Spices",
    blurb: "Red palm oil, groundnut oil, crayfish, ogiri, pepper soup spice and more.",
    items: ["Red palm oil", "Groundnut oil", "Ground crayfish", "Egusi", "Ogbono", "Pepper soup spice", "Suya spice", "Iru / locust beans"],
    tone: "from-red-400 to-rose-700",
  },
  {
    slug: "frozen",
    name: "Frozen Fish & Meat",
    blurb: "Titus, croaker, stockfish, turkey wings, chicken and goat meat.",
    items: ["Titus (mackerel)", "Croaker", "Stockfish", "Dried catfish", "Turkey wings", "Whole chicken", "Goat meat", "Shaki / cow foot"],
    tone: "from-sky-300 to-blue-600",
  },
  {
    slug: "vegetables",
    name: "Fresh Vegetables",
    blurb: "Plantain, yam, scotch bonnet, bitter leaf, ugu and seasonal produce.",
    items: ["Plantain", "Yam tubers", "Scotch bonnet pepper", "Bitter leaf", "Ugu (pumpkin leaf)", "Okra", "Garden eggs", "Cocoyam"],
    tone: "from-lime-300 to-emerald-600",
  },
  {
    slug: "household",
    name: "Household Essentials",
    blurb: "Soaps, cleaning supplies, black soap, shea butter and everyday home items.",
    items: ["African black soap", "Shea butter", "Detergent", "Sponges", "Cooking pots", "Mortar & pestle", "Toiletries", "Kitchen towels"],
    tone: "from-fuchsia-300 to-purple-600",
  },
];
