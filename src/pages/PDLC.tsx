import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  FileText, Cpu, Database, Microscope,
  ArrowRight, Zap, Smartphone, Eye, Home, Building2, Sun, Shield, CheckCircle2, Layers, Wind
} from "lucide-react";
import heroImage from "@/assets/banners/hero-smart-glass.jpg";
import conferenceImage from "@/assets/images/conference-room.jpg";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";

// ...Existing Code Verticals...


const pdlcVerticals = [
  {
    id: "residential",
    icon: Home,
    title: "Residential & Villas",
    subtitle: "Smart Privacy for Luxury Homes",
    badge: "Home & Villa",
    description:
      "Transform bathroom glass, bedroom partitions, skylights, and exterior glazing in villas and apartments into on-demand privacy surfaces. Integrates seamlessly with KNX, Crestron, Google Home, and Alexa ecosystems for automated privacy scenes. We provide specialized installation for luxury estates through our specialized residential branch.",
    link: "/smart-film-for-villas-uae",
    linkText: "Explore Smart Film for Villas",
    features: [
      "Bathroom & bedroom partition privacy",
      "Skylight & rooflight dimming",
      "Smart home (KNX/Zigbee/Alexa) integration",
      "Automated scene-based control",
      "Blocks 99.9% UV, 92% IR radiation",
      "Energy-efficient: < 5W / m² power draw",
    ],
    specs: [
      { label: "Switch Speed", value: "< 0.1 sec" },
      { label: "UV Block", value: "99.9%" },
      { label: "Power Draw", value: "< 5W/m²" },
      { label: "Lifespan", value: "10+ Years" },
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Smart Glass Villa — Instant privacy at the touch of a button",
  },
  {
    id: "office",
    icon: Building2,
    title: "Corporate & Office",
    subtitle: "Dynamic Partition Walls & Boardrooms",
    badge: "Office & Commercial",
    description:
      "Replace static frosted glass in meeting rooms, executive offices, and open-plan partition walls with electronically switchable PDLC film or laminated glass. Create open, collaborative spaces that instantly convert to private meeting environments — without blinds, curtains, or mechanical systems.",
    link: "/smart-film-for-offices-uae",
    linkText: "View Office & Boardroom Solutions",
    features: [
      "Meeting room & boardroom privacy",
      "Open-plan partition conversion",
      "Reception and lobby feature walls",
      "Integrated with room booking systems",
      "Custom logo & pattern printing available",
      "Retro-fit film onto existing glass",
    ],
    specs: [
      { label: "Haze (Off)", value: "95%+" },
      { label: "Clarity (On)", value: "80%+ VLT" },
      { label: "Thickness", value: "0.4 mm film" },
      { label: "Control", value: "Switch/App/Timer" },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "PDLC Office Partitions — Open collaboration, instant privacy",
  },
  {
    id: "hospitality",
    icon: Layers,
    title: "Hotels & Hospitality",
    subtitle: "Premium Guest Experience Glass",
    badge: "Hotels & Resorts",
    description:
      "Deliver a five-star guest experience with PDLC smart glass in hotel room shower enclosures, suite dividers, spa treatment rooms, and restaurant vu booths. Replace manual blinds and curtains with whisper-quiet electronic privacy glass that elevates the aesthetic language of any luxury hospitality space — from boutique hotels to large-scale resort properties across the UAE.",
    features: [
      "Shower room & bathroom enclosures",
      "Suite bedroom/bathroom dividers",
      "Spa & treatment room privacy",
      "Restaurant VIP booth separation",
      "Silent, maintenance-free operation",
      "Retains fire-rated glass properties",
    ],
    specs: [
      { label: "Noise Level", value: "Silent" },
      { label: "Impact Rating", value: "CAT 1" },
      { label: "Fire Rating", value: "Retained" },
      { label: "Warranty", value: "5 Years" },
    ],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Hotel Smart Glass — Five-star privacy without curtains",
    link: "/switchable-privacy-glass-dubai",
    linkText: "Hospitality Glass Specs",
  },
  {
    id: "projection",
    icon: Eye,
    title: "Projection & Display",
    subtitle: "Rear-Projection Smart Glass",
    badge: "Media & Retail",
    description:
      "PDLC glass doubles as a high-gain rear-projection screen. In transparent mode it acts as a standard window or partition; switch it to frosted mode and project marketing content, presentations, or interactive media directly onto the glass.",
    link: "/switchable-privacy-glass-dubai",
    linkText: "Learn about Switchable Tech",
    features: [
      "High-gain rear-projection surface",
      "Storefront & retail display screens",
      "Showroom product reveal walls",
      "Exhibition & event installations",
      "Compatible with standard projectors",
      "Double-duty: window + screen",
    ],
    specs: [
      { label: "Gain", value: "1.5 gain" },
      { label: "Viewing Angle", value: "160°" },
      { label: "Resolution", value: "4K Compatible" },
      { label: "Contrast", value: "800:1" },
    ],
    image: "https://images.unsplash.com/photo-1558002038-1037906d9974?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Rear-Projection Smart Glass — Storefront meets display screen",
  },
];

// ─── Spec Table ────────────────────────────────────────────────────────────────

const technicalSpecs = [
  { label: "UV Protection", value: "99.9%", status: "Certified" },
  { label: "IR Rejection", value: "92%+", status: "Optimized" },
  { label: "Transition Time", value: "< 0.1 sec", status: "Instant" },
  { label: "Energy Consumption", value: "< 5W/m²", status: "Class A" },
  { label: "Haze Rating (Off State)", value: "95%+", status: "Full Privacy" },
  { label: "Impact Resistance", value: "CAT 1", status: "Secure" },
];

// ─── Engineering Specs Cards ──────────────────────────────────────────────────

const engineeringCards = [
  { label: "UV Protection", value: "99.9", unit: "%", detail: "Blocks near-total UV to protect occupants and interior furnishings." },
  { label: "Transition Time", value: "< 0.1", unit: "sec", detail: "Liquid crystal response is effectively instantaneous." },
  { label: "Power Draw", value: "< 5", unit: "W/m²", detail: "Lower energy consumption than a standard LED bulb per square metre." },
  { label: "Service Life", value: "10+", unit: "Years", detail: "Tested for long-term UAE climate operation under extreme heat and UV." },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

const showcaseItems = [
  {
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=900&auto=format&fit=crop",
    title: "Luxury Villa Bathroom",
    tag: "Residential Smart Privacy",
  },
  {
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=900&auto=format&fit=crop",
    title: "Corporate Boardroom Partition",
    tag: "Office Commercial",
  },
  {
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=900&auto=format&fit=crop",
    title: "Hotel Suite Divider",
    tag: "Hospitality Grade",
  },
];

// ─── Schema ────────────────────────────────────────────────────────────────────

const pdlcSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://winmaxgulf.com/pdlc#service",
      "name": "PDLC Smart Glass & Film Installation",
      "description": "Professional installation of PDLC switchable smart glass and privacy film in Dubai and UAE. Suitable for residential villas, offices, hospitals, and retail displays.",
      "provider": {
        "@type": "Organization",
        "name": "Winmax Gulf",
        "@id": "https://winmaxgulf.com/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "United Arab Emirates"
      },
      "category": "Architectural Technology",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "GCC"]
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://winmaxgulf.com/pdlc"
      }
    },
    {
      "@type": "Product",
      "name": "PDLC Smart Glass & Switchable Film",
      "image": "https://winmaxgulf.com/assets/banners/hero-smart-glass.jpg",
      "description": "Premium switchable privacy glass and PDLC film for residential and commercial architectural installations in Dubai.",
      "brand": {
        "@type": "Brand",
        "name": "Winmax Gulf"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "AED",
        "availability": "https://schema.org/InStock",
        "areaServed": ["Dubai", "Abu Dhabi", "GCC"]
      }
    }
  ]
};

