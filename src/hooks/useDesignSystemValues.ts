import { useMemo } from 'react';

interface DesignSystemValues {
  animationDelayNormal: number;
  animationDelaySlow: number;
  animationDelayExtraSlow: number;
  wordRotationInterval: number;
  wordTransitionDuration: string;
  transitionNormal: string;
}

/**
 * Custom hook to centralize CSS variable reading and provide fallbacks
 * Prevents performance bottlenecks from repeated getComputedStyle calls
 */
export const useDesignSystemValues = (): DesignSystemValues => {
  return useMemo(() => {
    const documentElement = document.documentElement;
    const computedStyle = getComputedStyle(documentElement);

    return {
      animationDelayNormal: parseInt(computedStyle.getPropertyValue('--animation-delay-normal')) || 200,
      animationDelaySlow: parseInt(computedStyle.getPropertyValue('--animation-delay-slow')) || 400,
      animationDelayExtraSlow: parseInt(computedStyle.getPropertyValue('--animation-delay-extra-slow')) || 600,
      wordRotationInterval: parseInt(computedStyle.getPropertyValue('--word-rotation-interval')) || 3000,
      wordTransitionDuration: computedStyle.getPropertyValue('--word-transition-duration') || '300ms',
      transitionNormal: computedStyle.getPropertyValue('--transition-normal') || '0.3s ease',
    };
  }, []);
};