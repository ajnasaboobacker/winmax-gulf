import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Monitor,
  Video,
  Phone,
  Wifi,
  Building2,
  Mic2,
  Settings,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import heroImage from "@/assets/collaboration-av-banner.png";

// ─── Product Categories ────────────────────────────────────────────────────────

const productCategories = [
  {
    id: "meeting-pods",
    icon: Building2,
    title: "Meeting Pods",
    subtitle: "Acoustic Isolation Environments",
    badge: "Privacy Workspaces",
    description:
      "Purpose-built, self-contained acoustic pods designed for open-plan offices, hot-desk environments, and co-working spaces. Our pods deliver 42dB STC sound isolation, integrated LED lighting, ventilation, and power — all in a plug-and-play modular format. Available in 1-person focus pods through to 6-person boardroom enclosures.",
    features: [
      "42 dB STC acoustic isolation",
      "Built-in LED + ventilation system",
      "Integrated power & USB-C charging",
      "Modular flat-pack installation",
      "Optional display & AV pre-wiring",
      "Carpet, glass & panel customisation",
    ],
    specs: [
      { label: "STC Rating", value: "42 dB" },
      { label: "Airflow", value: "240 m³/h" },
      { label: "Capacity", value: "1–6 Pax" },
      { label: "Setup", value: "Plug & Play" },
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Acoustic Meeting Pod — Private workspace in open office",
  },
  {
    id: "ip-phones",
    icon: Phone,
    title: "IP Phones",
    subtitle: "Enterprise VoIP Communication",
    badge: "Desk & Reception",
    description:
      "Enterprise-grade IP desk phones and reception consoles from leading brands including Cisco, Yealink, and Fanvil. Our VoIP solutions integrate natively with Microsoft Teams, Cisco Unified Communications, Avaya, and major PBX platforms — replacing traditional PSTN lines with crystal-clear HD voice over your existing IP network.",
    features: [
      "HD voice / Wideband audio (G.722)",
      "Microsoft Teams & Cisco UC native",
      "PoE powered — no separate adapter",
      "Colour LCD display with directory",
      "Conference & BLF expansion keys",
      "TLS / SRTP encrypted voice calls",
    ],
    specs: [
      { label: "Protocol", value: "SIP / H.323" },
      { label: "Audio", value: "HD G.722" },
      { label: "Power", value: "PoE 802.3af" },
      { label: "Encryption", value: "TLS / SRTP" },
    ],
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Enterprise IP Phone — HD voice on your existing network",
  },
  {
    id: "av-conferencing",
    icon: Video,
    title: "Audio / Video Conferencing",
    subtitle: "Studio-Grade Room Systems",
    badge: "Board & Huddle Rooms",
    description:
      "End-to-end video conferencing room systems for huddle spaces, team rooms, and executive boardrooms. We supply and install PTZ cameras, professional soundbars, ceiling microphone arrays, and touch-panel controllers — all pre-certified for Microsoft Teams Rooms, Zoom Rooms, and Cisco Webex hardware ecosystems.",
    features: [
      "4K PTZ camera arrays (up to 90° FOV)",
      "Beamforming ceiling microphones",
      "Teams / Zoom / Webex certified hardware",
      "One-touch meeting join on touch panel",
      "AES-256 encrypted media streams",
      "Content sharing up to 4K / 60fps",
    ],
    specs: [
      { label: "Resolution", value: "4K / 60fps" },
      { label: "Encryption", value: "AES-256" },
      { label: "Latency", value: "< 100 ms" },
      { label: "Mic Array", value: "Beamforming" },
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Video Conferencing Room — One-touch join for Teams & Zoom",
  },
  {
    id: "smart-office",
    icon: Settings,
    title: "Smart Office Solutions",
    subtitle: "Unified Workplace Intelligence",
    badge: "Full Office Automation",
    description:
      "Transform your entire office into a responsive, intelligent environment. We design and deploy centralised room control systems, automated lighting and blind control, desk booking kiosks, digital door signage, and network infrastructure — giving your team a modern, efficient workplace that works seamlessly from the moment they enter.",
    features: [
      "Central Crestron / AMX room control",
      "Automated lighting & HVAC scenes",
      "Desk & room booking display panels",
      "Digital wayfinding & signage",
      "Structured cabling & Wi-Fi 6 infra",
      "Remote monitoring & helpdesk support",
    ],
    specs: [
      { label: "Protocol", value: "Crestron / AMX" },
      { label: "Devices", value: "512 max" },
      { label: "Network", value: "Wi-Fi 6 / Cat6A" },
      { label: "Response", value: "0.05 sec" },
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Smart Office Hub — Centralised intelligent workplace control",
  },
];

// ─── Engineering Specs ─────────────────────────────────────────────────────────

const engineeringSpecs = [
  {
    label: "Signal Bandwidth",
    value: "18",
    unit: "Gbps",
    detail: "Uncompressed HDMI 2.1 throughput for flawless 4K/8K delivery.",
  },
  {
    label: "Audio Protocol",
    value: "Dante",
    unit: "IP",
    detail: "Network-based low-latency audio routing across all room endpoints.",
  },
  {
    label: "Acoustic Rating",
    value: "42",
    unit: "dB",
    detail: "STC isolation rating on our premium acoustic pod enclosures.",
  },
  {
    label: "Voice Security",
    value: "AES",
    unit: "256",
    detail: "TLS/SRTP encrypted VoIP calls on all IP phone deployments.",
  },
];

// ─── Showcase Gallery ──────────────────────────────────────────────────────────

const showcaseItems = [
  {
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=900&auto=format&fit=crop",
    title: "Acoustic Meeting Pods",
    tag: "Open Plan Privacy",
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=900&auto=format&fit=crop",
    title: "Executive Boardrooms",
    tag: "Premium AV Integration",
  },
  {
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=900&auto=format&fit=crop",
    title: "Team Huddle Rooms",
    tag: "Microsoft Teams Ready",
  },
];

// ─── Schema ────────────────────────────────────────────────────────────────────

const collaborationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://winmaxgulf.com/collaboration-av#service",
      "name": "Smart Office & Collaboration AV",
      "description": "Enterprise-grade AV conferencing, meeting pods, and IP phone systems in Dubai and Abu Dhabi. Unified communications for modern workspaces.",
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
        "@id": "https://winmaxgulf.com/collaboration-av"
      }
    }
  ]
};

