
import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { ScaleOnHover } from '@/components/ui/micro-animations';
import { ProcessStep } from './types';
import { Button } from '@/components/ui/button';

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
      className={`glass-dark hover:bg-charcoal/50 transition-all duration-500 p-8 rounded-lg h-full border ${activeStep === step.id ? 'border-blue-400/50 shadow-lg shadow-blue-900/10' : 'border-white/15'} group`}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-blue-300 text-4xl font-heading font-medium opacity-90 block group-hover:text-blue-200 transition-colors duration-300">
          {step.number}
        </span>
        <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
          {step.icon}
        </div>
      </div>
      
      <h3 className="heading-sm text-primary-foreground flex items-center space-component-sm">
        {step.title}
        {step.keyTerms.length > 0 && (
          <InteractiveTooltip
            trigger={
              <Button asChild variant="subtle" size="xs" className="text-accent cursor-pointer text-body-sm border border-accent/40 touch-target-sm rounded-full hover:bg-accent/20 flex items-center" aria-label={`Learn more about ${step.title}`}>
                <button>
                  <span className="sr-only">Learn about key terms</span>
                  <Info className="icon-xs" />
                  <span>Learn</span>
                </button>
              </Button>
            }
            content={
              <div className="space-component-sm">
                <h4 className="font-medium text-body-sm border-b pb-1">Key Financial Concepts:</h4>
                {step.keyTerms.map((term, idx) => (
                  <div key={idx} className="space-component-xs last:mb-0">
                    <h5 className="text-body-sm font-medium">{term.term}</h5>
                    <p className="text-body-xs text-muted-foreground leading-relaxed">{term.definition}</p>
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
      
      <p className="text-primary-foreground/95 group-hover:text-primary-foreground transition-colors duration-300 space-component-md leading-relaxed">
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
    </div>
  );
};

export default ProcessStepCard;
