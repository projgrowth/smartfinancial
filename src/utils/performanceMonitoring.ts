/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and layout shifts in development mode
 */

export const measureCLS = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
  
  let clsValue = 0;
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        console.warn('Layout shift detected:', {
          value: (entry as any).value,
          sources: (entry as any).sources,
          total: clsValue.toFixed(4)
        });
      }
    }
  });
  
  observer.observe({ type: 'layout-shift', buffered: true });
  
  return () => observer.disconnect();
};

export const measureLCP = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
  
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('Largest Contentful Paint:', (lastEntry as any).renderTime || (lastEntry as any).loadTime);
  });
  
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
  
  return () => observer.disconnect();
};

export const measureFID = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
  
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('First Input Delay:', (entry as any).processingStart - entry.startTime);
    }
  });
  
  observer.observe({ type: 'first-input', buffered: true });
  
  return () => observer.disconnect();
};
