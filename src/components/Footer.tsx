
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12 border-t border-lightgray/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="font-heading text-charcoal text-xl font-medium tracking-tight">
              Smart Financial Planning
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 md:mb-0 text-center md:text-left">
            <span className="text-sm text-darkgray/70 inline-flex items-center">
              <span className="w-2 h-2 bg-amber rounded-full mr-2"></span>
              Fiduciary
            </span>
            <span className="text-sm text-darkgray/70 inline-flex items-center">
              <span className="w-2 h-2 bg-amber rounded-full mr-2"></span>
              Fee-only
            </span>
            <a href="#" className="text-sm text-darkgray/70 hover:text-charcoal transition-colors">
              Privacy & Disclosures
            </a>
          </div>
          
          <div className="text-sm text-darkgray/70">
            &copy; {currentYear} Smart Financial Planning. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
