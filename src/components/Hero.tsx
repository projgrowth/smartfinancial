import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { useLocation } from 'react-router-dom';
import { heroContent } from '../data/content';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  // Simplified word carousel from content data
  const { words, headline, description, cta } = heroContent;
  const [index, setIndex] = useState(0);
  
  // Simple word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // 3 second rotation
    
    return () => clearInterval(interval);
  }, [words.length]);

  // Keep the headline centered by locking width to longest word
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('contact');
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      <GradientAccent variant="blue" position="top-right" intensity="low" animated />
      <GradientAccent variant="subtle" position="bottom-left" intensity="ultra-low" />
      
      <div className="container-site relative z-10 text-center">
        <ScrollReveal>
          <h1 
            id="hero-heading"
            className="heading-display-fluid mb-8 text-foreground"
          >
            {headline.prefix} 
            <span className="word-rotator inline-block relative min-w-[200px]" aria-live="polite">
              {/* Invisible placeholder for consistent width */}
              <span 
                ref={placeholderRef}
                className="invisible font-medium"
                aria-hidden="true"
              >
                {words.reduce((a, b) => (a.length >= b.length ? a : b), '')}
              </span>
              
              {/* Rotating words */}
              <span 
                className="word-layer absolute inset-0 font-medium text-accent transition-all duration-500"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                {words[index]}
              </span>
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-body-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            {description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleCTAClick}
              className="btn-primary group"
            >
              {cta.text.desktop}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

        {!isEducationPage && (
          <ScrollReveal delay={600}>
            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground/80 mb-4">
                Trusted by ambitious professionals in Central Florida
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default Hero;
