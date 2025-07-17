
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import PrimaryButton from './PrimaryButton';
import GradientAccent from './GradientAccent';
import BullIntegration from './BullIntegration';
import { MicroAnimations } from './ui/micro-animations';
import { useLocation } from 'react-router-dom';

const Hero = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-16 overflow-hidden">
      {/* Enhanced background accents */}
      <GradientAccent variant="blue" position="top-right" size="xl" intensity="low" animated />
      <GradientAccent variant="gold" position="bottom-left" size="lg" intensity="low" animated />
      
      {/* Bull integration - subtle background element */}
      <BullIntegration 
        variant="hero" 
        size="xl" 
        animated 
        className="opacity-[0.3] mix-blend-overlay absolute inset-0"
      />
      
      {/* Education page specific bull */}
      {isEducationPage && (
        <BullIntegration 
          variant="section" 
          size="lg" 
          animated 
          className="opacity-[0.08] mix-blend-screen top-20 right-10"
        />
      )}
      
      <div className="container-custom mx-auto z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="heading-xl font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center whitespace-nowrap gap-x-3 gap-y-1">
                <span>Your wealth.</span>
                <span className="text-blue-500 font-bold">
                  <span className="animate-fade-in">Elevated.</span>
                </span>
              </div>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-lg font-heading mb-8">
              <span className="text-charcoal">Your future.</span>
              <span className="text-blue-500 ml-2 text-gradient-animate">
                Secured.
              </span>
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="paragraph text-charcoal/80 mb-10 max-w-2xl mx-auto shadow-sm p-4 bg-white/50 backdrop-blur-sm rounded-lg">
              Tailored financial strategies for ambitious professionals who demand more than 
              cookie-cutter solutions. We help you build, protect, and grow your wealth.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <MicroAnimations.ScaleOnHover scale="sm">
              <PrimaryButton 
                onClick={() => smoothScrollTo('contact')}
                className="px-6 py-3 bg-charcoal text-white group hover:shadow-blue-sm"
                icon={<ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
                iconPosition="right"
              >
                Schedule Your Private Strategy Call
              </PrimaryButton>
            </MicroAnimations.ScaleOnHover>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
