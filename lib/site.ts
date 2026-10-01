// Single source of truth for store details. Edit here, not in components.
// Items marked TODO are placeholders until the owner confirms them (see docs/discovery-questions.md).

export const site = {
  name: "Adisah African Store",
  shortName: "Adisah",
  tagline: "African groceries in Upper Marlboro, delivered to your door",
  description:
    "Adisah African Store in Upper Marlboro, MD stocks African food items, provisions, fresh vegetables, frozen fish, turkey, chicken and household goods. Order on WhatsApp for doorstep delivery or visit us on Old Crain Hwy.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://adisahafricanstore.com", // TODO: confirm domain
  email: "orders@adisahafricanstore.com", // Namecheap forwarding to the owner's Gmail
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
  image: string; // under /public
};

// Product examples are typical for a West African grocer. TODO: owner to confirm best sellers.
// Photos are stand-ins until the owner sends real store photos.
export const categories: Category[] = [
  {
    slug: "grains",
    name: "Grains & Flours",
    blurb: "Garri, semolina, poundo yam, rice, beans and the swallows you grew up on.",
    items: ["Garri (white / yellow)", "Poundo yam flour", "Semolina", "Long grain rice", "Ofada rice", "Beans (honey / oloyin)", "Fufu flour", "Couscous"],
    image: "/images/flyer-grains.webp",
  },
  {
    slug: "vegetables",
    name: "Fresh Vegetables",
    blurb: "Plantain, yam, scotch bonnet, bitter leaf, ugu and seasonal produce.",
    items: ["Plantain", "Yam tubers", "Scotch bonnet pepper", "Bitter leaf", "Ugu (pumpkin leaf)", "Okra", "Garden eggs", "Cocoyam"],
    image: "/images/flyer-vegetables.webp",
  },
  {
    slug: "oils-spices",
    name: "Oils & Spices",
    blurb: "Red palm oil, groundnut oil, crayfish, egusi, pepper soup spice and more.",
    items: ["Red palm oil", "Groundnut oil", "Ground crayfish", "Egusi", "Ogbono", "Pepper soup spice", "Suya spice", "Iru / locust beans"],
    image: "/images/flyer-palm-oil.webp",
  },
  {
    slug: "fish",
    name: "Fish & Seafood",
    blurb: "Titus, croaker, tilapia, stockfish, dried catfish and shrimp.",
    items: ["Titus (mackerel)", "Croaker", "Tilapia", "Stockfish", "Dried catfish", "Smoked fish", "Shrimp", "Panla (hake)"],
    image: "/images/fish.webp",
  },
  {
    slug: "poultry",
    name: "Poultry & Meat",
    blurb: "Whole chicken, turkey wings, goat meat, shaki and cow foot.",
    items: ["Whole chicken", "Chicken wings", "Turkey wings", "Turkey drumsticks", "Goat meat", "Beef", "Shaki (tripe)", "Cow foot"],
    image: "/images/poultry.webp",
  },
  {
    slug: "frozen",
    name: "Frozen Foods",
    blurb: "Frozen greens, okra, gizzards, snails and ready-to-cook favourites.",
    items: ["Frozen okra", "Frozen ugu & greens", "Frozen mixed vegetables", "Frozen gizzards", "Frozen snails", "Frozen peeled yam", "Frozen cassava leaves", "Frozen fufu"],
    image: "/images/frozen.webp",
  },
  {
    slug: "provisions",
    name: "Provisions & Pantry",
    blurb: "Golden Penny pasta, noodles, seasoning cubes, tomato paste and tins.",
    items: ["Golden Penny spaghetti", "Indomie noodles", "Maggi / Knorr cubes", "Tomato paste", "Custard", "Sardines & tinned fish", "Corned beef", "Cornflakes & oats"],
    image: "/images/flyer-essentials.webp",
  },
  {
    slug: "drinks",
    name: "Drinks",
    blurb: "Malt drinks, Milo, Peak milk, zobo, juices and soft drinks.",
    items: ["Malt drinks", "Milo", "Peak milk", "Zobo (hibiscus)", "Ginger drink", "Fruit juices", "Soft drinks", "Bottled water"],
    image: "/images/drinks.webp",
  },
  {
    slug: "household",
    name: "Household Essentials",
    blurb: "Soaps, cleaning supplies, black soap, shea butter and everyday home items.",
    items: ["African black soap", "Shea butter", "Detergent", "Sponges", "Tissue & paper towels", "Mortar & pestle", "Toiletries", "Cooking pots"],
    image: "/images/household.webp",
  },
];
