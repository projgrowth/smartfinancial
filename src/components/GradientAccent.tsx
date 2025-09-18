
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
    blue: 'bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/5',
    subtle: 'bg-gradient-to-br from-slate-200/40 via-slate-300/20 to-slate-400/10',
    dark: 'bg-gradient-to-br from-charcoal/20 via-charcoal/10 to-charcoal/5',
    gold: 'bg-gradient-to-br from-amber-200/30 via-amber-300/15 to-amber-400/5',
    green: 'bg-gradient-to-br from-emerald-300/20 via-emerald-400/10 to-teal-500/5',
    purple: 'bg-gradient-to-br from-violet-300/20 via-purple-400/10 to-fuchsia-500/5',
    bull: 'bg-gradient-to-br from-blue-400/15 via-amber-200/10 to-blue-500/5',
  };
  
  const sizeStyles = {
    sm: 'w-24 h-24 md:w-40 md:h-40',
    md: 'w-40 h-40 md:w-56 md:h-56',
    lg: 'w-56 h-56 md:w-80 md:h-80',
    xl: 'w-80 h-80 md:w-[28rem] md:h-[28rem]',
    '2xl': 'w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem]',
  };
  
  const positionStyles = {
    'top-right': '-top-8 -right-8 md:-top-12 md:-right-12 lg:-top-16 lg:-right-16',
    'bottom-left': '-bottom-8 -left-8 md:-bottom-12 md:-left-12 lg:-bottom-16 lg:-left-16',
    'top-left': '-top-8 -left-8 md:-top-12 md:-left-12 lg:-top-16 lg:-left-16',
    'bottom-right': '-bottom-8 -right-8 md:-bottom-12 md:-right-12 lg:-bottom-16 lg:-right-16',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };
  
  const intensityStyles = {
    'ultra-low': 'opacity-10',
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-70',
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
