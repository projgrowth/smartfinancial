import React from 'react';
import { useLocation } from 'react-router-dom';
import { ParallaxBackground } from './ui/parallax-container';
import { RevealOnScroll } from './ui/enhanced-animations';
import GradientAccent from './GradientAccent';
import { heroContent, company } from '../data/content';
import { useDesignSystemValues } from '../hooks/useDesignSystemValues';
import HeroWordRotator from './hero/HeroWordRotator';
import HeroActions from './hero/HeroActions';
import HeroTrustIndicators from './hero/HeroTrustIndicators';

const Hero: React.FC = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  const { animationDelayNormal, animationDelaySlow } = useDesignSystemValues();
  
  const { words, headline, description, cta } = heroContent;

  return (
    <ParallaxBackground 
      gradient="linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent)/0.03) 30%, hsl(var(--primary)/0.02) 60%, hsl(var(--background)) 100%)"
      intensity={0.2}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <GradientAccent variant="blue" position="top-right" intensity="low" animated />
        <GradientAccent variant="subtle" position="bottom-left" intensity="ultra-low" />
        
        {/* Subtle animated particles */}
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-primary/20 rounded-full animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '3s' }} />
        <div className="absolute top-3/4 left-1/4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse" 
             style={{ animationDelay: '4s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-primary/40 rounded-full animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '5s' }} />
      </div>
      
      <main 
        id="main-content"
        className="relative w-full flex items-center justify-center z-10"
        role="main"
        aria-labelledby="hero-heading"
      >
        <div className="container-site text-center space-component-xl">
          
          {/* Enhanced Headline with Word Rotator */}
          <div className="space-component-lg">
            <RevealOnScroll direction="fade" duration={800} delay={0}>
              <h1 
                id="hero-heading"
                className="heading-display-fluid text-foreground leading-tight"
              >
                <span className="block">
                  {headline.prefix}
                </span>
                <HeroWordRotator words={words} />
              </h1>
            </RevealOnScroll>
          </div>

          {/* Enhanced Description */}
          <RevealOnScroll 
            direction="up" 
            delay={animationDelayNormal}
            duration={700}
          >
            <div className="space-component-md">
              <p className="text-body-xl text-muted-foreground container-narrow mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          </RevealOnScroll>

          {/* Enhanced Call-to-Action */}
          <RevealOnScroll 
            direction="up" 
            delay={animationDelaySlow}
            duration={600}
          >
            <div className="space-component-lg">
              <HeroActions cta={cta} />
            </div>
          </RevealOnScroll>

          {/* Trust Indicators */}
          {!isEducationPage && (
            <RevealOnScroll 
              direction="fade" 
              delay={600}
              duration={500}
            >
              <div className="space-component-md">
                <HeroTrustIndicators />
              </div>
            </RevealOnScroll>
          )}

          {/* Scroll Indicator */}
          <RevealOnScroll 
            direction="fade" 
            delay={800}
            duration={400}
          >
            <div className="mt-section-md flex justify-center">
              <div className="flex flex-col items-center space-y-2 animate-bounce" 
                   style={{ animationDuration: '3s' }}>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent" />
                <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full" />
              </div>
            </div>
          </RevealOnScroll>
          
        </div>
      </main>
    </ParallaxBackground>
  );
};

export default Hero;