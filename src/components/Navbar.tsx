import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import useNavigateSection from '@/hooks/useNavigateSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface NavItem {
  name: string;
  id: string;
}

const Navbar = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navigateToSection = useNavigateSection();
  const isMobile = useIsMobile();
  
  // Intersection observer for performance
  const { ref: intersectionRef, isIntersecting: navIsVisible } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '10px',
    triggerOnce: false
  });

  // Consolidated nav height management
  useEffect(() => {
    const root = document.documentElement;
    const updateNavHeight = () => {
      const h = navRef.current?.offsetHeight ?? 64;
      root.style.setProperty('--nav-h', `${h}px`);
      if (!root.style.getPropertyValue('--nav-h-initial')) {
        root.style.setProperty('--nav-h-initial', `${h}px`);
      }
    };

    updateNavHeight();

    const ro = new ResizeObserver(() => updateNavHeight());
    if (navRef.current) ro.observe(navRef.current);

    window.addEventListener('resize', updateNavHeight);

    const fontsReady = (document as any).fonts?.ready as Promise<void> | undefined;
    fontsReady?.then(() => updateNavHeight()).catch(() => updateNavHeight());

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateNavHeight);
    };
  }, [isOpen, isScrolled, location.pathname]);

  // Optimized scroll handling
  useEffect(() => {
    if (!navIsVisible) return;
    
    let ticking = false;

    const measureAndSet = () => {
      setIsScrolled(window.scrollY > 10);

      if (!isHomePage) return;

      const sections = ['services', 'process', 'team', 'schedule'];
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
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          measureAndSet();
          ticking = false;
        });
      }
    };

    measureAndSet();

    window.addEventListener('scroll', onScroll as any, { passive: true } as any);
    return () => {
      window.removeEventListener('scroll', onScroll as any);
    };
  }, [isHomePage, navIsVisible]);

  const handleNavClick = useCallback((sectionId: string) => {
    setIsOpen(false);
    navigateToSection(sectionId);
  }, [navigateToSection]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      setIsOpen(false);
      const menuButton = document.querySelector('[aria-expanded="true"]') as HTMLElement;
      menuButton?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector('a, button') as HTMLElement;
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const navItems: NavItem[] = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Team', id: 'team' },
  ];

  const segmentLinks = [
    { name: 'Business Owners', href: '/owners' },
    { name: 'Executives', href: '/executives' },
    { name: 'Legacy Planning', href: '/legacy' },
  ];

  const resourceLink = { name: 'Resources', href: '/resources' };

  return (
    <nav 
      ref={(el) => {
        navRef.current = el;
        intersectionRef.current = el;
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-150",
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-3' 
          : 'bg-transparent border-b border-transparent py-4'
      )}
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div className="container-wide flex justify-between items-center">
        <Link 
          to="/"
          className="text-nav-brand text-foreground hover:text-primary transition-colors duration-150 focus-enhanced"
          aria-label="Back to home"
        >
          <span className="inline-flex items-center">
            Smart Financial Planning
          </span>
        </Link>

        <div 
          className="hidden md:flex items-center gap-unified-md"
          role="navigation"
        >
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={cn(
                "relative px-1 py-1 overflow-hidden text-nav-link transition-colors duration-150 group focus-enhanced",
                activeSection === item.id && isHomePage ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
            >
              {item.name}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-150",
                  activeSection === item.id && isHomePage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )} 
                aria-hidden="true"
              />
            </a>
          ))}

          {/* Segment Links */}
          {segmentLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href}
              className="relative px-1 py-1 overflow-hidden text-nav-link transition-colors duration-150 group focus-enhanced text-muted-foreground hover:text-foreground"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-150 scale-x-0 group-hover:scale-x-100" aria-hidden="true" />
            </Link>
          ))}

          {/* Resources Link */}
          <Link 
            to={resourceLink.href}
            className="relative px-1 py-1 overflow-hidden text-nav-link transition-colors duration-150 group focus-enhanced text-muted-foreground hover:text-foreground"
          >
            {resourceLink.name}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-150 scale-x-0 group-hover:scale-x-100" aria-hidden="true" />
          </Link>

          <Button 
            onClick={() => handleNavClick('schedule')}
            className="group"
            size="sm"
            variant="hero"
          >
            <span className="inline-flex items-center gap-2">
              <span>Request Strategy Session</span>
              <ChevronRight size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Button>
        </div>

        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex md:hidden text-muted-foreground hover:text-foreground transition-colors duration-150 touch-target-lg"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          variant="ghost"
          size="icon"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <div 
        ref={mobileMenuRef}
        className={cn(
          "block md:hidden transition-all duration-150 ease-in-out overflow-hidden",
          isOpen 
            ? 'max-h-[400px] opacity-100' 
            : 'max-h-0 opacity-0'
        )}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="container-wide section-sm bg-background/95 backdrop-blur-sm flex flex-col space-component-sm">
          {navItems.map((item, index) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={cn(
                "py-2 px-3 rounded-md transition-all duration-150 touch-target focus-enhanced",
                activeSection === item.id && isHomePage 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-muted/50'
              )}
              data-delay={index}
              aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
            >
              <span className="inline-flex items-center">
                {item.name}
                <ChevronRight className="ml-auto w-4 h-4" />
              </span>
            </a>
          ))}

          {/* Mobile Segment Links */}
          <div className="border-t border-border/30 pt-2 mt-2">
            <span className="text-xs text-muted-foreground px-3 mb-2 block">Who We Serve</span>
            {segmentLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 rounded-md transition-all duration-150 touch-target focus-enhanced hover:bg-muted/50 block"
              >
                <span className="inline-flex items-center">
                  {link.name}
                  <ChevronRight className="ml-auto w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Resources Link */}
          <Link 
            to={resourceLink.href}
            onClick={() => setIsOpen(false)}
            className="py-2 px-3 rounded-md transition-all duration-150 touch-target focus-enhanced hover:bg-muted/50"
          >
            <span className="inline-flex items-center">
              {resourceLink.name}
              <ChevronRight className="ml-auto w-4 h-4" />
            </span>
          </Link>

          <Button 
            onClick={() => handleNavClick('schedule')}
            className="w-full justify-center group"
            variant="hero"
          >
            <span className="inline-flex items-center gap-2">
              <span>Request Strategy Session</span>
              <ChevronRight size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
