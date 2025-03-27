
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
      
      <section id="process" className="section bg-charcoal text-white relative overflow-hidden py-24" aria-labelledby="process-heading">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Gradient accents */}
        <GradientAccent variant="blue" position="top-right" intensity="low" size="xl" />
        <GradientAccent variant="dark" position="bottom-left" intensity="medium" size="lg" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <h2 id="process-heading" className="heading-lg text-center mb-6 text-white">Our Process</h2>
            <p className="text-center text-light-gray max-w-2xl mx-auto mb-16">
              Our three-step approach is designed to create clarity, confidence, and continuous growth in your financial journey.
            </p>
          </ScrollReveal>

          <Tabs defaultValue="cards" className="w-full mb-10">
            <TabsList className="w-full max-w-md mx-auto mb-8 bg-charcoal/40 border border-white/10" aria-label="Process view options">
              <TabsTrigger value="cards" className="flex-1 data-[state=active]:bg-blue-500/20">Visual Overview</TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1 data-[state=active]:bg-blue-500/20">Timeline View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cards" className="mt-0">
              <ProcessCards 
                steps={steps} 
                activeStep={activeStep} 
                onStepClick={handleStepClick} 
              />
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <ProcessTimeline 
                steps={steps} 
                activeStep={activeStep} 
                onStepClick={handleStepClick} 
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Add the section transition at the bottom */}
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
