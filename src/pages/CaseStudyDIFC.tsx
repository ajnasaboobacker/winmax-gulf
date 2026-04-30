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
  "headline": "Case Study: 800sqm Switchable Glass Installation at DIFC Corporate Office",
  "description": "Read our technical case study on outfitting a major luxury corporate office in Dubai International Financial Centre with PDLC smart film.",
  "author": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  }
};

const CaseStudyDIFC = () => {
  return (
    <>
      <SEOHead
        title="DIFC Office Smart Film Case Study | Winmax Gulf"
        description="Discover how Winmax Gulf deployed 800sqm of switchable PDLC privacy glass for a leading corporate headquarters in DIFC, Dubai."
        keywords="smart film case study, switchable glass installation Dubai, DIFC smart glass, corporate office PDLC"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Film", href: "/pdlc" },
          { label: "Case Study: DIFC Headquarters", href: "/case-study-difc" }
        ]} />

        <article className="pt-32 pb-16 relative container mx-auto px-6 lg:px-12 z-10">
          <Reveal>
            <span className="text-winmax-orange font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Case Study</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
              Corporate Headquarters: DIFC, Dubai
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="w-full h-[500px] rounded-2xl overflow-hidden mb-12 relative">
              <LazyImage 
                src={pdlcBanner} 
                alt="Switchable privacy glass installed in DIFC boardroom" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <Reveal delay={0.2}>
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-white/70 leading-relaxed mb-8 text-lg">
                  A multinational financial firm located in the Dubai International Financial Centre (DIFC) required a high-tech privacy solution for their newly fitted Executive Floor. The design featured 800 square meters of floor-to-ceiling glass partitions separating open workspaces from private executive pods and central boardrooms. Traditional blinds compromised the modern acoustic architecture.
                </p>

                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                <p className="text-white/70 leading-relaxed mb-6 text-lg">
                  Winmax Gulf Engineers proposed a seamless <Link to="/pdlc" className="text-winmax-orange hover:underline">PDLC smart film</Link> retrofit. Over a 5-day period (operating after corporate hours), our technicians applied the switchable film to existing tempered glass. 
                </p>
                <p className="text-white/70 leading-relaxed mb-8 text-lg">
                  The entire system was integrated into the client's existing KNX automation backbone, allowing executives to trigger visual privacy using their desktop touch panels or iOS devices.
                </p>

                <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
                <ul className="space-y-3 text-white/70 mb-8 list-disc list-inside">
                  <li><strong>Total Coverage:</strong> 800 sqm of retrofitted glass</li>
                  <li><strong>Switch Speed:</strong> &lt; 0.1 seconds</li>
                  <li><strong>Optical Clarity:</strong> 98% in clear state</li>
                  <li><strong>Lifespan:</strong> Tested for 100,000+ switching cycles</li>
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
                      <strong className="text-white border-l-2 border-winmax-orange pl-3 block mt-1">DIFC, Dubai</strong>
                    </div>
                    <div>
                      <span className="block text-white/50 text-sm">Service Area</span>
                      <strong className="text-white border-l-2 border-winmax-orange pl-3 block mt-1"><Link to="/smart-film-for-offices-uae" className="hover:text-winmax-orange transition-colors">Corporate Offices</Link></strong>
                    </div>
                    <div>
                      <span className="block text-white/50 text-sm">Integration</span>
                      <strong className="text-white border-l-2 border-winmax-orange pl-3 block mt-1">KNX & Crestron</strong>
                    </div>
                  </div>
                  <Link to="/#contact" className="w-full inline-block text-center bg-winmax-orange hover:bg-winmax-orange/90 text-white font-bold py-3 rounded-lg transition-colors">
                    Request Similar Quote
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

export default CaseStudyDIFC;
