import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /gutter-installation/[area]
 * pages. Same approach as gutterRepairContent.ts: hand-written per-city
 * content (not templated) plus a structural archetype assigned by city
 * index, so the 9 pages differ in both wording and layout.
 */

export type GutterInstallationCityContent = {
  intro: string;
  localConditions: string[];
};

export const gutterInstallationCityContent: Record<string, GutterInstallationCityContent> = {
  hamilton: {
    intro:
      "Whether you're replacing gutters original to a Hamilton century home or upgrading a newer build that was fitted with an undersized system, we fabricate seamless eavestrough on site to fit your roofline exactly.",
    localConditions: [
      "Older homes around Westdale and Kirkendall were often built with gutter systems that are simply too small for how much roof area they're draining, which is part of why they overflow even when they're clear of debris. A proper installation means sizing the gutters and downspouts to the actual roof, not just matching what was there before.",
      "In newer areas like Waterdown, we see the opposite problem less often but it still happens, a system installed quickly during construction without being pitched correctly. A fresh installation is a chance to get the slope and hanger spacing right from the start.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside exposure means a new gutter system here needs to handle more wind load than most, which is something we account for in hanger spacing and bracket choice during installation.",
    localConditions: [
      "Homes near Fifty Point and Community Beach take more direct wind off the lake, and a gutter system installed without that in mind tends to need repairs again within a few years. We space hangers tighter on exposed elevations for exactly this reason.",
      "Properties with heavier tree cover around Winona are also good candidates for gutter guards installed at the same time as a new system, worth discussing if you're tired of frequent cleanings.",
    ],
  },
  burlington: {
    intro:
      "Burlington's mix of long-established neighbourhoods and newer construction means we install everything from full replacements on original 1960s-era gutters to upgrades on homes that just need a properly sized system.",
    localConditions: [
      "Older homes near Roseland often have sectional gutters from decades ago, prone to exactly the seam leaks a seamless aluminum system eliminates since there are no joints along the straight runs.",
      "In newer construction around Millcroft and Aldershot, replacement is less about age and more about correcting an undersized original install, we measure actual roof area rather than just matching the existing gutter size.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger rooflines mean more linear footage of gutter and more roof area draining into each downspout, both of which matter for sizing a new system correctly.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands tend to have more roof surface than a standard subdivision home, and a downspout sized for a smaller house won't keep up during a heavy summer storm. We calculate drainage capacity based on your actual roof, not a one-size-fits-all default.",
      "Mature tree cover throughout the area is also a good reason to consider gutter guards as part of a new installation, reducing how often the system needs cleaning down the road.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and a lot of our installation work here is replacing original systems that have simply reached the end of their service life.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley often still have the gutters they were built with, which after enough decades means rust-through, failed seams, and sections that have been patched more than once. A full seamless replacement solves all of that at once instead of chasing individual repairs.",
      "The valley setting means more shade and slower drying, so we pay particular attention to proper slope during installation to avoid standing water that would otherwise sit longer than it would in a sunnier location.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a good share of our installation work is full replacements on gutters that have outlived their usefulness rather than new construction.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with original or early-replacement gutter systems well past their expected lifespan. Once a system is rusting through in multiple spots, a seamless replacement is almost always more cost-effective than ongoing patch repairs.",
      "Proximity to the Grand River also means more humidity, which is worth factoring into material choice, aluminum resists corrosion far better than older galvanized steel systems still found on some older homes here.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location means wind exposure is a bigger factor in gutter installation here than almost anywhere else in our service area.",
    localConditions: [
      "Wind coming off the escarpment and the lake is hard on gutter systems that weren't installed with extra bracket support, which is standard practice on every installation we do near Grimsby on the Lake.",
      "The area's orchards and mature trees also make gutter guards a popular add-on here, installed at the same time as a new system to cut down on seasonal debris buildup from day one.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have a lot of homes due for a full gutter replacement, and newer builds across the city benefit from properly sized systems from the start.",
    localConditions: [
      "Port Dalhousie and Western Hill have many homes with gutters original to the house, and once seams start failing across multiple sections, a full seamless replacement is usually the better long-term investment over repeated spot repairs.",
      "Canal and lake humidity means material choice matters here too, we install seamless aluminum specifically because it won't corrode the way older galvanized systems do over time.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, which we factor into material choice and sealing on every gutter installation here.",
    localConditions: [
      "The mist generated by the falls extends well beyond the immediate tourist corridor, meaning homes throughout Chippawa and Stamford see more moisture exposure than a typical location, another reason seamless aluminum holds up better here than older gutter materials.",
      "Properties closer to the tourist area also tend to have more general airborne debris, making a gutter guard add-on worth considering at installation time.",
    ],
  },
};

const signsPool = [
  "Visible rust spots, holes, or corrosion in the gutter material itself",
  "Multiple sections with failed or leaking seams",
  "Gutters that overflow even when completely clear of debris",
  "Cracking, warping, or separating at several points along the run",
  "A system that's been patched or repaired more than once already",
  "Gutters that are visibly too small for the size of your roof",
];

const processSteps = [
  {
    number: "01",
    title: "On-Site Measurement",
    text: "We measure your actual roofline and calculate drainage capacity based on roof area, not a generic gutter size, so downspouts can keep up with real rainfall.",
  },
  {
    number: "02",
    title: "Remove the Old System",
    text: "Existing gutters, brackets, and downspouts are removed and hauled away, and we check the fascia board underneath for any damage that needs addressing first.",
  },
  {
    number: "03",
    title: "On-Site Fabrication",
    text: "Seamless aluminum eavestrough is formed on site to the exact length needed for each run, eliminating the seams that are the most common failure point on older systems.",
  },
  {
    number: "04",
    title: "Installation",
    text: "Gutters are hung with properly spaced brackets and the correct pitch toward each downspout, with gutter guards added at this stage if you've chosen that option.",
  },
  {
    number: "05",
    title: "Final Walkthrough",
    text: "We test water flow through the full system and walk the property with you to confirm everything's draining the way it should before calling the job done.",
  },
];

const problemsPool = [
  {
    title: "Undersized for the Roof",
    text: "A gutter sized for a smaller roof than what it's actually draining will overflow during heavy rain no matter how clean it is.",
  },
  {
    title: "Rust & Corrosion",
    text: "Older galvanized steel systems eventually rust through, especially in sections that hold standing water, and patching only buys time.",
  },
  {
    title: "Too Many Seams",
    text: "Sectional gutters have a joint every few feet, and every joint is a potential leak point, which is exactly what a seamless system eliminates.",
  },
  {
    title: "Failing Fascia Boards",
    text: "Years of overflow or leaks can rot the fascia board a gutter is mounted to, which needs repair before a new system goes up, not after.",
  },
  {
    title: "Outdated Downspout Placement",
    text: "Downspouts positioned without accounting for drainage near the foundation can direct water right where you don't want it.",
  },
  {
    title: "No Gutter Guards",
    text: "Homes with heavy tree cover and no guards deal with far more frequent clogging than systems installed with guards from the start.",
  },
];

const faqPool = (areaName: string) => [
  {
    q: `How much does gutter installation cost in ${areaName}?`,
    a: "Cost depends on the linear footage of your home, the number of downspouts needed, and whether you add gutter guards. We measure on site and give you a clear, itemized quote rather than a rough estimate.",
  },
  {
    q: "How long does a gutter installation take?",
    a: "Most residential installations are completed in a single day, including removal of the old system, since the new seamless gutter is fabricated on site to the exact lengths needed.",
  },
  {
    q: "What's the difference between seamless and sectional gutters?",
    a: "Seamless gutters are formed on site in continuous lengths with no joints along straight runs, which means far fewer places for a leak to start compared to sectional gutters assembled from shorter pre-cut pieces.",
  },
  {
    q: "Should I repair my old gutters or replace them?",
    a: "If the gutter material itself is sound and the issue is isolated, repair usually makes sense. If you're seeing rust-through, multiple failed seams, or a system that's clearly undersized for your roof, a full replacement is typically more cost-effective than repeated repairs.",
  },
  {
    q: "Do you install gutter guards?",
    a: "Yes, gutter guards can be added during a new installation or fitted to an existing system, and they significantly cut down on how often gutters need cleaning, especially on properties with mature trees.",
  },
  {
    q: "What material do you install?",
    a: "We install seamless aluminum eavestrough, which resists corrosion far better than older galvanized steel systems and holds up well through Ontario's freeze-thaw winters.",
  },
  {
    q: "Will you also repair or replace the fascia board?",
    a: "If we find fascia damage during removal of the old system, we'll flag it and quote the repair before installing the new gutters, since mounting a new system to a damaged fascia board isn't a good long-term fix.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every installation is completed by trained, experienced crews.",
  },
  {
    q: "Do you offer a warranty on new gutter installations?",
    a: "Yes, we stand behind our installation work. Ask us for the specifics when you book your quote so you know exactly what's covered.",
  },
  {
    q: `How do I know what size gutters my ${areaName} home needs?`,
    a: "It comes down to your roof's square footage and pitch, not the size of gutter you currently have. We calculate this on site during the free measurement visit so the new system is actually sized to handle your roof's real drainage needs.",
  },
];

export type GutterInstallationArchetype = 0 | 1 | 2;

export function getArchetype(index: number): GutterInstallationArchetype {
  return (index % 3) as GutterInstallationArchetype;
}

export function gutterInstallationFaqs(area: ServiceArea, index: number, count = 7) {
  const pool = faqPool(area.name);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function gutterInstallationSigns(index: number) {
  const start = index % signsPool.length;
  return [...signsPool.slice(start), ...signsPool.slice(0, start)];
}

export function gutterInstallationProblems(index: number, count = 6) {
  const start = index % problemsPool.length;
  const rotated = [...problemsPool.slice(start), ...problemsPool.slice(0, start)];
  return rotated.slice(0, count);
}

export { processSteps as gutterInstallationProcessSteps };

export function gutterInstallationIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our gutter installation work in ${area.name} covers everything from full replacements to new systems sized correctly for your roof.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, choose us for seamless eavestrough installation built to last.`,
  ];
  return pickByIndex(variants, index);
}
