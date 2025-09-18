import { useEffect, useRef, useCallback } from 'react';

interface FocusManagementOptions {
  trapFocus?: boolean;
  restoreFocus?: boolean;
  focusOnMount?: boolean;
}

export function useFocusManagement({
  trapFocus = false,
  restoreFocus = true,
  focusOnMount = false
}: FocusManagementOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const setFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(containerRef.current.querySelectorAll(focusableSelector)) as HTMLElement[];
  }, []);

  const focusFirst = useCallback(() => {
    const focusableElements = setFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }, [setFocusableElements]);

  const focusLast = useCallback(() => {
    const focusableElements = setFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  }, [setFocusableElements]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!trapFocus || event.key !== 'Tab') return;

    const focusableElements = setFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, [trapFocus, setFocusableElements]);

  const setContainerRef = useCallback((element: HTMLElement | null) => {
    containerRef.current = element;
  }, []);

  useEffect(() => {
    if (focusOnMount && containerRef.current) {
      // Store current focus for restoration
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus first focusable element or container
      const focusableElements = setFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else if (containerRef.current.tabIndex >= 0) {
        containerRef.current.focus();
      }
    }

    return () => {
      // Restore focus when component unmounts
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [focusOnMount, restoreFocus, setFocusableElements]);

  useEffect(() => {
    if (trapFocus) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [trapFocus, handleKeyDown]);

  return {
    containerRef: setContainerRef,
    focusFirst,
    focusLast,
    setFocusableElements
  };
}

export function useKeyboardNavigation(onEscape?: () => void, onEnter?: () => void) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
      case 'Enter':
      case ' ':
        if (onEnter && event.target === event.currentTarget) {
          event.preventDefault();
          onEnter();
        }
        break;
    }
  }, [onEscape, onEnter]);

  return { handleKeyDown };
}

// Utility to announce changes to screen readers
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}