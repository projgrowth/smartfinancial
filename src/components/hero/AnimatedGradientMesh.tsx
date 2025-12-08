import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientMeshProps {
  className?: string;
}

/**
 * AnimatedGradientMesh - Unified hero background system
 * 
 * Consolidates gradient blobs and radial vignette into single component.
 * Uses design system tokens for colors.
 */
const AnimatedGradientMesh: React.FC<AnimatedGradientMeshProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        'absolute inset-0 -z-10 overflow-hidden pointer-events-none',
        className
      )}
      aria-hidden="true"
    >
      {/* Primary accent blob - top right */}
      <div 
        className="absolute top-[5%] right-[5%] w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full blur-[60px] opacity-70 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.6) 50%, transparent 80%)',
          animationDuration: '20s',
        }}
      />
      
      {/* Gold blob - bottom left */}
      <div 
        className="absolute bottom-[10%] left-[5%] w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full blur-[50px] opacity-60 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--gold) / 0.5) 50%, transparent 80%)',
          animationDuration: '25s',
          animationDelay: '5s',
        }}
      />
      
      {/* Radial vignette overlay - subtle edge fade */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.3) 100%)',
        }}
      />
    </div>
  );
};

export default AnimatedGradientMesh;
