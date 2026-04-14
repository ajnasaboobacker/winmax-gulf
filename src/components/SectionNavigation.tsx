import { useState, useEffect } from "react";
import { Home, Users, Cog, Image, MessageSquare, Phone } from "lucide-react";

const sections = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: Users, label: "About" },
  { id: "services", icon: Cog, label: "Services" },
  { id: "gallery", icon: Image, label: "Gallery" },
  { id: "testimonials", icon: MessageSquare, label: "Reviews" },
  { id: "contact", icon: Phone, label: "Contact" }
];

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-20% 0px -60% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-background/80 backdrop-blur-md border border-winmax-orange/20 rounded-full p-2 shadow-2xl">
        <div className="flex flex-col space-y-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`p-3 rounded-full transition-all duration-300 group relative ${
                  activeSection === section.id 
                    ? 'bg-winmax-orange text-white shadow-lg scale-110' 
                    : 'text-foreground/60 hover:text-winmax-orange hover:bg-winmax-orange/10'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-2 py-1 bg-background border border-winmax-orange/20 rounded text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {section.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigation;