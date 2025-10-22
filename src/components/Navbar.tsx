
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronRight, BookOpen, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import useNavigateSection from '@/hooks/useNavigateSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface NavItem {
  name: string;
  id: string;
  isLink?: boolean;
  path?: string;
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
      // Only set initial once if not set
      if (!root.style.getPropertyValue('--nav-h-initial')) {
        root.style.setProperty('--nav-h-initial', `${h}px`);
      }
    };

    // Initial set
    updateNavHeight();

    // ResizeObserver to track any nav size changes (menu open, font load, breakpoint)
    const ro = new ResizeObserver(() => updateNavHeight());
    if (navRef.current) ro.observe(navRef.current);

    // Update on window resize as a fallback
    window.addEventListener('resize', updateNavHeight);

    // Update after fonts load to avoid jumps
    const fontsReady = (document as any).fonts?.ready as Promise<void> | undefined;
    fontsReady?.then(() => updateNavHeight()).catch(() => updateNavHeight());

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateNavHeight);
    };
  }, [isOpen, isScrolled, location.pathname]);
  // Optimized scroll handling with intersection observer awareness
  useEffect(() => {
    if (!navIsVisible) return; // Don't run when nav is not visible
    
    let ticking = false;

    const measureAndSet = () => {
      // Update scrolled state
      setIsScrolled(window.scrollY > 10);

      // Only compute active section on home page
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

    // Initial measurement
    measureAndSet();

    window.addEventListener('scroll', onScroll as any, { passive: true } as any);
    return () => {
      window.removeEventListener('scroll', onScroll as any);
    };
  }, [isHomePage, navIsVisible]);

  // Enhanced navigation with focus management
  const handleNavClick = useCallback((sectionId: string) => {
    setIsOpen(false);
    navigateToSection(sectionId);
  }, [navigateToSection]);

  // Keyboard navigation for mobile menu
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      setIsOpen(false);
      // Return focus to menu button
      const menuButton = document.querySelector('[aria-expanded="true"]') as HTMLElement;
      menuButton?.focus();
    }
  }, [isOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector('a, button') as HTMLElement;
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const mainNavItems: NavItem[] = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Team', id: 'team' },
    { name: 'Schedule', id: 'schedule' }
  ];

  const navItems: NavItem[] = [
    ...mainNavItems,
    { name: 'RSVP', id: 'rsvp', isLink: true, path: '/rsvp' },
    { name: 'Education', id: 'education', isLink: true, path: '/education' }
  ];

  return (
    <nav 
      ref={(el) => {
        navRef.current = el;
        intersectionRef.current = el;
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm section-sm' 
          : 'bg-transparent border-b border-border section-sm'
      )}
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div className="container-unified flex justify-between items-center">
        <Link 
          to="/"
          className="font-heading text-foreground text-fluid-xl font-medium tracking-tight hover:text-primary transition-colors duration-300 focus-enhanced"
          aria-label="Back to home"
        >
          <span className="inline-flex items-center">
            Smart Financial Planning
          </span>
        </Link>

        <div 
          className="hidden md:flex items-center gap-unified-md"
          role="navigation"
          aria-label="Desktop navigation"
        >
          {navItems.map((item, index) => 
            item.isLink ? (
              <Link
                key={item.id}
                to={item.path || '/'}
                className={cn(
                  "relative px-1 py-1 overflow-hidden text-fluid-sm font-medium transition-colors duration-300 group focus-enhanced",
                  location.pathname === item.path 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {item.name === 'RSVP' && <Calendar className="w-3.5 h-3.5" />}
                  {item.name === 'Education' && <BookOpen className="w-3.5 h-3.5" />}
                  {item.name}
                </span>
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-300",
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
                className={cn(
                  "relative px-1 py-1 overflow-hidden text-fluid-sm font-medium transition-colors duration-300 group focus-enhanced",
                  activeSection === item.id && isHomePage ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
              >
                {item.name}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-300",
                    activeSection === item.id && isHomePage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )} 
                  aria-hidden="true"
                />
              </a>
            )
          )}
          <Button 
             onClick={() => handleNavClick('schedule')}
            className="group"
            size="sm"
            variant="hero"
          >
            <span className="inline-flex items-center">
              <span>Schedule a Call</span>
              <ChevronRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Button>
        </div>

        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex md:hidden text-muted-foreground hover:text-foreground transition-colors duration-300 touch-target-lg"
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
          "block md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isOpen 
            ? 'max-h-[400px] opacity-100' 
            : 'max-h-0 opacity-0'
        )}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="container-unified section-sm bg-background/95 backdrop-blur-sm flex flex-col space-component-sm">
          {navItems.map((item, index) => 
            item.isLink ? (
              <Link
                key={item.id}
                to={item.path || '/'}
                className={cn(
                  "py-2 px-3 rounded-md transition-all duration-300 flex items-center touch-target focus-enhanced",
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted/50"
                )}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  animationDelay: `${index * 50}ms`
                }}
                onClick={() => setIsOpen(false)}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="inline-flex items-center gap-2">
                  {item.name === 'RSVP' && <Calendar className="w-4 h-4" />}
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
                className={cn(
                  "py-2 px-3 rounded-md transition-all duration-300 touch-target focus-enhanced",
                  activeSection === item.id && isHomePage 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted/50'
                )}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  animationDelay: `${index * 50}ms`
                }}
                aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
              >
                <span className="inline-flex items-center">
                  {item.name}
                  <ChevronRight className="ml-auto w-4 h-4" />
                </span>
              </a>
            )
          )}
          <Button 
            onClick={() => handleNavClick('schedule')}
            className="w-full justify-center group"
            variant="hero"
          >
            <span className="inline-flex items-center">
              <span>Schedule a Call</span>
              <ChevronRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
