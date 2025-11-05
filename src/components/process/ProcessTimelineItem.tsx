
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ProcessStep } from './types';
import KeyTerms from './KeyTerms';
import { PremiumCard } from '@/components/ui/premium-card';

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
  const isActive = activeStep === step.id;
  
  return (
    <div className="relative" role="article" aria-labelledby={`timeline-step-title-${step.id}`}>
      {/* Enhanced timeline marker with animation */}
      <div className="absolute -left-[41px] top-0">
        <div className={`p-1.5 rounded-full border-4 ${
          isActive 
            ? 'bg-accent border-accent/70 shadow-md shadow-accent/20' 
            : 'bg-card/10 border-accent/50'
        } transition-colors duration-300`}>
          <div className={`h-4 w-4 rounded-full ${
            isActive ? 'bg-accent/80 animate-pulse' : 'bg-accent/60'
          } transition-all duration-300`}></div>
        </div>
      </div>
      
      {/* Enhanced card with better shadows and hover effects */}
        <PremiumCard 
          variant="timeline"
          size="default"
          active={isActive}
          className="transition-all duration-300 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-primary"
        >
        <div className="flex items-center mb-5">
          <span className={`${
            isActive ? 'text-accent scale-110' : 'text-accent'
          } text-3xl font-heading font-medium mr-3 transition-all duration-300`}>
            {step.number}
          </span>
          <h3 id={`timeline-step-title-${step.id}`} className="text-xl font-heading font-medium text-accent-foreground">{step.title}</h3>
        </div>
        
        <p className="mb-6 leading-relaxed text-accent-foreground/90">{step.description}</p>
        
        <Collapsible 
          open={isActive} 
          onOpenChange={() => onStepClick(step.id)}
        >
          <CollapsibleTrigger className={`
            flex items-center text-sm font-medium px-4 py-2 rounded-full 
            ${isActive 
              ? 'bg-accent/60 hover:bg-accent/80 border-accent/50 text-accent-foreground' 
              : 'text-accent-foreground hover:text-accent-foreground/80 bg-accent/30 hover:bg-accent/50 border-accent/30'
            } transition-colors duration-300 border 
            focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none`
          } aria-expanded={isActive}>
            {isActive ? (
              <>
                <span>Show less</span>
                <ChevronUp className="ml-1.5 h-4 w-4 animate-bounce-subtle" aria-hidden="true" />
              </>
            ) : (
              <>
                <span>Learn more</span>
                <ChevronDown className="ml-1.5 h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" aria-hidden="true" />
              </>
            )}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-6 space-y-5 border-t border-border pt-5">
            <div className="grid grid-cols-1 gap-4">
              {step.details.map((detail, idx) => (
                <div 
                  key={idx} 
                  className="bg-card/10 p-4 rounded-md border border-border shadow-sm hover:border-accent/40 transition-all duration-300"
                >
                  <h4 className="text-sm font-medium text-accent-foreground mb-2 flex items-center">
                    <span className="w-1 h-1 bg-accent rounded-full mr-2"></span>
                    {detail.title}
                  </h4>
                   <p className="text-xs leading-relaxed text-accent-foreground/90">{detail.description}</p>
                </div>
              ))}
            </div>
            
            {step.keyTerms.length > 0 && (
              <div className="mt-6">
                <KeyTerms terms={step.keyTerms} />
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </PremiumCard>
    </div>
  );
};

export default ProcessTimelineItem;
