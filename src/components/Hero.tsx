
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

import { UnifiedWordRotator } from './hero/UnifiedWordRotator';
import { HeroBackground } from './hero/HeroBackground';
import { EnhancedCTA } from './hero/EnhancedCTA';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  const isMobile = useIsMobile();
  
  // Word carousel for headline
  const words = useMemo(() => ['Elevated.', 'Optimized.', 'Protected.', 'Compounded.'], []);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  // Intersection observer for performance optimization
  const { ref: heroRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  // Motion and interaction handlers
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReduce = () => setReduceMotion(mqReduce.matches);
    handleReduce();
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!reduceMotion && !isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    mqReduce.addEventListener?.('change', handleReduce);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      mqReduce.removeEventListener?.('change', handleReduce);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reduceMotion, isMobile]);

  return (
    <section 
      ref={heroRef as React.RefObject<HTMLElement>}
      className="relative flex items-center justify-center min-h-[80vh] md:min-h-[90vh] safari-mobile:min-h-[65vh] pt-4 pb-8 md:pt-0 md:pb-0 overflow-hidden hero-section"
    >
      {/* Enhanced dynamic background */}
      <HeroBackground 
        isEducationPage={isEducationPage}
        mousePosition={mousePosition}
        scrollY={scrollY}
      />
      
      <div className="container-site z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal distance="0px" duration={500}>
            <h1 className="heading-display text-balance">
              <div className="flex flex-col sm:flex-row sm:flex-nowrap items-center justify-center whitespace-normal sm:whitespace-nowrap space-component-sm">
                <span className="shrink-0 leading-none">Your wealth.</span>
                <UnifiedWordRotator 
                  words={words}
                  className="shrink-0 text-center leading-none"
                  reduceMotion={reduceMotion}
                  isVisible={isIntersecting}
                />
              </div>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200} distance="0px" duration={500}>
            <p className="text-body-lg sm:text-body-xl mx-auto mb-8 sm:mb-10 max-w-2xl text-balance">
              Tailored financial strategies for ambitious professionals who demand more than 
              cookie-cutter solutions. We help you build, protect, and grow your wealth.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={350} distance="0px" duration={500}>
            <button 
              onClick={() => smoothScrollTo('schedule')}
              className="btn-primary"
            >
              Start Your Financial Journey
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </ScrollReveal>
        </div>
      </div>

      {!reduceMotion && (
        <button
          onClick={() => smoothScrollTo('schedule')}
          aria-label="Scroll to schedule section"
          className={`enhanced-scroll-indicator absolute left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent transition-all duration-500 focus-enhanced bottom-[calc(1.5rem+env(safe-area-inset-bottom))] touch-target ${
            isMobile ? 'scale-75 opacity-70' : ''
          }`}
        >
          <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" aria-hidden="true" />
        </button>
      )}
    </section>
  );
};

export default Hero;
