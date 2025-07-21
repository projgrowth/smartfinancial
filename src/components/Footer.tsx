
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import NewsletterSignup from './NewsletterSignup';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container-unified section-lg pb-8">
        <div className="grid-four-col gap-unified-xl">
          <div className="md:col-span-2 lg:col-span-1">
            <ScrollReveal>
              <div className="space-component-md">
                <Link to="/" className="heading-sm text-primary-foreground block mb-3">
                  Smart Financial Planning
                </Link>
                <p className="text-body-sm text-primary-foreground/80">
                  Tailored financial strategies for ambitious professionals in Lake Nona and Orlando who demand more than 
                  cookie-cutter solutions.
                </p>
              </div>
              
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="bg-primary-foreground/10 hover:bg-accent/30 transition-colors touch-target-lg rounded-full flex items-center justify-center text-primary-foreground focus-enhanced"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="bg-primary-foreground/10 hover:bg-accent/30 transition-colors touch-target-lg rounded-full flex items-center justify-center text-primary-foreground focus-enhanced"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href="#" 
                  className="bg-primary-foreground/10 hover:bg-accent/30 transition-colors touch-target-lg rounded-full flex items-center justify-center text-primary-foreground focus-enhanced"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/thesmartfinancialplan/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-primary-foreground/10 hover:bg-accent/30 transition-colors touch-target-lg rounded-full flex items-center justify-center text-primary-foreground focus-enhanced"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-1">
            <ScrollReveal delay={100}>
              <h3 className="heading-xs text-primary-foreground mb-4">Company</h3>
              <ul className="space-component-xs">
                <li>
                  <a href="#" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Our Team
                  </a>
                </li>
                <li>
                  <Link to="/education" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Education Center
                  </Link>
                </li>
                <li>
                  <a href="#case-studies" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Careers
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-1">
            <ScrollReveal delay={200}>
              <h3 className="heading-xs text-primary-foreground mb-4">Services</h3>
              <ul className="space-component-xs">
                <li>
                  <a href="#services" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Wealth Management
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Investment Planning
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Retirement Planning
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Tax Optimization
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                    Estate Planning
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-1">
            <ScrollReveal delay={300}>
              <h3 className="heading-xs text-primary-foreground mb-4">Contact Information</h3>
              <ul className="space-component-sm mb-6">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-body-sm text-primary-foreground/80">
                    111 N Orange Ave, STE 800<br />
                    Orlando, Florida 32801
                  </span>
                </li>
                <li className="flex items-center touch-target">
                  <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <a 
                    href="tel:+17066275729" 
                    className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-enhanced"
                  >
                    (706) 627-5729
                  </a>
                </li>
                <li className="flex items-center touch-target">
                  <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <a 
                    href="mailto:info@thesmartfinancialplan.com" 
                    className="text-body-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-enhanced break-all"
                  >
                    info@thesmartfinancialplan.com
                  </a>
                </li>
              </ul>
              
              <NewsletterSignup 
                compact={true} 
                title="Financial Insights Newsletter"
                description="Stay updated with Lake Nona and Orlando financial planning insights."
              />
            </ScrollReveal>
          </div>
        </div>
        
        <ScrollReveal>
          <div className="mt-16 pt-6 border-t border-primary-foreground/20 text-primary-foreground/70 text-body-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              © {currentYear} Smart Financial Planning. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary-foreground transition-colors touch-target focus-enhanced">
                Terms of Service
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
