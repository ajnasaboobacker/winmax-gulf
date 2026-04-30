import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { LazyImage } from "@/components/LazyImage";
import pdlcBanner from "@/assets/banners/pdlc-banner.jpg";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Case Study: Luxury Villa Smart Film Retrofit on Palm Jumeirah",
  "description": "Technical case study of smart film installation for a multi-million dirham luxury estate on Palm Jumeirah, Dubai.",
  "author": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  }
};

const CaseStudyRoyalVilla = () => {
  return (
    <>
      <SEOHead
        title="Palm Jumeirah Villa Smart Film Case Study | Winmax Gulf"
        description="Explore how we integrated PDLC smart film into a Palm Jumeirah luxury villa to block UV rays and provide instant visual privacy for oceanside windows."
        keywords="smart film case study, switchable glass palm jumeirah, luxury villa smart film, residential privacy glass Dubai"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Film", href: "/pdlc" },
          { label: "Case Study: Palm Jumeirah Villa", href: "/case-study-royal-villa" }
        ]} />

        <article className="pt-32 pb-16 relative container mx-auto px-6 lg:px-12 z-10">
          <Reveal>
            <span className="text-winmax-orange font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Residential Case Study</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
              Luxury Estate: Palm Jumeirah
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="w-full h-[500px] rounded-2xl overflow-hidden mb-12 relative">
              <LazyImage 
                src={pdlcBanner} 
                alt="Luxury villa with switchable smart film windows overlooking the ocean" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <Reveal delay={0.2}>
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-white/70 leading-relaxed mb-8 text-lg">
                  The client, an owner of a highly customized Frond Villa on the Palm Jumeirah, wanted to preserve the spectacular uninterrupted sea views from the master bedroom and living areas. However, the direct sun exposure was severely fading imported Italian furniture, and the proximity to traversing yachts created a significant privacy concern. Traditional blackout curtains were rejected as they ruined the minimalist aesthetic.
                </p>

                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                <p className="text-white/70 leading-relaxed mb-6 text-lg">
                  We engineered a retrofit using high-clarity <Link to="/smart-film-for-villas-uae" className="text-winmax-orange hover:underline">residential smart film</Link>. Installed over a 3-day period to minimize disruption in the occupied home, the film was applied to 28 individual frameless glass panels facing the coastline. 
                </p>
                <p className="text-white/70 leading-relaxed mb-8 text-lg">
                  To meet the client’s request for absolute simplicity, we integrated the switch mechanism directly into their existing Savant smart home ecosystem via a dedicated Wi-Fi relay, allowing the privacy glass to be activated using Siri on their iPhones.
                </p>

                <h2 className="text-2xl font-bold mb-4">Results & Benefits</h2>
                <ul className="space-y-3 text-white/70 mb-8 list-disc list-inside">
                  <li><strong>Instant Privacy:</strong> Immediate visual barrier protecting against outside viewing.</li>
                  <li><strong>UV Blocking:</strong> The film rejects 99% of harmful UV rays, protecting luxury assets.</li>
                  <li><strong>Thermal Efficiency:</strong> Reduced the cooling load on the villa's HVAC system during peak summer months.</li>
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-1">
              <Reveal delay={0.3}>
                <div className="bg-[#111] border border-white/10 rounded-2xl p-8 sticky top-32">
                  <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Project Scope</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="block text-white/50 text-sm">Location</span>
                      <strong className="text-white border-l-2 border-winmax-orange pl-3 block mt-1">Palm Jumeirah, Dubai</strong>
                    </div>
                    <div>
                      <span className="block text-white/50 text-sm">Sector</span>
                      <strong className="text-white border-l-2 border-winmax-orange pl-3 block mt-1">Luxury Residential</strong>
                    </div>
                    <div>
                      <span className="block text-white/50 text-sm">Automation Integration</span>
                      <strong className="text-white border-l-2 border-winmax-orange pl-3 block mt-1"><Link to="/smart-film-automation" className="hover:text-winmax-orange transition-colors">Savant & Apple HomeKit</Link></strong>
                    </div>
                  </div>
                  <Link to="/#contact" className="w-full inline-block text-center bg-winmax-orange hover:bg-winmax-orange/90 text-white font-bold py-3 rounded-lg transition-colors">
                    Request Residential Quote
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default CaseStudyRoyalVilla;
