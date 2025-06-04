
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import NewsletterSignup from './NewsletterSignup';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-charcoal text-slate-lightest">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="mb-6">
                <Link to="/" className="font-heading text-white text-xl font-medium tracking-tight mb-2 block">
                  Smart Financial Planning
                </Link>
                <p className="text-slate-light text-sm mt-3">
                  Tailored financial strategies for ambitious professionals in Lake Nona and Orlando who demand more than 
                  cookie-cutter solutions.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="bg-charcoal-light/30 hover:bg-blue-500/30 transition-colors p-2 rounded-full text-white">
                  <Facebook size={18} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="bg-charcoal-light/30 hover:bg-blue-500/30 transition-colors p-2 rounded-full text-white">
                  <Twitter size={18} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="bg-charcoal-light/30 hover:bg-blue-500/30 transition-colors p-2 rounded-full text-white">
                  <Linkedin size={18} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/thesmartfinancialplan/" target="_blank" rel="noopener noreferrer" className="bg-charcoal-light/30 hover:bg-blue-500/30 transition-colors p-2 rounded-full text-white">
                  <Instagram size={18} />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-2">
            <ScrollReveal delay={100}>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-light hover:text-white transition-colors text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-slate-light hover:text-white transition-colors text-sm">
                    Our Team
                  </a>
                </li>
                <li>
                  <Link to="/education" className="text-slate-light hover:text-white transition-colors text-sm">
                    Education Center
                  </Link>
                </li>
                <li>
                  <a href="#case-studies" className="text-slate-light hover:text-white transition-colors text-sm">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-light hover:text-white transition-colors text-sm">
                    Careers
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-2">
            <ScrollReveal delay={200}>
              <h3 className="text-white font-medium mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-slate-light hover:text-white transition-colors text-sm">
                    Wealth Management
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-light hover:text-white transition-colors text-sm">
                    Investment Planning
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-light hover:text-white transition-colors text-sm">
                    Retirement Planning
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-light hover:text-white transition-colors text-sm">
                    Tax Optimization
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-slate-light hover:text-white transition-colors text-sm">
                    Estate Planning
                  </a>
                </li>
              </ul>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-4">
            <ScrollReveal delay={300}>
              <h3 className="text-white font-medium mb-4">Contact Information</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-light text-sm">
                    111 N Orange Ave, STE 800<br />
                    Orlando, Florida 32801
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                  <a href="tel:+17066275729" className="text-slate-light hover:text-white transition-colors text-sm">
                    (706) 627-5729
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                  <a href="mailto:info@thesmartfinancialplan.com" className="text-slate-light hover:text-white transition-colors text-sm">
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
          <div className="mt-16 pt-6 border-t border-charcoal-light/30 text-slate-light/70 text-sm flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {currentYear} Smart Financial Planning. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
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
