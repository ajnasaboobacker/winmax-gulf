import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TechnicalResources from "@/components/TechnicalResources";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  FileText, Cpu, Database, Microscope, Monitor,
  ArrowRight, Building2, Store, Calendar, Tv, Star, CheckCircle2
} from "lucide-react";
import ledBanner from "@/assets/banners/led-banner.png";
import ledDisplay from "@/assets/images/led-display.png";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";

// --- Page Resources ---

const ledResources = [
  {
    title: "High-Pitch Calibration Standards",
    type: "Whitepaper",
    size: "2.9 MB",
    description: "Technical standards for P0.9 to P2.5 displays including 22-bit grey scale depth and 7,680Hz refresh rate calibration.",
    icon: Monitor
  },
  {
    title: "Thermal Management Systems",
    type: "Technical Guide",
    size: "3.4 MB",
    description: "Detailed cooling architecture requirements for outdoor LED signage operating in extreme UAE ambient temperatures (+50°C).",
    icon: Microscope
  },
  {
    title: "Creative LED Geometry Specs",
    type: "Design Guide",
    size: "1.9 MB",
    description: "Engineering specifications for flexible, transparent, and curved LED modules for architectural facade integration.",
    icon: FileText
  },
  {
    title: "Content Sync & Timing logic",
    type: "Spec Sheet",
    size: "1.4 MB",
    description: "Protocols for frame-delay synchronization across multi-controller video wall clusters and distributed display networks.",
    icon: Database
  }
];

// ─── LED Product Verticals ─────────────────────────────────────────────────────

