import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, Maximize2, ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react";
import Reveal from "./Reveal";

const Gallery = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const projects = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
      alt: "Commercial LED Hub",
      category: "Outdoor Media Systems",
      span: "md:col-span-2 md:row-span-2",
      challenge: "Required high-contrast visibility under direct Dubai midday sunlight with 99.9% uptime for continuous advertising cycles.",
      outcome: "Deployed IP65-rated high-nit LED clusters with automated thermal regulation, sustaining peak performance in +50°C environments."
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      alt: "Corporate Command Center",
      category: "AV Systems Engineering",
      span: "md:col-span-1 md:row-span-1",
      challenge: "Multi-layered data visualization needed across a zero-bezel video wall for mission-critical logistics monitoring.",
      outcome: "Integrated a unified fiber-optic 4K distribution network with sub-millisecond latency for real-time operational oversight."
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
      alt: "Immersive Lobby Experience",
      category: "Interactive Display Media",
      span: "md:col-span-1 md:row-span-2",
      challenge: "A primary hospitality entrance required a kinetic, high-fidelity digital art installation that responds to guest movement.",
      outcome: "Engineered a custom sensor-mapped projection system synchronized with spatial audio for a 360-degree interactive environment."
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      alt: "Executive Privacy Glass",
      category: "PDLC Glass Integration",
      span: "md:col-span-1 md:row-span-1",
      challenge: "High-level transparency needed during meetings, with instant opacity for high-security executive briefings.",
      outcome: "Installed Gen-3 PDLC Smart Glass Solutions with <40ms transition speed and integrated voice-command automation."
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1558223175-0e6d4217646a?q=80&w=1200&auto=format&fit=crop",
      alt: "Integrated Smart Surface",
      category: "Interior Tech Architecture",
      span: "md:col-span-2 md:row-span-1",
      challenge: "Standard architectural surfaces required conversion into interactive data hubs without disrupting the minimalist design.",
      outcome: "Embedded touch-capacitive LED arrays behind natural stone surfaces, blending structural beauty with digital utility."
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
      alt: "Advanced AV Engineering",
      category: "Engineering Calibration",
      span: "md:col-span-1 md:row-span-1",
      challenge: "Acoustic distortion in a high-reverb glass-heavy environment was degrading conference audio quality.",
      outcome: "Executed precision beam-forming microphone arrays and digital signal processing to isolate vocal frequencies."
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="gallery" ref={containerRef} className="py-40 bg-[#050505] relative overflow-hidden font-sans">
      <div className="container mx-auto px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-px bg-winmax-orange shadow-[0_0_15px_rgba(255,90,0,0.4)]" />
                <span className="technical-text text-winmax-orange">Project Insights Portfolio</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-[0.85] mb-10">
                Precision <br />
                <span className="text-white/20">Execution.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="max-w-md space-y-6">
              <p className="text-xl text-white/40 font-light leading-relaxed">
                Documenting the intersection of structural design and advanced technical engineering across the Middle East.
              </p>
              <div className="flex gap-8 border-t border-white/5 pt-8">
                 <div>
                    <p className="text-[10px] technical-text text-winmax-orange mb-1">Total Assets</p>
                    <p className="text-2xl font-bold tracking-tight">1,000+</p>
                 </div>
                 <div>
                    <p className="text-[10px] technical-text text-winmax-orange mb-1">Standard</p>
                    <p className="text-2xl font-bold tracking-tight text-white/40">ISO 9001</p>
                 </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The Asymmetric Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className={`relative group cursor-pointer rounded-[3rem] bg-[#111] border border-white/5 overflow-hidden transition-all duration-1000 ${project.span}`}
              onClick={() => setSelectedId(project.id)}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              
              <motion.img
                src={project.src}
                alt={project.alt}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out group-hover:scale-105"
              />
              
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-winmax-orange mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 font-mono">
                  {project.category}
                </p>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-none group-hover:text-white transition-colors duration-500">
                  {project.alt}
                </h3>
                
                <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                   <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">View Insight Brief</span>
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-winmax-orange group-hover:border-winmax-orange transition-all duration-500">
                      <Maximize2 className="w-4 h-4 text-white" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Technical Brief Lightbox */}
      {typeof document !== 'undefined' ? createPortal(
        <AnimatePresence>
          {selectedId && selectedProject && (
            <motion.div
              key="gallery-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 overflow-y-auto"
              onClick={() => setSelectedId(null)}
            >
              {/* Background Grid for Lightbox */}
              <div className="absolute inset-0 antigravity-grid-pattern opacity-[0.03] pointer-events-none" />

              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="fixed top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-winmax-orange hover:border-winmax-orange transition-all duration-500 z-[200] cursor-pointer"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div 
                className="relative w-full max-w-7xl grid lg:grid-cols-12 gap-16 lg:gap-24 items-center h-full max-h-[900px]"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Visual Frame */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, x: -50 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 h-[600px] md:h-full rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative group"
                >
                  <img 
                    src={selectedProject.src} 
                    alt="Architecture View"
                    className="w-full h-full object-cover grayscale-[0.2] brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-12 left-12">
                     <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 px-6 rounded-2xl border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-winmax-orange animate-pulse" />
                        <span className="technical-text text-[10px] text-white/50 uppercase">Live Project Feed • DXB Hub</span>
                     </div>
                  </div>
                </motion.div>

                {/* Data Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 space-y-12 h-fit"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-winmax-orange font-bold uppercase tracking-[0.4em] text-[10px]">
                       <Layers className="w-4 h-4" />
                       {selectedProject.category}
                    </div>
                    <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                      {selectedProject.alt}
                    </h3>
                  </div>

                  <div className="grid gap-8 border-t border-b border-white/5 py-12">
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-winmax-orange/40 font-bold uppercase tracking-[0.2em] text-[9px]">
                           <Zap className="w-3 h-3" />
                           Technical Challenge
                        </div>
                        <p className="text-lg text-white/70 font-light leading-relaxed">
                           {selectedProject.challenge}
                        </p>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-blue-400/40 font-bold uppercase tracking-[0.2em] text-[9px]">
                           <ShieldCheck className="w-3 h-3" />
                           Engineered Outcome
                        </div>
                        <p className="text-lg text-white/70 font-light leading-relaxed italic">
                           {selectedProject.outcome}
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 pt-4">
                     <button 
                       className="flex-1 h-20 rounded-2xl bg-winmax-orange hover:bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-[0_15px_40px_rgba(255,90,0,0.2)]"
                       onClick={() => window.open('https://wa.me/+971527200466', '_blank')}
                     >
                       Download Tech Pack
                     </button>
                     <button 
                       className="flex-1 h-20 rounded-2xl border border-white/10 hover:border-winmax-orange hover:bg-winmax-orange/5 text-white/60 hover:text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500"
                       onClick={() => window.open('tel:+97142713101')}
                     >
                       Engineering Desk
                     </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      ) : (
        <AnimatePresence>
          {selectedId && selectedProject && (
            <motion.div
              key="gallery-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 overflow-y-auto"
              onClick={() => setSelectedId(null)}
            >
              {/* Background Grid for Lightbox */}
              <div className="absolute inset-0 antigravity-grid-pattern opacity-[0.03] pointer-events-none" />

              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="fixed top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-winmax-orange hover:border-winmax-orange transition-all duration-500 z-[200] cursor-pointer"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div 
                className="relative w-full max-w-7xl grid lg:grid-cols-12 gap-16 lg:gap-24 items-center h-full max-h-[900px]"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Visual Frame */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, x: -50 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 h-[600px] md:h-full rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative group"
                >
                  <img 
                    src={selectedProject.src} 
                    alt="Architecture View"
                    className="w-full h-full object-cover grayscale-[0.2] brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-12 left-12">
                     <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 px-6 rounded-2xl border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-winmax-orange animate-pulse" />
                        <span className="technical-text text-[10px] text-white/50 uppercase">Live Project Feed • DXB Hub</span>
                     </div>
                  </div>
                </motion.div>

                {/* Data Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 space-y-12 h-fit"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-winmax-orange font-bold uppercase tracking-[0.4em] text-[10px]">
                       <Layers className="w-4 h-4" />
                       {selectedProject.category}
                    </div>
                    <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                      {selectedProject.alt}
                    </h3>
                  </div>

                  <div className="grid gap-8 border-t border-b border-white/5 py-12">
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-winmax-orange/40 font-bold uppercase tracking-[0.2em] text-[9px]">
                           <Zap className="w-3 h-3" />
                           Technical Challenge
                        </div>
                        <p className="text-lg text-white/70 font-light leading-relaxed">
                           {selectedProject.challenge}
                        </p>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-blue-400/40 font-bold uppercase tracking-[0.2em] text-[9px]">
                           <ShieldCheck className="w-3 h-3" />
                           Engineered Outcome
                        </div>
                        <p className="text-lg text-white/70 font-light leading-relaxed italic">
                           {selectedProject.outcome}
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 pt-4">
                     <button 
                       className="flex-1 h-20 rounded-2xl bg-winmax-orange hover:bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-[0_15px_40px_rgba(255,90,0,0.2)]"
                       onClick={() => window.open('https://wa.me/+971527200466', '_blank')}
                     >
                       Download Tech Pack
                     </button>
                     <button 
                       className="flex-1 h-20 rounded-2xl border border-white/10 hover:border-winmax-orange hover:bg-winmax-orange/5 text-white/60 hover:text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500"
                       onClick={() => window.open('tel:+97142713101')}
                     >
                       Engineering Desk
                     </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default Gallery;