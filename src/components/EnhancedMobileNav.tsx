import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, BookOpen, Home, Users, Briefcase, MessageCircle, Calculator } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import PrimaryButton from './PrimaryButton';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  id: string;
  icon: React.ReactNode;
  isLink?: boolean;
  path?: string;
}

const EnhancedMobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
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
  }, [isHomePage]);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (isHomePage) {
      smoothScrollTo(sectionId);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const navItems: NavItem[] = [
    { name: 'Home', id: 'hero', icon: <Home className="w-5 h-5" /> },
    { name: 'Services', id: 'services', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Process', id: 'process', icon: <Users className="w-5 h-5" /> },
    { name: 'Case Studies', id: 'case-studies', icon: <MessageCircle className="w-5 h-5" /> },
    { name: 'Team', id: 'team', icon: <Users className="w-5 h-5" /> },
    { name: 'Testimonials', id: 'testimonials', icon: <MessageCircle className="w-5 h-5" /> },
    { name: 'Calculators', id: 'calculators', icon: <Calculator className="w-5 h-5" /> },
    { name: 'Education', id: 'education', icon: <BookOpen className="w-5 h-5" />, isLink: true, path: '/education' }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.mobile-nav-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav-container md:hidden">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={cn(
          "relative z-50 p-2 rounded-lg transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          "hover:bg-primary/5 active:scale-95",
          isOpen 
            ? "text-card-foreground bg-card/90 backdrop-blur-sm shadow-md" 
            : "text-foreground hover:text-primary"
        )}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative w-6 h-6">
          <span
            className={cn(
              "absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
              isOpen ? "rotate-45 top-3" : "top-1"
            )}
          />
          <span
            className={cn(
              "absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out top-3",
              isOpen ? "opacity-0" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
              isOpen ? "-rotate-45 top-3" : "top-5"
            )}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-card/95 backdrop-blur-lg z-40",
          "transform transition-transform duration-300 ease-in-out shadow-xl border-l",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-heading font-medium text-card-foreground">
              Navigation
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={item.id}
                  className="transform transition-all duration-300 ease-out"
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  {item.isLink ? (
                    <Link
                      to={item.path || '/'}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                        "hover:bg-primary/10 hover:text-primary group",
                        location.pathname === item.path 
                          ? "bg-primary/10 text-primary" 
                          : "text-card-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="transition-transform group-hover:scale-110">
                        {item.icon}
                      </div>
                      <span className="font-medium flex-1">{item.name}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                        "hover:bg-primary/10 hover:text-primary group text-left",
                        activeSection === item.id && isHomePage 
                          ? "bg-primary/10 text-primary" 
                          : "text-card-foreground"
                      )}
                    >
                      <div className="transition-transform group-hover:scale-110">
                        {item.icon}
                      </div>
                      <span className="font-medium flex-1">{item.name}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer CTA */}
          <div className="p-4 border-t bg-muted/20">
            <PrimaryButton 
              onClick={() => handleNavClick('contact')}
              className="w-full justify-center group"
              icon={<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              iconPosition="right"
            >
              Schedule a Call
            </PrimaryButton>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">
                Free consultation • No obligation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMobileNav;