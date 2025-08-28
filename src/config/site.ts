// =============================================================================
// SITE CONFIGURATION - Phase 2: Performance & Configuration
// Centralized app settings, constants, and performance configs
// =============================================================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  author: {
    name: string;
    url: string;
  };
}

export interface PerformanceConfig {
  // Animation settings
  animations: {
    reducedMotionFallback: boolean;
    defaultDuration: number;
    staggerDelay: number;
  };
  // Loading optimization
  lazyLoading: {
    imageThreshold: string;
    componentThreshold: number;
  };
  // Viewport settings
  intersectionThreshold: number;
}

export const siteConfig: SiteConfig = {
  name: 'Smart Financial Planning',
  description: 'Personalized financial strategies for ambitious professionals, business owners, and families in Lake Nona and Orlando.',
  url: 'https://smartfinancialplanning.com',
  ogImage: '/og-image.jpg',
  keywords: [
    'financial planning',
    'wealth management', 
    'Lake Nona',
    'Orlando',
    'business owners',
    'high income professionals',
    'retirement planning',
    'investment management'
  ],
  author: {
    name: 'Smart Financial Planning',
    url: 'https://smartfinancialplanning.com',
  },
};

export const performanceConfig: PerformanceConfig = {
  animations: {
    reducedMotionFallback: true,
    defaultDuration: 300,
    staggerDelay: 100,
  },
  lazyLoading: {
    imageThreshold: '10px',
    componentThreshold: 0.1,
  },
  intersectionThreshold: 0.1,
};

// Animation timing constants
export const ANIMATION_TIMINGS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  WORD_ROTATOR: 2500,
  TESTIMONIAL: 6000,
} as const;

// Breakpoint constants
export const BREAKPOINTS = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
} as const;

// Layout constants
export const LAYOUT = {
  navHeight: '4rem',
  containerDefault: '90rem',
  containerNarrow: '64rem', 
  containerWide: '96rem',
  gutter: 'clamp(1rem, 3vw, 2rem)',
} as const;