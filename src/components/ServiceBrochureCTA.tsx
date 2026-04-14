import { ReactNode } from "react";
import { ArrowRight, Download, Phone } from "lucide-react";
import Reveal from "./Reveal";

interface ServiceBrochureCTAProps {
  headline: ReactNode;
  subtext: string;
  badge: string;
  whatsappMessage: string;
  brochureFile: string;
}

const ServiceBrochureCTA = ({
  headline,
  subtext,
  badge,
  whatsappMessage,
  brochureFile,
}: ServiceBrochureCTAProps) => {
  return (
    <section className="py-32 relative overflow-hidden bg-[#020202] border-t border-white/[0.02]">
      {/* Background Spatial Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-winmax-orange/5 blur-[150px] rounded-full opacity-60" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 perspective-1000">
        <Reveal direction="up">
          <div className="max-w-6xl mx-auto rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] group transition-all duration-700 hover:bg-white/[0.03]">
            
            {/* Soft Ambient Inner Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-winmax-orange/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none opacity-40 transition-opacity duration-700 group-hover:opacity-80" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 relative z-10">
              {/* Left: Text */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-winmax-orange shadow-[0_0_10px_rgba(255,102,0,0.8)] animate-pulse" />
                  <span className="text-white/80 font-mono text-xs uppercase tracking-[0.2em]">
                    {badge}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                  {headline}
                </h2>
                
                <p className="text-lg text-white/50 font-light leading-relaxed max-w-xl">
                  {subtext}
                </p>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col gap-5 lg:min-w-[320px]">
                {/* Inquire Now */}
                <button
                  className="group/btn relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-winmax-orange to-[#ff8c42] text-black font-bold uppercase tracking-widest text-xs rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,102,0,0.4)]"
                  onClick={() =>
                    window.open(
                      `https://wa.me/+971527200466?text=${encodeURIComponent(whatsappMessage)}`,
                      "_blank"
                    )
                  }
                >
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-[30deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10">Inquire Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                </button>

                {/* Download Brochure */}
                <a
                  href={brochureFile}
                  download
                  className="group/dl w-full flex items-center justify-center gap-3 px-8 py-5 bg-white/[0.03] backdrop-blur-md text-white border border-white/5 font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <Download className="w-4 h-4 group-hover/dl:-translate-y-1 transition-transform duration-300 text-winmax-orange" />
                  <span>Download Brochure</span>
                </a>

                {/* Phone */}
                <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start lg:pl-2 mt-2 opacity-60 hover:opacity-100 transition-opacity duration-300 group/phone">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover/phone:bg-winmax-orange/10 group-hover/phone:border-winmax-orange/30 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-winmax-orange" />
                  </div>
                  <a
                    href="tel:+97142713101"
                    className="text-base font-medium tracking-wide text-white transition-colors duration-300"
                  >
                    +971 4 271 3101
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceBrochureCTA;
