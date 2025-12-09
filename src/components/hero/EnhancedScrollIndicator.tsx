/**
 * EnhancedScrollIndicator - Clean, minimal scroll indicator
 * 
 * CLEANUP APPLIED:
 * - Removed isMobile prop (unnecessary complexity)
 * - Simplified positioning with design tokens
 * - Standardized transitions
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedScrollIndicatorProps {
  onClick: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  label?: string;
  className?: string;
}

const EnhancedScrollIndicator: React.FC<EnhancedScrollIndicatorProps> = ({
  onClick,
  onMouseEnter,
  onFocus,
  label = 'Learn More',
  className,
}) => {
  return (
    <div 
      className={cn(
        'absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2',
        'flex flex-col items-center gap-2',
        className
      )}
    >
      <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase hidden md:block">
        {label}
      </span>
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        aria-label="Scroll to learn more"
        className={cn(
          'w-10 h-10 rounded-full',
          'flex items-center justify-center',
          'border border-border/50 bg-background/50 backdrop-blur-sm',
          'text-muted-foreground hover:text-foreground',
          'transition-all duration-150',
          'hover:scale-105 hover:border-border hover:bg-background/80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
      >
        <ChevronDown className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default EnhancedScrollIndicator;
