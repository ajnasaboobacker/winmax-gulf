import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Film, Zap, Music } from "lucide-react";
import VideoDemoModal from "./VideoDemoModal";
import pdlcImage from "@/assets/hero-smart-glass.jpg";
import ledImage from "@/assets/led-display.png";
import djImage from "@/assets/dj-club.jpg";

interface DemoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoSelectionModal = ({ isOpen, onClose }: DemoSelectionModalProps) => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const handleDemoSelect = (demoType: string) => {
    setSelectedDemo(demoType);
  };

  const handleCloseDemo = () => {
    setSelectedDemo(null);
    onClose();
  };

  const demoOptions = [
    {
      id: "pdlc",
      title: "PDLC Smart Film Demo",
      description: "See our privacy glass technology in action",
      icon: Film,
      image: pdlcImage,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "led",
      title: "LED Display Systems",
      description: "High-resolution LED displays for any space",
      icon: Zap,
      image: ledImage,
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: "dj",
      title: "TurnKey DJ Solutions",
      description: "Complete club and entertainment systems",
      icon: Music,
      image: djImage,
      gradient: "from-green-500 to-blue-600"
    }
  ];

  return (
    <>
      {/* Demo Selection Modal */}
      <Dialog open={isOpen && !selectedDemo} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-md border border-winmax-orange/20">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
              Choose a Demo to Watch
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {demoOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="h-auto p-0 flex flex-col overflow-hidden hover:scale-105 transition-all duration-300 border-2 hover:border-winmax-orange group bg-transparent"
                    onClick={() => handleDemoSelect(option.id)}
                  >
                    {/* Image Header */}
                    <div className="relative w-full h-40 overflow-hidden">
                      <img 
                        src={option.image} 
                        alt={option.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                      <div className={`absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r ${option.gradient} text-white shadow-lg`}>
                        <IconComponent size={24} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 text-center space-y-3 flex-1 flex flex-col justify-between min-h-[120px]">
                      <div className="space-y-2">
                        <h3 className="font-bold text-base leading-tight text-foreground group-hover:text-winmax-orange transition-colors">
                          {option.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {option.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-winmax-orange font-medium mt-auto">
                        <Play className="h-3 w-3" />
                        <span className="text-xs font-semibold">Watch Demo</span>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unified Demo Modal mapping */}
      <VideoDemoModal 
        isOpen={selectedDemo === "pdlc"} 
        onClose={handleCloseDemo}
        title="PDLC Smart Film Demo"
        videoUrl="https://www.youtube.com/embed/9L3QFnza5qU?autoplay=1&rel=0" // Reusing available good assets or placeholder
      />
      
      <VideoDemoModal 
        isOpen={selectedDemo === "led"} 
        onClose={handleCloseDemo}
        title="LED Display Systems Demo"
        videoUrl="https://www.youtube.com/embed/BCo2hqvb_vg?autoplay=1&rel=0"
      />
      
      <VideoDemoModal 
        isOpen={selectedDemo === "dj"} 
        onClose={handleCloseDemo}
        title="TurnKey DJ Solutions Demo"
        videoUrl="https://www.youtube.com/embed/9L3QFnza5qU?autoplay=1&rel=0"
      />
    </>
  );
};

export default DemoSelectionModal;