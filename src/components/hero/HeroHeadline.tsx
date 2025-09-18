import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';
import { useDesignSystemValues } from '../../hooks/useDesignSystemValues';

interface HeroHeadlineProps {
  prefix: string;
  words: string[];
}

const HeroHeadline: React.FC<HeroHeadlineProps> = ({ prefix, words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Centralized design system values
  const { 
    wordRotationInterval, 
    wordTransitionDuration, 
    animationDelayFast 
  } = useDesignSystemValues();

  // Memoize the longest word calculation for performance
  const longestWord = useMemo(() => 
    words.reduce((a, b) => (a.length >= b.length ? a : b), ''), 
    [words]
  );

  // Memoized word change handler for performance
  const handleWordChange = useCallback(() => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setIsAnimating(false);
    }, animationDelayFast);
  }, [words.length]);

  // Optimized word rotation with cleanup
  useEffect(() => {
    if (words.length <= 1) return; // Skip rotation for single word
    
    const interval = setInterval(handleWordChange, wordRotationInterval);
    
    return () => clearInterval(interval);
  }, [handleWordChange, wordRotationInterval, words.length]);

  return (
    <RevealOnScroll direction="fade" duration={600}>
      <h1 
        id="hero-heading"
        className="heading-display-fluid text-foreground"
      >
        {prefix} 
        <span 
          className="word-rotator inline-block relative font-medium" 
          style={{ minWidth: '12rem' }} 
          aria-live="polite"
        >
          {/* Invisible placeholder for consistent width */}
          <span 
            className="invisible"
            aria-hidden="true"
          >
            {longestWord}
          </span>
          
          {/* Current rotating word */}
          <span 
            className={`absolute inset-0 text-gradient transition-all ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            style={{
              transitionDuration: wordTransitionDuration
            }}
          >
            {words[currentIndex]}
          </span>
        </span>
      </h1>
    </RevealOnScroll>
  );
};

export default HeroHeadline;