
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
    <div className="relative">
      {/* Enhanced timeline marker with animation */}
      <div className="absolute -left-[41px] top-0">
        <div className={`p-1.5 rounded-full border-4 ${
          isActive 
            ? 'bg-blue-600 border-blue-300/70 shadow-md shadow-blue-500/20' 
            : 'bg-charcoal border-blue-400/50'
        } transition-colors duration-300`}>
          <div className={`h-4 w-4 rounded-full ${
            isActive ? 'bg-blue-300 animate-pulse' : 'bg-blue-400'
          } transition-all duration-300`}></div>
        </div>
      </div>
      
      {/* Enhanced card with better shadows and hover effects */}
      <PremiumCard 
        variant="timeline"
        size="default"
        active={isActive}
        className="transition-all duration-300"
      >
        <div className="flex items-center mb-5">
          <span className={`${
            isActive ? 'text-blue-300 scale-110' : 'text-blue-300'
          } text-3xl font-heading font-medium mr-3 transition-all duration-300`}>
            {step.number}
          </span>
          <h3 className="text-xl font-heading font-medium" style={{ color: 'hsl(var(--primary-foreground))' }}>{step.title}</h3>
        </div>
        
        <p className="mb-6 leading-relaxed" style={{ color: 'hsl(var(--primary-foreground) / 0.95)' }}>{step.description}</p>
        
        <Collapsible 
          open={isActive} 
          onOpenChange={() => onStepClick(step.id)}
        >
          <CollapsibleTrigger className={`
            flex items-center text-sm font-medium px-4 py-2 rounded-full 
            ${isActive 
              ? 'bg-accent/60 hover:bg-accent/80 border-accent/50' 
              : 'text-blue-200 hover:text-blue-100 bg-blue-900/30 hover:bg-blue-900/50 border-blue-700/30'
            } transition-colors duration-300 border`
          } style={{ color: isActive ? 'hsl(var(--primary-foreground))' : undefined }} aria-expanded={isActive}>
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
          
          <CollapsibleContent className="mt-6 space-y-5 border-t border-white/15 pt-5">
            <div className="grid grid-cols-1 gap-4">
              {step.details.map((detail, idx) => (
                <div 
                  key={idx} 
                  className="bg-charcoal/60 p-4 rounded-md border border-charcoal/80 shadow-sm hover:border-blue-900/40 transition-all duration-300"
                >
                  <h4 className="text-sm font-medium text-blue-100 mb-2 flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                    {detail.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--primary-foreground) / 0.9)' }}>{detail.description}</p>
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
