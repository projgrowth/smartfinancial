import React from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';

interface HeroTrustSignalProps {
  show: boolean;
}

const HeroTrustSignal: React.FC<HeroTrustSignalProps> = ({ show }) => {
  if (!show) return null;

  return (
    <RevealOnScroll 
      direction="fade" 
      delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-extra-slow')) || 600}
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