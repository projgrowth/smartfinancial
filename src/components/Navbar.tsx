
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll events for menu highlighting and navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar style based on scroll position
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine which section is currently in view
      const sections = ['services', 'process', 'team', 'testimonials', 'contact'];
      let currentSection = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in view (with some buffer)
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    smoothScrollTo(sectionId);
  };

  const navItems = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Team', id: 'team' },
    { name: 'Testimonials', id: 'testimonials' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-sm backdrop-blur-safe py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a 
          href="#" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading text-charcoal text-xl font-medium tracking-tight hover:text-blue-500 transition-colors duration-300"
        >
          <span className="inline-flex items-center">
            Wealth Advisory
          </span>
        </a>

        {/* Desktop navigation with improved animations and active states */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={`relative px-1 py-1 overflow-hidden text-sm font-medium transition-colors duration-300 group ${
                activeSection === item.id ? 'text-blue-500' : 'text-charcoal/80 hover:text-charcoal'
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                opacity: isScrolled ? 1 : 0.9,
                transform: `translateY(${isScrolled ? '0' : '4px'})`,
                transition: 'opacity 0.3s ease, transform 0.3s ease, color 0.3s ease'
              }}
            >
              {item.name}
              <span 
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform origin-left transition-transform duration-300 ${
                  activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} 
              />
            </a>
          ))}
          <Button 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="bg-charcoal text-white hover:bg-charcoal/90 transition-all duration-300 group"
            style={{ 
              transitionDelay: '200ms',
              opacity: isScrolled ? 1 : 0.9,
              transform: `translateY(${isScrolled ? '0' : '4px'})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            <span>Schedule a Call</span>
            <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-charcoal focus:outline-none hover:text-blue-500 transition-colors duration-300 p-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
          {navItems.map((item, index) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={`py-2 px-3 rounded-md transition-all duration-300 ${
                activeSection === item.id 
                  ? 'bg-blue-500/10 text-blue-500' 
                  : 'hover:bg-charcoal/5'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="inline-flex items-center">
                {item.name}
                <ChevronRight className="ml-auto w-4 h-4" />
              </span>
            </a>
          ))}
          <Button 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="w-full bg-charcoal text-white hover:bg-charcoal/90 justify-center"
          >
            Schedule a Call
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
