
import React from 'react';
import ScrollReveal from '../ScrollReveal';
import ProcessTimelineItem from './ProcessTimelineItem';
import { ProcessStep } from './types';

interface ProcessTimelineProps {
  steps: ProcessStep[];
  activeStep: string | null;
  onStepClick: (id: string) => void;
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ 
  steps, 
  activeStep, 
  onStepClick 
}) => {
  return (
    <div className="relative max-w-3xl mx-auto pl-6 border-l-2 border-accent/30 space-y-12">
      {steps.map((step, idx) => (
        <ScrollReveal key={step.id} delay={idx * 150}>
          <ProcessTimelineItem 
            step={step} 
            activeStep={activeStep} 
            onStepClick={onStepClick} 
          />
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ProcessTimeline;
