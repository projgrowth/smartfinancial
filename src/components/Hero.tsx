/**
 * Hero Component - Minimalist Design
 * 
 * Features:
 * - Static headline: "Your Wealth. Elevated."
 * - Responsive subheadline and CTA
 * - Enhanced scroll indicator with label
 * - Background gradients from GradientAccent
 * - Special bull shape on /education page
 * 
 * No word carousel - intentionally removed for clarity and performance.
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { useTouchOptimizations } from '../hooks/useTouchOptimizations';
import { preloadMeetingScheduler } from '@/utils/componentPreloader';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  const isMobile = useIsMobile();
  const { hapticFeedback, getTouchTargetClasses } = useTouchOptimizations();

  return (
    <section 
      className="hero-section relative flex items-center justify-center min-h-[85svh] sm:min-h-[90svh] md:min-h-[calc(100svh-var(--nav-h))] py-8 sm:py-12 md:py-0 overflow-hidden"
    >
      {/* Background gradients */}
      <GradientAccent variant="blue" position="top-right" size="md" intensity="ultra-low" animated />
      <div className="hidden sm:block">
        <GradientAccent variant="gold" position="bottom-left" size="sm" intensity="ultra-low" animated />
      </div>
      
      {/* Bull shape gradient only on education page */}
      {isEducationPage && (
        <GradientAccent 
          variant="bull" 
          position="center" 
          size="2xl" 
          intensity="ultra-low" 
          shape="bull" 
          animated 
          className="opacity-[0.05] mix-blend-screen" 
        />
      )}
      
      <div className="container-unified px-4 sm:px-6 md:px-8 lg:px-12 z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            
            <ScrollReveal distance="20px" duration={400}>
              <h1 className="heading-display-fluid tracking-tight text-balance max-w-3xl mx-auto">
                Your Wealth. <span className="text-accent">Elevated.</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={200} distance="16px" duration={400}>
              <p className="text-body-lg sm:text-body-xl mx-auto max-w-2xl text-balance">
                Financial planning for ambitious professionals who demand more than average.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={350} distance="12px" duration={400}>
              <div className="mt-2 sm:mt-4">
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
                  className={`hero-cta-button group w-auto min-w-[220px] mx-auto justify-center whitespace-nowrap text-primary-foreground ${getTouchTargetClasses()}`}
                >
                  <span className="gap-unified-xs">
                    <span className="xs:hidden">Schedule</span>
                    <span className="hidden xs:inline sm:hidden">Schedule Call</span>
                    <span className="hidden sm:inline">Schedule Your Private Consultation</span>
                  </span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </div>
            </ScrollReveal>
            
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator with label */}
      <div className="absolute bottom-[calc(2rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase hidden md:block">
          Discover How
        </span>
        <button
          onClick={() => {
            smoothScrollTo('schedule');
            hapticFeedback('light');
          }}
          onMouseEnter={preloadMeetingScheduler}
          onFocus={preloadMeetingScheduler}
          aria-label="Scroll to schedule section"
          className={`text-muted-foreground hover:text-foreground transition-all duration-300 focus-enhanced ${getTouchTargetClasses()} ${
            isMobile ? 'scale-75 opacity-60' : ''
          }`}
        >
          <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
