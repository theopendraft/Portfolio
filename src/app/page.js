import HeroSection from "@/components/home/HeroSection";
import WhatICanDo from "@/components/home/WhatICanDo";
import AboutMe from "@/components/home/AboutMe";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhatICanDo />
      <AboutMe />
      <FeaturedProjects />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </main>
  );
}
