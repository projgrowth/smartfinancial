import React from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';
import { useDesignSystemValues } from '../../hooks/useDesignSystemValues';

interface HeroTrustSignalProps {
  show: boolean;
}

const HeroTrustSignal: React.FC<HeroTrustSignalProps> = ({ show }) => {
  // Centralized design system values
  const { animationDelayExtraSlow } = useDesignSystemValues();

  if (!show) return null;

  return (
    <RevealOnScroll 
      direction="fade" 
      delay={animationDelayExtraSlow}
      duration={500}
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground/80">
          Trusted by ambitious professionals in Central Florida
        </p>
      </div>
    </RevealOnScroll>
  );
};

export default HeroTrustSignal;