import { useEffect, useRef, useCallback } from 'react';

interface ScrollManagerOptions {
  enableMomentum?: boolean;
  snapToSections?: boolean;
  progressCallback?: (progress: number) => void;
}

export function useScrollManager({
  enableMomentum = true,
  snapToSections = false,
  progressCallback
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

    // Enhanced easing with momentum
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
  }, []);

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
    // Use passive listener for better performance
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