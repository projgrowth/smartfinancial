import { useMemo } from 'react';
import { useDesignSystemValues } from './useDesignSystemValues';

/**
 * Custom hook to generate staggered animation delays using design system values
 * Centralizes stagger logic and prevents hardcoded delay calculations
 */
export const useStaggerDelays = (count: number, speed: 'fast' | 'normal' | 'slow' | 'extra-slow' = 'normal') => {
  const designSystem = useDesignSystemValues();
  
  return useMemo(() => {
    const baseDelay = speed === 'fast' ? 50 : 
                     speed === 'normal' ? 100 : 
                     speed === 'slow' ? 150 : 200;
    
    return Array.from({ length: count }, (_, index) => ({
      transitionDelay: `${index * baseDelay}ms`,
      animationDelay: `${index * baseDelay}ms`,
      delay: index * baseDelay
    }));
  }, [count, speed]);
};