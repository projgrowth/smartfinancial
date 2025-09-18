import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/ui/enhanced-animations';
import { useDesignSystemValues } from '@/hooks/useDesignSystemValues';
import useNavigateSection from '@/hooks/useNavigateSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { navigation, company } from '@/data/content';
import { smoothScrollTo } from '@/utils/smoothScroll';

interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigateToSection = useNavigateSection();
  const { transitionNormal, animationDelayFast } = useDesignSystemValues();

  const isHomePage = location.pathname === '/';

  // Enhanced scroll detection with performance optimization
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          
          // Update active section on home page
          if (isHomePage) {
            const sections = ['intro', 'services', 'process', 'team'];
            const current = sections.find(section => {
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                return rect.top <= 150 && rect.bottom >= 150;
              }
              return false;
            });
            
            if (current && current !== activeSection) {
              setActiveSection(current);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, activeSection]);

  // Enhanced navigation handler
  const handleNavigation = useCallback((href: string, isExternal?: boolean) => {
    if (isExternal) return;
    
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const sectionId = href.slice(1);
      if (isHomePage) {
        smoothScrollTo(sectionId);
      } else {
        navigateToSection(sectionId);
      }
    }
  }, [isHomePage, navigateToSection]);

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  // Memoized navigation items
  const navItems: NavigationItem[] = useMemo(() => [
    ...navigation.main,
    { label: 'Contact', href: '#schedule' }
  ], []);

  // Enhanced focus management for mobile menu
  useEffect(() => {
    if (isOpen && isMobile) {
      const firstFocusable = document.querySelector('#mobile-menu button') as HTMLElement;
      firstFocusable?.focus();
    }
  }, [isOpen, isMobile]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm' 
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <RevealOnScroll direction="fade" duration={600} delay={0}>
          <nav 
            className="container-site h-nav-height flex items-center justify-between"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Enhanced Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              aria-label={`${company.name} - Home`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  Smart Financial
                </span>
                <div className="text-xs text-muted-foreground leading-none mt-0.5">
                  Planning
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.slice(0, -1).map((item, index) => {
                const isActive = isHomePage && activeSection === item.href.slice(1);
                const isEducation = item.href === '/education' && location.pathname === '/education';
                
                return (
                  <div key={item.label} style={{ animationDelay: `${index * 50}ms` }}>
                    {item.href.startsWith('#') ? (
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                          isActive 
                            ? 'text-primary bg-primary/10' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                        )}
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                          isEducation 
                            ? 'text-primary bg-primary/10' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        aria-current={isEducation ? 'page' : undefined}
                      >
                        {item.label}
                        {isEducation && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
              
              <div className="ml-4 pl-4 border-l border-border/50">
                <Button 
                  onClick={() => handleNavigation('#schedule')}
                  variant="premium"
                  size="sm"
                  className="hover-glow"
                >
                  Schedule Call
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden relative p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <div className="relative w-5 h-5">
                <Menu 
                  className={`absolute inset-0 transition-all duration-200 ${
                    isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 transition-all duration-200 ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`} 
                />
              </div>
            </Button>
          </nav>
        </RevealOnScroll>
      </header>

      {/* Enhanced Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          id="mobile-menu"
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="menu"
          onKeyDown={handleKeyDown}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">S</span>
                </div>
                <span className="font-semibold text-foreground">Smart Financial</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-2 px-6">
                {navItems.map((item, index) => {
                  const isActive = isHomePage && activeSection === item.href.slice(1);
                  const isEducation = item.href === '/education' && location.pathname === '/education';
                  
                  return (
                    <div 
                      key={item.label}
                      className="animate-fade-in"
                      style={{ 
                        animationDelay: `${index * 50 + 100}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {item.href.startsWith('#') ? (
                        <button
                          onClick={() => handleNavigation(item.href)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive 
                              ? 'text-primary bg-primary/10 border border-primary/20' 
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
                          }`}
                          role="menuitem"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isEducation 
                              ? 'text-primary bg-primary/10 border border-primary/20' 
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
                          }`}
                          role="menuitem"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="p-6 border-t border-border">
              <Button 
                onClick={() => handleNavigation('#schedule')}
                variant="premium"
                size="lg"
                className="w-full hover-glow"
              >
                Schedule Your Call
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Ready to take control of your financial future?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;