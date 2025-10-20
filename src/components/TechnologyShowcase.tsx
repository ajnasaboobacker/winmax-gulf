import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Cpu, Wifi, ArrowRight, Play } from "lucide-react";

const TechnologyShowcase = () => {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);

  const technologies = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "PDLC Smart Glass",
      subtitle: "Privacy on Demand",
      features: ["Instant Opacity Control", "Energy Efficient", "UV Protection", "Sound Dampening"],
      gradient: "from-winmax-orange to-winmax-orange-light",
      bgColor: "bg-winmax-orange/10"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "LED Display Systems",
      subtitle: "Visual Communication",
      features: ["Ultra HD Resolution", "Weather Resistant", "Remote Control", "Custom Sizes"],
      gradient: "from-winmax-orange to-winmax-orange-light",
      bgColor: "bg-winmax-orange/10"
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Smart Integration",
      subtitle: "IoT Connected",
      features: ["Mobile App Control", "Voice Commands", "Automated Scheduling", "Real-time Monitoring"],
      gradient: "from-winmax-orange to-winmax-orange-light",
      bgColor: "bg-winmax-orange/10"
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "Wireless Solutions",
      subtitle: "Seamless Control",
      features: ["WiFi Enabled", "Cloud Management", "Multi-device Sync", "Remote Support"],
      gradient: "from-winmax-orange to-winmax-orange-light",
      bgColor: "bg-winmax-orange/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-winmax-orange/20 text-winmax-orange border-winmax-orange/30">
            Technology Innovation
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Advanced Smart Technology Solutions
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-6">
            Discover how our advanced technologies transform residential and commercial spaces with intelligent automation, seamless integration, and cutting-edge innovation. Our smart solutions deliver enhanced privacy control, superior visual communication, and immersive entertainment experiences tailored to your unique requirements.
          </p>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            From automated PDLC smart glass systems to ultra-high-definition LED displays and complete DJ club installations, we provide comprehensive technology solutions backed by expert installation, training, and ongoing technical support throughout Dubai and the UAE.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {technologies.map((tech, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 border-border/50 hover:border-opacity-70 ${
                hoveredTech === index ? 'shadow-2xl transform scale-105' : 'hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Tech Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${tech.gradient} mb-4 text-white self-start transform transition-all duration-300 ${
                  hoveredTech === index ? 'scale-110 rotate-6' : 'group-hover:scale-105'
                }`}>
                  {tech.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-winmax-orange transition-colors">
                    {tech.title}
                  </h3>
                  <h4 className="text-sm text-foreground/70 mb-4 font-medium">
                    {tech.subtitle}
                  </h4>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {tech.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className={`text-sm text-foreground/80 flex items-center transition-all duration-300 ${
                          hoveredTech === index ? 'translate-x-2' : ''
                        }`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.gradient} mr-3 ${
                          hoveredTech === index ? 'animate-pulse' : ''
                        }`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`w-full justify-between group-hover:bg-gradient-to-r group-hover:${tech.gradient} group-hover:text-white transition-all duration-300`}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="relative bg-gradient-to-r from-card to-secondary/20 rounded-2xl p-8 border border-border/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Experience Our Technology Live
            </h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Experience live demonstrations of our PDLC smart glass technology, LED display systems, and DJ club solutions. Book a personalized consultation with our technology experts to see how our innovative solutions can transform your residential, commercial, or entertainment space with enhanced functionality, aesthetic appeal, and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light hover:scale-105 hover:shadow-lg transition-all duration-300 group"
                onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20see%20a%20live%20demo%20of%20your%20technology', '_blank')}
              >
                Book Live Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-winmax-orange text-winmax-orange hover:bg-winmax-orange hover:text-white hover:scale-105 transition-all duration-300 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                Watch Videos
              </Button>
            </div>
          </div>

          {/* Floating Background Elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-winmax-orange/20 to-winmax-orange-light/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-winmax-orange/20 to-winmax-orange-light/20 rounded-full animate-bounce-gentle"></div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;