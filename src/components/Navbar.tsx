
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, BookOpen } from 'lucide-react';

import PrimaryButton from './PrimaryButton';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import useNavigateSection from '@/hooks/useNavigateSection';

interface NavItem {
  name: string;
  id: string;
  isLink?: boolean;
  path?: string;
}

const Navbar = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navigateToSection = useNavigateSection();

  useEffect(() => {
    const root = document.documentElement;
    const setInitial = () => {
      const h = navRef.current?.offsetHeight ?? 64;
      root.style.setProperty('--nav-h-initial', `${h}px`);
      root.style.setProperty('--nav-h', `${h}px`);
    };
    const handleResize = () => {
      const h = navRef.current?.offsetHeight ?? 64;
      root.style.setProperty('--nav-h', `${h}px`);
    };
    setInitial();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const h = navRef.current?.offsetHeight ?? 64;
    document.documentElement.style.setProperty('--nav-h', `${h}px`);
  }, [isOpen, isScrolled, location.pathname]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      if (isHomePage) {
        const sections = ['services', 'process', 'case-studies', 'team'];
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
    navigateToSection(sectionId);
  };

  const mainNavItems: NavItem[] = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Case Studies', id: 'case-studies' },
    { name: 'Team', id: 'team' }
  ];

  const navItems: NavItem[] = [
    ...mainNavItems,
    { name: 'Education', id: 'education', isLink: true, path: '/education' }
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 shadow-lg backdrop-blur-md border-b border-gray-200/20 py-3' 
          : 'bg-transparent py-5'
      }`}
      aria-label="Main navigation"
    >
      <div className="container-unified flex justify-between items-center">
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
             onClick={() => handleNavClick('schedule')}
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

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-charcoal focus:outline-none hover:text-blue-500 transition-colors duration-300 p-2 focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen 
            ? 'max-h-[400px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="container-unified py-4 bg-white/95 backdrop-blur-sm flex flex-col space-y-4">
          {navItems.map((item, index) => 
            item.isLink ? (
              <Link
                key={item.id}
                to={item.path || '/'}
                className={cn(
                  "py-2 px-3 rounded-md transition-all duration-300 flex items-center",
                  location.pathname === item.path 
                    ? "bg-blue-500/10 text-blue-500" 
                    : "hover:bg-charcoal/5"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setIsOpen(false)}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="inline-flex items-center gap-2">
                  {item.name === 'Education' && <BookOpen className="w-4 h-4" />}
                  {item.name}
                </span>
                <ChevronRight className="ml-auto w-4 h-4" />
              </Link>
            ) : (
              <a 
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`py-2 px-3 rounded-md transition-all duration-300 ${
                  activeSection === item.id && isHomePage 
                    ? 'bg-blue-500/10 text-blue-500' 
                    : 'hover:bg-charcoal/5'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
              >
                <span className="inline-flex items-center">
                  {item.name}
                  <ChevronRight className="ml-auto w-4 h-4" />
                </span>
              </a>
            )
          )}
          <PrimaryButton 
            onClick={() => handleNavClick('schedule')}
            className="w-full justify-center"
            icon={<ChevronRight size={16} />}
            iconPosition="right"
          >
            Schedule a Call
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
