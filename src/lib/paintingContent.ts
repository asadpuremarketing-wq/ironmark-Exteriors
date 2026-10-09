import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Content and structural-layout data for the /painting/[area] pages. Same
 * pattern as roofingContent.ts and siding-repair's content lib: hand-written
 * per-city intro/quick-answer/local-conditions, plus pooled content that
 * gets rotated and partially selected by city index, combined with a
 * 3-way structural archetype, so the 9 pages are genuinely different.
 */

export type PaintingCityContent = {
  intro: string;
  quickAnswer: string;
  localConditions: string[];
};

export const paintingCityContent: Record<string, PaintingCityContent> = {
  hamilton: {
    intro:
      "Hamilton's mix of century homes and newer builds means paint jobs here range from careful prep work on original wood trim to a straightforward refresh on newer siding and fascia.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Hamilton, Ontario, including siding, trim, fascia, soffit, and deck or fence staining. Work includes surface prep, priming, and premium exterior-grade coatings. Free on-site estimates and colour consultations are available throughout Hamilton.",
    localConditions: [
      "Older homes around Westdale and Kirkendall often have original wood trim and fascia that needs scraping and priming before paint will hold, more prep work than a newer home typically needs.",
      "South- and west-facing walls across Hamilton see more direct sun, which fades and chalks paint faster than on shaded sides, something worth factoring into how often a repaint is needed.",
    ],
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside wind and moisture exposure means exterior paint here can wear faster on walls facing the lake than on more sheltered sides of the same house.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Stoney Creek, Ontario, including siding, trim, fascia, soffit, and deck or fence staining. Lake-facing walls often need more frequent attention due to wind and moisture exposure. Free on-site estimates are available throughout Stoney Creek.",
    localConditions: [
      "Homes near Fifty Point and Community Beach face more direct wind and moisture off Lake Ontario, which can accelerate paint wear on lake-facing walls compared to the rest of the house.",
      "Properties around Winona with more tree cover also see more organic staining and mildew on shaded walls, worth addressing as part of surface prep before repainting.",
    ],
  },
  burlington: {
    intro:
      "Burlington's range of established and newer neighbourhoods means paint jobs here span full exterior repaints on older homes to a focused refresh on trim and accents for newer builds.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Burlington, Ontario, including siding, trim, fascia, soffit, and deck or fence staining. Free on-site estimates and colour consultations are available throughout Burlington.",
    localConditions: [
      "Older homes near Roseland often need more extensive prep, scraping peeling paint and priming bare wood, before a fresh coat will hold properly.",
      "In newer areas like Millcroft and Aldershot, painting work is often focused on trim, fascia, and accent features rather than a full exterior repaint.",
    ],
  },
  ancaster: {
    intro:
      "Ancaster's larger homes with more architectural detail, gables, dormers, multiple trim profiles, mean a paint job here usually takes more careful prep and cutting-in than a standard subdivision home.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Ancaster, Ontario, with particular attention to the trim and architectural detail common on larger homes. Free on-site estimates and colour consultations are available throughout Ancaster.",
    localConditions: [
      "Properties around Ancaster Village and Meadowlands often feature more trim detail and mixed surfaces, which take more time to prep and cut in cleanly than a simple single-surface exterior.",
      "Mature tree cover throughout the area adds shade and moisture to certain walls, which can encourage mildew growth worth addressing during surface prep.",
    ],
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and painting work here often means matching historic trim colours and careful prep on original wood surfaces.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Dundas, Ontario, including careful prep work for older wood trim and siding common on character homes. Free on-site estimates are available throughout Dundas.",
    localConditions: [
      "Homes in Old Dundas and Pleasant Valley often have original wood trim and siding that needs thorough scraping and priming, more prep time than a newer home typically requires.",
      "The valley's reduced airflow and extra shade mean paint here can take longer to cure and is more prone to mildew growth if surfaces aren't properly prepped first.",
    ],
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a good share of our painting work involves full exterior repaints on homes where the existing paint has reached the end of its life.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Brantford, Ontario. Many of our jobs here involve full repaints on older exteriors. Free on-site estimates and colour consultations are available throughout Brantford.",
    localConditions: [
      "Streets in Eagle Place and Holmedale have plenty of homes with paint that's peeling, cracking, or chalking after years of exposure, where a full repaint with proper prep makes more sense than spot touch-ups.",
      "Proximity to the Grand River adds humidity through the warmer months, which can slow paint cure time and make mildew resistance worth discussing when choosing a coating.",
    ],
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside location mean exterior paint takes more wind and moisture exposure here than in more sheltered inland neighbourhoods.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Grimsby, Ontario. Wind and moisture exposure off the escarpment and lake are factors worth considering for coating durability here. Free on-site estimates are available throughout Grimsby.",
    localConditions: [
      "Wind and moisture coming off the escarpment and the lake can wear paint faster on exposed walls, particularly on homes nearer Grimsby on the Lake.",
      "The area's orchards and mature trees also mean more organic staining on exterior surfaces over time, something we address during surface prep.",
    ],
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have a lot of homes due for a full exterior repaint, and canal humidity is worth factoring into coating choice.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in St. Catharines, Ontario. Canal and lake humidity are factors we account for in surface prep and coating choice. Free on-site estimates are available throughout St. Catharines.",
    localConditions: [
      "Port Dalhousie and Western Hill have many established homes with original or aging paint, where a full repaint with proper prep extends the life of the finish significantly longer than a quick touch-up.",
      "Canal and lake humidity means mildew-resistant coatings are often worth the upgrade here compared to drier, more inland parts of our service area.",
    ],
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, which is a factor worth understanding before choosing an exterior coating.",
    quickAnswer:
      "Ironmark Exteriors provides exterior painting for homes in Niagara Falls, Ontario. Ambient humidity from the falls is a factor we account for in coating choice and prep. Free on-site estimates are available throughout Niagara Falls.",
    localConditions: [
      "Mist from the falls settles well beyond the immediate tourist corridor, adding moisture exposure to painted surfaces on homes throughout Chippawa and Stamford.",
      "That extra humidity means mildew-resistant coatings and thorough surface prep matter more here than in a drier inland location.",
    ],
  },
};

