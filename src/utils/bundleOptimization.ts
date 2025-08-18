// Bundle optimization utilities
import { lazy } from 'react';

// Lazy load heavy components for better performance
export const LazyComponents = {
  FinancialCalculator: lazy(() => import('../components/FinancialCalculator')),
  CompoundInterestCalculator: lazy(() => import('../components/calculators/CompoundInterestCalculator')),
  RetirementCalculator: lazy(() => import('../components/calculators/RetirementCalculator')),
  MeetingScheduler: lazy(() => import('../components/MeetingScheduler'))
};

// Critical components that should not be lazy loaded
export const CriticalComponents = [
  'Hero',
  'Navbar', 
  'Footer',
  'Layout'
];

// Tree-shake optimization for Radix components
export const OptimizedRadixImports = {
  // Only import what we actually use
  Dialog: () => import('@radix-ui/react-dialog'),
  Tooltip: () => import('@radix-ui/react-tooltip'),
  Accordion: () => import('@radix-ui/react-accordion'),
  Select: () => import('@radix-ui/react-select'),
  Checkbox: () => import('@radix-ui/react-checkbox')
};

// Performance monitoring
export const measureBundlePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
    };
  }
  return null;
};

// CSS critical path optimization
export const criticalCSS = {
  // Essential styles that must load immediately
  critical: [
    'base.css',
    'design-system.css'
  ],
  // Non-critical styles that can be deferred
  deferred: [
    'animations/enhanced-interactions.css',
    'animations/background-effects.css',
    'premium-spacing.css'
  ]
};