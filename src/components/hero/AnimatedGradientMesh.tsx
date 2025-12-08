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
      {/* Primary accent blob - top right - subtle wash */}
      <div 
        className="absolute top-[5%] right-[5%] w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full blur-[100px] opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
          animationDuration: '45s',
        }}
      />
      
      {/* Gold blob - bottom left - subtle wash */}
      <div 
        className="absolute bottom-[10%] left-[5%] w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full blur-[100px] opacity-15 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)',
          animationDuration: '50s',
          animationDelay: '5s',
        }}
      />
    </div>
  );
};

export default AnimatedGradientMesh;
