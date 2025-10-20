import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Monitor, Music, Info } from "lucide-react";
import pdlcBanner from "@/assets/pdlc-banner.jpg";
import ledBanner from "@/assets/led-banner.jpg";
import djBanner from "@/assets/dj-banner.jpg";
import ScrollAnimation from "./ScrollAnimations";
import AnimatedIcon from "./AnimatedIcon";
import { InteractiveCard, MicroInteractionButton } from "./Microinteractions";
import EnhancedScrollAnimation from "./EnhancedScrollAnimations";
import GlassmorphismCard from "./GlassmorphismCard";
import Interactive3DCard from "./Interactive3DCard";
import AnimatedGradientBackground from "./AnimatedGradientBackground";
import ServiceDetailModal from "./ServiceDetailModal";
import PDLCInfoModal from "./PDLCInfoModal";
import LEDDisplayModal from "./LEDDisplayModal";
import DJClubModal from "./DJClubModal";

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPDLCInfoOpen, setIsPDLCInfoOpen] = useState(false);
  const [isLEDDisplayOpen, setIsLEDDisplayOpen] = useState(false);
  const [isDJClubOpen, setIsDJClubOpen] = useState(false);

  const services = [
    {
      icon: Eye,
      title: "PDLC Smart Film",
      description: "Switchable glass film for privacy on demand. Suitable for homes, offices, hospitals, and commercial interiors.",
      image: pdlcBanner,
      features: ["Instant Privacy Control", "Energy Efficient", "Easy Installation", "Durable & Long-lasting"],
      link: "https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20PDLC%20services",
      detailedInfo: {
        fullTitle: "PDLC Smart Film (Switchable Glass/Film)",
        whatIs: "PDLC (Polymer Dispersed Liquid Crystal) Smart Film is an advanced glass technology that allows you to instantly change the transparency of glass at the touch of a button or via smart automation. When powered ON, the film becomes clear and transparent, allowing natural light to pass through. When powered OFF, the film turns opaque, providing complete privacy while still allowing light diffusion.",
        features: [
          "Instant privacy control at the touch of a button",
          "Energy efficient - reduces heat and glare",
          "Easy installation on existing glass",
          "Durable and long-lasting technology",
          "Smart automation compatibility",
          "Maintains natural light diffusion when opaque"
        ],
        perfectFor: [
          { category: "Offices", details: "Boardrooms, meeting rooms, and private workspaces" },
          { category: "Residential Spaces", details: "Bedrooms, bathrooms, and living rooms" },
          { category: "Healthcare", details: "Patient rooms and consultation areas" },
          { category: "Retail", details: "Display windows and store interiors" }
        ]
      }
    },
    {
      icon: Monitor,
      title: "LED Display Systems",
      description: "High-quality indoor and outdoor LED displays for events, advertising, and architectural applications.",
      image: ledBanner,
      features: ["Ultra HD Resolution", "Weather Resistant", "Custom Configurations", "Professional Installation"],
      link: "https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20LED%20DISPLAY%20services",
      detailedInfo: {
        fullTitle: "LED Display Systems (Indoor & Outdoor)",
        whatIs: "WinmaxGulf is a premier provider of turnkey solutions for DJ nightclubs and entertainment venues. We specialize in the supply, installation, and integration of state-of-the-art sound, lighting, video, rigging, and special effects systems. From conceptual design and 3D visualization to final execution and handover, we create immersive nightlife experiences that match international standards.\n\nWith a team of expert engineers, designers, and technicians, and partnerships with leading global brands, WinmaxGulf ensures every nightclub we deliver is optimized for sound quality, lighting brilliance, and visual impact, creating unforgettable moments for your guests.",
        features: [
          "Ultra HD 4K+ resolution capabilities",
          "Weather-resistant outdoor models",
          "Custom size configurations",
          "Energy-efficient LED technology",
          "Remote content management",
          "Professional installation and support"
        ],
        perfectFor: [
          { category: "Events & Exhibitions", details: "Trade shows, conferences, and live events" },
          { category: "Retail & Advertising", details: "Storefronts, shopping malls, and digital billboards" },
          { category: "Entertainment Venues", details: "Theaters, clubs, and concert halls" },
          { category: "Corporate Spaces", details: "Lobbies, presentation rooms, and digital signage" }
        ]
      }
    },
    {
      icon: Music,
      title: "DJ Club Solutions",
      description: "Complete turnkey DJ club setups with immersive audio-visual experiences and interactive installations.",
      image: djBanner,
      features: ["Professional Sound Systems", "Interactive Lighting", "Turnkey Solutions", "Custom Design"],
      link: "https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20DJSOLUTION%20services",
      detailedInfo: {
        fullTitle: "DJ Club Solutions (Complete Entertainment Systems)",
        whatIs: "Our DJ Club Solutions provide complete turnkey entertainment systems designed to create immersive audio-visual experiences. We integrate professional-grade sound systems, dynamic lighting, interactive installations, and custom design elements to transform any space into an world-class entertainment venue.",
        features: [
          "Professional-grade sound systems with crystal-clear audio",
          "Interactive lighting synchronized with music",
          "Custom booth and stage design",
          "Advanced mixing and DJ equipment",
          "Immersive visual effects and projections",
          "Complete turnkey installation and setup"
        ],
        perfectFor: [
          { category: "Nightclubs & Bars", details: "Complete club transformations with premium sound and lighting" },
          { category: "Event Venues", details: "Wedding halls, party venues, and event spaces" },
          { category: "Private Spaces", details: "Home entertainment rooms and private clubs" },
          { category: "Commercial Venues", details: "Restaurants, lounges, and hospitality spaces" }
        ]
      }
    }
  ];

  const handleKnowMore = (service: any) => {
    setSelectedService({
      ...service,
      ...service.detailedInfo,
      image: service.image,
      link: service.link
    });
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <AnimatedGradientBackground variant="section" className="z-0" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <EnhancedScrollAnimation animation="bounceIn" className="text-center mb-16">
          <GlassmorphismCard intensity="medium" glow className="inline-flex items-center px-6 py-3 rounded-full mb-6">
            <span className="text-sm font-medium text-winmax-orange">🚀 Our Services</span>
          </GlassmorphismCard>
          
          <EnhancedScrollAnimation animation="slideInRotate" delay={200}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our Technology Solutions
            </h2>
          </EnhancedScrollAnimation>
          
          <EnhancedScrollAnimation animation="fadeInUp" delay={400}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We deliver complete product and project services, covering design, project assistance, training, ongoing maintenance, and 
              <span className="text-winmax-orange font-semibold"> expert technical support to ensure customer success.</span>
            </p>
          </EnhancedScrollAnimation>
        </EnhancedScrollAnimation>

        {/* Enhanced Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <EnhancedScrollAnimation 
              key={index}
              animation="zoomIn"
              delay={index * 200}
            >
              <Interactive3DCard intensity={20} glowEffect>
                <GlassmorphismCard 
                  intensity="medium" 
                  glow 
                  className="overflow-hidden group hover:scale-105 transition-all duration-700 h-full min-h-[600px] flex flex-col"
                >
              <div className="relative h-48 overflow-hidden">
                <LazyImage 
                  src={service.image}
                  alt={`${service.title} - WinmaxGulf Smart Technology Solutions UAE`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  skeletonClassName="h-48"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-winmax-orange/10 to-winmax-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <AnimatedIcon 
                    icon={service.icon}
                    className="p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg text-white shadow-neon"
                    hoverEffect="glow"
                    delay={index * 100}
                  />
                </div>
              </div>
              
              <CardContent className="p-6 relative flex-grow flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-winmax-orange/5 to-winmax-orange/2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                   <h3 
                    className={`text-xl font-bold mb-3 group-hover:text-winmax-orange transition-colors duration-300 ${
                      service.title === "PDLC Smart Film" || service.title === "LED Display Systems" || service.title === "DJ Club Solutions" ? "cursor-pointer hover:underline" : ""
                    }`}
                    onClick={() => {
                      if (service.title === "PDLC Smart Film") {
                        navigate('/pdlc');
                      } else if (service.title === "LED Display Systems") {
                        navigate('/led-display');
                      } else if (service.title === "DJ Club Solutions") {
                        navigate('/dj-club-solutions');
                      }
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm group/feature hover:text-winmax-orange transition-colors">
                        <div className="w-2 h-2 bg-winmax-orange rounded-full mr-3 group-hover/feature:scale-125 transition-transform"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 py-3 px-4 border-winmax-orange/50 text-winmax-orange hover:bg-winmax-orange/10 font-semibold text-sm tracking-wide rounded-lg h-auto"
                      onClick={() => handleKnowMore(service)}
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Know More
                    </Button>
                    <Interactive3DCard intensity={10} className="flex-1">
                      <MicroInteractionButton 
                        className="w-full py-3 px-4 bg-gradient-to-r from-winmax-orange to-winmax-orange-light shadow-glow hover:shadow-neon transition-all duration-500 font-semibold text-sm tracking-wide rounded-lg flex items-center justify-center h-auto"
                        onClick={() => window.open(service.link, '_blank')}
                      >
                        <span className="flex items-center gap-2">
                          Enquire Now
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform animate-bounce-gentle" />
                        </span>
                      </MicroInteractionButton>
                    </Interactive3DCard>
                  </div>
                </div>
              </CardContent>
                </GlassmorphismCard>
              </Interactive3DCard>
            </EnhancedScrollAnimation>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <EnhancedScrollAnimation animation="bounceIn" delay={600}>
          <div className="text-center mt-16">
            <GlassmorphismCard intensity="light" className="inline-block p-8 mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                Need a <span className="text-winmax-orange font-semibold">custom solution</span>? We're here to help.
              </p>
              <Interactive3DCard intensity={15} glowEffect>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/20 transition-all duration-500 px-8 py-3 font-semibold hover:scale-105 hover:shadow-glow"
                  onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20custom%20solutions', '_blank')}
                >
                  Get Custom Quote ✨
                </Button>
              </Interactive3DCard>
            </GlassmorphismCard>
          </div>
        </EnhancedScrollAnimation>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
        />
      )}

      {/* PDLC Info Modal */}
      <PDLCInfoModal
        isOpen={isPDLCInfoOpen}
        onClose={() => setIsPDLCInfoOpen(false)}
      />

      {/* LED Display Modal */}
      <LEDDisplayModal
        isOpen={isLEDDisplayOpen}
        onClose={() => setIsLEDDisplayOpen(false)}
      />

      {/* DJ Club Modal */}
      <DJClubModal
        isOpen={isDJClubOpen}
        onClose={() => setIsDJClubOpen(false)}
      />
    </section>
  );
};

export default Services;