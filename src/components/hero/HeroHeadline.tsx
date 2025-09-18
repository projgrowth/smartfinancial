import React, { useEffect, useState, useRef } from 'react';
import { AnimatedGradientText, RevealOnScroll } from '../ui/enhanced-animations';

interface HeroHeadlineProps {
  prefix: string;
  words: string[];
}

const HeroHeadline: React.FC<HeroHeadlineProps> = ({ prefix, words }) => {
  const [index, setIndex] = useState(0);
  const placeholderRef = useRef<HTMLSpanElement | null>(null);

  // Word rotation using design system timing
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--word-rotation-interval')) || 3000);
    
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <RevealOnScroll direction="fade" duration={800}>
      <h1 
        id="hero-heading"
        className="heading-display-fluid text-foreground"
      >
        {prefix} 
        <span className="word-rotator inline-block relative" style={{ minWidth: '12rem' }} aria-live="polite">
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
  );
};

export default HeroHeadline;