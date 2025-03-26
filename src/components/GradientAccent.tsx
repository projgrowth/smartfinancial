
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientAccentProps {
  variant?: 'blue' | 'subtle' | 'dark';
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'low' | 'medium' | 'high';
}

const GradientAccent: React.FC<GradientAccentProps> = ({
  variant = 'blue',
  position = 'bottom-right',
  className = '',
  size = 'lg',
  intensity = 'medium',
}) => {
  const variantStyles = {
    blue: 'bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/5',
    subtle: 'bg-gradient-to-br from-slate-200/40 via-slate-300/20 to-slate-400/10',
    dark: 'bg-gradient-to-br from-charcoal/20 via-charcoal/10 to-charcoal/5',
  };
  
  const sizeStyles = {
    sm: 'w-32 h-32 md:w-48 md:h-48',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-64 h-64 md:w-96 md:h-96',
    xl: 'w-96 h-96 md:w-[32rem] md:h-[32rem]',
  };
  
  const positionStyles = {
    'top-right': '-top-16 -right-16 md:-top-24 md:-right-24',
    'bottom-left': '-bottom-16 -left-16 md:-bottom-24 md:-left-24',
    'top-left': '-top-16 -left-16 md:-top-24 md:-left-24',
    'bottom-right': '-bottom-16 -right-16 md:-bottom-24 md:-right-24',
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
        className
      )}
      aria-hidden="true"
    />
  );
};

export default GradientAccent;
