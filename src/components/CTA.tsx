import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { siteSettings } from '@/config/siteSettings';

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
          <div className="glass-effect-dark rounded-2xl section-md shadow-lg max-w-4xl mx-auto text-center flex flex-col items-center gap-unified-md">
            <h2 id="cta-heading" className="heading-lg text-white">
              Ready for smarter financial strategies designed exclusively around you?
            </h2>
            <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
              Take the first step toward financial clarity and strategic growth with a personalized approach.
            </p>
            <p className="text-body-sm text-white/60">
              We work with clients who have {siteSettings.qualification.minimumAssetsText} or are {siteSettings.qualification.alternateQualification}.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="group hover:shadow-md"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Request your wealth strategy session"
            >
              <span className="flex items-center gap-2">
                {siteSettings.cta.primary}
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
