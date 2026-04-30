import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { Power, MapPin, Search, Layers } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "PDLC Smart Film & Glass Installation in Dubai",
  "description": "High-technology switchable smart film and privacy glass retrofits serving Dubai and the wider UAE.",
  "provider": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  },
  "areaServed": {
    "@type": "City",
    "name": "Dubai"
  }
};

const SwitchablePrivacyGlassDubai = () => {
  return (
    <>
      <SEOHead
        title="Switchable Smart Film Dubai | PDLC Privacy Glass"
        description="Winmax Gulf supplies industry-leading switchable privacy glass in Dubai. Control transparency instantly with our low-voltage PDLC liquid crystal technology."
        keywords="switchable privacy glass Dubai, instant opacity glass, electric frosted glass UAE, switchable film"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Film", href: "/pdlc" },
          { label: "Switchable Privacy Glass Dubai", href: "/switchable-privacy-glass-dubai" }
        ]} />

        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 max-w-4xl">
                Switchable Smart Film in <span className="text-winmax-orange">Dubai</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-3xl text-xl text-white/80 font-light leading-relaxed mb-6">
                Redefine architectural boundaries with intelligent, switchable smart film and glass. Designed to combat Dubai's intense solar glare while providing complete on-demand confidentiality, our switchable solutions are rapidly becoming the standard for modern UAE developments.
              </p>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-12 mt-16">
              <Reveal delay={0.2}>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <Power className="w-8 h-8 text-winmax-orange flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">How Smart Film Works</h3>
                      <p className="text-white/60 leading-relaxed">
                        The technology relies on Polymer Dispersed Liquid Crystals (PDLC). When low-voltage electric current passes through the film, the liquid crystals align on a parallel axis, rendering the glass transparent. Once the power is disabled, the crystals scatter—instantly forming an opaque, frosted visual barrier while still allowing 70% of ambient light to pass through.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Layers className="w-8 h-8 text-winmax-orange flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Retrofitting Dubai's Skyscrapers</h3>
                      <p className="text-white/60 leading-relaxed">
                        Many existing towers in Dubai Marina or Downtown Dubai have strict structural regulations preventing glass replacement. Our <strong>self-adhesive switchable film</strong> allows us to apply the technology directly onto the interior surface of your existing windows or boardroom partitions, saving immense costs and avoiding heavy structural demolition.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Search className="w-8 h-8 text-winmax-orange flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">HD Projection Screen Capability</h3>
                      <p className="text-white/60 leading-relaxed">
                        In its opaque state, the fine crystal structure acts as a perfect rear-projection canvas. Retail storefronts in Dubai Mall or luxury showrooms often use our switchable smart film as an interactive HD billboard at night.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="bg-[#111] border border-white/10 rounded-2xl p-8 sticky top-32">
                  <h3 className="text-2xl font-bold mb-6 text-white">Local Service Delivery</h3>
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-6 h-6 text-winmax-orange flex-shrink-0 mt-1" />
                    <p className="text-white/70 text-sm">
                      Our logistics and engineering hub is located in the UAE, allowing for rapid deployment across Dubai, Abu Dhabi, and Sharjah. We do not outsource installation; our in-house certified AV and low-voltage engineers manage the entire wiring and calibration process.
                    </p>
                  </div>
                  
                  <div className="border border-white/5 bg-[#1a1a1a] rounded-xl p-5 mb-6">
                    <h4 className="font-bold text-winmax-orange text-sm mb-2">QUICK SPECS</h4>
                    <ul className="text-sm text-white/60 space-y-2">
                      <li className="flex justify-between"><span>Power Consumption:</span> <span className="text-white">~5W per Sqm</span></li>
                      <li className="flex justify-between"><span>Operating Voltage:</span> <span className="text-white">48V / 60V AC</span></li>
                      <li className="flex justify-between"><span>Switching Speed:</span> <span className="text-white">&lt;0.1 Seconds</span></li>
                      <li className="flex justify-between"><span>Light Transmittance:</span> <span className="text-white">80% (ON) / 60% (OFF)</span></li>
                    </ul>
                  </div>

                  <Link to="/#contact" className="w-full inline-block text-center bg-winmax-orange hover:bg-winmax-orange/90 text-white font-bold py-3 rounded-lg transition-colors">
                    Schedule Technical Assessment
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="Dubai Operations"
          headline={<>SPEAK WITH A DUBAI <span className="text-winmax-orange">EXPERT.</span></>}
          subtext="Provide us with the details of your project in Dubai, and our technical director will walk you through the possibilities."
          whatsappMessage="Hello, I am located in Dubai and would like more technical details on switchable smart film and glass."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SwitchablePrivacyGlassDubai;
