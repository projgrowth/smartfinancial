
import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'default', 
    size = 'md', 
    icon, 
    iconPosition = 'right',
    ...props 
  }, ref) => {
    
    const variantStyles = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
      subtle: 'bg-transparent text-foreground hover:bg-accent'
    };
    
    const sizeStyles = {
      sm: 'text-sm px-4 py-2 rounded-md',
      md: 'px-6 py-3 rounded-md',
      lg: 'text-lg px-8 py-4 rounded-md'
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          'relative font-medium inline-flex items-center justify-center',
          'transition-all duration-300 ease-out active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-2 transition-transform duration-300 group-hover:translate-x-[-2px]">{icon}</span>
        )}
        
        <span className="relative z-10">{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-[2px]">{icon}</span>
        )}
        
        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 to-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
