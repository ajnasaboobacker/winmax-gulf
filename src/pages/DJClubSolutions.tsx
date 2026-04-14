import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Volume2, Lightbulb, Tv, Settings, Music, Mic2, CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import djBanner from "@/assets/banners/dj-banner.jpg";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";

// ─── DJ / Entertainment Verticals ─────────────────────────────────────────────

const djVerticals = [
  {
    id: "sound",
    icon: Volume2,
    title: "Pro Sound Systems",
    subtitle: "High-Fidelity Audio Engineering",
    badge: "Clubs & Lounges",
    description:
      "Club-grade line array speaker systems, subwoofer stacks, and processing infrastructure from leading brands including d&b audiotechnik, Funktion-One, RCF, and QSC. Our acoustic engineers design coverage maps for every room — ensuring flat frequency response from 20Hz to 20kHz at up to 135dB SPL with zero cross-talk or dead zones, no matter the venue shape or size.",
    features: [
      "Line array & point-source club systems",
      "Subwoofer stacks: 1x18\" to 4x21\" arrays",
      "Digital signal processing (Lake / Dante)",
      "Acoustic room analysis & coverage maps",
      "DJ booth monitor & fold-back systems",
      "Rigging, flown and ground stack configurations",
    ],
    specs: [
      { label: "Max SPL", value: "135 dB" },
      { label: "Frequency", value: "20 – 20k Hz" },
      { label: "Processing", value: "Dante / AES" },
      { label: "Rigging", value: "5:1 Safety" },
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Line Array Club Sound — 135 dB peak with zero dead zones",
  },
  {
    id: "lighting",
    icon: Lightbulb,
    title: "Club Lighting Design",
    subtitle: "Atmospheric Intelligent Lighting",
    badge: "Clubs & Events",
    description:
      "Theatrical lighting design for nightclubs, live music venues, and corporate events using DMX512 and Art-Net controlled fixtures. We design and install moving head beams, LED wash lights, pixel-mapped tubes, laser arrays, fog machines, hazer systems, and LED strobe installations — all synchronized to music via beat detection software and controllable via MA onPC, Resolume, or Avolites consoles.",
    features: [
      "Moving heads: beam, wash & hybrid",
      "Pixel-mapped LED tubes & strips",
      "Laser systems (Class 3B / 4 certified)",
      "Haze & fog machine integration",
      "DMX512 / Art-Net / sACN control",
      "Beat-sync and live show programming",
    ],
    specs: [
      { label: "Protocol", value: "DMX / Art-Net" },
      { label: "Refresh Rate", value: "44 Hz" },
      { label: "Console", value: "MA2 / Avolites" },
      { label: "Lasers", value: "Class 3B / 4" },
    ],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Club Lighting Design — Beat-synced moving heads & lasers",
  },
  {
    id: "visual",
    icon: Tv,
    title: "LED Visual Systems",
    subtitle: "Immersive Video Walls & Screens",
    badge: "Club & Event Visuals",
    description:
      "High-density LED video walls behind DJ booths, above dance floors, and across bar back-walls using fine-pitch indoor panels down to P2.6. We integrate content media servers (QL Media Server, Resolume Avenue), real-time visual effects triggered by BPM, and custom-mapped content across multi-surface installations — creating fully immersive visual narratives that amplify the performance.",
    features: [
      "DJ booth backdrop LED walls",
      "Dance floor ceiling / surround visuals",
      "Bar back-wall and feature LED displays",
      "Resolume & QL media server integration",
      "BPM-triggered visual content",
      "Custom shape & pixel-mapped surfaces",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P2.6 indoor" },
      { label: "Refresh Rate", value: "7,680 Hz" },
      { label: "Colour Depth", value: "22-bit" },
      { label: "Latency", value: "< 1 frame" },
    ],
    image: "https://images.unsplash.com/photo-1598387993441-a364f854cef5?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "DJ Booth LED Wall — BPM-triggered visual content system",
  },
  {
    id: "dj-booth",
    icon: Settings,
    title: "DJ Booth & Control",
    subtitle: "Professional Performance Environments",
    badge: "DJ Infrastructure",
    description:
      "Custom-designed DJ booths and performance hubs engineered around Pioneer, Allen & Heath, and Rane hardware ecosystems. We build purpose-built console surfaces with isolated vibration dampening, triple-redundant signal paths, balanced DI distribution, and rack-mounted professional outboard processing — all wired and tested to zero-compromise performance standards for resident and headliner artists alike.",
    features: [
      "Custom-built DJ console surfaces",
      "Pioneer CDJ-3000 / PLX / DJM wiring",
      "Triple-redundant signal paths",
      "Vibration-dampened booth platforms",
      "Balanced DI & patch-bay distribution",
      "Dedicated artist monitor systems",
    ],
    specs: [
      { label: "Signal Path", value: "Balanced XLR" },
      { label: "Redundancy", value: "Triple Path" },
      { label: "Console", value: "Pioneer / A&H" },
      { label: "Uptime", value: "99.99%" },
    ],
    image: "https://images.unsplash.com/photo-1571266028243-d220c6a3ebb7?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Pro DJ Booth — Custom console with triple-redundant routing",
  },
];

// ─── Engineering Metrics ───────────────────────────────────────────────────────

const engineeringCards = [
  { label: "Max SPL", value: "135", unit: "dB", detail: "Club-grade peak output from line array systems at full capacity." },
  { label: "Frequency Range", value: "20-20k", unit: "Hz", detail: "Full-spectrum flat response from sub-bass to high-frequency air." },
  { label: "Lighting Refresh", value: "144", unit: "Hz", detail: "Smooth flicker-free DMX frames for broadcast-quality video capture." },
  { label: "Signal Redundancy", value: "Triple", unit: "Path", detail: "Zero-downtime performance infrastructure for mission-critical shows." },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

const showcaseItems = [
  {
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=900&auto=format&fit=crop",
    title: "Nightclub Sound System",
    tag: "135 dB · Line Array",
  },
  {
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=900&auto=format&fit=crop",
    title: "Club Lighting Rig",
    tag: "DMX · Moving Heads · Laser",
  },
  {
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=900&auto=format&fit=crop",
    title: "Live Event Production",
    tag: "Full AV · Turnkey Delivery",
  },
];

// ─── Schema ────────────────────────────────────────────────────────────────────

const djSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://winmaxgulf.com/dj-club-solutions#service",
      "name": "Nightclub AV & DJ Solutions",
      "description": "Turnkey audio, lighting, and visual infrastructure for nightclubs and entertainment venues in Dubai. Includes pro sound systems, intelligent lighting, and DJ booth setups.",
      "provider": {
        "@type": "Organization",
        "name": "Winmax Gulf",
        "@id": "https://winmaxgulf.com/#organization"
      },
      "areaServed": {
        "@type": "Place",
        "name": "United Arab Emirates"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://winmaxgulf.com/dj-club-solutions"
      }
    }
  ]
};

