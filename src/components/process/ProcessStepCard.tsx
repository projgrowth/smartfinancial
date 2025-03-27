
import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { ScaleOnHover } from '@/components/ui/micro-animations';
import { ProcessStep } from './types';

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
    <div 
      className={`glass-dark hover:bg-charcoal/40 transition-all duration-500 p-8 rounded-lg h-full border border-white/10 group ${activeStep === step.id ? 'bg-charcoal/40 border-blue-400/30' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-blue-400 text-4xl font-heading font-medium opacity-80 block group-hover:text-blue-300 transition-colors duration-300">
          {step.number}
        </span>
        {step.icon}
      </div>
      
      <h3 className="text-xl font-heading font-medium mb-4 text-white flex items-center">
        {step.title}
        {step.keyTerms.length > 0 && (
          <InteractiveTooltip
            trigger={
              <button className="ml-2 text-blue-400 cursor-pointer text-xs border border-blue-400/30 px-1 rounded hover:bg-blue-400/10 flex items-center" aria-label={`Learn more about ${step.title}`}>
                <span className="sr-only">Learn about key terms</span>
                <Info className="w-3 h-3 mr-1" />
                <span>Learn</span>
              </button>
            }
            content={
              <div className="space-y-2">
                <h4 className="font-medium text-sm mb-1">Key Financial Concepts:</h4>
                {step.keyTerms.map((term, idx) => (
                  <div key={idx} className="mb-2">
                    <h5 className="text-sm font-medium">{term.term}</h5>
                    <p className="text-xs text-charcoal/70">{term.definition}</p>
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
      
      <p className="text-white/90 group-hover:text-white transition-colors duration-300 mb-4">
        {step.description}
      </p>
      
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
            <ScaleOnHover key={idx} scale="sm" className="bg-charcoal/30 p-3 rounded-md hover:bg-charcoal/50">
              <h4 className="text-sm font-medium text-blue-200 mb-1">{detail.title}</h4>
              <p className="text-xs text-white/80">{detail.description}</p>
            </ScaleOnHover>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProcessStepCard;
