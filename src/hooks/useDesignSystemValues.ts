import { useMemo } from 'react';

interface DesignSystemValues {
  animationDelayFast: number;
  animationDelayNormal: number;
  animationDelaySlow: number;
  animationDelayExtraSlow: number;
  wordRotationInterval: number;
  wordTransitionDuration: string;
  transitionFast: string;
  transitionNormal: string;
  transitionSlow: string;
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
      animationDelayFast: parseInt(computedStyle.getPropertyValue('--animation-delay-fast')) || 100,
      animationDelayNormal: parseInt(computedStyle.getPropertyValue('--animation-delay-normal')) || 200,
      animationDelaySlow: parseInt(computedStyle.getPropertyValue('--animation-delay-slow')) || 400,
      animationDelayExtraSlow: parseInt(computedStyle.getPropertyValue('--animation-delay-extra-slow')) || 600,
      wordRotationInterval: parseInt(computedStyle.getPropertyValue('--word-rotation-interval')) || 3000,
      wordTransitionDuration: computedStyle.getPropertyValue('--word-transition-duration') || '500ms',
      transitionFast: computedStyle.getPropertyValue('--transition-fast') || '150ms ease-out',
      transitionNormal: computedStyle.getPropertyValue('--transition-normal') || '300ms ease-out',
      transitionSlow: computedStyle.getPropertyValue('--transition-slow') || '500ms ease-out',
    };
  }, []);
};