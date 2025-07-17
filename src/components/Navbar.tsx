
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, BookOpen } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import PrimaryButton from './PrimaryButton';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  id: string;
  isLink?: boolean;
  path?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      if (isHomePage) {
        const sections = ['services', 'process', 'case-studies', 'team', 'testimonials'];
        let currentSection = '';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = section;
              break;
            }
          }
        }
        
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (isHomePage) {
      smoothScrollTo(sectionId);
    } else {
      // If not on home page, navigate to home page and then to section
      window.location.href = `/#${sectionId}`;
    }
  };

  const mainNavItems: NavItem[] = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Case Studies', id: 'case-studies' },
    { name: 'Team', id: 'team' },
    { name: 'Testimonials', id: 'testimonials' }
  ];

  const navItems: NavItem[] = [
    ...mainNavItems,
    { name: 'Education', id: 'education', isLink: true, path: '/education' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-sm backdrop-blur-safe py-3' 
          : 'bg-transparent py-5'
      }`}
      aria-label="Main navigation"
    >
      <div className="container-custom flex justify-between items-center">
        <Link 
          to="/"
          className="font-heading text-charcoal text-xl font-medium tracking-tight hover:text-blue-500 transition-colors duration-300"
          aria-label="Back to home"
        >
          <span className="inline-flex items-center">
            Smart Financial Planning
          </span>
        </Link>

        <div 
          className="hidden md:flex items-center space-x-6"
          role="navigation"
          aria-label="Desktop navigation"
        >
          {navItems.map((item, index) => 
            item.isLink ? (
              <Link
                key={item.id}
                to={item.path || '/'}
                className={cn(
                  "relative px-1 py-1 overflow-hidden text-sm font-medium transition-colors duration-300 group",
                  location.pathname === item.path 
                    ? "text-blue-500" 
                    : "text-charcoal/80 hover:text-charcoal"
                )}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  opacity: isScrolled ? 1 : 0.9,
                  transform: `translateY(${isScrolled ? '0' : '4px'})`,
                  transition: 'opacity 0.3s ease, transform 0.3s ease, color 0.3s ease'
                }}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {item.name === 'Education' && <BookOpen className="w-3.5 h-3.5" />}
                  {item.name}
                </span>
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform origin-left transition-transform duration-300",
                    location.pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} 
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative px-1 py-1 overflow-hidden text-sm font-medium transition-colors duration-300 group ${
                  activeSection === item.id && isHomePage ? 'text-blue-500' : 'text-charcoal/80 hover:text-charcoal'
                }`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  opacity: isScrolled ? 1 : 0.9,
                  transform: `translateY(${isScrolled ? '0' : '4px'})`,
                  transition: 'opacity 0.3s ease, transform 0.3s ease, color 0.3s ease'
                }}
                aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
              >
                {item.name}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform origin-left transition-transform duration-300 ${
                    activeSection === item.id && isHomePage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                  aria-hidden="true"
                />
              </a>
            )
          )}
          <PrimaryButton 
            onClick={() => handleNavClick('contact')}
            className="group"
            size="sm"
            icon={<ChevronRight size={16} />}
            iconPosition="right"
            style={{ 
              transitionDelay: '250ms',
              opacity: isScrolled ? 1 : 0.9,
              transform: `translateY(${isScrolled ? '0' : '4px'})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            Schedule a Call
          </PrimaryButton>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-charcoal focus:outline-none hover:text-blue-500 transition-colors duration-300 p-2 focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Slide-in Menu */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-lg shadow-xl border-l transform transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-heading text-lg font-medium text-card-foreground">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6">
              <div className="space-y-2">
                {navItems.map((item, index) => 
                  item.isLink ? (
                    <Link
                      key={item.id}
                      to={item.path || '/'}
                      className={cn(
                        "flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 group",
                        location.pathname === item.path 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted/50 text-card-foreground"
                      )}
                      style={{ 
                        transitionDelay: `${index * 50}ms`,
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
                      }}
                      onClick={() => setIsOpen(false)}
                      aria-current={location.pathname === item.path ? 'page' : undefined}
                    >
                      {item.name === 'Education' && <BookOpen className="w-5 h-5" />}
                      <span className="font-medium flex-1">{item.name}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <button 
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 group text-left",
                        activeSection === item.id && isHomePage 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted/50 text-card-foreground"
                      )}
                      style={{ 
                        transitionDelay: `${index * 50}ms`,
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
                      }}
                      aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
                    >
                      <span className="font-medium flex-1">{item.name}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )
                )}
              </div>
            </nav>
            
            {/* Footer CTA */}
            <div className="p-4 border-t bg-muted/20">
              <PrimaryButton 
                onClick={() => handleNavClick('contact')}
                className="w-full justify-center group"
                icon={<ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />}
                iconPosition="right"
              >
                Schedule a Call
              </PrimaryButton>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Free consultation • No obligation
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
