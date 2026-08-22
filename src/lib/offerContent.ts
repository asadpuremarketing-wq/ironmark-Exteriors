import type { ServiceArea } from "./data";

/**
 * Deterministically varies content, section order, and phrasing across the
 * gutter/window/pressure-washing city landing pages so the ~21 pages
 * (3 services x 7 cities) aren't near-duplicates of each other with only the
 * city name swapped, which risks Google treating them as thin/duplicate
 * content and suppressing them from ranking. Every function here is keyed
 * off the area's position in the offer's area list, so the same city always
 * gets the same variant (stable across builds) but different cities/services
 * get genuinely different wording, order, and local detail.
 */

export function pickByIndex<T>(items: T[], index: number): T {
  return items[index % items.length];
}

/** "commonly serving neighbourhoods like X, Y and Z" using real local names. */
export function neighbourhoodLine(area: ServiceArea): string {
  const [a, b, c] = area.neighbourhoods;
  if (c) return `${a}, ${b} and ${c}`;
  if (b) return `${a} and ${b}`;
  return a;
}

const introVariants = (serviceLower: string, area: ServiceArea) => [
  `${area.blurb} That includes ${serviceLower} for homes in and around ${neighbourhoodLine(area)}.`,
  `Homeowners across ${area.name}, including ${neighbourhoodLine(area)}, count on Ironmark Exteriors for ${serviceLower}. ${area.blurb}`,
  `${area.blurb} From ${neighbourhoodLine(area)} to every corner of ${area.name}, our crews show up on time and leave the job site clean.`,
];

export function introParagraph(serviceLower: string, area: ServiceArea, index: number): string {
  return pickByIndex(introVariants(serviceLower, area), index);
}

const whyChooseVariants = (serviceLower: string, area: ServiceArea) => [
  `Ironmark Exteriors keeps homes across ${area.name} looking their best with fast, affordable ${serviceLower} backed by licensed, insured crews. We show up when we say we will and leave your property exactly as we found it, just cleaner.`,
  `Booking ${serviceLower} in ${area.name} shouldn't be complicated. We quote clearly upfront, schedule around your day, and send trained crews who treat your property with care from ${neighbourhoodLine(area)} to the rest of ${area.name}.`,
  `${area.name} homeowners choose Ironmark Exteriors because we're local, licensed, and insured, with a track record of dependable ${serviceLower} across the region. No surprise fees, no rushed work.`,
];

export function whyChooseParagraph(serviceLower: string, area: ServiceArea, index: number): string {
  return pickByIndex(whyChooseVariants(serviceLower, area), index);
}

const bookingVariants = [
  "Book online in minutes and we'll confirm a time that works for you, most jobs are completed the same week.",
  "Send us a quick request and we'll follow up within 1 business hour to lock in a date, usually within a few days.",
  "Request your free quote below. We'll reach out promptly to confirm scheduling and answer any questions before the crew arrives.",
];

export function bookingLine(index: number): string {
  return pickByIndex(bookingVariants, index);
}

/**
 * Rotates a FAQ pool per city so pages don't all show the identical
 * question set in the identical order. Returns `count` questions starting
 * at a rotating offset.
 */
export function rotateFaqs<T>(pool: T[], index: number, count: number): T[] {
  const start = index % pool.length;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  return rotated.slice(0, count);
}