export const paintingProblemsPool = [
  { title: "Peeling or Cracking Paint", key: "peeling", image: "/images/painting/peeling-paint.jpg", text: "Paint that's lost adhesion and is lifting or cracking, usually a sign it's past due for a repaint." },
  { title: "Faded or Chalky Finish", key: "faded", image: "/images/painting/faded-paint.jpg", text: "Sun exposure breaks down paint over time, leaving a faded, chalky surface that rubs off on your hand." },
  { title: "Blistering Paint", key: "blistering", image: "/images/painting/blistering-paint.jpg", text: "Bubbles under the paint surface usually point to moisture trapped underneath, worth addressing before repainting." },
  { title: "Mildew & Mould Staining", key: "mildew", image: "/images/painting/mildew-staining.jpg", text: "Dark staining on shaded or moisture-prone walls, cleaned and treated as part of surface prep." },
  { title: "Bare or Exposed Wood", key: "bare-wood", image: "/images/painting/bare-wood.jpg", text: "Wood trim or siding with no remaining paint coverage, which needs priming before a topcoat will hold." },
  { title: "Caulking Failure Around Trim", key: "caulking", image: "/images/painting/caulking-failure.jpg", text: "Cracked or missing caulking at trim joints lets moisture in behind the paint film, addressed before repainting." },
];

const costFactorPool = [
  { title: "Square footage", text: "A larger home takes more material and labour time to prep and coat." },
  { title: "Surface condition", text: "Peeling or bare-wood sections need more prep than a surface already in good shape." },
  { title: "Number of coats", text: "A dramatic colour change or bare wood often needs more than one coat for even coverage." },
  { title: "Trim & accent work", text: "Detailed trim, shutters, and accent features add time beyond the main surfaces." },
  { title: "Accessibility & height", text: "Second-storey or hard-to-reach areas take more time to prep and paint safely." },
];

const repaintWhenPool = ["Paint is faded or chalky but intact", "Minor peeling in isolated spots", "A straightforward colour refresh", "Surfaces are generally sound"];
const fullPrepWhenPool = ["Paint is peeling or cracking broadly", "Bare or exposed wood in multiple areas", "Caulking has failed at several trim joints", "Mildew or moisture staining across a wall"];

export const paintingSurfaces = [
  { title: "Siding", key: "siding", image: "/images/painting/siding.jpg", text: "Full exterior siding repaints with proper prep and premium exterior-grade coatings." },
  { title: "Trim, Fascia & Soffit", key: "trim", image: "/images/painting/trim-fascia.jpg", text: "Detail work on trim, fascia, and soffit, often the first thing to show wear." },
  { title: "Deck & Fence", key: "deck", image: "/images/painting/deck-fence.jpg", text: "Staining and painting for decks and fences exposed to direct weather." },
];

