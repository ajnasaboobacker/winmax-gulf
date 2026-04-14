import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/banners/hero-smart-technology.jpg";
import ledImage from "@/assets/images/led-display.png";
import djImage from "@/assets/banners/DJ-hero-Banner.jpg";
import solarImage from "@/assets/banners/solar-solutions-banner.png";
import collabImage from "@/assets/banners/collaboration-av-banner.png";
import automationImage from "@/assets/banners/smart-automation-banner.png";
import ParticleBackground from "./ParticleBackground";
import EnhancedScrollAnimation from "./EnhancedScrollAnimations";
import DemoSelectionModal from "./DemoSelectionModal";
import { trackCTAClick, trackButtonClick, trackOutboundLink, trackModalOpen } from "@/hooks/useGATracking";

const Hero = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    { src: heroImage, alt: "Precision PDLC Smart Glass Technology", title: "PDLC Smart Glass", objectPosition: "left" },
    { src: ledImage, alt: "High-Pitch Modular LED Display Systems", title: "LED Displays", objectPosition: "center" },
    { src: djImage, alt: "Turnkey DJ & Club Audio-Visual Solutions", title: "DJ / Pro-AV", objectPosition: "center" },
    { src: solarImage, alt: "Sustainable PV Solar Energy Infrastructure", title: "Solar Systems", objectPosition: "left" },
    { src: collabImage, alt: "Unified Collaboration AV & Smart Boardrooms", title: "Collaboration AV", objectPosition: "right" },
    { src: automationImage, alt: "Integrated Building Automation (BMS & IoT)", title: "Smart Automation", objectPosition: "right" }
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
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: image.objectPosition }}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent"></div>
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                    ? 'bg-winmax-orange scale-110'
                    : 'bg-white/50 hover:bg-white/70'
                  }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View ${heroImages[index].title}`}
              />
            ))}
          </div>
        </div>


        {/* Minimal Floating Elements */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-20 right-20 w-12 h-12 bg-winmax-orange/20 rounded-full animate-pulse hidden lg:block"></div>
          <div className="absolute bottom-40 right-40 w-8 h-8 bg-winmax-orange/15 rounded-full animate-bounce [animation-delay:2s] hidden lg:block"></div>
          <div className="absolute top-1/2 right-10 w-6 h-6 bg-winmax-orange/10 rounded-full animate-pulse [animation-delay:1s] hidden lg:block"></div>
          <div className="absolute top-40 left-20 w-10 h-10 bg-winmax-orange/15 rounded-full animate-bounce hidden lg:block"></div>
        </div>

        <div className="w-full px-8 md:px-16 lg:px-24 relative z-30">
          <EnhancedScrollAnimation animation="bounceIn" delay={200}>
            <div className="max-w-3xl py-20 lg:py-32">

              {/* Badge */}
              <div className="inline-flex items-center px-5 py-2 rounded-full mb-6 bg-black/40 backdrop-blur-md border border-winmax-orange/30 shadow-lg">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-winmax-orange shadow-black drop-shadow-md">✨ Innovative Technology Solutions</span>
              </div>

              {/* Main Heading */}
              <EnhancedScrollAnimation animation="slideInRotate" delay={400}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[0.95] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                  WinmaxGulf — Smart <br />
                  <span className="text-winmax-orange drop-shadow-[0_0_15px_rgba(255,90,0,0.4)]">Technology Solutions</span> UAE.
                </h1>
              </EnhancedScrollAnimation>

              {/* Subheading in Protective Glass */}
              <EnhancedScrollAnimation animation="fadeInUp" delay={600}>
                <div className="p-6 md:p-8 rounded-3xl bg-black/50 backdrop-blur-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-winmax-orange transition-all duration-300 group-hover:w-2.5" />
                  <h2 className="text-base md:text-lg text-white mb-4 leading-relaxed font-semibold tracking-tight drop-shadow-lg">
                    Leading UAE provider of <a href="/#services" className="text-winmax-orange hover:text-white transition-colors">PDLC smart glass</a>, <a href="/#services" className="text-winmax-orange hover:text-white transition-colors">LED display systems</a>, professional <a href="/#services" className="text-winmax-orange hover:text-white transition-colors">DJ solutions</a>, sustainable <a href="/#services" className="text-winmax-orange hover:text-white transition-colors">PV solar energy</a>, <a href="/#services" className="text-winmax-orange hover:text-white transition-colors">collaboration AV</a>, and integrated <a href="/#services" className="text-winmax-orange hover:text-white transition-colors">smart automation</a> architecture.
                  </h2>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed font-light tracking-wide text-left">
                    Enhance privacy, visual communication, and energy independence with our innovative <strong>smart technology solutions</strong> in the <strong>UAE</strong>. We deliver complete end-to-end services including <a href="/#process" className="text-winmax-orange hover:underline">technical consultation</a>, custom design, professional installation, and maintenance. Our <a href="/#about" className="text-winmax-orange hover:underline">expert engineering team</a> has completed over 1,000 successful technical installations bridging physical architecture and digital innovation.
                  </p>
                </div>
              </EnhancedScrollAnimation>

              {/* CTA Buttons */}
              <EnhancedScrollAnimation animation="fadeInUp" delay={800}>
                <div className="flex flex-col sm:flex-row gap-6 mb-16">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light hover:opacity-90 px-12 py-6 text-xl font-semibold transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                    onClick={() => {
                      trackCTAClick('Get Started Today', 'hero');
                      trackOutboundLink('whatsapp_hero');
                      window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20services', '_blank');
                    }}
                    aria-label="Get started with WinmaxGulf today"
                  >
                    Get Started Today
                    <ArrowRight className="ml-3 h-6 w-6" aria-hidden="true" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-winmax-orange text-winmax-orange hover:bg-winmax-orange/10 backdrop-blur-sm px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 hover:border-winmax-orange/60"
                    onClick={() => {
                      trackButtonClick('Watch Demo', 'hero');
                      trackModalOpen('demo_selection');
                      setShowDemoModal(true);
                    }}
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