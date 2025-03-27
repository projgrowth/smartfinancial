
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientAccentProps {
  variant?: 'blue' | 'subtle' | 'dark' | 'gold' | 'green' | 'purple';
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

const GradientAccent: React.FC<GradientAccentProps> = ({
  variant = 'blue',
  position = 'bottom-right',
  className = '',
  size = 'lg',
  intensity = 'medium',
  animated = false,
}) => {
  const variantStyles = {
    blue: 'bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/5',
    subtle: 'bg-gradient-to-br from-slate-200/40 via-slate-300/20 to-slate-400/10',
    dark: 'bg-gradient-to-br from-charcoal/20 via-charcoal/10 to-charcoal/5',
    gold: 'bg-gradient-to-br from-amber-200/30 via-amber-300/15 to-amber-400/5',
    green: 'bg-gradient-to-br from-emerald-300/20 via-emerald-400/10 to-teal-500/5',
    purple: 'bg-gradient-to-br from-violet-300/20 via-purple-400/10 to-fuchsia-500/5',
  };
  
  const sizeStyles = {
    sm: 'w-32 h-32 md:w-48 md:h-48',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-64 h-64 md:w-96 md:h-96',
    xl: 'w-96 h-96 md:w-[32rem] md:h-[32rem]',
    '2xl': 'w-[32rem] h-[32rem] md:w-[40rem] md:h-[40rem]',
  };
  
  const positionStyles = {
    'top-right': '-top-16 -right-16 md:-top-24 md:-right-24',
    'bottom-left': '-bottom-16 -left-16 md:-bottom-24 md:-left-24',
    'top-left': '-top-16 -left-16 md:-top-24 md:-left-24',
    'bottom-right': '-bottom-16 -right-16 md:-bottom-24 md:-right-24',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };
  
  const intensityStyles = {
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-70',
  };
  
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
