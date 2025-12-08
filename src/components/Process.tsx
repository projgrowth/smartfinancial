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
  return <>
      <section id="process" className="section-lg section-bg-premium-dark relative overflow-hidden" aria-labelledby="process-heading">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Enhanced gradient accents */}
        <GradientAccent variant="blue" position="top-right" intensity="low" size="xl" animated />
        <GradientAccent variant="dark" position="bottom-left" intensity="medium" size="lg" animated />
        
        <div className="container-default relative z-10">
          <ScrollReveal>
            <h2 id="process-heading" className="heading-lg text-center mb-6 text-white text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="inline-block relative">
                Our Process
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></span>
              </span>
            </h2>
            <p className="text-center max-w-2xl mx-auto mb-10 leading-relaxed text-balance text-white/95">
              Our three-step approach is designed to create clarity, confidence, and continuous growth in your financial journey.
            </p>
          </ScrollReveal>

          <Tabs defaultValue="cards" value={activeView} onValueChange={setActiveView} className="w-full mb-10">
            <TabsList className="w-full max-w-md mx-auto mb-10 border border-white/30 shadow-lg rounded-full overflow-hidden bg-white/10 backdrop-blur-sm" aria-label="Process view options">
              <TabsTrigger 
                value="cards" 
                className="flex-1 font-medium py-2.5 rounded-full transition-all duration-300 data-[state=active]:bg-accent/60 data-[state=active]:shadow-[0_0_15px_hsl(var(--accent)/0.4)] text-white/85 data-[state=active]:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none" 
                data-state={activeView === "cards" ? "active" : "inactive"}
                onClick={() => setActiveView("cards")}
                aria-label="Switch to visual overview of our process"
              >
                Visual Overview
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="flex-1 font-medium py-2.5 rounded-full transition-all duration-300 data-[state=active]:bg-accent/60 data-[state=active]:shadow-[0_0_15px_hsl(var(--accent)/0.4)] text-white/85 data-[state=active]:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none" 
                data-state={activeView === "timeline" ? "active" : "inactive"}
                onClick={() => setActiveView("timeline")}
                aria-label="Switch to timeline view of our process"
              >
                Timeline View
              </TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <TabsContent value="cards" className="mt-0 transition-all duration-500 animate-fade-in">
                <ProcessCards steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-0 transition-all duration-500 animate-fade-in">
                <ProcessTimeline steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Add the section transition at the bottom with enhanced interaction */}
        <div className="relative z-10 mt-8 md:mt-10">
          <AnimatedSectionTransition style="curved" colorScheme="dark-to-light" position="bottom" height={60} showIcon={true} iconType="chevron" onClick={() => document.getElementById('services')?.scrollIntoView({
          behavior: 'smooth'
        })} />
        </div>
      </section>
    </>;
};
export default Process;