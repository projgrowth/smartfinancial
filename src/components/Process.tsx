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
          <h2 id="process-heading" className="heading-lg text-center text-white text-balance">
            Our Process
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100} distance="6px">
          <p className="text-center max-w-2xl mx-auto text-body-lg text-balance text-white/80">
            Our three-step approach is designed to create clarity, confidence, and continuous growth in your financial journey.
          </p>
        </ScrollReveal>

        <div className="space-component-lg">

          <Tabs 
            defaultValue="cards" 
            value={activeView} 
            onValueChange={setActiveView} 
            className="w-full"
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
            
            <div className="space-component-md">
              <TabsContent value="cards" className="mt-0 animate-fade-in">
                <ProcessCards steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-0 animate-fade-in">
                <ProcessTimeline steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Process;
