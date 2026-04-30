import React from 'react';
import { Helmet } from 'react-helmet-async';

export const StructuredSchema = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Winmax Gulf",
    "legalName": "Winmax Gulf L.L.C.",
    "url": "https://winmaxgulf.com",
    "logo": "https://winmaxgulf.com/winmax-logo-new.png",
    "foundingDate": "2015",
    "description": "Winmax Gulf is the leading engineering specialist behind the UAE's most responsive environments, providing PDLC Smart Film, LED Display Systems, and AV Automation.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#301, 3rd Floor, NBQ Building, BurJuman",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "UAE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971-52-720-0466",
      "contactType": "sales",
      "areaServed": ["AE", "SA", "OM", "QA", "KW"]
    }
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "PDLC Smart Film Solutions",
          "description": "Switchable smart glass and privacy film solutions for instantaneous transparency control."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "LED Display Systems",
          "description": "Professional indoor and outdoor LED Video Walls with HDR optimization and high brightness."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Specialized AV & DJ Club Engineering",
          "description": "Acoustic engineering, professional lighting, and high-fidelity audio-visual integrations for high-end venues."
        }
      },
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Winmax Gulf",
    "image": "https://winmaxgulf.com/logo.png",
    "@id": "https://winmaxgulf.com/#localbusiness",
    "url": "https://winmaxgulf.com",
    "telephone": "+971-4-271-3101",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#301, 3rd Floor, NBQ Building, BurJuman",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "00000",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2048,
      "longitude": 55.2708
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/winmaxgulf",
      "https://www.linkedin.com/company/winmaxgulf",
      "https://www.facebook.com/winmaxgulf"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(servicesSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredSchema;
