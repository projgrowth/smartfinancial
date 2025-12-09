import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="section-bg-premium-dark" role="contentinfo">
      <div className="container-default py-16 lg:py-20">
        {/* Minimal 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-xl font-semibold text-white block">
              Smart Financial Planning
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Tailored financial strategies for ambitious professionals.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/smart-financial-planning" 
                className="text-white/60 hover:text-white transition-colors duration-150" 
                aria-label="LinkedIn" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/thesmartfinancialplan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-150"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-white">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                <li>
                  <Link to="/#services" className="text-white/70 hover:text-white transition-colors duration-150 text-sm">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/#team" className="text-white/70 hover:text-white transition-colors duration-150 text-sm">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link to="/#faq" className="text-white/70 hover:text-white transition-colors duration-150 text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/#schedule" className="text-white/70 hover:text-white transition-colors duration-150 text-sm">
                    Schedule a Meeting
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-white">Contact</h3>
            <address className="not-italic space-y-3">
              <p className="text-white/70 text-sm">
                111 N Orange Ave, STE 800<br />
                Orlando, Florida 32801
              </p>
              <p>
                <a
                  href="tel:+17066275729"
                  className="text-white/70 hover:text-white transition-colors duration-150 text-sm"
                >
                  (706) 627-5729
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@thesmartfinancialplan.com"
                  className="text-white/70 hover:text-white transition-colors duration-150 text-sm break-all"
                >
                  info@thesmartfinancialplan.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {currentYear} Smart Financial Planning</p>
            <nav aria-label="Legal">
              <ul className="flex gap-6">
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors duration-150">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors duration-150">
                    Terms
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
