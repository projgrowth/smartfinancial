
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoTipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const InfoTip: React.FC<InfoTipProps> = ({ content, children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <span 
      className={`inline-flex items-center relative info-reveal ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children || (
        <HelpCircle 
          size={16} 
          className="text-gold/80 hover:text-gold cursor-help ml-1 transition-colors duration-300" 
        />
      )}
      
      <div 
        className={`info-content ${isVisible ? 'opacity-100 visible -translate-y-2' : 'opacity-0 invisible -translate-y-4'}`}
      >
        <div className="text-sm text-charcoal">
          {content}
        </div>
        <div className="absolute w-3 h-3 bg-white transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2"></div>
      </div>
    </span>
  );
};

export default InfoTip;
