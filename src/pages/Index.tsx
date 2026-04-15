import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import About from "@/components/About";
import TrustBadges from "@/components/TrustBadges";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import ServiceHotline from "@/components/ServiceHotline";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="PDLC Smart Film Supplier in UAE | Smart Glass Dubai | WinmaxGulf"
        description="WinmaxGulf supplies and installs PDLC smart film and switchable privacy glass in Dubai and across the UAE for offices, villas, hotels, clinics, and commercial spaces."
        keywords="PDLC smart film UAE, smart glass Dubai, switchable privacy glass, smart film supplier UAE"
      />
      <div className="min-h-screen bg-[#050505] text-white selection:bg-winmax-orange selection:text-black relative">
        <Header />
        <main className="relative z-10">
          <Hero />
          <Services />
          <FeaturedProjects />
          <TechnologyShowcase />
          <About />
          <TrustBadges />
          <Gallery />
          <Process />
          <EnhancedTestimonials />
          <FAQ />
          <Contact />
          <ServiceHotline />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
