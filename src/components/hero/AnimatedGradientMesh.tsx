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
      {/* Large blue blob - maximum visibility */}
      <div 
        className="absolute top-[5%] right-[10%] w-[550px] h-[550px] rounded-full blur-[50px] opacity-90 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.7) 50%, transparent 100%)',
          animationDuration: '20s',
          animationDelay: '0s',
        }}
      />
      
      {/* Large gold blob - maximum visibility */}
      <div 
        className="absolute bottom-[15%] left-[5%] w-[650px] h-[650px] rounded-full blur-[50px] opacity-85 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--gold) / 0.7) 50%, transparent 100%)',
          animationDuration: '25s',
          animationDelay: '5s',
        }}
      />
      
      {/* Medium accent blend blob - enhanced visibility */}
      <div 
        className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[450px] h-[450px] rounded-full blur-[45px] opacity-75 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.6) 50%, transparent 100%)',
          animationDuration: '30s',
          animationDelay: '10s',
        }}
      />
      
      {/* Additional purple accent blob for depth */}
      <div 
        className="absolute top-[60%] right-[25%] w-[350px] h-[350px] rounded-full blur-[40px] opacity-60 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(280 70% 60%) 0%, hsl(280 70% 60% / 0.5) 50%, transparent 100%)',
          animationDuration: '35s',
          animationDelay: '15s',
        }}
      />
    </div>
  );
};

export default AnimatedGradientMesh;
