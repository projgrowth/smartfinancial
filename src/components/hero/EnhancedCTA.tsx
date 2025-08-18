import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { MicroAnimations } from '../ui/micro-animations';

interface EnhancedCTAProps {
  onClick: () => void;
  className?: string;
}

export const EnhancedCTA: React.FC<EnhancedCTAProps> = ({ onClick, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  return (
    <div className="enhanced-cta-container">
      <MicroAnimations.ScaleOnHover scale="sm">
        <button
          ref={buttonRef}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          aria-label="Schedule your private strategy call"
          className={`
            enhanced-cta-button group relative overflow-hidden
            bg-primary hover:bg-primary/90 text-primary-foreground
            px-6 sm:px-8 py-3 sm:py-4 rounded-lg
            transition-all duration-300 ease-out
            shadow-lg hover:shadow-xl
            border border-primary/20
            focus-enhanced
            ${className}
          `}
        >
          {/* Magnetic effect background */}
          <div 
            className="enhanced-cta-magnetic"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`
            }}
          />
          
          {/* Shimmer effect */}
          <div className="enhanced-cta-shimmer" />
          
          {/* Ripple effect */}
          <div className="enhanced-cta-ripple" />
          
          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="enhanced-cta-text">
              <span className="xs:hidden">Schedule</span>
              <span className="hidden xs:inline sm:hidden">Schedule Call</span>
              <span className="hidden sm:inline">Schedule Your Private Strategy Call</span>
            </span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </button>
      </MicroAnimations.ScaleOnHover>
      
      {/* Floating particles effect */}
      <div className="enhanced-cta-particles">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="enhanced-cta-particle"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
};