import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDesignSystemValues } from '../../hooks/useDesignSystemValues';

interface HeroWordRotatorProps {
  words: string[];
}

const HeroWordRotator: React.FC<HeroWordRotatorProps> = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const { 
    wordRotationInterval, 
    wordTransitionDuration, 
    animationDelayFast 
  } = useDesignSystemValues();

  // Calculate the longest word for consistent container width
  const longestWord = useMemo(() => 
    words.reduce((a, b) => (a.length >= b.length ? a : b), ''), 
    [words]
  );

  // Enhanced word change with better timing
  const changeWord = useCallback(() => {
    if (words.length <= 1) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, animationDelayFast);
    }, animationDelayFast);
  }, [words.length, animationDelayFast]);

  // Start rotation after initial delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, 2000); // Start rotating after 2 seconds

    return () => clearTimeout(startTimer);
  }, []);

  // Main rotation loop
  useEffect(() => {
    if (!hasStarted || words.length <= 1) return;
    
    const interval = setInterval(changeWord, wordRotationInterval);
    return () => clearInterval(interval);
  }, [hasStarted, changeWord, wordRotationInterval, words.length]);

  return (
    <span 
      className="relative inline-block" 
      style={{ minWidth: '12rem' }}
      aria-live="polite"
      aria-label="Rotating words showcasing our services"
    >
      {/* Invisible placeholder for consistent width */}
      <span 
        className="invisible"
        aria-hidden="true"
      >
        {longestWord}
      </span>
      
      {/* Current word with enhanced animations */}
      <span 
        className={`absolute inset-0 text-gradient font-semibold transition-all ${
          isAnimating 
            ? 'opacity-0 scale-95 blur-sm' 
            : 'opacity-100 scale-100 blur-0'
        }`}
        style={{
          transitionDuration: wordTransitionDuration,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {words[currentIndex]}
      </span>
      
      {/* Subtle glow effect */}
      <span 
        className={`absolute inset-0 text-gradient font-semibold opacity-20 transition-opacity ${
          isAnimating ? 'opacity-0' : 'opacity-20'
        }`}
        style={{
          transitionDuration: wordTransitionDuration,
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
        aria-hidden="true"
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};

export default HeroWordRotator;