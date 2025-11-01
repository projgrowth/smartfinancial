
import React from 'react';
import ScrollReveal from '../ScrollReveal';
import ProcessStepCard from './ProcessStepCard';
import { ProcessStep } from './types';

interface ProcessCardsProps {
  steps: ProcessStep[];
  activeStep: string | null;
  onStepClick: (id: string) => void;
}

const ProcessCards: React.FC<ProcessCardsProps> = ({ 
  steps, 
  activeStep, 
  onStepClick 
}) => {
  return (
    <div className="grid-three-col">
      {steps.map((step) => (
        <ScrollReveal key={step.id} delay={steps.indexOf(step) * 150}>
          <ProcessStepCard 
            step={step} 
            activeStep={activeStep} 
            onStepClick={onStepClick} 
          />
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ProcessCards;
