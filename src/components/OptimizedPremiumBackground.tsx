import React, { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { performanceManager, queueMicroInteraction } from '../utils/performanceOptimization';

interface BackgroundProps {
  className?: string;
  reduceComplexity?: boolean;
}

const OptimizedPremiumBackground = ({ className, reduceComplexity = false }: BackgroundProps) => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  // Use performance manager to check capabilities
  const shouldShowAnimations = !performanceManager.prefersReducedMotion();
  const optimizedDuration = performanceManager.getOptimalDuration(300);
  
  // Simplified background for better performance
  const backgroundElements = useCallback(() => {
    if (reduceComplexity) {
      return (
        <div className={`fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none ${className || ''}`}>
          {/* Simplified gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/30 via-white/95 to-amber-50/30"></div>
          
          {/* Single subtle shape */}
          <div className="absolute top-[10%] -right-[10%] w-[40%] h-[60%] bg-gradient-to-br from-gold-light/15 to-gold/10 blur-3xl rounded-full"></div>
        </div>
      );
    }

    return (
      <div className={`fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none ${className || ''}`}>
        {/* Enhanced gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/40 via-white/90 to-amber-50/40"></div>
        
        {/* Geometric patterns - reduced opacity for performance */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        
        {/* Education page bull shape - further optimized */}
        {isEducationPage && shouldShowAnimations && (
          <div className="absolute top-[40%] left-[50%] w-[60vw] h-[60vh] transform -translate-x-1/2 -translate-y-1/2 opacity-[0.015] mix-blend-screen">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="bullGradientOptimized" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <path
                d="M100,120 Q160,90 220,100 Q280,110 320,150 Q340,190 310,230 Q280,270 220,280 Q160,290 100,250 Q60,210 70,170 Q80,130 100,120 Z"
                fill="url(#bullGradientOptimized)"
              />
            </svg>
          </div>
        )}
        
        {/* Optimized gradient shapes */}
        <div className={`absolute top-[5%] -left-[10%] w-[45%] h-[80%] bg-gradient-to-br from-sky-200/15 to-blue-300/10 blur-3xl rounded-full transform -rotate-12 ${shouldShowAnimations ? 'animate-float duration-25000' : ''}`}></div>
        <div className={`absolute top-[15%] -right-[10%] w-[45%] h-[65%] bg-gradient-to-br from-gold-light/15 to-gold/10 blur-3xl rounded-full transform rotate-12 ${shouldShowAnimations ? 'animate-float duration-20000' : ''}`}></div>
        
        {/* Reduced dot pattern for performance */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3Ccircle cx='25' cy='25' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      </div>
    );
  }, [isEducationPage, shouldShowAnimations, className, reduceComplexity]);

  // Use performance manager to queue rendering
  return (
    <div ref={(el) => {
      if (el) {
        queueMicroInteraction(() => {
          el.style.willChange = 'transform';
          setTimeout(() => {
            el.style.willChange = 'auto';
          }, optimizedDuration);
        });
      }
    }}>
      {backgroundElements()}
    </div>
  );
};

export default memo(OptimizedPremiumBackground);