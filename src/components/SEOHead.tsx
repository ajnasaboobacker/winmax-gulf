import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
  pageType?: 'website' | 'article' | 'product' | 'service' | 'organization';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

const SEOHead = ({
  title = "WinmaxGulf - Smart Technology Solutions UAE",
  description = "Leading UAE provider of PDLC smart film, LED displays & DJ solutions. 500+ successful installations in Dubai.",
  keywords = "PDLC smart film UAE, LED displays Dubai, DJ club solutions, smart glass technology, interactive displays, privacy glass, electronic switchable glass, digital signage UAE",
  ogTitle,
  ogDescription,
  ogImage = "/favicon.png",
  canonicalUrl,
  structuredData,
  pageType = 'website',
  publishedTime,
  modifiedTime = "2025-12-22",
  author = "WinmaxGulf",
  noIndex = false
}: SEOHeadProps) => {

  useEffect(() => {
    const baseUrl = "https://winmaxgulf.com";
    const currentPath = window.location.pathname;
    const fullCanonicalUrl = canonicalUrl || `${baseUrl}${currentPath === '/' ? '' : currentPath}`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
    
    // Update document title
    document.title = title;

    // Primary Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('bingbot', 'index, follow');
    
    // GEO Meta Tags for Local SEO
    updateMetaTag('geo.region', 'AE-DU');
    updateMetaTag('geo.placename', 'Dubai');
    updateMetaTag('geo.position', '25.2048;55.2708');
    updateMetaTag('ICBM', '25.2048, 55.2708');
    updateMetaTag('language', 'en');
    updateMetaTag('distribution', 'global');
    updateMetaTag('rating', 'general');
    updateMetaTag('revisit-after', '7 days');
    
    // Business/Contact Meta
    updateMetaTag('contact', 'info@winmaxgulf.com');
    updateMetaTag('reply-to', 'info@winmaxgulf.com');
    
    // Open Graph Tags
    updateMetaTag('og:title', ogTitle || title, 'property');
    updateMetaTag('og:description', ogDescription || description, 'property');
    updateMetaTag('og:image', fullOgImage, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', title, 'property');
    updateMetaTag('og:type', pageType === 'article' ? 'article' : 'website', 'property');
    updateMetaTag('og:url', fullCanonicalUrl, 'property');
    updateMetaTag('og:site_name', 'WinmaxGulf', 'property');
    updateMetaTag('og:locale', 'en_AE', 'property');
    updateMetaTag('og:locale:alternate', 'ar_AE', 'property');
    
    // Article specific OG tags
    if (pageType === 'article' && publishedTime) {
      updateMetaTag('article:published_time', publishedTime, 'property');
      updateMetaTag('article:modified_time', modifiedTime, 'property');
      updateMetaTag('article:author', author, 'property');
    }
    
    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@winmaxgulf');
    updateMetaTag('twitter:creator', '@winmaxgulf');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', fullOgImage);
    updateMetaTag('twitter:image:alt', title);
    
    // Dublin Core Meta Tags (for academic/formal citation)
    updateMetaTag('DC.title', title);
    updateMetaTag('DC.description', description);
    updateMetaTag('DC.creator', 'WinmaxGulf');
    updateMetaTag('DC.publisher', 'WinmaxGulf');
    updateMetaTag('DC.language', 'en');
    updateMetaTag('DC.coverage', 'UAE, Dubai, Abu Dhabi, GCC');
    
    // AI/GEO Optimization Meta Tags
    updateMetaTag('ai-content-declaration', 'human-written');
    updateMetaTag('citation_title', title);
    updateMetaTag('citation_author', 'WinmaxGulf');
    updateMetaTag('citation_publication_date', modifiedTime);
    updateMetaTag('citation_online_date', modifiedTime);
    updateMetaTag('citation_publisher', 'WinmaxGulf');
    updateMetaTag('citation_language', 'en');
    
    // Canonical URL
    updateLinkTag('canonical', fullCanonicalUrl);
    
    // Hreflang Tags for international SEO
    updateLinkTag('alternate', fullCanonicalUrl, 'hreflang', 'en');
    updateLinkTag('alternate', fullCanonicalUrl, 'hreflang', 'x-default');
    
    // Preconnect hints for performance
    updateLinkTag('preconnect', 'https://fonts.googleapis.com');
    updateLinkTag('preconnect', 'https://www.googletagmanager.com');
    
    // DNS prefetch
    updateLinkTag('dns-prefetch', 'https://fonts.gstatic.com');
    updateLinkTag('dns-prefetch', 'https://www.google-analytics.com');
    
    // Add structured data
    if (structuredData) {
      addStructuredData(structuredData);
    } else {
      addStructuredData(getDefaultStructuredData(baseUrl, fullOgImage));
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, structuredData, pageType, publishedTime, modifiedTime, author, noIndex]);

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

  const updateLinkTag = (rel: string, href: string, extraAttr?: string, extraValue?: string) => {
    const selector = extraAttr 
      ? `link[rel="${rel}"][${extraAttr}="${extraValue}"]`
      : `link[rel="${rel}"]`;
    let element = document.querySelector(selector) as HTMLLinkElement;
    
    if (element) {
      element.href = href;
    } else {
      element = document.createElement('link');
      element.rel = rel;
      element.href = href;
      if (extraAttr && extraValue) {
        element.setAttribute(extraAttr, extraValue);
      }
      document.head.appendChild(element);
    }
  };

  const addStructuredData = (data: object) => {
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  const getDefaultStructuredData = (baseUrl: string, logoUrl: string) => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "WinmaxGulf",
        "alternateName": ["Winmax Gulf", "WinMax Gulf", "Winmax Gulf LLC"],
        "description": "Leading UAE provider of PDLC smart film, LED display systems, and DJ club solutions with 500+ successful installations",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": logoUrl,
          "width": 512,
          "height": 512
        },
        "image": logoUrl,
        "telephone": "+971527200466",
        "email": "info@winmaxgulf.com",
        "priceRange": "$$-$$$",
        "foundingDate": "2015",
        "slogan": "Smart Technology Solutions UAE",
        "knowsAbout": [
          "PDLC Smart Glass",
          "LED Display Systems",
          "Smart Film Technology",
          "DJ Club Solutions",
          "Digital Signage",
          "Privacy Glass"
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certification",
          "name": "ISO 9001:2015 Certified"
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "United Arab Emirates"
          },
          {
            "@type": "Country",
            "name": "Saudi Arabia"
          },
          {
            "@type": "Country",
            "name": "Qatar"
          },
          {
            "@type": "Country",
            "name": "Bahrain"
          },
          {
            "@type": "Country",
            "name": "Kuwait"
          },
          {
            "@type": "Country",
            "name": "Oman"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+971527200466",
            "contactType": "sales",
            "areaServed": ["AE", "SA", "QA", "BH", "KW", "OM"],
            "availableLanguage": ["en", "ar"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            }
          },
          {
            "@type": "ContactPoint",
            "email": "info@winmaxgulf.com",
            "contactType": "customer support",
            "areaServed": "AE",
            "availableLanguage": ["en", "ar"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AE",
          "addressRegion": "Dubai",
          "addressLocality": "Dubai",
          "postalCode": "00000"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.2048",
          "longitude": "55.2708"
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
                "description": "Switchable privacy glass and smart film solutions for offices, homes, and commercial spaces in Dubai and UAE",
                "url": `${baseUrl}/pdlc`,
                "areaServed": "United Arab Emirates",
                "provider": { "@id": `${baseUrl}/#organization` }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "LED Display Systems",
                "description": "Professional indoor and outdoor LED displays, video walls, and digital signage in Dubai and UAE",
                "url": `${baseUrl}/led-display`,
                "areaServed": "United Arab Emirates",
                "provider": { "@id": `${baseUrl}/#organization` }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "DJ Club Solutions",
                "description": "Complete turnkey entertainment systems with professional sound, lighting, and DJ equipment for clubs and venues",
                "url": `${baseUrl}/dj-club-solutions`,
                "areaServed": "United Arab Emirates",
                "provider": { "@id": `${baseUrl}/#organization` }
              }
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#localbusiness`,
        "name": "WinmaxGulf",
        "image": logoUrl,
        "url": baseUrl,
        "telephone": "+971527200466",
        "email": "info@winmaxgulf.com",
        "priceRange": "$$-$$$",
        "currenciesAccepted": "AED, USD",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dubai",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.2048,
          "longitude": 55.2708
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "WinmaxGulf",
        "description": "Smart Technology Solutions UAE",
        "publisher": { "@id": `${baseUrl}/#organization` },
        "inLanguage": "en-AE",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/?s={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          }
        ]
      }
    ]
  });

  return null;
};

export default SEOHead;
