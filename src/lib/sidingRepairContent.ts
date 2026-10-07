import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /siding-repair/[area] pages
 * (every city except Hamilton and Stoney Creek, which have fully bespoke
 * pages). Repair-focused, matching the Hamilton/Stoney Creek quality bar:
 * hand-written per-city intro/local-conditions, plus pooled content for
 * damage categories, cost factors, repair-vs-replace items, materials, and
 * FAQs that gets rotated and partially selected by city index, so each
 * city shows a different subset, order, and wording rather than the same
 * fixed list every time. Combined with the 3-way structural archetype,
 * this keeps the 7 pages from reading as the same template with the city
 * name swapped.
 */

export type SidingRepairCityContent = {
  intro: string;
  quickAnswer: string;
  localConditions: string[];
};

export const sidingRepairCityContent: Record<string, SidingRepairCityContent> = {
  burlington: {
    intro:
      "Most of the siding calls we get in Burlington are a damaged panel or two, not a reason to re-side the whole house. We fix what's actually broken and say so plainly when a repair won't hold up long-term.",
    quickAnswer:
      "Ironmark Exteriors repairs damaged siding for homes in Burlington, Ontario, including cracked, loose, warped, and wind-damaged vinyl and insulated siding. Most repairs involve a single panel or a contained section rather than the full wall. Homeowners can send photos of the damage for a fast starting estimate before booking an in-person assessment.",
    localConditions: [
      "Homes near Roseland often have original aluminum or early vinyl siding that's faded unevenly and gone brittle with age, which is where a single cold-weather impact can crack a panel that would have held up fine in summer.",
      "In newer sections of Millcroft and Aldershot, siding issues tend to be isolated: a panel knocked loose by a storm, or a seam that's opened up near a corner post, rather than wear spread across the whole wall.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger homes often mean more siding surface area and more architectural detail, gables, dormers, mixed materials, which makes colour and profile matching more important on a repair here than on a standard subdivision home.",
    quickAnswer:
      "Ironmark Exteriors repairs damaged siding for homes in Ancaster, Ontario, including cracked, loose, and wind-damaged vinyl and insulated siding, with extra attention to matching colour and profile on homes with more detailed exteriors. Most repairs are limited to the affected panel or section. Sending photos of the damage gets you a fast starting estimate.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often have more varied exterior design than newer builds, which means a repair has to account for trim, corner detail, and transitions between materials, not just the damaged panel itself.",
      "Mature tree cover throughout the area adds shade and moisture exposure on certain walls, worth flagging if a panel in a shaded section feels soft or shows discolouration along a seam.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and siding repair here usually comes down to finding a close match for an older profile rather than a generic panel swap.",
    quickAnswer:
      "Ironmark Exteriors repairs damaged siding for homes in Dundas, Ontario, including cracked, loose, and warped vinyl and insulated siding, with particular attention to matching older or discontinued profiles. Repairs are typically limited to the damaged panel or section. Homeowners can send photos for a fast starting estimate before an in-person visit.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley often carry siding original to the house or from an earlier renovation, so matching colour and profile matters more here than in newer developments with standard exteriors.",
      "The valley's reduced airflow and extra shade mean a damaged seam here can hold moisture longer after rain than it would in a more open, sunnier location, worth addressing before it spreads.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a lot of our repair calls involve siding that's close to 20 years old, which changes what's realistic: matching an aging panel sometimes takes more work than the repair itself.",
    quickAnswer:
      "Ironmark Exteriors repairs damaged siding for homes in Brantford, Ontario, including cracked, loose, and wind-damaged vinyl and insulated siding. Many repairs involve matching an older or sun-faded panel rather than sourcing current stock. Homeowners can send photos of the damage for a fast starting estimate before booking an inspection.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with original siding well into its expected lifespan, which means a repair sometimes means matching a colour that's faded unevenly rather than a clean swap with new material.",
      "Proximity to the Grand River adds humidity through the warmer months, which doesn't damage siding on its own but can make an existing gap or loose seam more noticeable sooner than in a drier location.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location put more wind load on siding than almost anywhere else in our service area, which is the main reason we see loose panels and rattling siding here.",
    quickAnswer:
      "Ironmark Exteriors repairs damaged siding for homes in Grimsby, Ontario, including wind-loosened, cracked, and missing vinyl and insulated siding panels. Wind exposure off the escarpment and lake is a common factor behind loose or rattling siding here. Homeowners can send photos of the damage for a fast starting estimate.",
    localConditions: [
      "Wind coming off the escarpment and the lake puts repeated stress on siding fastening strips, particularly on homes nearer Grimsby on the Lake, which is often where a loose panel shows up first after a windy stretch.",
      "The area's orchards and mature trees also mean more organic staining and debris buildup against lower siding sections over time, something worth checking alongside any repair work.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have some of the longest-serving siding in our service area, and canal humidity is worth factoring into any repair that involves matching material.",
    quickAnswer:
      "Ironmark Exteriors repairs damaged siding for homes in St. Catharines, Ontario, including cracked, loose, and moisture-affected vinyl and insulated siding. Canal and lake humidity can make a damaged seam more noticeable sooner than in drier areas. Homeowners can send photos of the damage for a fast starting estimate before an in-person visit.",
    localConditions: [
      "Port Dalhousie and Western Hill have many established homes with original siding, and a repair here often means confirming whether the surrounding panels are still sound enough to not need touching beyond the damaged section.",
      "Canal and lake humidity means moisture that gets behind a loose panel or open seam tends to linger longer than it would further inland, part of why we check the full seam line during any repair call.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, between the falls themselves and regional humidity, which is a factor worth understanding before any siding repair.",
    quickAnswer:
      "Ironmark Exteriors repairs damaged siding for homes in Niagara Falls, Ontario, including cracked, loose, and moisture-affected vinyl and insulated siding. Ambient humidity from the falls can make an existing gap or loose seam more noticeable sooner than in drier locations. Homeowners can send photos of the damage for a fast starting estimate.",
    localConditions: [
      "Mist from the falls settles well beyond the immediate tourist corridor, adding moisture exposure to siding on homes throughout Chippawa and Stamford, not just those closest to the falls themselves.",
      "Properties nearer the tourist corridor also see more general wear on lower siding sections from foot traffic and nearby construction activity, worth factoring in if you're noticing scuffs alongside other damage.",
    ],
  },
};

// Six damage categories with real photos, plus two without (which show the
// site's standard placeholder until photos exist). Pooled so each city
// shows a different 6-of-8 selection and order rather than the identical
// list, while still only using photos that actually exist.
export const sidingDamagePool = [
  { title: "Cracked Panels", key: "cracked", image: "/images/siding-repair/cracked-panels.jpg", text: "A single cracked panel, usually from cold-weather brittleness or impact, replaced and colour-matched." },
  { title: "Loose Siding", key: "loose", image: "/images/siding-repair/loose-siding.jpg", text: "Panels that have pulled away from the fastening strip, re-secured before wind or moisture make it worse." },
  { title: "Wind Damage", key: "wind", image: "/images/siding-repair/wind-damage.jpg", text: "Sections lifted, bent, or torn loose by wind, repaired and re-fastened properly." },
  { title: "Missing Panels", key: "missing", image: "/images/siding-repair/missing-panels.jpg", text: "Gaps left by a blown-off or removed panel, filled with a matching replacement." },
  { title: "Warped Siding", key: "warped", image: "/images/siding-repair/warped-siding.jpg", text: "Panels installed too tight that have buckled with temperature swings, replaced with proper expansion room." },
  { title: "Small Section Replacement", key: "section", image: "/images/siding-repair/small-section-replacement.jpg", text: "A contained area of damage replaced without re-siding the whole wall." },
  { title: "Damaged Seams", key: "seam", image: "/images/siding-repair/damaged-seams.jpg", text: "Separated or gapped seams resealed or refitted so water has nowhere to get in." },
  { title: "Faded or Discoloured Panels", key: "faded", image: "/images/siding-repair/faded-panels.jpg", text: "Sun-faded sections that stand out against the rest of the wall, addressed with the closest available colour match." },
];

const costFactorPool = [
  { title: "Number of panels affected", text: "A single panel is a smaller job than damage spread across a wall." },
  { title: "Siding material", text: "Vinyl, insulated vinyl, and composite repair differently and at different costs." },
  { title: "Accessibility & height", text: "A second-storey or hard-to-reach section takes more time to access safely." },
  { title: "Colour & material matching", text: "Older or sun-faded siding can take longer to match closely." },
  { title: "Trim & corner involvement", text: "Repairs touching corner posts or trim add steps beyond the panel itself." },
  { title: "Hidden damage underneath", text: "Moisture that's reached the sheathing adds to the scope of the repair." },
  { title: "How the damage occurred", text: "Storm or impact damage sometimes affects a wider area than it first appears to." },
];

const repairWhenPool = ["One or a few damaged panels", "Loose panels", "Isolated cracks", "Wind damage", "Small holes", "Damaged seams", "A single discoloured panel"];
const replaceWhenPool = ["Widespread deterioration", "Substantial moisture or sheathing damage", "Unavailable or discontinued siding", "Damage across several walls", "Repeated repairs to the same area"];

export const sidingMaterials = [
  { title: "Vinyl Siding", key: "vinyl", image: "/images/siding-repair/vinyl-siding.jpg", text: "The most common siding material in our service area, repaired by panel replacement and colour matching." },
  { title: "Insulated Vinyl", key: "insulated", image: "/images/siding-repair/insulated-vinyl.png", text: "Foam-backed vinyl, repaired carefully so the insulation layer stays intact." },
  { title: "Composite & Engineered", key: "composite", image: "/images/siding-repair/composite-engineered.jpg", text: "Rigid, wood-look siding repaired at damaged edges and fastener points." },
];

const processVariants = [
  [
    { number: "01", title: "Send Photos or Request Inspection", text: "Start with photos, or book an on-site look." },
    { number: "02", title: "Assess Damage & Matching Options", text: "We confirm scope and what's available to match." },
    { number: "03", title: "Repair the Affected Section", text: "Only the damaged area, not the whole wall." },
    { number: "04", title: "Check Seams & Fastening", text: "We check the surrounding area, not just the spot flagged." },
    { number: "05", title: "Final Inspection", text: "We confirm the repair is secure before we leave." },
  ],
  [
    { number: "01", title: "Inspection", text: "We take a close look at the damaged area and the wall around it." },
    { number: "02", title: "Diagnose the Cause", text: "We identify what actually failed, not just what's visible." },
    { number: "03", title: "Repair & Match", text: "The affected panel or section is repaired and colour-matched." },
    { number: "04", title: "Water-Entry Check", text: "We confirm seams and trim nearby are sealed properly." },
    { number: "05", title: "Final Walkthrough", text: "We review the finished repair with you before wrapping up." },
  ],
];

export function sidingProcessSteps(index: number) {
  return pickByIndex(processVariants, index);
}

const faqPool = (areaName: string, neighbourhoods: string) => [
  {
    q: `How much does siding repair cost in ${areaName}?`,
    a: "It depends on the number of panels affected, the siding material, accessibility, and colour matching. We give you an exact, itemized quote after seeing photos or inspecting in person, never a flat number over the phone.",
  },
  {
    q: "Can a damaged panel be repaired without replacing the whole wall?",
    a: "In most cases, yes. If the surrounding siding is in good condition, we replace just the affected panel or section rather than re-siding the wall.",
  },
  {
    q: "Can you match my existing siding if it's an older colour or style?",
    a: "We do our best to match colour, profile, and manufacturer whenever a close match is available. If your siding has been discontinued, we'll walk you through the closest realistic options.",
  },
  {
    q: "Why does vinyl siding crack more in winter?",
    a: "Vinyl becomes more brittle as temperatures drop, so impacts that wouldn't mark it in summer can crack it in colder months.",
  },
  {
    q: "What happens if water has gotten behind damaged siding?",
    a: "We check the sheathing underneath before closing up any repair. If moisture has already caused damage there, that gets addressed as part of the job, not left behind the new panel.",
  },
  {
    q: "Does home insurance cover siding damage from storms?",
    a: "Many policies cover wind, hail, or debris damage, but coverage varies. We can provide photos and a written assessment to support a claim, though you'll want to confirm coverage with your insurer directly.",
  },
  {
    q: "How long does a typical siding repair take?",
    a: "A single-panel or small-section repair is often done in a few hours. Larger repairs involving multiple walls or discontinued materials take longer, we'll give you a realistic timeline after seeing the scope.",
  },
  {
    q: "Can I just send photos of the damage to get a quote?",
    a: "Yes, this is often the fastest way to get a starting estimate. Clear photos of the damaged area, plus a wide shot showing where it is on the house, let us give you a realistic initial range before confirming anything in person.",
  },
  {
    q: "Do you repair siding around windows and doors?",
    a: "Yes. Gaps around window and door trim are a common place for moisture to get in, so we check and repair this area as part of any siding repair call.",
  },
  {
    q: "Is Ironmark Exteriors licensed and insured?",
    a: "Yes. Ironmark Exteriors is licensed and insured for siding work throughout our service area.",
  },
  {
    q: "When is siding damage too extensive to repair?",
    a: "When deterioration is spread across multiple walls, moisture has caused significant damage underneath, or the siding is old enough that matching material isn't available. Outside of those situations, repair is usually the more practical option.",
  },
  {
    q: `What areas of ${areaName} do you service for siding repair?`,
    a: `We repair siding throughout ${areaName}, including ${neighbourhoods} and the rest of the city.`,
  },
];

export type SidingRepairArchetype = 0 | 1 | 2;

export function getArchetype(index: number): SidingRepairArchetype {
  return (index % 3) as SidingRepairArchetype;
}

/** Rotates and slices a pool so each city index gets a different subset and order. */
function rotate<T>(pool: T[], index: number, count: number): T[] {
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function sidingRepairFaqs(area: ServiceArea, index: number, count = 8) {
  return rotate(faqPool(area.name, neighbourhoodLine(area)), index, count);
}

export function sidingDamageCards(index: number, count = 6) {
  return rotate(sidingDamagePool, index, count);
}

export function sidingCostFactors(index: number, count = 5) {
  return rotate(costFactorPool, index, count);
}

export function sidingRepairWhen(index: number, count = 5) {
  return rotate(repairWhenPool, index, count);
}

export function sidingReplaceWhen(index: number, count = 4) {
  return rotate(replaceWhenPool, index, count);
}

export function sidingRepairIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Most of our siding work in ${area.name} is repair, not replacement.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, call us when siding damage shows up, whether that's a cracked panel, a loose section, or storm damage.`,
  ];
  return pickByIndex(variants, index);
}
