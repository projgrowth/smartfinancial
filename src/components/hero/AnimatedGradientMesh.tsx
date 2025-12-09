/**
 * AnimatedGradientMesh - Subtle hero background
 * 
 * CLEANUP APPLIED:
 * - Simplified to two subtle gradient blobs
 * - Reduced opacity for premium, understated feel
 * - Uses design tokens for colors
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientMeshProps {
  className?: string;
}

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
        className="absolute -top-1/4 -right-1/4 w-1/2 aspect-square rounded-full blur-3xl opacity-10 bg-accent animate-float"
        style={{ animationDuration: '45s' }}
      />
      
      {/* Gold blob - bottom left */}
      <div 
        className="absolute -bottom-1/4 -left-1/4 w-1/2 aspect-square rounded-full blur-3xl opacity-10 bg-gold animate-float"
        style={{ animationDuration: '50s', animationDelay: '5s' }}
      />
    </div>
  );
};

export default AnimatedGradientMesh;
