import React, { useMemo } from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';

interface HeroDescriptionProps {
  description: string;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ description }) => {
  // Memoized animation delay calculation
  const animationDelay = useMemo(() => 
    parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-normal')) || 200,
    []
  );

  return (
    <RevealOnScroll 
      direction="up" 
      delay={animationDelay}
      duration={600}
    >
      <p 
        className="text-body-xl text-muted-foreground container-narrow mx-auto"
        role="text"
        aria-label="Hero section description"
      >
        {description}
      </p>
    </RevealOnScroll>
  );
};

export default HeroDescription;