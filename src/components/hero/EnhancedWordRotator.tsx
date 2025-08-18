import React, { useEffect, useState, useRef } from 'react';

interface EnhancedWordRotatorProps {
  words: string[];
  className?: string;
  reduceMotion?: boolean;
  isVisible?: boolean;
}

export const EnhancedWordRotator: React.FC<EnhancedWordRotatorProps> = ({
  words,
  className = '',
  reduceMotion = false,
  isVisible = true
}) => {
  const [index, setIndex] = useState(0);
  const [prevWord, setPrevWord] = useState<string | null>(null);
  const [rotatorWidth, setRotatorWidth] = useState<number>(0);
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  
  const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b), '');
  const exitDuration = 280;
  
  // Measure and lock the rotator width
  useEffect(() => {
    const element = placeholderRef.current;
    if (!element) return;
    
    const measure = () => setRotatorWidth(element.offsetWidth);
    measure();
    
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);
    
    return () => resizeObserver.disconnect();
  }, []);
  
  // Word rotation logic
  useEffect(() => {
    if (reduceMotion || !isVisible) return;
    
    const intervalId = setInterval(() => {
      setIndex((i) => {
        setPrevWord(words[i]);
        setTimeout(() => setPrevWord(null), exitDuration);
        return (i + 1) % words.length;
      });
    }, 2200);
    
    return () => clearInterval(intervalId);
  }, [reduceMotion, isVisible, words.length, exitDuration]);
  
  return (
    <span 
      className={`enhanced-word-rotator ${className}`}
      style={rotatorWidth ? { width: rotatorWidth } : undefined}
    >
      {/* Invisible placeholder for width measurement */}
      <span 
        ref={placeholderRef} 
        className="opacity-0 absolute whitespace-nowrap pointer-events-none"
        aria-hidden="true"
      >
        {longestWord}
      </span>
      
      {/* Exiting word */}
      {prevWord && (
        <span className="enhanced-word-layer enhanced-word-exit text-accent">
          {prevWord.split('').map((char, i) => (
            <span 
              key={`${prevWord}-${i}`}
              className="enhanced-word-char"
              style={{ animationDelay: `${i * 20}ms` }}
            >
              {char}
            </span>
          ))}
        </span>
      )}
      
      {/* Current word */}
      <span 
        key={index}
        className="enhanced-word-layer enhanced-word-enter text-accent"
      >
        {words[index].split('').map((char, i) => (
          <span 
            key={`${words[index]}-${i}`}
            className="enhanced-word-char"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            {char}
          </span>
        ))}
      </span>
      
      {/* Screen reader friendly */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {words[index]}
      </span>
    </span>
  );
};