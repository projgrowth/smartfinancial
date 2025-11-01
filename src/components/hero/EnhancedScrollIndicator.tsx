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
      <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase hidden md:block animate-fade-in">
        {label}
      </span>
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        aria-label="Scroll to schedule section"
        className={cn(
          'relative group',
          'min-h-[44px] min-w-[44px] rounded-full',
          'flex items-center justify-center',
          'text-muted-foreground hover:text-foreground',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isMobile && 'scale-90 opacity-70'
        )}
      >
        {/* Pulsing ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-muted-foreground/20 animate-ping"
          style={{
            animationDuration: '3s',
            animationIterationCount: 'infinite',
          }}
          aria-hidden="true"
        />
        
        {/* Static ring */}
        <div 
          className="absolute inset-0 rounded-full border border-muted-foreground/10 group-hover:border-muted-foreground/30 transition-colors"
          aria-hidden="true"
        />
        
        {/* Icon */}
        <ChevronRight 
          className="w-6 h-6 rotate-90 relative z-10 transition-transform group-hover:translate-y-0.5" 
          aria-hidden="true" 
        />
      </button>
    </div>
  );
};

export default EnhancedScrollIndicator;
