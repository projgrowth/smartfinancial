import React, { useEffect, useState } from 'react';
import heroBull1 from '../assets/hero-bull-1.png';
import heroBull2 from '../assets/hero-bull-2.png';

interface PremiumHeroBackgroundProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

const PremiumHeroBackground: React.FC<PremiumHeroBackgroundProps> = ({ 
  variant = 'primary', 
  className = '' 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReduce = () => setReduceMotion(mqReduce.matches);
    handleReduce();
    mqReduce.addEventListener?.('change', handleReduce);
    return () => mqReduce.removeEventListener?.('change', handleReduce);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduceMotion]);

  const bullImage = variant === 'primary' ? heroBull1 : heroBull2;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Deep Sophisticated Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950" />
      
      {/* Subtle Bull Silhouette - More Refined */}
      <div 
        className="absolute inset-0 flex items-center justify-end pr-[10%]"
        style={{
          transform: reduceMotion ? 'none' : `translate(${mousePosition.x * 8}px, ${mousePosition.y * 4}px)`
        }}
      >
        <img
          src={bullImage}
          alt=""
          className="w-3/4 h-3/4 object-contain opacity-[0.04] mix-blend-screen scale-125"
          style={{
            filter: 'brightness(1.5) contrast(0.8) grayscale(0.2)'
          }}
        />
      </div>
      
      {/* Minimal Gold Accent */}
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-radial from-gold/6 via-gold/2 to-transparent rounded-full blur-3xl opacity-40" />
      
      {/* Subtle Geometric Frame */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Premium Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.008] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Deep Vignette for Focus */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/60" />
    </div>
  );
};

export default PremiumHeroBackground;