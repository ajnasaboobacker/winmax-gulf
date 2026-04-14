import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, ArrowUpRight, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

/**
 * Winmax Gulf - Professional Architectural Footer
 * 
 * Re-engineered to follow clear business terminology (removing technical jargon like "Intelligence").
 * Uses Antigravity Design principles: Spatial depth, subtle watermark, and precision typography.
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Our Services", href: "/#services" },
    { name: "Recent Projects", href: "/#gallery" },
    { name: "Contact", href: "/#contact" }
  ];

  const solutionLinks = [
    { name: "PDLC Smart Glass", href: "/pdlc" },
    { name: "LED Display Systems", href: "/led-display" },
    { name: "Specialized AV & DJ Club Engineering", href: "/dj-club-solutions" },
    { name: "Smart Automation", href: "/smart-automation" },
    { name: "Collaboration AV", href: "/collaboration-av" },
    { name: "Solar Solutions", href: "/solar-solutions" }
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/winmaxgulf" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/company/winmaxgulf" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com/winmaxgulf" },
    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/@winmaxgulf" }
  ];

  return (
    <footer className="bg-black pt-32 pb-12 relative overflow-hidden border-t border-white/5 font-outfit">
      {/* Background Spatial Watermark */}
      <div className="absolute bottom-0 left-0 w-full select-none pointer-events-none translate-y-1/3">
        <h2 className="text-[18vw] font-black leading-none text-transparent stroke-text opacity-[0.02] whitespace-nowrap tracking-tighter">
          WINMAX GULF
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-32">

          {/* Column 1: Brand & Identity */}
          <div className="space-y-10">
            <div className="mb-10">
              <span className="text-3xl font-black tracking-tighter text-white">
                WINMAX<span className="text-winmax-orange">GULF</span>
              </span>
              <p className="text-xs text-white/30 font-mono tracking-widest mt-2">Computers LLC</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-white/50 leading-relaxed max-w-xs font-light">
                Providing the GCC with advanced structural and digital engineering solutions since 2015.
              </p>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-winmax-orange transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              [ Company ]
            </h4>
            <ul className="space-y-5">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-x-1 group-hover:translate-y-0 transition-all text-winmax-orange" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Expertise */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              [ Our Solutions ]
            </h4>
            <ul className="space-y-5">
              {solutionLinks.map((service, idx) => (
                <li key={idx}>
                  <a
                    href={service.href}
                    className="group flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors"
                  >
                    {service.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-x-1 group-hover:translate-y-0 transition-all text-winmax-orange" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Reach */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              [ Get In Touch ]
            </h4>
            <div className="space-y-8">
              <div className="space-y-4">
                <a href="mailto:sales@winmaxgulf.com" className="block group">
                  <span className="text-[11px] font-bold text-winmax-orange/40 block mb-2 transition-colors">Sales Solutions</span>
                  <span className="text-base font-bold text-white group-hover:text-winmax-orange transition-colors">sales@winmaxgulf.com</span>
                </a>

                <a href="mailto:info@winmaxgulf.com" className="block group">
                  <span className="text-[11px] font-bold text-winmax-orange/40 block mb-2 transition-colors">General Operations</span>
                  <span className="text-base font-bold text-white group-hover:text-winmax-orange transition-colors">info@winmaxgulf.com</span>
                </a>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-winmax-orange/40 block">Regional Headquarters</span>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-winmax-orange mt-1 shrink-0" />
                  <span className="text-sm font-bold text-white/60 leading-relaxed">
                    #301, 3rd Floor, NBQ Building,<br />
                    BurJuman, Dubai,<br />
                    United Arab Emirates
                  </span>
                </div>
              </div>

              <a href="tel:+97142713101" className="block group pt-2">
                <span className="text-[11px] font-bold text-winmax-orange/40 block mb-2 transition-colors">Direct Support</span>
                <span className="text-lg font-black text-white group-hover:text-winmax-orange transition-colors">+971 4 271 3101</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terminal */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] uppercase tracking-widest text-[#444] font-bold">
            <Link to="/privacy" className="hover:text-winmax-orange transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-winmax-orange transition-colors">Terms of Service</Link>
            <span>&copy; {new Date().getFullYear()} Winmax Gulf L.L.C.</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group text-[10px] font-black text-white/40 hover:text-white transition-all uppercase tracking-[0.3em]"
          >
            <div className="w-8 h-[1px] bg-white/10 group-hover:bg-winmax-orange transition-colors" />
            Return to Top
          </button>
        </div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
        }
      `}</style>
    </footer>
  );
};

export default Footer;