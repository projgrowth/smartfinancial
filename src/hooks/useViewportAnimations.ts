import { useEffect, useRef, useState, useCallback } from 'react';
import { performanceManager } from '../utils/performanceOptimization';

interface ViewportAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  respectsMotionPreference?: boolean;
}

// Optimized animation manager with performance improvements
class OptimizedAnimationManager {
  private static instance: OptimizedAnimationManager;
  private observers = new Map<Element, IntersectionObserver>();
  private animationQueue: (() => void)[] = [];
  private rafId: number | null = null;

  static getInstance() {
    if (!OptimizedAnimationManager.instance) {
      OptimizedAnimationManager.instance = new OptimizedAnimationManager();
    }
    return OptimizedAnimationManager.instance;
  }

  queueAnimation(callback: () => void) {
    performanceManager.queueAnimation(callback);
  }

  observeElement(element: Element, observer: IntersectionObserver) {
    // Clean up existing observer
    const existingObserver = this.observers.get(element);
    if (existingObserver) {
      existingObserver.unobserve(element);
    }
    
    this.observers.set(element, observer);
    observer.observe(element);
  }

  unobserveElement(element: Element) {
    const observer = this.observers.get(element);
    if (observer) {
      observer.unobserve(element);
      this.observers.delete(element);
    }
  }

  cleanup() {
    this.observers.forEach((observer, element) => {
      observer.unobserve(element);
    });
    this.observers.clear();
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.animationQueue.length = 0;
  }
}

const animationManager = OptimizedAnimationManager.getInstance();

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
    performanceManager.prefersReducedMotion();

  const scheduleAnimation = useCallback((callback: () => void) => {
    if (prefersReducedMotion) {
      callback();
      return;
    }

    animationManager.queueAnimation(callback);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          scheduleAnimation(() => {
            setIsVisible(entry.isIntersecting);
            
            if (entry.isIntersecting && !hasBeenVisible) {
              setHasBeenVisible(true);
              
              if (triggerOnce) {
                animationManager.unobserveElement(element);
              }
            }
          });
        });
      },
      { threshold, rootMargin }
    );

    animationManager.observeElement(element, observer);

    return () => {
      animationManager.unobserveElement(element);
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