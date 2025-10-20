import { Globe, Phone, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/20 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-winmax-orange to-winmax-orange-light rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-winmax-orange to-winmax-orange-light bg-clip-text text-transparent">
                Winmax Gulf
              </span>
            </div>
            <p className="text-foreground/80 mb-6 max-w-md">
              Leading UAE provider of PDLC smart film, LED display systems, and turnkey DJ club solutions. 
              Transforming spaces with innovative technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="tel:+971527200466"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="Call WinmaxGulf"
              >
                <Phone className="h-5 w-5 text-winmax-orange" />
              </a>
              <a 
                href="mailto:info@winmaxgulf.com"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="Email WinmaxGulf"
              >
                <Mail className="h-5 w-5 text-winmax-orange" />
              </a>
              <a 
                href="https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="WhatsApp WinmaxGulf"
              >
                <MessageCircle className="h-5 w-5 text-winmax-orange" />
              </a>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.instagram.com/winmaxgulf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="Follow WinmaxGulf on Instagram"
              >
                <svg className="h-5 w-5 text-winmax-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/winmaxgulf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="Connect with WinmaxGulf on LinkedIn"
              >
                <svg className="h-5 w-5 text-winmax-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/winmaxgulf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="Like WinmaxGulf on Facebook"
              >
                <svg className="h-5 w-5 text-winmax-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/winmaxgulf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="Follow WinmaxGulf on X (Twitter)"
              >
                <svg className="h-5 w-5 text-winmax-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@winmaxgulf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-winmax-orange/20 rounded-lg hover:bg-winmax-orange/30 transition-colors"
                aria-label="Subscribe to WinmaxGulf on YouTube"
              >
                <svg className="h-5 w-5 text-winmax-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Services</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20PDLC%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-winmax-orange transition-colors"
                >
                  PDLC Smart Film
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20LED%20DISPLAY%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-winmax-orange transition-colors"
                >
                  LED Display Systems
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20DJSOLUTION%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-winmax-orange transition-colors"
                >
                  DJ Club Solutions
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/+971527200466?text=Hello%20I%20want%20to%20know%20about%20your%20custom%20solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-winmax-orange transition-colors"
                >
                  Custom Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-winmax-orange" />
                <span className="text-foreground/80">+971 527 200 466</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-winmax-orange" />
                <span className="text-foreground/80">+971 504 171 875</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-winmax-orange" />
                <span className="text-foreground/80">+971 4 271 3101</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-winmax-orange" />
                <span className="text-foreground/80">info@winmaxgulf.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-winmax-orange" />
                <span className="text-foreground/80">marimuthu@winmaxgulf.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-winmax-orange" />
                <span className="text-foreground/80">Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/80">
            © {currentYear} Winmax Gulf. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-foreground/80 hover:text-winmax-orange transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground/80 hover:text-winmax-orange transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;