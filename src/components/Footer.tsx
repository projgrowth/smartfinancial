
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import Newsletter from './Newsletter';
import GradientAccent from './GradientAccent';
import AnimatedSectionTransition from './AnimatedSectionTransition';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="section-bg-premium-dark text-accent-foreground relative overflow-hidden">
      {/* Add transition from previous section */}
      <AnimatedSectionTransition 
        style="wave" 
        colorScheme="dark-to-light" 
        position="top" 
        height={40}
      />
      
      {/* Add gradient accents */}
      <GradientAccent variant="blue" position="top-right" intensity="ultra-low" animated />
      <GradientAccent variant="subtle" position="bottom-left" intensity="ultra-low" />
      
      <div className="container-default section-lg pb-[calc(1.5rem+env(safe-area-inset-bottom))] relative z-10">
        {/* Grid layout: Intentional 2:1:1:1 column ratio - company info gets double width for branding */}
        <div className="grid-footer gap-unified-xl">
          <div>
            <ScrollReveal>
              <div className="space-component-md">
                <Link to="/" className="heading-sm text-accent-foreground block space-component-xs">
                  Smart Financial Planning
                </Link>
                <p className="text-body text-accent-foreground/90">
                  Tailored financial strategies for ambitious professionals in Lake Nona and Orlando who demand more than 
                  cookie-cutter solutions.
                </p>
              </div>
              <nav aria-label="Social Media" className="space-component-sm">
                <ul className="flex gap-unified-sm" role="list">
                  <li>
                    <a href="https://www.linkedin.com/company/smart-financial-planning" className="footer-icon-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/thesmartfinancialplan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon-link"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </li>
                </ul>
              </nav>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={100}>
              <h3 id="footer-company" className="heading-xs text-accent-foreground space-component-sm">Company</h3>
              <nav aria-labelledby="footer-company">
                <ul className="space-component-xs">
                  <li>
                    <Link to="/#team" className="footer-nav-link">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link to="/education" className="footer-nav-link">
                      Education Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="footer-nav-link">
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </nav>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={200}>
              <h3 id="footer-services" className="heading-xs text-accent-foreground space-component-sm">Services</h3>
              <nav aria-labelledby="footer-services">
                <ul className="space-component-xs">
                  <li>
                    <Link to="/#services" className="footer-nav-link">
                      Wealth Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="footer-nav-link">
                      Investment Planning
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="footer-nav-link">
                      Retirement Planning
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="footer-nav-link">
                      Tax Optimization
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="footer-nav-link">
                      Estate Planning
                    </Link>
                  </li>
                </ul>
              </nav>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={300}>
              <h3 className="heading-xs text-accent-foreground space-component-sm">Contact Information</h3>
              <address className="not-italic">
                <ul className="space-component-sm">
                  <li className="flex items-start group">
                    <MapPin className="footer-contact-icon" />
                    <span className="text-body text-accent-foreground/90 ml-3">
                      111 N Orange Ave, STE 800<br />
                      Orlando, Florida 32801
                    </span>
                  </li>
                  <li className="flex items-center touch-target group">
                    <Phone className="footer-contact-icon" />
                    <a
                      href="tel:+17066275729"
                      className="text-body text-accent-foreground/90 hover:text-accent-foreground transition-colors focus-enhanced ml-3"
                    >
                      (706) 627-5729
                    </a>
                  </li>
                  <li className="flex items-center touch-target group">
                    <Mail className="footer-contact-icon" />
                    <a
                      href="mailto:info@thesmartfinancialplan.com"
                      className="text-body text-accent-foreground/90 hover:text-accent-foreground transition-colors focus-enhanced break-all ml-3"
                    >
                      info@thesmartfinancialplan.com
                    </a>
                  </li>
                </ul>
              </address>

              <div className="space-component-md">
                <Newsletter
                  variant="simple"
                  compact={true}
                  title="Financial Insights Newsletter"
                  description="Stay updated with Lake Nona and Orlando financial planning insights."
                  onDark
                  showWebhook={false}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal>
          <div className="space-component-lg border-t border-accent-foreground/20 text-accent-foreground/80 text-body flex flex-col md:flex-row justify-between items-center gap-unified-sm">
            <div>
              © {currentYear} Smart Financial Planning. All rights reserved.
            </div>
            <div className="flex items-center gap-unified-md">
              <nav aria-label="Legal">
                <ul className="flex gap-unified-md">
                  <li>
                      <Link to="/privacy" className="hover:text-accent-foreground transition-colors touch-target focus-enhanced">
                        Privacy Policy
                      </Link>
                  </li>
                  <li>
                      <Link to="/terms" className="hover:text-accent-foreground transition-colors touch-target focus-enhanced">
                        Terms of Service
                      </Link>
                  </li>
                </ul>
              </nav>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="footer-back-to-top"
                aria-label="Back to top"
              >
                Back to top
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
