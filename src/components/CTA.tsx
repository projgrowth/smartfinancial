
import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ArrowRight } from 'lucide-react';
import { preloadMeetingScheduler } from '@/utils/componentPreloader';

const CTA = () => {
  return (
    <section id="contact" className="section-bg-premium-dark section-lg relative overflow-hidden">
      {/* Floating gradient accents using design system */}
      <div className="floating-gradient-accent-primary left-0 top-0 w-[40%] h-[80%] -translate-x-1/4"></div>
      <div className="floating-gradient-accent-secondary right-0 bottom-0 w-[40%] h-[80%] translate-x-1/4"></div>
      
      {/* Gradient accents for depth */}
      <GradientAccent variant="blue" position="top-left" intensity="low" animated />
      <GradientAccent variant="subtle" position="bottom-right" intensity="ultra-low" />
      
      <div className="container-default relative z-10">
        <ScrollReveal>
          <div className="cta-content-container">
            <h2 className="heading-lg space-component-md text-primary-foreground">
              Ready for smarter financial strategies designed exclusively around you?
            </h2>
            <p className="text-body-lg text-primary-foreground/80 space-component-lg max-w-2xl mx-auto">
              Take the first step toward financial clarity and strategic growth with a personalized approach.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="btn-premium group relative overflow-hidden"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={preloadMeetingScheduler}
              onFocus={preloadMeetingScheduler}
            >
              <span className="relative z-10 flex items-center gap-unified-xs">
                Schedule Your Strategy Session
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
