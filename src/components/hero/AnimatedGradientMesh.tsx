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
      {/* Large blue blob - crisp and visible */}
      <div 
        className="absolute top-[5%] right-[10%] w-[600px] h-[600px] rounded-full blur-[35px] opacity-95 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.8) 40%, transparent 90%)',
          animationDuration: '20s',
          animationDelay: '0s',
        }}
      />
      
      {/* Large gold blob - prominent and warm */}
      <div 
        className="absolute bottom-[15%] left-[5%] w-[700px] h-[700px] rounded-full blur-[35px] opacity-90 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--gold) / 0.8) 40%, transparent 90%)',
          animationDuration: '25s',
          animationDelay: '5s',
        }}
      />
      
      {/* Center accent blend blob - visible */}
      <div 
        className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[30px] opacity-85 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.7) 40%, transparent 90%)',
          animationDuration: '30s',
          animationDelay: '10s',
        }}
      />
      
      {/* Purple accent blob for depth - enhanced */}
      <div 
        className="absolute top-[60%] right-[25%] w-[400px] h-[400px] rounded-full blur-[30px] opacity-70 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(280 70% 65%) 0%, hsl(280 70% 60% / 0.6) 40%, transparent 90%)',
          animationDuration: '35s',
          animationDelay: '15s',
        }}
      />
    </div>
  );
};

export default AnimatedGradientMesh;
