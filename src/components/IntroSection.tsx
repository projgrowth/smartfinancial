
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ArrowRight } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import { MicroAnimations } from './ui/micro-animations';
import { useLocation } from 'react-router-dom';

const IntroSection = () => {
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';
  
  return (
    <section className="section bg-white relative overflow-hidden py-28">
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
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal distance="3rem">
            <h2 className="heading-lg text-charcoal text-center mb-8">
              Generic plans weren't made for <span className="text-gradient-blue">you</span>.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150} distance="2rem">
            <p className="paragraph text-charcoal/70 text-center mb-12 max-w-3xl mx-auto">
              We deliver highly personalized financial guidance for business owners, 
              top-tier executives, doctors, and legal professionals—crafted around your distinct ambitions, 
              career trajectory, and lifestyle.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={250} distance="1.5rem" className="text-center">
            <MicroAnimations.FloatingElement intensity="subtle">
              <MicroAnimations.ScaleOnHover scale="sm">
                <PrimaryButton
                  variant="outline"
                  icon={<ArrowRight />}
                  iconPosition="right"
                  className="group px-6 py-3.5 border-blue-200 hover:bg-blue-50/50"
                  onClick={() => document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Discover Your Financial Profile
                </PrimaryButton>
              </MicroAnimations.ScaleOnHover>
            </MicroAnimations.FloatingElement>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
