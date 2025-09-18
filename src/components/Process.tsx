
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import AnimatedSectionTransition from './AnimatedSectionTransition';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Import refactored components
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
    <>
      <section id="process" className="section-lg gradient-charcoal text-primary-foreground relative overflow-hidden" aria-labelledby="process-heading">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Enhanced gradient accents */}
        <GradientAccent variant="blue" position="top-right" intensity="low" size="xl" animated />
        <GradientAccent variant="dark" position="bottom-left" intensity="medium" size="lg" animated />
        
        <div className="container-site relative z-10">
          <ScrollReveal>
            <h2 id="process-heading" className="heading-lg text-center space-component-md text-primary-foreground">
              <span className="inline-block relative">
                Our Process
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></span>
              </span>
            </h2>
            <p className="text-center text-primary-foreground/95 container-narrow mx-auto space-component-lg leading-relaxed">
              Our three-step approach is designed to create clarity, confidence, and continuous growth in your financial journey.
            </p>
          </ScrollReveal>

          <Tabs 
            defaultValue="cards" 
            value={activeView}
            onValueChange={setActiveView} 
            className="w-full mb-10"
          >
            <TabsList 
              className="w-full container-narrow mx-auto space-component-lg bg-charcoal/60 border border-primary-foreground/15 shadow-md rounded-full overflow-hidden" 
              aria-label="Process view options"
            >
              <TabsTrigger 
                value="cards" 
                className="flex-1 data-[state=active]:bg-accent/50 data-[state=active]:text-primary-foreground text-primary-foreground/80 font-medium py-2.5 rounded-full transition-all duration-normal" 
                onClick={() => setActiveView("cards")}
              >
                Visual Overview
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="flex-1 data-[state=active]:bg-accent/50 data-[state=active]:text-primary-foreground text-primary-foreground/80 font-medium py-2.5 rounded-full transition-all duration-normal" 
                onClick={() => setActiveView("timeline")}
              >
                Timeline View
              </TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <TabsContent 
                value="cards" 
                className="mt-0 transition-all duration-slow animate-fade-in"
              >
                <ProcessCards 
                  steps={steps} 
                  activeStep={activeStep} 
                  onStepClick={handleStepClick} 
                />
              </TabsContent>
              
              <TabsContent 
                value="timeline" 
                className="mt-0 transition-all duration-slow animate-fade-in"
              >
                <ProcessTimeline 
                  steps={steps} 
                  activeStep={activeStep} 
                  onStepClick={handleStepClick} 
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Add the section transition at the bottom with enhanced interaction */}
        <div className="relative z-10 space-component-md">
          <AnimatedSectionTransition 
            style="curved" 
            colorScheme="dark-to-light" 
            position="bottom" 
            height={50}
            showIcon={true}
            iconType="chevron"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </section>
    </>
  );
};

export default Process;
