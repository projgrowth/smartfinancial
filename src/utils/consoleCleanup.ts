// Console cleanup utility for production builds
export const createProductionLogger = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    log: isDevelopment ? console.log : () => {},
    warn: isDevelopment ? console.warn : () => {},
    error: console.error, // Always keep errors
    info: isDevelopment ? console.info : () => {},
    debug: isDevelopment ? console.debug : () => {}
  };
};

// Replace console usage throughout the app
export const logger = createProductionLogger();

// Global console replacement for production
if (process.env.NODE_ENV === 'production') {
  window.console = {
    ...console,
    log: () => {},
    warn: () => {},
    info: () => {},
    debug: () => {}
  };
}

// Performance-aware logging
export const performanceLog = (label: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(label);
    fn();
    console.timeEnd(label);
  } else {
    fn();
  }
};

// Conditional analytics logging
export const analyticsLog = (event: string, data: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    // Implementation depends on your analytics provider
  } else {
    console.log('Analytics Event:', event, data);
  }
};