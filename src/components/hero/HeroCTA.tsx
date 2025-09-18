import React, { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { RevealOnScroll } from '../ui/enhanced-animations';
import { Button } from '../ui/button';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { useDesignSystemValues } from '../../hooks/useDesignSystemValues';

interface HeroCTAProps {
  ctaText: string;
}

const HeroCTA: React.FC<HeroCTAProps> = ({ ctaText }) => {
  // Centralized design system values
  const { animationDelaySlow, transitionNormal } = useDesignSystemValues();

  // Memoized click handler for performance
  const handleCTAClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('contact');
  }, []);

  return (
    <RevealOnScroll 
      direction="up" 
      delay={animationDelaySlow}
      duration={600}
    >
      <div className="flex flex-col sm:flex-row gap-site-md justify-center items-center">
        <Button
          onClick={handleCTAClick}
          variant="premium"
          size="lg"
          className="group hover-glow spring-bounce"
          aria-label={`${ctaText} - Navigate to contact section`}
        >
          {ctaText}
          <ChevronRight 
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
            style={{ transitionDuration: transitionNormal }}
            aria-hidden="true"
          />
        </Button>
      </div>
    </RevealOnScroll>
  );
};

export default HeroCTA;