import { useEffect, useCallback } from 'react';
import { isSafariMobile } from '@/utils/safariDetection';

interface ViewportDimensions {
  height: number;
  width: number;
  isAddressBarVisible: boolean;
}

export function useSafariViewport() {
  const updateViewportHeight = useCallback(() => {
    if (!isSafariMobile()) return;

    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    
    // Set CSS custom properties for dynamic viewport
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    
    // Detect if address bar is likely visible (approximate)
    const screenHeight = window.screen.height;
    const heightRatio = window.innerHeight / screenHeight;
    const isAddressBarVisible = heightRatio < 0.85;
    
    document.documentElement.style.setProperty(
      '--address-bar-height', 
      isAddressBarVisible ? '44px' : '0px'
    );
    
    // Update scroll margin to account for dynamic nav height
    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '80'
    );
    const adjustedNavHeight = navHeight + (isAddressBarVisible ? 44 : 0);
    
    document.documentElement.style.setProperty('--nav-h-adjusted', `${adjustedNavHeight}px`);
  }, []);

  const handleViewportChange = useCallback(() => {
    // Debounce viewport changes to avoid excessive recalculations
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewportHeight, 100);
    };
  }, [updateViewportHeight]);

  useEffect(() => {
    if (!isSafariMobile()) return;

    // Initial setup
    updateViewportHeight();

    const debouncedHandler = handleViewportChange();
    
    // Listen for viewport changes
    window.addEventListener('resize', debouncedHandler, { passive: true });
    window.addEventListener('orientationchange', debouncedHandler, { passive: true });
    
    // Safari-specific: listen for scroll to detect address bar changes
    let lastHeight = window.innerHeight;
    const handleScroll = () => {
      const currentHeight = window.innerHeight;
      if (Math.abs(currentHeight - lastHeight) > 10) {
        lastHeight = currentHeight;
        updateViewportHeight();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedHandler);
      window.removeEventListener('orientationchange', debouncedHandler);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateViewportHeight, handleViewportChange]);

  return { updateViewportHeight };
}