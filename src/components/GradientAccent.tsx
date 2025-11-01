
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientAccentProps {
  variant?: 'blue' | 'subtle' | 'dark' | 'gold' | 'green' | 'purple' | 'bull';
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  intensity?: 'low' | 'medium' | 'high' | 'ultra-low';
  animated?: boolean;
  shape?: 'circle' | 'blob' | 'bull';
}

const GradientAccent: React.FC<GradientAccentProps> = ({
  variant = 'blue',
  position = 'bottom-right',
  className = '',
  size = 'lg',
  intensity = 'medium',
  animated = false,
  shape = 'circle',
}) => {
  const variantStyles = {
    blue: 'bg-gradient-to-br from-blue-400/50 via-blue-500/35 to-blue-600/20',
    subtle: 'bg-gradient-to-br from-slate-200/60 via-slate-300/40 to-slate-400/20',
    dark: 'bg-gradient-to-br from-charcoal/40 via-charcoal/30 to-charcoal/15',
    gold: 'bg-gradient-to-br from-amber-200/60 via-amber-300/40 to-amber-400/20',
    green: 'bg-gradient-to-br from-emerald-300/45 via-emerald-400/30 to-teal-500/15',
    purple: 'bg-gradient-to-br from-violet-300/45 via-purple-400/30 to-fuchsia-500/15',
    bull: 'bg-gradient-to-br from-blue-400/35 via-amber-200/25 to-blue-500/18',
  };
  
  const sizeStyles = {
    sm: 'w-24 h-24 md:w-40 md:h-40',
    md: 'w-40 h-40 md:w-56 md:h-56',
    lg: 'w-56 h-56 md:w-80 md:h-80',
    xl: 'w-80 h-80 md:w-[28rem] md:h-[28rem]',
    '2xl': 'w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem]',
  };
  
  const positionStyles = {
    'top-right': '-top-12 -right-12 md:-top-20 md:-right-20',
    'bottom-left': '-bottom-12 -left-12 md:-bottom-20 md:-left-20',
    'top-left': '-top-12 -left-12 md:-top-20 md:-left-20',
    'bottom-right': '-bottom-12 -right-12 md:-bottom-20 md:-right-20',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };
  
  const intensityStyles = {
    'ultra-low': 'opacity-15',
    low: 'opacity-55',
    medium: 'opacity-75',
    high: 'opacity-95',
  };

  // Custom shape for bull
  if (shape === 'bull') {
    return (
      <div
        className={cn(
          'absolute -z-10',
          variantStyles[variant],
          sizeStyles[size],
          positionStyles[position],
          intensityStyles[intensity],
          animated && 'animate-[float_25s_ease-in-out_infinite]',
          className
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-50 mix-blend-screen"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
            <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
          </defs>
          {/* Abstract bull silhouette as a fluid shape */}
          <path
            d="M45,65 Q60,40 80,50 Q95,58 110,50 Q130,40 150,55 Q165,65 155,85 Q145,105 160,120 Q170,135 160,155 Q150,170 130,165 Q110,160 90,170 Q70,175 55,160 Q40,145 30,125 Q20,105 30,85 Q35,75 45,65 Z"
            fill="url(#bullGradient)"
            filter="url(#blurFilter)"
          />
        </svg>
      </div>
    );
  }
  
  // Regular circular or blob gradients
  return (
    <div
      className={cn(
        'absolute rounded-full blur-3xl -z-10',
        variantStyles[variant],
        sizeStyles[size],
        positionStyles[position],
        intensityStyles[intensity],
        animated && 'animate-[float_20s_ease-in-out_infinite]',
        className
      )}
      aria-hidden="true"
    />
  );
};

export default GradientAccent;
