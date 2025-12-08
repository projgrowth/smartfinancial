import React, { ReactNode } from 'react';
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
  duration = 400,
  distance = '8px',
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
        transform: show ? 'translateY(0)' : `translateY(${distance})`,
        transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        transitionTimingFunction: 'ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
