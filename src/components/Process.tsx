import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProcessCards from './process/ProcessCards';
import ProcessTimeline from './process/ProcessTimeline';
import { getProcessSteps } from './process/processData';

const Process = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>("cards");
  const steps = getProcessSteps();

  const handleStepClick = (id: string) => {
    setActiveStep(activeStep === id ? null : id);
  };

  return (
    <section 
      id="process" 
      className="section-lg section-bg-premium-dark section-contain" 
      role="region"
      aria-labelledby="process-heading"
    >
      <div className="container-default relative z-10">
        <ScrollReveal distance="8px">
          <h2 id="process-heading" className="heading-lg text-center mb-4 text-white text-balance">
            <span className="inline-block relative">
              Our Process
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100} distance="6px">
          <p className="text-center max-w-2xl mx-auto mb-12 text-body-lg text-balance text-white/90">
            Our three-step approach is designed to create clarity, confidence, and continuous growth in your financial journey.
          </p>
        </ScrollReveal>

        <Tabs 
          defaultValue="cards" 
          value={activeView} 
          onValueChange={setActiveView} 
          className="w-full mb-8"
        >
          <TabsList className="tabs-list-dark" aria-label="Process view options">
            <TabsTrigger 
              value="cards" 
              className="tabs-trigger-dark"
              aria-label="Switch to visual overview of our process"
            >
              Visual Overview
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className="tabs-trigger-dark"
              aria-label="Switch to timeline view of our process"
            >
              Timeline View
            </TabsTrigger>
          </TabsList>
          
          <div className="relative mt-8">
            <TabsContent value="cards" className="mt-0 animate-fade-in">
              <ProcessCards steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0 animate-fade-in">
              <ProcessTimeline steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Process;
