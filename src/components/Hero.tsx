import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-smart-technology.jpg";
import ledImage from "@/assets/led-display.jpg";
import djImage from "@/assets/dj-club.jpg";
import { LazyImage } from "@/components/LazyImage";
import ScrollAnimation from "./ScrollAnimations";
import { MicroInteractionButton } from "./Microinteractions";
import ParticleBackground from "./ParticleBackground";
import FloatingElements from "./FloatingElements";
import AnimatedGradientBackground from "./AnimatedGradientBackground";
import EnhancedScrollAnimation from "./EnhancedScrollAnimations";
import GlassmorphismCard from "./GlassmorphismCard";
import Interactive3DCard from "./Interactive3DCard";
import DemoSelectionModal from "./DemoSelectionModal";

const Hero = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    { src: heroImage, alt: "PDLC Smart Film Technology", title: "PDLC Smart Film" },
    { src: ledImage, alt: "LED Display Systems", title: "LED Display Systems" },
    { src: djImage, alt: "DJ Club Solutions", title: "DJ Club Solutions" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);
  return (
    <main>
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden -mt-24 pt-24 bg-black" role="banner">
      {/* Rotating Background Banner */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
            {/* Technology Title Overlay */}
            <div className="absolute top-8 right-8 z-10">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-winmax-orange/30">
                <span className="text-sm font-medium text-winmax-orange">{image.title}</span>
              </div>
            </div>
          </div>
        ))}
        
         {/* Banner Indicators */}
         <div className="absolute bottom-20 right-8 z-10 flex space-x-2">
           {heroImages.map((_, index) => (
             <button
               key={index}
               className={`w-3 h-3 rounded-full transition-all duration-300 ${
                 index === currentImageIndex 
                   ? 'bg-winmax-orange scale-110' 
                   : 'bg-white/50 hover:bg-white/70'
               }`}
               onClick={() => setCurrentImageIndex(index)}
               aria-label={`View ${heroImages[index].title}`}
             />
           ))}
         </div>
      </div>

      {/* Subtle Particle Background */}
      <ParticleBackground className="z-10 opacity-20" density={40} />
      
      {/* Minimal Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-20 right-20 w-12 h-12 bg-winmax-orange/20 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-40 right-40 w-8 h-8 bg-winmax-orange/15 rounded-full animate-bounce [animation-delay:2s] hidden lg:block"></div>
        <div className="absolute top-1/2 right-10 w-6 h-6 bg-winmax-orange/10 rounded-full animate-pulse [animation-delay:1s] hidden lg:block"></div>
        <div className="absolute top-40 left-20 w-10 h-10 bg-winmax-orange/15 rounded-full animate-bounce hidden lg:block"></div>
      </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-30">
          <EnhancedScrollAnimation animation="bounceIn" delay={200}>
            <div className="max-w-7xl mx-auto py-20 lg:py-32 overflow-visible">
           {/* Badge */}
           <div className="inline-flex items-center px-8 py-4 rounded-full mb-8 bg-black/50 backdrop-blur-md border border-winmax-orange/30 shadow-lg">
             <span className="text-base font-medium text-winmax-orange">✨ Innovative Technology Solutions</span>
           </div>

           {/* Main Heading */}
           <EnhancedScrollAnimation animation="slideInRotate" delay={400}>
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 leading-[1.2] tracking-tight pb-4 bg-gradient-to-r from-white via-winmax-orange to-white bg-clip-text text-transparent">
               WinmaxGulf - Smart Technology Solutions UAE
             </h1>
           </EnhancedScrollAnimation>

           {/* Subheading */}
           <EnhancedScrollAnimation animation="fadeInUp" delay={600}>
             <div className="max-w-4xl">
               <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 leading-relaxed font-light">
                 Leading UAE provider of <a href="/#services" className="text-winmax-orange hover:underline">PDLC smart film</a>, <a href="/#services" className="text-winmax-orange hover:underline">LED display systems</a>, and turnkey <a href="/#services" className="text-winmax-orange hover:underline">DJ club solutions</a> transforming residential, commercial, and corporate environments across Dubai and Abu Dhabi.
               </h2>
               <p className="text-lg md:text-xl mb-12">
                 Enhance privacy, visual communication, and create immersive experiences with our innovative <strong>smart technology solutions</strong> in the <strong>UAE</strong>. We deliver complete end-to-end services including <a href="/#process" className="text-winmax-orange hover:underline">consultation</a>, design, professional installation, comprehensive training, ongoing maintenance, and expert technical support to ensure customer success. Our <a href="/#about" className="text-winmax-orange hover:underline">experienced team</a> has completed over 500 successful installations throughout Dubai, Abu Dhabi, and the wider UAE region, making us a trusted partner for smart technology solutions in the Middle East.
               </p>
             </div>
           </EnhancedScrollAnimation>

           {/* CTA Buttons */}
           <EnhancedScrollAnimation animation="fadeInUp" delay={800}>
             <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light hover:opacity-90 px-12 py-6 text-xl font-semibold transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                  onClick={() => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20services', '_blank')}
                  aria-label="Get started with WinmaxGulf today"
                >
                  Get Started Today
                  <ArrowRight className="ml-3 h-6 w-6" aria-hidden="true" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/10 backdrop-blur-sm px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 hover:border-winmax-orange/60"
                  onClick={() => setShowDemoModal(true)}
                  aria-label="Watch demonstration video"
                >
                 <Play className="mr-3 h-6 w-6" aria-hidden="true" />
                 Watch Demo
               </Button>
             </div>
           </EnhancedScrollAnimation>
         </div>
       </EnhancedScrollAnimation>
      </div>

      {/* Demo Selection Modal */}
      <DemoSelectionModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />

      {/* Scroll Indicator */}
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce cursor-pointer" role="img" aria-label="Scroll down for more">
         <div className="w-6 h-10 border-2 border-winmax-orange rounded-full flex justify-center bg-winmax-orange/10 hover:bg-winmax-orange/20 transition-colors">
           <div className="w-1 h-3 bg-winmax-orange rounded-full mt-2"></div>
         </div>
       </div>
     </section>
    </main>
  );
};

export default Hero;