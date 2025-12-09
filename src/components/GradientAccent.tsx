import React from 'react';
import { cn } from '@/lib/utils';

interface GradientAccentProps {
  variant?: 'blue' | 'subtle' | 'gold';
  position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'low' | 'medium';
}

const GradientAccent: React.FC<GradientAccentProps> = ({
  variant = 'blue',
  position = 'bottom-right',
  className = '',
  size = 'lg',
  intensity = 'low',
}) => {
  const variantStyles = {
    blue: 'bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5',
    subtle: 'bg-gradient-to-br from-accent/15 via-muted/15 to-gold/10',
    gold: 'bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5',
  };
  
  const sizeStyles = {
    sm: 'w-32 h-32 md:w-48 md:h-48',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-64 h-64 md:w-96 md:h-96',
  };
  
  const positionStyles = {
    'top-right': '-top-16 -right-16 md:-top-24 md:-right-24',
    'bottom-left': '-bottom-16 -left-16 md:-bottom-24 md:-left-24',
    'top-left': '-top-16 -left-16 md:-top-24 md:-left-24',
    'bottom-right': '-bottom-16 -right-16 md:-bottom-24 md:-right-24',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  };
  
  const intensityStyles = {
    low: 'opacity-20',
    medium: 'opacity-30',
  };
  
  return (
    <div
      className={cn(
        'absolute rounded-full blur-2xl -z-10 pointer-events-none',
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