// ─── Component ─────────────────────────────────────────────────────────────────

const CollaborationAV = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SEOHead
        title="Meeting Pods, IP Phones & AV Conferencing Dubai | WinmaxGulf"
        description="Acoustic meeting pods, enterprise IP phones, video conferencing systems, and smart office solutions in Dubai & Abu Dhabi. End-to-end supply, installation, and support."
        keywords="meeting pods Dubai, IP phones UAE, video conferencing Dubai, smart office UAE, AV solutions Dubai, Teams Rooms UAE, boardroom technology Dubai"
        structuredData={collaborationSchema}
      />

      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[{ label: "Collaboration AV", href: "/collaboration-av" }]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Winmax Gulf Collaboration & AV Smart Office Installation"
              className="absolute inset-0 w-full h-full object-cover object-right opacity-90 brightness-110 scale-105"
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-5xl">
              <Reveal>
                <span className="inline-block text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-6 px-4 py-1.5 border border-winmax-orange/25 rounded-full">
                  Collaboration &amp; AV Solutions
                </span>
              </Reveal>

              <Reveal delay={0.15}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 mt-4">
                  SMARTER OFFICES.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-winmax-orange via-orange-400 to-white">
                    SEAMLESS MEETINGS.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
                  From acoustic{" "}
                  <span className="text-white font-medium">meeting pods</span> and{" "}
                  <span className="text-white font-medium">IP phones</span> to{" "}
                  <span className="text-white font-medium">video conferencing rooms</span> and{" "}
                  <span className="text-white font-medium">full smart office automation</span> — we
                  design, supply, and install the complete collaboration stack for modern UAE
                  workplaces.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="flex flex-wrap gap-10">
                  <div className="border-l-2 border-winmax-orange/40 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                      Platform Support
                    </span>
                    <span className="text-sm font-bold">Teams · Zoom · Webex</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                      Signal
                    </span>
                    <span className="text-sm font-bold">HDMI 2.1 / 18 Gbps</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                      Security
                    </span>
                    <span className="text-sm font-bold">AES-256 / TLS Encrypted</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── PRODUCT ECOSYSTEM TABS ────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden bg-[#050505] border-y border-white/5">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <div className="mb-16">
                <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
                  [ Our Products & Services ]
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  WHAT WE{" "}
                  <span className="text-white/30">DELIVER.</span>
                </h2>
                <p className="text-muted-foreground font-light max-w-2xl leading-relaxed">
                  Every item we sell, we install. Every system we install, we support. Explore
                  our full product catalogue for the modern collaborative workspace.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Tab Nav */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {productCategories.map((cat, idx) => {
                  const TabIcon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(idx)}
                      className={`text-left p-6 rounded-3xl transition-all duration-500 border ${
                        activeTab === idx
                          ? "bg-winmax-orange/10 border-winmax-orange/30 shadow-[0_0_30px_rgba(255,102,0,0.1)]"
                          : "bg-transparent border-transparent hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`p-4 rounded-xl transition-colors duration-500 ${
                            activeTab === idx
                              ? "bg-winmax-orange/20 text-winmax-orange"
                              : "bg-white/5 text-white/50"
                          }`}
                        >
                          <TabIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4
                            className={`font-bold text-lg tracking-tight transition-colors duration-500 ${
                              activeTab === idx ? "text-white" : "text-white/60"
                            }`}
                          >
                            {cat.title}
                          </h4>
                          <span
                            className={`text-[10px] uppercase tracking-widest font-mono mt-1 block transition-colors duration-500 ${
                              activeTab === idx ? "text-winmax-orange/80" : "text-white/30"
                            }`}
                          >
                            {cat.badge}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="lg:col-span-8 relative min-h-[600px]">
                <AnimatePresence mode="wait">
                  {(() => {
                    const cat = productCategories[activeTab];
                    const CatIcon = cat.icon;
                    return (
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col"
                      >
                        {/* Product Image */}
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0a]" />
                          <div className="absolute top-4 left-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-winmax-orange/30 rounded-full">
                              <CatIcon className="w-3 h-3 text-winmax-orange" />
                              <span className="text-[10px] tracking-widest uppercase font-mono text-winmax-orange">
                                {cat.badge}
                              </span>
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-5">
                            <span className="text-[10px] font-mono text-white/40 tracking-widest">
                              {cat.imageCaption}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                              {cat.subtitle}
                            </h3>
                            <p className="text-base text-muted-foreground font-light leading-relaxed">
                              {cat.description}
                            </p>
                          </div>

                          {/* Feature list */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {cat.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-winmax-orange flex-shrink-0" />
                                <span className="text-sm text-white/70">{f}</span>
                              </div>
                            ))}
                          </div>

                          {/* Specs strip */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 mt-auto">
                            {cat.specs.map((spec, sIdx) => (
                              <div key={sIdx}>
                                <span className="block text-[10px] uppercase font-mono tracking-widest text-white/30 mb-1">
                                  {spec.label}
                                </span>
                                <span className="font-bold text-white tracking-tight text-sm">
                                  {spec.value}
                                </span>
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

        {/* ── VISUAL SHOWCASE ───────────────────────────────────────────── */}
        <section className="py-20 relative bg-[#020202]">
          <div className="container mx-auto px-6 lg:px-12">
            <Reveal>
              <h2 className="text-3xl font-bold mb-12 tracking-tight border-l-4 border-winmax-orange pl-6">
                Installed &amp; Delivered Across{" "}
                <span className="text-winmax-orange">UAE.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {showcaseItems.map((item, idx) => (
                <Reveal delay={idx * 0.12} key={idx}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group border border-white/5 shadow-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8">
                      <span className="text-white font-bold tracking-widest uppercase text-sm mb-1">
                        {item.title}
                      </span>
                      <span className="text-winmax-orange font-mono text-[10px] uppercase tracking-widest">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGINEERING SPECS ─────────────────────────────────────────── */}
        <section className="py-32 bg-white/[0.01] relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
              <Reveal>
                <div>
                  <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
                    [ Technical Standards ]
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    ENGINEERING
                    <br />
                    METRICS.
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
                  Every product we specify meets enterprise-grade performance benchmarks — from
                  acoustic isolation ratings to encrypted voice bandwidth.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {engineeringSpecs.map((spec, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up">
                  <GlassmorphismCard className="p-10 border-white/5 group relative overflow-hidden bg-white/[0.01]">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-winmax-orange/30 to-transparent group-hover:via-winmax-orange transition-all duration-500" />
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold tracking-tighter group-hover:text-winmax-orange transition-colors">
                        {spec.value}
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">{spec.unit}</span>
                    </div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/90 mb-2">
                      {spec.label}
                    </h4>
                    <p className="text-[11px] text-muted-foreground font-mono leading-relaxed group-hover:text-white/60 transition-colors">
                      {spec.detail}
                    </p>
                  </GlassmorphismCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden">
          {/* Background Orbital Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute right-[-5%] md:right-[2%] bottom-[5%] hidden md:block z-0 pointer-events-none opacity-20"
          >
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 border-[2px] border-white/30 rounded-full border-dashed" />
              <div className="absolute inset-8 border-[1.5px] border-winmax-orange/40 rounded-full" />
              <div className="absolute inset-16 border-[1px] border-white/20 rounded-full border-dashed" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-winmax-orange/10 rounded-full border border-winmax-orange/40" />
            </div>
          </motion.div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal direction="up">
              <div className="max-w-6xl mx-auto rounded-[3rem] p-12 md:p-20 border border-white/10 bg-[#080808] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-winmax-orange/5 blur-[180px] -translate-y-1/2 translate-x-1/3" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
                  <div className="flex-1">
                    <span className="inline-block text-winmax-orange font-mono text-[10px] uppercase tracking-[0.5em] mb-8 px-5 py-2 border border-winmax-orange/20 rounded-full">
                      Upgrade Your Workplace
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-6">
                      READY TO BUILD
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/60 to-white/90">
                        YOUR SMART OFFICE?
                      </span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
                      From a single meeting pod to a full office AV infrastructure — our
                      engineers will design, supply, install, and support your entire
                      collaboration stack across Dubai and Abu Dhabi.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 lg:items-end">
                    <button
                      className="group px-10 py-5 bg-winmax-orange text-black font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-3 rounded-xl shadow-[0_0_40px_rgba(255,102,0,0.3)] hover:shadow-[0_0_60px_rgba(255,102,0,0.5)]"
                      onClick={() =>
                        window.open(
                          "https://wa.me/+971504171875?text=Hello, I am interested in your Collaboration & AV solutions for my office."
                        )
                      }
                    >
                      <span>Request a Consultation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    <div className="flex flex-col items-end text-right border-t border-white/10 pt-6">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-muted-foreground mb-1">
                        Direct Engineering Line
                      </span>
                      <a
                        href="tel:+971504171875"
                        className="text-xl font-bold hover:text-winmax-orange transition-colors duration-300"
                      >
                        +971 50 417 1875
                      </a>
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/10" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/10" />
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CollaborationAV;
