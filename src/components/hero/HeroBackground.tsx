import React, { useEffect, useState } from 'react';
import GradientAccent from '../GradientAccent';

interface HeroBackgroundProps {
  isEducationPage?: boolean;
  mousePosition?: { x: number; y: number };
  scrollY?: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  isEducationPage = false,
  mousePosition = { x: 0, y: 0 },
  scrollY = 0
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  const parallaxOffset = scrollY * 0.3;
  const mouseInfluence = {
    x: (mousePosition.x - window.innerWidth / 2) * 0.02,
    y: (mousePosition.y - window.innerHeight / 2) * 0.02
  };
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic gradient shapes */}
      <div 
        className="hero-gradient-orb hero-gradient-orb-1"
        style={{
          transform: `translate3d(${mouseInfluence.x}px, ${mouseInfluence.y + parallaxOffset}px, 0)`
        }}
      />
      <div 
        className="hero-gradient-orb hero-gradient-orb-2"
        style={{
          transform: `translate3d(${-mouseInfluence.x * 0.5}px, ${-mouseInfluence.y * 0.5 + parallaxOffset * 0.7}px, 0)`
        }}
      />
      <div 
        className="hero-gradient-orb hero-gradient-orb-3"
        style={{
          transform: `translate3d(${mouseInfluence.x * 0.3}px, ${mouseInfluence.y * 0.3 + parallaxOffset * 1.2}px, 0)`
        }}
      />
      
      {/* Enhanced gradient accents */}
      <GradientAccent 
        variant="blue" 
        position="top-right" 
        size="lg" 
        intensity="low" 
        animated 
        className="opacity-80 hero-accent-1" 
      />
      
      <div className="hidden md:block">
        <GradientAccent 
          variant="gold" 
          position="bottom-left" 
          size="md" 
          intensity="low" 
          animated 
          className="opacity-70 hero-accent-2" 
        />
      </div>
      
      {/* Geometric patterns */}
      <div className="hero-pattern-grid" />
      <div className="hero-pattern-dots" />
      
      {/* Education page bull shape */}
      {isEducationPage && (
        <GradientAccent 
          variant="bull" 
          position="center" 
          size="2xl" 
          intensity="ultra-low" 
          shape="bull" 
          animated 
          className="opacity-[0.08] mix-blend-screen hero-bull-shape" 
        />
      )}
    </div>
  );
};