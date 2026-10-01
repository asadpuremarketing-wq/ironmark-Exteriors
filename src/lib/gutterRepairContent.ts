import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /gutter-repair/[area] pages.
 * Unlike the gutter cleaning pages (one shared template + content
 * rotation), these pages also vary in section order and visual layout
 * per city (see `getArchetype`), so the 9 pages aren't just re-skinned
 * copies of each other.
 */

export type GutterRepairCityContent = {
  intro: string;
  localConditions: string[];
};

// Hand-written per-city content, not rotated/templated, since it
// references each city's real geography and should read naturally.
export const gutterRepairCityContent: Record<string, GutterRepairCityContent> = {
  hamilton: {
    intro:
      "Hamilton's mix of century homes and newer builds means we see gutter problems from both ends of the spectrum, original eavestrough that's simply reached the end of its life, and newer installations that were never quite sized or sloped right.",
    localConditions: [
      "Older homes around Westdale and Kirkendall often still have the original gutter system, and after decades of freeze-thaw cycles, seams that were soldered or sealed years ago start separating. It's rarely an emergency, but it's worth catching before a heavy spring rain finds the gap.",
      "Newer neighbourhoods like Waterdown see a different problem: gutters installed slightly out of level, which leaves standing water in sections that never fully drain and accelerates corrosion from the inside out.",
    ],
  },
  "stoney-creek": {
    intro:
      "Being this close to Lake Ontario means Stoney Creek homes take more wind-driven stress on their gutter systems than homes further inland, which shows up as brackets working loose well before the gutters themselves wear out.",
    localConditions: [
      "Wind off the lake puts repeated stress on gutter hangers and brackets, especially on exposed sides of homes near Fifty Point and Community Beach. Loose brackets are an easy fix if caught early, but left alone they let the whole run start to sag.",
      "Properties with heavier tree cover around Winona also deal with branches and ice loading in winter, which can crack sections or pull fasteners out of the fascia board entirely.",
    ],
  },
  burlington: {
    intro:
      "Burlington's lakeside exposure and mix of established and newer neighbourhoods means gutter repair calls here range from decades-old soldered seams failing to newer systems that were never properly pitched.",
    localConditions: [
      "Homes in older, tree-lined areas near Roseland often have gutters original to the house, and the seams on these systems are usually the first thing to fail, small gaps that widen every winter until they're leaking steadily.",
      "In newer construction around Millcroft and Aldershot, the more common issue is installation quality: downspouts that were undersized for the roof area, or a run with a flat spot that never drains completely.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger, mature properties often mean longer gutter runs with more joints, and more joints means more places for a seam to eventually fail or a section to start sagging under its own weight.",
    localConditions: [
      "Homes around Ancaster Village and Meadowlands tend to be on larger lots with more roofline, which means more linear footage of gutter and more connection points. Each joint is a potential failure point over time, which is why we check every seam during a repair call, not just the obvious problem area.",
      "Mature tree canopy throughout the area also means heavier debris loads, and gutters that were never fitted with proper hangers for the extra weight are the ones we see pulling away from the fascia first.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of older, character homes in our service area, and those original gutter systems are exactly the ones most likely to need resealing or bracket repair rather than full replacement.",
    localConditions: [
      "Many homes in Old Dundas and Pleasant Valley have gutters that have been patched or repainted over the years. A system like this can usually be brought back to full working order with targeted seam and bracket repairs rather than tearing the whole thing out.",
      "The valley setting also means more shade and slower drying after rain, so any existing leak tends to cause longer-lasting moisture exposure on the fascia board underneath, worth addressing sooner rather than later.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means we do a fair amount of gutter repair on original or early-replacement systems that are showing their age at the seams and end caps.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with gutters that have been in place for 20-plus years. At that age, end caps and seams are usually the first components to fail, well before the gutter itself needs replacing.",
      "Proximity to the Grand River also means more humidity through the warmer months, which doesn't cause damage on its own but does make an existing small leak more noticeable sooner.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location puts homes here through more wind exposure than most of our service area, which is the main reason we get repair calls for sagging gutters and loose brackets.",
    localConditions: [
      "Wind coming off the escarpment and the lake puts real stress on gutter hangers, particularly on homes near Grimsby on the Lake. We often find brackets spaced too far apart for the conditions, an easy fix once identified.",
      "The area's orchards and mature trees also mean heavier seasonal debris, and gutters without enough support can start to visibly sag under that combined weight and wind load.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have some of the longest-serving gutter systems in our service area, and we see the full range of repair needs from minor reseals to bracket replacement.",
    localConditions: [
      "Port Dalhousie and Western Hill have a lot of established homes with gutters that have held up well structurally but need their seams resealed after years of expansion and contraction through the seasons.",
      "Humidity from the canal and the lake means a small leak here tends to show up as staining on the fascia or soffit faster than it would in a drier inland location, which is often how homeowners first notice there's a problem.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with a level of ambient moisture most of our service area doesn't, between the falls themselves and the region's humidity, which makes gutter seals and brackets work harder over time.",
    localConditions: [
      "The mist generated by the falls settles well beyond the immediate tourist area, adding extra moisture exposure to gutters and fascia on homes throughout Chippawa and Stamford, not just those closest to the falls.",
      "That extra moisture doesn't cause damage by itself, but it does mean an existing small gap or failed seal tends to show visible staining or drip marks sooner than in a drier climate, which is often the first sign something needs attention.",
    ],
  },
};

const problemsPool = [
  {
    title: "Sagging or Pulling Away From the Fascia",
    text: "Usually caused by failed or undersized brackets that can no longer support the weight of the gutter, especially after heavy rain or debris buildup.",
  },
  {
    title: "Leaking Seams & Joints",
    text: "Soldered or sealed joints break down over time with expansion and contraction through the seasons, letting water escape before it reaches the downspout.",
  },
  {
    title: "Improper Slope",
    text: "A gutter that doesn't pitch correctly toward the downspout leaves standing water, which accelerates corrosion and won't drain fully even when clear of debris.",
  },
  {
    title: "Damaged or Missing End Caps",
    text: "A cracked or missing end cap lets water spill out at the ends of a run instead of carrying it to the downspout, often damaging the fascia underneath.",
  },
  {
    title: "Detached or Misaligned Downspouts",
    text: "Downspouts knocked loose by ladders, debris, or ice can dump water right against the foundation instead of carrying it away from the house.",
  },
  {
    title: "Holes & Rust-Through",
    text: "Small punctures or rusted-through sections let water escape mid-run, usually from age, impact damage, or prolonged standing water.",
  },
  {
    title: "Loose or Failing Hangers",
    text: "Hangers spaced too far apart or pulled loose from the fascia board are one of the most common causes of a gutter visibly sagging between support points.",
  },
  {
    title: "Ice Damage From Winter",
    text: "Freeze-thaw cycles can crack seams, bend sections, and pull fasteners loose, damage that often isn't obvious until the spring thaw.",
  },
];

const signsPool = [
  "Visible gaps, sagging, or unevenness along the gutter run",
  "Water spilling over the sides instead of flowing through downspouts",
  "Staining or streaking on the siding or fascia below the gutter",
  "Pools of water near the foundation after rain",
  "Gutters pulling away from the roofline at one or more points",
  "Rust spots, small holes, or visible cracks in the gutter itself",
];

const processSteps = [
  {
    number: "01",
    title: "Inspection",
    text: "We examine the full gutter run, not just the spot you flagged, checking seams, brackets, slope, and downspouts for anything else worth addressing in the same visit.",
  },
  {
    number: "02",
    title: "Diagnosis",
    text: "We identify exactly what's failing and why, and give you a clear, honest answer on whether it's a repair or whether replacement actually makes more sense.",
  },
  {
    number: "03",
    title: "Repair",
    text: "Depending on the issue, this means resealing seams, replacing brackets or hangers, straightening or re-pitching sections, or swapping out damaged end caps and downspout components.",
  },
  {
    number: "04",
    title: "Flow Test",
    text: "We run water through the repaired section to confirm it drains properly end to end before considering the job done.",
  },
  {
    number: "05",
    title: "Cleanup",
    text: "Any removed materials and debris are hauled away, we don't leave old brackets or sealant scraps behind.",
  },
];

const faqPool = (areaName: string) => [
  {
    q: `How much does gutter repair cost in ${areaName}?`,
    a: "It depends entirely on what's wrong, a resealed seam is a much smaller job than replacing a section of damaged gutter or multiple brackets. We give you a clear, itemized quote after seeing the actual damage, never a guess over the phone.",
  },
  {
    q: "How do I know if I need a repair or a full gutter replacement?",
    a: "If the gutter material itself is sound and the problem is isolated, brackets, a seam, an end cap, repair almost always makes sense. If the gutters are old, rusted through in multiple spots, or the damage is widespread, replacement is usually the more cost-effective long-term choice. We'll give you an honest recommendation either way.",
  },
  {
    q: "Can a sagging gutter be fixed without replacing the whole run?",
    a: "In most cases, yes. Sagging is almost always a bracket or hanger problem, not a problem with the gutter material itself, and adding or replacing hangers usually solves it without needing to replace the gutter.",
  },
  {
    q: "How quickly do I need to get a leaking gutter repaired?",
    a: "Sooner rather than later. A leak that's dripping onto the fascia or foundation can lead to rot or water intrusion if it sits through a few heavy rains, so we recommend booking a repair as soon as you notice one, not waiting for it to get worse.",
  },
  {
    q: "Do you repair gutters on all types of homes?",
    a: "Yes, we work on aluminum, steel, and vinyl gutter systems on both older character homes and newer builds throughout our service area.",
  },
  {
    q: "Will you also clean the gutters while repairing them?",
    a: "If there's debris in the way of the repair, we clear it as part of the job. If you'd like a full gutter cleaning at the same time, just let us know when booking and we can combine both services in one visit.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every gutter repair is completed by trained, experienced crews.",
  },
  {
    q: "Do you offer a free assessment before quoting?",
    a: "Yes, we inspect the gutter in person before quoting a repair. Gutter problems can look similar from the ground but have very different causes, so an accurate quote requires actually seeing the damage up close.",
  },
  {
    q: "What causes most gutter damage in this area?",
    a: "Freeze-thaw cycles through the winter, wind stress, and simple age-related wear on seams and brackets are the most common causes we see on repair calls across our service area.",
  },
  {
    q: "Can ice damage be prevented?",
    a: "Keeping gutters clear of debris before winter reduces the amount of standing water that can freeze and expand, which is the main driver of ice-related gutter damage. A fall cleaning is the best prevention.",
  },
];

/**
 * Three distinct structural layouts (section order + visual style of the
 * Problems/Process/Signs sections), assigned by city index so the 9 pages
 * genuinely differ in layout, not just wording.
 */
export type GutterRepairArchetype = 0 | 1 | 2;

export function getArchetype(index: number): GutterRepairArchetype {
  return (index % 3) as GutterRepairArchetype;
}

export function gutterRepairFaqs(area: ServiceArea, index: number, count = 7) {
  const pool = faqPool(area.name);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function gutterRepairSigns(index: number) {
  const start = index % signsPool.length;
  return [...signsPool.slice(start), ...signsPool.slice(0, start)];
}

export function gutterRepairProblems(index: number, count = 6) {
  const start = index % problemsPool.length;
  const rotated = [...problemsPool.slice(start), ...problemsPool.slice(0, start)];
  return rotated.slice(0, count);
}

export { processSteps as gutterRepairProcessSteps };

export function gutterRepairIntroFallback(area: ServiceArea, index: number): string {
  // Used only if a city is ever added to serviceAreas without matching
  // hand-written content above.
  const variants = [
    `${area.blurb} Our gutter repair work in ${area.name} covers everything from a single loose bracket to a full section needing replacement.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, call us when a gutter problem shows up, whether that's a sag, a leak, or a downspout that's come loose.`,
  ];
  return pickByIndex(variants, index);
}
