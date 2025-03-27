
import React from 'react';
import { cn } from '@/lib/utils';

interface TabSelectorProps {
  tabs: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function TabSelector({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className,
}: TabSelectorProps) {
  const variantStyles = {
    default: 'bg-white border border-gray-200 rounded-lg shadow-sm p-1',
    pills: 'space-x-2',
    underline: 'border-b border-gray-200',
  };

  const tabStyles = {
    default: (isActive: boolean) => cn(
      'px-4 py-2 text-sm font-medium rounded-md transition-all',
      isActive 
        ? 'bg-blue-500 text-white shadow-sm'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    ),
    pills: (isActive: boolean) => cn(
      'px-4 py-2 text-sm font-medium rounded-full transition-all',
      isActive 
        ? 'bg-blue-500 text-white shadow-sm'
        : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
    ),
    underline: (isActive: boolean) => cn(
      'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-all',
      isActive 
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    ),
  };

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div 
      className={cn(
        'flex',
        fullWidth ? 'w-full' : 'inline-flex',
        variantStyles[variant],
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            tabStyles[variant](activeTab === tab.id),
            sizeStyles[size],
            fullWidth && 'flex-1 text-center justify-center',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center justify-center'
          )}
          onClick={() => onChange(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabSelector;
