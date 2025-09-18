import React, { useCallback } from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { useIsMobile } from '../../hooks/use-mobile';
import { useDesignSystemValues } from '../../hooks/useDesignSystemValues';

interface CTAConfig {
  text: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  ariaLabel: string;
  targetSection: string;
}

interface HeroActionsProps {
  cta: CTAConfig;
}

const HeroActions: React.FC<HeroActionsProps> = ({ cta }) => {
  const isMobile = useIsMobile();
  const { transitionNormal } = useDesignSystemValues();

  // Get appropriate CTA text based on screen size
  const getCtaText = useCallback(() => {
    if (isMobile) return cta.text.mobile;
    if (window.innerWidth < 1024) return cta.text.tablet;
    return cta.text.desktop;
  }, [isMobile, cta.text]);

  // Enhanced CTA click handler
  const handlePrimaryClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // Add subtle haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    smoothScrollTo(cta.targetSection);
  }, [cta.targetSection]);

  // Secondary action - scroll to intro/about section
  const handleSecondaryClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('intro');
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-site-md items-center justify-center">
      
      {/* Primary CTA */}
      <Button
        onClick={handlePrimaryClick}
        variant="premium"
        size="lg"
        className="group relative overflow-hidden hover-glow spring-bounce"
        aria-label={cta.ariaLabel}
      >
        {/* Background shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <Calendar 
          className="mr-2 icon-sm transition-transform group-hover:scale-110" 
          style={{ transitionDuration: transitionNormal }}
          aria-hidden="true"
        />
        
        <span className="relative z-10">
          {getCtaText()}
        </span>
        
        <ArrowRight 
          className="ml-2 icon-sm transition-all group-hover:translate-x-1 group-hover:scale-110" 
          style={{ transitionDuration: transitionNormal }}
          aria-hidden="true"
        />
      </Button>

      {/* Secondary CTA - Learn More */}
      <Button
        onClick={handleSecondaryClick}
        variant="outline"
        size="lg"
        className="group border-border/50 hover:border-primary/50 transition-all duration-300"
        aria-label="Learn more about our services"
      >
        <Sparkles 
          className="mr-2 icon-sm transition-all group-hover:rotate-12 group-hover:scale-110" 
          style={{ transitionDuration: transitionNormal }}
          aria-hidden="true"
        />
        Learn More
      </Button>

      {/* Enhanced mobile-specific messaging */}
      {isMobile && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground/80">
            Free 30-minute consultation • No obligations
          </p>
        </div>
      )}
    </div>
  );
};

export default HeroActions;