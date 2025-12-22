import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Smartphone, Monitor, Zap, Wifi, Mic, Phone, Home, Building, Shield, Sun } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import EnhancedScrollAnimation from "@/components/EnhancedScrollAnimations";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import Interactive3DCard from "@/components/Interactive3DCard";
import SEOHead from "@/components/SEOHead";
import heroImage from "@/assets/hero-smart-glass.jpg";
import bedroomImage from "@/assets/bedroom-room.jpg";
import conferenceImage from "@/assets/conference-room.jpg";

const PDLC = () => {
  const controlMethods = [
    {
      icon: Zap,
      title: "Motion Sensor",
      description: "Automatically adjusts transparency based on occupancy, ensuring privacy when needed without manual operation."
    },
    {
      icon: Smartphone,
      title: "Smart Phone & Computer",
      description: "Control your glass remotely through the Lutron app — whether you're in the same building or halfway around the world."
    },
    {
      icon: Monitor,
      title: "Dimmer",
      description: "Fine-tune your privacy levels by adjusting the film from fully transparent to fully opaque, and everything in between."
    },
    {
      icon: Phone,
      title: "Remote Control",
      description: "Operate individual glass panels conveniently with handheld remotes."
    },
    {
      icon: Home,
      title: "Certified with Crestron & Lutron",
      description: "Seamless integration with world-class home and office automation systems."
    },
    {
      icon: Wifi,
      title: "WiFi Switch",
      description: "Control devices remotely using a smart plug and mobile app."
    },
    {
      icon: Building,
      title: "WiFi Wall Switch",
      description: "A sleek wall-mounted switch for wireless control of lights and glass transparency."
    },
    {
      icon: Mic,
      title: "Voice Assistants",
      description: "Compatible with Amazon Echo, Apple HomePod, Google Home, and Xiaomi — simply use voice commands through Alexa, Siri, or Google Assistant for effortless operation."
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Energy Efficiency",
      description: "Reduces heat transfer, lowering air conditioning costs."
    },
    {
      icon: Shield,
      title: "Water-Free",
      description: "Adds a high-tech, sleek look to your space."
    },
    {
      icon: Sun,
      title: "Health Protection",
      description: "Blocks harmful UV rays and reduces glare."
    },
    {
      icon: Shield,
      title: "Easy Maintenance",
      description: "Simple to clean, durable, and long-lasting."
    }
  ];

  const applications = [
    { category: "Offices", details: "Boardrooms, meeting rooms, and private workspaces" },
    { category: "Residential Spaces", details: "Bedrooms, bathrooms, and living rooms" },
    { category: "Healthcare", details: "Patient rooms and consultation areas" },
    { category: "Retail", details: "Display windows and store interiors" }
  ];

  const pdlcSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://winmaxgulf.com/pdlc#product",
        "name": "PDLC Smart Film",
        "description": "Premium switchable privacy glass film for instant transparency control. Switch between transparent and opaque states with a button press.",
        "brand": {
          "@type": "Brand",
          "name": "WinmaxGulf"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "WinmaxGulf"
        },
        "category": "Smart Glass Technology",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "AED",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "WinmaxGulf"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "250",
          "bestRating": "5"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://winmaxgulf.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "PDLC Smart Glass",
            "item": "https://winmaxgulf.com/pdlc"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does PDLC smart glass work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When power is ON, the glass becomes fully transparent. When power is OFF, the glass becomes milky white opaque, blocking visibility completely while still allowing light to pass through."
            }
          },
          {
            "@type": "Question",
            "name": "What are the control options for PDLC smart film?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PDLC smart film can be controlled via motion sensors, smartphone apps, remote controls, dimmer switches, WiFi switches, and voice assistants like Alexa, Google Home, and Siri. It is also certified with Crestron and Lutron systems."
            }
          },
          {
            "@type": "Question",
            "name": "Where can PDLC smart glass be used?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PDLC smart glass is perfect for offices (boardrooms, meeting rooms), residential spaces (bedrooms, bathrooms), healthcare facilities (patient rooms), and retail environments (display windows)."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="PDLC Smart Film UAE | Switchable Privacy Glass Dubai | WinmaxGulf"
        description="Premium PDLC smart film installation in Dubai & UAE. Instant privacy control, energy efficient switchable glass for offices, homes & commercial spaces. Expert installation."
        keywords="PDLC smart film UAE, switchable glass Dubai, smart privacy glass, electronic glass UAE, PDLC film installation Dubai, privacy glass Abu Dhabi, smart glass technology UAE"
        ogTitle="PDLC Smart Film UAE | Switchable Privacy Glass Solutions"
        ogDescription="Premium PDLC smart film installation in Dubai. Instant privacy control with energy-efficient switchable glass technology. 500+ installations across UAE."
        structuredData={pdlcSchema}
      />
      <div className="min-h-screen">
        <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradientBackground variant="hero" className="z-0" />
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
            <EnhancedScrollAnimation animation="bounceIn">
              <Badge variant="outline" className="mb-6 px-6 py-2 border-winmax-orange text-winmax-orange">
                PDLC Smart Technology
              </Badge>
            </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="slideInRotate" delay={200}>
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              PDLC Smart Film
              <span className="block bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">
                Switchable Glass
              </span>
            </h1>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="fadeInUp" delay={400}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              PDLC (Polymer Dispersed Liquid Crystal) Smart Film is an advanced glass technology that allows you to 
              <span className="text-winmax-orange font-semibold"> instantly change the transparency of glass</span> at the touch of a button or via smart automation.
            </p>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="zoomIn" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light shadow-glow hover:shadow-neon transition-all duration-500 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://winmaxgulf.com/contact-us/', '_blank')}
              >
                Contact Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/20 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://wa.me/+97142713101?text=Hello%20I%20want%20to%20know%20about%20your%20PDLC%20services', '_blank')}
              >
                Enquire Now
              </Button>
            </div>
          </EnhancedScrollAnimation>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Perfect Privacy 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> Solution</span>
            </h2>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <EnhancedScrollAnimation animation="fadeInLeft">
              <GlassmorphismCard intensity="medium" className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-xl font-semibold">Power ON</span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Glass becomes <span className="text-winmax-orange font-semibold">fully transparent</span> – people can see through clearly.
                  </p>
                </div>
              </GlassmorphismCard>
            </EnhancedScrollAnimation>

            <EnhancedScrollAnimation animation="fadeInRight" delay={200}>
              <GlassmorphismCard intensity="medium" className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-xl font-semibold">Power OFF</span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Glass becomes <span className="text-winmax-orange font-semibold">milky white opaque</span> – visibility is completely blocked.
                  </p>
                </div>
              </GlassmorphismCard>
            </EnhancedScrollAnimation>
          </div>

          <EnhancedScrollAnimation animation="fadeInUp" delay={400}>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <GlassmorphismCard intensity="light" className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-winmax-orange">Effortless Transition</h3>
                <p className="text-muted-foreground">Switch modes instantly.</p>
              </GlassmorphismCard>
              <GlassmorphismCard intensity="light" className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-winmax-orange">Light Diffusion</h3>
                <p className="text-muted-foreground">Opaque mode still allows light into the space without compromising privacy.</p>
              </GlassmorphismCard>
              <GlassmorphismCard intensity="light" className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-winmax-orange">Visual Appeal</h3>
                <p className="text-muted-foreground">Creates a modern and elegant look for interiors.</p>
              </GlassmorphismCard>
            </div>
          </EnhancedScrollAnimation>

          <EnhancedScrollAnimation animation="bounceIn" delay={600}>
            <GlassmorphismCard intensity="medium" className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Additional Advantages</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <Sun className="h-6 w-6 text-winmax-orange" />
                  <div>
                    <h4 className="font-semibold">Blocks UV & IR</h4>
                    <p className="text-muted-foreground text-sm">Protects interiors from harmful rays, reducing fading and heat buildup.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="h-6 w-6 text-winmax-orange" />
                  <div>
                    <h4 className="font-semibold">Sound Insulation</h4>
                    <p className="text-muted-foreground text-sm">Improves soundproofing for a quieter environment.</p>
                  </div>
                </div>
              </div>
            </GlassmorphismCard>
          </EnhancedScrollAnimation>
        </div>
      </section>

      {/* Control Methods Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Control Your Smart Film in 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> Multiple Ways</span>
            </h2>
          </EnhancedScrollAnimation>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {controlMethods.map((method, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="zoomIn"
                delay={index * 100}
                className="h-full"
              >
                <Interactive3DCard intensity={15} glowEffect className="h-full">
                  <GlassmorphismCard intensity="medium" className="p-6 h-full min-h-[280px] hover:shadow-glow transition-all duration-500 flex flex-col">
                    <div className="text-center flex flex-col flex-1 justify-between">
                      <div>
                        <div className="mb-4 inline-flex p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg">
                          <method.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{method.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{method.description}</p>
                    </div>
                  </GlassmorphismCard>
                </Interactive3DCard>
              </EnhancedScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Perfect for 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">Every Space</span>
            </h2>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="fadeInUp"
                delay={index * 150}
              >
                <GlassmorphismCard intensity="medium" className="p-6 h-full hover:shadow-glow transition-all duration-500">
                  <h3 className="text-xl font-bold mb-3 text-winmax-orange">{app.category}</h3>
                  <p className="text-muted-foreground">{app.details}</p>
                </GlassmorphismCard>
              </EnhancedScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Benefits of 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">PDLC Smart Film</span>
            </h2>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="fadeInUp"
                delay={index * 150}
              >
                <Interactive3DCard intensity={15}>
                  <GlassmorphismCard intensity="medium" className="p-6 text-center h-full hover:shadow-glow transition-all duration-500">
                    <div className="mb-4 inline-flex p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </GlassmorphismCard>
                </Interactive3DCard>
              </EnhancedScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose Us for 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">PDLC Smart Film?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer complete solutions, from consultation to installation
            </p>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              "On-site assessment & design consultation",
              "Custom-cut film to fit your glass panels", 
              "Professional installation and setup",
              "Integration with smart home or office systems"
            ].map((feature, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="fadeInUp"
                delay={index * 100}
              >
                <GlassmorphismCard intensity="light" className="p-6 text-center">
                  <div className="w-3 h-3 bg-winmax-orange rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">{feature}</p>
                </GlassmorphismCard>
              </EnhancedScrollAnimation>
            ))}
          </div>

          <EnhancedScrollAnimation animation="zoomIn" delay={400}>
            <div className="text-center">
              <GlassmorphismCard intensity="medium" className="inline-block p-8 mx-auto">
                <h3 className="text-2xl font-bold mb-6">Ready to Transform Your Space?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light shadow-glow hover:shadow-neon transition-all duration-500 px-8 py-4 font-semibold"
                    onClick={() => window.open('https://winmaxgulf.com/contact-us/', '_blank')}
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/20 px-8 py-4 font-semibold"
                    onClick={() => window.open('https://wa.me/+97142713101?text=Hello%20I%20want%20to%20know%20about%20your%20PDLC%20services', '_blank')}
                  >
                    WhatsApp Us
                  </Button>
                </div>
              </GlassmorphismCard>
            </div>
          </EnhancedScrollAnimation>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default PDLC;