import React, { useState, useEffect } from 'react';
import { useScrollManager } from '@/hooks/useScrollManager';

interface ScrollProgressProps {
  className?: string;
  showPercentage?: boolean;
  position?: 'top' | 'bottom';
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  showPercentage = false,
  position = 'top'
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useScrollManager({
    progressCallback: (newProgress) => {
      setProgress(newProgress * 100);
      setIsVisible(newProgress > 0.05 && newProgress < 0.95);
    }
  });

  const positionClasses = {
    top: 'top-0 left-0',
    bottom: 'bottom-0 left-0'
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} w-full z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      <div className="h-1 bg-background/20 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-primary via-primaryGlow to-accent transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showPercentage && isVisible && (
        <div className="absolute top-2 right-4 text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ScrollProgress;