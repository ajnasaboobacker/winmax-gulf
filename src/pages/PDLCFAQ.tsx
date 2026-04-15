import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import FAQ from "@/components/FAQ";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "PDLC Smart Glass FAQ",
  "description": "Frequently asked questions about PDLC smart film and switchable glass installations in the UAE."
};

const PDLCFAQPage = () => {
  return (
    <>
      <SEOHead
        title="PDLC Smart Glass FAQ | Winmax Gulf"
        description="Comprehensive FAQ for PDLC smart film and switchable privacy glass. Learn about costs, installation, and technical specs for projects in the UAE."
        keywords="pdlc smart glass faq, smart film questions, switchable glass maintenance, pdlc installation uae"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "PDLC FAQ", href: "/pdlc-faq" }
        ]} />

        <section className="pt-32 pb-8 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-4xl">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6">
                Frequently Asked <span className="text-winmax-orange">Questions</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-white/80 font-light leading-relaxed">
                Everything you need to know about our PDLC smart film and intelligent glass solutions, curated by our expert engineering team in the UAE.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Leverage our existing FAQ component */}
        <FAQ />

        <ServiceBrochureCTA
          badge="Technical Consultation"
          headline={<>STILL HAVE <span className="text-winmax-orange">QUESTIONS?</span></>}
          subtext="Speak directly with one of our specialized PDLC engineers regarding your unique architectural requirements."
          whatsappMessage="Hello, I have some technical questions about PDLC smart glass before making a decision."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default PDLCFAQPage;
