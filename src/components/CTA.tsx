
import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { preloadMeetingScheduler } from '@/utils/componentPreloader';

const CTA = () => {
  return (
    <section 
      id="cta-section" 
      className="section-bg-premium-dark section-lg relative overflow-hidden"
      role="region"
      aria-labelledby="cta-heading"
    >
      <div className="container-default relative z-10">
        <ScrollReveal distance="8px">
          <div className="glass-effect-dark rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto text-center">
            <h2 id="cta-heading" className="heading-lg text-white mb-6">
              Ready for smarter financial strategies designed exclusively around you?
            </h2>
            <p className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Take the first step toward financial clarity and strategic growth with a personalized approach.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="group hover:shadow-md"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={preloadMeetingScheduler}
              onFocus={preloadMeetingScheduler}
              aria-label="Schedule your strategy session"
            >
              <span className="flex items-center gap-2">
                Schedule Your Strategy Session
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
              </span>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
