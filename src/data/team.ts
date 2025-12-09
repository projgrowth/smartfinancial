// Unified team data and types

export interface AdvisorProfile {
  slug: string;
  name: string;
  title: string;
  summary: string; // Concise 2-3 sentence intro
  fullBio: string; // Full story for "Read More"
  imageUrl: string;
  specialties: string[];
  credentials: {
    education?: string[];
    certifications?: string[];
    experience?: string[];
  };
}

export const advisors: AdvisorProfile[] = [
  {
    slug: 'razell-smart',
    name: 'Razell Smart',
    title: 'Founder & Lead Advisor',
    summary: "Razell founded Smart Financial Planning to provide high-level, personalized planning for individuals and families. His approach balances growth, protection, and long-term impact—making financial planning feel empowering, not overwhelming.",
    fullBio: "With years of experience guiding business owners, professionals, and high-income earners, Razell's strategies are tailored to each client's unique goals and circumstances. He founded Smart Financial Planning with one mission: to deliver more than cookie-cutter solutions.\n\nOutside of work, he's a devoted husband and father, a lifelong student of leadership, and a strong believer in personalized strategies that empower clients to focus on what matters most.",
    specialties: ['Comprehensive Financial Planning', 'Business Owner Solutions', 'High-Income Strategies'],
    imageUrl: '/lovable-uploads/razell-smart-new.jpg',
    credentials: {
      experience: [
        'Founded Smart Financial Planning to serve Lake Nona and Orlando professionals',
        'Specialized expertise in high-income earner strategies',
        'Extensive experience with business owner financial planning',
        'Leadership development and team building background',
      ]
    }
  },
  {
    slug: 'vince-gallegos',
    name: 'Vince Gallegos',
    title: 'Client Services / Associate Wealth Advisor',
    summary: "Vince has been helping clients pursue their financial goals since 2021, with a special focus on business owners. His calm, service-first approach translates complex financial concepts into clear, actionable strategies.",
    fullBio: "Vince's expertise lies in making clients feel confident and supported at every step of their financial journey. He specializes in the unique challenges business owners face, delivering goal-based planning with a personal touch.\n\nVince is a proud husband and father—married to his wife Kirsten and raising their energetic daughter, Georgia. Away from the office, he's most likely on the golf course, watching football, or listening to music—always with coffee in hand.",
    specialties: ['Business Owner Planning', 'Client Relations', 'Goal-Based Planning'],
    imageUrl: '/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png',
    credentials: {
      experience: [
        '5+ years helping Central Florida clients pursue financial goals',
        'Specialized focus on business owner financial challenges',
        'Expert in client relationship management and service delivery',
        'Goal-based planning methodology specialist',
      ]
    }
  },
  {
    slug: 'kelvin-mobley',
    name: 'Kelvin Mobley',
    title: 'Wealth & Asset Protection Specialist',
    summary: "Kelvin brings a grounded, entrepreneurial perspective to asset protection and wealth-building. His practical, proactive approach helps clients shield their legacy and maximize peace of mind—creating freedom both financially and personally.",
    fullBio: "With deep experience in asset protection strategies, Kelvin's expertise is deeply personalized to each client's unique situation. He believes that proper financial structure creates freedom, allowing clients to focus on what matters most.\n\nOff the clock, Kelvin is a proud father, lifelong football fan, and golfer who applies the same discipline to his personal life that he brings to client planning.",
    specialties: ['Asset Protection', 'Legacy Planning', 'Wealth Preservation'],
    imageUrl: '/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png',
    credentials: {
      experience: [
        'Extensive background in asset protection strategies',
        'Specialized expertise in legacy and estate planning',
        'Entrepreneur-focused wealth preservation techniques',
        'Risk management and insurance planning specialist',
      ]
    }
  },
  {
    slug: 'joseph-schreiner',
    name: 'Joseph Schreiner',
    title: 'Senior Financial Advisor',
    summary: "Joseph brings deep empathy and personal experience to financial planning. After experiencing the loss of his father, he felt a powerful calling to provide the kind of guidance and support families need during life's most important transitions.",
    fullBio: "Growing up in Florida, Joseph developed a deep appreciation for hard work and family values. He graduated Summa Cum Laude from the University of Florida's College of Pharmacy with his Doctor of Pharmacy, where he also met his wife (a nursing professional). Today, they're proud parents of three children, ages 8, 6, and 3.\n\nJoseph is passionate about serving medical professionals, retirees, and business owners—especially those in blue-collar industries like his late father's carpentry trade. He's particularly devoted to helping business owners approaching retirement develop thoughtful exit and succession strategies that protect their life's work and provide for their families.",
    specialties: ['Retirement & Succession Planning', 'Medical Professionals', 'Business Owner Strategies'],
    imageUrl: '/lovable-uploads/joseph-schreiner-new.jpg',
    credentials: {
      education: ['Doctor of Pharmacy (Summa Cum Laude), University of Florida'],
      certifications: ['CFP® (in progress)', 'CEPA (in progress)'],
      experience: [
        'Focus on retirement and succession strategies for business owners',
        'Specializes in serving medical professionals and retirees',
        'Dedicated to empowering families with financial clarity and confidence',
      ]
    }
  },
  {
    slug: 'ej-leonard',
    name: 'EJ Leonard',
    title: 'Financial Advisor',
    summary: "EJ brings analytical clarity and a forward-looking mindset from his sports analytics background to financial planning. He focuses on helping individuals and families understand their options clearly and make decisions that support a strong long-term trajectory.",
    fullBio: "EJ's path into financial planning started long before his career. He grew up with a natural pull toward numbers and analysis, spending hours breaking down player performance and projecting outcomes well before analytics became mainstream. That early interest in disciplined, data-driven thinking eventually shaped the way he approaches planning today.\n\nHe played baseball at Stetson University before shifting his focus to the operations side of the sport, later working in baseball operations for the Atlanta Braves. EJ enjoyed the analytical work but not the travel, and ultimately chose a direction that allowed him to build a stable life with his wife and family.\n\nAt Smart Financial Planning, EJ uses his experience to help clients be intentional with their dollars and confident in the path ahead.",
    specialties: ['Data-Driven Planning', 'Long-Term Strategy', 'Family Financial Planning'],
    imageUrl: '/lovable-uploads/ej-leonard.png',
    credentials: {
      education: ['Stetson University'],
      experience: [
        'Former baseball operations professional with the Atlanta Braves',
        'Background in sports analytics and performance projection',
        'Analytical approach to financial planning and decision-making',
      ]
    }
  }
];