import Hero from "@/components/home/Hero";
import PopularDestinations from "@/components/home/PopularDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import AIPlannerPreview from "@/components/home/AIPlannerPreview";
import TravelStats from "@/components/home/TravelStats";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Hero />
      <PopularDestinations />
      <WhyChooseUs />
      <HowItWorks />
      <AIPlannerPreview />
      <TravelStats />
      <Testimonials />
      <FAQ />
      <CTA />
      <Newsletter />
    </div>
  );
}
