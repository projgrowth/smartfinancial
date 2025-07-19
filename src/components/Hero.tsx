
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import PrimaryButton from './PrimaryButton';
import GradientAccent from './GradientAccent';
import { MicroAnimations } from './ui/micro-animations';
import { useLocation } from 'react-router-dom';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  return (
    <section className="relative section-hero flex-col-center overflow-hidden">
      {/* Enhanced background accents */}
      <GradientAccent variant="blue" position="top-right" size="xl" intensity="low" animated />
      <GradientAccent variant="gold" position="bottom-left" size="lg" intensity="low" animated />
      
      {/* Bull shape gradient only on education page */}
      {isEducationPage && (
        <GradientAccent 
          variant="bull" 
          position="center" 
          size="2xl" 
          intensity="ultra-low" 
          shape="bull" 
          animated 
          className="opacity-[0.05] mix-blend-screen" 
        />
      )}
      
      <div className="container-standard z-10">
        <div className="max-w-4xl mx-auto text-center spacing-large">
          <ScrollReveal>
            <h1 className="heading-hero text-foreground mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center whitespace-nowrap gap-x-3 gap-y-1">
                <span>Your wealth.</span>
                <span className="text-accent typing-wrapper">
                  <span className="typing-text">Elevated.</span>
                </span>
              </div>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-hero mx-auto mb-10">
              Tailored financial strategies for ambitious professionals who demand more than 
              cookie-cutter solutions. We help you build, protect, and grow your wealth.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <MicroAnimations.ScaleOnHover scale="sm">
              <button
                onClick={() => smoothScrollTo('contact')}
                className="btn-primary group"
              >
                <span>Schedule Your Private Strategy Call</span>
                <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </MicroAnimations.ScaleOnHover>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
