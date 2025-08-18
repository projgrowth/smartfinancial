// Performance optimization utilities for smooth animations and interactions

export interface PerformanceConfig {
  maxAnimationsPerFrame: number;
  throttleDelay: number;
  debounceDelay: number;
}

const defaultConfig: PerformanceConfig = {
  maxAnimationsPerFrame: 3,
  throttleDelay: 16, // ~60fps
  debounceDelay: 150
};

class PerformanceManager {
  private config: PerformanceConfig;
  private animationQueue: (() => void)[] = [];
  private rafId: number | null = null;
  private isProcessing = false;

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  // Throttle function calls to maintain 60fps
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.config.throttleDelay
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }

  // Debounce function calls
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.config.debounceDelay
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // Queue animations for optimal performance
  queueAnimation(callback: () => void): void {
    this.animationQueue.push(callback);
    this.processQueue();
  }

  private processQueue(): void {
    if (this.isProcessing || this.animationQueue.length === 0) return;

    this.isProcessing = true;
    this.rafId = requestAnimationFrame(() => {
      const batch = this.animationQueue.splice(0, this.config.maxAnimationsPerFrame);
      batch.forEach(callback => {
        try {
          callback();
        } catch (error) {
          console.warn('Animation callback error:', error);
        }
      });

      this.isProcessing = false;
      
      // Process next batch if queue has items
      if (this.animationQueue.length > 0) {
        setTimeout(() => this.processQueue(), this.config.throttleDelay);
      }
    });
  }

  // Check if device supports smooth scrolling
  supportsSmoothScroll(): boolean {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Detect if user prefers reduced motion
  prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Get optimal animation duration based on device capabilities
  getOptimalDuration(baseDuration: number): number {
    if (this.prefersReducedMotion()) return 0;
    
    // Reduce duration on slower devices
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    return isSlowDevice ? baseDuration * 0.7 : baseDuration;
  }

  // Clean up resources
  cleanup(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.animationQueue.length = 0;
    this.isProcessing = false;
  }
}

// Export singleton instance
export const performanceManager = new PerformanceManager();

// Utility functions for common performance patterns
export const createThrottledScroll = (callback: (event: Event) => void) => 
  performanceManager.throttle(callback, 16);

export const createDebouncedResize = (callback: (event: Event) => void) => 
  performanceManager.debounce(callback, 150);

export const queueMicroInteraction = (callback: () => void) => 
  performanceManager.queueAnimation(callback);

// Passive event listener options for better performance
export const passiveListenerOptions = { passive: true };

// Check if Intersection Observer is supported
export const supportsIntersectionObserver = (): boolean => 
  'IntersectionObserver' in window;

// Optimize images with loading="lazy" and decoding="async"
export const optimizeImageProps = (src: string, alt: string) => ({
  src,
  alt,
  loading: 'lazy' as const,
  decoding: 'async' as const,
  style: { contentVisibility: 'auto' }
});