import React from 'react';
import { cn } from '@/lib/utils';

interface NoiseOverlayProps {
  className?: string;
  opacity?: number;
}

const NoiseOverlay: React.FC<NoiseOverlayProps> = ({ 
  className,
  opacity = 0.06 
}) => {
  return (
    <div 
      className={cn(
        'absolute inset-0 -z-10 pointer-events-none',
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity,
        mixBlendMode: 'overlay',
      }}
      aria-hidden="true"
    />
  );
};

export default NoiseOverlay;
