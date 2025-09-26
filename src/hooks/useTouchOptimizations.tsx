import { useCallback, useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface TouchOptimizationOptions {
  enableHapticFeedback?: boolean;
  enhancedTouchTargets?: boolean;
  adaptiveSpacing?: boolean;
}

export function useTouchOptimizations(options: TouchOptimizationOptions = {}) {
  const { 
    enableHapticFeedback = true, 
    enhancedTouchTargets = true,
    adaptiveSpacing = true 
  } = options;
  
  const isMobile = useIsMobile();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHapticFeedback || !navigator.vibrate) return;
    
    const patterns = {
      light: 10,
      medium: 25,
      heavy: 50
    };
    
    navigator.vibrate(patterns[type]);
  }, [enableHapticFeedback]);

  const getTouchTargetClasses = useCallback(() => {
    if (!enhancedTouchTargets || !isTouchDevice) return '';
    
    return 'min-h-[44px] min-w-[44px] touch-target-enhanced';
  }, [enhancedTouchTargets, isTouchDevice]);

  const getAdaptiveSpacingClasses = useCallback(() => {
    if (!adaptiveSpacing || !isMobile) return '';
    
    return 'touch-spacing-mobile';
  }, [adaptiveSpacing, isMobile]);

  const enhanceTouchInteraction = useCallback((element: HTMLElement | null) => {
    if (!element || !isTouchDevice) return;
    
    // Add touch-specific styling
    element.style.touchAction = 'manipulation';
    element.style.userSelect = 'none';
    (element.style as any).webkitTouchCallout = 'none';
    (element.style as any).webkitTapHighlightColor = 'transparent';
  }, [isTouchDevice]);

  return {
    isTouchDevice,
    isMobile,
    hapticFeedback,
    getTouchTargetClasses,
    getAdaptiveSpacingClasses,
    enhanceTouchInteraction
  };
}