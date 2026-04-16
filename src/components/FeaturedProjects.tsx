import React from 'react';
import Reveal from './Reveal';
import { Link } from 'react-router-dom';
import GlassmorphismCard from './GlassmorphismCard';
import { ArrowUpRight, MapPin, CheckCircle2 } from 'lucide-react';
import conferenceImage from '@/assets/images/conference-room.jpg';

const projects = [
  {
    title: "DIFC Corporate HQ",
    location: "DIFC, Dubai",
    category: "PDLC & Smart Office",
    description: "Multi-floor PDLC smart glass retrofit and high-fidelity AV integration for a global financial institution.",
    image: conferenceImage,
    tags: ["DIFC Case Study", "BMS"],
    link: "/case-study-difc"
  },
  {
    title: "Royal Villa Palm",
    location: "Palm Jumeirah",
    category: "Luxury Home Automation",
    description: "Bespoke smart glass installation for oceanside privacy with integration into specialized home automation.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    tags: ["VIP Project", "Residential"],
    link: "/case-study-royal-villa"
  },
  {
    title: "Emirates HQ",
    location: "Garhoud, Dubai",
    category: "Ultra-Fine LED Systems",
    description: "Custom ultra-fine pitch LED display installations for critical data visualization.",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
    tags: ["LED Displays", "Pro-AV"],
    link: "/led-display"
  }
];

const FeaturedProjects = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-winmax-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <Reveal>
            <div className="text-left">
              <span className="text-winmax-orange font-mono text-xs uppercase tracking-[0.5em] mb-4 block">Proven Experience</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
                FEATURED<br />
                <span className="text-white/30 text-2xl md:text-5xl break-words">PROJECTS.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/50 max-w-sm font-light leading-relaxed text-left md:text-right">
              From commercial skyscrapers to luxury residences, we deliver high-performance technical engineering across the GCC.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 0.15} className="h-full" width="100%">
              <Link to={project.link || "#"} className="group relative flex flex-col h-full">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-white/10 group-hover:border-winmax-orange/30 transition-all duration-500">
                  <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="flex gap-2">
                       {project.tags.map(tag => (
                         <span key={tag} className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-[9px] font-mono text-white/70 uppercase">{tag}</span>
                       ))}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-winmax-orange text-black flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="px-2 flex-grow">
                  <div className="flex items-center gap-2 text-winmax-orange font-mono text-[10px] uppercase tracking-widest mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-winmax-orange transition-colors">{project.title}</h3>
                  <p className="text-sm text-white/40 font-light leading-relaxed mb-6">{project.description}</p>
                </div>
                
                <div className="mt-auto px-2 pt-6 border-t border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-winmax-orange" />
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Verified Delivery</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FeaturedProjects;
