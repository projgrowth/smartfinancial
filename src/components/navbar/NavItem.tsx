import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItemType {
  name: string;
  id: string;
  isLink?: boolean;
  path?: string;
}

interface NavItemProps {
  item: NavItemType;
  activeSection: string;
  isHomePage: boolean;
  onNavClick: (sectionId: string) => void;
  className?: string;
}

export const NavItem: React.FC<NavItemProps> = ({ 
  item, 
  activeSection, 
  isHomePage, 
  onNavClick,
  className 
}) => {
  const location = useLocation();

  const baseClasses = "relative px-1 py-1 overflow-hidden text-fluid-sm font-medium transition-colors duration-300 group focus-enhanced";
  
  if (item.isLink) {
    return (
      <Link
        to={item.path || '/'}
        className={cn(
          baseClasses,
          location.pathname === item.path 
            ? "text-primary" 
            : "text-muted-foreground hover:text-foreground",
          className
        )}
        aria-current={location.pathname === item.path ? 'page' : undefined}
      >
        <span className="inline-flex items-center gap-1">
          {item.name === 'Education' && <BookOpen className="icon-sm" />}
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
    );
  }

  return (
    <a 
      href={`#${item.id}`} 
      onClick={(e) => {
        e.preventDefault();
        onNavClick(item.id);
      }}
      className={cn(
        baseClasses,
        activeSection === item.id && isHomePage ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
        className
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
  );
};