
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoTipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  icon?: React.ReactNode;
  iconSize?: number;
}

const InfoTip: React.FC<InfoTipProps> = ({ 
  content, 
  children, 
  className = '',
  position = 'top',
  icon,
  iconSize = 16
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Determine positioning classes based on the position prop
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };
  
  // Determine arrow positioning classes
  const arrowClasses = {
    top: 'absolute w-3 h-3 bg-white transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r border-slate-100',
    bottom: 'absolute w-3 h-3 bg-white transform rotate-45 -top-1.5 left-1/2 -translate-x-1/2 border-t border-l border-slate-100',
    left: 'absolute w-3 h-3 bg-white transform rotate-45 -right-1.5 top-1/2 -translate-y-1/2 border-t border-r border-slate-100',
    right: 'absolute w-3 h-3 bg-white transform rotate-45 -left-1.5 top-1/2 -translate-y-1/2 border-b border-l border-slate-100'
  };
  
  // Determine content animation based on position
  const animationClasses = {
    top: isVisible ? 'opacity-100 visible -translate-y-0' : 'opacity-0 invisible -translate-y-2',
    bottom: isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2',
    left: isVisible ? 'opacity-100 visible -translate-x-0' : 'opacity-0 invisible -translate-x-2',
    right: isVisible ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-2'
  };
  
  return (
    <span 
      className={`inline-flex items-center relative info-reveal ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children || (
        <HelpCircle 
          size={iconSize} 
          className="text-gold hover:text-gold-dark cursor-help ml-1 transition-colors duration-300" 
        />
      )}
      
      <div 
        className={`info-content absolute z-50 ${positionClasses[position]} ${animationClasses[position]}`}
      >
        <div className="text-sm text-charcoal bg-white rounded-md shadow-lg border border-slate-100 p-3 max-w-xs">
          {content}
        </div>
        <div className={arrowClasses[position]}></div>
      </div>
    </span>
  );
};

export default InfoTip;
