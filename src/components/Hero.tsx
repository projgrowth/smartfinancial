
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import PremiumHeroBackground from './PremiumHeroBackground';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  const isMobile = useIsMobile();
  
  // Word carousel for headline
  const words = useMemo(() => ['Elevated.', 'Optimized.', 'Protected.', 'Compounded.'], []);
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ''),
    [words]
  );
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [prevWord, setPrevWord] = useState<string | null>(null);
  const exitDuration = 350;
  
  // Intersection observer for performance optimization
  const { ref: heroRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false, // Keep observing for pause/resume
  });
  
  // Keep the headline centered by locking the rotator width to the longest word
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  const [rotatorWidth, setRotatorWidth] = useState<number>(0);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReduce = () => setReduceMotion(mqReduce.matches);
    handleReduce();
    mqReduce.addEventListener?.('change', handleReduce);
    return () => mqReduce.removeEventListener?.('change', handleReduce);
  }, []);

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
    if (reduceMotion || !isIntersecting) return;
    
    const intervalId = window.setInterval(() => {
      setIndex((i) => {
        setPrevWord(words[i]);
        window.setTimeout(() => setPrevWord(null), exitDuration);
        return (i + 1) % words.length;
      });
    }, 2500); // Unified timing across devices
    
    return () => window.clearInterval(intervalId);
  }, [reduceMotion, isIntersecting, words.length, exitDuration]);

  return (
    <section 
      ref={heroRef as React.RefObject<HTMLElement>}
      className="relative flex items-center justify-center min-h-[calc(90svh-var(--nav-h))] md:min-h-[calc(100svh-var(--nav-h))] pt-4 pb-8 md:pt-0 md:pb-0 overflow-hidden"
    >
      {/* Premium Background */}
      <PremiumHeroBackground variant="primary" />
      
      <div className="container-unified z-10 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal distance="0px" duration={400}>
            <h1 className="heading-display-premium mb-6 sm:mb-8 text-balance">
              <div className="flex flex-col sm:flex-row sm:flex-nowrap items-center sm:items-center justify-center whitespace-normal sm:whitespace-nowrap gap-x-2 sm:gap-x-4 gap-y-2 sm:gap-y-0">
                <span className="shrink-0 leading-none">Your wealth.</span>
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
                    className="word-layer word-enter text-gold-light"
                  >
                    {words[index]}
                  </span>
                </span>
                <span className="sr-only" aria-live="polite" aria-atomic="true">Your wealth. {words[index]}</span>
              </div>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={150} distance="0px" duration={400}>
            <p className="text-premium text-lg sm:text-xl mx-auto mb-8 sm:mb-10 max-w-3xl text-balance leading-relaxed">
              Tailored financial strategies for ambitious professionals who demand more than 
              cookie-cutter solutions. We help you build, protect, and grow your wealth with 
              sophisticated precision.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={250} distance="0px" duration={400}>
            <Button
              onClick={() => smoothScrollTo('schedule')}
              aria-label="Schedule your private strategy call"
              className="btn-premium group w-auto min-w-[240px] mx-auto justify-center whitespace-nowrap text-sm sm:text-base focus-enhanced"
            >
              <span className="mr-3 font-medium">
                <span className="xs:hidden">Schedule Call</span>
                <span className="hidden xs:inline sm:hidden">Schedule Strategy Call</span>
                <span className="hidden sm:inline">Schedule Your Private Strategy Call</span>
              </span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </ScrollReveal>
        </div>
      </div>

      {!reduceMotion && (
        <button
          onClick={() => smoothScrollTo('schedule')}
          aria-label="Scroll to schedule section"
          className={`absolute left-1/2 -translate-x-1/2 text-gold/60 hover:text-gold transition-all duration-300 focus-enhanced bottom-[calc(1.5rem+env(safe-area-inset-bottom))] touch-target ${
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
