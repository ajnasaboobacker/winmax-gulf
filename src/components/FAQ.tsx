import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EnhancedScrollAnimation from "./EnhancedScrollAnimations";
import GlassmorphismCard from "./GlassmorphismCard";
import AnimatedGradientBackground from "./AnimatedGradientBackground";
import { useEffect } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is PDLC smart film and how does it work?",
      answer: "PDLC (Polymer Dispersed Liquid Crystal) smart film is an advanced switchable privacy glass technology that instantly changes from transparent to opaque at the touch of a button. When powered ON, the film becomes clear allowing full visibility. When powered OFF, it turns milky white providing complete privacy while still allowing light diffusion. It's perfect for offices, homes, hospitals, and commercial spaces throughout Dubai and UAE."
    },
    {
      question: "How long does it take to install PDLC smart film in Dubai?",
      answer: "Installation time depends on the size and complexity of the project. Typically, a standard office or home installation takes 1-3 days. Our professional installation team in Dubai handles everything from initial assessment to final testing and training. We ensure minimal disruption to your daily operations with efficient project management and experienced technicians."
    },
    {
      question: "What types of LED display systems do you offer in UAE?",
      answer: "We offer comprehensive LED display solutions including indoor LED video walls, outdoor LED billboards, transparent LED screens, flexible LED displays, rental LED screens, and fine pitch LED displays. Our systems are suitable for retail stores, corporate offices, events, stadiums, and advertising applications across Dubai, Abu Dhabi, and the wider UAE. All displays feature ultra-HD resolution, weather resistance, and remote content management."
    },
    {
      question: "Do you provide maintenance and support after installation?",
      answer: "Yes, we provide comprehensive after-sales support including regular maintenance, 24/7 technical assistance, remote troubleshooting, and on-site repair services. Our maintenance packages ensure your smart technology systems continue to perform optimally. We also offer training for your team to operate and maintain the systems effectively."
    },
    {
      question: "Can PDLC smart film be integrated with home automation systems?",
      answer: "Absolutely! PDLC smart film is fully compatible with leading home automation systems including Crestron, Lutron, Amazon Alexa, Google Home, and Apple HomeKit. You can control your smart glass via smartphone apps, voice commands, motion sensors, timers, or wall switches. Our expert team ensures seamless integration with your existing smart home or office automation infrastructure in Dubai and UAE."
    },
    {
      question: "What is the cost of LED display installation in Dubai?",
      answer: "LED display costs vary based on size, resolution, indoor/outdoor requirements, and installation complexity. We provide customized quotes after understanding your specific needs. Factors include screen dimensions, pixel pitch, mounting requirements, and content management systems. Contact us for a free consultation and detailed quotation tailored to your project requirements in Dubai or anywhere in the UAE."
    },
    {
      question: "How energy-efficient is PDLC smart film compared to traditional blinds?",
      answer: "PDLC smart film is highly energy-efficient, reducing heat transfer by up to 30% and blocking 99% of harmful UV rays. This significantly lowers air conditioning costs in Dubai's hot climate. Unlike traditional blinds, smart film maintains natural light diffusion even in opaque mode, reducing artificial lighting needs. The low-power operation (typically 5W per square meter) makes it an eco-friendly and cost-effective solution."
    },
    {
      question: "What services are included in your DJ club solutions?",
      answer: "Our complete turnkey DJ club solutions include professional sound systems, dynamic lighting installations, LED video walls, DJ booths, mixing equipment, special effects (fog, lasers, CO2 cannons), rigging and installation, 3D visualization and design, system integration, staff training, and ongoing technical support. We handle everything from concept to completion for nightclubs, bars, event venues, and entertainment spaces across UAE."
    },
    {
      question: "Which areas in UAE do you service?",
      answer: "We service all major areas across the United Arab Emirates including Dubai (Dubai Marina, Downtown Dubai, Business Bay, Jumeirah, DIFC), Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our installation teams are available throughout UAE for residential, commercial, and industrial projects. We provide free on-site consultations and assessments anywhere in the Emirates."
    },
    {
      question: "How do I get started with a smart technology project?",
      answer: "Getting started is easy! Contact us via WhatsApp (+971527200466), phone, or our website contact form. We'll schedule a free consultation to understand your requirements, provide a site assessment, create a customized solution proposal with 3D visualizations, deliver a detailed quotation, and plan the installation timeline. Our expert team guides you through every step from concept to completion."
    }
  ];

  useEffect(() => {
    // Add FAQ schema to page
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
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="faq" className="relative py-20 overflow-hidden">
      <AnimatedGradientBackground variant="section" className="z-0" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
          <GlassmorphismCard intensity="medium" glow className="inline-flex items-center px-6 py-3 rounded-full mb-6">
            <span className="text-sm font-medium text-winmax-orange">❓ Frequently Asked Questions</span>
          </GlassmorphismCard>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Common Questions About <span className="text-winmax-orange">Smart Technology Solutions</span> in UAE
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to frequently asked questions about PDLC smart film, LED displays, DJ club solutions, installation processes, pricing, and our services across Dubai and UAE.
          </p>
        </EnhancedScrollAnimation>

        <EnhancedScrollAnimation animation="fadeInUp" delay={200}>
          <GlassmorphismCard intensity="light" className="max-w-4xl mx-auto p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left hover:text-winmax-orange transition-colors py-4">
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassmorphismCard>
        </EnhancedScrollAnimation>

        <EnhancedScrollAnimation animation="fadeInUp" delay={400}>
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Still have questions? Our expert team is here to help!
            </p>
            <a
              href="https://wa.me/+971527200466?text=Hello%20I%20have%20questions%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-glow hover:shadow-neon"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </EnhancedScrollAnimation>
      </div>
    </section>
  );
};

export default FAQ;
