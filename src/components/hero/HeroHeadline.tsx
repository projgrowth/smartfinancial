import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';

interface HeroHeadlineProps {
  prefix: string;
  words: string[];
}

const HeroHeadline: React.FC<HeroHeadlineProps> = ({ prefix, words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoize the longest word calculation for performance
  const longestWord = useMemo(() => 
    words.reduce((a, b) => (a.length >= b.length ? a : b), ''), 
    [words]
  );

  // Memoize rotation interval calculation
  const rotationInterval = useMemo(() => 
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--word-rotation-interval')
    ) || 3000,
    []
  );

  // Memoized word change handler for performance
  const handleWordChange = useCallback(() => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setIsAnimating(false);
    }, 150);
  }, [words.length]);

  // Optimized word rotation with cleanup
  useEffect(() => {
    if (words.length <= 1) return; // Skip rotation for single word
    
    const interval = setInterval(handleWordChange, rotationInterval);
    
    return () => clearInterval(interval);
  }, [handleWordChange, rotationInterval, words.length]);

  return (
    <RevealOnScroll direction="fade" duration={800}>
      <h1 
        id="hero-heading"
        className="heading-display-fluid text-foreground"
        role="banner"
      >
        {prefix} 
        <span 
          className="word-rotator inline-block relative font-medium" 
          style={{ minWidth: '12rem' }} 
          aria-live="polite"
          aria-label={`Rotating between: ${words.join(', ')}`}
          role="status"
        >
          {/* Invisible placeholder for consistent width */}
          <span 
            className="invisible"
            aria-hidden="true"
          >
            {longestWord}
          </span>
          
          {/* Current rotating word with improved accessibility */}
          <span 
            className={`absolute inset-0 text-gradient transition-all ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            style={{
              transitionDuration: 'var(--word-transition-duration, 300ms)'
            }}
            aria-label={`Currently showing: ${words[currentIndex]}`}
          >
            {words[currentIndex]}
          </span>
        </span>
      </h1>
    </RevealOnScroll>
  );
};

export default HeroHeadline;