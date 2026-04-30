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
  FileText, Cpu, Database, Microscope,
  ArrowRight, Sun, Zap, Battery, Car,
  Shield, Link2, Radio, Building2, Droplets
} from "lucide-react";
import heroImage from "@/assets/banners/solar-solutions-banner.png";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";

// --- Page Resources ---

const solarResources = [
  {
    title: "Grid-Tie Architecture Standard",
    type: "Whitepaper",
    size: "3.2 MB",
    description: "Technical schematics and regulatory guidelines for DEWA/Utility grid-tie integration across various voltage architectures.",
    icon: Database
  },
  {
    title: "UAE Solar Irradiance Audit",
    type: "Technical Guide",
    size: "2.7 MB",
    description: "Empirical analysis of PV panel performance under extreme desert heat and dust accumulation coefficients in the UAE.",
    icon: Sun
  },
  {
    title: "ROI Analysis: Commercial PV",
    type: "Financial Report",
    size: "1.5 MB",
    description: "A comprehensive CAPEX vs. OPEX breakdown for commercial 1MW+ installations based on standard GCC energy tariffs.",
    icon: FileText
  },
  {
    title: "BMS Connectivity Protocols",
    type: "Spec Sheet",
    size: "1.1 MB",
    description: "Modbus/RS485 and IoT protocols for remote energy monitoring and real-time consumption dashboard integration.",
    icon: Cpu
  }
];

