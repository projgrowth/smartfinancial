// =============================================================================
// LAZY LOADING COMPONENT - Phase 2: Performance Optimization
// Optimized component lazy loading with intersection observer
// =============================================================================

import React, { lazy, Suspense, ComponentType } from 'react';
import { useIntersectionObserver } from '../hooks/usePerformance';
import { performanceConfig } from '../config/site';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  fallback: Fallback = () => <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>,
  threshold = performanceConfig.lazyLoading.componentThreshold,
  rootMargin = performanceConfig.lazyLoading.imageThreshold,
  triggerOnce = true
}) => {
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  const shouldRender = triggerOnce ? hasIntersected : isIntersecting;

  return (
    <div ref={ref}>
      {shouldRender ? children : <Fallback />}
    </div>
  );
};

// Higher-order component for lazy loading
export function withLazyLoad<P extends object>(
  Component: ComponentType<P>,
  fallback?: ComponentType
) {
  return function LazyComponent(props: P) {
    return (
      <LazyLoad fallback={fallback}>
        <Component {...props} />
      </LazyLoad>
    );
  };
}

// Optimized lazy loading for heavy components
export const lazyLoadComponent = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  fallback?: ComponentType
) => {
  const LazyComponent = lazy(importFunc);
  
  return function OptimizedComponent(props: any) {
    const FallbackComponent = fallback || (() => <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>);
    
    return (
      <LazyLoad fallback={fallback}>
        <Suspense fallback={<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>}>
          <LazyComponent {...props} />
        </Suspense>
      </LazyLoad>
    );
  };
};

// Pre-configured lazy loads for common components
export const LazyTestimonials = lazyLoadComponent(
  () => import('./Testimonials')
);

export const LazyFinancialCalculator = lazyLoadComponent(
  () => import('./FinancialCalculator')
);

export const LazyEnhancedNewsletter = lazyLoadComponent(
  () => import('./EnhancedNewsletter')
);

export const LazyFAQSection = lazyLoadComponent(
  () => import('./FAQSection')
);

export const LazyCaseStudies = lazyLoadComponent(
  () => import('./CaseStudies')
);

export const LazyTeamDetails = lazyLoadComponent(
  () => import('./TeamDetails')
);