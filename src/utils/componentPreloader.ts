/**
 * Component preloader utility for hover-based preloading
 * Improves perceived performance by preloading components on hover
 * 
 * Usage:
 * <Button onMouseEnter={preloadMeetingScheduler}>
 *   Schedule Meeting
 * </Button>
 */

const preloadedComponents = new Set<string>();

/**
 * Generic component preloader
 * @param importFn - Dynamic import function for the component
 * @param componentName - Unique identifier for tracking preload status
 */
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

/**
 * Preload MeetingScheduler component
 * Call on hover/focus of buttons that open the scheduler
 */
export const preloadMeetingScheduler = () => {
  preloadComponent(
    () => import('../components/MeetingScheduler'),
    'MeetingScheduler'
  );
};

/**
 * Preload FinancialCalculator component
 * Call on hover/focus of calculator-related buttons
 */
export const preloadFinancialCalculator = () => {
  preloadComponent(
    () => import('../components/FinancialCalculator'),
    'FinancialCalculator'
  );
};

/**
 * Preload FAQSection component
 * Call on hover/focus of FAQ navigation elements
 */
export const preloadFAQSection = () => {
  preloadComponent(
    () => import('../components/FAQSection'),
    'FAQSection'
  );
};
