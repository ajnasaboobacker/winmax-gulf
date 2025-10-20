import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Eye, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Comprehensive Solutions",
      description: "Complete range of technology solutions under one roof"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "End-to-End Service", 
      description: "From consultation to installation and training"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Customer-Centric",
      description: "Innovation, reliability, and customer satisfaction focused"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Proven Expertise",
      description: "Leading UAE provider with years of experience"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-winmax-orange/20 border border-winmax-orange/30 mb-6">
              <span className="text-sm font-medium text-winmax-orange">About Winmax Gulf</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              About WinmaxGulf - Transforming Spaces with Innovation
            </h2>
            
            <p className="text-lg text-foreground/80 mb-8">
              Winmax Gulf is a leading UAE-based provider of advanced technology solutions, specializing in PDLC smart film, LED display systems, and turnkey DJ club solutions. We transform residential, commercial, and corporate environments through innovative products that enhance privacy, visual communication, and interactive user experiences.
            </p>

            {/* Vision & Mission */}
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-winmax-orange/10 border border-winmax-orange/20">
                <h3 className="font-bold text-lg mb-2 text-winmax-orange">Our Vision</h3>
                <p className="text-foreground/80">
                  To be the leading provider of smart and innovative technology solutions that transform environments and elevate everyday experiences across the UAE and beyond.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-winmax-orange/10 border border-winmax-orange/20">
                <h3 className="font-bold text-lg mb-2 text-winmax-orange">Our Mission</h3>
                <p className="text-foreground/80">
                  To deliver high-quality technology solutions that empower businesses, enhance privacy, and create impactful visual experiences through innovation, reliability, and customer-focused service.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="animate-slide-up h-full flex flex-col">
            <div className="grid gap-6 flex-1">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-card to-secondary/10 border-border/50 hover:border-winmax-orange/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg text-primary-foreground flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-winmax-orange transition-colors text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-foreground/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 p-8 rounded-lg bg-winmax-orange/10 border border-winmax-orange/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-winmax-orange mb-2">500+</div>
                  <div className="text-sm text-foreground/80">Successful Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-winmax-orange mb-2">10+</div>
                  <div className="text-sm text-foreground/80">Years in Business</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-winmax-orange mb-2">100%</div>
                  <div className="text-sm text-foreground/80">Quality Assurance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-winmax-orange mb-2">24/7</div>
                  <div className="text-sm text-foreground/80">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;