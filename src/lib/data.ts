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
    name: "Gutters",
    shortDescription: "Seamless gutter systems that keep water moving away from your home.",
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
    name: "Windows",
    shortDescription: "Energy-efficient window installation and replacement.",
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
    shortDescription: "Deep-clean exterior surfaces to restore your home's curb appeal.",
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
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "hamilton",
    name: "Hamilton",
    province: "ON",
    blurb:
      "As a Hamilton-based company, Ironmark Exteriors proudly serves homeowners throughout Hamilton with roofing, siding, gutters, windows, painting, and pressure washing services.",
  },
  {
    slug: "stoney-creek",
    name: "Stoney Creek",
    province: "ON",
    blurb:
      "We provide reliable exterior renovation and repair services to homeowners in Stoney Creek, from roof replacements to full siding upgrades.",
  },
  {
    slug: "burlington",
    name: "Burlington",
    province: "ON",
    blurb:
      "Ironmark Exteriors brings quality craftsmanship to Burlington homes, helping protect and refresh exteriors with expert roofing, siding, and gutter work.",
  },
  {
    slug: "ancaster",
    name: "Ancaster",
    province: "ON",
    blurb:
      "Homeowners in Ancaster trust Ironmark Exteriors for durable, well-installed roofing, siding, windows, and gutter systems built for the long term.",
  },
  {
    slug: "dundas",
    name: "Dundas",
    province: "ON",
    blurb:
      "From historic homes to new builds, Ironmark Exteriors delivers dependable exterior services to homeowners across Dundas and the surrounding area.",
  },
];
