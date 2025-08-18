/**
 * Analytics utilities for tracking user interactions and performance
 */

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url: string;
}

class AnalyticsManager {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializePerformanceTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializePerformanceTracking() {
    // Track Core Web Vitals
    if (typeof window !== 'undefined') {
      // Track page load performance
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            this.trackPerformanceMetric('page_load_time', navigation.loadEventEnd - navigation.fetchStart);
            this.trackPerformanceMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
            this.trackPerformanceMetric('first_byte', navigation.responseStart - navigation.fetchStart);
          }
        }, 0);
      });

      // Track Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.trackPerformanceMetric('largest_contentful_paint', lastEntry.startTime);
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP tracking not supported');
        }

        // Track First Input Delay (FID)
        try {
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry: any) => {
              this.trackPerformanceMetric('first_input_delay', entry.processingStart - entry.startTime);
            });
          });
          observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID tracking not supported');
        }

        // Track Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0;
          const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            this.trackPerformanceMetric('cumulative_layout_shift', clsValue);
          });
          observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS tracking not supported');
        }
      }
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  trackEvent(
    event: string,
    category: string,
    action: string,
    label?: string,
    value?: number
  ) {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.events.push(analyticsEvent);

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalyticsService(analyticsEvent);
    } else {
      console.log('Analytics Event:', analyticsEvent);
    }
  }

  trackPerformanceMetric(name: string, value: number) {
    if (!this.isEnabled) return;

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href
    };

    this.performanceMetrics.push(metric);

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendPerformanceMetric(metric);
    } else {
      console.log('Performance Metric:', metric);
    }
  }

  trackPageView(path: string, title?: string) {
    this.trackEvent('page_view', 'navigation', 'view', path);
  }

  trackInteraction(element: string, action: string, details?: string) {
    this.trackEvent('interaction', 'ui', action, `${element}${details ? `:${details}` : ''}`);
  }

  trackFormSubmission(formName: string, success: boolean) {
    this.trackEvent('form_submission', 'form', success ? 'success' : 'error', formName);
  }

  trackScrollDepth(percentage: number) {
    // Only track significant scroll milestones
    const milestones = [25, 50, 75, 100];
    const milestone = milestones.find(m => percentage >= m && percentage < m + 5);
    
    if (milestone) {
      this.trackEvent('scroll_depth', 'engagement', 'scroll', `${milestone}%`, milestone);
    }
  }

  trackTimeOnPage(duration: number) {
    // Track time in buckets
    let bucket: string;
    if (duration < 30) bucket = '0-30s';
    else if (duration < 60) bucket = '30-60s';
    else if (duration < 180) bucket = '1-3m';
    else if (duration < 300) bucket = '3-5m';
    else bucket = '5m+';

    this.trackEvent('time_on_page', 'engagement', 'duration', bucket, duration);
  }

  trackError(error: Error, context?: string) {
    this.trackEvent('error', 'technical', 'javascript_error', `${error.name}: ${error.message}${context ? ` (${context})` : ''}`);
  }

  private sendToAnalyticsService(event: AnalyticsEvent) {
    // Implementation would depend on your analytics provider
    // Examples: Google Analytics 4, Mixpanel, Amplitude, etc.
    
    // Google Analytics 4 example:
    // gtag('event', event.action, {
    //   event_category: event.category,
    //   event_label: event.label,
    //   value: event.value
    // });
  }

  private sendPerformanceMetric(metric: PerformanceMetric) {
    // Send performance data to monitoring service
    // Examples: New Relic, DataDog, custom endpoint
  }

  getSessionData() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      events: this.events,
      performanceMetrics: this.performanceMetrics
    };
  }

  clearSession() {
    this.events = [];
    this.performanceMetrics = [];
    this.sessionId = this.generateSessionId();
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }
}

// Create singleton instance
export const analytics = new AnalyticsManager();

// Convenience functions
export const trackEvent = analytics.trackEvent.bind(analytics);
export const trackPageView = analytics.trackPageView.bind(analytics);
export const trackInteraction = analytics.trackInteraction.bind(analytics);
export const trackFormSubmission = analytics.trackFormSubmission.bind(analytics);
export const trackScrollDepth = analytics.trackScrollDepth.bind(analytics);
export const trackTimeOnPage = analytics.trackTimeOnPage.bind(analytics);
export const trackError = analytics.trackError.bind(analytics);

// React hook for analytics
export function useAnalytics() {
  return {
    trackEvent,
    trackPageView,
    trackInteraction,
    trackFormSubmission,
    trackScrollDepth,
    trackTimeOnPage,
    trackError,
    analytics
  };
}