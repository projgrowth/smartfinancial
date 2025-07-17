import React from 'react';
import { cn } from '@/lib/utils';

interface BullIntegrationProps {
  variant?: 'hero' | 'section' | 'watermark' | 'loading';
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const BullIntegration: React.FC<BullIntegrationProps> = ({
  variant = 'hero',
  className = '',
  animated = true,
  size = 'lg'
}) => {
  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32', 
    lg: 'w-64 h-64',
    xl: 'w-96 h-96'
  };

  const variantStyles = {
    hero: 'absolute inset-0 opacity-5 mix-blend-overlay',
    section: 'absolute top-0 right-0 opacity-20 -z-10',
    watermark: 'absolute bottom-4 right-4 opacity-30',
    loading: 'mx-auto opacity-30'
  };

  return (
    <div
      className={cn(
        sizeStyles[size],
        variantStyles[variant],
        animated && 'animate-[float_15s_ease-in-out_infinite]',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="bullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Bull silhouette - stylized and professional */}
        <path
          d="M200,100 Q220,80 250,90 Q280,100 300,120 Q320,140 310,170 Q300,200 320,230 Q340,260 320,290 Q300,320 270,310 Q240,300 200,320 Q160,300 130,310 Q100,320 80,290 Q60,260 80,230 Q100,200 90,170 Q80,140 100,120 Q120,100 150,90 Q180,80 200,100 Z"
          fill="url(#bullGradient)"
          filter="url(#shadow)"
        />
        
        {/* Subtle horns for bull characteristic */}
        <path
          d="M170,110 Q165,100 160,95 Q155,90 165,95 Q175,100 170,110"
          fill="url(#bullGradient)"
        />
        <path
          d="M230,110 Q235,100 240,95 Q245,90 235,95 Q225,100 230,110"
          fill="url(#bullGradient)"
        />
      </svg>
    </div>
  );
};

export default BullIntegration;