const processVariants = [
  [
    { number: "01", title: "Inspection & Colour Consultation", text: "We assess the surfaces and talk through colour options." },
    { number: "02", title: "Surface Prep & Scraping", text: "Loose and peeling paint removed, surfaces cleaned." },
    { number: "03", title: "Priming", text: "Bare wood and repaired sections primed before topcoat." },
    { number: "04", title: "Painting", text: "Premium exterior-grade coatings applied with proper coverage." },
    { number: "05", title: "Final Walkthrough", text: "We review the finished work with you." },
  ],
  [
    { number: "01", title: "Free Estimate", text: "We assess the job and give you a detailed quote." },
    { number: "02", title: "Prep & Repair", text: "Caulking, scraping, and minor repairs handled before paint goes on." },
    { number: "03", title: "Prime & Paint", text: "Proper priming followed by premium coatings." },
    { number: "04", title: "Detail & Trim Work", text: "Trim, fascia, and accent features finished with care." },
    { number: "05", title: "Final Walkthrough", text: "We confirm everything looks right before wrapping up." },
  ],
];

export function paintingProcessSteps(index: number) {
  return pickByIndex(processVariants, index);
}

const faqPool = (areaName: string, neighbourhoods: string) => [
  {
    q: `How much does exterior painting cost in ${areaName}?`,
    a: "It depends on square footage, surface condition, and how much trim or accent work is involved. We give you an exact, itemized quote after an in-person assessment.",
  },
  {
    q: "How long does an exterior paint job take?",
    a: "Most homes take a few days to about a week depending on size, surface prep needed, and weather.",
  },
  {
    q: "How often should I repaint my home's exterior?",
    a: "Most exterior paint lasts 7 to 10 years depending on material, sun exposure, and coating quality, though trim and high-wear areas may need attention sooner.",
  },
  {
    q: "Do you handle surface prep and repairs before painting?",
    a: "Yes. Scraping, priming, caulking, and minor wood repairs are part of a proper paint job, not an extra step we skip.",
  },
  {
    q: "What's the best time of year for exterior painting?",
    a: "Warmer, drier months generally give paint the best conditions to cure properly, though the right window depends on the specific product and weather.",
  },
  {
    q: "Can you match my existing colour?",
    a: "Yes, we can match existing colours closely or help you choose something new during a colour consultation.",
  },
  {
    q: "Do you paint trim, fascia, and soffit separately from siding?",
    a: "We can paint any combination of surfaces, siding, trim, fascia, soffit, doors, deck, or fence, depending on what your project needs.",
  },
  {
    q: "Is Ironmark Exteriors licensed and insured?",
    a: "Yes. Ironmark Exteriors is licensed and insured for painting work throughout our service area.",
  },
  {
    q: "Do you offer a free estimate?",
    a: "Yes, we assess the surfaces in person and walk through colour and coating options before giving you a detailed, no-obligation quote.",
  },
  {
    q: "What causes paint to peel or blister?",
    a: "Moisture trapped underneath, poor surface prep on the original coat, or paint applied past its service life are the most common causes we see.",
  },
  {
    q: `What areas of ${areaName} do you service for painting?`,
    a: `We provide exterior painting throughout ${areaName}, including ${neighbourhoods} and the rest of the city.`,
  },
];

export type PaintingArchetype = 0 | 1 | 2;

export function getArchetype(index: number): PaintingArchetype {
  return (index % 3) as PaintingArchetype;
}

function rotate<T>(pool: T[], index: number, count: number): T[] {
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function paintingFaqs(area: ServiceArea, index: number, count = 8) {
  return rotate(faqPool(area.name, neighbourhoodLine(area)), index, count);
}

export function paintingProblemCards(index: number, count = 6) {
  return rotate(paintingProblemsPool, index, count);
}

export function paintingCostFactors(index: number, count = 5) {
  return rotate(costFactorPool, index, count);
}

export function paintingRepaintWhen(index: number, count = 4) {
  return rotate(repaintWhenPool, index, count);
}

export function paintingFullPrepWhen(index: number, count = 4) {
  return rotate(fullPrepWhenPool, index, count);
}

export function paintingIntroFallback(area: ServiceArea, index: number): string {
  const variants = [
    `${area.blurb} Our painting work in ${area.name} covers everything from a full exterior repaint to focused trim and accent work.`,
    `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, call us when it's time to refresh their home's exterior, whether that's full siding or just trim, fascia, and soffit.`,
  ];
  return pickByIndex(variants, index);
}
