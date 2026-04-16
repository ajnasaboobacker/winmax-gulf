import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { Calculator, Ruler, Cpu, Hammer } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Much Does Smart Film Cost in the UAE?",
  "description": "An in-depth breakdown of the factors influencing PDLC smart film pricing per square meter in Dubai and the UAE.",
  "author": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  }
};

const SmartFilmCost = () => {
  return (
    <>
      <SEOHead
        title="Smart Film Cost UAE | PDLC Privacy Glass Prices Dubai"
        description="Understanding smart film pricing in the UAE. Learn how square meterage, installation complexity, and smart home integration impact your switchable glass quote."
        keywords="smart film cost UAE, switchable glass price Dubai, PDLC film pricing per square meter, how much does smart glass cost"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "Cost Breakdown", href: "/smart-film-cost-uae" }
        ]} />

        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-4xl">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                Understanding Smart Film <span className="text-winmax-orange">Pricing</span> in the UAE
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-white/80 font-light leading-relaxed mb-12">
                One of the most common questions we receive is: <em>"How much does it cost?"</em> Because PDLC smart film is a bespoke architectural product cut specifically to your dimensions, there is no generic off-the-shelf price. However, understanding how we formulate your quote will help you budget for your commercial or residential upgrade.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <Reveal delay={0.2}>
              <h2 className="text-3xl font-bold mb-10 text-center">4 Key Factors That Determine Your Quote</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal delay={0.3}>
                <div className="bg-[#111] border border-white/5 p-8 rounded-2xl hover:border-winmax-orange/30 transition-colors h-full">
                  <Ruler className="w-10 h-10 text-winmax-orange mb-6" />
                  <h3 className="text-2xl font-bold mb-4">1. Total Surface Area (sqm)</h3>
                  <p className="text-white/70 leading-relaxed">
                    The raw material of the liquid crystal film is priced strictly per square meter. Naturally, outfitting a massive corporate boardroom will incur higher material costs than a standard villa bathroom partition. Larger volume projects (like high-rise hotel developments) benefit from tiered commercial volume rates.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="bg-[#111] border border-white/5 p-8 rounded-2xl hover:border-winmax-orange/30 transition-colors h-full">
                  <Calculator className="w-10 h-10 text-winmax-orange mb-6" />
                  <h3 className="text-2xl font-bold mb-4">2. Glass Dimensions & Wastage</h3>
                  <p className="text-white/70 leading-relaxed">
                    Smart film comes in standardized rolls (usually 1.2m, 1.5m, or 1.8m widths). If your glass panels are unusually wide or shaped dynamically (arches, circles), the laser-cutting process may result in higher material wastage, which factors into the final per-panel cost.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="bg-[#111] border border-white/5 p-8 rounded-2xl hover:border-winmax-orange/30 transition-colors h-full">
                  <Hammer className="w-10 h-10 text-winmax-orange mb-6" />
                  <h3 className="text-2xl font-bold mb-4">3. Installation & Wiring Complexity</h3>
                  <p className="text-white/70 leading-relaxed">
                    Every piece of smart film requires a discreet copper busbar and wiring hidden within the window tracking or wall framing. Retrofitting film onto frameless glass doors or sliding panels requires specialized conduit systems (like armored transfer loops) which impacts labor and auxiliary material costs.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="bg-[#111] border border-white/5 p-8 rounded-2xl hover:border-winmax-orange/30 transition-colors h-full">
                  <Cpu className="w-10 h-10 text-winmax-orange mb-6" />
                  <h3 className="text-2xl font-bold mb-4">4. Automation & Transformers</h3>
                  <p className="text-white/70 leading-relaxed">
                    A basic setup connects the film to a standard wall switch. If you require advanced integration into <Link to="/smart-automation" className="text-winmax-orange hover:underline">building management systems (KNX/Crestron)</Link>, RF remotes, or localized dimming transformers, these electrical relays add to the final quotation.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.7}>
              <div className="mt-16 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4">The Verdict: "Retrofit Film" vs "Laminated Smart Glass"</h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  It's important to understand you have two distinct operational paths:<br/><br/>
                  <strong>1. Self-Adhesive Smart Film (Retrofit):</strong> Applied directly to your existing windows. This is the most cost-effective method and takes only days to install, making it the dominant choice in the UAE for renovations.<br/>
                  <strong>2. Laminated Smart Glass:</strong> The liquid crystals are sandwiched between two panes of glass at the factory. This offers superior durability for wet environments (like external façades) but is significantly more expensive since it requires completely replacing the structural glass.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="Get Accurate Pricing"
          headline={<>REQUEST A <span className="text-winmax-orange">CUSTOM QUOTE.</span></>}
          subtext="The fastest way to get precise pricing is to send us the dimensions (width x height) and some photos of your existing glass. Our UAE team will reply with a proposal."
          whatsappMessage="Hello, I have the dimensions of my glass. Can you provide a cost estimate for smart film?"
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SmartFilmCost;
