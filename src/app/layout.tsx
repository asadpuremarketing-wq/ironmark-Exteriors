import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { business, serviceAreas, services } from "@/lib/data";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Ironmark Exteriors | Roofing, Siding & Exterior Contractor in Hamilton, ON",
    template: "%s | Ironmark Exteriors",
  },
  description:
    "Ironmark Exteriors provides roofing, siding, gutters, windows, painting, and pressure washing for homeowners in Hamilton, Stoney Creek, Burlington, Ancaster, Dundas and surrounding areas. Licensed & insured — free estimates.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: business.name,
    title: "Ironmark Exteriors | Roofing, Siding & Exterior Contractor in Hamilton, ON",
    description:
      "Licensed & insured exterior renovation company serving Hamilton, Stoney Creek, Burlington, Ancaster, and Dundas. Free estimates.",
    url: business.siteUrl,
    locale: "en_CA",
    images: [{ url: "/images/logo.png", width: 1044, height: 280, alt: business.name }],
  },
  twitter: {
    card: "summary",
    title: "Ironmark Exteriors | Roofing, Siding & Exterior Contractor",
    description:
      "Licensed & insured exterior renovation company serving Hamilton, ON and surrounding areas. Free estimates.",
    images: ["/images/logo.png"],
  },
  verification: {
    google: "cXng2Euq7r0hACxNmV1YOxmDmlSwCCzhrEDqiA0_6Q8",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: business.name,
  description:
    "Ironmark Exteriors provides roofing, siding, gutters, windows, painting, and pressure washing for homeowners across Hamilton, ON and surrounding areas.",
  url: business.siteUrl,
  telephone: business.phone,
  email: business.email,
  image: `${business.siteUrl}/images/logo.png`,
  logo: `${business.siteUrl}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    ...business.postalAddress,
  },
  areaServed: serviceAreas.map((a) => ({
    "@type": "City",
    name: `${a.name}, ${a.province}`,
  })),
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.name,
      description: s.shortDescription,
    },
  })),
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white">
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
