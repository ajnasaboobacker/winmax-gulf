import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { CheckCircle2 } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Smart Film Installation in Dubai",
  "description": "Professional PDLC smart film installation in Dubai for offices, villas, and commercial spaces.",
  "provider": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  },
  "areaServed": {
    "@type": "City",
    "name": "Dubai"
  }
};

const SmartFilmDubai = () => {
  return (
    <>
      <SEOHead
        title="Smart Film Dubai | Switchable Privacy Glass Suppliers"
        description="Looking for smart film in Dubai? Winmax Gulf supplies and installs premium PDLC privacy glass for offices, villas, and commercial properties."
        keywords="smart film Dubai, PDLC smart film Dubai, switchable glass Dubai, privacy film Dubai"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "Smart Film Dubai", href: "/smart-film-dubai" }
        ]} />

        {/* Hero Section */}
        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6">
                Premium <span className="text-winmax-orange">Smart Film</span> in Dubai
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="max-w-3xl text-lg text-white/80 font-light leading-relaxed border-l-4 border-winmax-orange pl-6 mb-12 bg-white/5 p-4 rounded-r-lg">
                <p>
                  <strong>What is smart film?</strong> PDLC smart film is a switchable layer applied to existing glass that changes from frosted (private) to clear instantly when an electrical current is applied. Winmax Gulf is Dubai’s premier supplier and installer of smart film for residential and commercial environments.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
              <Reveal delay={0.2}>
                <div>
                  <h2 className="text-2xl font-bold mb-4 tracking-tight">Transform Your Dubai Property</h2>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Dubai's modern architecture demands flexible, high-end solutions. Whether you're designing a luxury villa in Emirates Hills or a corporate boardroom in DIFC, our <Link to="/pdlc" className="text-winmax-orange hover:underline">PDLC smart film</Link> provides instant privacy without the need for traditional blinds or curtains.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Blocks 99.9% of harmful UV rays (crucial for Dubai heat)",
                      "Transitions in under 0.1 seconds",
                      "Can be retrofitted onto existing glass partitions",
                      "Integrates with smart home systems (KNX, Control4, Alexa)"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-center">
                        <CheckCircle2 className="w-5 h-5 text-winmax-orange flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              
              <Reveal delay={0.3}>
                <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-winmax-orange">Popular Applications</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white mb-1">Corporate Offices</h4>
                      <p className="text-sm text-white/60">Create dynamic meeting rooms that offer open collaboration usually, but switch to complete privacy for confidential meetings. <Link to="/smart-film-for-offices-uae" className="text-winmax-orange hover:underline text-xs ml-2">Read more</Link></p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Luxury Villas</h4>
                      <p className="text-sm text-white/60">Perfect for bathroom partitions, exterior windows facing neighbors, and skylights to control the intense Dubai sun.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Clinics & Hospitals</h4>
                      <p className="text-sm text-white/60">Hygienic privacy solutions that replace curtains, which are notorious for harboring bacteria.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="Smart Film Dubai"
          headline={<>GET A FREE QUOTE IN <span className="text-winmax-orange">DUBAI.</span></>}
          subtext="Contact our Dubai-based engineering team for a site visit and measurement of your glass partitions."
          whatsappMessage="Hello, I am interested in smart film installation in Dubai."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SmartFilmDubai;
