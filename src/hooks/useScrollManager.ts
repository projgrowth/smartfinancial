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
    // For Safari mobile, disable custom scroll management to allow native behavior
    if (isSafariMobile()) {
      if (typeof target === 'string') {
        const element = document.getElementById(target);
        if (!element) return;
        
        // Use native scroll behavior for Safari mobile
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      } else {
        // Simple scroll to position for Safari mobile
        window.scrollTo({
          top: target,
          behavior: 'smooth'
        });
      }
      return;
    }

    // Enhanced scroll for other browsers
    const element = typeof target === 'string' 
      ? document.getElementById(target) 
      : null;
    
    const targetPosition = element 
      ? element.getBoundingClientRect().top + window.pageYOffset - offset
      : typeof target === 'number' ? target : 0;

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
    // For Safari mobile, use minimal scroll management to avoid conflicts
    if (isSafariMobile()) {
      // Simple scroll detection without interference
      let scrollTimer: NodeJS.Timeout;
      
      const handleSafariScroll = () => {
        isScrolling.current = true;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          isScrolling.current = false;
        }, 100);
      };
      
      window.addEventListener('scroll', handleSafariScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleSafariScroll);
        clearTimeout(scrollTimer);
      };
    }

    // Enhanced scroll management for other browsers
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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