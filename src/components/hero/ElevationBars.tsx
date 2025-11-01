import React from 'react';
import { cn } from '@/lib/utils';

interface ElevationBarsProps {
  className?: string;
}

const ElevationBars: React.FC<ElevationBarsProps> = ({ className }) => {
  const bars = [
    { width: 'w-32 md:w-48', opacity: 'opacity-80', delay: '0ms', rotate: 'rotate-[-1deg]' },
    { width: 'w-40 md:w-56', opacity: 'opacity-70', delay: '50ms', rotate: 'rotate-[0.5deg]' },
    { width: 'w-48 md:w-64', opacity: 'opacity-60', delay: '100ms', rotate: 'rotate-[-0.5deg]' },
    { width: 'w-56 md:w-72', opacity: 'opacity-50', delay: '150ms', rotate: 'rotate-[1deg]' },
  ];

  return (
    <div 
      className={cn(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10',
        'opacity-0 md:opacity-100 flex flex-col gap-3 lg:gap-4 items-center pointer-events-none',
        className
      )}
      aria-hidden="true"
      style={{
        transform: 'perspective(800px) rotateX(8deg) translateX(-50%) translateY(-50%)',
        transformOrigin: 'center center',
      }}
    >
      {bars.map((bar, index) => (
        <div
          key={index}
          className={cn(
            'h-2.5 md:h-3 rounded-full relative',
            'transition-all duration-700 ease-out',
            bar.width,
            bar.opacity,
            bar.rotate,
            'animate-fade-in'
          )}
          style={{
            animationDelay: bar.delay,
            background: 'linear-gradient(90deg, hsl(210 100% 60%) 0%, hsl(45 90% 57%) 50%, hsl(210 100% 60%) 100%)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4), 0 2px 10px rgba(251, 191, 36, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
    </div>
  );
};

export default ElevationBars;
