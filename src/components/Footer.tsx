
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import NewsletterSignup from './NewsletterSignup';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container-standard section-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-gap-large">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <ScrollReveal>
              <div className="spacing-medium">
                <Link to="/" className="heading-4 text-primary-foreground mb-4 block">
                  Smart Financial Planning
                </Link>
                <p className="text-small text-primary-foreground/80 mb-6">
                  Tailored financial strategies for ambitious professionals in Lake Nona and Orlando who demand more than 
                  cookie-cutter solutions.
                </p>
                
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-accent/20 transition-colors rounded-full text-primary-foreground touch-target">
                    <Facebook size={18} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-accent/20 transition-colors rounded-full text-primary-foreground touch-target">
                    <Twitter size={18} />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-accent/20 transition-colors rounded-full text-primary-foreground touch-target">
                    <Linkedin size={18} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a href="https://www.instagram.com/thesmartfinancialplan/" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 hover:bg-accent/20 transition-colors rounded-full text-primary-foreground touch-target">
                    <Instagram size={18} />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Company Links */}
          <div>
            <ScrollReveal delay={100}>
              <h3 className="heading-5 text-primary-foreground mb-4">Company</h3>
              <ul className="spacing-small">
                <li>
                  <a href="#" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Our Team
                  </a>
                </li>
                <li>
                  <Link to="/education" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Education Center
                  </Link>
                </li>
                <li>
                  <a href="#case-studies" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Careers
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </div>
          
          {/* Services Links */}
          <div>
            <ScrollReveal delay={200}>
              <h3 className="heading-5 text-primary-foreground mb-4">Services</h3>
              <ul className="spacing-small">
                <li>
                  <a href="#services" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Wealth Management
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Investment Planning
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Retirement Planning
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Tax Optimization
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target block">
                    Estate Planning
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </div>
          
          {/* Contact Info */}
          <div>
            <ScrollReveal delay={300}>
              <h3 className="heading-5 text-primary-foreground mb-4">Contact Information</h3>
              <ul className="spacing-small mb-6">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-small text-primary-foreground/80">
                    111 N Orange Ave, STE 800<br />
                    Orlando, Florida 32801
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <a href="tel:+17066275729" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target">
                    (706) 627-5729
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <a href="mailto:info@thesmartfinancialplan.com" className="text-small text-primary-foreground/80 hover:text-primary-foreground transition-colors touch-target">
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
          <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-primary-foreground/70 text-small flex-between flex-col md:flex-row gap-4">
            <div>
              © {currentYear} Smart Financial Planning. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary-foreground transition-colors touch-target">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors touch-target">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors touch-target">
                Cookie Policy
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
