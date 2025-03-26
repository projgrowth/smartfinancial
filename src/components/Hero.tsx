
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, TrendingUp, ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { InteractiveTooltip } from './ui/interactive-tooltip';
import InfoTip from './ui/InfoTip';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isSecondLineVisible, setIsSecondLineVisible] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const typingTimer = setTimeout(() => {
      setIsTypingComplete(true);
      
      // Show second line after first animation completes
      setTimeout(() => {
        setIsSecondLineVisible(true);
      }, 800);
    }, 2200);
    
    return () => clearTimeout(typingTimer);
  }, []);

  const handleScrollDown = () => {
    smoothScrollTo('services');
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-16">
      <div className="container-custom mx-auto z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <InfoTip
              content={
                <div className="space-y-2">
                  <p className="font-medium text-charcoal m-0">Outperforming the Market</p>
                  <p className="text-xs text-charcoal/70 m-0">Our clients consistently exceed market averages with our tailored strategies</p>
                </div>
              }
              position="top"
            >
              <div className="group flex items-center">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mr-2 group-hover:bg-gold/20 transition-colors duration-300">
                  <TrendingUp className="w-4 h-4 text-gold" />
                </div>
                <span className="text-sm uppercase tracking-wider text-gold/90 font-medium">Smart Financial Planning</span>
              </div>
            </InfoTip>
          </div>
          
          <h1 
            className={`heading-xl text-charcoal mb-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center whitespace-nowrap gap-x-3 gap-y-1">
              <span className="typing-wrapper inline-block">
                <span className="typing-text">Your wealth.</span>
              </span>
              <span 
                className={`text-gold inline-block transition-all duration-1000 ease-in-out ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}
                style={{ textShadow: '0 0 1px rgba(199, 168, 92, 0.4)' }}
              >
                Elevated.
              </span>
            </div>
          </h1>
          
          <p 
            className={`text-lg font-heading transition-all duration-700 mb-8 ${isSecondLineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-charcoal">Your future.</span>
            <span 
              className="text-gold ml-2 hover-glow cursor-default"
              style={{ textShadow: '0 0 1px rgba(199, 168, 92, 0.3)' }}
            >
              Secured.
            </span>
          </p>
          
          <p 
            className={`paragraph text-charcoal/80 mb-10 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Tailored financial strategies for ambitious professionals who demand more than 
            cookie-cutter solutions. We help you build, protect, and grow your wealth.
          </p>
          
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button 
              onClick={() => smoothScrollTo('contact')}
              className={`px-6 py-6 bg-charcoal text-white hover:bg-charcoal/90 text-base group ${hoverState ? 'shadow-lg' : ''}`}
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              <span className="relative z-10">Schedule Your Private Strategy Call</span>
              <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-gradient-to-r from-gold/10 to-gold/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></span>
            </Button>
          </div>
          
          {/* Modern scroll indicator with smooth scroll */}
          <button 
            onClick={handleScrollDown}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-charcoal/40 animate-bounce-subtle cursor-pointer hover:text-charcoal/60 transition-colors duration-300 focus:outline-none"
            aria-label="Scroll down"
          >
            <span className="text-sm mb-2 tracking-wide font-light">Scroll</span>
            <div className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center">
              <ChevronDown className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
