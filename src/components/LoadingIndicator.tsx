import React from 'react';

interface LoadingIndicatorProps {
  variant?: 'default' | 'minimal';
}

/**
 * Simple loading indicator that matches the page background
 * to prevent jarring skeleton-to-content transitions
 */
const LoadingIndicator = ({ variant = 'default' }: LoadingIndicatorProps) => {
  if (variant === 'minimal') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-t-2 border-accent animate-spin" />
        </div>
      </div>
    );
  }

  // Default: simple background that matches the page to prevent flash
  return (
    <div className="min-h-screen w-full bg-background" />
  );
};

export default LoadingIndicator;
