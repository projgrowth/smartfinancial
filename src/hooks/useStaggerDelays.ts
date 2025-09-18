import { useMemo } from 'react';
import { useDesignSystemValues } from './useDesignSystemValues';
import { performanceManager } from '../utils/performanceOptimization';

/**
 * Optimized hook to generate staggered animation delays using design system values
 * Includes performance optimizations and reduced motion support
 */
export const useStaggerDelays = (count: number, speed: 'fast' | 'normal' | 'slow' | 'extra-slow' = 'normal') => {
  const designSystem = useDesignSystemValues();
  const prefersReducedMotion = performanceManager.prefersReducedMotion();
  
  return useMemo(() => {
    if (prefersReducedMotion) {
      // Return zero delays for reduced motion
      return Array.from({ length: count }, () => ({
        transitionDelay: '0ms',
        animationDelay: '0ms',
        delay: 0
      }));
    }

    const baseDelay = speed === 'fast' ? 50 : 
                     speed === 'normal' ? 100 : 
                     speed === 'slow' ? 150 : 200;
    
    const optimizedDelay = performanceManager.getOptimalDuration(baseDelay);
    
    return Array.from({ length: count }, (_, index) => ({
      transitionDelay: `${index * optimizedDelay}ms`,
      animationDelay: `${index * optimizedDelay}ms`,
      delay: index * optimizedDelay
    }));
  }, [count, speed, prefersReducedMotion]);
};