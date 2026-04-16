import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceBrochureCTA from "@/components/ServiceBrochureCTA";
import { Users, Clock, ShieldAlert } from "lucide-react";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Smart Film for Meeting Rooms",
  "description": "Switchable privacy glass technology designed specifically for corporate meeting rooms, boardrooms, and executive pods.",
  "provider": {
    "@type": "Organization",
    "name": "Winmax Gulf"
  }
};

const SmartfilmMeetingRooms = () => {
  return (
    <>
      <SEOHead
        title="Smart Film for Meeting Rooms UAE | Boardroom Privacy Glass"
        description="Ensure complete confidentiality in your corporate meeting rooms. Our PDLC smart film provides instant visual privacy for glass boardrooms across the UAE."
        keywords="smart film for meeting rooms, boardroom privacy glass, switchable glass meeting room, corporate glass partitions"
        structuredData={pageSchema}
      />
      <div className="bg-[#050505] text-white min-h-screen selection:bg-winmax-orange/30">
        <Header />
        <Breadcrumbs items={[
          { label: "PDLC Smart Glass", href: "/pdlc" },
          { label: "Smart Film for Offices", href: "/smart-film-for-offices-uae" },
          { label: "Meeting Rooms", href: "/smart-film-for-meeting-rooms" }
        ]} />

        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                Instant Privacy For <span className="text-winmax-orange">Meeting Rooms</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-xl text-white/80 font-light leading-relaxed mb-6">
                    Transparent glass walls define the modern, collaborative office aesthetic. But when sensitive HR matters, financial audits, or client negotiations happen, full glass exposure becomes a major liability.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-6">
                    Our <Link to="/pdlc" className="text-winmax-orange hover:underline">PDLC smart film</Link> resolves this conflict perfectly. We retrofit your existing boardroom partitions with an intelligent membrane controlled electronically. In 0.1 seconds, your transparent meeting room becomes completely opaque.
                  </p>
                </div>
                
                <div className="bg-[#111] p-8 border border-white/10 rounded-2xl grid gap-6">
                  <div className="flex gap-4">
                    <Users className="w-8 h-8 text-winmax-orange flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg">Uninterrupted Focus</h4>
                      <p className="text-white/60 text-sm">Eliminates distractions from outside movement, allowing executives to focus on the presentation.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <ShieldAlert className="w-8 h-8 text-winmax-orange flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg">Information Security</h4>
                      <p className="text-white/60 text-sm">Prevents external viewing of confidential whiteboard notes, financial projections, or sensitive digital displays.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-8 h-8 text-winmax-orange flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg">Rapid Retrofit</h4>
                      <p className="text-white/60 text-sm">Installed outside of operating hours. Your meeting room will be fully equipped and functional before the next morning's stand-up.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-6 lg:px-12">
            <Reveal>
              <h2 className="text-3xl font-bold mb-10 text-center">Seamless Corporate Integration</h2>
            </Reveal>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border border-white/10 bg-[#141414] rounded-xl p-8">
                <h3 className="text-xl font-bold mb-3 text-winmax-orange">Meeting Scheduler Integration</h3>
                <p className="text-white/70">
                  We can synchronize the smart glass switching mechanism with your Microsoft Exchange or Google Workspace room booking panels. When a meeting is officially initiated on the panel outside the door, the glass automatically frosts.
                </p>
              </div>
              <div className="border border-white/10 bg-[#141414] rounded-xl p-8">
                <h3 className="text-xl font-bold mb-3 text-winmax-orange">Presentation Mode Trigger</h3>
                <p className="text-white/70">
                  Through our <Link to="/collaboration-av" className="underline hover:text-winmax-orange">Collaboration AV deployment</Link>, pressing "Present" on the boardroom touch-panel will simultaneously lower the room lights, drop the projector screen, and frost the smart glass walls for the ultimate cinema-grade viewing environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ServiceBrochureCTA
          badge="Boardroom Specialists"
          headline={<>SECURE YOUR <span className="text-winmax-orange">BOARDROOM.</span></>}
          subtext="Contact us to discuss outfitting your current and upcoming meeting spaces with instant privacy technology."
          whatsappMessage="Hello, I would like to outfit our corporate meeting rooms with smart film."
          brochureFile="/brochures/pdlc-smart-glass.pdf"
        />

        <Footer />
      </div>
    </>
  );
};

export default SmartfilmMeetingRooms;
