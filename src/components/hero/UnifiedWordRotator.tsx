import React, { useEffect, useState, useRef } from 'react';

interface UnifiedWordRotatorProps {
  words: string[];
  className?: string;
  reduceMotion?: boolean;
  isVisible?: boolean;
}

export const UnifiedWordRotator: React.FC<UnifiedWordRotatorProps> = ({
  words,
  className = '',
  reduceMotion = false,
  isVisible = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Calculate the width needed for all words to prevent layout shift
  const maxWidth = React.useMemo(() => {
    if (typeof window === 'undefined') return 'auto';
    
    // Create temporary element to measure text width
    const temp = document.createElement('span');
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.fontSize = 'inherit';
    temp.style.fontFamily = 'inherit';
    temp.style.fontWeight = 'inherit';
    temp.style.letterSpacing = 'inherit';
    temp.style.whiteSpace = 'nowrap';
    
    document.body.appendChild(temp);
    
    let maxWidth = 0;
    words.forEach(word => {
      temp.textContent = word;
      maxWidth = Math.max(maxWidth, temp.offsetWidth);
    });
    
    document.body.removeChild(temp);
    return `${maxWidth + 8}px`; // Add small buffer
  }, [words]);

  // Word rotation logic
  useEffect(() => {
    if (reduceMotion || !isVisible || words.length <= 1) return;
    
    const rotateWords = () => {
      if (!isAnimating) {
        setIsAnimating(true);
        
        // Short delay for exit animation
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % words.length);
          setIsAnimating(false);
        }, 250);
      }
    };

    intervalRef.current = setInterval(rotateWords, 2200);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [words, reduceMotion, isVisible, isAnimating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (reduceMotion || words.length === 0) {
    return (
      <span className={`inline-block ${className}`}>
        {words[0] || ''}
      </span>
    );
  }

  return (
    <span 
      ref={containerRef}
      className={`word-rotator-unified ${className}`}
      style={{ 
        minWidth: maxWidth,
        height: '1.2em' // Prevent vertical layout shift
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span 
        key={`${currentIndex}-${words[currentIndex]}`}
        className={`word-layer-unified ${isAnimating ? 'word-exit-unified' : 'word-enter-unified'}`}
      >
        {words[currentIndex]}
      </span>
      
      {/* Screen reader friendly - announce current word */}
      <span className="sr-only">
        {words[currentIndex]}
      </span>
    </span>
  );
};