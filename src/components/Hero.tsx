
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';

import GradientAccent from './GradientAccent';
import { MicroAnimations } from './ui/micro-animations';
import { useLocation } from 'react-router-dom';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  // Word carousel for headline
  const words = useMemo(() => ['Elevated.', 'Optimized.', 'Protected.', 'Compounded.'], []);
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ''),
    [words]
  );
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [prevWord, setPrevWord] = useState<string | null>(null);
  const exitDuration = 350;
  
  // Keep the headline centered by locking the rotator width to the longest word
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  const [rotatorWidth, setRotatorWidth] = useState<number>(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mqMobile = window.matchMedia('(max-width: 640px)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMobile = () => setIsMobile(mqMobile.matches);
    const handleReduce = () => setReduceMotion(mqReduce.matches);

    handleMobile();
    handleReduce();

    mqMobile.addEventListener?.('change', handleMobile);
    mqReduce.addEventListener?.('change', handleReduce);

    return () => {
      mqMobile.removeEventListener?.('change', handleMobile);
      mqReduce.removeEventListener?.('change', handleReduce);
    };
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
    if (reduceMotion) return;
    const intervalId = window.setInterval(() => {
      setIndex((i) => {
        setPrevWord(words[i]);
        window.setTimeout(() => setPrevWord(null), exitDuration);
        return (i + 1) % words.length;
      });
    }, isMobile ? 3000 : 2400);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [isMobile, reduceMotion, words.length]);

  return (
    <section className="relative flex items-center justify-center min-h-[calc(100svh-var(--nav-h))] py-12 sm:py-16 overflow-hidden">
      {/* Enhanced background accents */}
      <GradientAccent variant="blue" position="top-right" size="xl" intensity="ultra-low" animated />
      <div className="hidden sm:block">
        <GradientAccent variant="gold" position="bottom-left" size="lg" intensity="low" animated />
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
      
      <div className="container-unified z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="heading-display-fluid leading-[1.05] sm:leading-[1.02] tracking-tight mb-5 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:flex-nowrap items-center sm:items-baseline justify-center whitespace-normal sm:whitespace-nowrap gap-x-2 sm:gap-x-3 gap-y-0 sm:gap-y-1">
                <span className="shrink-0 leading-none">Your wealth.</span>
                <span className="shrink-0 word-rotator text-left leading-none mt-[-1px] sm:mt-0" aria-live="polite" style={rotatorWidth ? { width: rotatorWidth } : undefined}>
                  <span ref={placeholderRef} className="opacity-0 whitespace-nowrap">{longestWord}</span>
                  {prevWord && (
                    <span className="word-layer word-exit">{prevWord}</span>
                  )}
                  <span
                    key={index}
                    className="word-layer word-enter text-primary"
                  >
                    {words[index]}
                  </span>
                </span>
              </div>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-body-lg sm:text-body-xl mx-auto mb-8 sm:mb-10 max-w-2xl text-balance">
              Tailored financial strategies for ambitious professionals who demand more than 
              cookie-cutter solutions. We help you build, protect, and grow your wealth.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <MicroAnimations.ScaleOnHover scale="sm">
              <MicroAnimations.ShimmerButton
                onClick={() => smoothScrollTo('schedule')}
                aria-label="Schedule your private strategy call"
                className="group w-full sm:w-auto justify-center whitespace-nowrap text-sm sm:text-base px-4 sm:px-6"
              >
                <span className="mr-2">
                  <span className="xs:hidden">Schedule</span>
                  <span className="hidden xs:inline sm:hidden">Schedule Call</span>
                  <span className="hidden sm:inline">Schedule Your Private Strategy Call</span>
                </span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </MicroAnimations.ShimmerButton>
            </MicroAnimations.ScaleOnHover>
          </ScrollReveal>
        </div>
      </div>

      {!reduceMotion && !isMobile && (
        <button
          onClick={() => smoothScrollTo('schedule')}
          aria-label="Scroll to schedule section"
          className="absolute left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors focus-enhanced bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" aria-hidden="true" />
        </button>
      )}
    </section>
  );
};

export default Hero;
