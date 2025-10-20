import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEOHead = ({
  title = "WinmaxGulf - Smart Technology Solutions UAE",
  description = "Leading UAE provider of PDLC smart film, LED displays & DJ solutions. 500+ successful installations in Dubai.",
  keywords = "PDLC smart film UAE, LED displays Dubai, DJ club solutions, smart glass technology, interactive displays, privacy glass, electronic switchable glass, digital signage UAE",
  ogTitle = "WinmaxGulf - Smart Technology Solutions UAE",
  ogDescription = "Leading UAE provider of PDLC smart film, LED displays & DJ solutions. 500+ successful installations.",
  ogImage = "/favicon.png",
  structuredData
}: SEOHeadProps) => {

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph tags
    updateMetaTag('og:title', ogTitle, 'property');
    updateMetaTag('og:description', ogDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', window.location.href, 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle);
    updateMetaTag('twitter:description', ogDescription);
    updateMetaTag('twitter:image', ogImage);

    // Add canonical URL
    updateLinkTag('canonical', window.location.href);

    // Add structured data
    if (structuredData) {
      addStructuredData(structuredData);
    } else {
      // Default structured data
      const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "WinmaxGulf",
        "description": "Leading UAE provider of PDLC smart film, LED display systems, and DJ club solutions",
        "url": "https://winmaxgulf.com",
        "logo": window.location.origin + "/favicon.png",
        "image": window.location.origin + "/favicon.png",
        "telephone": "+971527200466",
        "email": "info@winmaxgulf.com",
        "priceRange": "$$",
        "foundingDate": "2015",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+971527200466",
          "contactType": "sales",
          "areaServed": "AE",
          "availableLanguage": ["en", "ar"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AE",
          "addressRegion": "Dubai",
          "addressLocality": "Dubai"
        },
        "sameAs": [
          "https://www.instagram.com/winmaxgulf",
          "https://www.linkedin.com/company/winmaxgulf",
          "https://www.facebook.com/winmaxgulf",
          "https://twitter.com/winmaxgulf",
          "https://www.youtube.com/@winmaxgulf"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Smart Technology Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PDLC Smart Film Installation",
                "description": "Privacy glass and switchable smart film solutions"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "LED Display Systems",
                "description": "High-quality LED displays for commercial and retail spaces"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "DJ Club Solutions",
                "description": "Turnkey DJ equipment and club setup services"
              }
            }
          ]
        }
      };
      addStructuredData(defaultStructuredData);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, structuredData]);

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    if (element) {
      element.content = content;
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      element.content = content;
      document.head.appendChild(element);
    }
  };

  const updateLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (element) {
      element.href = href;
    } else {
      element = document.createElement('link');
      element.rel = rel;
      element.href = href;
      document.head.appendChild(element);
    }
  };

  const addStructuredData = (data: object) => {
    // Remove existing structured data
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  return null; // This component doesn't render anything
};

export default SEOHead;