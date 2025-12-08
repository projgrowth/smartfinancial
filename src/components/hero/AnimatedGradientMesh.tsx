import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientMeshProps {
  className?: string;
}

/**
 * AnimatedGradientMesh - Unified hero background system
 * 
 * Uses design system tokens for colors with CSS-only animations.
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
        className="absolute top-[5%] right-[5%] w-[min(600px,80vw)] aspect-square rounded-full blur-[100px] opacity-20 animate-[float_45s_ease-in-out_infinite] bg-gradient-radial from-accent to-transparent"
      />
      
      {/* Gold blob - bottom left - subtle wash */}
      <div 
        className="absolute bottom-[10%] left-[5%] w-[min(500px,70vw)] aspect-square rounded-full blur-[100px] opacity-15 animate-[float_50s_ease-in-out_infinite_5s] bg-gradient-radial from-gold to-transparent"
      />
    </div>
  );
};

export default AnimatedGradientMesh;