const ledVerticals = [
  {
    id: "outdoor",
    icon: Building2,
    title: "Outdoor LED Screens",
    subtitle: "High-Brightness Billboard & Facade Displays",
    badge: "Exterior & Facades",
    description:
      "Ultra-bright outdoor LED displays engineered to cut through direct sunlight in the UAE's intense climate. Our outdoor screens deliver up to 8,500 nits peak brightness with IP66 weatherproofing for dust, humidity, and rain resistance. Ideal for roadside billboards, building facades, petrol station canopies, stadium perimeters, and outdoor event backdrops.",
    features: [
      "8,500 nits peak brightness (direct sunlight readable)",
      "IP66 weatherproof — dust & water resistant",
      "Pixel pitch: P4 to P10 outdoor options",
      "Automatic brightness adjustment (day/night)",
      "Low power consumption with smart dimming",
      "Wind-load rated structural mounting systems",
    ],
    specs: [
      { label: "Max Brightness", value: "8,500 nits" },
      { label: "Protection", value: "IP66" },
      { label: "Pixel Pitch", value: "P4 – P10" },
      { label: "Lifespan", value: "100,000 hrs" },
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Outdoor LED Billboard — 8,500 nits in full UAE sunlight",
  },
  {
    id: "indoor",
    icon: Monitor,
    title: "Indoor Fine-Pitch Walls",
    subtitle: "Ultra-HD Video Walls & Conference Displays",
    badge: "Indoor Commercial",
    description:
      "Fine-pitch indoor LED video walls for corporate lobbies, boardrooms, control rooms, broadcast studios, and retail flagships. With pixel pitches from P0.9 to P2.5, our indoor displays deliver 4K — even 8K — resolution across large seamless canvases. HDR-certified colour reproduction at up to 22-bit depth, 7,680Hz refresh for flicker-free video capture.",
    features: [
      "Ultra-fine pixel pitch: P0.9 to P2.5",
      "22-bit colour depth, HDR certified",
      "7,680Hz refresh — flicker-free on camera",
      "Seamless borderless panel system",
      "Front-access maintenance design",
      "Low EMF for control room environments",
    ],
    specs: [
      { label: "Pixel Pitch", value: "P0.9 – P2.5" },
      { label: "Colour Depth", value: "22-bit" },
      { label: "Refresh Rate", value: "7,680 Hz" },
      { label: "Contrast", value: "5,000:1+" },
    ],
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Fine-Pitch Indoor LED Wall — Seamless 4K in a corporate lobby",
  },
  {
    id: "retail",
    icon: Store,
    title: "Retail & Wayfinding",
    subtitle: "In-Store Digital Signage & Menu Boards",
    badge: "Retail & F&B",
    description:
      "High-impact digital signage for retail stores, shopping malls, restaurants, fast-food chains, and hospitality venues. Our modular LED totems, menu boards, and strip displays drive dwell time, promote products, and update dynamically — all managed remotely via cloud-based content management systems compatible with every major CMS platform including BrightSign, Samsung MagicINFO, and custom APIs.",
    features: [
      "LED menu boards & digital price lists",
      "Indoor totem & freestanding displays",
      "Cloud CMS remote content scheduling",
      "Multi-screen synchronized campaigns",
      "Portrait & landscape configurations",
      "Energy-efficient 24/7 commercial rating",
    ],
    specs: [
      { label: "Brightness", value: "1,500 nits" },
      { label: "Pixel Pitch", value: "P1.8 – P4" },
      { label: "Control", value: "Cloud CMS" },
      { label: "Formats", value: "Portrait/Landscape" },
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Retail LED Signage — Dynamic cloud-managed display network",
  },
  {
    id: "rental",
    icon: Calendar,
    title: "Rental & Events",
    subtitle: "Modular LED Stages for Events",
    badge: "Events & Exhibitions",
    description:
      "High-performance modular LED rental panels for live events, concerts, exhibitions, award ceremonies, product launches, and corporate town halls. Our rental inventory features lightweight aluminium cabinet panels that assemble in hours — creating massive seamless screens at any shape or dimension. Full technical crew support, delivery, rigging, and on-site operation available across the UAE.",
    features: [
      "Lightweight modular rental panels",
      "Indoor from P1.5 & outdoor from P1.5 stock",
      "Custom shapes and curved configurations",
      "Full rigging & structural support",
      "On-site technical crew included",
      "Delivered across Dubai, Abu Dhabi & GCC",
    ],
    specs: [
      { label: "Indoor Pitch", value: "From - P1.5" },
      { label: "Outdoor Pitch", value: "P3.9" },
      { label: "Cabinet Weight", value: "< 9 kg" },
      { label: "Build Time", value: "Per hour" },
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Event Rental LED — Modular stage screen for corporate launch",
  },
];

// ─── Engineering Metrics ───────────────────────────────────────────────────────

const engineeringCards = [
  { label: "Refresh Rate", value: "7,680", unit: "Hz", detail: "Flicker-free on broadcast cameras and high-speed video." },
  { label: "Peak Brightness", value: "8,500", unit: "nits", detail: "Outdoor readability in direct UAE midday sunlight." },
  { label: "Colour Depth", value: "22", unit: "bit", detail: "HDR-certified with full DCI-P3 wide colour gamut coverage." },
  { label: "IP Rating", value: "IP66", unit: "", detail: "Certified dust-tight and water-jet proof for UAE outdoor use." },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

const showcaseItems = [
  {
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=900&auto=format&fit=crop",
    title: "Outdoor LED Billboard",
    tag: "8,500 Nits · IP66",
  },
  {
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=900&auto=format&fit=crop",
    title: "Corporate Lobby Video Wall",
    tag: "P1.2 Fine Pitch · HDR",
  },
  {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop",
    title: "Event Stage LED Screen",
    tag: "Modular Rental · Full Crew",
  },
];

// ─── Schema ────────────────────────────────────────────────────────────────────

const ledSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://winmaxgulf.com/led-display#service",
      "name": "LED Display Systems Installation",
      "description": "Professional LED display systems across UAE. Includes outdoor billboards, fine-pitch indoor video walls, retail digital signage, and modular event rental screens.",
      "provider": {
        "@type": "Organization",
        "name": "Winmax Gulf",
        "@id": "https://winmaxgulf.com/#organization"
      },
      "areaServed": [
        { "@type": "Place", "name": "Dubai" },
        { "@type": "Place", "name": "Abu Dhabi" },
        { "@type": "Place", "name": "Sharjah" }
      ],
      "offers": {
        "@type": "Offer",
        "areaServed": "AE"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://winmaxgulf.com/led-display"
      }
    },
    {
      "@type": "Product",
      "name": "Professional LED Display Systems",
      "image": "https://winmaxgulf.com/assets/banners/led-banner.png",
      "description": "High-brightness outdoor LED billboards, fine-pitch indoor video walls, and retail digital signage systems in Dubai.",
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
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Commercial LED Display System?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Commercial LED Display System is a large-scale, highly luminous digital screen composed of seamless Light Emitting Diode (LED) modules. Designed for both indoor and outdoor applications, these sophisticated video walls offer unparalleled brightness, contrast, and colour depth compared to standard LCD screens. Depending on the viewing distance, LED screens utilize varying pixel pitches—from ultra-fine P0.9 for indoor 4K boardrooms to P10 for massive roadside billboards. In the UAE, outdoor LED displays must be rigorously engineered to survive the intense Middle Eastern climate. High-quality installations feature IP66 weatherproofing against severe dust storms and rain, along with advanced thermal management to operate in temperatures exceeding 50°C. Outputting up to 8,500 nits of peak brightness, these screens remain perfectly readable under direct midday sun. Indoor fine-pitch solutions, commonly found in Dubai's corporate lobbies and broadcast studios, deliver 7,680Hz refresh rates to ensure flawless, flicker-free performance on camera."
          }
        }
      ]
    }
  ]
};

