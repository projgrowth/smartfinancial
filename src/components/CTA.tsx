
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
    <section id="contact" className="section bg-navy-dark text-white">
      <div className="container-custom">
        <div 
          ref={ctaRef}
          className="max-w-4xl mx-auto text-center animate-on-scroll"
        >
          <h2 className="heading-lg mb-6">
            Ready for smarter financial strategies designed exclusively around you?
          </h2>
          <p className="paragraph text-slate-light mb-10 max-w-2xl mx-auto">
            Take the first step toward financial clarity and strategic growth with a personalized approach.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-dark font-semibold rounded-sm hover:bg-gold-light transition-all duration-300"
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
