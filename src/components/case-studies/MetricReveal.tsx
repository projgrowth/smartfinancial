
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MetricRevealProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
  animationDelay?: number;
}

const MetricReveal: React.FC<MetricRevealProps> = ({ 
  value, 
  label, 
  prefix = '', 
  suffix = '', 
  color = 'blue',
  size = 'md',
  animationDelay = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setDisplayValue(Math.min(currentStep * stepValue, value));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setDisplayValue(value);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [value, animationDelay]);

  const colorClasses = {
    blue: 'text-primary',
    green: 'text-accent',
    orange: 'text-accent',
    red: 'text-destructive'
  };

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn(
      "text-center transition-all duration-150"
    )}>
      <div className={cn(
        "font-bold transition-all duration-300",
        colorClasses[color],
        sizeClasses[size]
      )}>
        {prefix}{Math.round(displayValue).toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
};

export default MetricReveal;
