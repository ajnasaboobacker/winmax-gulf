import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { CheckCircle, Phone, Mail, MapPin, Loader2, Shield, Award, Clock } from 'lucide-react';

const leadFormSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required').max(50, 'First name is too long'),
  last_name: z.string().trim().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().trim().email('Please enter a valid email').max(100, 'Email is too long'),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20, 'Phone number is too long').regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number'),
  company: z.string().trim().max(100, 'Company name is too long').optional(),
  service_interest: z.enum(['pdlc_smart_glass', 'led_display', 'dj_club_solutions', 'other'], {
    required_error: 'Please select a service',
  }),
  message: z.string().trim().max(500, 'Message is too long').optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const serviceOptions = [
  { value: 'pdlc_smart_glass', label: 'PDLC Smart Glass' },
  { value: 'led_display', label: 'LED Display Systems' },
  { value: 'dj_club_solutions', label: 'DJ Club Solutions' },
  { value: 'other', label: 'Other / General Inquiry' },
];

const benefits = [
  { icon: Shield, text: 'Industry-leading quality guaranteed' },
  { icon: Award, text: 'Over 500+ successful installations' },
  { icon: Clock, text: 'Fast response within 24 hours' },
];

const LandingPage = () => {
  const [searchParams] = useSearchParams();
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

  // Track UTM parameters
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

      // Call edge function for notifications
      try {
        await supabase.functions.invoke('send-lead-notification', {
          body: leadData,
        });
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
        // Don't fail the submission if notification fails
      }

      trackFormSubmission('landing_page_lead', true);
      setIsSuccess(true);
      toast({
        title: 'Thank you for your inquiry!',
        description: 'Our team will contact you within 24 hours.',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      trackFormSubmission('landing_page_lead', false);
      toast({
        title: 'Submission failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <SEOHead
          title="Thank You | WinmaxGulf"
          description="Thank you for your inquiry. Our team will contact you soon."
          noIndex={true}
        />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
            <p className="text-muted-foreground text-lg">
              Your inquiry has been received. Our team will contact you within 24 hours.
            </p>
            <div className="pt-4 space-y-3 text-left bg-card rounded-xl p-6 border border-border">
              <p className="font-medium text-foreground">In the meantime:</p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+971 4 227 5789</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@winmaxgulf.com</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Get a Free Quote | WinmaxGulf - Smart Glass & LED Solutions UAE"
        description="Request a free consultation for PDLC smart glass, LED displays, and DJ club solutions in UAE. Expert installation and 24-hour response guaranteed."
        noIndex={true}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
            <img src={winmaxLogo} alt="WinmaxGulf" className="h-8 sm:h-10" />
            <a 
              href="tel:+97142275789" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">+971 4 227 5789</span>
              <span className="sm:hidden text-sm">Call Us</span>
            </a>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 sm:py-12 lg:py-20">
          {/* Mobile: Form first, Desktop: Side by side */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
            
            {/* Form - Shows first on mobile */}
            <div className="order-1 lg:order-2 bg-card rounded-2xl border border-border p-5 sm:p-6 lg:p-8 shadow-xl w-full">
              <div className="space-y-5 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Get Your Free Quote</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Fill out the form and we'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="first_name" className="text-sm">First Name *</Label>
                      <Input
                        id="first_name"
                        placeholder="John"
                        {...register('first_name')}
                        className={`h-11 sm:h-10 text-base sm:text-sm ${errors.first_name ? 'border-destructive' : ''}`}
                      />
                      {errors.first_name && (
                        <p className="text-xs text-destructive">{errors.first_name.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="last_name" className="text-sm">Last Name *</Label>
                      <Input
                        id="last_name"
                        placeholder="Doe"
                        {...register('last_name')}
                        className={`h-11 sm:h-10 text-base sm:text-sm ${errors.last_name ? 'border-destructive' : ''}`}
                      />
                      {errors.last_name && (
                        <p className="text-xs text-destructive">{errors.last_name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-sm">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register('email')}
                      className={`h-11 sm:h-10 text-base sm:text-sm ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+971 50 123 4567"
                      {...register('phone')}
                      className={`h-11 sm:h-10 text-base sm:text-sm ${errors.phone ? 'border-destructive' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="company" className="text-sm">Company (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Your Company Name"
                      {...register('company')}
                      className="h-11 sm:h-10 text-base sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="service_interest" className="text-sm">Service Interest *</Label>
                    <Select
                      value={serviceInterest}
                      onValueChange={(value) => setValue('service_interest', value as LeadFormData['service_interest'])}
                    >
                      <SelectTrigger className={`h-11 sm:h-10 text-base sm:text-sm ${errors.service_interest ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-base sm:text-sm">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service_interest && (
                      <p className="text-xs text-destructive">{errors.service_interest.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="message" className="text-sm">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements..."
                      rows={3}
                      {...register('message')}
                      className="text-base sm:text-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-12 text-base sm:text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Get Free Quote'
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center px-2">
                    By submitting this form, you agree to our privacy policy. 
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </div>
            </div>

            {/* Value Proposition - Shows second on mobile */}
            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs sm:text-sm font-medium rounded-full">
                  Free Consultation
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Transform Your Space with{' '}
                  <span className="text-primary">Smart Technology</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Get expert advice on PDLC smart glass, LED displays, and complete DJ club solutions. 
                  Serving UAE with premium installations since 2010.
                </p>
              </div>

              {/* Benefits - Horizontal scroll on mobile, stacked on larger screens */}
              <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:flex-col sm:gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-lg border border-border flex-shrink-0 min-w-[200px] sm:min-w-0"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="p-4 sm:p-6 bg-card rounded-xl border border-border space-y-3 sm:space-y-4">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Need immediate assistance?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 sm:gap-3">
                  <a href="tel:+97142275789" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 -m-2 rounded-lg active:bg-primary/10">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base">+971 4 227 5789</span>
                  </a>
                  <a href="mailto:info@winmaxgulf.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 -m-2 rounded-lg active:bg-primary/10">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base">info@winmaxgulf.com</span>
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground p-2 -m-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Office 301, Al Saaha Offices, Souk Al Bahar, Downtown Dubai, UAE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 sm:py-8 bg-card/50">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} WinmaxGulf. All rights reserved.</p>
            <p className="mt-2">Dubai, UAE | +971 4 227 5789 | info@winmaxgulf.com</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
