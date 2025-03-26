
import React from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-16">
      <div className="container-custom mx-auto z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-xl text-charcoal mb-6 opacity-100 transition-all duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-center whitespace-nowrap gap-x-3 gap-y-1">
              <span>Your wealth.</span>
              <span className="text-blue-500 transition-all duration-300 ease-in-out">
                Elevated.
              </span>
            </div>
          </h1>
          
          <p className="text-lg font-heading mb-8 opacity-100 translate-y-0 transition-all duration-500">
            <span className="text-charcoal">Your future.</span>
            <span className="text-blue-500 ml-2">
              Secured.
            </span>
          </p>
          
          <p className="paragraph text-charcoal/80 mb-10 max-w-2xl mx-auto opacity-100 translate-y-0 transition-all duration-500">
            Tailored financial strategies for ambitious professionals who demand more than 
            cookie-cutter solutions. We help you build, protect, and grow your wealth.
          </p>
          
          <div className="opacity-100 translate-y-0 transition-all duration-500">
            <Button 
              onClick={() => smoothScrollTo('contact')}
              className="px-6 py-6 bg-charcoal text-white hover:bg-charcoal/90 text-base group"
            >
              <span className="relative z-10">Schedule Your Private Strategy Call</span>
              <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
