import React from 'react';
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/80 backdrop-blur-sm py-12 border-t border-lightgray/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <a href="/" className="font-heading text-charcoal text-xl font-medium tracking-tight inline-flex items-center group">
              <span className="text-gold mr-1 group-hover:text-gold-dark transition-colors duration-300">•</span>
              <span className="group-hover:text-gold transition-colors duration-300">Smart Financial Planning</span>
            </a>
            <p className="text-sm text-charcoal/70 mt-2 max-w-xs">
              Helping ambitious professionals build and protect wealth through tailored financial strategies.
            </p>
            <div className="flex space-x-2 pt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-charcoal">
                Fiduciary
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-charcoal">
                Fee-only
              </span>
            </div>
          </div>
          
          {/* Links column */}
          <div className="space-y-4">
            <h4 className="font-heading text-base font-medium text-charcoal">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'Process', 'Case Studies', 'Team', 'Testimonials', 'Contact'].map(item => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-charcoal/70 hover:text-gold transition-colors duration-300 text-sm inline-flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <ChevronRight className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact column */}
          <div className="space-y-4">
            <h4 className="font-heading text-base font-medium text-charcoal">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-gold mt-1 mr-2 flex-shrink-0" />
                <a href="mailto:contact@smartfinancial.com" className="text-sm text-charcoal/70 hover:text-gold transition-colors duration-300">
                  contact@smartfinancial.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-gold mt-1 mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-sm text-charcoal/70 hover:text-gold transition-colors duration-300">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-gold mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-charcoal/70">
                  123 Financial District<br />
                  New York, NY 10004
                </span>
              </li>
            </ul>
          </div>
          
          {/* Hours column */}
          <div className="space-y-4">
            <h4 className="font-heading text-base font-medium text-charcoal">Hours</h4>
            <ul className="space-y-2">
              <li className="text-sm text-charcoal/70 flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="text-sm text-charcoal/70 flex justify-between">
                <span>Saturday</span>
                <span>By appointment</span>
              </li>
              <li className="text-sm text-charcoal/70 flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
            <div className="pt-2">
              <a 
                href="#contact" 
                className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-300 group"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule a Consultation
                <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-lightgray/30 flex flex-col md:flex-row justify-between items-center text-sm text-charcoal/60">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} Smart Financial Planning. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors duration-300">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
