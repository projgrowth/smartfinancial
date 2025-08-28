// =============================================================================
// PERFORMANCE OPTIMIZATION UTILITIES - Phase 2: Performance Optimization  
// Bundle size reduction, critical CSS, and loading optimizations
// =============================================================================

import { performanceConfig } from '../config/site';

// Critical CSS optimization
export function loadCriticalCSS() {
  const criticalStyles = `
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: Inter, sans-serif; }
    .container-site { max-width: 90rem; margin: 0 auto; padding: 0 clamp(1rem, 3vw, 2rem); }
    .heading-display-fluid { 
      font-size: clamp(2.25rem, 4.5vw + 0.75rem, 4.5rem);
      line-height: clamp(1.05, 1 + 0.05vw, 1.08);
      font-weight: 500;
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.textContent = criticalStyles;
  document.head.appendChild(styleElement);
}

// Preload critical resources
export function preloadCriticalResources() {
  const resources = [
    { href: '/fonts/inter-variable.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { href: '/fonts/space-grotesk-variable.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
  ];

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    document.head.appendChild(link);
  });
}

// Optimize images with intersection observer
export class ImageOptimizer {
  private observer: IntersectionObserver;
  
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.optimizeImage(img);
            this.observer.unobserve(img);
          }
        });
      },
      { rootMargin: performanceConfig.lazyLoading.imageThreshold }
    );
  }

  observe(img: HTMLImageElement) {
    if (!img.src && img.dataset.src) {
      this.observer.observe(img);
    }
  }

  private optimizeImage(img: HTMLImageElement) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.onload = () => img.classList.add('loaded');
    }
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// Bundle splitting utilities
export const modulePreloader = {
  preloadModule: async (moduleId: string) => {
    try {
      switch (moduleId) {
        case 'testimonials':
          return import('../components/Testimonials');
        case 'calculator':
          return import('../components/FinancialCalculator');
        case 'newsletter':
          return import('../components/EnhancedNewsletter');
        case 'faq':
          return import('../components/FAQSection');
        case 'case-studies':
          return import('../components/CaseStudies');
        default:
          console.warn(`Unknown module: ${moduleId}`);
      }
    } catch (error) {
      console.error(`Failed to preload module ${moduleId}:`, error);
    }
  },

  preloadOnHover: (element: HTMLElement, moduleId: string) => {
    let preloaded = false;
    const preload = () => {
      if (!preloaded) {
        preloaded = true;
        modulePreloader.preloadModule(moduleId);
      }
    };

    element.addEventListener('mouseenter', preload, { once: true });
    element.addEventListener('touchstart', preload, { once: true });
  }
};

// Memory optimization
export class MemoryOptimizer {
  private cleanupTasks: (() => void)[] = [];
  
  addCleanupTask(task: () => void) {
    this.cleanupTasks.push(task);
  }
  
  cleanup() {
    this.cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.error('Cleanup task failed:', error);
      }
    });
    this.cleanupTasks = [];
  }
  
  // Auto-cleanup based on memory pressure
  enableAutoCleanup() {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memInfo = (performance as any).memory;
        if (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize > 0.8) {
          this.cleanup();
        }
      };
      
      setInterval(checkMemory, 30000); // Check every 30 seconds
    }
  }
}

// Performance monitoring
export const performanceMonitor = {
  // Critical Web Vitals tracking
  measureCLS: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            resolve(entry.value);
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    });
  },

  measureLCP: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  },

  measureFID: () => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          resolve(entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });
    });
  },

  // Log performance issues in development
  logPerformanceIssues: () => {
    if (process.env.NODE_ENV === 'development') {
      // Log long tasks
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          console.warn(`Long task detected: ${entry.duration}ms`);
        });
      }).observe({ entryTypes: ['longtask'] });
    }
  }
};

// Initialize performance optimizations
export function initializePerformanceOptimizations() {
  // Load critical CSS immediately
  loadCriticalCSS();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Initialize image optimizer
  const imageOptimizer = new ImageOptimizer();
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageOptimizer.observe(img as HTMLImageElement);
  });
  
  // Initialize memory optimizer
  const memoryOptimizer = new MemoryOptimizer();
  memoryOptimizer.enableAutoCleanup();
  
  // Start performance monitoring
  performanceMonitor.logPerformanceIssues();
  
  return {
    imageOptimizer,
    memoryOptimizer,
    cleanup: () => {
      imageOptimizer.disconnect();
      memoryOptimizer.cleanup();
    }
  };
}