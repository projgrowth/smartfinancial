import React from 'react';
import { cn } from '@/lib/utils';

interface GradientAccentProps {
  variant?: 'blue' | 'subtle' | 'dark' | 'gold' | 'green' | 'purple';
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  intensity?: 'low' | 'medium' | 'high' | 'ultra-low';
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
    blue: 'bg-gradient-to-br from-accent/25 via-accent/15 to-accent/10',
    subtle: 'bg-gradient-to-br from-accent/15 via-muted/20 to-gold/10',
    dark: 'bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10',
    gold: 'bg-gradient-to-br from-gold/25 via-gold/15 to-gold/10',
    green: 'bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10',
    purple: 'bg-gradient-to-br from-accent/20 via-primary/15 to-accent/10',
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
    'ultra-low': 'opacity-15',
    low: 'opacity-25',
    medium: 'opacity-35',
    high: 'opacity-50',
  };
  
  return (
    <div
      className={cn(
        'absolute rounded-full blur-2xl -z-10 transition-transform duration-150',
        variantStyles[variant],
        sizeStyles[size],
        positionStyles[position],
        intensityStyles[intensity],
        animated && 'animate-[float_40s_ease-in-out_infinite]',
        className
      )}
      aria-hidden="true"
    />
  );
};

export default GradientAccent;
