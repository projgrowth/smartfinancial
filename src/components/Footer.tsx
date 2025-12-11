import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-bg-premium-dark py-12" role="contentinfo">
      <div className="container-default">
        {/* Brand + Tagline */}
        <div className="text-center space-y-4">
          <h2 className="text-lg font-heading font-semibold text-white tracking-tight">
            Smart Financial Planning
          </h2>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            Tailored strategies for ambitious professionals.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-unified-md">
            <a
              href="https://www.linkedin.com/company/smart-financial-planning"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-white transition-colors duration-150"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/thesmartfinancialplan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/40 hover:text-white transition-colors duration-150"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 space-component-lg" />

        {/* Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-unified-sm text-xs text-white/40">
          <span>© {currentYear} Smart Financial Planning</span>
          <span className="hidden sm:inline">·</span>
          <a href="mailto:info@thesmartfinancialplan.com" className="hover:text-white transition-colors duration-150">
            info@thesmartfinancialplan.com
          </a>
          <span className="hidden sm:inline">·</span>
          <a href="tel:+17066275729" className="hover:text-white transition-colors duration-150">
            (706) 627-5729
          </a>
          <span className="hidden sm:inline">·</span>
          <Link to="/privacy" className="hover:text-white transition-colors duration-150">
            Privacy
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link to="/terms" className="hover:text-white transition-colors duration-150">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
