/**
 * Client Segments Content
 * HNW client segment definitions for targeted pages
 */

export interface PainPoint {
  title: string;
  description: string;
}

export interface Outcome {
  title: string;
  description: string;
}

export interface CaseStudy {
  clientType: string;
  scenario: string;
  approach: string;
  outcome: string;
  complianceNote: string;
}

export interface Segment {
  id: string;
  slug: string;
  title: string;
  headline: string;
  subheadline: string;
  description: string;
  painPoints: PainPoint[];
  outcomes: Outcome[];
  relevantServices: string[];
  caseStudy: CaseStudy;
  ctaText: string;
}

export const segments: Segment[] = [
  {
    id: 'owners',
    slug: 'owners',
    title: 'Business Owners & Entrepreneurs',
    headline: 'Your Business Is Your Legacy',
    subheadline: 'Strategic wealth planning for founders, owners, and entrepreneurs building generational impact.',
    description: 'You\'ve built something meaningful. Now it\'s time to ensure your personal wealth reflects that achievement—and that your exit, when it comes, maximizes value while minimizing tax impact.',
    painPoints: [
      {
        title: 'Concentrated Risk',
        description: 'Most of your net worth is tied up in your business, creating vulnerability you can feel but can\'t easily solve.',
      },
      {
        title: 'Exit Uncertainty',
        description: 'You know you\'ll transition someday, but the tax implications and timing feel overwhelming.',
      },
      {
        title: 'Cash Flow Complexity',
        description: 'Balancing business reinvestment with personal wealth building requires sophisticated coordination.',
      },
      {
        title: 'Succession Gaps',
        description: 'Whether passing to family or selling externally, you lack a clear, documented succession roadmap.',
      },
    ],
    outcomes: [
      {
        title: 'Diversified Personal Wealth',
        description: 'Build liquid assets outside your business for true financial security.',
      },
      {
        title: 'Exit-Ready Planning',
        description: 'Know your numbers, timeline, and tax-minimization strategies years in advance.',
      },
      {
        title: 'Optimized Compensation',
        description: 'Structure salary, distributions, and benefits to maximize after-tax wealth.',
      },
      {
        title: 'Clear Succession Path',
        description: 'Documented plan whether transitioning to family, partners, or external buyers.',
      },
    ],
    relevantServices: ['tax-strategy', 'wealth-protection', 'investment-management', 'retirement-design'],
    caseStudy: {
      clientType: 'Manufacturing Company Owner',
      scenario: 'Second-generation owner with 90% of net worth in company equity, planning retirement in 5-7 years with no clear succession plan.',
      approach: 'Implemented systematic diversification through qualified plans, developed family succession framework, and structured tax-efficient ownership transition.',
      outcome: 'Created $2M+ in diversified personal assets, reduced projected exit tax by 40%, and established clear succession timeline with family members.',
      complianceNote: 'This case study represents a composite of client experiences. Individual results vary based on circumstances.',
    },
    ctaText: 'Discuss Your Exit Strategy',
  },
  {
    id: 'executives',
    slug: 'executives',
    title: 'Corporate Executives',
    headline: 'Maximize Your Compensation',
    subheadline: 'Navigate stock compensation, deferred comp, and executive benefits with precision.',
    description: 'Your compensation package is complex by design. RSUs, stock options, deferred compensation, and executive benefits require specialized expertise to optimize—and mistakes can be costly.',
    painPoints: [
      {
        title: 'Concentrated Stock Risk',
        description: 'A significant portion of your wealth is in company stock, exposing you to single-company volatility.',
      },
      {
        title: 'Tax Timing Complexity',
        description: 'When to exercise options, sell RSUs, or take deferred comp distributions requires sophisticated modeling.',
      },
      {
        title: 'Benefits Blind Spots',
        description: 'SERP, NQDC, and executive insurance benefits are often underutilized or poorly coordinated.',
      },
      {
        title: 'Career Transition Risk',
        description: 'Job changes, mergers, or early retirement trigger complex compensation decisions.',
      },
    ],
    outcomes: [
      {
        title: 'Optimized Stock Strategy',
        description: 'Systematic approach to diversification that manages risk without triggering excessive taxes.',
      },
      {
        title: 'Tax-Efficient Timing',
        description: 'Multi-year modeling of option exercises, RSU sales, and deferred comp elections.',
      },
      {
        title: 'Maximized Benefits',
        description: 'Full utilization of executive benefits coordinated with personal planning.',
      },
      {
        title: 'Transition Preparedness',
        description: 'Contingency planning for career changes, M&A events, and early retirement scenarios.',
      },
    ],
    relevantServices: ['tax-strategy', 'investment-management', 'retirement-design', 'wealth-protection'],
    caseStudy: {
      clientType: 'VP at Fortune 500 Technology Company',
      scenario: 'Executive with $3M in unvested RSUs, significant NQDC balance, and company stock representing 60% of liquid net worth.',
      approach: 'Developed 10b5-1 diversification plan, optimized NQDC distribution elections, and implemented concentrated stock hedging strategy.',
      outcome: 'Reduced single-stock exposure to 25% over 3 years, lowered projected tax rate by 8%, and secured retirement timeline.',
      complianceNote: 'This case study represents a composite of client experiences. Individual results vary based on circumstances.',
    },
    ctaText: 'Optimize Your Compensation',
  },
  {
    id: 'legacy',
    slug: 'legacy',
    title: 'Pre-Retirees & Legacy Families',
    headline: 'Protect What You\'ve Built',
    subheadline: 'Transition into retirement with confidence and create a lasting legacy for generations.',
    description: 'You\'ve spent decades building wealth. The transition to retirement—and eventually to the next generation—requires careful orchestration to preserve what you\'ve created.',
    painPoints: [
      {
        title: 'Retirement Readiness Uncertainty',
        description: 'Despite significant assets, you\'re unsure if your lifestyle is truly sustainable for 30+ years.',
      },
      {
        title: 'Tax Inefficiency Risk',
        description: 'Large retirement account balances and potential RMDs could push you into higher tax brackets.',
      },
      {
        title: 'Estate Planning Gaps',
        description: 'Your estate documents may be outdated, and wealth transfer strategies aren\'t optimized.',
      },
      {
        title: 'Legacy Clarity',
        description: 'You want to be intentional about what you leave behind, but haven\'t formalized your vision.',
      },
    ],
    outcomes: [
      {
        title: 'Retirement Confidence',
        description: 'Clear understanding of sustainable withdrawal rates and lifestyle funding sources.',
      },
      {
        title: 'Tax-Optimized Distribution',
        description: 'Strategic Roth conversions and withdrawal sequencing to minimize lifetime taxes.',
      },
      {
        title: 'Updated Estate Plan',
        description: 'Current documents with tax-efficient wealth transfer strategies in place.',
      },
      {
        title: 'Defined Legacy',
        description: 'Clear vision for charitable giving, family support, and multi-generational impact.',
      },
    ],
    relevantServices: ['retirement-design', 'tax-strategy', 'wealth-protection', 'investment-management'],
    caseStudy: {
      clientType: 'Retiring Healthcare Executive Couple',
      scenario: 'Dual-income couple with $4M in retirement assets, $1.5M in taxable accounts, and outdated estate documents from 15 years ago.',
      approach: 'Created sustainable withdrawal strategy, implemented 10-year Roth conversion plan, updated estate documents with generation-skipping trusts.',
      outcome: 'Established $180K annual sustainable income, projected $400K+ in lifetime tax savings, and structured $2M charitable legacy.',
      complianceNote: 'This case study represents a composite of client experiences. Individual results vary based on circumstances.',
    },
    ctaText: 'Plan Your Legacy',
  },
];
