/**
 * Hero Component - Enhanced Premium Design
 * 
 * Features:
 * - Static headline with gradient accent: "Your Wealth. Elevated."
 * - Elevation bars visual anchor
 * - Enhanced backgrounds with multiple gradients
 * - Trust indicators and credibility badges
 * - Responsive scroll indicator with pulsing ring
 * - Noise texture and radial overlays
 * - Special bull shape on /education page
 * - Smooth animation choreography
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
import ElevationBars from './hero/ElevationBars';
import TrustLine from './hero/TrustLine';
import EnhancedScrollIndicator from './hero/EnhancedScrollIndicator';
import NoiseOverlay from './hero/NoiseOverlay';
import RadialGradientOverlay from './hero/RadialGradientOverlay';
import AnimatedGradientMesh from './hero/AnimatedGradientMesh';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  const isMobile = useIsMobile();
  const { hapticFeedback, getTouchTargetClasses } = useTouchOptimizations();

  return (
    <section 
      role="region"
      aria-label="Hero section"
      className="hero-section relative flex items-center justify-center min-h-[85svh] sm:min-h-[90svh] md:min-h-[calc(100svh-var(--nav-h))] py-8 sm:py-12 md:py-0 overflow-hidden"
      style={{
        background: 'var(--gradient-background)',
      }}
    >
      {/* Animated Gradient Mesh */}
      <AnimatedGradientMesh />
      
      {/* Enhanced Background System */}
      <GradientAccent variant="blue" position="top-right" size="md" intensity="high" animated />
      <div className="hidden sm:block">
        <GradientAccent variant="gold" position="bottom-left" size="md" intensity="high" animated />
      </div>
      <GradientAccent variant="purple" position="center" size="lg" intensity="medium" animated />
      
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
      
      {/* Radial gradient overlay */}
      <RadialGradientOverlay />
      
      {/* Noise texture */}
      <NoiseOverlay />
      
      {/* Elevation Bars - Visual Anchor */}
      <ElevationBars />
      
      <div className="container-unified z-10 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-col gap-unified-lg">
            
            <ScrollReveal 
              distance="20px" 
              duration={500}
              delay={0}
            >
              <h1 className="heading-display-fluid tracking-tight text-balance max-w-3xl mx-auto font-bold text-foreground">
                Your Wealth.{' '}
                <span className="text-gradient-accent inline-block [filter:var(--shadow-text-gradient)]">
                  Elevated.
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal 
              delay={150} 
              distance="16px" 
              duration={500}
            >
              <p className="text-body-lg sm:text-body-xl mx-auto max-w-2xl text-balance text-muted-foreground font-medium">
                Financial planning for ambitious professionals who demand more than average.
              </p>
            </ScrollReveal>
            
            <ScrollReveal 
              delay={250} 
              distance="12px" 
              duration={500}
            >
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
                  className={`hero-cta-button group w-auto min-w-[220px] mx-auto justify-center whitespace-nowrap text-primary-foreground font-semibold text-base [box-shadow:var(--shadow-button-primary)] hover:[box-shadow:var(--shadow-button-hover)] ${getTouchTargetClasses()}`}
                >
                  <span className="gap-unified-xs">
                    <span className="xs:hidden">Schedule</span>
                    <span className="hidden xs:inline sm:hidden">Schedule Call</span>
                    <span className="hidden sm:inline">Schedule Your Private Consultation</span>
                  </span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-0" aria-hidden="true" />
                </Button>
              </div>
            </ScrollReveal>
            
            {/* Trust Indicators */}
            <ScrollReveal 
              delay={400} 
              distance="8px" 
              duration={500}
            >
              <TrustLine className="mt-4" />
            </ScrollReveal>
            
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <EnhancedScrollIndicator
        onClick={() => {
          smoothScrollTo('schedule');
          hapticFeedback('light');
        }}
        onMouseEnter={preloadMeetingScheduler}
        onFocus={preloadMeetingScheduler}
        label="Discover How"
        isMobile={isMobile}
      />
    </section>
  );
};

export default Hero;
