import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ParallaxBackground, ScrollTrigger } from './ui/parallax-container';
import { AnimatedGradientText, RevealOnScroll } from './ui/enhanced-animations';
import { Button } from './ui/button';
import GradientAccent from './GradientAccent';
import { useLocation } from 'react-router-dom';
import { heroContent } from '../data/content';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  // Enhanced word carousel with CSS variables from design system
  const { words, headline, description, cta } = heroContent;
  const [index, setIndex] = useState(0);
  
  // Word rotation using design system timing
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--word-rotation-interval')) || 3000);
    
    return () => clearInterval(interval);
  }, [words.length]);

  // Keep the headline centered by locking width to longest word
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('contact');
  };

  return (
    <ParallaxBackground 
      gradient="linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent)/0.05) 50%, hsl(var(--background)) 100%)"
      intensity={0.3}
      className="relative min-h-screen flex items-center justify-center"
    >
      <section 
        className="relative w-full flex items-center justify-center"
        aria-labelledby="hero-heading"
      >
        <GradientAccent variant="blue" position="top-right" intensity="low" animated />
        <GradientAccent variant="subtle" position="bottom-left" intensity="ultra-low" />
        
        <div className="container-site relative z-10 text-center">
          <RevealOnScroll direction="fade" duration={800}>
            <h1 
              id="hero-heading"
              className="heading-display-fluid mb-8 text-foreground"
            >
              {headline.prefix} 
              <span className="word-rotator inline-block relative w-52" aria-live="polite">
                {/* Invisible placeholder for consistent width */}
                <span 
                  ref={placeholderRef}
                  className="invisible font-medium"
                  aria-hidden="true"
                >
                  {words.reduce((a, b) => (a.length >= b.length ? a : b), '')}
                </span>
                
                {/* Rotating words with enhanced animation */}
                <AnimatedGradientText 
                  variant="wave"
                  className="word-layer absolute inset-0 font-medium transition-all"
                  style={{
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform',
                    transitionDuration: 'var(--word-transition-duration)'
                  }}
                >
                  {words[index]}
                </AnimatedGradientText>
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll 
            direction="up" 
            delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-normal')) || 200}
            duration={600}
          >
            <p className="text-body-xl text-muted-foreground space-component-md max-w-3xl mx-auto">
              {description}
            </p>
          </RevealOnScroll>

          <RevealOnScroll 
            direction="up" 
            delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-slow')) || 400}
            duration={600}
          >
            <div className="flex flex-col sm:flex-row gap-site-md justify-center items-center">
              <Button
                onClick={handleCTAClick}
                variant="premium"
                size="lg"
                className="group hover-glow spring-bounce"
              >
                {cta.text.desktop}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </RevealOnScroll>

          {!isEducationPage && (
            <RevealOnScroll 
              direction="fade" 
              delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-extra-slow')) || 600}
              duration={500}
            >
              <div className="mt-16 text-center">
                <p className="text-body-sm text-muted-foreground/80 space-component-xs">
                  Trusted by ambitious professionals in Central Florida
                </p>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>
    </ParallaxBackground>
  );
};

export default Hero;
