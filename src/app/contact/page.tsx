import type { Metadata } from "next";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ironmark Exteriors for a free estimate on roofing, siding, gutters, windows, painting, or pressure washing in Hamilton, ON and surrounding areas.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get In Touch"
        title="Request a Free Estimate"
        subtitle="Fill out the form below or reach out directly — we'll get back to you promptly to schedule your free, no-obligation estimate."
        showCta={false}
      />

      <section className="section-y bg-white">
        <div className="container-max grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="mb-6 text-2xl font-extrabold text-navy-900">
              Contact Information
            </h2>
            <ul className="flex flex-col gap-6">
              <li>
                <div className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                  Address
                </div>
                <div className="mt-1 text-navy-900/80">
                  {business.address}
                  <br />
                  {business.city}
                </div>
              </li>
              <li>
                <div className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                  Phone
                </div>
                <a href={business.phoneHref} className="mt-1 block text-navy-900/80 hover:text-brand-blue">
                  {business.phone}
                </a>
              </li>
              <li>
                <div className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                  Email
                </div>
                <a href={`mailto:${business.email}`} className="mt-1 block text-navy-900/80 hover:text-brand-blue">
                  {business.email}
                </a>
              </li>
              <li>
                <div className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                  Service Areas
                </div>
                <div className="mt-1 text-navy-900/80">
                  Hamilton, Stoney Creek, Burlington, Ancaster, Dundas &amp;
                  surrounding areas
                </div>
              </li>
            </ul>
          </div>

          <LeadForm
            variant="full"
            source="contact-page"
            className="relative rounded-2xl border border-navy-900/10 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8"
          />
        </div>
      </section>
    </>
  );
}
