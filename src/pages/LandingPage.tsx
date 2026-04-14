import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackFormSubmission } from '@/hooks/useGATracking';
import SEOHead from '@/components/SEOHead';
import winmaxLogo from '@/assets/winmax-logo-white.png';
import { CheckCircle, Phone, Mail, MapPin, Loader2, Shield, Award, Clock, ArrowRight, ChevronRight, Globe, Zap } from 'lucide-react';
import Reveal from '@/components/Reveal';
import AntigravityCard from '@/components/AntigravityCard';
import { motion, AnimatePresence } from 'framer-motion';

const leadFormSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required').max(50, 'First name is too long'),
  last_name: z.string().trim().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().trim().email('Please enter a valid email').max(100, 'Email is too long'),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20, 'Phone number is too long').regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number'),
  company: z.string().trim().max(100, 'Company name is too long').optional(),
  service_interest: z.enum(['pdlc_smart_glass', 'led_display', 'specialized_av_engineering', 'solar_solutions', 'collaboration_av', 'smart_automation', 'other'], {
    required_error: 'Please select a service',
  }),
  message: z.string().trim().max(500, 'Message is too long').optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const serviceOptions = [
  { value: 'pdlc_smart_glass', label: 'PDLC Smart Glass Solutions' },
  { value: 'led_display', label: 'LED Display Systems' },
  { value: 'specialized_av_engineering', label: 'Specialized AV & DJ Club Engineering' },
  { value: 'solar_solutions', label: 'PV Solar Infrastructure' },
  { value: 'collaboration_av', label: 'Collaboration AV Hubs' },
  { value: 'smart_automation', label: 'Unified Smart Automation' },
  { value: 'other', label: 'Other / Custom Engineering' },
];

const benefits = [
  { icon: Shield, title: 'Quality Assurance', text: 'Industry-leading engineering standards' },
  { icon: Award, title: 'Proven Expertise', text: '1,000+ premium installations in UAE' },
  { icon: Clock, title: 'Rapid Deployment', text: '24-hour technical response time' },
];

const LandingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const serviceInterest = watch('service_interest');

  const utmParams = {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      const leadData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        service_interest: data.service_interest,
        message: data.message || null,
        utm_source: utmParams.utm_source || null,
        utm_medium: utmParams.utm_medium || null,
        utm_campaign: utmParams.utm_campaign || null,
        utm_content: utmParams.utm_content || null,
        utm_term: utmParams.utm_term || null,
        referrer_url: document.referrer || null,
        landing_page_url: window.location.href,
        user_agent: navigator.userAgent,
      };

      const { error: dbError } = await supabase.from('leads').insert([leadData]);

      if (dbError) throw dbError;

      try {
        await supabase.functions.invoke('send-lead-notification', {
          body: leadData,
        });
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
      }

      trackFormSubmission('landing_page_lead', true);
      setIsSuccess(true);
      toast({
        title: 'Thank you for your inquiry!',
        description: 'Our technical team will contact you within 24 hours.',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      trackFormSubmission('landing_page_lead', false);
      toast({
        title: 'Submission failed',
        description: 'Please try again or contact our Dubai HQ directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8 relative overflow-hidden font-sans">
        <div className="absolute inset-0 z-0 text-white/5 opacity-50">
          <div className="absolute top-0 left-0 w-full h-full antigravity-grid-pattern" />
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-winmax-orange/5 blur-[150px] rounded-full" />
        </div>

        <SEOHead
          title="Inquiry Received | Winmax Gulf"
          description="Thank you for your inquiry. Our technical team will reach out to you shortly."
          noIndex={true}
        />

        <Reveal>
          <div className="max-w-xl w-full text-center space-y-10 relative z-10 glass-heavy p-12 rounded-[2.5rem] border border-winmax-orange/20">
            <div className="w-24 h-24 mx-auto rounded-full bg-winmax-orange/10 flex items-center justify-center border border-winmax-orange/30">
              <CheckCircle className="w-12 h-12 text-winmax-orange" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">Inquiry <br /><span className="text-winmax-orange">Successfully Sent.</span></h1>
              <p className="text-white/60 text-lg font-light leading-relaxed">
                We have received your request. A technical specialist will review your project details and reach out within 24 business hours.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-10 text-left border-t border-white/5">
              <div className="flex items-center gap-5 text-white/50 group cursor-pointer" onClick={() => window.open('tel:+97142275789')}>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-winmax-orange/10 group-hover:text-winmax-orange transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Priority Line</p>
                  <span className="text-sm font-medium tracking-wide">+971 4 271 3101</span>
                </div>
              </div>
              <div className="flex items-center gap-5 text-white/50 group cursor-pointer" onClick={() => window.open('mailto:sales@winmaxgulf.com')}>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-winmax-orange/10 group-hover:text-winmax-orange transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Technical Desk</p>
                  <span className="text-sm font-medium tracking-wide">sales@winmaxgulf.com</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate('/')}
              className="w-full h-16 rounded-xl bg-winmax-orange hover:bg-white text-black font-bold uppercase tracking-[0.2em] transition-all duration-500"
            >
              Return to Corporate Site
            </Button>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-winmax-orange/30 font-sans">
      <SEOHead
        title="Consultation Portal | Winmax Gulf - Architectural Technology"
        description="Professional consultation for PDLC Smart Glass, LED Displays, and Solar Infrastructure in UAE. Request a technical brief today."
        noIndex={true}
      />

      {/* Corporate Header */}
      <header className="fixed top-0 w-full z-50 glass-heavy border-b border-white/5">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            src={winmaxLogo}
            alt="Winmax Gulf"
            className="h-9 cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="flex items-center gap-8">
            <a
              href="tel:+97142713101"
              className="flex items-center gap-3 group text-white/70 hover:text-winmax-orange transition-technical"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-winmax-orange/10 transition-colors">
                <Phone className="w-4 h-4 text-winmax-orange" />
              </div>
              <span className="hidden md:inline font-bold tracking-wider text-[10px] uppercase">+971 4 271 3101</span>
            </a>
          </div>
        </div>
      </header>

      <main className="pt-40 pb-24 relative overflow-hidden">
        {/* Background Depth Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-winmax-orange/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 antigravity-grid-pattern opacity-[0.03]" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-20 lg:gap-32 items-start">

            {/* Value Proposition & Architectural Context */}
            <div className="lg:col-span-5 space-y-14">
              <Reveal>
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-px bg-winmax-orange shadow-[0_0_15px_rgba(255,90,0,0.4)]" />
                  <span className="technical-text text-winmax-orange">Project Inquiry Portal</span>
                </div>
              </Reveal>

              <div className="space-y-8">
                <Reveal delay={0.2}>
                  <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter">
                    Precision <br />
                    <span className="text-white/40">Environments.</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.4}>
                  <p className="text-xl text-white/60 font-light leading-relaxed max-w-lg">
                    Request a specialized technical consultation for your infrastructure projects. We engineer responsive architecture across the UAE's most iconic commercial and residential sectors.
                  </p>
                </Reveal>
              </div>

              {/* Benefits Ledger */}
              <div className="space-y-5">
                {benefits.map((benefit, index) => (
                  <Reveal key={index} delay={0.6 + index * 0.1}>
                    <div className="flex items-start gap-5 p-6 glass-heavy rounded-2xl border border-white/5 transition-technical hover:border-winmax-orange/30 group">
                      <div className="w-12 h-12 rounded-xl bg-winmax-orange/5 group-hover:bg-winmax-orange/10 flex items-center justify-center shrink-0 transition-colors">
                        <benefit.icon className="w-6 h-6 text-winmax-orange/60 group-hover:text-winmax-orange transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-1">{benefit.title}</h3>
                        <p className="text-sm text-white/40 font-medium leading-snug">{benefit.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Corporate Trust Anchors */}
              <Reveal delay={1.0}>
                <div className="pt-10 space-y-8 border-t border-white/5">
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-11 h-11 rounded-full border-2 border-[#0a0a0a] bg-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white/30">DXB</div>
                      ))}
                    </div>
                    <div className="text-[11px] text-white/30 uppercase font-bold tracking-widest leading-relaxed">
                      Verified Engineering Partner for <br />
                      <span className="text-white">1,000+ Regional Enterprises.</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* The Consultation Portal (Form) */}
            <div className="lg:col-span-7">
              <Reveal delay={0.4}>
                <AntigravityCard tiltIntensity={2.5}>
                  <div className="relative glass-heavy rounded-[3rem] border border-white/10 p-10 md:p-16 shadow-spatial overflow-hidden perspective-1000">
                    {/* Interior Spatial Glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-winmax-orange/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="mb-14 space-y-3">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Technical Project Inquiry</h2>
                        <p className="text-[11px] text-white/40 font-bold uppercase tracking-[0.3em]">Corporate Service Portal</p>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <Label htmlFor="first_name" className="technical-text text-white/40">First Name</Label>
                            <Input
                              id="first_name"
                              placeholder="Required"
                              {...register('first_name')}
                              className="h-16 bg-white/[0.04] border-white/10 text-white placeholder:text-white/10 rounded-xl focus:ring-winmax-orange focus:border-winmax-orange transition-technical text-lg px-6"
                            />
                            {errors.first_name && <p className="text-[10px] text-winmax-orange font-bold uppercase tracking-[0.2em]">{errors.first_name.message}</p>}
                          </div>
                          <div className="space-y-4">
                            <Label htmlFor="last_name" className="technical-text text-white/40">Last Name</Label>
                            <Input
                              id="last_name"
                              placeholder="Required"
                              {...register('last_name')}
                              className="h-16 bg-white/[0.04] border-white/10 text-white placeholder:text-white/10 rounded-xl focus:ring-winmax-orange focus:border-winmax-orange transition-technical text-lg px-6"
                            />
                            {errors.last_name && <p className="text-[10px] text-winmax-orange font-bold uppercase tracking-[0.2em]">{errors.last_name.message}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <Label htmlFor="email" className="technical-text text-white/40">Corporate Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="name@company.com"
                              {...register('email')}
                              className="h-16 bg-white/[0.04] border-white/10 text-white placeholder:text-white/10 rounded-xl focus:ring-winmax-orange focus:border-winmax-orange transition-technical text-lg px-6"
                            />
                            {errors.email && <p className="text-[10px] text-winmax-orange font-bold uppercase tracking-[0.2em]">{errors.email.message}</p>}
                          </div>
                          <div className="space-y-4">
                            <Label htmlFor="phone" className="technical-text text-white/40">Priority Contact No.</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+971 -- --- ----"
                              {...register('phone')}
                              className="h-16 bg-white/[0.04] border-white/10 text-white placeholder:text-white/10 rounded-xl focus:ring-winmax-orange focus:border-winmax-orange transition-technical text-lg px-6"
                            />
                            {errors.phone && <p className="text-[10px] text-winmax-orange font-bold uppercase tracking-[0.2em]">{errors.phone.message}</p>}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="service_interest" className="technical-text text-white/40">Solution Selection</Label>
                          <Select
                            value={serviceInterest}
                            onValueChange={(value) => setValue('service_interest', value as LeadFormData['service_interest'])}
                          >
                            <SelectTrigger className="h-16 bg-white/[0.04] border-white/10 text-white rounded-xl focus:ring-winmax-orange focus:border-winmax-orange transition-technical text-lg px-6">
                              <SelectValue placeholder="Select Area of Interest" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#111] border-white/10 text-white rounded-xl overflow-hidden">
                              {serviceOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="py-4 focus:bg-winmax-orange focus:text-black transition-colors text-sm font-medium">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.service_interest && <p className="text-[10px] text-winmax-orange font-bold uppercase tracking-[0.2em]">{errors.service_interest.message}</p>}
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="message" className="technical-text text-white/40">Project Overview (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Briefly describe the structural or technical objectives for this project..."
                            rows={4}
                            {...register('message')}
                            className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/10 rounded-xl focus:ring-winmax-orange focus:border-winmax-orange transition-technical resize-none p-6 text-base"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-20 bg-winmax-orange hover:bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-xl transition-all duration-700 shadow-[0_15px_40px_rgba(255,90,0,0.2)] hover:shadow-white/10 mb-6"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-4">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending Inquiry...
                            </div>
                          ) : (
                            <div className="flex items-center gap-4">
                              Submit Inquiry <ArrowRight className="w-5 h-5" />
                            </div>
                          )}
                        </Button>

                        <div className="text-center pt-2">
                          <p className="text-[10px] text-white/15 font-bold uppercase tracking-[0.25em] leading-[1.6]">
                            Transmission secured with SSL encryption. <br />
                            Winmax Gulf Corporation • Dubai HQ • 2026
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </AntigravityCard>
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      {/* Corporate Anchored Footer */}
      <footer className="py-16 border-t border-white/5 relative z-10 bg-[#050505]">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-8">
            <div className="space-y-6">
              <img src={winmaxLogo} alt="Winmax Gulf" className="h-8 opacity-30" />
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Corporate Headquarters</p>
                <p className="text-sm font-medium text-white/40">#301, 3rd Floor, NBQ Building, BurJuman, Dubai, UAE</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-winmax-orange uppercase tracking-[0.3em]">Direct</p>
                <div className="space-y-2 flex flex-col">
                  <a href="tel:+97142713101" className="text-sm text-white/40 hover:text-winmax-orange transition-colors">+971 4 271 3101</a>
                  <a href="mailto:sales@winmaxgulf.com" className="text-sm text-white/40 hover:text-winmax-orange transition-colors">sales@winmaxgulf.com</a>
                  <a href="mailto:info@winmaxgulf.com" className="text-sm text-white/40 hover:text-winmax-orange transition-colors">info@winmaxgulf.com</a>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-winmax-orange uppercase tracking-[0.3em]">Privacy</p>
                <div className="space-y-2 flex flex-col text-sm text-white/40">
                  <span className="cursor-pointer hover:text-white transition-colors">Data Protocol</span>
                  <span className="cursor-pointer hover:text-white transition-colors">Service Terms</span>
                </div>
              </div>
              <div className="hidden md:block space-y-4">
                <p className="text-[10px] font-bold text-winmax-orange uppercase tracking-[0.3em]">Version</p>
                <p className="text-sm text-white/20 font-mono">v4.0.12-DXB</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Winmax Gulf Corporation. All Operational Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Network Status: Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
