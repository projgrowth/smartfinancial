
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    { children, className, variant = 'default', size = 'md', icon, iconPosition = 'right', ...props },
    ref
  ) => {
    const mappedVariant: React.ComponentProps<typeof Button>['variant'] =
      variant === 'outline' ? 'outline' : variant === 'subtle' ? 'ghost' : 'default';

    const mappedSize: React.ComponentProps<typeof Button>['size'] =
      size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';

    return (
      <Button ref={ref} variant={mappedVariant} size={mappedSize} className={cn('group', className)} {...props}>
        {icon && iconPosition === 'left' && (
          <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
        )}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
        )}
      </Button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
