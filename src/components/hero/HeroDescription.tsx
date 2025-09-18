import React from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';

interface HeroDescriptionProps {
  description: string;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ description }) => {
  return (
    <RevealOnScroll 
      direction="up" 
      delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-normal')) || 200}
      duration={600}
    >
      <p className="text-body-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
        {description}
      </p>
    </RevealOnScroll>
  );
};

export default HeroDescription;