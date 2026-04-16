import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { Cpu, Smartphone, LayoutDashboard, Globe } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Smart Film Automation Integration",
  "description": "Integration of PDLC smart glass with modern BMS and smart home ecosystems including KNX, Crestron, Control4, and Lutron.",
  "provider": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  }
};

const SmartFilmAutomation = () => {
  return (
    <>
      <SEOHead
        title="Smart Glass Automation | KNX & Crestron Integration UAE"
        description="Connect your switchable privacy glass to central automation systems. We integrate smart film with KNX, Crestron, Control4, and major Building Management Systems."
        keywords="smart film automation, KNX smart glass, Crestron privacy glass connection, smart home window integration"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "Automation Integration", href: "/smart-film-automation" }
        ]} />

        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-5xl text-center">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                Intelligent <span className="text-winmax-orange">Automation</span> Integration
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-white/80 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                Wall switches are a thing of the past. Winmax Gulf’s dedicated low-voltage engineering team ensures your PDLC smart film natively communicates with your building’s overarching centralized <Link to="/smart-automation" className="text-winmax-orange hover:underline">automation framework</Link>.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-6 lg:px-12">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Reveal delay={0.2} className="h-full">
                  <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl h-full">
                    <Cpu className="w-10 h-10 text-winmax-orange mb-6" />
                    <h3 className="text-xl font-bold mb-3">KNX Ecosystems</h3>
                    <p className="text-white/60 text-sm">Via dedicated KNX relay modules, we route the smart glass transformers directly into the global KNX bus, allowing control from your unified keypad.</p>
                  </div>
                </Reveal>
                <Reveal delay={0.3} className="h-full">
                  <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl h-full">
                    <LayoutDashboard className="w-10 h-10 text-winmax-orange mb-6" />
                    <h3 className="text-xl font-bold mb-3">Enterprise Control4 / Crestron</h3>
                    <p className="text-white/60 text-sm">Perfect for corporate boardrooms setup. "Presentation Mode" can dim lights and activate the privacy glass simultaneously.</p>
                  </div>
                </Reveal>
                <Reveal delay={0.4} className="h-full">
                  <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl h-full">
                    <Globe className="w-10 h-10 text-winmax-orange mb-6" />
                    <h3 className="text-xl font-bold mb-3">BMS Protocol (DALI / RS485)</h3>
                    <p className="text-white/60 text-sm">Facility managers can monitor and override all privacy glass states across an entire high-rise using standard serial protocols.</p>
                  </div>
                </Reveal>
                <Reveal delay={0.5} className="h-full">
                  <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl h-full">
                    <Smartphone className="w-10 h-10 text-winmax-orange mb-6" />
                    <h3 className="text-xl font-bold mb-3">Consumer Smart Home</h3>
                    <p className="text-white/60 text-sm">For <Link to="/smart-film-for-villas-uae" className="hover:text-winmax-orange transition-colors underline">luxury villas</Link>, we offer direct Wi-Fi relays compatible with Apple HomeKit, Alexa, and Google Assistant for simple voice control ("Alexa, make the bathroom private").</p>
                  </div>
                </Reveal>
             </div>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="Integration Experts"
          headline={<>CONNECT YOUR <span className="text-winmax-orange">ARCHITECTURE.</span></>}
          subtext="Provide us with your current or planned automation platform (KNX, Savant, Lutron) and we will engineer the relay topology."
          whatsappMessage="Hello, I need to integrate smart film into my existing KNX/Smart Home system."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SmartFilmAutomation;
