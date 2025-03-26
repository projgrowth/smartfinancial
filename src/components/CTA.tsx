
import React, { useRef, useEffect } from 'react';

const CTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section text-white relative overflow-hidden bg-gradient-to-br from-charcoal/95 to-charcoal/90 backdrop-blur-sm">
      {/* Modern glass morphic decoration with subtle animation */}
      <div className="absolute left-0 top-0 w-[40%] h-[80%] bg-gradient-to-br from-sky-400/10 to-blue-500/5 blur-3xl rounded-full transform -translate-x-1/4 animate-float duration-30000"></div>
      <div className="absolute right-0 bottom-0 w-[40%] h-[80%] bg-gradient-to-tl from-amber-400/10 to-amber-300/5 blur-3xl rounded-full transform translate-x-1/4 animate-float duration-25000"></div>
      
      <div className="container-custom relative z-10">
        <div 
          ref={ctaRef}
          className="max-w-4xl mx-auto text-center animate-on-scroll backdrop-blur-sm py-12 px-6 sm:px-10 rounded-2xl border border-white/5"
        >
          <h2 className="heading-lg mb-6 text-white">
            Ready for smarter financial strategies designed exclusively around you?
          </h2>
          <p className="paragraph text-lightgray mb-10 max-w-2xl mx-auto">
            Take the first step toward financial clarity and strategic growth with a personalized approach.
          </p>
          <a 
            href="#" 
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber to-gold-light text-charcoal font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
          >
            <span className="relative z-10">Schedule Your Strategy Session</span>
            <span className="absolute inset-0 bg-gradient-to-r from-gold-light to-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <svg 
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
