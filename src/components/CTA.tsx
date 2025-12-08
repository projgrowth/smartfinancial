
import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';

import { ArrowRight } from 'lucide-react';
import { preloadMeetingScheduler } from '@/utils/componentPreloader';

const CTA = () => {
  return (
    <section id="contact" className="section-bg-premium-dark section-lg relative overflow-hidden">
      
      <div className="container-default relative z-10">
        <ScrollReveal>
          <div className="cta-content-container bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h2 className="heading-lg space-component-md text-white">
              Ready for smarter financial strategies designed exclusively around you?
            </h2>
            <p className="text-body-lg text-white/90 space-component-lg max-w-2xl mx-auto">
              Take the first step toward financial clarity and strategic growth with a personalized approach.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="btn-premium group relative overflow-hidden hover:shadow-lg"
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
