import React from 'react';
import { cn } from '@/lib/utils';

interface ElevationBarsProps {
  className?: string;
}

const ElevationBars: React.FC<ElevationBarsProps> = ({ className }) => {
  const bars = [
    { width: 'w-32 md:w-48', opacity: 'opacity-[0.4]', delay: '0ms' },
    { width: 'w-40 md:w-56', opacity: 'opacity-[0.35]', delay: '50ms' },
    { width: 'w-48 md:w-64', opacity: 'opacity-[0.3]', delay: '100ms' },
    { width: 'w-56 md:w-72', opacity: 'opacity-[0.25]', delay: '150ms' },
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
            'h-2 rounded-full',
            'bg-gradient-to-r from-primary/50 via-accent/60 to-primary/50',
            'backdrop-blur-sm',
            'transition-all duration-700 ease-out',
            bar.width,
            bar.opacity,
            'animate-fade-in'
          )}
          style={{
            animationDelay: bar.delay,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
          }}
        />
      ))}
    </div>
  );
};

export default ElevationBars;
