import React, { useEffect, useState } from 'react';

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
  
  // Simple word rotation logic
  useEffect(() => {
    if (reduceMotion || !isVisible) return;
    
    const intervalId = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    
    return () => clearInterval(intervalId);
  }, [reduceMotion, isVisible, words.length]);
  
  return (
    <span className={`word-rotator ${className}`}>
      <span 
        key={index}
        className="word-layer word-enter text-accent"
      >
        {words[index]}
      </span>
      
      {/* Screen reader friendly */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {words[index]}
      </span>
    </span>
  );
};