import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /soffit-fascia-repair/[area]
 * pages. Same pattern as gutterRepairContent.ts: hand-written per-city
 * content plus a 3-way structural archetype so the 9 pages differ in both
 * wording and layout, not just city names swapped in.
 */

export type SoffitFasciaRepairCityContent = {
  intro: string;
  localConditions: string[];
};

export const soffitFasciaRepairCityContent: Record<string, SoffitFasciaRepairCityContent> = {
  hamilton: {
    intro:
      "Hamilton's older housing stock, especially around the lower city, means a lot of original wood fascia that's been painted over for decades, which hides rot until a gutter starts pulling away or a soffit panel feels soft underfoot on a ladder.",
    localConditions: [
      "Century homes around Westdale and Kirkendall often still have solid wood fascia board under layers of old paint. It holds up well until a gutter leak sits against it for a season or two, at which point the rot spreads faster than most homeowners expect.",
      "Newer builds in Waterdown tend to have aluminum-wrapped fascia, which rarely rots but can still dent or pull loose at the corners, leaving a gap that lets water and pests behind the gutter line.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside wind exposure puts extra stress on soffit panels, which is usually what we find loose or missing before we find any rot underneath.",
    localConditions: [
      "Homes near Fifty Point and Community Beach take enough wind off the lake that soffit panels can work loose at their clips over time, leaving gaps that let wasps and birds get into the eaves.",
      "Heavier tree cover around Winona also means more organic debris sitting against the fascia where gutters attach, which holds moisture against the board longer than open, unshaded roof lines.",
    ],
  },
  burlington: {
    intro:
      "Burlington's mix of established lakeside homes and newer subdivisions means fascia and soffit repair calls here range from genuine wood rot on older trim to vinyl soffit panels that were never fully clipped in during construction.",
    localConditions: [
      "Older homes near Roseland often have painted wood fascia that's due for inspection simply due to age, even without an obvious leak, since paint can hide early rot for years.",
      "In newer areas like Millcroft and Aldershot, we more often find soffit panels that were installed quickly and never fully seated, leaving small gaps that let in insects long before any structural damage shows.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger rooflines mean more linear footage of soffit and fascia overall, and with that comes more joints and corners where a gap or a rotted section is more likely to show up.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often have extensive soffit runs under wide eaves, and we find that ventilation gaps at the corners are the most common entry point for squirrels and birds looking for a way into the attic.",
      "Mature trees throughout the area also drop enough debris onto lower roof sections that fascia boards beneath them stay damp longer after rain, which is where we see rot developing first.",
    ],
  },
  dundas: {
    intro:
      "Dundas has a high concentration of character homes, and that means a lot of original wood soffit and fascia that's been repainted many times over the decades without ever being properly inspected underneath.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley frequently have wood fascia that looks fine from the ground but has soft spots once you get up close, especially directly behind where the gutter sits.",
      "The valley's shadier, slower-drying conditions also mean any existing gap in the soffit tends to stay damp longer after a storm, which speeds up rot in sections that would otherwise hold up fine in a sunnier spot.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older neighbourhoods near the Grand River have plenty of homes with original wood trim, and humidity off the river tends to accelerate rot in fascia boards that have gone unpainted or uninspected for a while.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have older homes where the fascia board hasn't been touched in 20-plus years, and that's usually where we find the most significant repairs needed, not catastrophic, but overdue.",
      "River humidity also means wood trim here tends to show early rot signs, like a soft edge or peeling paint along the bottom of the fascia, sooner than it would in a drier inland area.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside exposure put real wind load on soffit panels, and that's usually the first thing we find loose or missing on an inspection here, well before any rot in the fascia itself.",
    localConditions: [
      "Homes near Grimsby on the Lake take enough wind that soffit panels can rattle loose at the clips, and once one panel is gone, the open eave becomes an easy entry point for birds and insects.",
      "The area's orchards also mean more organic debris sitting in gutters and against fascia boards seasonally, which holds moisture against the trim longer than a cleaner roofline would.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have some of the most established trim in our service area, and canal humidity means wood fascia here tends to need attention sooner than drier parts of the region.",
    localConditions: [
      "Port Dalhousie and Western Hill have a lot of homes with original wood fascia that's held up structurally but is due for repainting or spot repair after years of expansion and contraction through the seasons.",
      "Canal and lake humidity also means a small gap in the soffit tends to show visible staining or insect activity faster than it would further inland, often how homeowners first notice there's an issue.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, which makes wood fascia and soffit joints work harder over time, even on homes well away from the immediate falls area.",
    localConditions: [
      "Mist from the falls settles well beyond the tourist core, adding extra moisture exposure to fascia boards and soffit seams on homes throughout Chippawa and Stamford.",
      "That extra humidity doesn't cause damage on its own, but it does mean an existing small gap or a spot of peeling paint tends to turn into visible rot sooner than in a drier climate, which is often the first sign something needs attention.",
    ],
  },
};

const problemsPool = [
  {
    title: "Rotted or Soft Fascia Board",
    text: "Years of moisture sitting against the board, often from a gutter leak above it, break down wood fascia until it's soft or crumbling to the touch, usually discovered when a gutter starts to sag.",
  },
  {
    title: "Soffit Panels Pulling Loose",
    text: "Wind, age, or a poor original installation can work soffit panels loose from their clips, leaving visible gaps along the underside of the eave.",
  },
  {
    title: "Pest & Rodent Entry Points",
    text: "Gaps in damaged soffit or fascia are one of the most common ways squirrels, birds, and wasps get into an attic, often before a homeowner notices any other sign of damage.",
  },
  {
    title: "Blocked or Painted-Over Ventilation",
    text: "Soffit vents clogged with debris or sealed shut by old paint stop fresh air from reaching the attic, which can contribute to moisture buildup and higher cooling costs.",
  },
  {
    title: "Peeling Paint & Visible Staining",
    text: "Paint that's bubbling, peeling, or showing brown staining along the fascia is usually the first visible sign of moisture getting into the wood underneath.",
  },
  {
    title: "Fascia Pulling Away From the Roofline",
    text: "Once fascia board rots or its fasteners rust out, it can start separating from the roof edge, which also compromises whatever gutter is attached to it.",
  },
  {
    title: "Insect Damage to Wood Trim",
    text: "Carpenter ants and other wood-boring insects target damp, softened fascia and soffit, often expanding existing moisture damage faster than it would spread on its own.",
  },
  {
    title: "Cracked or Missing Soffit Sections",
    text: "Impact damage, age, or improper fastening can leave sections of soffit cracked or missing outright, exposing the attic space directly to the outside.",
  },
];

const signsPool = [
  "Soft or spongy spots when you press on the fascia board",
  "Visible gaps or missing sections along the soffit",
  "Peeling paint or dark staining on the fascia",
  "Birds, wasps, or squirrels getting into the attic or eaves",
  "Gutters sagging or pulling away from the roofline",
  "A musty smell or visible moisture in the attic near the eaves",
];

const processSteps = [
  {
    number: "01",
    title: "Inspection",
    text: "We check the full soffit and fascia run, not just the spot you flagged, looking for soft wood, loose panels, blocked vents, and any pest entry points along the way.",
  },
  {
    number: "02",
    title: "Diagnosis",
    text: "We identify exactly how far the damage extends and whether it's isolated to trim or has started affecting the roof deck or fascia-mounted gutters, and explain it clearly before any work starts.",
  },
  {
    number: "03",
    title: "Repair or Replacement",
    text: "Depending on what we find, this means replacing rotted fascia sections, reattaching or replacing soffit panels, and sealing off any pest entry points we identified during inspection.",
  },
  {
    number: "04",
    title: "Ventilation Check",
    text: "We confirm soffit vents are clear and functioning so your attic keeps getting the airflow it needs after the repair is complete.",
  },
  {
    number: "05",
    title: "Cleanup",
    text: "Old boards, panels, and debris are hauled away, and we leave the work area as clean as we found it.",
  },
];

const faqPool = (areaName: string) => [
  {
    q: `How much does soffit and fascia repair cost in ${areaName}?`,
    a: "It depends on how much trim needs attention and whether it's a repair or full replacement. A small section of rotted fascia is a much smaller job than a full eave's worth of panels. We give you a clear, itemized quote after seeing the damage in person.",
  },
  {
    q: "How do I know if my fascia needs repair?",
    a: "Soft or spongy spots when pressed, peeling paint, visible gaps, or a gutter that's started sagging are all signs worth having looked at. Catching it early usually means a smaller repair instead of a full board replacement.",
  },
  {
    q: "Can soffit and fascia be repaired without replacing the whole run?",
    a: "In most cases, yes. If the damage is isolated to one or two sections, we repair just those and match the surrounding material. We only recommend replacing an entire run when the damage is widespread.",
  },
  {
    q: "Why does fascia damage matter if it's just trim?",
    a: "Fascia boards support your gutters and seal off the edge of the roof deck. Once they rot, gutters can sag or pull away entirely, and the gap left behind gives water and pests a direct path into the roof structure.",
  },
  {
    q: "Will repairing my soffit keep pests out?",
    a: "Yes, sealing gaps in damaged soffit and fascia is one of the most effective ways to stop squirrels, birds, and wasps from getting into your attic, since those gaps are usually their main entry point.",
  },
  {
    q: "Do you match the existing material when repairing?",
    a: "Yes, we match wood, aluminum, or vinyl trim to what's already on your home wherever possible, so a repaired section doesn't stand out from the rest of the eave.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every soffit and fascia repair is completed by trained, experienced crews.",
  },
  {
    q: "Do you offer a free assessment before quoting?",
    a: "Yes, we inspect the soffit and fascia in person before quoting. Damage can look minor from the ground but be more extensive once we're up close, so an accurate quote requires seeing it directly.",
  },
  {
    q: "What usually causes fascia to rot?",
    a: "A gutter leak sitting against the board, blocked gutters overflowing onto the fascia, or simply decades of paint wear exposing the wood underneath are the most common causes we see.",
  },
  {
    q: "Should I repair my gutters and fascia at the same time?",
    a: "If your fascia damage is related to a gutter problem, which it often is, addressing both in one visit makes sense. We'll flag it during the inspection if that's what we find.",
  },
];

export type SoffitFasciaRepairArchetype = 0 | 1 | 2;

export function getArchetype(index: number): SoffitFasciaRepairArchetype {
  return (index % 3) as SoffitFasciaRepairArchetype;
}

export function soffitFasciaRepairFaqs(area: ServiceArea, index: number, count = 7) {
  const pool = faqPool(area.name);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function soffitFasciaRepairSigns(index: number) {
  const start = index % signsPool.length;
  return [...signsPool.slice(start), ...signsPool.slice(0, start)];
}

export function soffitFasciaRepairProblems(index: number, count = 6) {
  const start = index % problemsPool.length;
  const rotated = [...problemsPool.slice(start), ...problemsPool.slice(0, start)];
  return rotated.slice(0, count);
}

export { processSteps as soffitFasciaRepairProcessSteps };

export function soffitFasciaRepairIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our soffit and fascia repair work in ${area.name} covers everything from a single rotted board to a full eave needing new panels.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, call us when soffit or fascia damage shows up, whether that's a soft board, a missing panel, or a pest getting into the attic.`,
  ];
  return pickByIndex(variants, index);
}
