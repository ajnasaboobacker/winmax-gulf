import { useEffect, useState } from "react";
import { Zap, Cpu, Wifi, Database, Shield, Globe, type LucideProps } from "lucide-react";

interface FloatingElement {
  id: number;
  icon: React.ComponentType<LucideProps>;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  speed: number;
  opacity: number;
}

const ICONS = [Zap, Cpu, Wifi, Database, Shield, Globe];

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const initialElements: FloatingElement[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      speed: Math.random() * 20 + 10,
      opacity: Math.random() * 0.3 + 0.1
    }));

    setElements(initialElements);

    const interval = setInterval(() => {
      setElements(prev => prev.map(element => ({
        ...element,
        rotation: element.rotation + 0.5,
        y: element.y <= -10 ? 110 : element.y - 0.02
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => {
        const Icon = element.icon;
        return (
          <div
            key={element.id}
            className="absolute transition-all duration-100 ease-linear"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `scale(${element.scale}) rotate(${element.rotation}deg)`,
              opacity: element.opacity,
              animationDuration: `${element.speed}s`
            }}
          >
            <Icon 
              className="w-8 h-8 text-winmax-orange/30" 
              style={{
                filter: "drop-shadow(0 0 10px hsl(25 95% 53% / 0.3))"
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingElements;