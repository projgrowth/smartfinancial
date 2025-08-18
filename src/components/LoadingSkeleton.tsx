import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text', 
  width, 
  height, 
  lines = 1 
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-shimmer';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    card: 'rounded-lg'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]} ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// Specific skeleton components for common use cases
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 bg-white rounded-lg border border-gray-200 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="text" lines={3} />
    <div className="mt-4">
      <Skeleton variant="rectangular" height={32} width={100} />
    </div>
  </div>
);

export const HeroSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`py-20 ${className}`}>
    <div className="text-center space-y-6">
      <Skeleton variant="text" height={60} width="80%" className="mx-auto" />
      <Skeleton variant="text" height={60} width="60%" className="mx-auto" />
      <Skeleton variant="text" lines={2} width="70%" className="mx-auto" />
      <div className="flex justify-center space-x-4 mt-8">
        <Skeleton variant="rectangular" height={44} width={120} />
        <Skeleton variant="rectangular" height={44} width={120} />
      </div>
    </div>
  </div>
);

export const NavigationSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-between p-4 ${className}`}>
    <Skeleton variant="rectangular" height={32} width={120} />
    <div className="flex space-x-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="text" width={80} />
      ))}
    </div>
    <Skeleton variant="rectangular" height={36} width={100} />
  </div>
);