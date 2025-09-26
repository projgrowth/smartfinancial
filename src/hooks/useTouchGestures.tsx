import React, { useRef, useCallback, TouchEvent } from 'react';

interface TouchGestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onTap?: () => void;
  onLongPress?: () => void;
}

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
  isPressed: boolean;
}

export function useTouchGestures(handlers: TouchGestureHandlers) {
  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    startTime: 0,
    isPressed: false
  });

  const longPressTimer = useRef<NodeJS.Timeout>();
  const SWIPE_THRESHOLD = 50;
  const SWIPE_VELOCITY = 0.3;
  const LONG_PRESS_DURATION = 500;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isPressed: true
    };

    // Start long press timer
    if (handlers.onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (touchState.current.isPressed) {
          handlers.onLongPress?.();
          // Haptic feedback simulation
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
        }
      }, LONG_PRESS_DURATION);
    }
  }, [handlers]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Cancel long press on movement
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchState.current.isPressed) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;
    const deltaTime = Date.now() - touchState.current.startTime;
    const velocity = Math.abs(deltaX) / deltaTime;

    touchState.current.isPressed = false;
    
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    // Determine gesture type
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && velocity > SWIPE_VELOCITY) {
      // Swipe gesture
      if (deltaX > 0) {
        handlers.onSwipeRight?.();
      } else {
        handlers.onSwipeLeft?.();
      }
      // Light haptic feedback for swipe
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
      // Tap gesture
      handlers.onTap?.();
    }
  }, [handlers]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
}