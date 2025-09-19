
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
      variant="process-dark" 
      size="lg"
      active={activeStep === step.id}
      className="h-full group"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-blue-300 text-4xl font-heading font-medium opacity-90 block group-hover:text-blue-200 transition-colors duration-300">
          {step.number}
        </span>
        <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
          {step.icon}
        </div>
      </div>
      
      <h3 className="text-xl font-heading font-medium mb-4 text-white flex items-center">
        {step.title}
        {step.keyTerms.length > 0 && (
          <InteractiveTooltip
            trigger={
              <Button 
                variant="subtle" 
                size="xs" 
                className="ml-2 text-blue-300 cursor-pointer text-xs border border-blue-400/40 px-2 py-0.5 rounded-full hover:bg-blue-400/20 flex items-center" 
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
                    <p className="text-xs text-charcoal/80 mt-0.5 leading-relaxed">{term.definition}</p>
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
      
      <p className="text-white/95 group-hover:text-white transition-colors duration-300 mb-5 leading-relaxed">
        {step.description}
      </p>
      
      <Collapsible 
        open={activeStep === step.id} 
        onOpenChange={() => onStepClick(step.id)}
      >
        <CollapsibleTrigger className="flex items-center text-sm text-blue-200 hover:text-blue-100 transition-colors duration-300 font-medium px-3 py-1.5 rounded-full bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/30" aria-expanded={activeStep === step.id}>
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
        <CollapsibleContent className="mt-5 space-y-4 border-t border-white/15 pt-4">
          {step.details.map((detail, idx) => (
            <ScaleOnHover key={idx} scale="sm" className="bg-charcoal/40 p-4 rounded-md hover:bg-charcoal/60 border border-charcoal/80 shadow-sm">
              <h4 className="text-sm font-medium text-blue-100 mb-2">{detail.title}</h4>
              <p className="text-xs text-white/90 leading-relaxed">{detail.description}</p>
            </ScaleOnHover>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </PremiumCard>
  );
};

export default ProcessStepCard;
