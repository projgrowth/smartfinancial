import React from 'react';
import { cn } from '@/lib/utils';

interface ElevationBarsProps {
  className?: string;
}

const ElevationBars: React.FC<ElevationBarsProps> = ({ className }) => {
  const bars = [
    { width: 'w-32 md:w-48', opacity: 'opacity-90', delay: '0ms', rotate: 'rotate-[-1deg]' },
    { width: 'w-40 md:w-56', opacity: 'opacity-80', delay: '50ms', rotate: 'rotate-[0.5deg]' },
    { width: 'w-48 md:w-64', opacity: 'opacity-70', delay: '100ms', rotate: 'rotate-[-0.5deg]' },
    { width: 'w-56 md:w-72', opacity: 'opacity-60', delay: '150ms', rotate: 'rotate-[1deg]' },
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
            background: 'linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--gold)) 50%, hsl(var(--accent)) 100%)',
            boxShadow: '0 6px 30px hsl(var(--accent) / 0.5), 0 3px 15px hsl(var(--gold) / 0.4), inset 0 1px 3px hsl(0 0% 100% / 0.4)',
          }}
        />
      ))}
    </div>
  );
};

export default ElevationBars;
