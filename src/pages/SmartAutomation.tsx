import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Home,
  Building2,
  Briefcase,
  Sprout,
  Lightbulb,
  Thermometer,
  Lock,
  Wifi,
  Camera,
  Droplets,
  Wind,
  BarChart3,
  Cpu,
  CheckCircle2,
  Settings,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import heroImage from "@/assets/banners/smart-automation-banner.png";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";

// ─── Automation Verticals ──────────────────────────────────────────────────────

const automationVerticals = [
  {
    id: "home",
    icon: Home,
    title: "Home Automation",
    subtitle: "Smart Villa & Residence Control",
    badge: "Residential",
    description:
      "Transform your villa, apartment, or penthouse into a fully intelligent living environment. Control every light, curtain, air conditioner, door lock, and entertainment system from a single app or voice command. Scenes like 'Good Morning', 'Movie Night', and 'Away Mode' can be triggered automatically based on time, occupancy, or your location — making your home respond to your lifestyle, not the other way around.",
    features: [
      "Smart lighting & scene automation",
      "Motorised curtains & blind control",
      "Multi-zone A/C & climate scheduling",
      "Video intercom & smart door locks",
      "Home theatre & multi-room audio",
      "Amazon Alexa / Google Home / Siri integration",
    ],
    specs: [
      { label: "Control", value: "App / Voice" },
      { label: "Protocol", value: "KNX / Zigbee" },
      { label: "Devices", value: "Unlimited" },
      { label: "Latency", value: "< 50 ms" },
    ],
    image:
      "https://images.unsplash.com/photo-1558002038-1037906d9974?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Smart Villa — Voice-controlled residential environment",
  },
  {
    id: "office",
    icon: Building2,
    title: "Office Automation",
    subtitle: "Intelligent Workplace Environments",
    badge: "Commercial Office",
    description:
      "Modernise your office with a centralised automation system that manages lighting, HVAC, access control, occupancy sensing, and energy monitoring across every zone. Automated meeting room booking panels, presence-based lighting adjustments, and integrated security systems reduce operational overhead while dramatically improving the employee experience and energy efficiency.",
    features: [
      "Occupancy-based lighting zones",
      "Centralised HVAC scheduling",
      "Room booking & digital signage",
      "Access control & visitor management",
      "CCTV & intrusion detection",
      "Real-time energy dashboard",
    ],
    specs: [
      { label: "Protocol", value: "KNX / BACnet" },
      { label: "Zones", value: "Unlimited" },
      { label: "Uptime", value: "99.99%" },
      { label: "Energy Save", value: "Up to 45%" },
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Smart Office — Centralised workplace intelligence",
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Automation",
    subtitle: "Retail, Hospitality & Commercial",
    badge: "Hotels · Malls · Factories",
    description:
      "Large-scale automation for hotels, retail chains, shopping malls, warehouses, and industrial facilities. Our Crestron and KNX-based centralised building management systems (BMS) unify HVAC, electrical distribution, fire alarm integration, public address systems, and access control into a single monitoring console — giving your facility managers complete situational awareness 24/7.",
    features: [
      "Building Management System (BMS)",
      "HVAC & electrical distribution control",
      "Fire alarm & PA system integration",
      "Multi-site remote monitoring",
      "Retail mood lighting & signage",
      "Predictive maintenance alerts",
    ],
    specs: [
      { label: "Platform", value: "Crestron / KNX" },
      { label: "Sites", value: "Multi-site" },
      { label: "Monitoring", value: "24 / 7" },
      { label: "Encryption", value: "AES-256" },
    ],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Business BMS — Full facility management at scale",
  },
  {
    id: "agricultural",
    icon: Sprout,
    title: "Agricultural Automation",
    subtitle: "Precision Smart Farming",
    badge: "Farms · Greenhouses · Irrigation",
    description:
      "Bring precision agriculture to your farm, greenhouse, or irrigation network with IoT-based sensor arrays and automated control systems. Monitor soil moisture, temperature, humidity, and CO₂ levels in real time, and trigger automated irrigation, ventilation, and nutrient dosing cycles — maximising crop yield and minimising water consumption in the UAE's challenging desert climate.",
    features: [
      "Soil moisture & temperature sensing",
      "Automated drip irrigation cycles",
      "Greenhouse climate control (heat/humidity/CO₂)",
      "Fertigation & nutrient dosing automation",
      "Solar-powered remote field sensors",
      "Mobile app dashboard & alert system",
    ],
    specs: [
      { label: "Sensor Network", value: "LoRaWAN" },
      { label: "Water Saving", value: "Up to 60%" },
      { label: "Coverage", value: "100+ Ha" },
      { label: "Power", value: "Solar / PoE" },
    ],
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Smart Farming — Automated irrigation & climate control",
  },
];

// ─── Showcase Gallery ──────────────────────────────────────────────────────────

const showcaseItems = [
  {
    image:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=900&auto=format&fit=crop",
    title: "Smart Home Control",
    tag: "Voice & App Controlled",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
    title: "Office Building Automation",
    tag: "BMS Integration",
  },
  {
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=900&auto=format&fit=crop",
    title: "Agricultural IoT",
    tag: "LoRaWAN Field Sensors",
  },
];

// ─── System Specs ──────────────────────────────────────────────────────────────

const systemSpecs = [
  {
    label: "Response Latency",
    value: "< 50",
    unit: "ms",
    detail: "Near-instantaneous command execution across all connected endpoints.",
  },
  {
    label: "Energy Savings",
    value: "45",
    unit: "%",
    detail:
      "Average reduction in building energy consumption post-automation deployment.",
  },
  {
    label: "Network Standard",
    value: "KNX",
    unit: "Pro",
    detail: "International ISO 14543 certified building automation protocol.",
  },
  {
    label: "Data Security",
    value: "AES",
    unit: "256",
    detail: "Military-grade encryption across all IoT device communications.",
  },
];

// ─── Schema ────────────────────────────────────────────────────────────────────

const automationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://winmaxgulf.com/smart-automation#service",
      "name": "Smart Building & Home Automation",
      "description": "Professional smart automation in Dubai and UAE. Includes KNX home automation, office BMS integration, and agricultural IoT systems.",
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
        "@id": "https://winmaxgulf.com/smart-automation"
      }
    }
  ]
};

