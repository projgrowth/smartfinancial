
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 shadow-md backdrop-blur-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="font-heading text-charcoal text-xl font-medium tracking-tight">
            Smart Financial Planning
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="nav-link text-charcoal hover:text-amber-dark transition-colors">Services</a>
          <a href="#process" className="nav-link text-charcoal hover:text-amber-dark transition-colors">Process</a>
          <a href="#team" className="nav-link text-charcoal hover:text-amber-dark transition-colors">Team</a>
          <a href="#testimonials" className="nav-link text-charcoal hover:text-amber-dark transition-colors">Testimonials</a>
          <a href="#contact" className="button-primary">Schedule a Call</a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="container-custom py-4 bg-white flex flex-col space-y-6">
          <a href="#services" className="nav-link text-charcoal hover:text-amber-dark py-2" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#process" className="nav-link text-charcoal hover:text-amber-dark py-2" onClick={() => setIsOpen(false)}>Process</a>
          <a href="#team" className="nav-link text-charcoal hover:text-amber-dark py-2" onClick={() => setIsOpen(false)}>Team</a>
          <a href="#testimonials" className="nav-link text-charcoal hover:text-amber-dark py-2" onClick={() => setIsOpen(false)}>Testimonials</a>
          <a href="#contact" className="button-primary inline-block text-center" onClick={() => setIsOpen(false)}>Schedule a Call</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
