/**
 * Case Study Card Component
 * Displays anonymized case studies with compliance notes
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteSettings } from '@/config/siteSettings';

export interface CaseStudyData {
  clientType: string;
  scenario: string;
  approach: string;
  outcome: string;
  complianceNote: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudyData;
  ctaText?: string;
  onCtaClick?: () => void;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  caseStudy, 
  ctaText = siteSettings.cta.primary,
  onCtaClick 
}) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-card border border-border/40 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-150">
      {/* Header */}
      <div className="bg-accent/5 border-b border-border/30 px-6 py-4">
        <span className="text-xs font-medium uppercase tracking-wider text-accent">
          Case Study
        </span>
        <h3 className="heading-sm mt-1">{caseStudy.clientType}</h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Scenario</h4>
          <p className="text-body-sm text-muted-foreground">{caseStudy.scenario}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Our Approach</h4>
          <p className="text-body-sm text-muted-foreground">{caseStudy.approach}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Outcome</h4>
          <p className="text-body-sm text-muted-foreground">{caseStudy.outcome}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 space-y-4">
        <Button
          variant="outline"
          className="w-full group"
          onClick={handleCtaClick}
        >
          <span className="flex items-center justify-center gap-2">
            {ctaText}
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
          </span>
        </Button>

        <p className="text-xs text-muted-foreground italic">
          {caseStudy.complianceNote}
        </p>
      </div>
    </div>
  );
};

export default CaseStudyCard;
