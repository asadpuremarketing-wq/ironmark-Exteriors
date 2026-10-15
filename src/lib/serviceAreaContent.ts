import type { ServiceArea } from "./data";
import { neighbourhoodLine } from "./offerContent";

/**
 * Hand-written, genuinely unique content for each /service-areas/[slug]
 * hub page. Earlier this was a 3-variant pickByIndex rotation, which meant
 * cities 3 apart (index % 3) got literally identical paragraph text with
 * only the city name substituted in, a real duplicate-content problem.
 * Every city below has its own intro and local-note paragraph instead.
 */

export type ServiceAreaCityContent = {
  intro: string;
  localNote: string;
};

export const serviceAreaCityContent: Record<string, ServiceAreaCityContent> = {
  hamilton: {
    intro:
      "As a Hamilton-based company, Ironmark Exteriors is on these streets constantly, which means faster response times and crews who already know the difference between a Westdale character home and a newer build in Waterdown before they arrive.",
    localNote:
      "Hamilton's housing stock is genuinely mixed: century homes with original wood trim in the lower city, mid-century builds across the Mountain, and newer construction further out in Waterdown. That variety is why we inspect every property in person rather than quoting off a standard template, a repair approach that's right for a 1920s home isn't always right for a 2015 one.",
  },
  "stoney-creek": {
    intro:
      "Stoney Creek's lakeside location shapes a lot of the exterior work we do here, homes closer to the water deal with more wind and moisture than those set further back, and our crews adjust their approach accordingly.",
    localNote:
      "Properties near Fifty Point and Community Beach take more direct wind off Lake Ontario than homes further inland, which shows up as loosened gutters, siding, and roofing fasteners more often than in sheltered neighbourhoods. Areas like Winona with heavier tree cover see the opposite problem: more organic debris and moisture retention. We treat these as genuinely different maintenance profiles, not a one-size-fits-all schedule.",
  },
  burlington: {
    intro:
      "Burlington's mix of established lakeside neighbourhoods and newer subdivisions means our work here ranges from full replacements on aging original materials to smaller, targeted repairs on recently built homes.",
    localNote:
      "Older homes near Roseland often have original siding, roofing, or gutters that are simply due for a full assessment, while newer builds in Millcroft and Aldershot more often need isolated repairs after a specific storm or impact. We quote based on what we actually find on your property, not an assumption based on the neighbourhood.",
  },
  ancaster: {
    intro:
      "Ancaster's larger properties and more architecturally detailed homes, gables, dormers, mixed exterior materials, mean our crews typically spend more time on inspection and quoting here than on a standard subdivision property.",
    localNote:
      "Homes around Ancaster Village and Meadowlands often have more total exterior surface area and more complex rooflines and siding transitions than newer, simpler builds, which is part of why a project here can take longer to quote accurately. Mature tree cover throughout the area also means more seasonal debris and moisture exposure to factor into any maintenance plan.",
  },
  dundas: {
    intro:
      "Dundas has one of the higher concentrations of character homes in our service area, and matching materials, colours, and profiles on these properties takes more care than a straightforward swap on a newer home.",
    localNote:
      "Homes in Old Dundas and Pleasant Valley frequently have original or early-replacement exterior materials, siding, trim, roofing, where colour and profile matching matters more than it would on a generic modern exterior. The valley's reduced airflow and extra shade also mean moisture lingers longer here after rain than in more open, sun-exposed parts of our service area, which we factor into both repair timing and material recommendations.",
  },
  brantford: {
    intro:
      "Brantford's older housing stock near the Grand River means a meaningful share of our work here involves exteriors that have reached, or are close to, the end of their service life rather than isolated repairs.",
    localNote:
      "Streets in Eagle Place and Holmedale have plenty of homes with original siding, roofing, and gutters well into their expected lifespan, which is where a full assessment often makes more financial sense than chasing individual repairs. River proximity also adds humidity through the warmer months, which we factor into material recommendations for any replacement work.",
  },
  grimsby: {
    intro:
      "Grimsby's escarpment and lakeside position put more wind load on exterior surfaces here than almost anywhere else in our service area, which shapes how we approach everything from gutter fastening to roofing.",
    localNote:
      "Wind coming off both the escarpment and the lake puts repeated stress on gutters, siding, and roofing, particularly for homes nearer Grimsby on the Lake, which is why we check fastening and sealing details closely on every job here, not just the area a homeowner flags. The area's orchards also mean more organic debris and staining than in more urban parts of our service area.",
  },
  "st-catharines": {
    intro:
      "St. Catharines' older neighbourhoods near the Welland Canal have some of the longest-serving exterior materials in our service area, and canal humidity is a factor worth weighing in almost every material decision here.",
    localNote:
      "Port Dalhousie and Western Hill have many established homes where exterior materials have held up structurally but are due for attention after years of expansion and contraction through the seasons. Canal and lake humidity also means moisture-related issues, moss, algae, staining, tend to show up sooner here than they would further inland.",
  },
  "niagara-falls": {
    intro:
      "Niagara Falls properties deal with more ambient moisture than most of our service area, between the falls themselves and regional humidity, which is a factor we account for on every exterior project here.",
    localNote:
      "Mist from the falls settles well beyond the immediate tourist corridor, adding moisture exposure to roofing, siding, and gutters on homes throughout Chippawa and Stamford, not just those closest to the falls. That extra humidity means small issues, a loose seam, a gap in flashing, tend to show visible signs sooner here than in a drier climate, which is often the first indicator something needs attention.",
  },
};

const areaFaqPool = (area: ServiceArea) => [
  {
    q: `What areas of ${area.name} do you service?`,
    a: `We serve all of ${area.name}, including ${neighbourhoodLine(area)} and the surrounding neighbourhoods. If you're unsure whether your address is covered, just reach out and ask.`,
  },
  {
    q: `Do you offer free estimates in ${area.name}?`,
    a: `Yes. Every project in ${area.name} starts with a free, no-obligation estimate so you know the full cost before any work begins.`,
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ironmark Exteriors is licensed and insured, and every job is completed by trained crews.",
  },
  {
    q: `How quickly can you start a project in ${area.name}?`,
    a: "Scheduling depends on the season and project size, but most estimates are booked within a few days and jobs are scheduled shortly after you approve a quote.",
  },
  {
    q: "What exterior services do you provide?",
    a: "Roofing, siding repair, gutter cleaning, repair, installation and guards, downspout repair, soffit and fascia repair, window cleaning, painting, and pressure washing, for both routine maintenance and full replacements or installations.",
  },
  {
    q: "Can I send photos instead of booking an in-person estimate first?",
    a: "For most repair-type work, yes, photos of the issue plus a wide shot of where it is on the house let us give you a realistic starting estimate before confirming anything in person.",
  },
];

export function areaFaqs(area: ServiceArea, index: number, count = 5) {
  const pool = areaFaqPool(area);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}

export function areaIntroParagraph(area: ServiceArea): string {
  return serviceAreaCityContent[area.slug]?.intro ?? area.blurb;
}

export function areaLocalNote(area: ServiceArea): string {
  return (
    serviceAreaCityContent[area.slug]?.localNote ??
    `Properties around ${neighbourhoodLine(area)} and the rest of ${area.name} each have their own maintenance needs, which is why we inspect before we quote rather than pricing off a generic template.`
  );
}
