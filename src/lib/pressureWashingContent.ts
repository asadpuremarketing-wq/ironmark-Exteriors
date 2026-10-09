import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /pressure-washing/[area]
 * pages. Same pattern as windowCleaningContent.ts: hand-written per-city
 * intro/quick-answer/local-conditions, plus pooled content that rotates
 * and partially selects by city index, combined with a 3-way structural
 * archetype.
 */

export type PressureWashingCityContent = {
  intro: string;
  quickAnswer: string;
  localConditions: string[];
};

export const pressureWashingCityContent: Record<string, PressureWashingCityContent> = {
  hamilton: {
    intro:
      "Hamilton's mix of older concrete driveways and newer interlock means our crews adjust pressure and technique depending on the surface, not just run the same setting everywhere.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Hamilton, Ontario, starting from $149. Pressure and technique are adjusted by surface type to clean effectively without causing damage. Free quotes are available throughout Hamilton.",
    localConditions: [
      "Older concrete driveways around Westdale and Kirkendall often have years of built-up grime and oil staining that a standard garden hose never touches, which is usually the biggest visible difference after a proper pressure wash.",
      "Newer interlock driveways in areas like Waterdown need gentler technique to avoid disturbing the joint sand between pavers, something we account for automatically based on the surface.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside location means exterior surfaces here pick up more organic growth, algae and mildew, than homes further inland, especially on shaded or north-facing areas.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Stoney Creek, Ontario, starting from $149. Lake-area humidity can accelerate algae and mildew growth on exterior surfaces. Free quotes are available throughout Stoney Creek.",
    localConditions: [
      "Homes near Fifty Point and Community Beach deal with more humidity and organic growth on patios and siding than homes further from the water.",
      "Properties around Winona with heavier tree cover also see more algae and moss buildup on shaded walkways and decks, worth addressing before it becomes slippery.",
    ],
  },
  burlington: {
    intro:
      "Burlington's range of established and newer neighbourhoods means pressure washing jobs here vary from decades of built-up grime on older concrete to a quick seasonal refresh on newer interlock.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Burlington, Ontario, starting from $149. Free quotes are available throughout Burlington.",
    localConditions: [
      "Older driveways near Roseland often have oil staining and years of embedded grime that take a thorough clean to fully lift.",
      "In newer areas like Millcroft and Aldershot, a seasonal refresh on interlock and siding is usually enough to keep things looking sharp.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger properties often mean more total surface area, longer driveways, bigger patios, which is part of why we quote based on your actual property rather than a flat rate beyond the base price.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Ancaster, Ontario, starting from $149. Free quotes are available throughout Ancaster.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often have more total hardscaping, longer driveways and larger patios, which takes more time to clean thoroughly.",
      "Mature tree cover throughout the area also means more organic staining and debris on surfaces than on more open properties.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and older concrete and stone surfaces here often need a more thorough clean than a newer property.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Dundas, Ontario, starting from $149. Free quotes are available throughout Dundas.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley often have older stone or concrete surfaces with years of embedded grime, which a proper pressure wash lifts noticeably better than a hose.",
      "The valley's extra shade and moisture also mean more algae and moss growth on walkways and patios than in sunnier parts of our service area.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a lot of our pressure washing calls involve surfaces that haven't been professionally cleaned in years.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Brantford, Ontario, starting from $149. Free quotes are available throughout Brantford.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with driveways and siding that show years of built-up grime without regular cleaning.",
      "Proximity to the Grand River adds humidity through the warmer months, which can accelerate algae and mildew growth on shaded surfaces.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location mean exterior surfaces here take more wind-blown dust and organic buildup than in more sheltered inland neighbourhoods.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Grimsby, Ontario, starting from $149. Free quotes are available throughout Grimsby.",
    localConditions: [
      "Wind and moisture off the escarpment and the lake can accelerate algae and staining on surfaces, particularly near Grimsby on the Lake.",
      "The area's orchards also mean more organic debris and staining on driveways and patios seasonally.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have a lot of homes with surfaces due for a proper clean, and canal humidity is a factor worth considering for how often a refresh is needed.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in St. Catharines, Ontario, starting from $149. Free quotes are available throughout St. Catharines.",
    localConditions: [
      "Port Dalhousie and Western Hill have many established homes with surfaces that benefit from a thorough clean, especially driveways with years of accumulated grime.",
      "Canal and lake humidity means algae and mildew growth tends to appear sooner here than it would further inland.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, which affects how often exterior surfaces need a proper clean to stay looking their best.",
    quickAnswer:
      "Ironmark Exteriors provides pressure washing for driveways, patios, walkways, siding, and decks in Niagara Falls, Ontario, starting from $149. Free quotes are available throughout Niagara Falls.",
    localConditions: [
      "Mist from the falls settles well beyond the immediate tourist corridor, adding moisture exposure to surfaces on homes throughout Chippawa and Stamford.",
      "That extra humidity means algae and staining tend to show up sooner here than in a drier climate.",
    ],
  },
};

export const pressureWashingSurfacesPool = [
  { title: "Driveways & Walkways", key: "driveways", image: "/images/pressure-washing/driveways.jpg", text: "Years of grime and staining lifted from concrete, interlock, and stone surfaces." },
  { title: "Patios & Pool Decks", key: "patios", image: "/images/pressure-washing/patios.jpg", text: "A thorough clean that restores patios and pool decks without damaging the surface." },
  { title: "House & Siding Exteriors", key: "siding", image: "/images/pressure-washing/siding.jpg", text: "Dirt, algae, and grime washed from exterior siding safely and effectively." },
  { title: "Deck & Fence Washing", key: "deck-fence", image: "/images/pressure-washing/deck-fence.jpg", text: "Wood and composite decks and fences cleaned with the right pressure for the material." },
  { title: "Pre-Paint Surface Prep", key: "pre-paint", image: "/images/pressure-washing/pre-paint-prep.jpg", text: "A clean, properly prepped surface before any exterior paint job." },
];

const processVariants = [
  [
    { number: "01", title: "Free Quote", text: "We assess the surfaces and give you a clear price." },
    { number: "02", title: "Surface Assessment", text: "Pressure and technique adjusted for the material." },
    { number: "03", title: "Wash & Clean", text: "Grime, algae, and staining removed thoroughly." },
    { number: "04", title: "Final Check", text: "We review the finished work with you." },
  ],
  [
    { number: "01", title: "Book Your Visit", text: "Tell us what surfaces need attention." },
    { number: "02", title: "Pre-Treatment", text: "Stubborn stains and organic growth pre-treated where needed." },
    { number: "03", title: "Pressure Wash", text: "Each surface cleaned with the right pressure for the material." },
    { number: "04", title: "Walkthrough", text: "A final look to confirm everything's done right." },
  ],
];

export function pressureWashingProcessSteps(index: number) {
  return pickByIndex(processVariants, index);
}

const faqPool = (areaName: string, startingFrom: number) => [
  {
    q: `How much does pressure washing cost in ${areaName}?`,
    a: `Pressure washing in ${areaName} starts from $${startingFrom}. The final price depends on the size, condition, and type of surface being cleaned, contact us for a free quote.`,
  },
  {
    q: "What surfaces can you pressure wash?",
    a: "Driveways, patios, walkways, house siding, decks, and fences. If you're not sure whether a surface is a good fit, send us a photo and we'll let you know.",
  },
  {
    q: "Will pressure washing damage my driveway or patio?",
    a: "No. We adjust pressure and technique based on the surface material, concrete, interlock, wood, or siding all get treated differently to clean effectively without causing damage.",
  },
  {
    q: "How often should I pressure wash my property?",
    a: "Most homeowners in the area get driveways and patios washed once a year, typically in spring, with siding done every 1 to 2 years depending on shade and tree cover.",
  },
  {
    q: "Do I need to be home during the service?",
    a: "Not necessarily, as long as we have clear access to the areas being cleaned and a water source. We'll confirm the details when you book.",
  },
  {
    q: "Can pressure washing remove oil stains?",
    a: "In most cases we can significantly lighten oil staining on concrete, though very old, deeply set stains may not come out completely.",
  },
  {
    q: "Is Ironmark Exteriors licensed and insured?",
    a: "Yes. Ironmark Exteriors is licensed and insured, and every pressure washing job is completed by trained crews.",
  },
  {
    q: "Can you pressure wash before I paint my house?",
    a: "Yes, a clean, properly prepped surface is an important first step before any exterior paint job, and we offer this as a standalone service as well.",
  },
];

export type PressureWashingArchetype = 0 | 1 | 2;

export function getArchetype(index: number): PressureWashingArchetype {
  return (index % 3) as PressureWashingArchetype;
}

function rotate<T>(pool: T[], index: number, count: number): T[] {
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function pressureWashingFaqs(area: ServiceArea, index: number, startingFrom: number, count = 7) {
  return rotate(faqPool(area.name, startingFrom), index, count);
}

export function pressureWashingSurfaces(index: number) {
  return rotate(pressureWashingSurfacesPool, index, pressureWashingSurfacesPool.length);
}

export function pressureWashingIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our pressure washing in ${area.name} covers driveways, patios, siding, and more.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, book us to restore driveways, patios, and exterior surfaces.`,
  ];
  return pickByIndex(variants, index);
}
