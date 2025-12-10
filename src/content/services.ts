/**
 * Services Content
 * Centralized service definitions for HNW clients
 */

import { FileSearch, CreditCard, BarChart4, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceFeature {
  text: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  features: ServiceFeature[];
  outcomes: string[];
  idealFor: string[];
}

export const services: Service[] = [
  {
    id: 'retirement-design',
    title: 'Retirement Design',
    slug: 'retirement-design',
    description: 'Architect your ideal retirement with income strategies built for wealth preservation and lifestyle continuity.',
    longDescription: 'For high-net-worth individuals, retirement planning extends beyond simple accumulation. We design comprehensive income architectures that preserve principal, minimize tax drag, and ensure your lifestyle remains uncompromised through market cycles.',
    icon: FileSearch,
    features: [
      { text: 'Multi-source income projection and gap analysis' },
      { text: 'Social Security optimization timing strategies' },
      { text: 'Healthcare cost planning and HSA optimization' },
      { text: 'Lifestyle goal alignment and spending analysis' },
    ],
    outcomes: [
      'Clear visibility into retirement readiness timeline',
      'Tax-efficient withdrawal sequencing strategy',
      'Protected income floor with growth potential',
      'Coordinated healthcare and long-term care planning',
    ],
    idealFor: [
      'Executives approaching retirement',
      'Business owners planning exits',
      'Pre-retirees with $1M+ portfolios',
    ],
  },
  {
    id: 'tax-strategy',
    title: 'Tax Strategy',
    slug: 'tax-strategy',
    description: 'Minimize your tax burden through strategic planning that keeps more of your wealth working for you.',
    longDescription: 'Affluent clients face complex tax situations requiring proactive, year-round strategies. We coordinate with your CPA to implement sophisticated tax minimization approaches across income, investments, and estate transfers.',
    icon: CreditCard,
    features: [
      { text: 'Tax-efficient withdrawal sequencing' },
      { text: 'Roth conversion analysis and multi-year planning' },
      { text: 'Capital gains harvesting and loss optimization' },
      { text: 'Charitable giving strategies (DAFs, CRTs, QCDs)' },
    ],
    outcomes: [
      'Reduced lifetime tax liability',
      'Optimized asset location across account types',
      'Strategic Roth conversion roadmap',
      'Coordinated charitable impact strategy',
    ],
    idealFor: [
      'High-income professionals',
      'Business owners with concentrated equity',
      'Executives with stock compensation',
    ],
  },
  {
    id: 'investment-management',
    title: 'Investment Management',
    slug: 'investment-management',
    description: 'Sophisticated portfolio construction aligned with your wealth preservation and growth objectives.',
    longDescription: 'Our investment approach prioritizes risk-adjusted returns, tax efficiency, and alignment with your complete financial picture. We construct globally diversified portfolios using institutional-quality strategies typically reserved for larger accounts.',
    icon: BarChart4,
    features: [
      { text: 'Risk-adjusted portfolio design and stress testing' },
      { text: 'Tax-loss harvesting and rebalancing' },
      { text: 'Alternative investment evaluation' },
      { text: 'ESG/values-based investing options' },
    ],
    outcomes: [
      'Globally diversified, cost-efficient portfolio',
      'Reduced volatility through proper asset allocation',
      'Tax-aware investment transitions',
      'Ongoing performance monitoring and reporting',
    ],
    idealFor: [
      'Investors with $500K+ portfolios',
      'Executives with concentrated stock positions',
      'Families consolidating multiple accounts',
    ],
  },
  {
    id: 'wealth-protection',
    title: 'Wealth Protection',
    slug: 'wealth-protection',
    description: 'Safeguard your legacy with comprehensive estate planning and risk management strategies.',
    longDescription: 'Protecting wealth requires coordinated strategies across insurance, estate planning, and asset protection. We ensure your family and business are shielded from unnecessary risks while maximizing wealth transfer efficiency.',
    icon: Shield,
    features: [
      { text: 'Estate planning coordination with attorneys' },
      { text: 'Insurance needs analysis and policy review' },
      { text: 'Beneficiary optimization across all accounts' },
      { text: 'Legacy and multi-generational planning' },
    ],
    outcomes: [
      'Updated estate documents aligned with goals',
      'Optimized insurance coverage without gaps',
      'Clear succession plan for business interests',
      'Tax-efficient wealth transfer strategy',
    ],
    idealFor: [
      'Business owners with succession needs',
      'Families with multi-generational wealth',
      'High-net-worth individuals with complex estates',
    ],
  },
];
