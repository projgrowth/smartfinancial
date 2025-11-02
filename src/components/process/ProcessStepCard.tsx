
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
        className="h-full group focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-primary transition-all duration-300"
        role="article"
        aria-labelledby={`step-title-${step.id}`}
      >
      <div className="flex items-center justify-between mb-5">
        <span className="heading-lg text-accent font-heading font-medium opacity-90 block group-hover:text-accent/80 transition-colors duration-300">
          {step.number}
        </span>
        <div className="text-accent group-hover:text-accent/80 transition-colors duration-300">
          {step.icon}
        </div>
      </div>
      
      <h3 id={`step-title-${step.id}`} className="heading-sm font-heading font-medium mb-4 flex items-center text-primary-foreground">
        {step.title}
        {step.keyTerms.length > 0 && (
          <InteractiveTooltip
            trigger={
               <Button 
                 variant="subtle" 
                 size="xs" 
                 className="ml-2 text-accent cursor-pointer border border-accent/40 px-2 py-0.5 rounded-full hover:bg-accent/20 flex items-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none" 
                 aria-label={`Learn more about ${step.title}`}
               >
                <span className="sr-only">Learn about key terms</span>
                <Info className="w-3 h-3 mr-1" />
                <span>Learn</span>
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
        )}
      </h3>
      
      <p className="text-body mb-5 leading-relaxed transition-colors duration-300 text-primary-foreground/95">
        {step.description}
      </p>
      
      <Collapsible 
        open={activeStep === step.id} 
        onOpenChange={() => onStepClick(step.id)}
      >
        <CollapsibleTrigger 
          className="flex items-center text-body-sm text-accent-foreground hover:text-accent-foreground/80 transition-colors duration-300 font-medium px-3 py-1.5 rounded-full bg-accent/30 hover:bg-accent/50 border border-accent/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none" 
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
        <CollapsibleContent className="mt-5 space-y-4 border-t border-border pt-4">
          {step.details.map((detail, idx) => (
            <ScaleOnHover key={idx} scale="sm" className="bg-card/10 p-4 rounded-md hover:bg-card/20 border border-border shadow-sm">
              <h4 className="text-body-sm font-medium text-accent-foreground mb-2">{detail.title}</h4>
              <p className="text-body-sm leading-relaxed text-primary-foreground/90">{detail.description}</p>
            </ScaleOnHover>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </PremiumCard>
  );
};

export default ProcessStepCard;
