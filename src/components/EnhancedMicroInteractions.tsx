import React, { useState, useCallback } from 'react';
import { queueMicroInteraction, performanceManager } from '../utils/performanceOptimization';

interface MicroInteractionProps {
  children: React.ReactNode;
  type?: 'button' | 'card' | 'link' | 'input';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const EnhancedMicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type = 'button',
  disabled = false,
  className = '',
  onClick
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [rippleOrigin, setRippleOrigin] = useState<{ x: number; y: number } | null>(null);

  const shouldAnimate = !performanceManager.prefersReducedMotion();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled || !shouldAnimate) return;
    
    setIsPressed(true);
    
    // Calculate ripple origin for material design effect
    const rect = e.currentTarget.getBoundingClientRect();
    setRippleOrigin({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    queueMicroInteraction(() => {
      setTimeout(() => setIsPressed(false), 150);
    });
  }, [disabled, shouldAnimate]);

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      queueMicroInteraction(onClick);
    }
  }, [disabled, onClick]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const getInteractionClasses = () => {
    const base = 'relative overflow-hidden transition-all duration-200 ease-out';
    const focus = isFocused ? 'ring-2 ring-blue-500 ring-opacity-50 ring-offset-2' : '';
    const pressed = isPressed && shouldAnimate ? 'scale-[0.98]' : '';
    
    const typeClasses = {
      button: 'hover:shadow-md active:shadow-sm hover:-translate-y-0.5',
      card: 'hover:shadow-lg hover:-translate-y-1 hover:border-blue-200',
      link: 'hover:text-blue-600 hover:underline underline-offset-2',
      input: 'focus:border-blue-500 focus:shadow-sm'
    };

    return `${base} ${typeClasses[type]} ${focus} ${pressed} ${className}`;
  };

  return (
    <div
      className={getInteractionClasses()}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={type === 'button' ? 0 : undefined}
      role={type === 'button' ? 'button' : undefined}
      style={{
        transform: isPressed && shouldAnimate ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
      
      {/* Ripple effect */}
      {rippleOrigin && shouldAnimate && (
        <div
          className="absolute pointer-events-none rounded-full bg-white/30 animate-ping"
          style={{
            left: rippleOrigin.x - 20,
            top: rippleOrigin.y - 20,
            width: 40,
            height: 40,
            animationDuration: '600ms',
            animationIterationCount: 1
          }}
          onAnimationEnd={() => setRippleOrigin(null)}
        />
      )}
    </div>
  );
};

// Specialized micro-interaction components
export const InteractiveButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 active:bg-gray-100'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer hover:shadow-md active:scale-[0.98]';

  return (
    <EnhancedMicroInteraction
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </EnhancedMicroInteraction>
  );
};

export const InteractiveCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}> = ({ children, onClick, className = '', hoverable = true }) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 shadow-sm';
  const hoverClasses = hoverable 
    ? 'hover:shadow-lg hover:border-blue-200 cursor-pointer' 
    : '';

  return (
    <EnhancedMicroInteraction
      type="card"
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </EnhancedMicroInteraction>
  );
};

export const InteractiveLink: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}> = ({ children, href, onClick, className = '', external = false }) => {
  const baseClasses = 'text-blue-600 transition-colors duration-200';
  
  const handleClick = () => {
    if (href && external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <EnhancedMicroInteraction
      type="link"
      onClick={handleClick}
      className={`${baseClasses} ${className}`}
    >
      <a href={href} className="no-underline">
        {children}
      </a>
    </EnhancedMicroInteraction>
  );
};