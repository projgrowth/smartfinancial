/**
 * Hero Component - HNW Positioning Update
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { Button } from '@/components/ui/button';
import EnhancedScrollIndicator from './hero/EnhancedScrollIndicator';
import AnimatedGradientMesh from './hero/AnimatedGradientMesh';
import { siteSettings } from '@/config/siteSettings';

const Hero = () => {
  return (
    <section 
      role="region"
      aria-label="Hero section"
      className="relative flex items-center justify-center min-h-[85svh] sm:min-h-[90svh] md:min-h-screen section-lg overflow-hidden section-bg-subtle"
    >
      <AnimatedGradientMesh />
      
      <div className="container-default z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
          
          <h1 className="heading-display-fluid tracking-tight text-balance font-bold text-foreground">
            Your Wealth.{' '}
            <span className="text-gradient-accent">
              Elevated.
            </span>
          </h1>
          
          <p className="text-body-lg sm:text-body-xl mx-auto max-w-2xl text-balance text-muted-foreground">
            You've built significant wealth. Now let's preserve it, multiply it, and pass it on — on your terms.
          </p>
          
          <div className="pt-2">
            <Button
              variant="shimmer"
              size="lg"
              onClick={() => smoothScrollTo('schedule')}
              aria-label="Request your wealth strategy session"
              className="group mx-auto font-semibold shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <span>{siteSettings.cta.hero}</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Button>
          </div>
          
        </div>
      </div>

      <EnhancedScrollIndicator
        onClick={() => smoothScrollTo('schedule')}
        label="Learn More"
      />
    </section>
  );
};

export default Hero;
