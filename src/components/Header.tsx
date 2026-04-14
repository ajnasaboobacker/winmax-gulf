import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import winmaxLogo from "@/assets/logos/winmax-logo-new.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", hash: "#home" },
    { name: "Services", path: "/#services", hash: "#services" },
    { name: "About", path: "/#about", hash: "#about" },
    { name: "Process", path: "/#process", hash: "#process" },
    { name: "Contact", path: "/#contact", hash: "#contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.23,1,0.32,1]
      ${isScrolled 
        ? 'py-4' 
        : 'py-8'
      }
    `}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`
          relative flex items-center justify-between px-10 transition-all duration-700
          ${isScrolled 
            ? 'bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full h-20 shadow-xl' 
            : 'h-24'
          }
        `}>
          {/* Logo */}
          <Link to="/" className="relative z-10 block group">
            <img 
              src={winmaxLogo}
              alt="Winmax Gulf"
              className={`
                transition-all duration-700 ease-[0.23,1,0.32,1]
                ${isScrolled ? 'h-32 md:h-36' : 'h-48 md:h-56'}
                filter group-hover:brightness-125
              `}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors group py-2"
              >
                {link.name}
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-winmax-orange transition-all duration-500 group-hover:w-full"
                  layoutId="nav-underline"
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/#contact" 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-winmax-orange transition-colors"
            >
              Enquire
            </Link>
            <Button 
              className="bg-winmax-orange hover:bg-white text-white hover:text-black rounded-full px-8 py-5 h-auto font-bold uppercase tracking-widest text-[10px] transition-technical"
              onClick={() => window.open('https://wa.me/+971527200466', '_blank')}
            >
              Consultation
              <ArrowUpRight className="ml-2 w-3 h-3" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-3 text-white transition-transform hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu - Professional Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[-1] flex flex-col justify-center px-12"
            >
              <nav className="flex flex-col gap-10">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link 
                      to={link.path}
                      className="text-5xl font-bold text-white hover:text-winmax-orange tracking-tight transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-20 pt-12 border-t border-white/10"
              >
                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-6">Expert Advisor</p>
                <a href="tel:+97142713101" className="text-2xl font-bold text-white decoration-winmax-orange">
                  +971 4 271 3101
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;