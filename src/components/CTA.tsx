
import React from 'react';
import ScrollReveal from './ScrollReveal';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section id="contact" className="section text-white relative overflow-hidden bg-gradient-to-br from-charcoal/95 to-charcoal/90 backdrop-blur-sm py-24">
      {/* Modern glass morphic decoration with subtle animation */}
      <div className="absolute left-0 top-0 w-[40%] h-[80%] bg-gradient-to-br from-blue-400/10 to-blue-500/5 blur-3xl rounded-full transform -translate-x-1/4 animate-float"></div>
      <div className="absolute right-0 bottom-0 w-[40%] h-[80%] bg-gradient-to-tl from-blue-400/10 to-blue-300/5 blur-3xl rounded-full transform translate-x-1/4 animate-float"></div>
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm py-12 px-6 sm:px-10 rounded-2xl border border-white/5">
            <h2 className="heading-lg mb-6 text-white">
              Ready for smarter financial strategies designed exclusively around you?
            </h2>
            <p className="paragraph text-white/70 mb-10 max-w-2xl mx-auto">
              Take the first step toward financial clarity and strategic growth with a personalized approach.
            </p>
            <a 
              href="#" 
              className="group inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white font-medium rounded-md transition-all duration-300 hover:bg-blue-600 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Schedule Your Strategy Session
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
