import { useState, useRef, useEffect } from 'react';
import { useImageLoader } from '@/hooks/useImageLoader';
import { Skeleton } from "@/components/ui/skeleton";

const ImageSkeleton = ({ className = "" }: { className?: string }) => (
  <Skeleton className={`rounded-lg ${className}`} />
);

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  skeletonClassName = "",
  fallbackSrc = "/placeholder.svg"
}: LazyImageProps) => {
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const { isLoaded, hasError } = useImageLoader(inView ? src : '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <div ref={imgRef} className="relative">
      {!isLoaded && inView && (
        <ImageSkeleton className={`absolute inset-0 ${skeletonClassName}`} />
      )}
      {inView && (
        <img
          src={imageSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading="lazy"
        />
      )}
      {!inView && (
        <ImageSkeleton className={skeletonClassName} />
      )}
    </div>
  );
};