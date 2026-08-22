export const business = {
  name: "Ironmark Exteriors",
  tagline: "Exterior Solutions You Can Trust",
  phone: "+1 647-951-2786",
  phoneHref: "tel:+16479512786",
  email: "Info@ironmarkexteriors.ca",
  address: "144 Pottruff Road N",
  city: "Hamilton, ON",
  postalAddress: {
    streetAddress: "144 Pottruff Road N",
    addressLocality: "Hamilton",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  website: "ironmarkexteriors.ca",
  siteUrl: "https://ironmarkexteriors.ca",
  googleBusinessProfileUrl: "https://maps.app.goo.gl/gETYPuHSJHCMxFMy6",
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "roofing",
    name: "Roofing",
    shortDescription: "Durable roof installations and repairs built to withstand the elements.",
    description:
      "From full roof replacements to targeted repairs, Ironmark Exteriors installs and maintains roofing systems that protect your home year-round. We work with premium shingles and flashing materials, backed by workmanship you can rely on.",
    bullets: [
      "Full roof replacements & new installations",
      "Leak detection and repair",
      "Shingle, flashing & ventilation upgrades",
      "Storm and wind damage repair",
      "Free roof inspections & estimates",
    ],
  },
  {
    slug: "siding",
    name: "Siding",
    shortDescription: "Modern, weather-resistant siding that boosts curb appeal and protection.",
    description:
      "Ironmark Exteriors installs high-quality vinyl and composite siding designed to hold up against Southern Ontario weather while giving your home a fresh, modern look. We handle everything from full re-siding projects to repairs and panel replacement.",
    bullets: [
      "Vinyl & composite siding installation",
      "Siding repair & panel replacement",
      "Insulated siding upgrades",
      "Color & style consultation",
      "Full exterior transformations",
    ],
  },
  {
    slug: "gutters",
    name: "Gutter Cleaning",
    shortDescription: "Gutter cleaning starting at $99 for 1-storey homes, $199 for 2-storey homes.",
    description:
      "Properly functioning gutters are essential to protecting your foundation, siding, and landscaping. We install and repair seamless eavestrough systems, gutter guards, and downspouts built to handle heavy rain and snowmelt.",
    bullets: [
      "Seamless eavestrough installation",
      "Gutter repair & resealing",
      "Gutter guard installation",
      "Downspout extensions",
      "Gutter cleaning & maintenance",
    ],
  },
  {
    slug: "windows",
    name: "Window Cleaning",
    shortDescription: "Interior & exterior window cleaning starting at $149.",
    description:
      "Upgrade your home's comfort and efficiency with new window installations from Ironmark Exteriors. We supply and install energy-efficient windows that reduce drafts, lower energy bills, and enhance your home's appearance.",
    bullets: [
      "Full window replacement",
      "Energy-efficient window upgrades",
      "Window trim & flashing repair",
      "Custom sizing for any opening",
      "Free in-home consultations",
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    shortDescription: "Professional exterior painting for a lasting, refreshed finish.",
    description:
      "A fresh coat of exterior paint protects your siding, trim, and fascia while giving your home an instant refresh. Our crews prep, prime, and paint with premium exterior-grade coatings built to last through the seasons.",
    bullets: [
      "Exterior house painting",
      "Trim, fascia & soffit painting",
      "Surface prep & priming",
      "Color consultation",
      "Deck & fence staining",
    ],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    shortDescription: "Driveways, patios & walkways starting from $149.",
    description:
      "Dirt, grime, mold, and algae build up on siding, driveways, and walkways over time. Our pressure washing service safely restores exterior surfaces, prepping them for paint or simply refreshing your home's overall look.",
    bullets: [
      "House & siding washing",
      "Driveway & walkway cleaning",
      "Deck & fence washing",
      "Gutter exterior cleaning",
      "Pre-paint surface preparation",
    ],
  },
];

export type ServiceArea = {
  slug: string;
  name: string;
  province: string;
  blurb: string;
  neighbourhoods: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "hamilton",
    name: "Hamilton",
    province: "ON",
    blurb:
      "As a Hamilton-based company, Ironmark Exteriors proudly serves homeowners throughout Hamilton with roofing, siding, gutters, windows, painting, and pressure washing services.",
    neighbourhoods: ["Westdale", "Kirkendall", "Crown Point", "Waterdown"],
  },
  {
    slug: "stoney-creek",
    name: "Stoney Creek",
    province: "ON",
    blurb:
      "We provide reliable exterior renovation and repair services to homeowners in Stoney Creek, from roof replacements to full siding upgrades.",
    neighbourhoods: ["Fifty Point", "Winona", "Community Beach"],
  },
  {
    slug: "burlington",
    name: "Burlington",
    province: "ON",
    blurb:
      "Ironmark Exteriors brings quality craftsmanship to Burlington homes, helping protect and refresh exteriors with expert roofing, siding, and gutter work.",
    neighbourhoods: ["Aldershot", "Millcroft", "Roseland"],
  },
  {
    slug: "ancaster",
    name: "Ancaster",
    province: "ON",
    blurb:
      "Homeowners in Ancaster trust Ironmark Exteriors for durable, well-installed roofing, siding, windows, and gutter systems built for the long term.",
    neighbourhoods: ["Ancaster Village", "Meadowlands", "Parkview Heights"],
  },
  {
    slug: "dundas",
    name: "Dundas",
    province: "ON",
    blurb:
      "From historic homes to new builds, Ironmark Exteriors delivers dependable exterior services to homeowners across Dundas and the surrounding area.",
    neighbourhoods: ["Old Dundas", "Pleasant Valley", "Governor's Road area"],
  },
  {
    slug: "brantford",
    name: "Brantford",
    province: "ON",
    blurb:
      "Ironmark Exteriors provides trusted roofing, siding, gutter, and exterior renovation services to homeowners throughout Brantford.",
    neighbourhoods: ["Eagle Place", "West Brant", "Holmedale"],
  },
  {
    slug: "grimsby",
    name: "Grimsby",
    province: "ON",
    blurb:
      "Homeowners across Grimsby rely on Ironmark Exteriors for quality roofing, siding, gutter, and exterior maintenance services.",
    neighbourhoods: ["Grimsby on the Lake", "Casablanca", "Downtown Grimsby"],
  },
  {
    slug: "st-catharines",
    name: "St. Catharines",
    province: "ON",
    blurb:
      "Ironmark Exteriors serves St. Catharines homeowners with dependable roofing, siding, gutter, and exterior renovation work.",
    neighbourhoods: ["Port Dalhousie", "Western Hill", "Old Towne"],
  },
  {
    slug: "niagara-falls",
    name: "Niagara Falls",
    province: "ON",
    blurb:
      "From roofing to gutter maintenance, Ironmark Exteriors helps homeowners across Niagara Falls protect and maintain their homes' exteriors.",
    neighbourhoods: ["Chippawa", "Fallsview", "Stamford"],
  },
];

export const serviceAreaNames = serviceAreas.map((a) => a.name).join(", ");

// Cities where the $99/$199 Gutter Cleaning promotion is specifically
// marketed and given its own dedicated landing page for local SEO.
export const gutterCleaningAreaSlugs = [
  "hamilton",
  "burlington",
  "brantford",
  "stoney-creek",
  "grimsby",
  "st-catharines",
  "niagara-falls",
] as const;

export const gutterCleaningPricing = {
  oneStorey: 99,
  twoStorey: 199,
};

// Cities where the Window Cleaning promotion is specifically marketed and
// given its own dedicated landing page for local SEO. Same coverage as
// gutter cleaning.
export const windowCleaningAreaSlugs = gutterCleaningAreaSlugs;

export const windowCleaningPricing = {
  oneStorey: 149,
  twoStorey: 249,
};

// Cities where the Pressure Washing promotion is specifically marketed and
// given its own dedicated landing page for local SEO. Same coverage as
// gutter and window cleaning.
export const pressureWashingAreaSlugs = gutterCleaningAreaSlugs;

export const pressureWashingPricing = {
  startingFrom: 149,
};

export type Offer = {
  slug: string;
  title: string;
  badge: string;
  priceLabel: string;
  description: string;
  href: string;
};

// Shown in the homepage Offers section. Add new promotions here as they
// come up, each gets its own card automatically.
export const offers: Offer[] = [
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    badge: "Limited-Time Offer",
    priceLabel: `Starting at $${gutterCleaningPricing.oneStorey}`,
    description: `1 storey homes from $${gutterCleaningPricing.oneStorey}, 2 storey homes from $${gutterCleaningPricing.twoStorey}. Licensed & insured.`,
    href: "/services/gutters",
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    badge: "Limited-Time Offer",
    priceLabel: `Starting at $${windowCleaningPricing.oneStorey}`,
    description: `Interior & exterior. 1 storey homes from $${windowCleaningPricing.oneStorey}, 2 storey homes from $${windowCleaningPricing.twoStorey}.`,
    href: "/services/windows",
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    badge: "Limited-Time Offer",
    priceLabel: `Starting from $${pressureWashingPricing.startingFrom}`,
    description: "Driveways, patios, walkways & more. Pricing varies by surface size and condition.",
    href: "/services/pressure-washing",
  },
];

