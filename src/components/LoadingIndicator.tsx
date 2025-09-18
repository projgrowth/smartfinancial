
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingIndicatorProps {
  variant?: 'default' | 'minimal';
}

const LoadingIndicator = ({ variant = 'default' }: LoadingIndicatorProps) => {
  if (variant === 'minimal') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-t-2 border-accent animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-r-2 border-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background section-md">
      <div className="container-site mx-auto">
        <Skeleton className="h-12 w-3/4 max-w-lg mx-auto content-group" />
        <Skeleton className="h-6 w-2/3 max-w-md mx-auto content-block" />
        <Skeleton className="h-10 w-48 mx-auto content-section" />
        <div className="grid-three-col card-gap-lg">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
