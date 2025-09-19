
/**
 * Utility functions to improve accessibility throughout the application
 */

// Helper for conditionally joining classNames
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Function to generate a unique ID for accessibility attributes
export const generateId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

// Function to handle keyboard navigation for interactive elements
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  callback: () => void,
  keys: string[] = ['Enter', ' ']
) => {
  if (keys.includes(event.key)) {
    event.preventDefault();
    callback();
  }
};

// Creates an object with proper ARIA attributes for a modal dialog
export const getDialogProps = (id: string, title: string) => {
  return {
    id,
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': `${id}-title`,
    'aria-describedby': `${id}-description`,
  };
};

// Creates an object with proper ARIA attributes for a tab panel
export const getTabPanelProps = (id: string, selected: boolean) => {
  return {
    id: `panel-${id}`,
    role: 'tabpanel',
    'aria-labelledby': `tab-${id}`,
    hidden: !selected,
  };
};

// Helper to preload images for better user experience
export const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Detects if the user has a preference for reduced motion
export const prefersReducedMotion = () => {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Helper for screen reader only text
export const srOnly = 'sr-only';
export const notSrOnly = 'not-sr-only';
