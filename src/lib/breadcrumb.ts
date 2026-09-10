import { business } from "./data";

export type BreadcrumbItem = { name: string; path: string };

/** Builds a schema.org BreadcrumbList from a Home-relative trail of pages. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  const trail: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.siteUrl}${item.path}`,
    })),
  };
}
