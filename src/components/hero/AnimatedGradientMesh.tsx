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
      {/* Large blue blob */}
      <div 
        className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(210 100% 60%) 0%, hsl(210 100% 50% / 0.3) 50%, transparent 100%)',
          animationDuration: '20s',
          animationDelay: '0s',
        }}
      />
      
      {/* Large gold blob */}
      <div 
        className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(45 90% 57%) 0%, hsl(45 90% 50% / 0.3) 50%, transparent 100%)',
          animationDuration: '25s',
          animationDelay: '5s',
        }}
      />
      
      {/* Medium purple blob */}
      <div 
        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(260 60% 65%) 0%, hsl(260 60% 60% / 0.2) 50%, transparent 100%)',
          animationDuration: '30s',
          animationDelay: '10s',
        }}
      />
    </div>
  );
};

export default AnimatedGradientMesh;
