import { CheckCircle, Target, Eye, ArrowUpRight, Sun, Layers, Monitor, Music, Wifi, Zap, Hexagon, Globe, Sparkles, Award } from "lucide-react";
import Reveal from "./Reveal";
import AntigravityCard from "./AntigravityCard";
import { motion } from "framer-motion";

// ─── SERVICES DATA (Optimized for AI-SEO & Spatial Design) ─────────────────────

const services = [
  {
    icon: Layers,
    name: "PDLC Smart Glass",
    tagline: "Precision Privacy Control",
    description: "Enterprise-grade switchable PDLC glass and smart glass solutions. Instant opacity transition in <0.1ms with 99.9% UV protection for luxury architecture.",
    span: "col-span-1 md:col-span-1"
  },
  {
    icon: Monitor,
    name: "LED Display Systems",
    tagline: "Immersive Visual Environments",
    description: "Fine-pitch indoor video walls and high-brightness outdoor LED billboards. 22-bit HDR processing with seamless modular integration.",
    span: "col-span-1 md:col-span-2"
  },
  {
    icon: Music,
    name: "Specialized AV & DJ Club Engineering",
    tagline: "Acoustic Excellence",
    description: "High-SPL sound engineering and intelligent DMX lighting rigs for elite hospitality venues and professional performance environments.",
    span: "col-span-1 md:col-span-1"
  },
  {
    icon: Sun,
    name: "Solar Solutions",
    tagline: "Sustainable Energy Infrastructure",
    description: "Magnizon-powered PV infrastructure. Hybrid storage, grid-tied systems, and 25-year performance guaranteed solar energy ecosystems.",
    span: "col-span-1 md:col-span-1"
  },
  {
    icon: Wifi,
    name: "Collaboration AV",
    tagline: "Smart Business Connectivity",
    description: "Acoustic pods, unified conferencing (Teams/Zoom/Cisco), and intelligent boardroom infrastructure for the modern enterprise.",
    span: "col-span-1 md:col-span-1"
  },
  {
    icon: Zap,
    name: "Smart Automation",
    tagline: "Integrated Intelligence",
    description: "Next-gen building automation (KNX/BMS) and LoRaWAN precision farming. Centralized IoT control for commercial and agriculture.",
    span: "col-span-1 md:col-span-1"
  }
];

// ─── STATS DATA ───────────────────────────────────────────────────────────────

const stats = [
  { value: "1000", suffix: "+", label: "Installations", icon: <Globe className="w-4 h-4" /> },
  { value: "10", suffix: "Yrs", label: "Experience", icon: <Award className="w-4 h-4" /> },
  { value: "6", suffix: "", label: "Divisions", icon: <Hexagon className="w-4 h-4" /> }
];

