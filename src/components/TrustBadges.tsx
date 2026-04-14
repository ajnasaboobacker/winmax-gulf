import { Shield, Award, Users, Clock, Star, CheckCircle } from "lucide-react";
import Reveal from "./Reveal";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "ISO Certified",
      description: "Quality Management System",
    },
    {
      icon: Award,
      title: "10+ Years",
      description: "Industry Leadership",
    },
    {
      icon: Users,
      title: "1000+ Projects",
      description: "High-End Installations",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Technical Assistance",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "International Standards",
    },
    {
      icon: CheckCircle,
      title: "Up to 3-Year Warranty",
      description: "Certified Coverage",
    },
  ];

  return (
    <section className="pt-12 pb-20 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-4 mb-14">
            <div className="w-10 h-px bg-winmax-orange" />
            <span className="text-xs font-mono tracking-[0.4em] uppercase text-winmax-orange">
              Strategic Standards
            </span>
          </div>
        </Reveal>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => (
            <Reveal key={index} delay={index * 0.08} width="100%" className="h-full">
              <div className="group flex flex-col items-start gap-4 p-7 bg-white/[0.03] border border-white/8 hover:border-winmax-orange/30 hover:bg-white/[0.05] rounded-2xl transition-all duration-500 h-full">

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-winmax-orange/10 border border-winmax-orange/20 group-hover:bg-winmax-orange/20 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                  <badge.icon className="w-6 h-6 text-winmax-orange" />
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-base font-bold text-white mb-1 leading-tight tracking-tight group-hover:text-winmax-orange transition-colors duration-300">
                    {badge.title}
                  </h4>
                  <p className="text-sm text-white/50 leading-snug font-light">
                    {badge.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;