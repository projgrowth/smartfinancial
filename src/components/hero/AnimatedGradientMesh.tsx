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
        'will-change-transform',
        className
      )}
      aria-hidden="true"
    >
      {/* Large blue blob - reduced blur, increased opacity */}
      <div 
        className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full blur-[70px] opacity-75 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.6) 50%, transparent 100%)',
          animationDuration: '20s',
          animationDelay: '0s',
        }}
      />
      
      {/* Large gold blob - reduced blur, increased opacity */}
      <div 
        className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[70px] opacity-80 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--gold) / 0.6) 50%, transparent 100%)',
          animationDuration: '25s',
          animationDelay: '5s',
        }}
      />
      
      {/* Medium accent blend blob - reduced blur, increased opacity */}
      <div 
        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[60px] opacity-65 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 50%, transparent 100%)',
          animationDuration: '30s',
          animationDelay: '10s',
        }}
      />
    </div>
  );
};

export default AnimatedGradientMesh;
