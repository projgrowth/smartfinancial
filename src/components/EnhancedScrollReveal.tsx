import React, { ReactNode } from 'react';
import { useViewportAnimations } from '@/hooks/useViewportAnimations';
import { performanceManager } from '@/utils/performanceOptimization';

interface EnhancedScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

const directionTransforms = {
  up: 'translateY(2rem)',
  down: 'translateY(-2rem)',
  left: 'translateX(2rem)',
  right: 'translateX(-2rem)',
  fade: 'scale(0.95)'
};

const EnhancedScrollReveal: React.FC<EnhancedScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 600,
  distance = '2rem',
  direction = 'up',
  className = '',
  once = true,
  threshold = 0.1,
  rootMargin = '0px 0px -5%',
  stagger = false,
  staggerDelay = 100
}) => {
  const { ref, shouldAnimate } = useViewportAnimations({
    threshold,
    rootMargin,
    triggerOnce: once,
    staggerDelay: stagger ? staggerDelay : 0
  });

  const optimizedDuration = performanceManager.getOptimalDuration(duration);
  const prefersReducedMotion = performanceManager.prefersReducedMotion();
  
  const getTransform = () => {
    if (direction === 'up' || direction === 'down') {
      return distance;
    }
    return directionTransforms[direction];
  };

  const animationStyles = {
    opacity: shouldAnimate ? 1 : 0,
    transform: shouldAnimate ? 'translate3d(0, 0, 0)' : (
      direction === 'up' ? `translateY(${distance})` :
      direction === 'down' ? `translateY(-${distance})` :
      direction === 'left' ? `translateX(${distance})` :
      direction === 'right' ? `translateX(-${distance})` :
      'scale(0.95)'
    ),
    transitionDuration: prefersReducedMotion ? '0ms' : `${optimizedDuration}ms`,
    transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    transitionProperty: 'opacity, transform',
    willChange: shouldAnimate ? 'auto' : 'opacity, transform'
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all ${className}`}
      style={animationStyles}
    >
      {children}
    </div>
  );
};

export default EnhancedScrollReveal;