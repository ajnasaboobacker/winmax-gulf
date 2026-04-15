import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { Briefcase, Shield, Zap } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Smart Film for Offices in UAE",
  "description": "Premium PDLC smart film installations for corporate offices and meeting rooms in the UAE. Instantly switch between clear and private glass.",
  "provider": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Abu Dhabi" }
  ]
};

const SmartFilmOffices = () => {
  return (
    <>
      <SEOHead
        title="Smart Film for Offices UAE | Meeting Room Privacy Glass"
        description="Upgrade your UAE corporate office with switchable smart film. Perfect for meeting rooms and executive pods, offering instant privacy on demand."
        keywords="smart film offices UAE, meeting room privacy glass, corporate smart film Dubai, switchable glass offices"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "Smart Film for Offices", href: "/smart-film-for-offices-uae" }
        ]} />

        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6">
                <span className="text-winmax-orange">Smart Film</span> For Corporate Offices
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-3xl text-xl text-white/80 font-light leading-relaxed mb-12">
                Modern corporate architecture strongly favors glass partitions for open-plan offices, but confidentiality remains critical. Our PDLC smart film solutions provide the optimal balance, allowing instant privacy at the touch of a button while maintaining an open feel when not in use.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Reveal delay={0.2}>
                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl h-full">
                  <Briefcase className="w-10 h-10 text-winmax-orange mb-6" />
                  <h3 className="text-xl font-bold mb-4">Boardrooms</h3>
                  <p className="text-white/60">Maintain confidentiality during executive presentations and board meetings without sacrificing the structural aesthetic of glass.</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl h-full">
                  <Shield className="w-10 h-10 text-winmax-orange mb-6" />
                  <h3 className="text-xl font-bold mb-4">HR & Interview Rooms</h3>
                  <p className="text-white/60">Ensure strict compliance and visual privacy for sensitive employee discussions and talent recruitment.</p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl h-full">
                  <Zap className="w-10 h-10 text-winmax-orange mb-6" />
                  <h3 className="text-xl font-bold mb-4">Automation Integration</h3>
                  <p className="text-white/60">Integrate with room booking systems—glass automatically turns opaque when a meeting is scheduled and starts.</p>
                </div>
              </Reveal>
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/smart-film-cost-uae" className="text-winmax-orange hover:text-white transition-colors underline underline-offset-4">Read about smart film cost factors for commercial projects →</Link>
            </div>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="Corporate Solutions"
          headline={<>ELEVATE YOUR <span className="text-winmax-orange">WORKSPACE.</span></>}
          subtext="Contact our B2B team to discuss smart film deployment for your upcoming office fit-out or existing glass enclosures."
          whatsappMessage="Hello, I am interested in smart film for my corporate office."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SmartFilmOffices;
