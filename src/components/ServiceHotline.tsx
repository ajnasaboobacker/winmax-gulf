import { motion } from "framer-motion";
import { Phone, Shapes, Monitor, Volume2, Settings, Presentation, Sun } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  { title: "PDLC Smart Glass", icon: <Shapes />, numbers: ["+971 52 720 0466", "+971 54 234 0588"] },
  { title: "LED Display Systems", icon: <Monitor />, numbers: ["+971 52 720 0466", "+971 54 234 0588"] },
  { title: "Specialized AV & DJ Club Engineering", icon: <Volume2 />, numbers: ["+971 52 720 0466"] },
  { title: "Smart Automation", icon: <Settings />, numbers: ["+971 54 234 0586"] },
  { title: "Collaboration AV", icon: <Presentation />, numbers: ["+971 54 234 0586", "+971 52 720 0466"] },
  { title: "Solar Solutions", icon: <Sun />, numbers: ["+971 54 234 0588", "+971 54 234 0586"] }
];

const ServiceHotline = () => {
  return (
    <section className="py-20 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Compact Label */}
        <div className="flex items-center gap-4 mb-10 opacity-40">
          <div className="w-10 h-px bg-white" />
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">Direct Service Directory</span>
        </div>

        {/* Precision Technical Ribbon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={0.05 * idx} yOffset={5}>
              <div className="flex items-start gap-5 group">
                {/* Minimal Icon */}
                <div className="mt-1 w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-winmax-orange/40 group-hover:text-winmax-orange transition-colors duration-500 [&>svg]:w-4 [&>svg]:h-4">
                  {service.icon}
                </div>

                {/* Alignment Grid: Fixed Name Column + Number Column */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-winmax-orange transition-colors whitespace-nowrap">
                      {service.title}
                    </span>
                    <div className="w-8 h-px bg-white/10" />
                  </div>

                  <div className="flex flex-col gap-2">
                    {service.numbers.map((number, nIdx) => (
                      <a
                        key={nIdx}
                        href={`tel:${number.replace(/\s/g, '')}`}
                        className="flex items-center gap-2.5 text-lg font-bold text-white/40 hover:text-white transition-all tracking-tighter"
                      >
                        <Phone className="w-3 h-3 text-winmax-orange/40 group-hover:text-winmax-orange" />
                        {number}
                      </a>
                    ))}
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

export default ServiceHotline;
