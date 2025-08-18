import { useEffect, useRef, useCallback } from 'react';
import { isSafariMobile, needsSafariScrollFixes, supportsSmoothScrolling } from '@/utils/safariDetection';

interface ScrollManagerOptions {
  enableMomentum?: boolean;
  snapToSections?: boolean;
  progressCallback?: (progress: number) => void;
  safariOptimized?: boolean;
}

export function useScrollManager({
  enableMomentum = true,
  snapToSections = false,
  progressCallback,
  safariOptimized = true
}: ScrollManagerOptions = {}) {
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const isScrolling = useRef(false);
  const lastScrollTop = useRef(0);
  const scrollVelocity = useRef(0);

  const smoothScrollTo = useCallback((target: string | number, offset: number = 80) => {
    const element = typeof target === 'string' 
      ? document.getElementById(target) 
      : null;
    
    const targetPosition = element 
      ? element.getBoundingClientRect().top + window.pageYOffset - offset
      : typeof target === 'number' ? target : 0;

    // Safari-specific optimization
    if (safariOptimized && isSafariMobile()) {
      // Use Safari's native smooth scrolling when available
      if (supportsSmoothScrolling() && element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        return;
      }
      
      // Safari-optimized custom scroll with momentum preservation
      const start = window.pageYOffset;
      const distance = targetPosition - start;
      const duration = Math.min(Math.abs(distance) / 3, 800); // Shorter duration for Safari
      let startTime: number;

      const safariEasing = (t: number): number => {
        // Optimized easing for Safari momentum
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = safariEasing(progress);
        
        window.scrollTo(0, start + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      return;
    }

    // Enhanced easing with momentum for other browsers
    const start = window.pageYOffset;
    const distance = targetPosition - start;
    const duration = Math.min(Math.abs(distance) / 2, 1000);
    let startTime: number;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, start + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [safariOptimized]);

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = currentScrollTop / documentHeight;

    // Calculate scroll velocity
    scrollVelocity.current = currentScrollTop - lastScrollTop.current;
    lastScrollTop.current = currentScrollTop;

    // Progress callback
    progressCallback?.(progress);

    // Set scrolling state
    isScrolling.current = true;
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
      scrollVelocity.current = 0;
    }, 150);
  }, [progressCallback]);

  useEffect(() => {
    // Safari-specific event listener options
    const listenerOptions = isSafariMobile() 
      ? { passive: true, capture: false }
      : { passive: true };
    
    window.addEventListener('scroll', handleScroll, listenerOptions);
    
    // Safari-specific: Add momentum scroll end detection
    if (isSafariMobile()) {
      let momentumTimeout: NodeJS.Timeout;
      const handleMomentumEnd = () => {
        clearTimeout(momentumTimeout);
        momentumTimeout = setTimeout(() => {
          isScrolling.current = false;
          scrollVelocity.current = 0;
        }, 300); // Longer timeout for Safari momentum
      };
      
      window.addEventListener('touchend', handleMomentumEnd, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('touchend', handleMomentumEnd);
        clearTimeout(scrollTimeout.current);
        clearTimeout(momentumTimeout);
      };
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [handleScroll]);

  return {
    smoothScrollTo,
    isScrolling: isScrolling.current,
    scrollVelocity: scrollVelocity.current
  };
}