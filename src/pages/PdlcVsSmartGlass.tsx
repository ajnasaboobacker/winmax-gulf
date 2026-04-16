import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { Layers, Zap, Hammer, Wallet } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "PDLC Film vs. Smart Glass: Which is right for your project?",
  "description": "Compare retrofit PDLC adhesive film vs factory-laminated smart glass. Learn the differences in cost, installation, durability, and application for UAE projects.",
  "author": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  }
};

const PdlcVsSmartGlass = () => {
  return (
    <>
      <SEOHead
        title="PDLC Film vs Smart Glass | Understanding The Difference"
        description="Not sure whether to choose retrofit smart film or laminated smart glass? We dissect the differences, costs, and best use cases for UAE properties."
        keywords="pdlc vs smart glass, smart film vs smart glass, retrofit privacy film, laminated smart glass, intelligent glass comparison"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "PDLC Film vs Smart Glass", href: "/pdlc-vs-smart-glass" }
        ]} />

        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-5xl">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                <span className="text-winmax-orange">PDLC Film</span> vs. <span className="text-winmax-orange">Smart Glass</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-white/80 font-light leading-relaxed mb-12">
                "Smart Glass" has become a blanket term for switchable privacy technology. However, there is a fundamental difference in how this technology is manufactured and delivered. Before investing in a privacy solution for your Dubai or Abu Dhabi property, you must understand the distinction between <strong>Self-Adhesive Retrofit Film</strong> and <strong>Laminated Smart Glass</strong>.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Reveal delay={0.2}>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-winmax-orange/50 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-full">
                  <div className="bg-winmax-orange/10 w-16 h-16 flex items-center justify-center rounded-xl mb-6">
                    <Layers className="text-winmax-orange w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">1. PDLC Smart Film (Retrofit)</h2>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    This is a highly durable 0.4mm thick membrane that contains the liquid crystals. One side has a specialized dry adhesive. It applies directly onto the surface of your existing glass.
                  </p>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li><strong className="text-white">Cost:</strong> Highly Cost Effective</li>
                    <li><strong className="text-white">Installation:</strong> Extremely Fast (Days)</li>
                    <li><strong className="text-white">Best For:</strong> Existing offices, residential renovations, existing <Link to="/smart-film-for-meeting-rooms" className="text-winmax-orange hover:underline">meeting rooms</Link>.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-white/50 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-full">
                  <div className="bg-white/10 w-16 h-16 flex items-center justify-center rounded-xl mb-6">
                    <Hammer className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">2. Laminated Smart Glass</h2>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    The liquid crystal layer is permanently sandwiched (laminated) between two thick panes of tempered glass at the manufacturing facility. You receive a complete, heavy pane of glass ready for framing.
                  </p>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li><strong className="text-white">Cost:</strong> Premium / High Investment</li>
                    <li><strong className="text-white">Installation:</strong> Requires structural glazing and framing.</li>
                    <li><strong className="text-white">Best For:</strong> New constructions, external wet areas (like shower enclosures where the edge needs absolute waterproof sealing).</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="bg-[#111] p-10 rounded-3xl border border-white/5">
                <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Key Decision Factors</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-lg mb-2"><Wallet className="w-5 h-5 text-winmax-orange"/> Budget and Logistics</h4>
                    <p className="text-white/70">If the glass is already installed in your office or villa, ripping it out to replace it with laminated smart glass is an immense waste of material and budget. In 90% of retrofit scenarios, <strong>PDLC Film</strong> is the logical choice.</p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-lg mb-2"><Zap className="w-5 h-5 text-winmax-orange"/> Durability in Wet Areas</h4>
                    <p className="text-white/70">For high-moisture environments like luxury hotel showers or external facades facing heavy rain, <strong>Laminated Smart Glass</strong> offers superior edge protection because the electronic layer is fully encased in EVA/PVB resin between the glass.</p>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        <ServiceBrochureCTA
          badge="Product Comparison"
          headline={<>NOT SURE WHICH IS <span className="text-winmax-orange">BEST?</span></>}
          subtext="Consult our engineering team. We will analyze your blueprints or existing space and recommend the exact technology suited for your environment."
          whatsappMessage="Hello, I would like advice on whether to use smart film or laminated smart glass for my project."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default PdlcVsSmartGlass;
