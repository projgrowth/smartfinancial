
import React from 'react';
import { Lightbulb, Layers, CheckCheck } from 'lucide-react';
import { ProcessStep } from './types';

// This function returns the steps data to ensure icon JSX is properly rendered
export const getProcessSteps = (): ProcessStep[] => [
  {
    id: "discovery",
    number: '01',
    title: 'Deep Discovery',
    description: 'We dive deep to understand your financial landscape, ambitions, and opportunities that others overlook.',
    icon: React.createElement(Lightbulb, { className: "w-6 h-6 text-accent", "aria-hidden": "true" }),
    details: [
      {
        title: 'Comprehensive Assessment',
        description: 'We analyze your entire financial situation including assets, liabilities, income, expenses, and tax situation.'
      },
      {
        title: 'Goal Mapping',
        description: 'We work with you to define clear, measurable financial goals and the timeframes to achieve them.'
      },
      {
        title: 'Risk Tolerance Evaluation',
        description: 'We determine your comfort level with financial risk through advanced assessment tools.'
      }
    ],
    keyTerms: [
      { term: 'Risk Tolerance', definition: 'Your comfort level with market fluctuations and potential losses.' },
      { term: 'Asset Allocation', definition: 'The strategic distribution of investments across different asset classes.' }
    ]
  },
  {
    id: "blueprint",
    number: '02',
    title: 'Bespoke Blueprint',
    description: 'Receive a custom-crafted financial strategy, from investments and tax optimization to advanced wealth protection.',
    icon: React.createElement(Layers, { className: "w-6 h-6 text-accent", "aria-hidden": "true" }),
    details: [
      {
        title: 'Custom Investment Strategy',
        description: 'We design an investment portfolio that aligns with your goals, timeline, and risk tolerance.'
      },
      {
        title: 'Tax Efficiency Planning',
        description: 'We implement strategies to minimize tax liability and maximize after-tax returns.'
      },
      {
        title: 'Estate & Legacy Planning',
        description: 'We help protect and transfer your wealth according to your wishes.'
      }
    ],
    keyTerms: [
      { term: 'Portfolio Diversification', definition: 'Spreading investments across various asset types to reduce risk.' },
      { term: 'Tax-Loss Harvesting', definition: 'Selling investments at a loss to offset capital gains tax liability.' }
    ]
  },
  {
    id: "growth",
    number: '03',
    title: 'Growth & Guidance',
    description: 'Benefit from ongoing strategic reviews, adjustments, and proactive insights as your life evolves.',
    icon: React.createElement(CheckCheck, { className: "w-6 h-6 text-accent", "aria-hidden": "true" }),
    details: [
      {
        title: 'Regular Portfolio Reviews',
        description: 'We continuously monitor your investments and rebalance as needed to stay aligned with your goals.'
      },
      {
        title: 'Life Transition Support',
        description: 'We provide guidance through major life events like career changes, retirement, or inheritance.'
      },
      {
        title: 'Proactive Opportunity Identification',
        description: 'We alert you to new investment opportunities or tax-saving strategies as they emerge.'
      }
    ],
    keyTerms: [
      { term: 'Portfolio Rebalancing', definition: 'Periodically buying and selling assets to maintain your desired level of asset allocation.' },
      { term: 'Dollar-Cost Averaging', definition: 'Investing a fixed amount regularly, regardless of market prices, to reduce the impact of volatility.' }
    ]
  }
];
