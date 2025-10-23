import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, Clock, Globe, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, service, message } = formData;
    const whatsappMessage = `Hello! I'm ${name}. 
Email: ${email}
Phone: ${phone}
Service Interest: ${service}
Message: ${message}`;
    
    const link = document.createElement('a');
    link.href = `https://wa.me/+971527200466?text=${encodeURIComponent(whatsappMessage)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Numbers",
      value: [
        "+971 527 200 466",
        "+971 504 171 875", 
        "+971 4 271 3101"
      ],
      links: [
        "tel:+971527200466",
        "tel:+971504171875",
        "tel:+97142713101"
      ]
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "WhatsApp",
      value: "Chat with us",
      link: "https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20services"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: [
        "info@winmaxgulf.com",
        "marimuthu@winmaxgulf.com"
      ],
      links: [
        "mailto:info@winmaxgulf.com",
        "mailto:marimuthu@winmaxgulf.com"
      ]
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Dubai, UAE",
      link: "#"
    }
  ];

  const services = ["PDLC Smart Film", "LED Display Systems", "DJ Club Solutions", "Custom Solutions"];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-winmax-orange/20 border border-winmax-orange/30 mb-6">
            <span className="text-sm font-medium text-winmax-orange">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Let's Start Your 
            <span className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent"> Smart Technology Project</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Ready to transform your space with innovative <strong>smart technology solutions</strong> in <strong>Dubai</strong> and across the <strong>UAE</strong>? Contact <strong>WinmaxGulf</strong> today for a free consultation. Our expert team specializes in <a href="/#services" className="text-winmax-orange hover:underline">PDLC smart film, LED displays, and DJ solutions</a>. Call us at <a href="tel:+971527200466" className="text-winmax-orange hover:underline">+971 527 200 466</a> or message us on <a href="https://wa.me/+971527200466" target="_blank" rel="noopener noreferrer" className="text-winmax-orange hover:underline">WhatsApp</a>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-8 text-foreground">Contact WinmaxGulf - UAE Smart Technology Experts</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-card to-secondary/10 border-border/50 hover:border-winmax-orange/50"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg text-primary-foreground">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg group-hover:text-winmax-orange transition-colors text-foreground mb-2">
                          {info.title}
                        </h4>
                        {Array.isArray(info.value) ? (
                          <div className="space-y-1">
                            {info.value.map((phone, phoneIndex) => (
                              <a
                                key={phoneIndex}
                                href={info.links[phoneIndex]}
                                className="block text-foreground/80 hover:text-winmax-orange transition-colors cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {phone}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <a
                            href={info.link}
                            className="text-foreground/80 hover:text-winmax-orange transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (info.link !== "#") window.open(info.link, '_blank');
                            }}
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="bg-winmax-orange/10 border border-winmax-orange/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg text-primary-foreground">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-lg text-foreground">Business Hours</h4>
                </div>
                <div className="space-y-2 text-foreground/80">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold mb-8 text-foreground">Send us a Message</h3>
            
            {/* Contact Form */}
            <Card className="bg-winmax-orange/10 border border-winmax-orange/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="bg-background/50 border-winmax-orange/30 focus:border-winmax-orange focus:ring-winmax-orange/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-background/50 border-winmax-orange/30 focus:border-winmax-orange focus:ring-winmax-orange/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+971 XXX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="bg-background/50 border-winmax-orange/30 focus:border-winmax-orange focus:ring-winmax-orange/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-foreground font-medium">Service Interest *</Label>
                      <Select onValueChange={(value) => handleInputChange('service', value)} required>
                        <SelectTrigger className="bg-background/50 border-winmax-orange/30 focus:border-winmax-orange focus:ring-winmax-orange/20">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service, index) => (
                            <SelectItem key={index} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={5}
                      className="bg-background/50 border-winmax-orange/30 focus:border-winmax-orange focus:ring-winmax-orange/20 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-winmax-orange to-winmax-orange-light hover:opacity-90 transition-opacity font-semibold"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 p-6 rounded-lg bg-winmax-orange/10 border border-winmax-orange/20">
              <div className="flex items-center space-x-4 mb-4">
                <Globe className="h-6 w-6 text-winmax-orange" />
                <h4 className="font-semibold text-foreground">Serving Across UAE</h4>
              </div>
              <p className="text-foreground/80">
                We provide professional <strong>smart technology solutions</strong> across <strong>Dubai</strong>, <strong>Abu Dhabi</strong>, <strong>Sharjah</strong>, and all other <strong>Emirates</strong> in the <strong>UAE</strong>. Our services include <a href="/#services" className="text-winmax-orange hover:underline">PDLC smart film installation</a>, <a href="/#services" className="text-winmax-orange hover:underline">LED display systems</a>, and <a href="/#services" className="text-winmax-orange hover:underline">DJ club solutions</a>. Visit our <a href="/#about" className="text-winmax-orange hover:underline">about page</a> to learn more about WinmaxGulf.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="p-8 rounded-lg bg-gradient-to-r from-background to-secondary/20 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Transform Your Space?</h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied customers throughout <strong>Dubai</strong> and the <strong>UAE</strong> who have upgraded their spaces with our innovative <strong>smart technology solutions</strong>. From residential homes to commercial offices and entertainment venues, <strong>WinmaxGulf</strong> delivers excellence in <a href="/#services" className="text-winmax-orange hover:underline">PDLC smart film</a>, <a href="/#services" className="text-winmax-orange hover:underline">LED displays</a>, and <a href="/#services" className="text-winmax-orange hover:underline">DJ solutions</a>. Contact us for professional installation and support.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-winmax-orange to-winmax-orange-light hover:opacity-90 transition-opacity"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://wa.me/+971527200466?text=Hello%20I%20want%20to%20schedule%20a%20free%20consultation';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;