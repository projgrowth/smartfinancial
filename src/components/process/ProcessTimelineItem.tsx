
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ProcessStep } from './types';
import KeyTerms from './KeyTerms';

interface ProcessTimelineItemProps {
  step: ProcessStep;
  activeStep: string | null;
  onStepClick: (id: string) => void;
}

const ProcessTimelineItem: React.FC<ProcessTimelineItemProps> = ({ 
  step, 
  activeStep, 
  onStepClick 
}) => {
  return (
    <div className="relative">
      <div className="absolute -left-[41px] top-0 bg-charcoal p-1.5 rounded-full border-4 border-blue-400/30">
        <div className="h-4 w-4 rounded-full bg-blue-400"></div>
      </div>
      <div className="bg-charcoal/20 border border-white/10 p-6 rounded-lg hover:bg-charcoal/30 transition-all">
        <div className="flex items-center mb-3">
          <span className="text-blue-400 text-3xl font-heading font-medium mr-3">{step.number}</span>
          <h3 className="text-xl font-heading font-medium text-white">{step.title}</h3>
        </div>
        <p className="text-white/90 mb-4">{step.description}</p>
        
        <Collapsible 
          open={activeStep === step.id} 
          onOpenChange={() => onStepClick(step.id)}
        >
          <CollapsibleTrigger className="flex items-center text-sm text-blue-300 hover:text-blue-200 transition-colors duration-300" aria-expanded={activeStep === step.id}>
            {activeStep === step.id ? (
              <>
                <span>Show less</span>
                <ChevronUp className="ml-1 h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <span>Learn more</span>
                <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3 border-t border-white/10 pt-3">
            {step.details.map((detail, idx) => (
              <div key={idx} className="bg-charcoal/30 p-3 rounded-md">
                <h4 className="text-sm font-medium text-blue-200 mb-1">{detail.title}</h4>
                <p className="text-xs text-white/80">{detail.description}</p>
              </div>
            ))}
            {step.keyTerms.length > 0 && (
              <KeyTerms terms={step.keyTerms} />
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ProcessTimelineItem;
