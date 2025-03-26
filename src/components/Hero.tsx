
import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Animate elements when component mounts
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll', 'in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (headingRef.current) observer.observe(headingRef.current);
    if (subheadingRef.current) observer.observe(subheadingRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    // Start typing animation after a brief delay
    setTimeout(() => {
      setTyping(true);
    }, 500);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 bg-pattern blob-bg">
      {/* Blob decorations */}
      <div className="blob top-1/4 -left-10 w-72 h-72 bg-amber-light/30"></div>
      <div className="blob bottom-1/4 right-0 w-96 h-96 bg-lightgray/40"></div>
      
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-light -z-10"></div>
      
      <div className="container-custom mx-auto z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="heading-xl text-charcoal mb-6 opacity-0"
            style={{ transitionDelay: '100ms' }}
          >
            {typing ? (
              <>
                <span className="typing-wrapper mr-2">
                  <span className="typing-text">Your wealth.</span>
                </span>
                <span className="text-amber-dark opacity-0 animate-fadeInSlow" style={{ animationDelay: '3s' }}>Elevated.</span>
              </>
            ) : (
              <>Your wealth. <span className="text-amber-dark">Elevated.</span></>
            )}
          </h1>
          
          <p 
            ref={subheadingRef}
            className="paragraph text-darkgray/80 mb-10 max-w-2xl mx-auto opacity-0"
            style={{ transitionDelay: '300ms' }}
          >
            Tailored financial strategies for ambitious professionals who demand more than cookie-cutter solutions.
          </p>
          
          <div 
            ref={ctaRef}
            className="opacity-0"
            style={{ transitionDelay: '500ms' }}
          >
            <a 
              href="#contact" 
              className="button-primary inline-block shadow-lg"
            >
              Schedule Your Private Strategy Call
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-charcoal/40 animate-float">
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
