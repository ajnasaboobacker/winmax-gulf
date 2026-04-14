import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight, Building2, MapPin } from "lucide-react";
import Reveal from "./Reveal";

const EnhancedTestimonials = () => {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Ahmed Al-Mansouri",
      role: "Director of Operations",
      company: "Dubai Corporate Center",
      location: "Dubai, UAE",
      quote: "Winmax Gulf transformed our architectural vision with PDLC technology. The orchestration of privacy and light is unparalleled.",
      stats: "99% UV Blocked"
    },
    {
      name: "Sarah Johnson",
      role: "Project Director",
      company: "Premium Events LLC",
      location: "Abu Dhabi, UAE",
      quote: "The LED display engineering exceeded our technical standards. A masterclass in high-performance visual integration.",
      stats: "4K Resolution"
    },
    {
      name: "Omar Hassan",
      role: "Founder",
      company: "Nightlife Ventures",
      location: "Dubai, UAE",
      quote: "A seamless synthesis of sound and visual intelligence. They don't just install; they engineer immersive, professional atmospheres.",
      stats: "Full Integration"
    }
  ];

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-40 bg-black relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          
          {/* Editorial Content */}
          <div className="w-full lg:w-3/4 relative min-h-[500px] flex flex-col justify-center">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-px bg-winmax-orange" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-winmax-orange">
                  Strategic Partners
                </span>
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative"
              >
                <Quote className="absolute -top-16 -left-8 w-24 h-24 text-white/[0.03]" />
                <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[0.9] mb-16 max-w-4xl">
                  "{testimonials[current].quote}"
                </h3>

                <div className="flex flex-wrap gap-12 items-center pt-12 border-t border-white/5">
                  <div>
                    <p className="text-2xl font-bold text-white tracking-tight">
                      {testimonials[current].name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-white/30 text-xs font-bold uppercase tracking-widest leading-none">
                      <Building2 className="w-3 h-3 text-winmax-orange" />
                      {testimonials[current].company}
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <MapPin className="w-3 h-3 text-winmax-orange" />
                      {testimonials[current].location}
                    </div>
                  </div>

                  <div className="flex-1" />

                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-winmax-orange mb-2">
                      Technical Metric
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {testimonials[current].stats}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-6 justify-center lg:justify-end">
            <button
              onClick={prev}
              className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-winmax-orange hover:border-winmax-orange transition-technical group"
            >
              <ArrowLeft className="w-6 h-6 group-active:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={next}
              className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-winmax-orange hover:border-winmax-orange transition-technical group"
            >
              <ArrowRight className="w-6 h-6 group-active:translate-x-1 transition-transform" />
            </button>
            <div className="hidden lg:block mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 transition-all duration-500 rounded-full ${
                      current === i ? 'w-12 bg-winmax-orange' : 'w-4 bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;