import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useStaggerDelays } from '@/hooks/useStaggerDelays';
import { NavItemType } from './NavItem';

interface MobileMenuProps {
  isOpen: boolean;
  isMobile: boolean;
  navItems: NavItemType[];
  activeSection: string;
  isHomePage: boolean;
  onNavClick: (sectionId: string) => void;
  onClose: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isMobile,
  navItems,
  activeSection,
  isHomePage,
  onNavClick,
  onClose,
  mobileMenuRef
}) => {
  const location = useLocation();
  const staggerDelays = useStaggerDelays(navItems.length, 'fast');

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId);
    onClose();
  };

  return (
    <div 
      ref={mobileMenuRef}
      className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isMobile ? "block" : "hidden",
        isOpen 
          ? 'max-h-[400px] opacity-100' 
          : 'max-h-0 opacity-0'
      )}
      role="navigation"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div className="container-site section-sm bg-background/95 backdrop-blur-sm flex flex-col space-site-md">
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
                transitionDelay: staggerDelays[index]?.transitionDelay || '0ms',
                animationDelay: staggerDelays[index]?.animationDelay || '0ms'
              }}
              onClick={onClose}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <span className="inline-flex items-center gap-2">
                {item.name === 'Education' && <BookOpen className="icon-sm" />}
                {item.name}
              </span>
              <ChevronRight className="ml-auto icon-sm" />
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
                transitionDelay: staggerDelays[index]?.transitionDelay || '0ms',
                animationDelay: staggerDelays[index]?.animationDelay || '0ms'
              }}
              aria-current={activeSection === item.id && isHomePage ? 'page' : undefined}
            >
              <span className="inline-flex items-center">
                {item.name}
                <ChevronRight className="ml-auto icon-sm" />
              </span>
            </a>
          )
        )}
        <Button 
          onClick={() => handleNavClick('schedule')}
          className="w-full justify-center group hover-glow spring-bounce"
          variant="premium"
        >
          <span className="inline-flex items-center">
            <span>Schedule a Call</span>
            <ChevronRight className="ml-2 icon-sm transition-transform duration-normal group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Button>
      </div>
    </div>
  );
};