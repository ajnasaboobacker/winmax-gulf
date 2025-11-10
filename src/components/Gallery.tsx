import { Card } from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";
import { LazyImage } from "@/components/LazyImage";
import { GallerySkeleton } from "@/components/LoadingStates";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: "https://winmaxgulf.com/wp-content/uploads/elementor/thumbs/full-color-screen-display-led-rental-outdoor-for-stage-500x500-1-raj2sp72j49dfannxli5lyjoo6ltgty5ddyrqf8trs.webp",
      alt: "Full Color Outdoor LED Display Screen Installation for Stage Events Dubai UAE - WinmaxGulf Professional LED Display Systems",
      category: "LED Displays"
    },
    {
      src: "https://winmaxgulf.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-08-02-at-8.31.16-PM-r9p49xdyjdc3cspl0ieotrdi96tptqcpupg2ts35q0.jpeg",
      alt: "Indoor LED Video Wall Installation Dubai - High Resolution Digital Signage by WinmaxGulf UAE",
      category: "LED Displays"
    },
    {
      src: "https://winmaxgulf.com/wp-content/uploads/elementor/thumbs/digital-art-inmersive-exhibition-1-scaled-ramaz8nn6zvhjzysi67e3813jyanr7ary0hou0syvc.jpg",
      alt: "Interactive Digital Art Immersive Exhibition LED Display Installation Dubai - WinmaxGulf Smart Technology Solutions",
      category: "Interactive Installations"
    },
    {
      src: "https://winmaxgulf.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-08-02-at-8.30.32-PM-r9p4a30zodky7n5yrq7daxmal6ybnoxh2gcnrcwqrs.jpeg",
      alt: "PDLC Smart Film Switchable Privacy Glass Installation Dubai Office - WinmaxGulf Smart Technology UAE",
      category: "PDLC Smart Film"
    },
    {
      src: "https://winmaxgulf.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-02-at-8.38.56-PM11111.jpg",
      alt: "PDLC Switchable Smart Film Glass Privacy Control Dubai Commercial Space - WinmaxGulf Installation UAE",
      category: "PDLC Smart Film"
    },
    {
      src: "https://winmaxgulf.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-02-at-8.29.30-PM.jpeg",
      alt: "Professional DJ Club Sound and Lighting System Setup Dubai - Complete Entertainment Solutions by WinmaxGulf UAE",
      category: "DJ Solutions"
    }
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Completed Projects & <span className="text-winmax-orange">Smart Technology Installations</span> in Dubai & UAE
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-4">
              Explore our portfolio of <strong>500+ completed smart technology projects</strong> and see how <a href="/" className="text-winmax-orange hover:underline">WinmaxGulf</a> transforms residential, commercial, and entertainment spaces with innovative <a href="/#services" className="text-winmax-orange hover:underline">PDLC smart film</a>, <a href="/led-display" className="text-winmax-orange hover:underline">LED display systems</a>, and <a href="/dj-club-solutions" className="text-winmax-orange hover:underline">DJ club solutions</a> across <strong>Dubai, Abu Dhabi, and the wider UAE</strong>. From luxury homes and villas to corporate offices, retail spaces, hotels, and nightclubs, our professional installations demonstrate the versatility and transformative impact of cutting-edge smart glass technology and entertainment systems.
            </p>
            <p className="text-lg text-foreground/70 max-w-xl mx-auto">
              Each project showcases our commitment to quality installation, meticulous attention to detail, and dedication to exceeding client expectations with cutting-edge <strong>smart technology solutions in the UAE</strong>. Our experienced team delivers complete end-to-end services from consultation to maintenance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-winmax-orange/20"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative h-64 overflow-hidden">
                  <LazyImage 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    skeletonClassName="h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-winmax-orange/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {image.category}
                    </div>
                    <h3 className="text-white font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.alt}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-winmax-orange transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage}
              alt="WinmaxGulf Smart Technology Installation Project - Dubai UAE"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;