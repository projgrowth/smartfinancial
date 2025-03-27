
import React from 'react';
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { HelpCircle } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  learnMoreLink?: string;
}

const financialTerms: GlossaryTerm[] = [
  {
    term: 'Asset Allocation',
    definition: 'The strategy of dividing investments across different asset categories like stocks, bonds, and cash to balance risk and reward according to goals, risk tolerance, and time horizon.',
    learnMoreLink: '#asset-allocation'
  },
  {
    term: 'Compound Interest',
    definition: 'Interest calculated on both the initial principal and the accumulated interest from previous periods, effectively earning "interest on interest."',
    learnMoreLink: '#compound-interest'
  },
  {
    term: 'Tax-Loss Harvesting',
    definition: 'The practice of selling securities at a loss to offset capital gains tax liability, helping to minimize taxes on investment returns.',
    learnMoreLink: '#tax-loss-harvesting'
  },
  {
    term: 'Diversification',
    definition: "The strategy of spreading investments across various financial instruments to reduce risk and minimize the impact of any single investment's poor performance.",
    learnMoreLink: '#diversification'
  },
  {
    term: 'Dollar-Cost Averaging',
    definition: 'An investment strategy where a fixed dollar amount is invested regularly regardless of share price, reducing the impact of volatility over time.',
    learnMoreLink: '#dollar-cost-averaging'
  },
  {
    term: 'Fiduciary',
    definition: "A person or organization legally obligated to act in the best interest of another party, putting clients' interests ahead of their own.",
    learnMoreLink: '#fiduciary'
  },
  {
    term: 'Liquidity',
    definition: 'The ease with which an asset can be converted into cash without affecting its market price, important for emergency funds and short-term goals.',
    learnMoreLink: '#liquidity'
  },
  {
    term: 'Risk Tolerance',
    definition: 'The degree of variability in investment returns that an investor is willing to withstand, typically influenced by financial goals, timeframe, and comfort with market fluctuations.',
    learnMoreLink: '#risk-tolerance'
  }
];

interface FinancialTermGlossaryProps {
  term: string;
  children: React.ReactNode;
  variant?: "default" | "info" | "success" | "warning";
  showIcon?: boolean;
}

export const FinancialTerm: React.FC<FinancialTermGlossaryProps> = ({ 
  term, 
  children, 
  variant = "info",
  showIcon = true 
}) => {
  const glossaryTerm = financialTerms.find(
    (t) => t.term.toLowerCase() === term.toLowerCase()
  );

  if (!glossaryTerm) {
    return <>{children}</>;
  }

  return (
    <InteractiveTooltip
      trigger={children}
      title={glossaryTerm.term}
      content={
        <div className="space-y-2">
          <p>{glossaryTerm.definition}</p>
          {glossaryTerm.learnMoreLink && (
            <a 
              href={glossaryTerm.learnMoreLink} 
              className="block text-blue-600 hover:text-blue-800 text-xs font-medium pt-1"
            >
              Learn more about {glossaryTerm.term}
            </a>
          )}
        </div>
      }
      interactive={true}
      variant={variant}
      showIcon={showIcon}
      maxWidth="sm"
    />
  );
};

interface GlossaryButtonProps {
  term: string;
  variant?: "default" | "info" | "success" | "warning";
}

export const GlossaryButton: React.FC<GlossaryButtonProps> = ({ 
  term, 
  variant = "info" 
}) => {
  const glossaryTerm = financialTerms.find(
    (t) => t.term.toLowerCase() === term.toLowerCase()
  );

  if (!glossaryTerm) {
    return null;
  }

  return (
    <InteractiveTooltip
      trigger={
        <button className="inline-flex items-center text-blue-500 hover:text-blue-700 text-sm">
          <HelpCircle className="h-3.5 w-3.5 mr-1" />
          {glossaryTerm.term}
        </button>
      }
      title={glossaryTerm.term}
      content={
        <div className="space-y-2">
          <p>{glossaryTerm.definition}</p>
          {glossaryTerm.learnMoreLink && (
            <a 
              href={glossaryTerm.learnMoreLink} 
              className="block text-blue-600 hover:text-blue-800 text-xs font-medium pt-1"
            >
              Learn more about {glossaryTerm.term}
            </a>
          )}
        </div>
      }
      interactive={true}
      variant={variant}
      maxWidth="sm"
    />
  );
};

export const AllFinancialTerms = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {financialTerms.map((term) => (
        <div key={term.term} className="p-4 border rounded-md bg-white shadow-sm">
          <h3 className="font-medium text-charcoal mb-2">{term.term}</h3>
          <p className="text-sm text-charcoal/70">{term.definition}</p>
          {term.learnMoreLink && (
            <a 
              href={term.learnMoreLink} 
              className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2 inline-block"
            >
              Learn more
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default {
  FinancialTerm,
  GlossaryButton,
  AllFinancialTerms
};
