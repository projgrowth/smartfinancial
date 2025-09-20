import React from 'react';

interface PremiumHeroGradientProps {
  className?: string;
}

const PremiumHeroGradient: React.FC<PremiumHeroGradientProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Base gradient layer - Deep charcoal to navy */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-navy-900 opacity-95" />
      
      {/* Mid layer - Subtle gold accent gradients */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-gradient-radial from-gold-500/5 via-transparent to-transparent opacity-60 animate-pulse-gentle" />
      <div className="absolute bottom-0 left-0 w-[35%] h-[50%] bg-gradient-radial from-gold-400/4 via-transparent to-transparent opacity-50" />
      
      {/* Top layer - Ultra-subtle animated mesh gradient */}
      <div className="absolute inset-0 premium-mesh-gradient opacity-30" />
      
      {/* Boutique radial overlays */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-blue-600/3 via-transparent to-transparent animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-charcoal-600/4 via-transparent to-transparent animate-float-reverse" />
    </div>
  );
};

export default PremiumHeroGradient;