// ─── Component ─────────────────────────────────────────────────────────────────

const DJClubSolutions = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SEOHead
        title="DJ Club Sound, Lighting & LED Systems Dubai | WinmaxGulf"
        description="Professional nightclub and entertainment AV solutions in Dubai. Sound systems, intelligent lighting, LED video walls, and custom DJ booth installations across UAE."
        keywords="nightclub engineering Dubai, DJ club systems UAE, club sound system Dubai, club lighting UAE, LED video wall club Dubai, DJ booth installation UAE"
        structuredData={djSchema}
      />

      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[{ label: "DJ & Club Solutions", href: "/dj-club-solutions" }]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={djBanner}
              alt="Winmax Gulf DJ & Club AV Solutions Installation"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90 brightness-110 scale-105"
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-5xl">
              <Reveal>
                <span className="inline-block text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-6 px-4 py-1.5 border border-winmax-orange/25 rounded-full">
                  Specialized AV & DJ Club Engineering
                </span>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 mt-4">
                  ENGINEERED FOR
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-winmax-orange via-orange-400 to-white">
                    THE DANCEFLOOR.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
                  From <span className="text-white font-medium">club-grade sound systems</span> and{" "}
                  <span className="text-white font-medium">intelligent lighting rigs</span> to{" "}
                  <span className="text-white font-medium">LED video walls</span> and{" "}
                  <span className="text-white font-medium">custom DJ booths</span> — we deliver turnkey entertainment infrastructure for nightclubs, lounges, and event venues across the UAE.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="flex flex-wrap gap-10">
                  <div className="border-l-2 border-winmax-orange/40 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Max SPL</span>
                    <span className="text-sm font-bold">135 dB</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Lighting Protocol</span>
                    <span className="text-sm font-bold">DMX512 / Art-Net</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Signal</span>
                    <span className="text-sm font-bold">Triple-Redundant Path</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── PRODUCT TABS ──────────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden bg-[#050505] border-y border-white/5">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <div className="mb-16">
                <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">[ Entertainment Systems ]</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">WHAT WE <span className="text-white/30">BUILD.</span></h2>
                <p className="text-muted-foreground font-light max-w-2xl leading-relaxed">
                  Every nightclub and entertainment venue starts with the right infrastructure. Explore our four core systems — designed, integrated, and supported end-to-end.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 flex flex-col gap-2">
                {djVerticals.map((vert, idx) => {
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
                    const vert = djVerticals[activeTab];
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {vert.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-winmax-orange flex-shrink-0" />
                                <span className="text-sm text-white/70">{f}</span>
                              </div>
                            ))}
                          </div>
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
              <h2 className="text-3xl font-bold mb-12 tracking-tight border-l-4 border-winmax-orange pl-6">Built for <span className="text-winmax-orange">UAE's Finest Venues.</span></h2>
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
                  <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">[ Technical Standards ]</span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">PERFORMANCE<br />METRICS.</h2>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
                  Every club system we build is specification-engineered and stress-tested to international professional entertainment standards.
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

        <ServiceBrochureCTA 
          headline={<>DESIGN YOUR<br /><span className="text-white/40">EXPERIENCE.</span></>}
          subtext="From a boutique lounge to a large-format nightclub — our entertainment engineers will design, install, and commission the complete sound, lighting, and visual stack for your venue across the UAE."
          badge="Build Your Venue"
          whatsappMessage="Hello, I am interested in your DJ & Club Solutions."
          brochureFile="/brochures/dj-club-solutions.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default DJClubSolutions;