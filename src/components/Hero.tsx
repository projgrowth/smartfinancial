
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import GradientAccent from './GradientAccent';
import { MicroAnimations } from './ui/micro-animations';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { heroContent } from '../data/content';
import { useOptimizedAnimation, usePerformance } from '../hooks/usePerformance';
import { ANIMATION_TIMINGS } from '../config/site';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  const isMobile = useIsMobile();
  
  // Performance monitoring
  const { startMeasurement, endMeasurement } = usePerformance('Hero');
  
  // Word carousel from content data
  const { words, headline, description, cta } = heroContent;
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ''),
    [words]
  );
  const [index, setIndex] = useState(0);
  const [prevWord, setPrevWord] = useState<string | null>(null);
  
  // Optimized animation settings
  const { shouldAnimate, duration: exitDuration } = useOptimizedAnimation('NORMAL');
  
  // Intersection observer for performance optimization
  const { ref: heroRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false, // Keep observing for pause/resume
  });
  
  // Keep the headline centered by locking the rotator width to the longest word
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  const [rotatorWidth, setRotatorWidth] = useState<number>(0);

  // Performance measurement on render
  useEffect(() => {
    startMeasurement();
    return () => endMeasurement();
  }, [startMeasurement, endMeasurement]);

  // Measure and lock the rotator width to the longest word to prevent reflow
  useEffect(() => {
    let ro: ResizeObserver | null = null;
    let cleanup = () => {};

    const setup = () => {
      const el = placeholderRef.current;
      if (!el) return;
      const measure = () => setRotatorWidth(el.offsetWidth);
      measure();
      ro = new ResizeObserver(() => measure());
      ro.observe(el);
      window.addEventListener('resize', measure);
      cleanup = () => {
        ro?.disconnect();
        window.removeEventListener('resize', measure);
      };
    };

    const fontsReady = (document as any).fonts?.ready as Promise<void> | undefined;
    if (fontsReady && typeof fontsReady.then === 'function') {
      fontsReady.then(setup).catch(setup);
    } else {
      setup();
    }

    return () => cleanup();
  }, []);

  useEffect(() => {
    if (!shouldAnimate || !isIntersecting) return;
    
    const intervalId = window.setInterval(() => {
      setIndex((i) => {
        setPrevWord(words[i]);
        window.setTimeout(() => setPrevWord(null), exitDuration);
        return (i + 1) % words.length;
      });
    }, ANIMATION_TIMINGS.WORD_ROTATOR);
    
    return () => window.clearInterval(intervalId);
  }, [shouldAnimate, isIntersecting, words.length, exitDuration]);

  return (
    <section 
      ref={heroRef as React.RefObject<HTMLElement>}
      className="relative flex items-center justify-center min-h-[70vh] md:min-h-[calc(90svh-var(--nav-h))] pt-4 pb-8 md:pt-0 md:pb-0 overflow-hidden"
    >
      {/* Enhanced background accents with better positioning */}
      <GradientAccent variant="blue" position="top-right" size="md" intensity="ultra-low" animated className="opacity-[0.7]" />
      <div className="hidden sm:block">
        <GradientAccent variant="gold" position="bottom-left" size="sm" intensity="ultra-low" animated className="opacity-[0.6]" />
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
      
      <div className="container-site z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal distance="0px" duration={400}>
            <h1 className="heading-display-fluid text-balance">
              <div className="flex flex-col sm:flex-row sm:flex-nowrap items-center justify-center whitespace-normal sm:whitespace-nowrap gap-site-md">
                <span className="shrink-0 leading-none">{headline.prefix}</span>
                <span 
                  className="shrink-0 word-rotator text-center leading-none mt-0 sm:mt-0" 
                  aria-hidden="true" 
                  style={rotatorWidth ? { width: rotatorWidth } : undefined}
                >
                  <span ref={placeholderRef} aria-hidden="true" className="opacity-0 whitespace-nowrap">{longestWord}</span>
                  {prevWord && (
                    <span className="word-layer word-exit" aria-hidden="true">{prevWord}</span>
                  )}
                  <span
                    key={index}
                    className="word-layer word-enter text-accent"
                  >
                    {words[index]}
                  </span>
                </span>
                <span className="sr-only" aria-live="polite" aria-atomic="true">{headline.prefix} {words[index]}</span>
              </div>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={150} distance="0px" duration={400}>
            <p className="text-body-lg sm:text-body-xl mx-auto mb-7 sm:mb-8 max-w-2xl text-balance">
              {description}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={250} distance="0px" duration={400}>
            <MicroAnimations.ScaleOnHover scale="sm">
              <MicroAnimations.ShimmerButton
                onClick={() => smoothScrollTo(cta.targetSection)}
                aria-label={cta.ariaLabel}
                className="group w-auto min-w-[220px] mx-auto justify-center whitespace-nowrap text-sm sm:text-base px-4 sm:px-6 text-primary-foreground"
              >
                <span className="mr-2">
                  <span className="xs:hidden">{cta.text.mobile}</span>
                  <span className="hidden xs:inline sm:hidden">{cta.text.tablet}</span>
                  <span className="hidden sm:inline">{cta.text.desktop}</span>
                </span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </MicroAnimations.ShimmerButton>
            </MicroAnimations.ScaleOnHover>
          </ScrollReveal>
        </div>
      </div>

      {shouldAnimate && (
        <button
          onClick={() => smoothScrollTo(cta.targetSection)}
          aria-label="Scroll to schedule section"
          className={`absolute left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-all duration-300 min-h-[44px] min-w-[44px] bottom-[calc(1.5rem+env(safe-area-inset-bottom))] ${
            isMobile ? 'scale-75 opacity-60' : ''
          }`}
        >
          <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" aria-hidden="true" />
        </button>
      )}
    </section>
  );
};

export default Hero;