const About = () => {
  return (
    <section id="about" className="pt-40 pb-20 bg-black text-white relative overflow-hidden font-sans">

      {/* ── SPATIAL BACKGROUND ELEMENTS ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full antigravity-grid-pattern opacity-[0.03]" />
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-winmax-orange/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full px-8 md:px-16 lg:px-24 relative z-10">

        {/* ── PHASE 1: THE ENTITY CANVAS (What we do) ── */}
        <div className="mb-40">
          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 mb-12">
              <span className="h-[1px] w-12 bg-winmax-orange" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-winmax-orange/80">
                Corporate Genesis & Identity
              </span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-20 items-end">
            <div>
              <Reveal delay={0.4}>
                <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.8] tracking-tighter mb-12">
                  Integrated <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-winmax-orange via-winmax-orange to-white/20">
                    Excellence.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.6}>
                <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-light">
                  Winmax Gulf is the UAE's premier technology engineering house, architecting high-performance environments through six integrated divisions. Since 2015, we have transformed over <span className="text-white font-medium">1,000 corporate and residential spaces</span> across the GCC.
                </p>
              </Reveal>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-winmax-orange/10 blur-3xl" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10 p-12 glass-heavy rounded-3xl border border-white/5"
              >
                <div className="text-[12rem] font-bold text-white/[0.03] absolute top-0 right-0 select-none leading-none">
                  W
                </div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Sparkles className="text-winmax-orange w-6 h-6" />
                  What we do?
                </h3>
                <p className="text-white/50 leading-relaxed mb-8">
                  We engineer <span className="text-winmax-orange font-medium">Privacy</span>, <span className="text-winmax-orange font-medium">Visual Clarity</span>, and <span className="text-winmax-orange font-medium">Sustainable Infrastructure</span>. Our approach merges structural engineering with digital intelligence.
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/40">Dubai Based</div>
                  <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/40">GCC Reach</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── PHASE 2: BENTO STRATEGIC HORIZONS (Vision/Mission) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-40">

          {/* Vision card (Tall Bento) */}
          <div className="md:col-span-5 h-full">
            <Reveal delay={0.2}>
              <AntigravityCard className="h-full">
                <div className="p-12 h-full flex flex-col justify-between">
                  <div className="space-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-winmax-orange/10 border border-winmax-orange/20 flex items-center justify-center">
                      <Target className="text-winmax-orange w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-bold">Our Vision</h3>
                    <p className="text-lg text-white/50 font-light leading-relaxed">
                      To lead the GCC as the primary architect of responsive environments, where technology is invisible yet indispensable in every high-value commercial and residential space.
                    </p>
                  </div>
                  <div className="pt-12 border-t border-white/5 mt-12">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-winmax-orange/50">Strategic Endpoint 2030</span>
                  </div>
                </div>
              </AntigravityCard>
            </Reveal>
          </div>

          {/* Mission & Stats block (Wide Bento components) */}
          <div className="md:col-span-7 space-y-6">
            <Reveal delay={0.4}>
              <AntigravityCard>
                <div className="p-12">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Eye className="text-blue-400 w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-lg text-white/50 font-light leading-relaxed mb-6">
                    Delivering technical superiority across six specialized divisions — ensuring uncompromised privacy, visual impact, and energy independence for our global clientele.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Precision", "Reliability", "Innovation", "Architecture"].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] uppercase tracking-widest text-white/30">{tag}</span>
                    ))}
                  </div>
                </div>
              </AntigravityCard>
            </Reveal>

            {/* In-line Stats grid */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={0.6 + i * 0.1}>
                  <AntigravityCard className="h-full">
                    <div className="p-8 text-center sm:text-left h-full flex flex-col justify-center">
                      <div className="text-3xl md:text-5xl font-bold mb-1">
                        {stat.value}
                        <span className="text-winmax-orange text-xl md:text-2xl">{stat.suffix}</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30">{stat.label}</div>
                    </div>
                  </AntigravityCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── PHASE 3: THE ECOSYSTEM (Divisions) ── */}
        <div className="mb-20">
          <Reveal delay={0.2}>
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-winmax-orange" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-winmax-orange/80">Ecosystem Divisions</span>
              </div>
              <div className="hidden md:block h-px flex-1 bg-white/10 mx-10" />
              <div className="text-right">
                <span className="text-white/30 text-[10px] uppercase font-bold tracking-[0.4em]">Integrated Flow v4.0</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <Reveal key={i} delay={0.4 + i * 0.1}>
                {/* Use custom hover effect for cards */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`group relative p-8 glass-heavy rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-winmax-orange/30 ${svc.name === "LED Display Systems" ? "lg:col-span-2" : "col-span-1"}`}
                >
                  {/* Floating Background Icon */}
                  <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <svc.icon className="w-32 h-32 rotate-12" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-winmax-orange/10 group-hover:border-winmax-orange/30 transition-all duration-500">
                      <svc.icon className="w-7 h-7 text-white/40 group-hover:text-winmax-orange transition-colors" />
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-winmax-orange transition-colors">{svc.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-winmax-orange/50 font-bold mb-4">{svc.tagline}</p>
                      <p className="text-sm text-white/40 leading-relaxed font-light line-clamp-3 group-hover:text-white/60 transition-colors">
                        {svc.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/20 uppercase">DIV-0{i + 1}</span>
                      <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-winmax-orange transition-colors" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>




      </div>
    </section>
  );
};

export default About;