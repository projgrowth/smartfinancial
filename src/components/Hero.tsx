
import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const typingTimer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 2200);
    
    return () => clearTimeout(typingTimer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24">
      <div className="container-custom mx-auto z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className={`heading-xl text-charcoal mb-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="typing-wrapper mr-2">
              <span className="typing-text">Your wealth.</span>
            </span>
            <span 
              className={`text-gold transition-all duration-1000 ease-in-out ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ textShadow: '0 0 1px rgba(199, 168, 92, 0.4)' }}
            >
              Elevated.
            </span>
          </h1>
          
          <p 
            className={`paragraph text-darkgray/90 mb-10 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Tailored financial strategies for ambitious professionals who demand more than cookie-cutter solutions.
          </p>
          
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <a 
              href="#contact" 
              className="button-primary inline-block shadow-lg group"
            >
              <span className="relative z-10">Schedule Your Private Strategy Call</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gold/10 to-gold/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></span>
            </a>
          </div>
          
          {/* Modern scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-charcoal/40 animate-bounce-subtle">
            <span className="text-sm mb-2 tracking-wide font-light">Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
