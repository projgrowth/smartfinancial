import { useEffect, useRef, useState, useCallback } from 'react';

interface ViewportAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  respectsMotionPreference?: boolean;
}

interface AnimationManager {
  observers: Map<Element, IntersectionObserver>;
  rafId: number | null;
  animationQueue: (() => void)[];
}

const animationManager: AnimationManager = {
  observers: new Map(),
  rafId: null,
  animationQueue: []
};

export function useViewportAnimations({
  threshold = 0.1,
  rootMargin = '0px 0px -10%',
  triggerOnce = true,
  staggerDelay = 100,
  respectsMotionPreference = true
}: ViewportAnimationOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const prefersReducedMotion = respectsMotionPreference && 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scheduleAnimation = useCallback((callback: () => void) => {
    if (prefersReducedMotion) {
      callback();
      return;
    }

    animationManager.animationQueue.push(callback);
    
    if (!animationManager.rafId) {
      animationManager.rafId = requestAnimationFrame(() => {
        const batch = animationManager.animationQueue.splice(0, 3); // Process 3 at a time
        batch.forEach(cb => cb());
        animationManager.rafId = null;
        
        if (animationManager.animationQueue.length > 0) {
          setTimeout(() => {
            if (animationManager.animationQueue.length > 0) {
              animationManager.rafId = requestAnimationFrame(() => {
                const nextBatch = animationManager.animationQueue.splice(0, 3);
                nextBatch.forEach(cb => cb());
                animationManager.rafId = null;
              });
            }
          }, 16); // ~60fps
        }
      });
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Reuse existing observer if possible
    const existingObserver = animationManager.observers.get(element);
    if (existingObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          scheduleAnimation(() => {
            setIsVisible(entry.isIntersecting);
            
            if (entry.isIntersecting && !hasBeenVisible) {
              setHasBeenVisible(true);
              
              if (triggerOnce) {
                observer.unobserve(element);
                animationManager.observers.delete(element);
              }
            }
          });
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    animationManager.observers.set(element, observer);

    return () => {
      observer.unobserve(element);
      animationManager.observers.delete(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenVisible, scheduleAnimation]);

  return {
    ref,
    isVisible: prefersReducedMotion || isVisible,
    hasBeenVisible: prefersReducedMotion || hasBeenVisible,
    shouldAnimate: !prefersReducedMotion && (triggerOnce ? hasBeenVisible : isVisible)
  };
}

export function useStaggeredViewportAnimations(
  itemCount: number,
  baseDelay: number = 100
) {
  return Array.from({ length: itemCount }, (_, index) => ({
    delay: index * baseDelay,
    ...useViewportAnimations({
      triggerOnce: true,
      staggerDelay: baseDelay
    })
  }));
}