
import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { ScaleOnHover } from '@/components/ui/micro-animations';
import { ProcessStep } from './types';
import { Button } from '@/components/ui/button';
import { PremiumCard } from '@/components/ui/premium-card';

interface ProcessStepCardProps {
  step: ProcessStep;
  activeStep: string | null;
  onStepClick: (id: string) => void;
}

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ 
  step, 
  activeStep, 
  onStepClick 
}) => {
  return (
      <PremiumCard 
        variant="dark" 
        size="lg"
        active={activeStep === step.id}
        className="h-full group focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-primary transition-all duration-150"
        role="article"
        aria-labelledby={`step-title-${step.id}`}
      >
      <div className="flex items-center justify-between mb-5">
        <span className="heading-lg text-white font-heading font-medium block group-hover:scale-[1.02] transition-all duration-150">
          {step.number}
        </span>
        <div className="text-white group-hover:scale-[1.02] transition-transform duration-150">
          {step.icon}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 id={`step-title-${step.id}`} className="heading-sm font-heading font-medium text-white">
          {step.title}
        </h3>
        {step.keyTerms.length > 0 && (
          <div className="mt-2">
            <InteractiveTooltip
              trigger={
                <Button 
                  variant="subtle" 
                  size="xs" 
                  className="text-white/90 cursor-pointer border border-white/40 bg-white/15 px-2.5 py-1 rounded-full hover:bg-white/25 hover:border-white/60 flex items-center gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none" 
                  aria-label={`Learn more about ${step.title}`}
                >
                  <Info className="w-3 h-3" aria-hidden="true" />
                  <span>Key terms</span>
                </Button>
              }
              content={
                <div className="space-y-3">
                  <h4 className="font-medium text-sm mb-2 border-b pb-1">Key Financial Concepts:</h4>
                  {step.keyTerms.map((term, idx) => (
                    <div key={idx} className="mb-3 last:mb-0">
                      <h5 className="text-sm font-medium">{term.term}</h5>
                      <p className="text-xs text-foreground/80 mt-0.5 leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
                </div>
              }
              interactive
              side="top"
              variant="info"
              maxWidth="sm"
            />
          </div>
        )}
      </div>
      
      <p className="text-body mb-5 leading-relaxed transition-colors duration-300 text-white/90">
        {step.description}
      </p>
      
      <Collapsible 
        open={activeStep === step.id} 
        onOpenChange={() => onStepClick(step.id)}
      >
        <CollapsibleTrigger 
          className="flex items-center text-body-sm text-white/90 hover:text-white transition-colors duration-150 font-medium px-3 py-1.5 rounded-full bg-accent/40 hover:bg-accent/60 border border-accent/60 hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          aria-expanded={activeStep === step.id}
        >
          {activeStep === step.id ? (
            <>
              <span>Show less</span>
              <ChevronUp className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              <span>Learn more</span>
              <ChevronDown className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-5 space-y-4 border-t border-white/20 pt-4">
          {step.details.map((detail, idx) => (
            <ScaleOnHover key={idx} scale="sm" className="bg-white/5 p-4 rounded-md hover:bg-white/10 border border-white/20 hover:border-white/30 shadow-sm transition-all duration-150">
              <h4 className="text-body-sm font-medium text-white mb-2">{detail.title}</h4>
              <p className="text-body-sm leading-relaxed text-white/85">{detail.description}</p>
            </ScaleOnHover>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </PremiumCard>
  );
};

export default React.memo(ProcessStepCard);
