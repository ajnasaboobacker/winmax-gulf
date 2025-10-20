import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InteractiveElements from "@/components/InteractiveElements";
import Services from "@/components/Services";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CharacterAnimations from "@/components/CharacterAnimations";
import SEOHead from "@/components/SEOHead";
import TrustBadges from "@/components/TrustBadges";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="WinmaxGulf - Leading UAE Smart Technology Solutions | PDLC Film, LED Displays, DJ Systems"
        description="Transform your space with WinmaxGulf's innovative PDLC smart film, LED display systems, and turnkey DJ club solutions. Leading technology provider in UAE with 500+ successful installations across Dubai and Abu Dhabi."
        keywords="PDLC smart film UAE, LED displays Dubai, DJ club solutions, smart glass technology, interactive displays, privacy glass Dubai, electronic switchable glass UAE, digital signage Dubai, smart film installation, LED video walls UAE"
        ogImage={window.location.origin + "/favicon.png"}
      />
      <div className="min-h-screen">
        <Header />
        <Hero />
        <article>
          <InteractiveElements />
          <Services />
          <TechnologyShowcase />
          <About />
          <TrustBadges />
          <Gallery />
          <Process />
          <EnhancedTestimonials />
          <Contact />
        </article>
        <Footer />
        <CharacterAnimations />
      </div>
    </>
  );
};

export default Index;
