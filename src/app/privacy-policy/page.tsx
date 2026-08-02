import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${business.name} — how we collect, use, and protect your information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

const EFFECTIVE_DATE = "July 28, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <Hero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`Effective ${EFFECTIVE_DATE}. This policy explains how ${business.name} collects, uses, and protects your information.`}
        showCta={false}
        showTrustRow={false}
      />

      <section className="section-y bg-white">
        <div className="container-max max-w-3xl">
          <div className="flex flex-col gap-10 text-navy-900/80">
            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                {business.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
                privacy and is committed to protecting the personal information you share with us.
                This Privacy Policy explains what information we collect when you visit our website
                ({business.website}) or contact us, how we use it, and the choices you have. By
                using our website or submitting a form to request an estimate, you agree to the
                practices described in this policy.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                2. Information We Collect
              </h2>
              <p className="mb-3 leading-relaxed">
                We collect information you provide directly to us, such as when you request a free
                estimate, contact us by phone or email, or fill out a form on our website. This may
                include:
              </p>
              <ul className="ml-5 flex list-disc flex-col gap-1.5 leading-relaxed">
                <li>Your name, phone number, and email address</li>
                <li>Your property address and details about the service you&apos;re requesting</li>
                <li>Any additional information you choose to include in a message to us</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                We also automatically collect certain technical information when you visit our
                website, such as your IP address, browser type, device information, pages viewed,
                and how you interacted with our site, through the tracking technologies described
                below.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                3. How We Use Your Information
              </h2>
              <p className="mb-3 leading-relaxed">We use the information we collect to:</p>
              <ul className="ml-5 flex list-disc flex-col gap-1.5 leading-relaxed">
                <li>Contact you about your estimate request or inquiry</li>
                <li>Schedule and provide the services you request</li>
                <li>Respond to questions and provide customer support</li>
                <li>
                  Run our own marketing and advertising campaigns, including retargeting and
                  audience-building for future promotions
                </li>
                <li>Understand how visitors use our website so we can improve it</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                4. Cookies &amp; Tracking Technologies
              </h2>
              <p className="mb-3 leading-relaxed">
                We use cookies, pixels, and similar tracking technologies to understand how visitors
                use our website and to run our marketing campaigns. Specifically, we use:
              </p>
              <ul className="ml-5 flex list-disc flex-col gap-1.5 leading-relaxed">
                <li>
                  <span className="font-semibold text-navy-900">Google Local Services</span> — to
                  connect service requests submitted through Google with our business
                </li>
                <li>
                  <span className="font-semibold text-navy-900">Google Tag</span> — to measure
                  website traffic and advertising performance
                </li>
                <li>
                  <span className="font-semibold text-navy-900">Meta Pixel &amp; Meta Ads</span> —
                  to measure the performance of our Facebook and Instagram advertising and to show
                  relevant ads to people who have visited our site
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                These tools may place cookies on your device and collect information about your
                visit, which we use solely for our own marketing and advertising purposes. You can
                control or disable cookies through your browser settings, though some parts of our
                site may not function as intended if you do.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                5. How We Share Your Information
              </h2>
              <p className="leading-relaxed">
                We do not sell, rent, or provide your personal information to any third party. The
                data we collect is used exclusively by {business.name} to contact you, provide our
                services, and run our own marketing campaigns through the platforms listed above
                (Google and Meta), which process data on our behalf under their own privacy terms
                and act as our service providers — not as independent recipients of your data for
                their own purposes.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                6. Data Security
              </h2>
              <p className="leading-relaxed">
                We take reasonable technical and organizational measures to protect the information
                you share with us from unauthorized access, loss, or misuse. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                7. Your Choices &amp; Rights
              </h2>
              <p className="leading-relaxed">
                You may contact us at any time to ask what information we hold about you, to request
                that we correct or delete it, or to opt out of marketing communications. To make a
                request, reach out using the contact details below.
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                8. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated effective date.
              </p>
            </div>

            <div className="rounded-2xl border border-navy-900/10 bg-[#f7f9fb] p-6">
              <h2 className="mb-3 font-heading text-xl font-bold text-navy-900">
                9. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your
                information, please contact us:
              </p>
              <ul className="mt-3 flex flex-col gap-1.5 leading-relaxed">
                <li>
                  <span className="font-semibold text-navy-900">{business.name}</span>
                </li>
                <li>
                  {business.address}, {business.city}
                </li>
                <li>
                  <a href={business.phoneHref} className="text-brand-blue hover:underline">
                    {business.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${business.email}`} className="text-brand-blue hover:underline">
                    {business.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
