import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Music, Headphones, Lightbulb, Settings, Users, Camera, Mic, Volume2, Zap, Building, Home, Heart, Store } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import EnhancedScrollAnimation from "@/components/EnhancedScrollAnimations";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import Interactive3DCard from "@/components/Interactive3DCard";
import SEOHead from "@/components/SEOHead";
import djBanner from "@/assets/dj-banner.jpg";
import djClub from "@/assets/dj-club.jpg";

const DJClubSolutions = () => {
  const services = [
    {
      icon: Volume2,
      title: "Professional Sound Systems",
      description: "State-of-the-art audio equipment with crystal-clear sound quality, powerful amplifiers, and precision-tuned acoustics for the ultimate listening experience."
    },
    {
      icon: Lightbulb,
      title: "Dynamic Lighting Systems",
      description: "Interactive lighting synchronized with music, featuring LED arrays, lasers, strobes, and intelligent lighting control systems that create mesmerizing visual experiences."
    },
    {
      icon: Camera,
      title: "Visual Effects & Projections",
      description: "Immersive visual displays including LED walls, projection mapping, video content creation, and special effects that transform spaces into extraordinary experiences."
    },
    {
      icon: Settings,
      title: "DJ Booth & Equipment",
      description: "Custom-designed DJ booths with professional mixing consoles, turntables, CDJs, and all necessary equipment for seamless performances."
    },
    {
      icon: Zap,
      title: "Special Effects Systems",
      description: "Fog machines, haze effects, CO2 cannons, confetti blasters, and pyrotechnics that add excitement and drama to any event."
    },
    {
      icon: Mic,
      title: "Rigging & Installation",
      description: "Professional rigging services for safe installation of lighting, sound, and visual equipment with proper load calculations and safety protocols."
    }
  ];

  const applications = [
    {
      icon: Building,
      title: "Nightclubs & Bars",
      description: "Complete club transformations with premium sound and lighting systems that create unforgettable nightlife experiences."
    },
    {
      icon: Heart,
      title: "Event Venues",
      description: "Wedding halls, party venues, and event spaces equipped with flexible entertainment systems for any celebration."
    },
    {
      icon: Home,
      title: "Private Spaces",
      description: "Home entertainment rooms and private clubs with customized audio-visual installations for intimate gatherings."
    },
    {
      icon: Store,
      title: "Commercial Venues",
      description: "Restaurants, lounges, and hospitality spaces enhanced with ambient entertainment systems that elevate the customer experience."
    }
  ];

  const features = [
    "3D Visualization & Design",
    "Turnkey Project Management",
    "International Standard Equipment",
    "Expert Installation Team",
    "Ongoing Maintenance Support",
    "Custom Design Solutions",
    "Quality Assurance Testing",
    "24/7 Technical Support"
  ];

  const djSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://winmaxgulf.com/dj-club-solutions#service",
        "name": "DJ Club Solutions",
        "description": "Complete turnkey DJ club and entertainment system installations including sound, lighting, visual effects, and DJ equipment.",
        "provider": {
          "@type": "Organization",
          "name": "WinmaxGulf",
          "url": "https://winmaxgulf.com"
        },
        "areaServed": [
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "Saudi Arabia" },
          { "@type": "Country", "name": "Qatar" }
        ],
        "serviceType": "Entertainment System Installation",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "70",
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
            "name": "DJ Club Solutions",
            "item": "https://winmaxgulf.com/dj-club-solutions"
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "DJ Club Services",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Professional Sound Systems" },
          { "@type": "ListItem", "position": 2, "name": "Dynamic Lighting Systems" },
          { "@type": "ListItem", "position": 3, "name": "Visual Effects & Projections" },
          { "@type": "ListItem", "position": 4, "name": "DJ Booth & Equipment" },
          { "@type": "ListItem", "position": 5, "name": "Special Effects Systems" },
          { "@type": "ListItem", "position": 6, "name": "Rigging & Installation" }
        ]
      },
      {
        "@type": "HowTo",
        "name": "DJ Club Installation Process",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Consultation & Design",
            "text": "We understand your vision and create detailed 3D visualizations of your space."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Equipment Selection",
            "text": "Our experts recommend the best equipment from leading global brands."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Installation & Setup",
            "text": "Professional installation by certified technicians with proper safety protocols."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Testing & Handover",
            "text": "Comprehensive system testing, staff training, and ongoing support."
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="DJ Club Solutions UAE | Complete Entertainment Systems Dubai"
        description="Turnkey DJ club solutions in Dubai & UAE. Professional sound systems, dynamic lighting, special effects. Complete nightclub & entertainment venue installations."
        keywords="DJ club solutions Dubai, nightclub setup UAE, DJ equipment Dubai, entertainment systems UAE, club lighting Dubai, sound system installation UAE"
        ogTitle="DJ Club Solutions UAE | Turnkey Entertainment Systems"
        ogDescription="Complete DJ club solutions in Dubai. Professional sound, lighting, and entertainment systems. Turnkey installations for nightclubs & venues across UAE."
        structuredData={djSchema}
      />
      <div className="min-h-screen">
        <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradientBackground variant="hero" className="z-0" />
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${djBanner})` }}
        />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <EnhancedScrollAnimation animation="bounceIn">
            <Badge variant="outline" className="mb-6 px-6 py-2 border-winmax-orange text-winmax-orange">
              Entertainment Solutions
            </Badge>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="slideInRotate" delay={200}>
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              DJ Club
              <span className="block bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="fadeInUp" delay={400}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              <span className="text-winmax-orange font-semibold">Complete Turnkey Entertainment Systems</span>
              <br />
              We provide complete turnkey entertainment systems designed to create immersive audio-visual experiences. We integrate professional-grade sound systems, dynamic lighting, interactive installations, and custom design elements to transform any space into a world-class entertainment venue.
            </p>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="zoomIn" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light shadow-glow hover:shadow-neon transition-all duration-500 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://winmaxgulf.com/contact-us/', '_blank')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/20 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20DJSOLUTION%20services', '_blank')}
              >
                WhatsApp Us
              </Button>
            </div>
          </EnhancedScrollAnimation>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <EnhancedScrollAnimation animation="fadeInLeft">
              <div>
                <Badge variant="outline" className="mb-6 border-winmax-orange text-winmax-orange">
                  Winmax Gulf
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Complete DJ Nightclub 
                  <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> Solutions Provider</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  WinmaxGulf is a premier provider of turnkey solutions for DJ nightclubs and entertainment venues. We specialize in the supply, installation, and integration of state-of-the-art sound, lighting, video, rigging, and special effects systems.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  From conceptual design and 3D visualization to final execution and handover, we create immersive nightlife experiences that match international standards. With a team of expert engineers, designers, and technicians, and partnerships with leading global brands, WinmaxGulf ensures every nightclub we deliver is optimized for sound quality, lighting brilliance, and visual impact, creating unforgettable moments for your guests.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-winmax-orange rounded-full"></div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </EnhancedScrollAnimation>

            <EnhancedScrollAnimation animation="fadeInRight" delay={200}>
              <div className="relative">
                <img 
                  src={djClub}
                  alt="DJ Club Solutions"
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </EnhancedScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive entertainment solutions for every venue type
            </p>
          </EnhancedScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {services.map((service, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="zoomIn"
                delay={index * 100}
                className="flex"
              >
                <Interactive3DCard intensity={15} glowEffect className="h-full">
                  <GlassmorphismCard intensity="medium" className="p-6 w-full min-h-[320px] hover:shadow-glow transition-all duration-500 group flex flex-col">
                    <div className="text-center flex flex-col flex-1 justify-between">
                      <div>
                        <div className="mb-4 inline-flex p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg">
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-3 group-hover:text-winmax-orange transition-colors">{service.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-winmax-orange/50 text-winmax-orange hover:bg-winmax-orange/10"
                        onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20DJSOLUTION%20services', '_blank')}
                      >
                        Learn More
                      </Button>
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
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">Every Venue</span>
            </h2>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="fadeInUp"
                delay={index * 150}
              >
                <GlassmorphismCard intensity="medium" className="p-6 h-full hover:shadow-glow transition-all duration-500 group text-center">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg">
                    <app.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-winmax-orange transition-colors">{app.title}</h3>
                  <p className="text-muted-foreground text-sm">{app.description}</p>
                </GlassmorphismCard>
              </EnhancedScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to completion, we handle every aspect of your entertainment system
            </p>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation & Design",
                description: "We begin with understanding your vision and requirements, then create detailed 3D visualizations of your space."
              },
              {
                step: "02", 
                title: "Equipment Selection",
                description: "Our experts recommend the best equipment from leading global brands that match your venue's needs and budget."
              },
              {
                step: "03",
                title: "Installation & Setup",
                description: "Professional installation by certified technicians with proper rigging, wiring, and safety protocols."
              },
              {
                step: "04",
                title: "Testing & Handover",
                description: "Comprehensive system testing, staff training, and ongoing support to ensure optimal performance."
              }
            ].map((process, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="scaleIn"
                delay={index * 150}
              >
                <GlassmorphismCard intensity="light" className="p-6 text-center h-full">
                  <Badge variant="outline" className="mb-4 border-winmax-orange text-winmax-orange">
                    {process.step}
                  </Badge>
                  <h3 className="text-lg font-bold mb-3">{process.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{process.description}</p>
                </GlassmorphismCard>
              </EnhancedScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="zoomIn">
            <div className="text-center">
              <GlassmorphismCard intensity="medium" className="inline-block p-12 mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Create Your 
                  <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> Dream Venue?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss your entertainment venue requirements and create a customized solution that exceeds your expectations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light shadow-glow hover:shadow-neon transition-all duration-500 px-8 py-4 font-semibold"
                    onClick={() => window.open('https://winmaxgulf.com/contact-us/', '_blank')}
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/20 px-8 py-4 font-semibold"
                    onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20DJSOLUTION%20services', '_blank')}
                  >
                    WhatsApp Now
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

export default DJClubSolutions;