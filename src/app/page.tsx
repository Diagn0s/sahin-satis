import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { StatsSection } from "@/components/home/StatsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CtaStrip } from "@/components/home/CtaStrip";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedListings />
      <StatsSection />
      <HowItWorks />
      <CtaStrip />
      <Testimonials />
    </>
  );
}
