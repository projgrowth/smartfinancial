
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
    <section id="contact" className="section bg-charcoal text-white bg-pattern blob-bg">
      <div className="blob top-20 right-10 w-80 h-80 bg-amber/10"></div>
      <div className="container-custom relative z-10">
        <div 
          ref={ctaRef}
          className="max-w-4xl mx-auto text-center animate-on-scroll"
        >
          <h2 className="heading-lg mb-6 text-white">
            Ready for smarter financial strategies designed exclusively around you?
          </h2>
          <p className="paragraph text-lightgray mb-10 max-w-2xl mx-auto">
            Take the first step toward financial clarity and strategic growth with a personalized approach.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-8 py-4 bg-amber text-charcoal font-medium rounded-md hover:bg-amber-light transition-all duration-300 shadow-lg"
          >
            Schedule Your Strategy Session
            <svg 
              className="ml-2" 
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
