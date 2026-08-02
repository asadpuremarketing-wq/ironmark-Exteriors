import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import { blogPosts } from "@/lib/blog";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | Roofing, Siding & Home Exterior Tips",
  description: `Practical tips on roofing, siding, gutters, painting, and home exterior maintenance from ${business.name}, serving Hamilton, ON and surrounding areas.`,
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <>
      <Hero
        eyebrow="Resources"
        title="Home Exterior Tips & Advice"
        subtitle="Practical, no-nonsense guidance on roofing, siding, gutters, painting, and maintaining your home's exterior in Hamilton's climate."
        showCta={false}
        showTrustRow={false}
      />

      <section className="section-y bg-white">
        <div className="container-max grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-navy-900/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-navy-900/10"
            >
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue">
                {post.category}
              </span>
              <h2 className="mb-2 font-heading text-lg font-bold text-navy-900">
                {post.title}
              </h2>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-navy-900/70">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-navy-900/50">
                <span>{formatDate(post.publishedDate)}</span>
                <span>{post.readTime}</span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                Read more
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-1" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
