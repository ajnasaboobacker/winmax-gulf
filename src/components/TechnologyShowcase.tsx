import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Eye, Music, Cpu, Presentation, Sun, ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const TechnologyShowcase = () => {
  const [activeTech, setActiveTech] = useState(0);

  const technologies = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "PDLC Smart Film Solutions",
      category: "Privacy & Environment Context",
      description: "Advanced switchable glass film that transitions from frosted to transparent essentially instantly, offering on-demand privacy and glare reduction without compromising natural light.",
      features: ["Blocks 99% of harmful UV rays", "Reduces HVAC energy consumption", "Retrofit application on existing glass"],
      specs: [
        { label: "Switch Speed", value: "<10ms" },
        { label: "UV Block", value: ">99%" },
        { label: "Power Draw", value: "4-6 W/m²" }
      ]
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "LED Display Systems",
      category: "High-Fidelity Visuals",
      description: "Custom-engineered LED video walls designed for both indoor precision and outdoor durability, delivering unrivaled brightness and contrast for commercial advertising.",
      features: ["Seamless bezel-less configurations", "Front/Rear maintenance designs", "High refresh rates for broadcasting"],
      specs: [
        { label: "Pixel Pitch", value: "1.2 - 4mm" },
        { label: "Brightness", value: "Upto 6000cd" },
        { label: "Lifespan", value: "100k Hours" }
      ]
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Specialized AV & DJ Club Engineering",
      category: "Immersive Audio-Visuals",
      description: "Turnkey acoustic engineering and intelligent lighting arrays specifically mapped for high-energy hospitality environments and elite night venues.",
      features: ["Line-array acoustic modeling", "DMX intelligent lighting mapping", "Centralized DJ booth integration"],
      specs: [
        { label: "Audio Headroom", value: ">115 dB" },
        { label: "Sync Latency", value: "<5ms" },
        { label: "Coverage", value: "360°" }
      ]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Smart Automation",
      category: "Centralized Intelligence",
      description: "Robust automation frameworks bridging lighting, climate control, shades, and unified security into a single intuitive smart system.",
      features: ["Seamless third-party hardware integration", "Voice native and mobile app control", "Automated routine scheduling"],
      specs: [
        { label: "Protocols", value: "KNX / Zigbee" },
        { label: "Security", value: "AES-256" },
        { label: "Uptime", value: "99.9%" }
      ]
    },
    {
      icon: <Presentation className="h-8 w-8" />,
      title: "Collaboration AV",
      category: "Enterprise Workspaces",
      description: "Enterprise-grade presentation hubs and UC systems built to enable frictionless hybrid meetings across local and global team structures.",
      features: ["Wireless BYOD screen sharing", "Beamforming microphone arrays", "One-touch meeting initiation"],
      specs: [
        { label: "Video Quality", value: "Native 4K" },
        { label: "Audio Range", value: "Up to 8m" },
        { label: "Compatibility", value: "Universal" }
      ]
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: "Solar Solutions",
      category: "Commercial & Residential PV",
      description: "Secure energy independence for 25-30 years with Winmax's comprehensive photovoltaic solutions. Delivering complete grids from precision residential builds up to 1MW+ utility-scale power plants.",
      features: ["A+ Grade Monocrystalline Panels", "Smart MPPT Hybrid Inverters", "High-Density Lithium-Ion Storage"],
      specs: [
        { label: "System Voltage", value: "1000/1500V DC" },
        { label: "Design Life", value: "25-30 Years" },
        { label: "Management", value: "SNMP / WebApp" }
      ]
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          <div className="w-full lg:w-1/3">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-winmax-orange" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-winmax-orange">
                  Detailed Integration
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-12">
                Technical <br />
                <span className="text-white/40">Specifications.</span>
              </h2>
            </Reveal>

            <div className="flex flex-col gap-3">
              {technologies.map((tech, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTech(index)}
                  className={`w-full group text-left px-6 py-5 rounded-xl transition-all duration-300 flex items-center justify-between ${activeTech === index
                    ? 'bg-winmax-orange/10 border-winmax-orange border shadow-[0_0_15px_rgba(255,90,0,0.1)]'
                    : 'bg-[#111] border-transparent border hover:bg-[#1a1a1a]'
                    }`}
                >
                  <div>
                    <h3 className={`text-lg font-bold tracking-wide transition-colors ${activeTech === index ? 'text-winmax-orange' : 'text-white'
                      }`}>
                      {tech.title}
                    </h3>
                  </div>
                  <div className={`${activeTech === index ? 'text-winmax-orange' : 'text-white/20 group-hover:text-white/50'} transition-colors`}>
                    {tech.icon}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/3 mt-10 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative p-10 md:p-14 bg-[#111111] rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-between min-h-[600px]"
              >
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                      {technologies[activeTech].category}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    {technologies[activeTech].title}
                  </h3>

                  <p className="text-xl text-white/70 font-light leading-[1.8] max-w-3xl mb-10">
                    {technologies[activeTech].description}
                  </p>

                  <div className="mb-12">
                    <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Key Capabilities</h4>
                    <ul className="space-y-4">
                      {technologies[activeTech].features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/80">
                          <CheckCircle2 className="w-5 h-5 text-winmax-orange shrink-0" />
                          <span className="text-lg">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/5">
                  {technologies[activeTech].specs.map((spec, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                        {spec.label}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