const SolarSolutions = () => {
  const [activeTab, setActiveTab] = useState(0);

  const specializedSolutions = [
    {
      id: "datacenter",
      icon: Database,
      title: "Data Center Infrastructure",
      subtitle: "Tier 4 Compliant Power Density",
      description: "High-density, true hot-swappable modular UPS systems ranging from 10KW to 2000KW. Engineered with smart PDUs and Lithium-Ion battery banks for mission-critical Tier 4 datacenter operations demanding 99.999% uptime.",
      specs: [
        { label: "Scalability", value: "10-2000KW" },
        { label: "Architecture", value: "Hot-Swappable Modular" },
        { label: "Storage", value: "High-Density Li-Ion" },
        { label: "Uptime", value: "Tier 4 Compliant" }
      ]
    },
    {
      id: "telecom",
      icon: Radio,
      title: "Telecom & Remote Tracking",
      subtitle: "Diesel Generator Replacement",
      description: "Galvanized, completely off-grid solar power systems designed specifically for base terminal stations and microwave repeaters. Operating maintenance-free for 25 years generating reliable 12/24/48VDC or 110V-240V AC output.",
      specs: [
        { label: "DC Output", value: "12/24/48V" },
        { label: "Design Life", value: "25 Years" },
        { label: "Application", value: "Base Stations & Repeaters" },
        { label: "Deployment", value: "Galvanized Cabinets" }
      ]
    },
    {
      id: "industrial",
      icon: Building2,
      title: "Industrial & Outdoor Power",
      subtitle: "IP65 Precision Environmental Control",
      description: "Ruggedized industrial grade UPS systems from 1KVA to 500KVA. Built to handle the harshest environments with IP57/IP65 enclosures, active building cooling, and ambient temperature operation up to 65°C.",
      specs: [
        { label: "Power Range", value: "1-500KVA" },
        { label: "Enclosure", value: "IP65 Rated" },
        { label: "Thermal Limit", value: "Up to 65°C" },
        { label: "Use Case", value: "Traffic, CCTV, Manufacturing" }
      ]
    },
    {
      id: "thermal",
      icon: Droplets,
      title: "Solar Thermal Heating",
      subtitle: "Vacuum Tube & Flat Plate Systems",
      description: "Pressurized and non-pressurized solar water heating solutions ranging from 100L up to 5000L. Patent IC-CN internal technology utilizing gravity flow convention operating perfectly in extremes from -30°C to 75°C.",
      specs: [
        { label: "Capacity", value: "100-5000L" },
        { label: "Technology", value: "Vacuum Tube / Flat Plate" },
        { label: "Temp Range", value: "-30°C to 75°C" },
        { label: "Circulation", value: "Gravity & Pressurized" }
      ]
    }
  ];
  const solarProducts = [
    {
      icon: Sun,
      title: "Commercial & Residential PV",
      description: "Custom-engineered power plants providing 25-30 years of energy independence. From 1kW residential setups to large-scale 3-Ph commercial roof deployments with highly attractive ROI.",
      metrics: [
        { label: "Design Life", value: "25-30", unit: "Yrs" },
        { label: "Cell Grade", value: "A+ 10BB", unit: "Mono/TopCon" }
      ]
    },
    {
      icon: Link2,
      title: "Utility Grade Power Plants",
      description: "Highly integrated solutions for large-scale centralized Solar PV plants strictly over 1MW. Complete turnkey deployment including MV/HV substations, switchgears, and power transformers.",
      metrics: [
        { label: "Capacity", value: ">1", unit: "MW" },
        { label: "Grid Interface", value: "MV/HV", unit: "Substation" }
      ]
    },
    {
      icon: Zap,
      title: "Hybrid Inverters",
      description: "Smart 1-Ph and 3-Ph MPPT inverters ranging from 10KW to 5MW. SCR and advanced IGBT-based technology offering seamless On-grid, Off-grid, and Hybrid configuration via DSP control.",
      metrics: [
        { label: "Scalability", value: "10KW-5MW", unit: "Range" },
        { label: "Efficiency", value: ">99", unit: "%" }
      ]
    },
    {
      icon: Battery,
      title: "Energy Storage Systems",
      description: "Inherently safe Lithium-Ion drops-in providing 40-50% more capacity than lead-acid equivalents alongside deep cycle Gel/Tubular options perfectly matched to hybrid ecosystems.",
      metrics: [
        { label: "Discharge Depth", value: "90-100", unit: "%" },
        { label: "Temp Tolerance", value: "Up to 80", unit: "°C" }
      ]
    },
    {
      icon: Car,
      title: "Smart EV Charging Pods",
      description: "Robust, all-weather continuous fast charging pods for EVs. Featuring daylight readable 7-inch touchscreens, RFID/ISO 15118 identification, and 20~180 kW peak output.",
      metrics: [
        { label: "Fast Charge", value: "20-180", unit: "kW" },
        { label: "Efficiency", value: "97", unit: "%" }
      ]
    },
    {
      icon: Cpu,
      title: "Solar Water Pumping",
      description: "Infinite solar energy driven pumping driven by advanced dynamic VI MPPT control technology. Ideal for agriculture, desert control, and city landscaping completely off-grid.",
      metrics: [
        { label: "Power Range", value: "1-300", unit: "HP" },
        { label: "IPM Efficiency", value: "98", unit: "%" }
      ]
    }
  ];

  const performanceSpecs = [
    { label: "System Lifespan", value: "25", unit: "Years", detail: "Guaranteed linear performance warranty over the system lifetime." },
    { label: "ROI Horizon", value: "3.5", unit: "Yrs", detail: "Projected capital expenditure recovery based on UAE solar irradiance." },
    { label: "System Uptime", value: "99.9", unit: "%", detail: "Designed for mission-critical reliability with active monitoring." },
    { label: "Protection Rating", value: "IP68", unit: "Seal", detail: "Extreme environment protection for harsh desert conditions." }
  ];

  const solarSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://winmaxgulf.com/solar-solutions#service",
      "name": "Sustainable Solar Energy Solutions",
      "description": "High-efficiency PV solar energy systems and lithium storage solutions in Dubai and UAE. Turnkey solar engineering for residential and commercial projects.",
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
        "@id": "https://winmaxgulf.com/solar-solutions"
      }
    },
    {
      "@type": "Product",
      "name": "PV Solar Energy Systems & Storage",
      "image": "https://winmaxgulf.com/assets/banners/solar-solutions-banner.png",
      "description": "Commercial and residential PV solar energy systems, hybrid inverters, and high-density lithium storage by Magnizon.",
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
          "name": "What are Sustainable Solar Energy Solutions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sustainable Solar Energy Solutions encompass the full engineering, deployment, and management of Photovoltaic (PV) power systems designed to reduce or eliminate reliance on the traditional electrical grid. These systems integrate high-efficiency monocrystalline solar panels with advanced intelligent hybrid inverters, seamlessly converting captured solar irradiance into usable AC power. For uninterrupted operation, solar arrays are paired with high-density lithium (LiFePO4) battery storage systems that stockpile excess energy for use during nighttime or grid outages. In the UAE’s demanding climate, industrial-grade solar infrastructure is engineered to withstand extreme heat and dust. By implementing these tailored renewable energy solutions—which often include EV charging stations and solar water pumping systems—businesses and residential villas achieve significant cost savings, secure a rapid Return on Investment (ROI), and drastically lower their carbon footprint while ensuring continuous, self-sustaining power delivery."
          }
        }
      ]
    }
  ]
};

  return (
    <>
      <SEOHead
        title="Solar Energy Solutions | Sustainable Energy Dubai | WinmaxGulf"
        description="High-performance solar energy solutions in Dubai. PV systems, hybrid inverters, and lithium storage by Magnizon — engineered for zero grid reliance."
        keywords="solar panels Dubai, solar energy UAE, hybrid inverters Dubai, lithium battery storage UAE, EV charging Dubai"
        structuredData={solarSchema}
      />

      <div className="bg-[#020202] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[{ label: "Solar Solutions", href: "/solar-solutions" }]} />

        {/* --- HERO --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Winmax Gulf Sustainable PV Solar Energy Installation"
              className="absolute inset-0 w-full h-full object-cover object-left opacity-90 brightness-110 scale-105"
              fetchPriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/10 to-transparent" />
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}
            />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <span className="inline-block text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-6 px-4 py-1.5 border border-winmax-orange/25 rounded-full">
                  Sustainable Energy Engineering
                </span>
              </Reveal>

              <Reveal delay={0.15}>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 mt-4">
                  ENERGY<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/35">
                    INDEPENDENCE.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
                  Engineering{" "}
                  <span className="text-white font-medium">uninterrupted energy infrastructure</span>{" "}
                  through British Magnizon technology and high-density lithium storage systems.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="flex flex-wrap gap-10">
                  <div className="border-l-2 border-winmax-orange/40 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Standard</span>
                    <span className="text-sm font-bold">ISO 9001:2015</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Warranty</span>
                    <span className="text-sm font-bold text-winmax-orange">25-Year Linear</span>
                  </div>
                  <div className="border-l-2 border-white/10 pl-5">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">Technology</span>
                    <span className="text-sm font-bold">Magnizon Power</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- AI / GEO CITABLE DEFINITION --- */}
        <section className="py-16 md:py-24 bg-[#080808] border-y border-white/5 relative z-10">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">What is a PV Solar Energy System?</h2>
                <div className="prose prose-invert max-w-none text-white/70 leading-relaxed font-light text-base md:text-lg">
                  <p>
                    A PV (Photovoltaic) Solar Energy System is a renewable infrastructure that captures direct sunlight using semiconductor materials, such as monocrystalline silicon, to generate usable direct current (DC) electricity. This energy is then routed through a smart hybrid inverter, which efficiently converts it into alternating current (AC) to power homes, commercial buildings, and industrial facilities with zero grid reliance. 
                  </p>
                  <p className="mt-5">
                    In Dubai and the wider UAE, commercial solar installations typically pair Tier 1 TopCon solar panels with high-density lithium-ion battery storage systems to guarantee 99.9% uptime. These robust setups are engineered to withstand extreme desert heat, operating reliably in ambient temperatures up to 65°C. With an average return on investment (ROI) horizon of just 3.5 years, a professionally installed solar PV plant offers guaranteed linear performance for 25 to 30 years, drastically reducing operational expenditure and carbon footprints for businesses.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- SYSTEM OVERVIEW --- */}
        <section className="py-32 relative overflow-hidden bg-white/[0.01]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-24 items-center mb-44">
              <Reveal direction="left">
                <div className="relative">
                  <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-6 block">
                    [ 01 — High-Efficiency Photovoltaic Systems ]
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-10 leading-[0.9]">
                    PEAK EFFICIENCY,<br />
                    <span className="text-white/30">EXTREME CLIMATES.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl font-light">
                    In partnership with Magnizon Power Systems, we deploy modular energy installations designed to withstand the demanding GCC climate while sustaining peak output over decades.
                  </p>

                  <div className="grid grid-cols-2 gap-10">
                    <div className="border-l-2 border-winmax-orange/40 pl-5 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Sun className="w-3 h-3 text-winmax-orange/60" />
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Cell Grade</span>
                      </div>
                      <span className="text-2xl font-bold">A+ TopCon (German Grade)</span>
                    </div>
                    <div className="border-l-2 border-white/10 pl-5 py-2 hover:border-winmax-orange/40 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-3 h-3 text-white/30" />
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Inverter Type</span>
                      </div>
                      <span className="text-2xl font-bold">On / Off Grid / Hybrid</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-winmax-orange/20 blur-[100px] opacity-15 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop"
                      alt="Solar Infrastructure"
                      className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Magnizon Power Systems — UAE</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-[2.5rem]">
              {solarProducts.map((prod, idx) => (
                <div key={idx} className="bg-[#050505] p-12 group hover:bg-white/[0.03] transition-all duration-500 relative flex flex-col justify-between">
                  <div className="mb-12">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-winmax-orange/50 transition-all duration-500 mb-6">
                      <prod.icon className="w-7 h-7 text-white group-hover:text-winmax-orange transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-winmax-orange transition-colors leading-snug">{prod.title}</h3>
                    <p className="text-base text-muted-foreground font-light leading-relaxed min-h-[90px]">
                      {prod.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 mt-auto">
                    {prod.metrics.map((m, i) => (
                      <div key={i}>
                        <span className="block text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1">{m.label}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-white">{m.value}</span>
                          <span className="text-[10px] font-mono text-winmax-orange/70 font-bold">{m.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- VISUAL SHOWCASE (NEW) --- */}
        <section className="py-20 relative bg-[#020202]">
          <div className="container mx-auto px-6 lg:px-12">
            <Reveal>
              <h2 className="text-3xl font-bold mb-12 tracking-tight border-l-4 border-winmax-orange pl-6">Deployments at <span className="text-winmax-orange">Scale.</span></h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal delay={0.1}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group border border-white/5 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80" alt="Commercial PV" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                    <span className="text-white font-bold tracking-widest uppercase text-sm mb-1">Commercial Arrays</span>
                    <span className="text-winmax-orange font-mono text-[10px] uppercase tracking-widest">10kW - 1MW Grid Storage</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group border border-white/5 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" alt="Utility Scale" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                    <span className="text-white font-bold tracking-widest uppercase text-sm mb-1">Utility Grade PV</span>
                    <span className="text-winmax-orange font-mono text-[10px] uppercase tracking-widest">MV/HV Substation Integration</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group border border-white/5 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80" alt="EV Charging" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                    <span className="text-white font-bold tracking-widest uppercase text-sm mb-1">EV Charging Pods</span>
                    <span className="text-winmax-orange font-mono text-[10px] uppercase tracking-widest">Up to 180kW Fast Charge</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- SPECIALIZED SOLUTIONS TABS --- */}
        <section className="py-32 relative overflow-hidden bg-[#050505] border-y border-white/5">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <div className="mb-16">
                <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
                  [ Specialized Engineering ]
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  COMPREHENSIVE <span className="text-white/30">ECOSYSTEM.</span>
                </h2>
                <p className="text-muted-foreground font-light max-w-2xl leading-relaxed">
                  Beyond standard PV setups, our partnership with Magnizon allows us to deploy extreme-environment industrial hardware, Tier-4 datacenter redundancies, and dedicated telecom station replacements globally.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Tab Nav */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {specializedSolutions.map((solution, idx) => (
                  <button
                    key={solution.id}
                    onClick={() => setActiveTab(idx)}
                    className={`text-left p-6 rounded-3xl transition-all duration-500 border ${activeTab === idx
                      ? "bg-winmax-orange/10 border-winmax-orange/30 shadow-[0_0_30px_rgba(255,102,0,0.1)]"
                      : "bg-transparent border-transparent hover:bg-white/5"
                      }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-xl transition-colors duration-500 ${activeTab === idx ? "bg-winmax-orange/20 text-winmax-orange" : "bg-white/5 text-white/50"}`}>
                        <solution.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg tracking-tight transition-colors duration-500 ${activeTab === idx ? "text-white" : "text-white/60"}`}>
                          {solution.title}
                        </h4>
                        <span className={`text-[10px] uppercase tracking-widest font-mono mt-1 block transition-colors duration-500 ${activeTab === idx ? "text-winmax-orange/80" : "text-white/30"}`}>
                          {solution.subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="lg:col-span-8 relative min-h-[450px]">
                <AnimatePresence mode="wait">
                  {(() => {
                    const ActiveIcon = specializedSolutions[activeTab].icon;
                    return (
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-between"
                      >
                        <div>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 shadow-inner">
                            <ActiveIcon className="w-4 h-4 text-winmax-orange" />
                            <span className="text-[10px] tracking-widest uppercase font-mono text-white/70">
                              {specializedSolutions[activeTab].title}
                            </span>
                          </div>

                          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-6 max-w-xl">
                            {specializedSolutions[activeTab].subtitle}
                          </h3>

                          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl">
                            {specializedSolutions[activeTab].description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 mt-auto">
                          {specializedSolutions[activeTab].specs.map((spec, sIdx) => (
                            <Reveal delay={sIdx * 0.1} key={sIdx}>
                              <span className="block text-[10px] uppercase font-mono tracking-widest text-white/30 mb-2">
                                {spec.label}
                              </span>
                              <span className="font-bold text-white tracking-tight">
                                {spec.value}
                              </span>
                            </Reveal>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* --- PERFORMANCE SPECS --- */}
        <section className="py-40 relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-24">
              <Reveal>
                <div>
                  <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.5em] mb-6 block">
                    [ 02 — System Performance ]
                  </span>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">BUILT FOR<br />THE LONG TERM.</h2>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl text-muted-foreground max-w-md font-light leading-relaxed italic border-l-2 border-winmax-orange/30 pl-8">
                  "Our solar frameworks are engineered for decades of service — zero compromise on resilience, efficiency, or transparency."
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {performanceSpecs.map((spec, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up">
                  <div className="p-12 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-winmax-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-bold tracking-tighter group-hover:text-winmax-orange transition-colors">{spec.value}</span>
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest font-bold">{spec.unit}</span>
                    </div>
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white/90 mb-3">{spec.label}</h4>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed min-h-[40px] group-hover:text-white/60 transition-colors">
                      {spec.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <TechnicalResources resources={solarResources} />
        <ServiceBrochureCTA 
          headline={<>ZERO GRID<br /><span className="text-white/40">RELIANCE.</span></>}
          subtext="Transition to complete energy independence. Our engineers will assess your site and design a system optimised for your specific architectural footprint and consumption profile."
          badge="Free Site Assessment"
          whatsappMessage="Hello, I am interested in a solar energy site assessment."
          brochureFile="/brochures/solar-solutions.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SolarSolutions;
