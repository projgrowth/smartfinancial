/**
 * Component preloader utility for hover-based preloading
 * Improves perceived performance by preloading components on hover
 */

const preloadedComponents = new Set<string>();

export const preloadComponent = (importFn: () => Promise<any>, componentName: string) => {
  if (preloadedComponents.has(componentName)) {
    return; // Already preloaded
  }
  
  preloadedComponents.add(componentName);
  importFn().catch((error) => {
    console.error(`Failed to preload ${componentName}:`, error);
    preloadedComponents.delete(componentName); // Allow retry on error
  });
};

// Specific component preloaders
export const preloadMeetingScheduler = () => {
  preloadComponent(
    () => import('../components/MeetingScheduler'),
    'MeetingScheduler'
  );
};

export const preloadFinancialCalculator = () => {
  preloadComponent(
    () => import('../components/FinancialCalculator'),
    'FinancialCalculator'
  );
};

export const preloadFAQSection = () => {
  preloadComponent(
    () => import('../components/FAQSection'),
    'FAQSection'
  );
};
