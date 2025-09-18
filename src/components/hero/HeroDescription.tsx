import React from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';
import { useDesignSystemValues } from '../../hooks/useDesignSystemValues';

interface HeroDescriptionProps {
  description: string;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ description }) => {
  // Centralized design system values
  const { animationDelayNormal } = useDesignSystemValues();

  return (
    <RevealOnScroll 
      direction="up" 
      delay={animationDelayNormal}
      duration={600}
    >
      <p className="text-body-xl text-muted-foreground container-narrow mx-auto">
        {description}
      </p>
    </RevealOnScroll>
  );
};

export default HeroDescription;