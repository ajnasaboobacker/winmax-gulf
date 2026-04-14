import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Globe, Clock, MessageSquare, ArrowRight } from "lucide-react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { trackFormSubmission, trackOutboundLink } from "@/hooks/useGATracking";
import Reveal from "./Reveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    phone: z.string().trim().min(8).max(20),
    service: z.string().min(1),
    message: z.string().trim().min(10).max(1000)
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = contactSchema.parse(formData);
      const whatsappMessage = `Project Inquiry: ${validatedData.name}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone}\nSolution: ${validatedData.service}\n\nMessage: ${validatedData.message}`;
      
      window.open(`https://wa.me/+971527200466?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      
      trackFormSubmission('contact_form_premium', true);
      toast({ title: "Inquiry Received", description: "Redirecting to our WhatsApp technical team..." });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => { if (err.path[0]) newErrors[err.path[0] as string] = err.message; });
        setErrors(newErrors);
        toast({ title: "Submission Error", description: "Please complete all required fields correctly.", variant: "destructive" });
      }
    }
  };

  const contactDetails = [
    { icon: <Phone className="w-5 h-5" />, label: "Direct Sales", value: "+971 4 271 3101", link: "tel:+97142713101", status: null },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Technical WhatsApp", value: "Message Now", link: "https://wa.me/+971527200466", status: "Operational" },
    { icon: <Mail className="w-5 h-5" />, label: "Sales Inquiry", value: "sales@winmaxgulf.com", link: "mailto:sales@winmaxgulf.com", status: null },
    { icon: <Mail className="w-5 h-5" />, label: "Corporate Email", value: "info@winmaxgulf.com", link: "mailto:info@winmaxgulf.com", status: null },
    { icon: <Globe className="w-5 h-5" />, label: "UAE Headquarters", value: "Dubai, UAE", link: "#", status: null }
  ];

  return (
    <section id="contact" className="py-40 bg-[#050505] relative overflow-hidden perspective-1000">
      {/* Antigravity Spatial Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-winmax-orange/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
        <div className="absolute inset-0 bg-antigravity-grid-pattern opacity-10" />
      </div>

      {/* Floating Engineering Blueprint Visual Anchor */}
      <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.08] lg:opacity-[0.12] hidden lg:block pointer-events-none">
        <motion.div 
          className="w-full h-full relative perspective-1000"
          animate={{ 
            rotateY: [0, 5, 0],
            rotateX: [0, -5, 0],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full font-mono">
            {/* Main Isometric Grid */}
            <path d="M200 50 L350 150 L200 250 L50 150 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-winmax-orange" strokeDasharray="4 2" />
            <path d="M200 100 L300 166 L200 233 L100 166 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/40" />
            
            {/* Vertical Support Callouts */}
            <line x1="200" y1="50" x2="200" y2="250" stroke="currentColor" strokeWidth="0.2" className="text-white/20" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="currentColor" strokeWidth="0.2" className="text-white/20" />
            
            {/* Technical Labels */}
            <text x="180" y="45" fontSize="6" className="fill-winmax-orange/60 uppercase tracking-widest">REF_AX-0.1</text>
            <text x="360" y="155" fontSize="6" className="fill-white/40 uppercase tracking-widest">32.4 N/m</text>
            <text x="30" y="155" fontSize="6" className="fill-white/40 uppercase tracking-widest">D-ALPHA</text>
            <text x="185" y="265" fontSize="6" className="fill-winmax-orange/60 uppercase tracking-widest">LOAD_BEARING_04</text>

            {/* Stylized Floor Plan / Component Layer */}
            <motion.rect 
              x="150" y="130" width="100" height="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-winmax-orange"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <rect x="160" y="140" width="80" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
            
            {/* Digital Scanning Pulse */}
            <motion.line 
              x1="50" y1="50" x2="350" y2="50" stroke="currentColor" strokeWidth="1" className="text-winmax-orange/50"
              animate={{ y: [0, 300, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 lg:gap-32">
          
          {/* Information Column */}
          <div className="w-full lg:w-2/5 preserve-3d">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-winmax-orange" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-winmax-orange">
                  Unified Engagement
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-12">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-winmax-orange via-white to-white/40">Dialogue.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-white/70 mb-20 font-light leading-relaxed max-w-md">
                Protocol-driven communication for complex architectural infrastructure. Connect with our UAE technical hub.
              </p>
            </Reveal>

            <div className="space-y-8">
              {contactDetails.map((item, idx) => (
                <Reveal key={idx} delay={0.3 + idx * 0.1}>
                  <motion.a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group block relative"
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-winmax-orange transition-colors">
                        {item.label}
                      </p>
                      {item.status && (
                        <span className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-mono uppercase tracking-widest text-green-400">
                          <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                          {item.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/60 group-hover:border-winmax-orange group-hover:text-winmax-orange transition-technical shadow-spatial">
                        {item.icon}
                      </div>
                      <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-winmax-orange transition-all duration-500 tracking-tight">
                        {item.value}
                      </span>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="w-full lg:w-3/5">
            <Reveal delay={0.4} yOffset={40}>
              <div className="relative group/form">
                {/* Holographic Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-winmax-orange/20 via-white/5 to-winmax-orange/20 rounded-[2.5rem] blur opacity-30 group-hover/form:opacity-100 transition duration-1000" />
                
                <div className="relative p-12 md:p-20 rounded-[2.5rem] glass-heavy border border-white/10 overflow-hidden">
                  {/* Internal Grid Background */}
                  <div className="absolute inset-0 bg-antigravity-grid-pattern opacity-5 pointer-events-none" />
                  
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 ml-4 group-focus-within:text-winmax-orange transition-colors">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your identity"
                          className="w-full bg-white/[0.03] border border-white/10 px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-winmax-orange focus:ring-1 focus:ring-winmax-orange/20 transition-all rounded-2xl"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 ml-4">
                          Corporate Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="communications@domain.com"
                          className="w-full bg-white/[0.03] border border-white/10 px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-winmax-orange focus:ring-1 focus:ring-winmax-orange/20 transition-all rounded-2xl"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 ml-4">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+971 -- --- ----"
                          className="w-full bg-white/[0.03] border border-white/10 px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-winmax-orange focus:ring-1 focus:ring-winmax-orange/20 transition-all rounded-2xl"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 ml-4">
                          Interested Solution
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.service}
                            onChange={(e) => handleInputChange('service', e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 px-8 py-6 text-white appearance-none focus:outline-none focus:border-winmax-orange focus:ring-1 focus:ring-winmax-orange/20 transition-all rounded-2xl"
                          >
                            <option value="" className="bg-black">Select Solution</option>
                            <option value="PDLC" className="bg-black">PDLC Smart Glass</option>
                            <option value="LED" className="bg-black">LED Display Systems</option>
                            <option value="DJ" className="bg-black">DJ & Club Solutions</option>
                            <option value="Solar" className="bg-black">Solar Energy PV</option>
                            <option value="AV" className="bg-black">Collaboration AV</option>
                            <option value="Automation" className="bg-black">Smart Automation</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-winmax-orange">
                            <ArrowRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 ml-4">
                        Project Details
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Transmission details..."
                        className="w-full bg-white/[0.03] border border-white/10 px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-winmax-orange focus:ring-1 focus:ring-winmax-orange/20 transition-all rounded-2xl resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,90,0,0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full h-24 rounded-2xl bg-winmax-orange text-black font-black uppercase tracking-[0.5em] text-xs flex items-center justify-center gap-6 group transition-technical overflow-hidden relative"
                    >
                      <span className="relative z-10">Send Inquiry</span>
                      <Send className="w-5 h-5 relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
                      {/* Button scanning light effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-all" />
                    </motion.button>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;