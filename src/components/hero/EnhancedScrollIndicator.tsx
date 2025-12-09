import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedScrollIndicatorProps {
  onClick: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  label?: string;
  className?: string;
  isMobile?: boolean;
}

const EnhancedScrollIndicator: React.FC<EnhancedScrollIndicatorProps> = ({
  onClick,
  onMouseEnter,
  onFocus,
  label = 'Discover How',
  className,
  isMobile = false,
}) => {
  return (
    <div 
      className={cn(
        'absolute bottom-[calc(2rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]',
        'left-1/2 -translate-x-1/2 flex flex-col items-center gap-2',
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
        aria-label="Scroll to schedule section"
        className={cn(
          'w-11 h-11 rounded-full',
          'flex items-center justify-center',
          'border border-border/50',
          'text-muted-foreground hover:text-foreground',
          'transition-all duration-150',
          'hover:scale-105 hover:border-border',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isMobile && 'scale-90 opacity-70'
        )}
      >
        <ChevronRight 
          className="w-5 h-5 rotate-90" 
          aria-hidden="true" 
        />
      </button>
    </div>
  );
};

export default EnhancedScrollIndicator;