import React from 'react';
import { cn } from '@/lib/utils';

interface RadialGradientOverlayProps {
  className?: string;
}

const RadialGradientOverlay: React.FC<RadialGradientOverlayProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        'absolute inset-0 -z-10 pointer-events-none',
        className
      )}
      style={{
        background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)',
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
};

export default RadialGradientOverlay;
