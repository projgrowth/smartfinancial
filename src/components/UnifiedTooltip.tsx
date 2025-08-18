import React, { useState, useRef, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { usePreferences } from '@/hooks/usePreferences';

interface UnifiedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  interactive?: boolean;
  className?: string;
  arrowClassName?: string;
}

export function UnifiedTooltip({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 300,
  skipDelayDuration = 300,
  disableHoverableContent = false,
  interactive = false,
  className,
  arrowClassName,
}: UnifiedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const { preferences } = usePreferences();

  // Respect reduced motion preference
  const effectiveDelay = preferences.reducedMotion ? 0 : delayDuration;

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Intent-based hover delay - only show if user hovers for the delay duration
    hoverTimeoutRef.current = setTimeout(() => {
      setShouldShow(true);
      setIsVisible(true);
    }, effectiveDelay);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShouldShow(false);
    setIsVisible(false);
  };

  const handleFocus = () => {
    setShouldShow(true);
    setIsVisible(true);
  };

  const handleBlur = () => {
    setShouldShow(false);
    setIsVisible(false);
  };

  // Don't render tooltip if reduced motion and content is not critical
  if (preferences.reducedMotion && !interactive) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={effectiveDelay} skipDelayDuration={skipDelayDuration}>
      <Tooltip open={shouldShow && isVisible}>
        <TooltipTrigger
          asChild
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
            preferences.reducedMotion && "animate-none",
            className
          )}
          sideOffset={4}
          {...(disableHoverableContent && { 'data-disable-hoverable-content': true })}
        >
          {content}
          {/* Custom arrow styling */}
          <div 
            className={cn(
              "absolute w-2 h-2 bg-popover border rotate-45",
              side === 'top' && "bottom-[-4px] left-1/2 transform -translate-x-1/2 border-b border-r",
              side === 'bottom' && "top-[-4px] left-1/2 transform -translate-x-1/2 border-t border-l",
              side === 'left' && "right-[-4px] top-1/2 transform -translate-y-1/2 border-t border-r",
              side === 'right' && "left-[-4px] top-1/2 transform -translate-y-1/2 border-b border-l",
              arrowClassName
            )}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Simplified version for basic use cases
export function SimpleTooltip({ 
  content, 
  children, 
  ...props 
}: Omit<UnifiedTooltipProps, 'interactive' | 'delayDuration'>) {
  return (
    <UnifiedTooltip content={content} delayDuration={200} {...props}>
      {children}
    </UnifiedTooltip>
  );
}

// Interactive version for complex content
export function InteractiveTooltip({ 
  content, 
  children, 
  ...props 
}: Omit<UnifiedTooltipProps, 'interactive' | 'disableHoverableContent'>) {
  return (
    <UnifiedTooltip 
      content={content} 
      interactive={true} 
      disableHoverableContent={false}
      delayDuration={500}
      {...props}
    >
      {children}
    </UnifiedTooltip>
  );
}