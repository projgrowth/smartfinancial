
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ArrowRight } from 'lucide-react';
import { MicroAnimations } from './ui/micro-animations';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { sections } from '../data/content';

const IntroSection = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  const { title, subtitle, description, cta } = sections.intro;
  
  return (
    <section className="section-md bg-background relative overflow-hidden">
      <GradientAccent variant="subtle" position="bottom-left" intensity="low" animated />
      <GradientAccent variant="gold" position="top-right" size="sm" intensity="low" className="translate-x-1/2" animated />
      
      {/* Education-specific bull gradient (ultra subtle) */}
      {isEducationPage && (
        <GradientAccent 
          variant="bull" 
          position="top-left" 
          size="xl" 
          intensity="ultra-low" 
          shape="bull" 
          animated 
          className="opacity-[0.03] mix-blend-screen rotate-45" 
        />
      )}
      
      <div className="container-site relative z-10">
        <div className="container-narrow mx-auto text-center space-site-lg">
          <ScrollReveal distance="3rem">
            <h2 className="heading-lg space-component-sm">
              {title}
            </h2>
            <p className="heading-sm text-accent font-normal space-component-md">
              {subtitle}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={150} distance="2rem">
            <p className="text-body-lg mx-auto space-component-md">
              {description}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={250} distance="1.5rem">
            <MicroAnimations.FloatingElement intensity="subtle">
              <MicroAnimations.ScaleOnHover scale="sm">
                <Button
                  variant="outline"
                  className="group"
                  onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="mr-2">{cta?.text}</span>
                  <ArrowRight className="icon-sm transition-transform duration-normal group-hover:translate-x-1" />
                </Button>
              </MicroAnimations.ScaleOnHover>
            </MicroAnimations.FloatingElement>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
