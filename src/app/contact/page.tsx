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
        subtitle="Fill out the form below or reach out directly, we'll get back to you promptly to schedule your free, no-obligation estimate."
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
              <li>
                <div className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                  Follow Us
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <a
                    href={business.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.name} on Instagram`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/10 text-navy-900/70 transition hover:border-brand-blue hover:text-brand-blue"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                    </svg>
                  </a>
                  <a
                    href={business.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.name} on Facebook`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/10 text-navy-900/70 transition hover:border-brand-blue hover:text-brand-blue"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M14 9h2.5V6h-2.5c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2c0-.55.45-1 1-1z" />
                    </svg>
                  </a>
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

      <section className="pb-14 sm:pb-20">
        <div className="container-max">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-navy-900">Find Us on Google</h2>
            <a
              href={business.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-6 py-3 text-sm font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              View on Google Maps
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-navy-900/10 shadow-sm">
            <iframe
              title={`${business.name} on Google Maps`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${business.address}, ${business.city}`)}&output=embed`}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
