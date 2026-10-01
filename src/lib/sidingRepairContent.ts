import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /siding-repair/[area] pages. Same
 * approach as the gutter-service content libs: hand-written per-city
 * content plus a structural archetype assigned by city index.
 */

export type SidingRepairCityContent = {
  intro: string;
  localConditions: string[];
};

export const sidingRepairCityContent: Record<string, SidingRepairCityContent> = {
  hamilton: {
    intro:
      "Hamilton's mix of century homes and newer builds means siding work here ranges from matching original wood-look profiles on older houses to full re-sides on homes with siding well past its service life.",
    localConditions: [
      "Older homes around Westdale and Kirkendall often have aluminum or early vinyl siding from past decades, which fades, warps, and can crack in Hamilton's winters. A full re-side with modern vinyl or fiber cement brings both looks and performance up to current standards.",
      "In newer areas like Waterdown, siding issues are more often storm or impact damage, a single damaged panel that needs matching and replacing rather than a full re-side.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside wind exposure puts real stress on siding panels and their fasteners, which is why we see more loose or rattling siding here than in sheltered inland neighbourhoods.",
    localConditions: [
      "Homes near Fifty Point and Community Beach take direct wind off the lake, and siding installed without wind-rated fastening can loosen or even pull away over time, something we account for on every installation here.",
      "Properties around Winona with more tree cover also deal with moisture retention behind siding if ventilation wasn't done properly during the original install, worth checking if you're noticing any warping.",
    ],
  },
  burlington: {
    intro:
      "Burlington's range of established and newer neighbourhoods means siding calls span everything from full replacements on aging original siding to targeted repairs after storm damage.",
    localConditions: [
      "Older homes near Roseland often still have their original aluminum or early vinyl siding, which has typically faded unevenly and can be brittle in cold weather, a good candidate for full replacement with modern insulated vinyl.",
      "In Millcroft and Aldershot's newer builds, siding issues are usually isolated, a cracked panel from an impact or a section that's come loose, which we can typically match and repair without touching the rest of the home.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger homes often have more siding surface area and architectural detail, which means repairs and installations here require more careful colour and profile matching than a standard subdivision home.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often feature more varied exterior design, gables, dormers, mixed materials, which we account for when quoting repair or replacement work to make sure everything matches.",
      "Mature tree cover throughout the area also means more moisture exposure on shaded sides of the house, worth factoring into material choice if you're considering a full re-side.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and siding work here often means carefully matching existing profiles rather than defaulting to a standard replacement.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley often have siding original to the house or from an earlier renovation, and matching colour and profile matters more here than in newer developments with more generic exteriors.",
      "The valley's reduced airflow and shade also mean siding here can retain moisture longer after rain, something worth considering when choosing between vinyl and fiber cement for a full replacement.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a good share of our siding work is full replacements on systems that have simply reached the end of their service life.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with original siding well past its expected lifespan, faded, warped, or cracked in multiple spots. A full replacement is usually more cost-effective than chasing individual repairs at that point.",
      "River proximity also means more humidity, which is worth factoring into material choice, fiber cement and insulated vinyl both handle moisture better than older uninsulated siding still found on some homes here.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location means wind exposure is a bigger factor in siding work here than almost anywhere else in our service area.",
    localConditions: [
      "Wind coming off the escarpment and the lake is hard on siding that wasn't properly fastened, which is standard practice on every installation we do near Grimsby on the Lake.",
      "The area's orchards and mature trees also mean more organic staining on siding over time, something a fresh install or thorough cleaning can address depending on the condition of your current siding.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have a lot of homes due for a full siding replacement, and canal humidity makes material choice worth discussing carefully.",
    localConditions: [
      "Port Dalhousie and Western Hill have many established homes with original siding, and once it's cracking or fading unevenly across multiple walls, a full replacement is usually the better long-term investment over spot repairs.",
      "Canal and lake humidity means moisture resistance matters more here than in drier inland areas, part of why we often recommend insulated vinyl or fiber cement for full replacements in this area.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, which we factor into material recommendations on every siding project here.",
    localConditions: [
      "The mist generated by the falls extends well beyond the immediate tourist corridor, meaning homes throughout Chippawa and Stamford see more moisture exposure than a typical location, another reason proper siding ventilation matters here specifically.",
      "Properties closer to the tourist area also see more general wear from foot traffic and nearby construction activity, worth factoring in if you're noticing scuffs or damage on lower sections of siding.",
    ],
  },
};

const signsPool = [
  "Visible warping, buckling, or cracking in siding panels",
  "Fading or discolouration that's uneven across different walls",
  "Siding that feels soft or spongy when pressed, a sign of moisture damage underneath",
  "Rising energy bills that could point to failing insulation behind old siding",
  "Mold, mildew, or persistent staining on exterior walls",
  "Loose or rattling panels, especially after windy weather",
];

const processSteps = [
  {
    number: "01",
    title: "Inspection & Consultation",
    text: "We assess your current siding's condition and talk through material options, colours, and budget before anything is quoted.",
  },
  {
    number: "02",
    title: "Detailed Quote",
    text: "You get a clear, itemized quote covering materials, labour, and timeline, no vague estimates or surprise add-ons later.",
  },
  {
    number: "03",
    title: "Prep & Removal",
    text: "Old siding is removed and the sheathing underneath is checked for damage, anything found gets addressed before new siding goes up.",
  },
  {
    number: "04",
    title: "Installation",
    text: "New siding is installed with proper fastening and flashing details around windows, doors, and corners to keep water out long-term.",
  },
  {
    number: "05",
    title: "Final Walkthrough",
    text: "We walk the finished job with you to confirm every detail looks right before calling it complete.",
  },
];

const problemsPool = [
  {
    title: "Warped or Buckled Panels",
    text: "Heat exposure and age cause vinyl siding to warp or buckle, which is both a cosmetic issue and a sign the material is failing structurally.",
  },
  {
    title: "Moisture Damage Behind Siding",
    text: "Soft, spongy spots usually mean water has gotten behind the siding and is damaging the sheathing underneath, left unaddressed this can spread.",
  },
  {
    title: "Faded or Uneven Colour",
    text: "Sun exposure fades siding unevenly across different walls, which becomes more noticeable the older the siding gets.",
  },
  {
    title: "Cracked or Impact-Damaged Panels",
    text: "A single cracked panel from debris or impact is usually an easy repair if caught early, matching and replacing just the damaged section.",
  },
  {
    title: "Poor Insulation",
    text: "Older, uninsulated siding does little to help with energy efficiency, insulated vinyl or proper house wrap during a re-side makes a real difference.",
  },
  {
    title: "Loose Fastening",
    text: "Siding that wasn't fastened correctly, or has loosened over time, can rattle in wind and eventually pull away from the wall entirely.",
  },
];

const faqPool = (areaName: string) => [
  {
    q: `How much does siding replacement cost in ${areaName}?`,
    a: "Cost depends on your home's size, the material you choose, and the condition of what's underneath the current siding. We give you a clear, itemized quote after an in-person assessment.",
  },
  {
    q: "Should I repair my siding or replace it entirely?",
    a: "If the damage is isolated, a few panels, one section, repair usually makes sense. If siding is failing broadly across multiple walls, warping, fading unevenly, or showing moisture damage, a full replacement is typically the better long-term investment.",
  },
  {
    q: "What's the difference between vinyl and fiber cement siding?",
    a: "Vinyl is more affordable and never needs painting, while fiber cement is more durable and holds paint well over time but costs more upfront. We can walk you through which fits your home and budget.",
  },
  {
    q: "How long does a full siding replacement take?",
    a: "Most homes take a few days to a week depending on size and any sheathing repairs needed underneath the old siding.",
  },
  {
    q: "Can you match my existing siding for a repair?",
    a: "In most cases, yes, though exact colour matches can be harder on older siding that's faded over the years. We'll be upfront with you about how close a match is realistic before starting any repair work.",
  },
  {
    q: "Will new siding improve my home's energy efficiency?",
    a: "Yes, especially if your current siding is older and uninsulated. Insulated vinyl or proper house wrap installed during a re-side can make a noticeable difference in comfort and energy bills.",
  },
  {
    q: "Can I just send photos of the damage to get a quote?",
    a: "Yes, this is often the fastest way to get a starting estimate. Clear photos of the damaged area, plus a wide shot showing where it is on the house, let us give you a realistic initial range before confirming anything in person.",
  },
  {
    q: "Do you offer a free estimate?",
    a: "Yes, we assess your siding in person and walk through material and colour options before giving you a detailed, no-obligation quote.",
  },
  {
    q: "What causes most siding damage in this area?",
    a: "Sun and weather-related fading, wind damage to loosely fastened panels, and moisture issues from aging or poorly ventilated systems are the most common causes we see across our service area.",
  },
  {
    q: `How do I know if my ${areaName} home needs new siding?`,
    a: "Warping, visible cracks, soft spots when pressed, and rising energy bills are all signs worth having assessed. A free inspection will tell you whether you're looking at a repair or a full replacement.",
  },
];

export type SidingRepairArchetype = 0 | 1 | 2;

export function getArchetype(index: number): SidingRepairArchetype {
  return (index % 3) as SidingRepairArchetype;
}

export function sidingRepairFaqs(area: ServiceArea, index: number, count = 7) {
  const pool = faqPool(area.name);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function sidingRepairSigns(index: number) {
  const start = index % signsPool.length;
  return [...signsPool.slice(start), ...signsPool.slice(0, start)];
}

export function sidingRepairProblems(index: number, count = 6) {
  const start = index % problemsPool.length;
  const rotated = [...problemsPool.slice(start), ...problemsPool.slice(0, start)];
  return rotated.slice(0, count);
}

export { processSteps as sidingRepairProcessSteps };

export function sidingRepairIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our siding work in ${area.name} covers everything from targeted repairs to full home re-sides.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, trust us for siding repair and installation that holds up through every season.`,
  ];
  return pickByIndex(variants, index);
}
