import type { ServiceArea } from "./data";
import { pickByIndex, neighbourhoodLine } from "./offerContent";

/**
 * Deterministically varies content and section order across the 9 generic
 * /service-areas/[slug] pages so they aren't near-duplicates of each other
 * with only the city name swapped. Keyed by the area's position in
 * `serviceAreas`, so the same city always gets the same variant.
 */

const introVariants = (area: ServiceArea) => [
  `${area.blurb} Homeowners in ${neighbourhoodLine(area)} and throughout ${area.name} count on us for work that holds up through every season.`,
  `From ${neighbourhoodLine(area)} to every corner of ${area.name}, Ironmark Exteriors handles the exterior projects homeowners put off for too long, done right the first time.`,
  `${area.blurb} We're a familiar name around ${neighbourhoodLine(area)}, known for showing up on schedule and leaving properties clean.`,
];

export function areaIntroParagraph(area: ServiceArea, index: number): string {
  return pickByIndex(introVariants(area), index);
}

const localNoteVariants = (area: ServiceArea) => [
  `${area.name}'s mix of older character homes and newer builds, especially around ${neighbourhoodLine(area)}, means every property needs its own approach. We inspect before we quote, so you're never paying for work you don't need.`,
  `Properties around ${neighbourhoodLine(area)} see their share of wind, freeze-thaw cycles, and heavy tree cover, all of which take a toll on roofs, siding, and gutters. Regular maintenance in ${area.name} goes a long way toward avoiding costly repairs.`,
  `Whether your home is in ${neighbourhoodLine(area)} or elsewhere in ${area.name}, our crews are familiar with the local permit requirements and building styles common to the area, so projects move faster with fewer surprises.`,
];

export function areaLocalNote(area: ServiceArea, index: number): string {
  return pickByIndex(localNoteVariants(area), index);
}

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
    a: "Yes. Ironmark Exteriors is fully licensed and insured, and every job is completed by trained, experienced crews.",
  },
  {
    q: `How quickly can you start a project in ${area.name}?`,
    a: "Scheduling depends on the season and project size, but most estimates are booked within a few days and jobs are scheduled shortly after you approve a quote.",
  },
  {
    q: "What exterior services do you provide?",
    a: "Roofing, siding, gutter cleaning, window cleaning, painting, and pressure washing, for both routine maintenance and full replacements or installations.",
  },
];

export function areaFaqs(area: ServiceArea, index: number, count = 4) {
  const pool = areaFaqPool(area);
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}
