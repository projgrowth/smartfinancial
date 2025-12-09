/**
 * Hero Component - Clean Premium Design
 * 
 * CLEANUP APPLIED:
 * - Removed TrustLine badges (decluttered)
 * - Simplified to headline + subhead + single CTA
 * - Removed unnecessary imports
 * - Standardized spacing to design system tokens
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { Button } from '@/components/ui/button';
import { useTouchOptimizations } from '../hooks/useTouchOptimizations';
import { preloadMeetingScheduler } from '@/utils/componentPreloader';
import EnhancedScrollIndicator from './hero/EnhancedScrollIndicator';
import AnimatedGradientMesh from './hero/AnimatedGradientMesh';

const Hero = () => {
  const { hapticFeedback, getTouchTargetClasses } = useTouchOptimizations();

  return (
    <section 
      role="region"
      aria-label="Hero section"
      className="relative flex items-center justify-center min-h-[85svh] sm:min-h-[90svh] md:min-h-screen py-12 md:py-0 overflow-hidden section-bg-subtle"
    >
      <AnimatedGradientMesh />
      
      <div className="container-default z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 md:gap-8">
          
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
              onClick={() => {
                smoothScrollTo('schedule');
                hapticFeedback('medium');
              }}
              onMouseEnter={preloadMeetingScheduler}
              onFocus={preloadMeetingScheduler}
              aria-label="Schedule your private strategy call"
              className={`group mx-auto font-semibold shadow-lg hover:shadow-xl ${getTouchTargetClasses()}`}
            >
              <span className="flex items-center gap-2">
                <span>Schedule Your Consultation</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Button>
          </div>
          
        </div>
      </div>

      <EnhancedScrollIndicator
        onClick={() => {
          smoothScrollTo('schedule');
          hapticFeedback('light');
        }}
        onMouseEnter={preloadMeetingScheduler}
        onFocus={preloadMeetingScheduler}
        label="Learn More"
      />
    </section>
  );
};

export default Hero;