// ─── Component ─────────────────────────────────────────────────────────────────

const LEDDisplay = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SEOHead
        title="LED Display Systems Dubai | Video Walls & Digital Signage UAE | WinmaxGulf"
        description="Professional LED display installation in Dubai. Outdoor billboards, fine-pitch indoor video walls, retail digital signage, and event rental screens. Experts across UAE."
        keywords="LED display Dubai, LED video wall UAE, outdoor LED screen, indoor LED display, LED billboard Dubai, LED screen rental UAE, digital signage Dubai"
        structuredData={ledSchema}
      />

      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[{ label: "LED Display Systems", href: "/led-display" }]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={ledBanner}
              alt="Winmax Gulf High-Brightness LED Display Installation"
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
                  LED Display Solutions
                </span>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 mt-4">
                  MAXIMUM IMPACT.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-winmax-orange via-orange-400 to-white">
                    PIXEL PERFECT.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
                  From <span className="text-white font-medium">outdoor billboards</span> and{" "}
                  <span className="text-white font-medium">fine-pitch indoor video walls</span> to{" "}
                  <span className="text-white font-medium">retail digital signage</span> and{" "}
                  <span className="text-white font-medium">event rental screens</span> — we supply, install, and support LED display systems across the UAE.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="flex flex-wrap gap-10">
                  <div className="border-l-2 border-winmax-orange/40 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Brightness</span>
                    <span className="text-sm font-bold">Up to 8,500 nits</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Refresh Rate</span>
                    <span className="text-sm font-bold">7,680 Hz</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Protection</span>
                    <span className="text-sm font-bold">IP66 Weatherproof</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── AI / GEO CITABLE DEFINITION ────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#080808] border-y border-white/5 relative z-10">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">What is a Commercial LED Display System?</h2>
                <div className="prose prose-invert max-w-none text-white/70 leading-relaxed font-light text-base md:text-lg">
                  <p>
                    A Commercial LED Display System is a large-scale, highly luminous digital screen composed of seamless Light Emitting Diode (LED) modules. Designed for both indoor and outdoor applications, these sophisticated video walls offer unparalleled brightness, contrast, and colour depth compared to standard LCD screens. Depending on the viewing distance, LED screens utilize varying pixel pitches—from ultra-fine P0.9 for indoor 4K boardrooms to P10 for massive roadside billboards.
                  </p>
                  <p className="mt-5">
                    In the UAE, outdoor LED displays must be rigorously engineered to survive the intense Middle Eastern climate. High-quality installations feature IP66 weatherproofing against severe dust storms and rain, along with advanced thermal management to operate in temperatures exceeding 50°C. Outputting up to 8,500 nits of peak brightness, these screens remain perfectly readable under direct midday sun. Indoor fine-pitch solutions, commonly found in Dubai's corporate lobbies and broadcast studios, deliver 7,680Hz refresh rates to ensure flawless, flicker-free performance on camera.
                  </p>
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
                <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">[ Display Categories ]</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">WHAT WE <span className="text-white/30">SUPPLY.</span></h2>
                <p className="text-muted-foreground font-light max-w-2xl leading-relaxed">
                  From a single roadside billboard to a multi-screen indoor video wall ecosystem — explore our four core LED display product categories.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 flex flex-col gap-2">
                {ledVerticals.map((vert, idx) => {
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
                    const vert = ledVerticals[activeTab];
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
              <h2 className="text-3xl font-bold mb-12 tracking-tight border-l-4 border-winmax-orange pl-6">Deployed Across <span className="text-winmax-orange">UAE.</span></h2>
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
                  <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">[ Performance Standards ]</span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">DISPLAY<br />METRICS.</h2>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
                  Every LED display we install meets international performance benchmarks — from brightness and colour depth to weather and lifespan certification.
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

        <TechnicalResources resources={ledResources} />

        <ServiceBrochureCTA
          badge="LED Display Systems"
          headline={<>LIGHT UP YOUR<br /><span className="text-winmax-orange">BRAND.</span></>}
          subtext="From a single digital menu board to a campus-wide LED network — our team will survey, design, and install professionally across Dubai, Abu Dhabi, and the UAE."
          whatsappMessage="Hello, I am interested in your LED Display solutions and would like a quote."
          brochureFile="/brochures/led-display-systems.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default LEDDisplay;