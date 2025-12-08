
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { preloadComponent } from '@/utils/componentPreloader';

const IntroSection = () => {
  return (
    <section className="section-md section-contain bg-background relative overflow-hidden">
      <GradientAccent variant="subtle" position="bottom-left" intensity="ultra-low" />
      
      <div className="container-default relative z-10">
        <div className="mx-auto text-center space-component-lg">
          <ScrollReveal distance="3rem">
            <h2 className="heading-lg mb-4">
              Generic plans weren't made for{' '}
              <span className="text-accent">you</span>.
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
            <Button
              variant="outline"
              className="group"
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => preloadComponent(() => import('./Process'), 'Process')}
            >
              <span className="mr-2">Discover Your Financial Profile</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
