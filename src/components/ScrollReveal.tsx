
import React, { useRef, ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: string;
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 500,
  distance = '2rem',
  className = '',
  once = true,
  threshold = 0.1,
  rootMargin = '0px',
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = isIntersecting || prefersReducedMotion;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all ${className}`}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translate3d(0, 0, 0)' : `translate3d(0, ${distance}, 0)`,
        transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        willChange: show ? 'auto' : 'transform',
        pointerEvents: show ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
