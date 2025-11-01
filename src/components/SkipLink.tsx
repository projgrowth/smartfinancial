import React from 'react';
import { cn } from '@/lib/utils';

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only",
        "fixed top-4 left-4 z-[100]",
        "bg-primary text-primary-foreground",
        "px-4 py-2 rounded-md",
        "font-medium text-sm",
        "focus:ring-2 focus:ring-accent/50 focus:ring-offset-2",
        "transition-all duration-200"
      )}
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
