import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/breadcrumb";

/** Visible breadcrumb trail matching the schema.org BreadcrumbList already emitted on the page. */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="border-b border-navy-900/5 bg-white">
      <div className="container-max">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-3 text-xs text-navy-900/40">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          {items.map((item) => (
            <span key={item.path} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link href={item.path} className="hover:text-brand-blue">{item.name}</Link>
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
