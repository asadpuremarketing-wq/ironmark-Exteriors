import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /window-cleaning/[area] pages.
 * Same pattern as the other premium service clusters: hand-written
 * per-city intro/quick-answer/local-conditions, plus pooled content that
 * rotates and partially selects by city index, combined with a 3-way
 * structural archetype.
 */

export type WindowCleaningCityContent = {
  intro: string;
  quickAnswer: string;
  localConditions: string[];
};

export const windowCleaningCityContent: Record<string, WindowCleaningCityContent> = {
  hamilton: {
    intro:
      "Hamilton's mix of century homes with original wood-frame windows and newer builds with larger picture windows means our crews adjust technique from house to house, not just run the same routine everywhere.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Hamilton, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Service includes glass, sills, and tracks, with screens cleaned on request. Free estimates are available throughout Hamilton.",
    localConditions: [
      "Older homes around Westdale and Kirkendall often have original wood-frame windows with narrower sills, which take a bit more care around the trim than a newer vinyl-framed window.",
      "Industrial dust and general city grime settle on glass faster in parts of the lower city than in greener, more residential pockets like Waterdown, which is part of why a twice-yearly schedule keeps windows looking their best.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside location means windows here pick up salt spray and wind-blown residue that homes further inland don't deal with, especially on sides of the house facing the water.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Stoney Creek, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Lake-facing windows often benefit from more frequent cleaning due to wind-blown residue. Free estimates are available throughout Stoney Creek.",
    localConditions: [
      "Homes near Fifty Point and Community Beach face more direct wind off Lake Ontario, which carries residue onto window glass faster than on homes set further back from the shoreline.",
      "Properties around Winona with more tree cover also deal with pollen and sap buildup seasonally, which is worth factoring into how often windows need a proper clean.",
    ],
  },
  burlington: {
    intro:
      "Burlington's range of established and newer neighbourhoods means window sizes and styles vary a lot from house to house, which is part of why we quote based on your actual windows rather than a generic flat rate beyond the base price.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Burlington, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Free estimates are available throughout Burlington.",
    localConditions: [
      "Homes near Roseland often have larger, older windows with more individual panes, which take longer to clean thoroughly than a single large modern pane.",
      "In newer areas like Millcroft and Aldershot, floor-to-ceiling windows are common, which look great but show streaks and smudges more noticeably than smaller windows.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger homes often have more windows per property and more varied styles, bay windows, transoms, which means a cleaning job here usually takes longer than a standard subdivision home.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Ancaster, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Free estimates are available throughout Ancaster.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often have bay windows and transom details that take extra care to clean properly without streaking.",
      "Mature tree cover throughout the area means more pollen, sap, and leaf debris on window exteriors seasonally than on more open properties.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and original windows here often have more individual panes than a modern window, which changes how long a thorough cleaning takes.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Dundas, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Free estimates are available throughout Dundas.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley often have original multi-pane windows, which take more time to clean properly than a single large pane but make a noticeable difference once done.",
      "The valley's extra shade and tree cover also means more organic residue on glass seasonally than in more open, sun-exposed parts of our service area.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a lot of original windows that haven't been professionally cleaned in a while, which is usually the biggest factor in how long a first visit takes.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Brantford, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Free estimates are available throughout Brantford.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with original windows that build up noticeable grime over the years without regular cleaning.",
      "Proximity to the Grand River adds humidity through the warmer months, which can leave windows looking hazy faster than in a drier inland location.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location mean windows here take more wind-blown dust and residue than in more sheltered inland neighbourhoods.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Grimsby, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Free estimates are available throughout Grimsby.",
    localConditions: [
      "Wind off the escarpment and the lake carries dust and residue onto window glass faster than on homes further inland, particularly near Grimsby on the Lake.",
      "The area's orchards also mean more seasonal pollen and organic residue on window exteriors than in more urban parts of our service area.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have a lot of homes with original windows, and canal humidity means glass here can look hazy sooner than in a drier inland location.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in St. Catharines, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Free estimates are available throughout St. Catharines.",
    localConditions: [
      "Port Dalhousie and Western Hill have many established homes with original windows that benefit from a thorough interior and exterior clean, not just a quick exterior rinse.",
      "Canal and lake humidity means window glass here tends to show water spotting and haze faster than it would further inland.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, between the falls themselves and regional humidity, which affects how often windows need cleaning to stay streak-free.",
    quickAnswer:
      "Ironmark Exteriors provides interior and exterior window cleaning for homes in Niagara Falls, Ontario, starting at $149 for 1-storey homes and $199 for 2-storey homes. Free estimates are available throughout Niagara Falls.",
    localConditions: [
      "Mist from the falls settles well beyond the immediate tourist corridor, adding moisture and mineral spotting to windows on homes throughout Chippawa and Stamford.",
      "That extra humidity means windows here tend to show water spotting sooner than in a drier climate, which is part of why regular cleaning makes a bigger visible difference.",
    ],
  },
};

export const windowCleaningIncludedPool = [
  { title: "Interior & Exterior Glass", key: "glass", image: "/images/window-cleaning/interior-exterior-glass.jpg", text: "Every pane cleaned inside and out for a genuinely streak-free finish." },
  { title: "Sill & Track Wipe-Down", key: "sills", image: "/images/window-cleaning/sill-track.jpg", text: "Sills and tracks cleared of dust and debris, not just the glass itself." },
  { title: "Screen Cleaning", key: "screens", image: "/images/window-cleaning/screens.jpg", text: "Screens cleaned on request so the whole window looks and functions better." },
  { title: "Streak-Free Finish", key: "streak-free", image: "/images/window-cleaning/streak-free.jpg", text: "A proper squeegee technique that leaves no streaks, even in direct sunlight." },
  { title: "Hard Water Spot Removal", key: "spots", image: "/images/window-cleaning/hard-water-spots.jpg", text: "Mineral deposits and spotting addressed, not just surface dust." },
];

const processVariants = [
  [
    { number: "01", title: "Book Online or by Phone", text: "Tell us your home size and any special requests." },
    { number: "02", title: "Interior Cleaning", text: "Glass, sills, and tracks cleaned room by room." },
    { number: "03", title: "Exterior Cleaning", text: "Exterior glass cleaned with a streak-free technique." },
    { number: "04", title: "Final Inspection", text: "We check every window before calling the job done." },
  ],
  [
    { number: "01", title: "Free Estimate", text: "A quick quote based on your home's size and windows." },
    { number: "02", title: "Prep & Protect", text: "We protect sills, floors, and landscaping before starting." },
    { number: "03", title: "Clean Inside & Out", text: "Full interior and exterior glass, sill, and track cleaning." },
    { number: "04", title: "Walkthrough", text: "A final check to confirm every window is streak-free." },
  ],
];

export function windowCleaningProcessSteps(index: number) {
  return pickByIndex(processVariants, index);
}

const faqPool = (areaName: string, oneStorey: number, twoStorey: number) => [
  {
    q: `How much does window cleaning cost in ${areaName}?`,
    a: `Window cleaning in ${areaName} starts at $${oneStorey} for a 1-storey home and $${twoStorey} for a 2-storey home. Pricing may vary based on the number, size, and accessibility of windows.`,
  },
  {
    q: "Do you clean the interior and exterior of the windows?",
    a: "Yes, our standard service covers both interior and exterior glass, plus sills and tracks. Screens can be cleaned on request.",
  },
  {
    q: "Do you offer window cleaning for commercial properties?",
    a: "Yes. Commercial properties are available by custom quote, contact us with your building details and we'll put together a price.",
  },
  {
    q: "How long does a typical window cleaning take?",
    a: "Most 1-storey homes take about an hour to an hour and a half. 2-storey homes and properties with more windows take longer, we'll give you a time estimate when you book.",
  },
  {
    q: "What time of year is best for window cleaning?",
    a: "Spring and fall are the most popular, but window cleaning can be done any time weather permits. Many homeowners book twice a year to keep windows consistently streak-free.",
  },
  {
    q: "Do you remove hard water spots?",
    a: "Yes, we address mineral deposits and hard water spotting as part of a standard cleaning, not just surface dust.",
  },
  {
    q: "Is Ironmark Exteriors licensed and insured?",
    a: "Yes. Ironmark Exteriors is licensed and insured, and every window cleaning job is completed by trained crews.",
  },
  {
    q: "Do I need to be home for the appointment?",
    a: "For exterior-only cleaning, not necessarily, as long as we have access. If interior cleaning is included, someone will need to be home or provide access to let us inside.",
  },
  {
    q: "Can you clean skylights or hard-to-reach windows?",
    a: "In most cases, yes. Let us know about any unusual window placements when booking so we can plan for the right equipment.",
  },
];

export type WindowCleaningArchetype = 0 | 1 | 2;

export function getArchetype(index: number): WindowCleaningArchetype {
  return (index % 3) as WindowCleaningArchetype;
}

function rotate<T>(pool: T[], index: number, count: number): T[] {
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function windowCleaningFaqs(area: ServiceArea, index: number, oneStorey: number, twoStorey: number, count = 7) {
  return rotate(faqPool(area.name, oneStorey, twoStorey), index, count);
}

export function windowCleaningIncluded(index: number) {
  return rotate(windowCleaningIncludedPool, index, windowCleaningIncludedPool.length);
}

export function windowCleaningIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our window cleaning in ${area.name} covers both interior and exterior glass.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, book us for a streak-free clean inside and out.`,
  ];
  return pickByIndex(variants, index);
}
