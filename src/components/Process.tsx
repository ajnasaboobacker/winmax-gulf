import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Wrench, GraduationCap, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    {
      icon: <Search className="h-10 w-10 text-winmax-orange" />,
      title: "Evaluation",
      description: "Comprehensive site assessment and architectural design integration.",
      details: ["Technical evaluation", "Systems audit", "Strategic planning"]
    },
    {
      icon: <Wrench className="h-10 w-10 text-winmax-orange" />,
      title: "Implementation", 
      description: "Precision installation by our certified engineering specialists.",
      details: ["Integrated infrastructure", "Systems calibration", "Operational validation"]
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-winmax-orange" />,
      title: "Activation",
      description: "Technical handover, system training, and long-term support integration.",
      details: ["Connectivity setup", "User training", "Maintenance partnership"]
    }
  ];

  return (
    <section id="process" ref={containerRef} className="py-40 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mb-32">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-winmax-orange" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-winmax-orange">
                Development Methodology
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-12 leading-none">
              Precision from <br /> 
              <span className="text-winmax-orange">Concept to Activation.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-white/40 max-w-2xl font-normal leading-relaxed">
              We orchestrate environments through a rigorous blend of high-end aesthetics and engineering excellence, ensuring every project meets our uncompromised standards.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <svg className="hidden lg:block absolute top-12 left-0 w-full h-px overflow-visible z-0 pointer-events-none">
            <motion.path
              d="M 0 0.5 L 2000 0.5"
              stroke="#FF7E00"
              strokeWidth="2"
              fill="none"
              style={{ pathLength }}
              className="opacity-30"
            />
            <motion.circle
              cx="0"
              cy="0.5"
              r="4"
              fill="#FF7E00"
              style={{ x: useTransform(pathLength, [0, 1], [0, 2000]) }}
            />
          </svg>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-24 relative">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <Reveal delay={index * 0.15}>
                  <div className="relative">
                    <div className="flex items-center gap-6 mb-12">
                      <span className="text-4xl font-bold text-white group-hover:text-winmax-orange transition-colors duration-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px w-12 bg-white/10 group-hover:w-20 group-hover:bg-winmax-orange transition-all duration-700" />
                    </div>

                    <div className="p-10 bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.02] hover:border-white/10 transition-technical backdrop-blur-3xl group-hover:-translate-y-2">
                      <div className="mb-10 w-20 h-20 rounded-full bg-black flex items-center justify-center border border-white/5 transition-technical group-hover:bg-winmax-orange/10 group-hover:border-winmax-orange/30">
                        {step.icon}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-white/50 text-lg leading-relaxed mb-10 font-normal">
                        {step.description}
                      </p>

                      <div className="space-y-4 border-t border-white/5 pt-10">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/50 transition-colors">
                            <div className="w-1 h-1 bg-winmax-orange rounded-full" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={0.6}>
          <div className="mt-40 relative group cursor-pointer overflow-hidden rounded-[2rem] p-1 shadow-2xl">
            <div 
              className="relative bg-white/[0.02] border border-white/10 rounded-[1.9rem] p-16 md:p-24 flex flex-col md:flex-row items-center justify-between transition-technical hover:border-winmax-orange/20"
              onClick={() => window.open('https://wa.me/+971527200466', '_blank')}
            >
              <div className="max-w-2xl text-center md:text-left">
                <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-none">
                  Architect your <br />
                  <span className="text-winmax-orange">next environment.</span>
                </h3>
                <p className="text-xl text-white/40 font-normal leading-relaxed">
                  Join the portfolio of luxury properties powered by Winmax Gulf technology.
                </p>
              </div>
              <div className="mt-12 md:mt-0 flex items-center justify-center w-32 h-32 rounded-full border border-white/20 group-hover:bg-winmax-orange group-hover:border-winmax-orange transition-all duration-700 group-hover:scale-105">
                <ArrowUpRight className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Process;