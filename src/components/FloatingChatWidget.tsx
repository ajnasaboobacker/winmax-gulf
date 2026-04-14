import { useState } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: MessageCircle,
      label: "WhatsApp Chat",
      action: () => window.open('https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20services', '_blank'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Phone,
      label: "Call Us",
      action: () => window.open('tel:+97142713101', '_self'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Mail,
      label: "Email Sales",
      action: () => window.open('mailto:sales@winmaxgulf.com', '_self'),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <Card className="mb-4 p-4 shadow-2xl border-winmax-orange/20 bg-background/95 backdrop-blur-sm">
          <div className="space-y-3 min-w-[200px]">
            <h4 className="font-semibold text-foreground mb-3">Get In Touch</h4>
            {contactOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start ${option.color} text-white hover:scale-105 transition-all duration-200`}
                onClick={option.action}
              >
                <option.icon className="w-4 h-4 mr-2" />
                {option.label}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Main Chat Button */}
      <Button
        size="lg"
        className={`rounded-full w-16 h-16 shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-gradient-to-r from-winmax-orange to-winmax-orange-light hover:shadow-winmax-orange/30'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 animate-pulse" />
        )}
      </Button>
    </div>
  );
};

export default FloatingChatWidget;