import React, { useEffect, useState } from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';

interface HeroHeadlineProps {
  prefix: string;
  words: string[];
}

const HeroHeadline: React.FC<HeroHeadlineProps> = ({ prefix, words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simplified word rotation with smooth transitions
  useEffect(() => {
    const rotationInterval = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--word-rotation-interval')
    ) || 3000;

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 150); // Half transition duration for smooth swap
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [words.length]);

  // Get the longest word for consistent spacing
  const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b), '');

  return (
    <RevealOnScroll direction="fade" duration={800}>
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
              transitionDuration: 'var(--word-transition-duration, 300ms)'
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