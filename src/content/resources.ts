/**
 * Resources Content
 * Thought leadership posts and lead magnets
 */

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'article' | 'guide' | 'webinar';
  excerpt: string;
  readTime: string;
  publishedDate: string;
  targetSegments: string[];
  content: string;
}

export interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  fileName: string;
  targetSegments: string[];
}

export const resources: Resource[] = [
  {
    id: 'stock-option-liquidity',
    slug: 'stock-option-liquidity-events',
    title: 'Navigating Stock Option Liquidity Events',
    description: 'Strategic approaches to managing equity compensation during IPOs, acquisitions, and secondary sales.',
    category: 'article',
    excerpt: 'When your company announces a liquidity event, the decisions you make in the following weeks can impact your wealth for decades. Here\'s how to approach these high-stakes moments with clarity.',
    readTime: '8 min read',
    publishedDate: '2024-11-15',
    targetSegments: ['executives', 'owners'],
    content: `
## Understanding Liquidity Events

A liquidity event—whether an IPO, acquisition, or secondary sale—represents a pivotal moment for equity compensation holders. The decisions made during this window can significantly impact your long-term wealth.

### Key Considerations

**Timing Decisions**
- Lockup periods and their implications
- Tax timing strategies (83(b) elections, exercise timing)
- Market conditions and diversification opportunities

**Tax Planning**
- AMT implications for ISOs
- Short-term vs. long-term capital gains
- State tax considerations for remote workers

**Diversification Strategy**
- 10b5-1 plan considerations
- Systematic vs. opportunistic selling
- Concentration risk management

### Action Steps

1. Review your complete equity picture 90+ days before the event
2. Model various scenarios with your tax advisor
3. Establish a written diversification policy
4. Consider hedging strategies for significant positions

*This content is educational. Consult with qualified professionals for personalized advice.*
    `,
  },
  {
    id: 'philanthropic-planning',
    slug: 'philanthropic-planning-strategies',
    title: 'Strategic Philanthropic Planning for High-Net-Worth Families',
    description: 'How to maximize charitable impact while optimizing tax benefits through donor-advised funds, charitable trusts, and direct giving.',
    category: 'article',
    excerpt: 'Effective philanthropy requires more than generosity—it requires strategy. Learn how affluent families are amplifying their charitable impact while reducing tax burden.',
    readTime: '10 min read',
    publishedDate: '2024-10-22',
    targetSegments: ['legacy', 'owners'],
    content: `
## The Strategic Philanthropy Framework

High-net-worth families have unique opportunities to create meaningful charitable impact while achieving significant tax benefits. The key is matching the right giving vehicle to your situation.

### Giving Vehicles Compared

**Donor-Advised Funds (DAFs)**
- Immediate tax deduction, flexible grant timing
- Ideal for: Bunching strategies, appreciated securities
- Minimum: Typically $5,000+

**Charitable Remainder Trusts (CRTs)**
- Income stream + charitable deduction
- Ideal for: Concentrated stock, business sales
- Minimum: Typically $500,000+

**Private Foundations**
- Maximum control, family involvement
- Ideal for: Multi-generational giving programs
- Minimum: Typically $1M+

### Tax Optimization Strategies

- Donate appreciated securities to avoid capital gains
- Bunch multiple years of giving into single tax year
- Use Qualified Charitable Distributions (QCDs) from IRAs after 70½
- Time charitable deductions with high-income years

*This content is educational. Consult with qualified professionals for personalized advice.*
    `,
  },
  {
    id: 'succession-planning',
    slug: 'business-succession-planning',
    title: 'Business Succession Planning: A Framework for Owners',
    description: 'Essential strategies for transitioning ownership to family, partners, or external buyers while maximizing value and minimizing tax impact.',
    category: 'guide',
    excerpt: 'Your exit from the business you\'ve built deserves as much strategic thought as the business itself. Here\'s a framework for approaching succession planning.',
    readTime: '12 min read',
    publishedDate: '2024-09-18',
    targetSegments: ['owners'],
    content: `
## The Succession Planning Framework

Business owners often delay succession planning because it feels abstract or uncomfortable. This framework provides concrete steps to move forward.

### Phase 1: Discovery (Months 1-3)

**Business Valuation**
- Formal valuation or range estimate
- Key value drivers identification
- Comparison to industry benchmarks

**Stakeholder Mapping**
- Potential internal successors
- Family member interests and capabilities
- External buyer universe

### Phase 2: Strategy Development (Months 4-6)

**Transition Scenarios**
- Family succession pathway
- Management buyout structure
- External sale preparation
- Hybrid approaches

**Tax Planning**
- Entity structure optimization
- Installment sale considerations
- ESOP evaluation
- Charitable planning opportunities

### Phase 3: Implementation (Months 7-12+)

**Documentation**
- Buy-sell agreements
- Operating agreement updates
- Estate plan coordination
- Insurance needs analysis

**Execution Timeline**
- Successor development plan
- Gradual responsibility transfer
- Communication strategy

*This content is educational. Consult with qualified professionals for personalized advice.*
    `,
  },
];

export const leadMagnets: LeadMagnet[] = [
  {
    id: 'exit-planning-guide',
    title: 'The Business Owner\'s Exit Planning Checklist',
    description: 'A comprehensive 25-point checklist covering valuation, tax strategy, succession, and personal readiness for your business exit.',
    fileName: 'exit-planning-checklist.pdf',
    targetSegments: ['owners'],
  },
  {
    id: 'stock-comp-guide',
    title: 'Executive Stock Compensation Playbook',
    description: 'Navigate RSUs, stock options, and ESPP with this guide covering taxation, timing strategies, and common mistakes to avoid.',
    fileName: 'stock-compensation-playbook.pdf',
    targetSegments: ['executives'],
  },
  {
    id: 'retirement-readiness',
    title: 'Retirement Readiness Assessment',
    description: 'A self-assessment tool to evaluate your retirement preparedness across income, healthcare, estate planning, and lifestyle dimensions.',
    fileName: 'retirement-readiness-assessment.pdf',
    targetSegments: ['legacy'],
  },
];
