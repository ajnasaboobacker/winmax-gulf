import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import Reveal from "./Reveal";
import { Plus } from "lucide-react";
import AntigravityCard from "./AntigravityCard";

const faqs = [
  {
    id: "01",
    question: "What is PDLC Smart Film and how does it work?",
    answer: "PDLC (Polymer Dispersed Liquid Crystal) Smart Film is an advanced architectural technology that transitions between transparent and opaque states. When an electrical current is applied, the liquid crystals align to make the film clear. When powered off, they scatter light, instantly providing 100% visual privacy."
  },
  {
    id: "02",
    question: "Where does Winmax Gulf provide installation services?",
    answer: "Winmax Gulf provides enterprise-grade installation services across the entire UAE, with primary operations running in Dubai and Abu Dhabi. We deploy specialized engineering teams for corporate offices, luxury residential properties, and major retail centers."
  },
  {
    id: "03",
    question: "Are your outdoor LED Display Systems weather resistant?",
    answer: "Yes, our outdoor LED Video Walls feature IP65-rated weather resistance, making them fully protected against the extreme heat, dust, and humidity typical of the GCC climate. They reliably maintain peak brightness (up to 8000+ nits) in direct Middle Eastern sunlight."
  },
  {
    id: "04",
    question: "Do you integrate with existing Smart Home systems?",
    answer: "Absolutely. Our smart automation frameworks are designed for seamless integration. We natively support major building automation platforms like Crestron, Lutron, Control4, and KNX, allowing you to manage PDLC privacy film and dynamic lighting from a single centralized interface."
  },
  {
    id: "05",
    question: "Do you supply solar energy storage solutions for residential villas?",
    answer: "Yes, Winmax Gulf provides high-efficiency photovoltaic (PV) systems specifically engineered for residential and commercial energy independence. Our solutions include high-density lithium-ion storage batteries and smart hybrid inverters that allow you to manage and store solar power for 24/7 reliability across the UAE."
  },
  {
    id: "06",
    question: "What AV solutions do you offer for corporate meeting pods?",
    answer: "We specialize in 'Collaboration AV' for modern workspaces, including 4K video conferencing integrations, beamforming microphone arrays, and wireless BYOD (Bring Your Own Device) sharing within acoustic meeting pods. Our systems are certified for high-fidelity use with Microsoft Teams, Zoom, and unified communications platforms."
  },
  {
    id: "07",
    question: "What warranty and after-sales support is included?",
    answer: "Every Winmax Gulf installation includes comprehensive technical support and an industry-leading warranty. We provide dedicated on-site maintenance assistance and proactive system diagnostics to ensure your digital architecture operates flawlessly year-round."
  }
];

const FAQ = () => {
  useEffect(() => {
    // Injecting AI SEO Schema directly for search context
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    script.id = 'faq-schema';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <section id="faq" className="py-40 bg-[#0a0a0a] relative overflow-hidden">
      {/* Antigravity Deep Field Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-winmax-orange/10 blur-[150px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          <div className="lg:sticky lg:top-32">
            <Reveal delay={0.2}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-px bg-winmax-orange shadow-[0_0_10px_rgba(255,90,0,0.5)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-winmax-orange">Knowledge Base</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-12 leading-none drop-shadow-md">
                Technical <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-winmax-orange to-white/70">Intelligence.</span>
              </h2>
            </Reveal>
            
            <Reveal delay={0.6}>
              <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed mb-16 max-w-lg">
                Common inquiries regarding operational parameters, architectural integration logistics, and system durability across the UAE.
              </p>
            </Reveal>

            <Reveal delay={0.8}>
                <AntigravityCard tiltIntensity={3}>
                    <div 
                        className="group relative p-10 glass-heavy cursor-pointer transition-technical hover:border-winmax-orange/40"
                        onClick={() => window.open('https://wa.me/+971527200466', '_blank')}
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-winmax-orange block mb-6">Direct Consultation</span>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-white group-hover:text-winmax-orange transition-colors duration-500">Discuss Custom Specs</span>
                            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-winmax-orange group-hover:border-winmax-orange transition-all duration-500">
                                <Plus className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </AntigravityCard>
            </Reveal>
          </div>

          {/* AI Optimized Extractable FAQ Content */}
          <div className="lg:mt-0 relative z-20 perspective-1000">
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, index) => (
                <Reveal key={index} delay={0.2 + index * 0.1}>
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border border-white/10 glass-heavy rounded-xl px-10 transition-all duration-500 data-[state=open]:border-winmax-orange/30 data-[state=open]:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                  >
                    <AccordionTrigger className="hover:no-underline py-10 text-left group transition-colors">
                      <div className="flex gap-8 items-start pr-8">
                        <span className="font-mono text-[10px] font-bold text-winmax-orange/60 mt-1.5">{faq.id}</span>
                        <strong className="text-xl md:text-2xl font-bold text-white group-data-[state=open]:text-winmax-orange tracking-tight transition-colors duration-300 drop-shadow-sm">
                          {faq.question}
                        </strong>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-lg text-white/70 font-light leading-relaxed pb-12 pt-2 border-t border-white/5">
                      <div className="pl-14">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
