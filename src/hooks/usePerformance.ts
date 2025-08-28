// =============================================================================
// PERFORMANCE OPTIMIZATION HOOK - Phase 2: Performance Optimization
// Centralized performance monitoring and optimization utilities
// =============================================================================

import { useCallback, useEffect, useState, useRef } from 'react';
import { performanceConfig, ANIMATION_TIMINGS } from '../config/site';

interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
}

export function usePerformance(componentName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
  });
  
  const renderTimes = useRef<number[]>([]);
  const startTime = useRef<number>(0);

  // Start performance measurement
  const startMeasurement = useCallback(() => {
    startTime.current = performance.now();
  }, []);

  // End performance measurement
  const endMeasurement = useCallback(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    renderTimes.current.push(renderTime);
    
    // Keep only last 10 measurements for average
    if (renderTimes.current.length > 10) {
      renderTimes.current.shift();
    }
    
    const averageRenderTime = renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length;
    
    setMetrics(prev => ({
      renderCount: prev.renderCount + 1,
      lastRenderTime: renderTime,
      averageRenderTime,
    }));
    
    // Log slow renders in development
    if (process.env.NODE_ENV === 'development' && renderTime > 16) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  }, [componentName]);

  return {
    metrics,
    startMeasurement,
    endMeasurement,
  };
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useOptimizedAnimation(duration: keyof typeof ANIMATION_TIMINGS = 'NORMAL') {
  const prefersReducedMotion = useReducedMotion();
  
  return {
    duration: prefersReducedMotion ? 0 : ANIMATION_TIMINGS[duration],
    shouldAnimate: !prefersReducedMotion && performanceConfig.animations.reducedMotionFallback,
  };
}

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setElement = useCallback((element: HTMLElement | null) => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }

    elementRef.current = element;

    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: performanceConfig.intersectionThreshold,
        ...options,
      }
    );

    observerRef.current.observe(element);
  }, [hasIntersected, options]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    ref: setElement,
    isIntersecting,
    hasIntersected,
  };
}

// Memory optimization utilities
export function useMemoryOptimization() {
  const cleanupTasks = useRef<(() => void)[]>([]);

  const addCleanupTask = useCallback((task: () => void) => {
    cleanupTasks.current.push(task);
  }, []);

  const cleanup = useCallback(() => {
    cleanupTasks.current.forEach(task => task());
    cleanupTasks.current = [];
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { addCleanupTask, cleanup };
}
