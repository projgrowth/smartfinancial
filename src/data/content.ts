// =============================================================================
// CONTENT DATA LAYER - Phase 2: Data Centralization
// Single source of truth for all static content
// =============================================================================

export interface HeroContent {
  words: string[];
  headline: {
    prefix: string;
    suffix?: string;
  };
  description: string;
  cta: {
    text: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    ariaLabel: string;
    targetSection: string;
  };
}

export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline';
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating?: number;
  imageUrl?: string;
}

// Hero content
export const heroContent: HeroContent = {
  words: ['Elevated.', 'Optimized.', 'Protected.', 'Compounded.'],
  headline: {
    prefix: 'Your wealth.',
  },
  description: 'Tailored financial strategies for ambitious professionals who demand more than cookie-cutter solutions. We help you build, protect, and grow your wealth.',
  cta: {
    text: {
      mobile: 'Schedule',
      tablet: 'Schedule Call',
      desktop: 'Schedule Your Private Strategy Call',
    },
    ariaLabel: 'Schedule your private strategy call',
    targetSection: 'schedule',
  },
};

// Section content
export const sections: Record<string, SectionContent> = {
  intro: {
    id: 'intro',
    title: 'Financial Planning That Works',
    subtitle: 'For Professionals Who Demand More',
    description: 'We specialize in comprehensive financial strategies for business owners, high-income earners, and families who want personalized solutions—not cookie-cutter plans.',
    cta: {
      text: 'Learn About Our Process',
      href: '#process',
      variant: 'primary',
    },
  },
  services: {
    id: 'services',
    title: 'Comprehensive Financial Solutions',
    subtitle: 'Everything You Need Under One Roof',
    description: 'From retirement planning to business succession, we provide integrated strategies that work together to maximize your wealth potential.',
  },
  process: {
    id: 'process',
    title: 'Our Proven Process',
    subtitle: 'How We Build Your Financial Future',
    description: 'A systematic approach to understanding your goals, analyzing your situation, and implementing strategies that deliver results.',
  },
  team: {
    id: 'team',
    title: 'Meet Your Advisory Team',
    subtitle: 'Experience You Can Trust',
    description: 'Our team combines decades of experience with a personal approach to help you achieve your financial goals.',
  },
  testimonials: {
    id: 'testimonials',
    title: 'Client Success Stories',
    subtitle: 'Real Results, Real People',
    description: 'See how we\'ve helped professionals like you build and protect their wealth.',
  },
  faq: {
    id: 'faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Get the Answers You Need',
    description: 'Common questions about our services, process, and how we can help you achieve your financial goals.',
  },
  cta: {
    id: 'cta',
    title: 'Ready to Take Control of Your Financial Future?',
    subtitle: 'Schedule Your Complimentary Strategy Session',
    description: 'Discover how our personalized approach can help you build, protect, and grow your wealth. No obligations, just insights.',
    cta: {
      text: 'Schedule Your Call Today',
      href: '#schedule',
      variant: 'primary',
    },
  },
};

// FAQ content
export const faqItems: FAQItem[] = [
  {
    id: 'what-makes-different',
    question: 'What makes Smart Financial Planning different?',
    answer: 'We focus exclusively on personalized strategies for high-achieving professionals. Unlike cookie-cutter approaches, we take the time to understand your unique situation and goals, then build a comprehensive plan that evolves with your needs.',
    category: 'approach',
  },
  {
    id: 'who-do-you-work-with',
    question: 'Who do you typically work with?',
    answer: 'Our ideal clients are business owners, high-income professionals, and families who want more than basic financial advice. If you\'re looking for sophisticated strategies and personalized attention, we\'re a great fit.',
    category: 'clients',
  },
  {
    id: 'how-are-you-compensated',
    question: 'How are you compensated?',
    answer: 'We believe in transparency. Our compensation structure will be fully explained during your initial consultation, ensuring you understand exactly how we work together and what to expect.',
    category: 'fees',
  },
  {
    id: 'first-meeting-expect',
    question: 'What should I expect in our first meeting?',
    answer: 'Your initial consultation is complimentary and focuses on understanding your goals, current situation, and how we might help. There\'s no pressure or obligation—just a conversation about your financial future.',
    category: 'process',
  },
  {
    id: 'how-often-meet',
    question: 'How often do we meet after we start working together?',
    answer: 'We typically meet quarterly for progress reviews and strategy adjustments, with additional meetings as needed for major life changes or market conditions. You\'ll always have access to our team when questions arise.',
    category: 'ongoing',
  },
  {
    id: 'minimum-assets',
    question: 'Do you have a minimum asset requirement?',
    answer: 'Rather than a strict asset minimum, we focus on working with clients who value comprehensive planning and are committed to implementing strategies. We\'ll discuss whether we\'re a mutual fit during your consultation.',
    category: 'requirements',
  },
];

// Testimonial content
export const testimonials: TestimonialItem[] = [
  {
    id: 'business-owner-success',
    name: 'Sarah Mitchell',
    role: 'Business Owner',
    company: 'Tech Consulting Firm',
    content: 'Razell and his team helped me navigate the complexity of business succession planning while optimizing my personal wealth strategy. Their approach is thorough and genuinely personalized.',
    rating: 5,
  },
  {
    id: 'professional-couple',
    name: 'Michael & Jennifer Roberts',
    role: 'Medical Professionals',
    content: 'We finally have a financial plan that makes sense for our busy lives. The team takes care of the details so we can focus on our practice and family.',
    rating: 5,
  },
  {
    id: 'executive-planning',
    name: 'David Chen',
    role: 'Senior Executive',
    company: 'Fortune 500 Company',
    content: 'The level of sophistication in their planning approach impressed me immediately. They understand the unique challenges of high-income professionals.',
    rating: 5,
  },
];

// Navigation content
export const navigation = {
  main: [
    { label: 'About', href: '#intro' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Team', href: '#team' },
    { label: 'Education', href: '/education' },
  ],
  footer: {
    company: [
      { label: 'About Us', href: '#intro' },
      { label: 'Our Process', href: '#process' },
      { label: 'Meet the Team', href: '#team' },
    ],
    resources: [
      { label: 'Financial Education', href: '/education' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
};

// Company information
export const company = {
  name: 'Smart Financial Planning',
  tagline: 'Wealth Management for Ambitious Professionals',
  description: 'Personalized financial strategies for business owners and high-income professionals in Lake Nona and Orlando.',
  contact: {
    phone: '(407) 555-0123',
    email: 'info@smartfinancialplanning.com',
    address: {
      street: '123 Lake Nona Blvd',
      city: 'Lake Nona',
      state: 'FL',
      zip: '32827',
    },
  },
  social: {
    linkedin: 'https://linkedin.com/company/smart-financial-planning',
    facebook: 'https://facebook.com/smartfinancialplanning',
  },
};

// SEO content
export const seoContent = {
  default: {
    title: 'Smart Financial Planning | Wealth Management in Lake Nona & Orlando',
    description: 'Personalized financial strategies for ambitious professionals, business owners, and families. Expert wealth management services in Lake Nona and Orlando, Florida.',
    keywords: 'financial planning, wealth management, Lake Nona, Orlando, business owners, high income professionals',
  },
  education: {
    title: 'Financial Education Center | Smart Financial Planning',
    description: 'Comprehensive financial education resources, calculators, and insights for informed decision-making. Learn about retirement planning, investment strategies, and more.',
    keywords: 'financial education, retirement planning, investment calculators, financial literacy, wealth building',
  },
};