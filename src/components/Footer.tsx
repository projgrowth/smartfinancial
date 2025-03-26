
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="font-neue text-navy-dark text-xl font-semibold tracking-tight">
              Smart Financial Planning
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 md:mb-0 text-center md:text-left">
            <span className="text-sm text-slate inline-flex items-center">
              <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
              Fiduciary
            </span>
            <span className="text-sm text-slate inline-flex items-center">
              <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
              Fee-only
            </span>
            <a href="#" className="text-sm text-slate hover:text-navy-dark transition-colors">
              Privacy & Disclosures
            </a>
          </div>
          
          <div className="text-sm text-slate">
            &copy; {currentYear} Smart Financial Planning. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
