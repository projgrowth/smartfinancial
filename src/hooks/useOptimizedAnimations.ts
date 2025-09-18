import { useCallback, useEffect, useRef, useState } from 'react';
import { performanceManager } from '../utils/performanceOptimization';

interface AnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  respectMotionPreference?: boolean;
}

interface AnimationState {
  isVisible: boolean;
  hasBeenVisible: boolean;
  shouldAnimate: boolean;
}

// Singleton intersection observer manager
class IntersectionManager {
  private static instance: IntersectionManager;
  private observers = new Map<string, IntersectionObserver>();
  private callbacks = new Map<Element, Set<(isIntersecting: boolean) => void>>();

  static getInstance() {
    if (!IntersectionManager.instance) {
      IntersectionManager.instance = new IntersectionManager();
    }
    return IntersectionManager.instance;
  }

  observe(
    element: Element,
    callback: (isIntersecting: boolean) => void,
    options: IntersectionObserverInit = {}
  ) {
    const key = JSON.stringify(options);
    
    if (!this.observers.has(key)) {
      this.observers.set(key, new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const callbacks = this.callbacks.get(entry.target);
            if (callbacks) {
              performanceManager.queueAnimation(() => {
                callbacks.forEach(cb => cb(entry.isIntersecting));
              });
            }
          });
        },
        options
      ));
    }

    const observer = this.observers.get(key)!;
    
    if (!this.callbacks.has(element)) {
      this.callbacks.set(element, new Set());
      observer.observe(element);
    }
    
    this.callbacks.get(element)!.add(callback);

    return () => {
      const callbacks = this.callbacks.get(element);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          observer.unobserve(element);
          this.callbacks.delete(element);
        }
      }
    };
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.callbacks.clear();
  }
}

export function useOptimizedViewportAnimation(config: AnimationConfig = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -10%',
    triggerOnce = true,
    respectMotionPreference = true
  } = config;

  const elementRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<AnimationState>({
    isVisible: false,
    hasBeenVisible: false,
    shouldAnimate: false
  });

  const prefersReducedMotion = respectMotionPreference && 
    performanceManager.prefersReducedMotion();

  const handleIntersection = useCallback((isIntersecting: boolean) => {
    setState(prev => {
      const hasBeenVisible = prev.hasBeenVisible || isIntersecting;
      return {
        isVisible: isIntersecting,
        hasBeenVisible,
        shouldAnimate: !prefersReducedMotion && (triggerOnce ? hasBeenVisible : isIntersecting)
      };
    });
  }, [prefersReducedMotion, triggerOnce]);

  const setRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const manager = IntersectionManager.getInstance();
    const cleanup = manager.observe(
      element,
      handleIntersection,
      { threshold, rootMargin }
    );

    return cleanup;
  }, [threshold, rootMargin, handleIntersection]);

  return {
    ref: setRef,
    ...state,
    // Override for reduced motion
    isVisible: prefersReducedMotion || state.isVisible,
    hasBeenVisible: prefersReducedMotion || state.hasBeenVisible
  };
}

export function useStaggeredAnimations(count: number, baseDelay: number = 100) {
  const prefersReducedMotion = performanceManager.prefersReducedMotion();
  const optimizedDelay = performanceManager.getOptimalDuration(baseDelay);

  return Array.from({ length: count }, (_, index) => ({
    delay: prefersReducedMotion ? 0 : index * optimizedDelay,
    animationDelay: `${prefersReducedMotion ? 0 : index * optimizedDelay}ms`,
    transitionDelay: `${prefersReducedMotion ? 0 : index * optimizedDelay}ms`,
    ...useOptimizedViewportAnimation({ triggerOnce: true })
  }));
}

// Cleanup function for when component unmounts
export function useAnimationCleanup() {
  useEffect(() => {
    return () => {
      IntersectionManager.getInstance().cleanup();
    };
  }, []);
}