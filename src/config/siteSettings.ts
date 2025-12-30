/**
 * Site Settings Configuration
 * Centralized brand data - update here, changes apply site-wide
 */

export const siteSettings = {
  // Brand Identity
  firmName: 'Smart Financial Planning',
  tagline: 'Your Wealth. Elevated.',
  
  // Contact Information
  contact: {
    phone: '(706) 627-5729',
    phoneHref: 'tel:+17066275729',
    email: 'vince@thesmartfinancialplan.com',
    emailHref: 'mailto:vince@thesmartfinancialplan.com',
  },
  
  // Location
  address: {
    street: '6900 Tavistock Lakes Blvd',
    suite: 'Suite 400',
    city: 'Orlando',
    state: 'FL',
    zip: '32827',
    full: '6900 Tavistock Lakes Blvd, Suite 400, Orlando, FL 32827',
  },
  
  // Social Media
  social: {
    linkedin: 'https://www.linkedin.com/company/smart-financial-planning',
    facebook: 'https://www.facebook.com/smartfinancialplanning',
  },
  
  // Qualification Criteria
  qualification: {
    minimumAssets: 500000,
    minimumAssetsDisplay: '$500K',
    minimumAssetsText: '$500,000 in investable assets',
    alternateQualification: 'high-income professionals on track to reach this threshold within 2-3 years',
  },
  
  // Default CTA Copy
  cta: {
    primary: 'Request Your Wealth Strategy Session',
    secondary: 'Schedule a Consultation',
    hero: 'Request Your Wealth Strategy Session',
    navbar: 'Request Strategy Session',
  },
  
  // Analytics IDs (add when available)
  analytics: {
    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',
  },
  
  // SEO Defaults
  seo: {
    defaultTitle: 'Smart Financial Planning — Orlando Wealth Management for High Net Worth Individuals',
    defaultDescription: 'Premier Orlando wealth management serving executives, business owners, and high-net-worth families with $500K+ in assets. Comprehensive financial planning, asset protection, and retirement strategies in Lake Nona.',
    siteUrl: 'https://thesmartfinancialplan.com',
    keywords: 'wealth management Orlando, high net worth financial advisor, Lake Nona financial planner, business owner retirement planning, asset protection Florida',
  },
  
  // Legal
  legal: {
    privacyUrl: '/privacy',
    termsUrl: '/terms',
    disclaimerText: 'Investment advisory services offered through Smart Financial Planning. Past performance is not indicative of future results.',
  },
} as const;

export type SiteSettings = typeof siteSettings;
