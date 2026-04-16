import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { ShieldCheck, Sun, Home, Zap } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Smart Film for Villas in UAE",
  "description": "Luxury residential smart film and switchable glass installations for villas in Dubai, Abu Dhabi, and across the UAE.",
  "provider": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Abu Dhabi" }
  ]
};

const SmartFilmForVillas = () => {
  return (
    <>
      <SEOHead
        title="Smart Film for Villas UAE | Luxury Residential Privacy Glass"
        description="Upgrade your UAE villa with luxury smart film. Transform bathroom glass, skylights, and living area windows into instant privacy barriers. Get a free home consultation."
        keywords="smart film for villas UAE, residential smart glass Dubai, villa privacy film, switchable glass for homes"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "Smart Film for Villas", href: "/smart-film-for-villas-uae" }
        ]} />

        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 mt-4">
                <span className="text-winmax-orange">Smart Film</span> for Luxury Villas
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-4xl text-xl text-white/80 font-light leading-relaxed mb-12">
                Modern luxury villas in Dubai and Abu Dhabi embrace expansive architectural glass to maximize natural light and waterfront views. However, this often compromises personal privacy and exposes interiors to intense Middle Eastern heat. Winmax Gulf’s PDLC smart film provides an elegant, high-technology solution, replacing bulky curtains with instant, switchable optical privacy at the touch of a button or a voice command.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-16 mt-16 items-center">
              <Reveal delay={0.2}>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Residential Applications</h2>
                  <p className="text-white/70 mb-8 leading-relaxed text-lg">
                    Our engineering teams have outfitted premium estates across Emirates Hills, Palm Jumeirah, and Saadiyat Island. The film is perfectly suited for high-moisture environments and extreme sun exposure, making it the ultimate domestic upgrade.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-winmax-orange/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Home className="w-6 h-6 text-winmax-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Master Bathrooms</h3>
                        <p className="text-white/60">Glass shower enclosures and bathroom partitions can instantly switch from clear to completely opaque, offering a hygienic, modern alternative to blinds.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-winmax-orange/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sun className="w-6 h-6 text-winmax-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Street-Facing Windows</h3>
                        <p className="text-white/60">Maintain your view during the day, and activate the frosted state at night to prevent outsiders from seeing into your illuminated living spaces.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-winmax-orange/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Zap className="w-6 h-6 text-winmax-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Smart Home Integration</h3>
                        <p className="text-white/60">Our films natively integrate with <Link to="/smart-automation" className="text-winmax-orange hover:underline">residential automation systems</Link> like Control4, Crestron, or simple Alexa/Google Home voice commands.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="bg-[#111] border border-white/10 p-10 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-winmax-orange/5 blur-[100px] rounded-full pointer-events-none"></div>
                  
                  <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Why UAE Homeowners Choose PDLC</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <ShieldCheck className="w-6 h-6 text-winmax-orange flex-shrink-0" />
                      <div>
                        <strong className="block text-white">99.9% UV Protection</strong>
                        <span className="text-white/60 text-sm">Prevents luxury furniture, artwork, and hardwood floors from sun-fading.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <ShieldCheck className="w-6 h-6 text-winmax-orange flex-shrink-0" />
                      <div>
                        <strong className="block text-white">Thermal Rejection</strong>
                        <span className="text-white/60 text-sm">Blocks significant infrared heat, reducing the load on your villa's AC system.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <ShieldCheck className="w-6 h-6 text-winmax-orange flex-shrink-0" />
                      <div>
                        <strong className="block text-white">Shatter Resistance</strong>
                        <span className="text-white/60 text-sm">The 0.4mm self-adhesive layer acts as safety glass, holding shards together if broken.</span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-sm text-white/50 italic">
                      "We can confidently retrofit the film onto your existing windows without any heavy construction or glass removal. The process is completely dust-free."
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="Residential Services"
          headline={<>UPGRADE YOUR <span className="text-winmax-orange">VILLA.</span></>}
          subtext="Book a free home consultation. Our engineers will measure your glass dimensions and demonstrate a live sample of the smart film in your space."
          whatsappMessage="Hello, I would like to book a free home measurement for smart film installation in my villa."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SmartFilmForVillas;
