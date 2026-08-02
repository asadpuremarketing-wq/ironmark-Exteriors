import Hero from "@/components/Hero";
import HeroQuoteCard from "@/components/HeroQuoteCard";
import StatsBar from "@/components/StatsBar";
import GoogleReviews from "@/components/GoogleReviews";
import ServicesCarousel from "@/components/ServicesCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeforeAfter from "@/components/BeforeAfter";
import TruckTeam from "@/components/TruckTeam";
import CTA from "@/components/CTA";
import SectionFade from "@/components/SectionFade";

const NAVY_950 = "#050a14";
const NAVY_900 = "#0a1424";
const WHITE = "#ffffff";
const REVIEWS_BG = "#f7f9fb";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Hamilton, ON & Surrounding Areas"
        title="Exterior Solutions You Can Trust"
        subtitle="Ironmark Exteriors delivers expert roofing, siding, gutters, windows, painting, and pressure washing for homeowners across Hamilton, Stoney Creek, Burlington, Ancaster, and Dundas."
        showCta={false}
        formSlot={<HeroQuoteCard />}
      />
      <StatsBar />
      <SectionFade from={NAVY_950} to={REVIEWS_BG} />
      <GoogleReviews />
      <SectionFade from={REVIEWS_BG} to={NAVY_950} />
      <ServicesCarousel />
      <SectionFade from={NAVY_950} to={WHITE} />
      <WhyChooseUs />
      <SectionFade from={WHITE} to={NAVY_900} />
      <BeforeAfter />
      <SectionFade from={NAVY_900} to={WHITE} />
      <TruckTeam />
      <CTA />
    </>
  );
}
