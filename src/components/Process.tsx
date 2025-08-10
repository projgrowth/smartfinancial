
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
      {/* Add the section transition at the top */}
      <AnimatedSectionTransition 
        style="wave" 
        colorScheme="white-to-blue" 
        position="top" 
        height={50}
      />
      
      <section id="process" className="section-lg bg-gradient-to-br from-charcoal to-charcoal-dark text-white relative overflow-hidden" aria-labelledby="process-heading">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Enhanced gradient accents */}
        <GradientAccent variant="blue" position="top-right" intensity="low" size="xl" animated />
        <GradientAccent variant="dark" position="bottom-left" intensity="medium" size="lg" animated />
        
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <h2 id="process-heading" className="heading-lg text-center mb-6 text-white">
              <span className="inline-block relative">
                Our Process
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></span>
              </span>
            </h2>
            <p className="text-center text-white/95 max-w-2xl mx-auto mb-16 leading-relaxed">
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
              className="w-full max-w-md mx-auto mb-10 bg-charcoal/60 border border-white/15 shadow-md rounded-full overflow-hidden" 
              aria-label="Process view options"
            >
              <TabsTrigger 
                value="cards" 
                className="flex-1 data-[state=active]:bg-blue-600/50 data-[state=active]:text-white text-white/80 font-medium py-2.5 rounded-full transition-all duration-300" 
                onClick={() => setActiveView("cards")}
              >
                Visual Overview
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="flex-1 data-[state=active]:bg-blue-600/50 data-[state=active]:text-white text-white/80 font-medium py-2.5 rounded-full transition-all duration-300" 
                onClick={() => setActiveView("timeline")}
              >
                Timeline View
              </TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <TabsContent 
                value="cards" 
                className="mt-0 transition-all duration-500 animate-fade-in"
              >
                <ProcessCards 
                  steps={steps} 
                  activeStep={activeStep} 
                  onStepClick={handleStepClick} 
                />
              </TabsContent>
              
              <TabsContent 
                value="timeline" 
                className="mt-0 transition-all duration-500 animate-fade-in"
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
        <div className="relative z-10 mt-16">
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
