import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LazyImage } from "@/components/LazyImage";
import { ArrowRight, Eye, Monitor, Music, Cpu, Presentation, Sun, ShieldCheck, Zap } from "lucide-react";
import pdlcBanner from "@/assets/banners/pdlc-banner.jpg";
import ledBanner from "@/assets/banners/led-banner.jpg";
import djBanner from "@/assets/images/dj-club.jpg";
import smartAutomationBanner from "@/assets/banners/smart-automation-banner.png";
import collaborationBanner from "@/assets/images/conference-room.jpg";
import solarBanner from "@/assets/banners/solar-solutions-banner.png";
import Reveal from "./Reveal";
import AntigravityCard from "./AntigravityCard";
import { motion, useScroll, useTransform } from "framer-motion";

const Services = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const services = [
    {
      icon: Eye,
      title: "PDLC Smart Glass Solutions",
      path: "/pdlc",
      description: "Switchable glass film for privacy on demand. Suitable for homes, offices, hospitals, and commercial interiors.",
      image: pdlcBanner,
      features: [
        "Instant Privacy Control",
        "Energy Efficient",
        "Easy Installation",
        "Durable & Long-lasting"
      ]
    },
    {
      icon: Monitor,
      title: "LED Display Systems",
      path: "/led-display",
      description: "High-quality indoor and outdoor LED displays for events, advertising, and architectural applications.",
      image: ledBanner,
      features: [
        "Ultra HD Resolution",
        "Weather Resistant",
        "Custom Configurations",
        "Professional Installation"
      ]
    },
    {
      icon: Music,
      title: "Specialized AV & DJ Club Engineering",
      path: "/dj-club-solutions",
      description: "Complete turnkey DJ club setups with immersive audio-visual experiences and interactive installations.",
      image: djBanner,
      features: [
        "Professional Sound Systems",
        "Interactive Lighting",
        "Turnkey Solutions",
        "Custom Design"
      ]
    },
    {
      icon: Cpu,
      title: "Smart Automation",
      path: "/smart-automation",
      description: "Integrated automation frameworks that unify lighting, climate, and security into a single intuitive control interface.",
      image: smartAutomationBanner,
      features: [
        "Centralized Control",
        "Energy Management",
        "Security Integration",
        "Seamless Automation"
      ]
    },
    {
      icon: Presentation,
      title: "Collaboration AV",
      path: "/collaboration-av",
      description: "Optimized boardroom technology and collaboration systems designed for seamless hybrid meetings and enterprise efficiency.",
      image: collaborationBanner,
      features: [
        "Wireless Presentation",
        "Video Conferencing",
        "Acoustic Treatment",
        "Room Scheduling"
      ]
    },
    {
      icon: Sun,
      title: "Solar Solutions",
      path: "/solar-solutions",
      description: "Complete photovoltaic solutions providing energy independence for 25-30 years, featuring A+ grade panels, advanced MPPT hybrid inverters, and lithium energy storage.",
      image: solarBanner,
      features: [
        "Residential & Commercial PV Systems",
        "Utility Grade Power Plants (1MW+)",
        "Advanced Lithium-Ion Energy Storage"
      ]
    }
  ];

  const handleKnowMore = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-40 bg-[#0a0a0a] overflow-hidden relative"
    >
      <div className="w-full px-8 md:px-16 lg:px-24 relative z-10">

        <header className="mb-20 text-center md:text-left">
          <Reveal>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="w-12 h-px bg-winmax-orange" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-winmax-orange">Core Services</span>
            </div>
          </Reveal>

          <div className="max-w-4xl">
            <Reveal delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Explore Our Solutions
              </h2>
            </Reveal>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <Reveal key={index} delay={0.1 * index} className="h-full" width="100%">
              <div
                className="group relative flex flex-col bg-[#222222] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 h-full border border-white/5 hover:-translate-y-2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Section */}
                <div className="relative h-[280px] overflow-hidden bg-black w-full">
                  <LazyImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {/* Top Left Orange Gradient overlay */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-winmax-orange/30 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>
                  <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-winmax-orange/20 to-transparent pointer-events-none"></div>

                  {/* Icon Box */}
                  <div className="absolute top-6 left-6 w-10 h-10 bg-winmax-orange rounded shadow-lg flex items-center justify-center text-white">
                    <service.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-normal mb-8">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-col">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-winmax-orange flex-shrink-0" />
                        <span className="text-[13px] text-white/80 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-auto">
                    <Link
                      to={service.path}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.scrollTo(0, 0);
                      }}
                      className="flex items-center justify-center gap-2 py-4 sm:py-3 border border-[#333] hover:border-winmax-orange rounded-md bg-[#111] text-winmax-orange transition-colors duration-300 text-sm font-medium"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                      Know More
                    </Link>
                    <Link
                      to="/#contact"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 py-4 sm:py-3 bg-winmax-orange hover:bg-winmax-orange/90 rounded-md text-white transition-colors duration-300 text-sm font-medium"
                    >
                      Enquire Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;