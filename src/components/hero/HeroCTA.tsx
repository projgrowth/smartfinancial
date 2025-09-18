import React from 'react';
import { ChevronRight } from 'lucide-react';
import { RevealOnScroll } from '../ui/enhanced-animations';
import { Button } from '../ui/button';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface HeroCTAProps {
  ctaText: string;
}

const HeroCTA: React.FC<HeroCTAProps> = ({ ctaText }) => {
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('contact');
  };

  return (
    <RevealOnScroll 
      direction="up" 
      delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-slow')) || 400}
      duration={600}
    >
      <div className="flex flex-col sm:flex-row gap-site-md justify-center items-center">
        <Button
          onClick={handleCTAClick}
          variant="premium"
          size="lg"
          className="group hover-glow spring-bounce"
        >
          {ctaText}
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" style={{ transitionDuration: 'var(--transition-normal)' }} />
        </Button>
      </div>
    </RevealOnScroll>
  );
};

export default HeroCTA;