// ─── Component ─────────────────────────────────────────────────────────────────

const PDLC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SEOHead
        title="PDLC Smart Film UAE | Switchable Privacy Glass Dubai"
        description="Premium PDLC smart film installation in Dubai and UAE. Retrofit privacy film, switchable smart glass, automation controls, and expert installation for offices, villas, and commercial spaces."
        keywords="PDLC smart film UAE, switchable glass Dubai, smart privacy glass, electronic glass UAE, PDLC film installation Dubai, privacy glass Abu Dhabi, rear projection glass UAE"
        structuredData={pdlcSchema}
      />

      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[{ label: "PDLC Smart Glass", href: "/pdlc" }]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Winmax Gulf PDLC Smart Glass Installation"
              className="absolute inset-0 w-full h-full object-cover object-left opacity-90 brightness-110 scale-105"
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }}
            />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-5xl">
              <Reveal>
                <span className="inline-block text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-6 px-4 py-1.5 border border-winmax-orange/25 rounded-full">
                  PDLC Smart Glass Solutions
                </span>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 mt-4">
                  PDLC <span className="text-transparent bg-clip-text bg-gradient-to-br from-winmax-orange via-orange-400 to-white">Smart Film</span>
                  <br />
                  IN UAE
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
                  From <span className="text-white font-medium">luxury villa bathrooms</span> and{" "}
                  <span className="text-white font-medium">corporate boardrooms</span> to{" "}
                  <span className="text-white font-medium">hotel suites</span> and{" "}
                  <span className="text-white font-medium">rear-projection displays</span> — we supply, install, and integrate PDLC switchable smart glass across the UAE.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="flex flex-wrap gap-10">
                  <div className="border-l-2 border-winmax-orange/40 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">UV Protection</span>
                    <span className="text-sm font-bold">99.9% Blocked</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Transition</span>
                    <span className="text-sm font-bold">&lt; 0.1 Second</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Power</span>
                    <span className="text-sm font-bold">&lt; 5W / m²</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── APPLICATION TABS ──────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden bg-[#050505] border-y border-white/5">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <div className="mb-16">
                <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">[ Applications ]</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">WHERE WE <span className="text-white/30">INSTALL.</span></h2>
                <p className="text-muted-foreground font-light max-w-2xl leading-relaxed">
                  PDLC smart glass transforms any glazed surface into a switchable privacy screen. Explore the four primary application environments we serve across the UAE.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 flex flex-col gap-2">
                {pdlcVerticals.map((vert, idx) => {
                  const TabIcon = vert.icon;
                  return (
                    <button key={vert.id} onClick={() => setActiveTab(idx)}
                      className={`text-left p-6 rounded-3xl transition-all duration-500 border ${activeTab === idx ? "bg-winmax-orange/10 border-winmax-orange/30 shadow-[0_0_30px_rgba(255,102,0,0.1)]" : "bg-transparent border-transparent hover:bg-white/5"}`}>
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-xl transition-colors duration-500 ${activeTab === idx ? "bg-winmax-orange/20 text-winmax-orange" : "bg-white/5 text-white/50"}`}>
                          <TabIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`font-bold text-lg tracking-tight transition-colors duration-500 ${activeTab === idx ? "text-white" : "text-white/60"}`}>{vert.title}</h4>
                          <span className={`text-[10px] uppercase tracking-widest font-mono mt-1 block transition-colors duration-500 ${activeTab === idx ? "text-winmax-orange/80" : "text-white/30"}`}>{vert.badge}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-8 relative min-h-[620px]">
                <AnimatePresence mode="wait">
                  {(() => {
                    const vert = pdlcVerticals[activeTab];
                    const VertIcon = vert.icon;
                    return (
                      <motion.div key={activeTab}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col">
                        <div className="relative h-52 overflow-hidden flex-shrink-0">
                          <img src={vert.image} alt={vert.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                          <div className="absolute top-4 left-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-winmax-orange/30 rounded-full">
                              <VertIcon className="w-3 h-3 text-winmax-orange" />
                              <span className="text-[10px] tracking-widest uppercase font-mono text-winmax-orange">{vert.badge}</span>
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-5"><span className="text-[10px] font-mono text-white/40 tracking-widest">{vert.imageCaption}</span></div>
                        </div>
                        <div className="p-8 md:p-10 flex flex-col gap-5 flex-1">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">{vert.subtitle}</h3>
                            <p className="text-base text-muted-foreground font-light leading-relaxed">{vert.description}</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                            {vert.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-winmax-orange flex-shrink-0" />
                                <span className="text-sm text-white/70">{f}</span>
                              </div>
                            ))}
                          </div>
                          {vert.link && (
                            <Link to={vert.link} className="inline-flex items-center gap-2 text-winmax-orange font-bold text-sm hover:underline group/link">
                              {vert.linkText}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                          )}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-white/10 mt-auto">
                            {vert.specs.map((spec, sIdx) => (
                              <div key={sIdx}>
                                <span className="block text-[10px] uppercase font-mono tracking-widest text-white/30 mb-1">{spec.label}</span>
                                <span className="font-bold text-white tracking-tight text-sm">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── SHOWCASE ──────────────────────────────────────────────────── */}
        <section className="py-20 relative bg-[#020202]">
          <div className="container mx-auto px-6 lg:px-12">
            <Reveal>
              <h2 className="text-3xl font-bold mb-12 tracking-tight border-l-4 border-winmax-orange pl-6">Installed Across <span className="text-winmax-orange">UAE.</span></h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {showcaseItems.map((item, idx) => (
                <Reveal delay={idx * 0.12} key={idx}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group border border-white/5 shadow-xl">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8">
                      <span className="text-white font-bold tracking-widest uppercase text-sm mb-1">{item.title}</span>
                      <span className="text-winmax-orange font-mono text-[10px] uppercase tracking-widest">{item.tag}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGINEERING METRICS ───────────────────────────────────────── */}
        <section className="py-32 bg-white/[0.01] relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
              <Reveal>
                <div>
                  <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">[ Technical Specifications ]</span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">GLASS<br />METRICS.</h2>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
                  Every PDLC installation meets international performance benchmarks for UV protection, energy efficiency, and durability in the UAE's extreme climate.
                </p>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {engineeringCards.map((spec, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up">
                  <GlassmorphismCard className="p-10 border-white/5 group relative overflow-hidden bg-white/[0.01]">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-winmax-orange/30 to-transparent group-hover:via-winmax-orange transition-all duration-500" />
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold tracking-tighter group-hover:text-winmax-orange transition-colors">{spec.value}</span>
                      <span className="text-sm font-mono text-muted-foreground">{spec.unit}</span>
                    </div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/90 mb-2">{spec.label}</h4>
                    <p className="text-[11px] text-muted-foreground font-mono leading-relaxed group-hover:text-white/60 transition-colors">{spec.detail}</p>
                  </GlassmorphismCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── KNOWLEDGE HUB ────────────────────────────────────────────── */}
        <section className="py-32 relative bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <div className="mb-20 text-center">
                <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">[ Knowledge Center ]</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">RESOURCES & <span className="text-white/30">INSIGHTS.</span></h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Reveal delay={0.1}>
                <Link to="/smart-film-cost-uae" className="group block bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-winmax-orange/30 transition-all h-full">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-winmax-orange transition-colors">Pricing Guide</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">Understand how smart film cost is calculated per square meter in the UAE market.</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors flex items-center gap-2">View Pricing Breakdown <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </Reveal>

              <Reveal delay={0.2}>
                <Link to="/pdlc-vs-smart-glass" className="group block bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-winmax-orange/30 transition-all h-full">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-winmax-orange transition-colors">Film vs Glass</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">Learn the technical differences between retrofit adhesive film and factory laminated glass.</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors flex items-center gap-2">Read Tech Comparison <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </Reveal>

              <Reveal delay={0.3}>
                <Link to="/smart-film-automation" className="group block bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-winmax-orange/30 transition-all h-full">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-winmax-orange transition-colors">Integration & BMS</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">Advanced guides for connecting PDLC systems to KNX, Crestron, and central building controls.</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors flex items-center gap-2">View Integration Docs <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </Reveal>

              <Reveal delay={0.4}>
                <Link to="/pdlc-faq" className="group block bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-winmax-orange/30 transition-all h-full">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-winmax-orange transition-colors">Technical FAQ</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">Answers to the most common engineering and installation questions for switchable tech.</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors flex items-center gap-2">See All Questions <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </Reveal>
            </div>
            
            <div className="mt-12 flex justify-center gap-8">
               <Link to="/case-study-difc" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-winmax-orange transition-colors flex items-center gap-2 underline decoration-white/10 underline-offset-8">Case Study: DIFC Office</Link>
               <Link to="/case-study-royal-villa" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-winmax-orange transition-colors flex items-center gap-2 underline decoration-white/10 underline-offset-8">Case Study: Palm Jumeirah</Link>
            </div>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="PDLC Smart Glass"
          headline={<>ELEVATE YOUR<br /><span className="text-winmax-orange">SPACE.</span></>}
          subtext="From a single bathroom panel to a full office partition — our team will survey, specify, and install PDLC smart glass tailored to your environment across the UAE."
          whatsappMessage="Hello, I am interested in your PDLC Smart Glass solutions and would like a free survey."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default PDLC;