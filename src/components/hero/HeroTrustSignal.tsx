import React, { useMemo } from 'react';
import { RevealOnScroll } from '../ui/enhanced-animations';

interface HeroTrustSignalProps {
  show: boolean;
}

const HeroTrustSignal: React.FC<HeroTrustSignalProps> = ({ show }) => {
  // Memoized animation delay calculation
  const animationDelay = useMemo(() => 
    parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-extra-slow')) || 600,
    []
  );

  if (!show) return null;

  return (
    <RevealOnScroll 
      direction="fade" 
      delay={animationDelay}
      duration={500}
    >
      <div className="text-center" role="complementary" aria-label="Trust indicator">
        <p className="text-sm text-muted-foreground/80">
          Trusted by ambitious professionals in Central Florida
        </p>
      </div>
    </RevealOnScroll>
  );
};

export default HeroTrustSignal;