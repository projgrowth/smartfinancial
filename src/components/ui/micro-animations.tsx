
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

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
    blue: 'bg-blue-500',
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
    sm: 'hover:scale-[1.02]',
    md: 'hover:scale-[1.05]',
    lg: 'hover:scale-[1.08]'
  };
  
  return (
    <div 
      className={cn(
        "transition-transform duration-300 ease-out",
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
    subtle: 'animate-[float_15s_ease-in-out_infinite]',
    medium: 'animate-[float_10s_ease-in-out_infinite]',
    strong: 'animate-[float_6s_ease-in-out_infinite]'
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
}

export const ShimmerButton = ({
  children,
  onClick,
  className,
  disabled = false
}: ShimmerButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-4 py-2 rounded-md font-medium text-white overflow-hidden bg-blue-600 hover:bg-blue-700 transition-colors",
        "after:absolute after:inset-0 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:animate-shimmer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export const MicroAnimations = {
  PulseDot,
  ScaleOnHover,
  FadeInOnView,
  FloatingElement,
  ShimmerButton
};

export default MicroAnimations;