// ─── Component ─────────────────────────────────────────────────────────────────

const SmartAutomation = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SEOHead
        title="Smart Home, Office & Agricultural Automation Dubai | WinmaxGulf"
        description="Expert smart automation solutions in Dubai & UAE — home automation, office building management, business BMS, and agricultural IoT systems. KNX, Crestron & LoRaWAN specialists."
        keywords="smart home automation Dubai, office automation UAE, BMS Dubai, agricultural automation UAE, KNX automation UAE, smart villa Dubai, building management system UAE"
        structuredData={automationSchema}
      />

      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[{ label: "Smart Automation", href: "/smart-automation" }]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Winmax Gulf Smart Building Automation & BMS Installation"
              className="absolute inset-0 w-full h-full object-cover object-right opacity-90 brightness-110 scale-105"
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent" />
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
                  Smart Automation Solutions
                </span>
              </Reveal>

              <Reveal delay={0.15}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 mt-4">
                  INTELLIGENT SPACES.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-winmax-orange via-orange-400 to-white">
                    ZERO EFFORT.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
                  From{" "}
                  <span className="text-white font-medium">smart villas</span> and{" "}
                  <span className="text-white font-medium">intelligent offices</span> to{" "}
                  <span className="text-white font-medium">large-scale business BMS</span> and{" "}
                  <span className="text-white font-medium">precision agricultural IoT</span> — we
                  engineer, install, and maintain fully automated environments across the UAE.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="flex flex-wrap gap-10">
                  <div className="border-l-2 border-winmax-orange/40 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                      Standard
                    </span>
                    <span className="text-sm font-bold">KNX ISO 14543 Certified</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                      Network
                    </span>
                    <span className="text-sm font-bold">Mesh / LoRaWAN / BACnet</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                      Security
                    </span>
                    <span className="text-sm font-bold">AES-256 Encrypted</span>
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
                  [ Automation Verticals ]
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  WHAT WE{" "}
                  <span className="text-white/30">AUTOMATE.</span>
                </h2>
                <p className="text-muted-foreground font-light max-w-2xl leading-relaxed">
                  We bring intelligent automation to four distinct environments — each engineered
                  with the specific hardware, protocols, and software stack that fits the unique
                  demands of that space.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Tab Nav */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {automationVerticals.map((vert, idx) => {
                  const TabIcon = vert.icon;
                  return (
                    <button
                      key={vert.id}
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
                            {vert.title}
                          </h4>
                          <span
                            className={`text-[10px] uppercase tracking-widest font-mono mt-1 block transition-colors duration-500 ${
                              activeTab === idx ? "text-winmax-orange/80" : "text-white/30"
                            }`}
                          >
                            {vert.badge}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="lg:col-span-8 relative min-h-[640px]">
                <AnimatePresence mode="wait">
                  {(() => {
                    const vert = automationVerticals[activeTab];
                    const VertIcon = vert.icon;
                    return (
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col"
                      >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={vert.image}
                            alt={vert.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#0a0a0a]" />
                          <div className="absolute top-4 left-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-winmax-orange/30 rounded-full">
                              <VertIcon className="w-3 h-3 text-winmax-orange" />
                              <span className="text-[10px] tracking-widest uppercase font-mono text-winmax-orange">
                                {vert.badge}
                              </span>
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-5">
                            <span className="text-[10px] font-mono text-white/40 tracking-widest">
                              {vert.imageCaption}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-10 flex flex-col gap-6 flex-1">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                              {vert.subtitle}
                            </h3>
                            <p className="text-base text-muted-foreground font-light leading-relaxed">
                              {vert.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {vert.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-winmax-orange flex-shrink-0" />
                                <span className="text-sm text-white/70">{f}</span>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 mt-auto">
                            {vert.specs.map((spec, sIdx) => (
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
                Deployed Across{" "}
                <span className="text-winmax-orange">Homes, Offices & Fields.</span>
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

        {/* ── ENGINEERING METRICS ───────────────────────────────────────── */}
        <section className="py-32 bg-white/[0.01] relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
              <Reveal>
                <div>
                  <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
                    [ Technical Standards ]
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    SYSTEM
                    <br />
                    METRICS.
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
                  Every automation system we deploy is engineered to industry-certified standards
                  with measurable performance outcomes.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {systemSpecs.map((spec, idx) => (
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

        <ServiceBrochureCTA 
          headline={<>AUTOMATE YOUR<br /><span className="text-white/40">WORLD.</span></>}
          subtext="Whether it's a smart villa in Dubai, an office BMS in Abu Dhabi, a retail chain across the UAE, or an agricultural IoT deployment in the field — our engineers will design the right automation stack for your environment."
          badge="Start Your Automation Project"
          whatsappMessage="Hello, I am interested in your Smart Automation solutions."
          brochureFile="/brochures/smart-automation.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SmartAutomation;
