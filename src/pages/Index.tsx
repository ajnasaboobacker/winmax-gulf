import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InteractiveElements from "@/components/InteractiveElements";
import Services from "@/components/Services";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CharacterAnimations from "@/components/CharacterAnimations";
import SEOHead from "@/components/SEOHead";
import TrustBadges from "@/components/TrustBadges";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";
import FAQ from "@/components/FAQ";

const Index = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://winmaxgulf.com/#organization",
        "name": "WinmaxGulf",
        "url": "https://winmaxgulf.com",
        "logo": "https://winmaxgulf.com/favicon.png",
        "description": "Leading UAE provider of PDLC smart film, LED displays & DJ club solutions with 500+ successful installations",
        "telephone": "+971527200466",
        "email": "info@winmaxgulf.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        },
        "sameAs": [
          "https://www.instagram.com/winmaxgulf",
          "https://www.linkedin.com/company/winmaxgulf",
          "https://www.facebook.com/winmaxgulf"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://winmaxgulf.com/#website",
        "url": "https://winmaxgulf.com",
        "name": "WinmaxGulf",
        "publisher": { "@id": "https://winmaxgulf.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://winmaxgulf.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://winmaxgulf.com/#webpage",
        "url": "https://winmaxgulf.com",
        "name": "WinmaxGulf - Smart Technology Solutions UAE",
        "isPartOf": { "@id": "https://winmaxgulf.com/#website" },
        "about": { "@id": "https://winmaxgulf.com/#organization" },
        "description": "Leading UAE provider of PDLC smart film, LED displays & DJ solutions."
      },
      {
        "@type": "ItemList",
        "name": "Our Services",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Service",
              "name": "PDLC Smart Glass",
              "url": "https://winmaxgulf.com/pdlc",
              "description": "Switchable privacy glass technology for offices, homes & commercial spaces"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Service",
              "name": "LED Display Systems",
              "url": "https://winmaxgulf.com/led-display",
              "description": "Professional indoor and outdoor LED displays and video walls"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Service",
              "name": "DJ Club Solutions",
              "url": "https://winmaxgulf.com/dj-club-solutions",
              "description": "Complete turnkey entertainment systems for venues"
            }
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is PDLC smart glass?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PDLC (Polymer Dispersed Liquid Crystal) smart glass is an advanced technology that allows instant control over glass transparency. When powered on, it becomes transparent; when off, it turns opaque for privacy."
            }
          },
          {
            "@type": "Question",
            "name": "Where does WinmaxGulf provide services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WinmaxGulf provides services across the UAE including Dubai, Abu Dhabi, Sharjah, and extends to Saudi Arabia, Qatar, Bahrain, Kuwait, and Oman."
            }
          },
          {
            "@type": "Question",
            "name": "How many installations has WinmaxGulf completed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WinmaxGulf has completed over 500 successful installations across the UAE and GCC region."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="WinmaxGulf - Smart Technology Solutions UAE"
        description="Leading UAE provider of PDLC smart film, LED displays & DJ solutions. 500+ successful installations in Dubai."
        keywords="PDLC smart film UAE, LED displays Dubai, DJ club solutions, smart glass technology, interactive displays, privacy glass Dubai, electronic switchable glass UAE, digital signage Dubai, smart film installation, LED video walls UAE"
        ogImage={window.location.origin + "/favicon.png"}
        structuredData={homeSchema}
      />
      <div className="min-h-screen">
        <Header />
        <Hero />
        <article>
          <InteractiveElements />
          <Services />
          <TechnologyShowcase />
          <About />
          <TrustBadges />
          <Gallery />
          <Process />
          <EnhancedTestimonials />
          <FAQ />
          <Contact />
        </article>
        <Footer />
        <CharacterAnimations />
      </div>
    </>
  );
};

export default Index;
