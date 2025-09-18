
import React, { useCallback } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useNavigateSection from '@/hooks/useNavigateSection';
import { useNavbarState } from '@/hooks/useNavbarState';
import { useActiveSection } from '@/hooks/useActiveSection';
import { NavItem } from './navbar/NavItem';
import { MobileMenu } from './navbar/MobileMenu';
import type { NavItemType } from './navbar/NavItem';

const Navbar = () => {
  const {
    navRef,
    mobileMenuRef,
    isOpen,
    setIsOpen,
    isScrolled,
    location,
    isMobile,
    handleKeyDown,
  } = useNavbarState();

  const isHomePage = location.pathname === '/';
  const navigateToSection = useNavigateSection();
  const { activeSection, intersectionRef } = useActiveSection(isHomePage);

  const handleNavClick = useCallback((sectionId: string) => {
    setIsOpen(false);
    navigateToSection(sectionId);
  }, [navigateToSection, setIsOpen]);

  const navItems: NavItemType[] = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Case Studies', id: 'case-studies' },
    { name: 'Team', id: 'team' },
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
      <div className="container-site flex justify-between items-center">
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
          className={cn(
            "items-center gap-unified-md",
            isMobile ? "hidden" : "flex"
          )}
          role="navigation"
          aria-label="Desktop navigation"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              activeSection={activeSection}
              isHomePage={isHomePage}
              onNavClick={handleNavClick}
            />
          ))}
          
          <Button 
            onClick={() => handleNavClick('schedule')}
            className="group hover-glow spring-bounce shadow-design-lg"
            size="sm"
            variant="premium"
          >
            <span className="inline-flex items-center">
              <span>Schedule a Call</span>
              <ChevronRight className="card-gap-sm icon-sm transition-transform duration-normal group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Button>
        </div>

        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors duration-300 touch-target focus-visible-only",
            isMobile ? "flex" : "hidden"
          )}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
          variant="ghost"
          size="icon"
        >
          {isOpen ? <X className="icon-lg" /> : <Menu className="icon-lg" />}
        </Button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        isMobile={isMobile}
        navItems={navItems}
        activeSection={activeSection}
        isHomePage={isHomePage}
        onNavClick={handleNavClick}
        onClose={() => setIsOpen(false)}
        mobileMenuRef={mobileMenuRef}
        id="mobile-menu"
      />
    </nav>
  );
};

export default Navbar;
