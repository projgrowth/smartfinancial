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
      {/* Premium Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-charcoal-dark to-navy-dark/95" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Bull Silhouette */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: reduceMotion ? 'none' : `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`
        }}
      >
        <img
          src={bullImage}
          alt=""
          className="w-full h-full object-cover opacity-[0.08] mix-blend-screen scale-110"
          style={{
            filter: 'brightness(1.2) contrast(1.1) sepia(0.3) hue-rotate(15deg)'
          }}
        />
      </div>
      
      {/* Warm Gold Accents */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-gold/10 via-gold/5 to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-gradient-radial from-amber/8 via-amber/4 to-transparent rounded-full blur-2xl opacity-40" />
      
      {/* Noise Texture for Premium Feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-navy-dark/80" />
    </div>
  );
};

export default PremiumHeroBackground;