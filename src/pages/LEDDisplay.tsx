import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Monitor, Shield, Globe, Headphones, Building, Store, Calendar, Camera, MapPin, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import EnhancedScrollAnimation from "@/components/EnhancedScrollAnimations";
import GlassmorphismCard from "@/components/GlassmorphismCard";
import Interactive3DCard from "@/components/Interactive3DCard";
import ledBanner from "@/assets/led-banner.jpg";
import ledDisplay from "@/assets/led-display.jpg";

const LEDDisplay = () => {
  const whyChooseUs = [
    {
      icon: Shield,
      number: "01",
      title: "Quality Management",
      description: "We strictly follow the ISO9001 quality management system. All products are strictly controlled and tested from raw material procurement to finished product delivery to ensure that the quality of each product meets industry standards and customer requirements."
    },
    {
      icon: Globe,
      number: "02", 
      title: "Global Distribution",
      description: "We have a strong logistics network that can deliver products quickly and safely to all parts of the world. To ensure safety during transportation, the company uses professional packaging to prevent products from being damaged during transportation."
    },
    {
      icon: Headphones,
      number: "03",
      title: "Remote Technical Support",
      description: "We provide 24×7 hours of remote technical support services, and customers can quickly obtain technical support through telephone, email or online platforms. Whether it is system debugging, control software use, or troubleshooting, the technical team can provide timely solutions."
    },
    {
      icon: Building,
      number: "04",
      title: "Product Application",
      description: "Wide products application of Commercial display, entertainment culture, stage performance, smart city, exhibition display, conference display application scenarios."
    }
  ];

  const ledTypes = [
    {
      title: "Large Outdoor LED Screen",
      description: "High brightness displays perfect for outdoor advertising and large-scale visibility.",
      applications: ["Highway Billboards", "Stadium Displays", "Building Facades", "Event Stages"]
    },
    {
      title: "Indoor LED Video Wall",
      description: "High-resolution indoor displays for premium viewing experiences.",
      applications: ["Shopping Malls", "Corporate Lobbies", "Conference Rooms", "Control Centers"]
    },
    {
      title: "Outdoor LED Billboard",
      description: "Weather-resistant displays designed for continuous outdoor operation.",
      applications: ["Roadside Advertising", "Transit Stations", "Commercial Buildings", "Public Spaces"]
    },
    {
      title: "Flexible LED Screen",
      description: "Bendable and curved LED displays for creative installations.",
      applications: ["Curved Walls", "Cylindrical Displays", "Creative Installations", "Artistic Projects"]
    },
    {
      title: "Interactive LED Display",
      description: "Touch-enabled LED screens for engaging user experiences.",
      applications: ["Retail Stores", "Museums", "Information Kiosks", "Educational Facilities"]
    },
    {
      title: "Transparent LED Screen",
      description: "See-through LED displays that maintain visibility while showcasing content.",
      applications: ["Store Windows", "Glass Facades", "Showrooms", "Modern Offices"]
    },
    {
      title: "Rental LED Screen",
      description: "Portable LED solutions perfect for temporary events and exhibitions.",
      applications: ["Concerts", "Trade Shows", "Conferences", "Temporary Events"]
    },
    {
      title: "Fine Pitch LED Display",
      description: "Ultra-high resolution displays for close viewing distances.",
      applications: ["Control Rooms", "Broadcast Studios", "High-end Retail", "Premium Venues"]
    },
    {
      title: "Stadium LED Display",
      description: "Large-scale displays specifically designed for sports venues and entertainment.",
      applications: ["Sports Stadiums", "Concert Venues", "Arenas", "Entertainment Centers"]
    }
  ];

  const applications = [
    {
      icon: Store,
      title: "Commercial Display",
      description: "Retail stores, shopping centers, and commercial spaces"
    },
    {
      icon: Calendar,
      title: "Entertainment Culture",
      description: "Theaters, clubs, entertainment venues, and cultural centers"
    },
    {
      icon: Camera,
      title: "Stage Performance",
      description: "Concert stages, live performances, and broadcast studios"
    },
    {
      icon: Building,
      title: "Smart City",
      description: "Urban displays, information boards, and city infrastructure"
    },
    {
      icon: MapPin,
      title: "Exhibition Display",
      description: "Trade shows, exhibitions, and promotional events"
    },
    {
      icon: Users,
      title: "Conference Display",
      description: "Meeting rooms, presentation halls, and corporate events"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradientBackground variant="hero" className="z-0" />
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${ledBanner})` }}
        />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
            <EnhancedScrollAnimation animation="bounceIn">
              <Badge variant="outline" className="mb-6 px-6 py-2 border-winmax-orange text-winmax-orange">
                LED Display Technology
              </Badge>
            </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="slideInRotate" delay={200}>
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              LED Advertising
              <span className="block bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">
                Displays
              </span>
            </h1>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="fadeInUp" delay={400}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              <span className="text-winmax-orange font-semibold">Shine Brighter, Advertise Smarter</span>
              <br />
              LED Advertising Displays are high brightness digital screens that showcase dynamic advertisements, promotional content, and brand messaging using vivid visuals and animations. Designed for both indoor and outdoor use, they capture attention and maximize visibility in any environment.
            </p>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="zoomIn" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light shadow-glow hover:shadow-neon transition-all duration-500 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://winmaxgulf.com/contact-us/', '_blank')}
              >
                Get Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/20 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20LED%20DISPLAY%20services', '_blank')}
              >
                WhatsApp Us
              </Button>
            </div>
          </EnhancedScrollAnimation>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> Us</span>
            </h2>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {whyChooseUs.map((item, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="zoomIn"
                delay={index * 150}
                className="h-full"
              >
                <Interactive3DCard intensity={15} glowEffect className="h-full">
                  <GlassmorphismCard intensity="medium" className="p-8 h-full min-h-[240px] hover:shadow-glow transition-all duration-500 flex flex-col">
                    <div className="flex items-start gap-6 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg flex items-center justify-center mb-4">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="border-winmax-orange text-winmax-orange">
                          {item.number}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-winmax-orange">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </GlassmorphismCard>
                </Interactive3DCard>
              </EnhancedScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Types of LED Displays Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Types of 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">LED Advertising Displays</span>
            </h2>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ledTypes.map((type, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="fadeInUp"
                delay={index * 100}
              >
                <Interactive3DCard intensity={10} glowEffect>
                  <GlassmorphismCard intensity="medium" className="p-6 h-full hover:shadow-glow transition-all duration-500 group">
                    <div className="text-center">
                      <div className="mb-4 inline-flex p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg">
                        <Monitor className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-3 group-hover:text-winmax-orange transition-colors">{type.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{type.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-winmax-orange">Perfect For:</h4>
                        <div className="space-y-1">
                          {type.applications.map((app, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-winmax-orange rounded-full mr-2"></div>
                              <span>{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full border-winmax-orange/50 text-winmax-orange hover:bg-winmax-orange/10"
                        onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20LED%20DISPLAY%20services', '_blank')}
                      >
                        Get Quote
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
              Product 
              <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wide range of applications across various industries and scenarios
            </p>
          </EnhancedScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <EnhancedScrollAnimation 
                key={index}
                animation="scaleIn"
                delay={index * 100}
              >
                <GlassmorphismCard intensity="medium" className="p-6 text-center h-full hover:shadow-glow transition-all duration-500 group">
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

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <AnimatedGradientBackground variant="section" className="z-0" />
        
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <EnhancedScrollAnimation animation="fadeInLeft">
              <div>
                <Badge variant="outline" className="mb-6 border-winmax-orange text-winmax-orange">
                  Advanced Technology
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  State-of-the-Art 
                  <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> LED Technology</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our LED displays feature cutting-edge technology with ultra-high brightness, superior color accuracy, and exceptional durability for both indoor and outdoor applications.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Ultra HD 4K+ Resolution",
                    "High Brightness up to 6000 nits",
                    "Wide Viewing Angles (160°)",
                    "Weather Resistant IP65 Rating",
                    "Energy Efficient LED Technology",
                    "Remote Content Management",
                    "24/7 Technical Support"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-winmax-orange rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </EnhancedScrollAnimation>

            <EnhancedScrollAnimation animation="fadeInRight" delay={200}>
              <div className="relative">
                <img 
                  src={ledDisplay}
                  alt="LED Display Technology"
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </EnhancedScrollAnimation>
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
                  Ready to Transform Your 
                  <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> Advertising?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get in touch with our experts to discuss your LED display requirements and receive a customized solution for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light shadow-glow hover:shadow-neon transition-all duration-500 px-8 py-4 font-semibold"
                    onClick={() => window.open('https://winmaxgulf.com/contact-us/', '_blank')}
                  >
                    Request Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/20 px-8 py-4 font-semibold"
                    onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20LED%20DISPLAY%20services', '_blank')}
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
  );
};

export default LEDDisplay;