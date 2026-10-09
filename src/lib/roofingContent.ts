import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /roofing/[area] pages. Same
 * pattern as the siding-repair content lib: hand-written per-city intro,
 * quick-answer, and local-conditions text, plus pooled content for
 * problems, cost factors, materials, and FAQs that gets rotated and
 * partially selected by city index, combined with a 3-way structural
 * archetype, so the 9 pages are genuinely different rather than the same
 * template with the city name swapped.
 */

export type RoofingCityContent = {
  intro: string;
  quickAnswer: string;
  localConditions: string[];
};

export const roofingCityContent: Record<string, RoofingCityContent> = {
  hamilton: {
    intro:
      "Hamilton's mix of century homes and newer builds means roofing calls here range from a handful of storm-damaged shingles to a full tear-off on a roof that's reached the end of its service life.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Hamilton, Ontario. We fix leaks, missing or damaged shingles, and flashing failures, and handle full roof replacements when a roof is beyond repair. Free on-site inspections and estimates are available throughout Hamilton.",
    localConditions: [
      "Older homes around Westdale and Kirkendall often have roofs original to a past renovation, where flashing around chimneys and vents is usually the first thing to fail, well before the shingles themselves are due.",
      "Hamilton's freeze-thaw winters put real stress on roofs with poor attic ventilation, ice can back up under shingles near the eaves and work its way into the roof deck if it isn't addressed.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside wind exposure means roofs here take more direct wind load than homes further inland, which shows up as lifted or missing shingles after a storm more often than in sheltered neighbourhoods.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Stoney Creek, Ontario. We address wind-lifted or missing shingles, leaks, and flashing issues, with particular attention to wind exposure near the lake. Free on-site inspections and estimates are available throughout Stoney Creek.",
    localConditions: [
      "Homes near Fifty Point and Community Beach take direct wind off Lake Ontario, and shingles that weren't properly sealed or fastened can lift or blow off entirely during a strong storm.",
      "Properties with heavier tree cover around Winona also deal with debris buildup in valleys and around vents, which can trap moisture and accelerate wear on the roofing material underneath.",
    ],
  },
  burlington: {
    intro:
      "Burlington's range of established and newer neighbourhoods means roofing work spans everything from full replacements on aging original roofs to targeted repairs after a storm.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Burlington, Ontario. We repair leaks, damaged or missing shingles, and flashing issues, and handle full replacements when a roof's condition calls for it. Free on-site inspections and estimates are available throughout Burlington.",
    localConditions: [
      "Older homes near Roseland often have original roofing nearing or past its expected lifespan, where granule loss and curling shingles are common signs it's time for a full assessment.",
      "In newer areas like Millcroft and Aldershot, roofing issues are usually isolated, a section damaged by a fallen branch or a flashing leak around a vent, which we can typically repair without a full replacement.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger homes often mean more roof surface area and more architectural detail, valleys, dormers, multiple roof planes, which means more flashing points that can fail before the shingles themselves wear out.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Ancaster, Ontario, with particular attention to the flashing and valley details common on larger, more detailed rooflines. Free on-site inspections and estimates are available throughout Ancaster.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often have more complex rooflines with multiple valleys and dormers, each one a potential leak point if flashing wasn't installed or maintained correctly.",
      "Mature tree cover throughout the area adds shade and debris buildup in valleys, which can trap moisture against the roofing material longer than on a more open, sun-exposed roof.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and roofing work here often means working around older roof decking and non-standard rooflines.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Dundas, Ontario, including older character homes with non-standard rooflines. Free on-site inspections and estimates are available throughout Dundas.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley often have older roof decking underneath the shingles, which we check carefully during any repair or replacement since it affects what the new roofing can be fastened to.",
      "The valley's reduced airflow and extra shade mean moss and algae growth is more common here than in more open, sun-exposed parts of our service area, worth addressing before it damages the shingles underneath.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a good share of our roofing work is full replacements on roofs that have simply reached the end of their service life.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Brantford, Ontario. Many of our calls here involve roofs nearing or past their expected lifespan. Free on-site inspections and estimates are available throughout Brantford.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with original roofing well past its expected lifespan, curling, cracking, or missing granules in multiple spots, where a full replacement is usually more cost-effective than chasing repairs.",
      "Proximity to the Grand River adds humidity through the warmer months, which can accelerate moss and algae growth on shaded roof sections if not addressed.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location put more wind load on roofs than almost anywhere else in our service area, which is the main reason we see lifted or missing shingles here.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Grimsby, Ontario. Wind exposure off the escarpment and lake is a common factor behind lifted or missing shingles here. Free on-site inspections and estimates are available throughout Grimsby.",
    localConditions: [
      "Wind coming off the escarpment and the lake puts repeated stress on shingles, particularly on homes nearer Grimsby on the Lake, which is often where a damaged section shows up first after a windy stretch.",
      "The area's orchards and mature trees also mean more organic debris and staining on roofs over time, something worth checking alongside any repair work.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have some of the longest-serving roofs in our service area, and canal humidity is worth factoring into any material decision for a replacement.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in St. Catharines, Ontario. Canal and lake humidity can accelerate wear on older roofing material here. Free on-site inspections and estimates are available throughout St. Catharines.",
    localConditions: [
      "Port Dalhousie and Western Hill have many established homes with original roofing, and a repair here often means confirming whether the surrounding shingles are still sound enough to not need touching beyond the damaged section.",
      "Canal and lake humidity means moss and algae growth tends to appear sooner here than it would further inland, part of why we check the full roof surface during any repair call.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, between the falls themselves and regional humidity, which is a factor worth understanding before any roofing work.",
    quickAnswer:
      "Ironmark Exteriors provides roof repair, replacement, and inspection services for homes in Niagara Falls, Ontario. Ambient humidity from the falls can accelerate moss growth and shingle wear here. Free on-site inspections and estimates are available throughout Niagara Falls.",
    localConditions: [
      "Mist from the falls settles well beyond the immediate tourist corridor, adding moisture exposure to roofs on homes throughout Chippawa and Stamford, not just those closest to the falls themselves.",
      "That extra humidity doesn't cause damage on its own, but it does mean moss, algae, and granule loss tend to show up sooner here than in a drier inland location.",
    ],
  },
};

export const roofingProblemsPool = [
  { title: "Missing or Damaged Shingles", key: "shingles", image: "/images/roofing/missing-shingles.jpg", text: "Wind, age, or impact can lift, crack, or remove shingles entirely, leaving the roof deck exposed underneath." },
  { title: "Roof Leaks", key: "leaks", image: "/images/roofing/roof-leaks.jpg", text: "Water finding its way in through a damaged section, failed flashing, or worn seams, often first noticed as a ceiling stain." },
  { title: "Flashing Failures", key: "flashing", image: "/images/roofing/flashing.jpg", text: "Flashing around chimneys, vents, and valleys is a common failure point, usually before the shingles themselves wear out." },
  { title: "Ice Damming", key: "ice", image: "/images/roofing/ice-damming.jpg", text: "Poor attic ventilation lets snow melt and refreeze at the eaves, backing water up under the shingles." },
  { title: "Sagging Roof Deck", key: "sagging", image: "/images/roofing/sagging-deck.jpg", text: "A visibly sagging section usually points to structural or moisture damage in the decking underneath." },
  { title: "Moss & Algae Growth", key: "moss", image: "/images/roofing/moss-algae.jpg", text: "Shaded, moisture-prone sections can develop moss or algae growth, which holds moisture against the shingles over time." },
  { title: "Poor Attic Ventilation", key: "ventilation", image: "/images/roofing/attic-ventilation.jpg", text: "Inadequate airflow can shorten shingle life and contribute to ice damming and higher energy bills." },
  { title: "Storm & Wind Damage", key: "storm", image: "/images/roofing/storm-damage.jpg", text: "Hail, fallen branches, and high wind can damage shingles across a section of roof, sometimes beyond what's visible from the ground." },
];

const costFactorPool = [
  { title: "Roof size & pitch", text: "A larger or steeper roof takes more material and labour time." },
  { title: "Extent of the damage", text: "A localized repair costs less than damage spread across multiple sections." },
  { title: "Material", text: "Standard and architectural shingles come at different price points." },
  { title: "Accessibility & height", text: "A steep or hard-to-access roof takes more time to work safely." },
  { title: "Existing layers", text: "Removing old shingle layers before a replacement adds to the scope." },
  { title: "Flashing & ventilation work", text: "Repairing or upgrading flashing and vents alongside the main job adds to the cost." },
];

const repairWhenPool = ["A localized leak or damaged section", "A handful of missing or lifted shingles", "An isolated flashing failure", "Storm damage to one area of the roof", "A roof still within its expected lifespan"];
const replaceWhenPool = ["Shingles curling, cracking, or missing granules broadly", "The roof is at or past its expected lifespan", "Repeated leaks in different areas", "Visible sagging in the roof deck", "Multiple layers of aging shingles already in place"];

export const roofingMaterials = [
  { title: "Asphalt Shingles", key: "asphalt", image: "/images/roofing/asphalt-shingles.jpg", text: "The standard roofing material for most homes in our service area, reliable and cost-effective." },
  { title: "Architectural Shingles", key: "architectural", image: "/images/roofing/architectural-shingles.jpg", text: "A heavier, dimensional shingle with a longer expected lifespan and a more textured look." },
  { title: "Flashing & Ventilation", key: "flashing", image: "/images/roofing/flashing-vents.jpg", text: "Proper flashing and attic ventilation are part of what keeps any roofing material performing long-term." },
];

const processVariants = [
  [
    { number: "01", title: "Inspection", text: "We assess the full roof, not just the area you flagged." },
    { number: "02", title: "Diagnose the Issue", text: "We identify what's actually failing and why." },
    { number: "03", title: "Repair or Replace", text: "We recommend the option that actually fits the roof's condition." },
    { number: "04", title: "Flashing & Ventilation Check", text: "We confirm these are sound before calling the job done." },
    { number: "05", title: "Final Walkthrough", text: "We review the finished work with you." },
  ],
  [
    { number: "01", title: "Free Inspection", text: "We walk the roof and check the attic for signs of trouble." },
    { number: "02", title: "Detailed Quote", text: "A clear, itemized quote before any work starts." },
    { number: "03", title: "Repair or Tear-Off", text: "Targeted repair, or full removal and replacement if needed." },
    { number: "04", title: "Install & Seal", text: "New material installed with proper flashing and sealing." },
    { number: "05", title: "Final Walkthrough", text: "We confirm everything looks right before wrapping up." },
  ],
];

export function roofingProcessSteps(index: number) {
  return pickByIndex(processVariants, index);
}

const faqPool = (areaName: string, neighbourhoods: string) => [
  {
    q: `How much does roof repair cost in ${areaName}?`,
    a: "It depends on the extent of the damage, the material, and accessibility. We give you an exact, itemized quote after an in-person inspection, never a flat number over the phone.",
  },
  {
    q: "How do I know if I need a repair or a full roof replacement?",
    a: "If the damage is localized, a section of missing shingles or a single flashing leak, repair usually makes sense. If shingles are failing broadly, the roof is at or past its expected lifespan, or you're seeing repeated leaks in different spots, replacement is typically the better long-term investment.",
  },
  {
    q: "How long does a roof replacement take?",
    a: "Most homes take one to a few days depending on size, pitch, and whether old layers need to be removed first.",
  },
  {
    q: "What causes ice damming in winter?",
    a: "Poor attic ventilation lets heat escape upward, melting snow on the roof that then refreezes at the colder eaves, backing water up under the shingles.",
  },
  {
    q: "Can a roof leak be repaired without replacing the whole roof?",
    a: "In most cases, yes. A leak is often tied to a specific area, flashing, a damaged shingle section, a vent boot, that can be repaired without touching the rest of the roof.",
  },
  {
    q: "Does home insurance cover storm damage to my roof?",
    a: "Many policies cover wind and hail damage, but coverage and deductibles vary. We can provide photos and a written assessment to support a claim, though you'll want to confirm coverage with your insurer directly.",
  },
  {
    q: "How often should I have my roof inspected?",
    a: "An annual inspection, or one after any major storm, helps catch small issues like a lifted shingle or failing flashing before they turn into a leak.",
  },
  {
    q: "What's the difference between standard and architectural shingles?",
    a: "Architectural shingles are heavier, more dimensional, and typically have a longer expected lifespan than standard three-tab shingles, at a higher material cost.",
  },
  {
    q: "Is Ironmark Exteriors licensed and insured?",
    a: "Yes. Ironmark Exteriors is licensed and insured for roofing work throughout our service area.",
  },
  {
    q: "Do you offer free roof inspections?",
    a: "Yes, we inspect your roof in person and walk you through what we find before recommending a repair or replacement.",
  },
  {
    q: "What are signs my roof needs attention?",
    a: "Missing or curling shingles, granules collecting in the gutters, daylight visible through the attic boards, and water stains on ceilings are all worth having assessed.",
  },
  {
    q: `What areas of ${areaName} do you service for roofing?`,
    a: `We service roofing throughout ${areaName}, including ${neighbourhoods} and the rest of the city.`,
  },
];

export type RoofingArchetype = 0 | 1 | 2;

export function getArchetype(index: number): RoofingArchetype {
  return (index % 3) as RoofingArchetype;
}

function rotate<T>(pool: T[], index: number, count: number): T[] {
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function roofingFaqs(area: ServiceArea, index: number, count = 8) {
  return rotate(faqPool(area.name, neighbourhoodLine(area)), index, count);
}

export function roofingProblemCards(index: number, count = 6) {
  return rotate(roofingProblemsPool, index, count);
}

export function roofingCostFactors(index: number, count = 5) {
  return rotate(costFactorPool, index, count);
}

export function roofingRepairWhen(index: number, count = 4) {
  return rotate(repairWhenPool, index, count);
}

export function roofingReplaceWhen(index: number, count = 4) {
  return rotate(replaceWhenPool, index, count);
}

export function roofingIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our roofing work in ${area.name} covers everything from targeted repairs to full replacements.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, call us when roof problems show up, whether that's a leak, storm damage, or a roof reaching the end of its life.`,
  ];
  return pickByIndex(variants, index);
}
