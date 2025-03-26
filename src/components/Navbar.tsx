
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
          ? 'bg-white/90 shadow-sm backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="font-heading text-charcoal text-xl font-medium tracking-tight">
            Smart Financial Planning
          </a>
        </div>

        {/* Desktop navigation with improved animations */}
        <div className="hidden md:flex items-center space-x-8">
          {['Services', 'Process', 'Team', 'Testimonials'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="nav-link text-charcoal hover:text-amber-dark transition-colors"
              style={{ 
                transitionDelay: `${index * 50}ms`,
                opacity: isScrolled ? 1 : 0.9,
                transform: `translateY(${isScrolled ? '0' : '4px'})`,
                transition: 'opacity 0.3s ease, transform 0.3s ease, color 0.3s ease'
              }}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="button-primary transition-all duration-300 hover:shadow-md"
            style={{ 
              transitionDelay: '200ms',
              opacity: isScrolled ? 1 : 0.9,
              transform: `translateY(${isScrolled ? '0' : '4px'})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            Schedule a Call
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu with improved animation */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen 
            ? 'max-h-[300px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-custom py-4 bg-white/95 backdrop-blur-sm flex flex-col space-y-4">
          {['Services', 'Process', 'Team', 'Testimonials'].map((item, index) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="nav-link text-charcoal hover:text-amber-dark py-2" 
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="button-primary inline-block text-center" 
            onClick={() => setIsOpen(false)}
          >
            Schedule a Call
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
