
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
      <div className="absolute -left-[41px] top-0 bg-charcoal p-1.5 rounded-full border-4 border-blue-400/50">
        <div className="h-4 w-4 rounded-full bg-blue-400"></div>
      </div>
      <div className="bg-charcoal/30 border border-white/15 p-6 rounded-lg hover:bg-charcoal/40 transition-all shadow-md">
        <div className="flex items-center mb-4">
          <span className="text-blue-300 text-3xl font-heading font-medium mr-3">{step.number}</span>
          <h3 className="text-xl font-heading font-medium text-white">{step.title}</h3>
        </div>
        <p className="text-white/95 mb-5 leading-relaxed">{step.description}</p>
        
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
              <div key={idx} className="bg-charcoal/40 p-4 rounded-md border border-charcoal/80 shadow-sm">
                <h4 className="text-sm font-medium text-blue-100 mb-2">{detail.title}</h4>
                <p className="text-xs text-white/90 leading-relaxed">{detail.description}</p>
              </div>
            ))}
            {step.keyTerms.length > 0 && (
              <div className="mt-6">
                <KeyTerms terms={step.keyTerms} />
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ProcessTimelineItem;
