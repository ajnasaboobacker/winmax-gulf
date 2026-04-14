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
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Winmax Gulf | Precision PDLC Smart Glass & LED Display Systems in UAE</title>
        <meta name="description" content="Winmax Gulf is the UAE's premier provider of PDLC Smart Glass, LED Displays, and AV smart automation. Professional engineering solutions for Dubai & Abu Dhabi." />
        <meta name="keywords" content="PDLC Smart Glass UAE, LED Display installation Dubai, AV Integration Abu Dhabi, Switchable Smart Film GCC, Commercial LED Video Walls, Smart Home Automation UAE" />
        <meta property="og:title" content="Winmax Gulf | Precision PDLC Smart Glass & LED Display Systems" />
        <meta property="og:description" content="Winmax Gulf is the UAE's premier provider of architectural technology. We specialize in PDLC Smart Glass installation, scalable LED Display Systems, and professional Audiovisual (AV) integrations." />
      </Helmet>
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
