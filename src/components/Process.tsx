
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import AnimatedSectionTransition from './AnimatedSectionTransition';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Deep Discovery',
      description: 'We dive deep to understand your financial landscape, ambitions, and opportunities that others overlook.'
    },
    {
      number: '02',
      title: 'Bespoke Blueprint',
      description: 'Receive a custom-crafted financial strategy, from investments and tax optimization to advanced wealth protection.'
    },
    {
      number: '03',
      title: 'Growth & Guidance',
      description: 'Benefit from ongoing strategic reviews, adjustments, and proactive insights as your life evolves.'
    }
  ];

  return (
    <>
      {/* Add the section transition at the top */}
      <AnimatedSectionTransition 
        style="wave" 
        colorScheme="white-to-blue" 
        position="top" 
        height={50}
      />
      
      <section id="process" className="section bg-charcoal text-white relative overflow-hidden py-24">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Gradient accents */}
        <GradientAccent variant="blue" position="top-right" intensity="low" size="xl" />
        <GradientAccent variant="dark" position="bottom-left" intensity="medium" size="lg" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <h2 className="heading-lg text-center mb-16 text-white">Our Process</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="glass-dark hover:bg-charcoal/40 transition-all duration-500 p-8 rounded-lg h-full border border-white/10 group">
                  <span className="text-blue-400 text-4xl font-heading font-medium opacity-80 block mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-heading font-medium mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-lightgray group-hover:text-white/90 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
