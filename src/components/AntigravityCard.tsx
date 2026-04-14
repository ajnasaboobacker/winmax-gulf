import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface AntigravityCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
}

const AntigravityCard: React.FC<AntigravityCardProps> = ({ 
  children, 
  className = "", 
  tiltIntensity = 10 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [0, 1], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(springX, [0, 1], [-tiltIntensity, tiltIntensity]);
  
  const percentX = useTransform(springX, v => v * 100);
  const percentY = useTransform(springY, v => v * 100);
  const backgroundTemplate = useMotionTemplate`radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.1), transparent 50%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ y: 50, opacity: 0, rotateX: 20 }}
      whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`perspective-1000 relative ${className}`}
    >
      <div 
        className="glass-heavy rounded-2xl w-full h-full overflow-hidden relative z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Shine effect */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 z-50 pointer-events-none"
            style={{
              background: backgroundTemplate,
            }}
          />
        )}
        {children}
      </div>
      
      {/* Heavy drop shadow directly below for floating effect */}
      <div 
        className="absolute inset-x-4 -bottom-4 h-full bg-black/60 blur-2xl -z-10 rounded-full"
        style={{ transform: "translateZ(-20px)" }}
      />
    </motion.div>
  );
};

export default AntigravityCard;
