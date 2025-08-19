
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ArrowRight } from 'lucide-react';
import { MicroAnimations } from './ui/micro-animations';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const IntroSection = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
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
      
      <div className="container-unified relative z-10">
        <div className="max-w-4xl mx-auto text-center space-component-lg">
          <ScrollReveal distance="3rem">
            <h2 className="heading-lg mb-4">
              Generic plans weren't made for{' '}
              <span className="text-blue-400">you</span>.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150} distance="2rem">
            <p className="text-body-lg mx-auto mb-6">
              We deliver highly personalized financial guidance for business owners, 
              top-tier executives, doctors, and legal professionals—crafted around your distinct ambitions, 
              career trajectory, and lifestyle.
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
                  <span className="mr-2">Discover Your Financial Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
