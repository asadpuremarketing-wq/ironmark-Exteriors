import type { MetadataRoute } from "next";
import { business, services, serviceAreas, gutterCleaningAreaSlugs } from "@/lib/data";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: s.slug === "gutters" ? "weekly" : "monthly",
    priority: s.slug === "gutters" ? 1 : 0.9,
  }));

  const areaRoutes: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${base}/service-areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Note: /gutter-cleaning (no city) 308-redirects to /services/gutters
  // (see next.config.ts) and is intentionally not listed here — only the
  // city-specific pages are separate indexable URLs.
  const gutterCleaningRoutes: MetadataRoute.Sitemap = gutterCleaningAreaSlugs.map((slug) => ({
    url: `${base}/gutter-cleaning/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...gutterCleaningRoutes, ...blogRoutes];
}
