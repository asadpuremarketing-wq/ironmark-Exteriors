import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /downspout-repair/[area]
 * pages. Same approach as the gutter repair/installation content libs:
 * hand-written per-city content (not templated) plus a structural
 * archetype assigned by city index.
 */

export type DownspoutRepairCityContent = {
  intro: string;
  localConditions: string[];
};

export const downspoutRepairCityContent: Record<string, DownspoutRepairCityContent> = {
  hamilton: {
    intro:
      "A downspout that's come loose, disconnected underground, or is simply too small for the roof it's draining is one of the most common exterior problems we see on Hamilton service calls, and usually one of the quickest to fix.",
    localConditions: [
      "Century homes around Westdale and Kirkendall often still have the original downspout layout, sized for a roof with fewer modern additions like extensions or converted porches, which means they can be undersized for how much water actually reaches them now.",
      "In Waterdown's newer builds, we more often find downspouts that were knocked loose during landscaping or snow removal, an easy repair once the bracket or extension is reattached properly.",
    ],
  },
  "stoney-creek": {
    intro:
      "Wind off Lake Ontario does a number on downspout extensions in Stoney Creek, which is why we see so many that have been blown loose or knocked out of position entirely.",
    localConditions: [
      "Homes near Fifty Point and Community Beach deal with more direct wind exposure, and a downspout extension that isn't properly secured gets pushed out of place more often here than in sheltered inland locations.",
      "Properties around Winona with mature trees also see downspouts clogged by debris that makes it past the gutter, worth checking any time you're also having gutters cleaned.",
    ],
  },
  burlington: {
    intro:
      "Burlington's mix of older and newer construction means downspout calls range from replacing a corroded original system to simply correcting a downspout that was never angled away from the foundation properly.",
    localConditions: [
      "Established homes near Roseland often have older downspout sections that have corroded at the seams, usually the first part of the system to fail even when the gutters above are still in decent shape.",
      "In Millcroft and Aldershot's newer developments, the more common issue is a downspout draining too close to the foundation, which is an easy fix with an extension but worth catching before it contributes to basement moisture.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger rooflines put more demand on each downspout than a typical subdivision home, and an undersized or poorly placed downspout shows up fast during a heavy summer storm.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often need more downspouts per roof than they currently have, simply because of how much roof area is draining into each one. We assess this as part of any downspout repair or installation visit.",
      "Mature trees throughout the area also mean downspouts get blocked by debris more often, something worth flagging if you're noticing water overflowing at the top of a downspout instead of flowing through it.",
    ],
  },
  dundas: {
    intro:
      "Dundas's older character homes often have downspout systems that have been patched or partially replaced over the years, and getting the whole system working consistently again is one of our more common calls here.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley sometimes have mismatched downspout sections from different repairs over the decades, each with a slightly different capacity, which can create weak points where water backs up.",
      "The valley setting means water that isn't properly carried away from the foundation has more opportunity to pool before it drains off naturally, so correct downspout placement matters more here than in flatter areas.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a fair number of our downspout calls involve corroded galvanized steel sections that need replacing with aluminum.",
    localConditions: [
      "Streets in Eagle Place and Holmedale often have original downspout systems that are decades old, and once a section starts rusting through, water finds its way out mid-run instead of reaching the ground where it should.",
      "River proximity also means more humidity, which we factor into material recommendations, aluminum simply holds up better here than the older steel downspouts still found on some homes.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside wind exposure puts real stress on downspout brackets and extensions, more than most of our service area experiences.",
    localConditions: [
      "Wind off the escarpment and the lake near Grimsby on the Lake regularly knocks downspout extensions loose, which is a quick fix but one that tends to recur if the extension isn't properly secured the first time.",
      "The area's orchards and heavier tree cover also mean downspouts clog more frequently with seasonal debris, worth checking whenever gutters are being cleaned nearby.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have some of the longest-serving downspout systems in our service area, and canal humidity makes material condition worth checking closely.",
    localConditions: [
      "Port Dalhousie and Western Hill have many established homes where downspouts have been in place for decades, and corrosion at the seams is usually the first sign a section needs replacing rather than just repairing.",
      "Canal and lake humidity accelerates wear on older downspout materials, which is part of why we recommend aluminum replacements for anything showing early corrosion rather than waiting for a full failure.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than almost anywhere else in our service area, and that extra exposure means downspout issues tend to show up sooner here than elsewhere.",
    localConditions: [
      "Mist from the falls reaches well beyond the immediate tourist corridor, adding moisture exposure to downspouts throughout Chippawa and Stamford that homes in drier areas simply don't deal with.",
      "That added moisture doesn't cause problems on its own, but it does mean a loose joint or small corrosion spot tends to become a visible leak faster here, so we recommend addressing minor downspout issues before they grow.",
    ],
  },
};

const signsPool = [
  "Water pooling at the base of a downspout instead of draining away",
  "A downspout that's visibly disconnected, loose, or knocked out of position",
  "Rust spots, corrosion, or holes in the downspout material",
  "Water staining on the foundation or siding near a downspout",
  "Overflow at the top of the downspout during moderate rain",
  "A downspout extension that's missing, crushed, or pointing the wrong way",
];

const processSteps = [
  {
    number: "01",
    title: "Inspection",
    text: "We check every downspout on the property, not just the one you flagged, for blockages, disconnections, corrosion, and proper slope away from the foundation.",
  },
  {
    number: "02",
    title: "Diagnosis",
    text: "We identify whether the issue is a blockage, a loose connection, undersizing for the roof area, or material failure, and explain exactly what needs to happen.",
  },
  {
    number: "03",
    title: "Repair or Replace",
    text: "Depending on what we find, this means clearing a blockage, reattaching and resealing joints, or replacing a corroded section with new aluminum downspout.",
  },
  {
    number: "04",
    title: "Extension & Placement",
    text: "We confirm each downspout directs water at least several feet from the foundation, adding or adjusting extensions where needed.",
  },
  {
    number: "05",
    title: "Flow Test",
    text: "We run water through the full system to confirm it drains cleanly from gutter to ground before considering the job finished.",
  },
];

const problemsPool = [
  {
    title: "Blocked or Clogged Downspouts",
    text: "Leaves, debris, and even small nests can block a downspout completely, forcing water to back up and overflow at the top instead of draining through.",
  },
  {
    title: "Disconnected Sections",
    text: "Downspouts knocked loose by ladders, landscaping equipment, or ice can separate at the joints, dumping water in the wrong place entirely.",
  },
  {
    title: "Corrosion & Rust-Through",
    text: "Older steel downspouts eventually rust through, usually at the seams first, letting water escape mid-run before it reaches the ground.",
  },
  {
    title: "Missing or Damaged Extensions",
    text: "Without a proper extension, water discharges right next to the foundation instead of several feet away, which is one of the most preventable causes of basement moisture.",
  },
  {
    title: "Undersized for the Roof",
    text: "A downspout that's too small for the roof area it's draining will overflow during heavy rain no matter how clear it is.",
  },
  {
    title: "Poor Slope or Placement",
    text: "A downspout that empties onto a slope toward the house, rather than away from it, can undo the benefit of an otherwise well-maintained gutter system.",
  },
];

const faqPool = (areaName: string) => [
  {
    q: `How much does downspout repair cost in ${areaName}?`,
    a: "It depends on whether it's a simple reattachment, a blockage, or a full section needing replacement. We give you a clear quote after seeing the actual issue, not a guess over the phone.",
  },
  {
    q: "How do I know if my downspouts are too small for my roof?",
    a: "If gutters overflow at the top during moderate rain even when clear of debris, undersized downspouts are a common cause. We calculate proper sizing based on your actual roof area during an assessment.",
  },
  {
    q: "Can a downspout be repaired, or does it need full replacement?",
    a: "Most blockages, loose joints, and minor disconnections are straightforward repairs. If a section is corroded through or cracked in multiple places, replacing that section usually makes more sense than repeated patching.",
  },
  {
    q: "Why does water pool near my foundation after it rains?",
    a: "This is almost always a downspout extension problem, water discharging too close to the house instead of being carried several feet away. It's one of the most common and most preventable causes of basement moisture issues.",
  },
  {
    q: "Do you install new downspouts, not just repair existing ones?",
    a: "Yes, we install new downspouts where none exist, add additional downspouts to handle larger roof areas, and replace damaged sections with new aluminum downspout.",
  },
  {
    q: "How often do downspouts need maintenance?",
    a: "Checking them whenever your gutters are cleaned, typically twice a year, catches most issues like blockages or loose joints before they become bigger problems.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every downspout repair or installation is completed by trained, experienced crews.",
  },
  {
    q: "Do you offer a free assessment?",
    a: "Yes, we inspect the downspout system in person before quoting any work, since the right fix depends on exactly what's causing the problem.",
  },
  {
    q: "What causes most downspout damage in this area?",
    a: "Impact damage from ladders or landscaping equipment, corrosion on older steel systems, and wind-related disconnection are the most common causes we see across our service area.",
  },
  {
    q: `Can you fix a downspout that's draining toward my ${areaName} home's foundation?`,
    a: "Yes, this is a common and important fix. We add or adjust extensions so water discharges well away from the foundation instead of pooling right beside it.",
  },
];

export type DownspoutRepairArchetype = 0 | 1 | 2;

export function getArchetype(index: number): DownspoutRepairArchetype {
  return (index % 3) as DownspoutRepairArchetype;
}

export function downspoutRepairFaqs(area: ServiceArea, index: number, count = 7) {
  const pool = faqPool(area.name);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function downspoutRepairSigns(index: number) {
  const start = index % signsPool.length;
  return [...signsPool.slice(start), ...signsPool.slice(0, start)];
}

export function downspoutRepairProblems(index: number, count = 6) {
  const start = index % problemsPool.length;
  const rotated = [...problemsPool.slice(start), ...problemsPool.slice(0, start)];
  return rotated.slice(0, count);
}

export { processSteps as downspoutRepairProcessSteps };

export function downspoutRepairIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our downspout work in ${area.name} covers everything from a quick reattachment to a full section replacement.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, call us when a downspout stops doing its job, whether that's a blockage, a disconnection, or water pooling where it shouldn't.`,
  ];
  return pickByIndex(variants, index);
}
