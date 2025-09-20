
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';

import PremiumHeroBackground from './PremiumHeroBackground';
import { Button } from '@/components/ui/button';

const Hero = () => {

  return (
    <section className="relative min-h-[calc(100svh-var(--nav-h))] flex items-center overflow-hidden">
      {/* Premium Background */}
      <PremiumHeroBackground variant="primary" />
      
      <div className="container-unified z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[70vh]">
          {/* Content - Left aligned with asymmetrical layout */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-12">
            <ScrollReveal distance="20px" duration={600}>
              <div className="space-y-6">
                <h1 className="heading-display-premium text-left text-balance tracking-tight">
                  Private Wealth
                  <span className="block text-gold-light font-light tracking-wide">
                    Management
                  </span>
                </h1>
                <div className="h-px w-24 bg-gradient-to-r from-gold via-gold/60 to-transparent"></div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} distance="20px" duration={600}>
              <p className="text-premium text-xl lg:text-2xl max-w-2xl text-left leading-relaxed font-light">
                Institutional-grade strategies for sophisticated investors. 
                We deliver precision wealth management with the discretion and 
                expertise you expect from a premier advisory firm.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={400} distance="20px" duration={600}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => smoothScrollTo('schedule')}
                  className="group border-2 border-white/20 bg-transparent hover:bg-white/5 text-white hover:text-white transition-all duration-300 px-8 py-4 text-base font-medium tracking-wide focus-enhanced"
                >
                  Private Consultation
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <button
                  onClick={() => smoothScrollTo('process')}
                  className="text-white/70 hover:text-white transition-colors duration-300 text-base font-medium tracking-wide underline decoration-white/20 underline-offset-4 hover:decoration-white/60 focus-enhanced"
                >
                  Our Approach
                </button>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Right side - Empty space for asymmetrical balance */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
