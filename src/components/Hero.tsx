import React from 'react';
import { ParallaxBackground } from './ui/parallax-container';
import GradientAccent from './GradientAccent';
import { useLocation } from 'react-router-dom';
import { heroContent } from '../data/content';
import HeroHeadline from './hero/HeroHeadline';
import HeroDescription from './hero/HeroDescription';
import HeroCTA from './hero/HeroCTA';
import HeroTrustSignal from './hero/HeroTrustSignal';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  const { words, headline, description, cta } = heroContent;

  return (
    <ParallaxBackground 
      gradient="linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent)/0.05) 50%, hsl(var(--background)) 100%)"
      intensity={0.3}
      className="relative min-h-screen flex items-center justify-center"
    >
      <section 
        className="relative w-full flex items-center justify-center"
        aria-labelledby="hero-heading"
      >
        <GradientAccent variant="blue" position="top-right" intensity="low" animated />
        <GradientAccent variant="subtle" position="bottom-left" intensity="ultra-low" />
        
        <div className="container-site relative z-10 text-center">
          <HeroHeadline prefix={headline.prefix} words={words} />
          <HeroDescription description={description} />
          <HeroCTA ctaText={cta.text.desktop} />
          <HeroTrustSignal show={!isEducationPage} />
        </div>
      </section>
    </ParallaxBackground>
  );
};

export default Hero;
