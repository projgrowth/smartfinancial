
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PulseDotProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  className?: string;
}

export const PulseDot = ({ 
  size = 'md', 
  color = 'blue',
  className 
}: PulseDotProps) => {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3'
  };
  
  const colorClasses = {
    blue: 'bg-accent',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };
  
  return (
    <span className="relative flex">
      <span 
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          colorClasses[color]
        )}
      />
      <span 
        className={cn(
          "relative inline-flex rounded-full",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      />
    </span>
  );
};

interface ScaleOnHoverProps {
  children: React.ReactNode;
  scale?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ScaleOnHover = ({
  children,
  scale = 'md',
  className
}: ScaleOnHoverProps) => {
  const scaleClasses = {
    sm: 'hover:scale-[1.01]',
    md: 'hover:scale-[1.02]',
    lg: 'hover:scale-[1.03]'
  };
  
  return (
    <div 
      className={cn(
        "transition-transform duration-150 ease-out",
        scaleClasses[scale],
        className
      )}
    >
      {children}
    </div>
  );
};

interface FadeInOnViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInOnView = ({
  children,
  delay = 0,
  className
}: FadeInOnViewProps) => {
  return (
    <div 
      className={cn(
        "opacity-0 animate-fadeIn",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export const FloatingElement = ({
  children,
  intensity = 'medium',
  className
}: FloatingElementProps) => {
  const intensityClasses = {
    subtle: 'animate-[float_40s_ease-in-out_infinite]',
    medium: 'animate-[float_30s_ease-in-out_infinite]',
    strong: 'animate-[float_20s_ease-in-out_infinite]'
  };
  
  return (
    <div 
      className={cn(
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  );
};

interface ShimmerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const ShimmerButton = ({
  children,
  onClick,
  className,
  disabled = false,
  type = 'button'
}: ShimmerButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      asChild={false}
      variant="hero"
      type={type}
      className={cn(
        "relative whitespace-nowrap leading-none gap-2 min-h-[44px] px-4 py-2 overflow-hidden",
        "after:absolute after:inset-0 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:animate-shimmer",
        className
      )}
    >
      {children}
    </Button>
  );
};

// DEPRECATED: ShimmerButton has been moved to Button component with variant="shimmer"
// This is kept for backward compatibility but will be removed in future versions

export const MicroAnimations = {
  PulseDot,
  ScaleOnHover,
  FadeInOnView,
  FloatingElement
};

export default MicroAnimations;
