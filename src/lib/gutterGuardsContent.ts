import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /gutter-guards/[area] pages.
 * Same approach as the other gutter-service content libs: hand-written
 * per-city content plus a structural archetype assigned by city index.
 */

export type GutterGuardsCityContent = {
  intro: string;
  localConditions: string[];
};

export const gutterGuardsCityContent: Record<string, GutterGuardsCityContent> = {
  hamilton: {
    intro:
      "Hamilton's mature tree canopy, especially around older neighbourhoods, means gutters here fill with leaves and debris faster than in newer subdivisions, which is exactly the problem gutter guards are built to solve.",
    localConditions: [
      "Homes around Westdale and Kirkendall sit under decades-old tree cover, and without guards, gutters here can need clearing multiple times through the fall alone. A properly fitted guard system cuts that down to an occasional check rather than a recurring chore.",
      "In Waterdown, newer builds with less mature landscaping see less debris pressure, but guards are still worth it for homeowners who'd rather not think about gutter maintenance at all.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's wind exposure off Lake Ontario means debris gets blown into gutters from a wider radius than homes further inland, making guards a practical upgrade even on properties without heavy tree cover directly overhead.",
    localConditions: [
      "Properties near Winona with mature trees are the clearest candidates for guards, cutting down significantly on the leaf and needle buildup that otherwise accumulates through fall.",
      "Even homes closer to Fifty Point and Community Beach benefit, since wind carries debris from neighbouring properties into gutters that wouldn't otherwise collect much on their own.",
    ],
  },
  burlington: {
    intro:
      "Burlington's older, tree-lined streets are some of the best candidates for gutter guards in our entire service area, where unprotected gutters can fill with debris within weeks during peak fall leaf drop.",
    localConditions: [
      "Homes near Roseland under mature tree canopy see the heaviest debris load in the city, and guards here typically cut cleaning frequency from several times a year down to an occasional check.",
      "Newer construction in Millcroft and Aldershot has less overhead tree cover, but guards still reduce the fine grit and shingle debris that accumulates over time, extending how long a gutter system performs well.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger, tree-covered properties mean more roofline and more overhead debris pressure, both strong reasons to consider gutter guards as part of a new or existing gutter system.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often back onto larger treed lots, and longer gutter runs under heavy canopy are exactly where guards make the biggest practical difference.",
      "Guards are also a smart addition anytime we're already installing or replacing a gutter system here, since fitting them during installation is more efficient than adding them separately later.",
    ],
  },
  dundas: {
    intro:
      "Dundas's valley setting and mature tree cover mean gutters here collect debris quickly and dry out slowly, a combination that gutter guards address directly by keeping leaves and needles from accumulating in the first place.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley under heavy tree canopy are prime candidates, since the valley's reduced airflow means debris that does get in tends to sit and decompose rather than wash through.",
      "Guards here pay off especially in fall, when leaf drop from the surrounding escarpment forest can overwhelm an unprotected gutter system within a single storm.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older neighbourhoods near the Grand River combine mature trees with aging gutter systems, and guards are one of the most cost-effective upgrades we recommend when a system is otherwise in good shape.",
    localConditions: [
      "Streets in Eagle Place and Holmedale under heavy tree cover see some of the fastest debris buildup in our service area, and guards installed on an existing sound gutter system extend its useful life by reducing standing debris and moisture.",
      "River proximity also means more humidity, and trapped wet debris in an unprotected gutter accelerates corrosion, another reason guards are worth considering here specifically.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's orchards and escarpment tree cover create some of the heaviest seasonal debris loads in our service area, making gutter guards a particularly practical investment for homeowners here.",
    localConditions: [
      "Properties near the escarpment and Grimsby on the Lake deal with both wind-blown debris and direct leaf drop from nearby trees, a combination guards handle well by blocking debris while still letting water through.",
      "The orchards throughout the area also shed blossoms and leaves earlier in the season than typical shade trees, meaning gutters here can start collecting debris well before the usual fall cleaning season.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have mature tree cover that makes gutter guards a practical upgrade, especially on homes where we're already addressing other gutter issues.",
    localConditions: [
      "Port Dalhousie and Western Hill have established tree canopy that drops substantial debris each fall, and guards installed here typically cut the need for cleaning down to an occasional inspection.",
      "Canal and lake humidity also means wet, trapped debris causes more damage over time than it would in a drier climate, another reason guards are worth pairing with any gutter repair or cleaning work in this area.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with both tree debris and extra ambient moisture from the falls, a combination that makes gutter guards especially effective at reducing maintenance here.",
    localConditions: [
      "Homes throughout Chippawa and Stamford under mature tree cover see regular debris buildup, and guards keep that debris from accumulating and holding moisture against the gutter material.",
      "The added humidity from the falls means any debris that does make it past an unguarded gutter stays wet longer, accelerating wear, which is part of why guards tend to pay for themselves faster in this specific area.",
    ],
  },
};

const signsPool = [
  "You're cleaning gutters more than twice a year just to keep up",
  "Visible sagging from the weight of accumulated wet leaves and debris",
  "Water overflowing during rain even shortly after a cleaning",
  "Plants or small trees sprouting from accumulated debris in the gutter",
  "Ice buildup at the roofline during winter from trapped debris and moisture",
  "Pests or nesting activity in debris-filled gutter sections",
];

const processSteps = [
  {
    number: "01",
    title: "Assessment",
    text: "We inspect your current gutters, tree cover, and debris patterns to recommend the right guard type for your specific property.",
  },
  {
    number: "02",
    title: "Gutter Prep",
    text: "Existing gutters are cleaned and checked for damage, since guards work best installed over a gutter system that's already in good condition.",
  },
  {
    number: "03",
    title: "Guard Installation",
    text: "Guards are fitted and secured along the full gutter run, sized and positioned to shed debris while letting water flow through underneath.",
  },
  {
    number: "04",
    title: "Flow Test",
    text: "We run water through the system to confirm it drains properly with the guards in place before considering the job done.",
  },
  {
    number: "05",
    title: "Walkthrough",
    text: "We show you what to expect going forward and how much less frequently you'll need a gutter cleaning with guards installed.",
  },
];

const problemsPool = [
  {
    title: "Frequent Clogging",
    text: "Unprotected gutters under tree cover can clog multiple times per season, guards cut this down dramatically by blocking debris at the source.",
  },
  {
    title: "Overflow During Rain",
    text: "A clogged gutter overflows even in moderate rain, directing water straight down the siding or foundation instead of through the downspout.",
  },
  {
    title: "Ice Damming Risk",
    text: "Debris-clogged gutters hold water that freezes in winter, contributing to ice dams that can back water up under shingles.",
  },
  {
    title: "Pest Activity",
    text: "Standing debris in a gutter is an attractive nesting spot for birds and insects, something a properly fitted guard largely prevents.",
  },
  {
    title: "Premature Gutter Wear",
    text: "Wet debris sitting in a gutter accelerates corrosion and seam failure, shortening the lifespan of an otherwise good system.",
  },
  {
    title: "The Cost of Frequent Cleanings",
    text: "Multiple cleanings a year add up, guards are often a better long-term value than paying for repeated service calls on a high-debris property.",
  },
];

const faqPool = (areaName: string) => [
  {
    q: `How much does gutter guard installation cost in ${areaName}?`,
    a: "Cost depends on the linear footage of your gutters and the type of guard system you choose. We assess your property and give you a clear quote, factoring in how much maintenance savings you can expect.",
  },
  {
    q: "Do gutter guards really eliminate the need for cleaning?",
    a: "They significantly reduce it, but not entirely. Fine debris and grit can still accumulate over time, so most homeowners go from cleaning several times a year to an occasional check every year or two.",
  },
  {
    q: "Can gutter guards be installed on my existing gutters?",
    a: "Yes, in most cases. We inspect your current gutters first, since guards work best on a system that's structurally sound, if we find damage, we'll address that before or during installation.",
  },
  {
    q: "Will gutter guards work with heavy tree cover?",
    a: "Yes, that's exactly the situation guards are most valuable for. We recommend guard types suited to the specific debris, fine pine needles need a different mesh than broad leaves, based on your property's tree cover.",
  },
  {
    q: "Do gutter guards help prevent ice dams?",
    a: "They help indirectly, by keeping debris from accumulating and holding water that would otherwise freeze. They're not a complete ice dam solution on their own, but they reduce one contributing factor.",
  },
  {
    q: "How long does gutter guard installation take?",
    a: "Most residential installations are completed in a single day, including any necessary gutter cleaning or minor repairs beforehand.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every gutter guard installation is completed by trained, experienced crews.",
  },
  {
    q: "Do you offer a free assessment before quoting?",
    a: "Yes, we look at your gutters and surrounding trees in person before recommending a guard type and quoting the work.",
  },
  {
    q: "What type of gutter guards do you install?",
    a: "We fit micro-mesh and screen-style guards suited to blocking the specific debris your property deals with, from fine pine needles to broad leaves.",
  },
  {
    q: `Is it worth installing gutter guards on a home in ${areaName}?`,
    a: "If you're dealing with heavy tree cover or finding yourself cleaning gutters more than once or twice a year, guards usually pay for themselves in reduced maintenance within a few years.",
  },
];

export type GutterGuardsArchetype = 0 | 1 | 2;

export function getArchetype(index: number): GutterGuardsArchetype {
  return (index % 3) as GutterGuardsArchetype;
}

export function gutterGuardsFaqs(area: ServiceArea, index: number, count = 7) {
  const pool = faqPool(area.name);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function gutterGuardsSigns(index: number) {
  const start = index % signsPool.length;
  return [...signsPool.slice(start), ...signsPool.slice(0, start)];
}

export function gutterGuardsProblems(index: number, count = 6) {
  const start = index % problemsPool.length;
  const rotated = [...problemsPool.slice(start), ...problemsPool.slice(0, start)];
  return rotated.slice(0, count);
}

export { processSteps as gutterGuardsProcessSteps };

export function gutterGuardsIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our gutter guard installations in ${area.name} help homeowners spend a lot less time on gutter maintenance.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, install gutter guards to cut down on how often their gutters need cleaning.`,
  ];
  return pickByIndex(variants, index);
}
