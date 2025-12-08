import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PremiumBackground - Subtle ambient background with design token colors
 * Simplified to use CSS classes and design tokens only
 */
const PremiumBackground = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none"
      style={{ contain: 'layout style paint' }}
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-gold/5" />
      
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      
      {/* Ambient gradient shapes - using design tokens only */}
      <div 
        className={`absolute top-[5%] -left-[10%] w-1/2 h-[90%] bg-gradient-to-br from-accent/15 to-primary/10 blur-3xl rounded-full -rotate-12 ${reduceMotion ? '' : 'animate-[float_45s_ease-in-out_infinite]'}`}
      />
      
      <div 
        className={`absolute top-[15%] -right-[10%] w-1/2 h-[70%] bg-gradient-to-br from-gold/15 to-gold/10 blur-3xl rounded-full rotate-12 ${reduceMotion ? '' : 'animate-[float_40s_ease-in-out_infinite]'}`}
      />
      
      <div 
        className={`absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl rounded-full ${reduceMotion ? '' : 'animate-[float_35s_ease-in-out_infinite]'}`}
      />
      
      <div 
        className={`absolute top-[40%] right-[25%] w-1/4 h-1/4 bg-gradient-to-br from-gold/10 to-gold/5 blur-3xl rounded-full ${reduceMotion ? '' : 'animate-[float_30s_ease-in-out_infinite]'}`}
      />
      
      {/* Bull shape only on education page */}
      {isEducationPage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[80vw] h-[80vh] max-w-[600px] max-h-[600px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="bullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="45%" stopColor="hsl(var(--gold))" stopOpacity="0.25" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              </linearGradient>
              <filter id="bullBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
              </filter>
            </defs>
            <path
              d="M100,110 Q130,90 160,95 Q190,100 220,90 Q250,80 280,95 Q310,110 320,140 Q330,170 310,200 Q300,220 320,250 Q335,280 320,310 Q300,335 270,340 Q240,345 210,330 Q180,320 150,340 Q120,355 90,330 Q65,305 50,270 Q35,235 40,195 Q45,165 60,140 Q75,115 100,110 Z"
              fill="url(#bullGradient)"
              filter="url(#bullBlur)"
            />
          </svg>
        </div>
      )}
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
    </div>
  );
};

export default memo(PremiumBackground);
