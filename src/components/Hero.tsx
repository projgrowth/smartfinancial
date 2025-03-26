
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements when component mounts
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (headingRef.current) {
      observer.observe(headingRef.current);
      setTimeout(() => {
        headingRef.current?.classList.add('animate-slide-up');
      }, 300);
    }

    if (subheadingRef.current) {
      observer.observe(subheadingRef.current);
      setTimeout(() => {
        subheadingRef.current?.classList.add('animate-slide-up');
      }, 500);
    }

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
      setTimeout(() => {
        ctaRef.current?.classList.add('animate-slide-up');
      }, 700);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24">
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-lightest/10 to-white/70 -z-10"></div>
      <div className="absolute top-1/3 right-0 w-3/4 h-80 bg-gold/5 rounded-l-full blur-3xl -z-10"></div>
      
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="heading-xl text-navy-dark mb-6 opacity-0"
          >
            Your wealth. <span className="text-navy">Elevated.</span>
          </h1>
          
          <p 
            ref={subheadingRef}
            className="paragraph text-slate mb-10 max-w-2xl mx-auto opacity-0"
          >
            Tailored financial strategies for ambitious professionals who demand more than cookie-cutter solutions.
          </p>
          
          <div 
            ref={ctaRef}
            className="opacity-0"
          >
            <a 
              href="#contact" 
              className="button-primary inline-block"
            >
              Schedule Your Private Strategy Call
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-navy-light/50 animate-bounce">
            <span className="text-sm mb-2">Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
