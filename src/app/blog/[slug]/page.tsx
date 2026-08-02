import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { business, services } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${business.siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedDate,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderContent(content: string[]) {
  const nodes: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    nodes.push(
      <ul key={key} className="ml-5 flex list-disc flex-col gap-1.5">
        {listBuffer.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {item.slice(2)}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  content.forEach((block, i) => {
    if (block.startsWith("- ")) {
      listBuffer.push(block);
      return;
    }
    flushList(`list-${i}`);

    if (block.startsWith("## ")) {
      nodes.push(
        <h2 key={i} className="mt-2 font-heading text-xl font-bold text-navy-900">
          {block.slice(3)}
        </h2>
      );
    } else {
      nodes.push(
        <p key={i} className="leading-relaxed">
          {block}
        </p>
      );
    }
  });

  flushList("list-end");
  return nodes;
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedService = post.relatedService
    ? services.find((s) => s.slug === post.relatedService)
    : undefined;

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name, url: business.siteUrl },
    mainEntityOfPage: `${business.siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(47,127,214,0.35), transparent 45%)",
          }}
        />
        <div className="container-max relative max-w-3xl">
          <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand-blue/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue-light">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-brand-silver/70">
            <span>{formatDate(post.publishedDate)}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-max max-w-3xl">
          <div className="flex flex-col gap-5 text-navy-900/80">
            {renderContent(post.content)}
          </div>

          {relatedService && (
            <div className="mt-10 rounded-2xl border border-navy-900/10 bg-[#f7f9fb] p-6">
              <p className="text-sm text-navy-900/70">
                Need help with {relatedService.name.toLowerCase()}?
              </p>
              <Link
                href={`/services/${relatedService.slug}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
              >
                Learn about our {relatedService.name} services
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {otherPosts.length > 0 && (
        <section className="section-y bg-[#f7f9fb]">
          <div className="container-max">
            <h2 className="mb-8 text-center font-heading text-2xl font-extrabold text-navy-900">
              More From the Blog
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-navy-900/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lg"
                >
                  <span className="mb-2 inline-block text-xs font-bold uppercase tracking-wide text-brand-blue">
                    {p.category}
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy-900">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
