// Unified team data and types

export interface AdvisorProfile {
  slug: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  education?: string[];
  certifications?: string[];
  experience?: string[];
  approach?: string;
}

export const advisors: AdvisorProfile[] = [
  {
    slug: 'razell-smart',
    name: 'Razell Smart',
    title: 'Founder & Lead Advisor',
    bio: "Razell founded Smart Financial Planning with one mission: to provide high-level, personalized planning for individuals and families who want more than a cookie-cutter approach.\n\nWith years of experience guiding business owners, professionals, and high-income earners, Razell's strategies balance growth, protection, and long-term impact.\n\nOutside of work, he's a devoted husband and father, a lifelong student of leadership, and a strong believer that financial planning should feel empowering—not overwhelming.",
    specialties: ['Comprehensive Financial Planning', 'Business Owner Solutions', 'High-Income Strategies', 'Leadership Development', 'Personalized Wealth Management'],
    imageUrl: '/lovable-uploads/83c79661-f83a-4390-a3ed-d2cbea760fab.png',
    education: ['Financial Services Professional Training'],
    certifications: ['Licensed Financial Professional'],
    experience: [
      'Founded Smart Financial Planning to serve Lake Nona and Orlando professionals',
      'Specialized expertise in high-income earner strategies',
      'Extensive experience with business owner financial planning',
      'Leadership development and team building background',
    ],
    approach:
      "Razell believes financial planning should feel empowering, not overwhelming. His personalized approach ensures each client receives strategies tailored to their unique goals, balancing growth opportunities with protection and long-term wealth impact.",
  },
  {
    slug: 'vince-gallegos',
    name: 'Vince Gallegos',
    title: 'Client Services / Associate Wealth Advisor',
    bio: "Vince has been helping clients pursue their financial goals since 2021, with a focus on business owners and the unique challenges they face.\n\nHis calm, service-first approach helps clients feel confident and supported at every step.\n\nVince is a proud husband and father—married to his wife Kirsten and raising their energetic daughter, Georgia. Away from the office, he's most likely on the golf course, watching football, or listening to music—always with coffee in hand.",
    specialties: ['Business Owner Planning', 'Client Relations', 'Goal-Based Planning', 'Service Excellence', 'Family Financial Planning'],
    imageUrl: '/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png',
    education: ['Financial Services Training'],
    certifications: ['Licensed Financial Professional'],
    experience: [
      '5+ years helping Central Florida clients pursue financial goals',
      'Specialized focus on business owner financial challenges',
      'Expert in client relationship management and service delivery',
      'Goal-based planning methodology specialist',
    ],
    approach:
      "Vince's calm, service-first approach ensures clients feel confident and supported at every step of their financial journey. He specializes in translating complex financial concepts into clear, actionable strategies that business owners can implement with confidence.",
  },
  {
    slug: 'kelvin-mobley',
    name: 'Kelvin Mobley',
    title: 'Wealth & Asset Protection Specialist',
    bio: "Kelvin brings a grounded, entrepreneurial perspective to financial protection and wealth-building.\n\nWith deep experience in asset protection, he helps clients shield their legacy and maximize peace of mind. His approach is practical, proactive, and deeply personalized.\n\nOff the clock, Kelvin is a proud father, lifelong football fan, and golfer who believes that structure creates freedom—financially and personally.",
    specialties: ['Asset Protection', 'Legacy Planning', 'Wealth Preservation', 'Entrepreneurial Finance', 'Risk Management'],
    imageUrl: '/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png',
    education: ['Financial Services Training'],
    certifications: ['Licensed Financial Professional'],
    experience: [
      'Extensive background in asset protection strategies',
      'Specialized expertise in legacy and estate planning',
      'Entrepreneur-focused wealth preservation techniques',
      'Risk management and insurance planning specialist',
    ],
    approach:
      "Kelvin's practical, proactive approach to asset protection helps clients shield their legacy while maximizing peace of mind. He believes that proper financial structure creates freedom, both personally and professionally, allowing clients to focus on what matters most.",
  },
];
