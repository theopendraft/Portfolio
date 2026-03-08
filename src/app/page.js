import HeroSection from "@/components/home/HeroSection";
import WhatICanDo from "@/components/home/WhatICanDo";
import AboutMe from "@/components/home/AboutMe";
import TechStack from "@/components/home/TechStack";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WorkProcess from "@/components/home/WorkProcess";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactSection from "@/components/home/ContactSection";
import GradualBlur from "@/components/shared/GradualBlur";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <WhatICanDo />
      <AboutMe />
      <TechStack />
      <FeaturedProjects />
      <WorkProcess />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2.5}
        divCount={4}
        curve="bezier"
        exponential
        opacity={1}
      />
    </main>
  );
}
