
import React, { useEffect, useRef } from 'react';

const IntroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll', 'in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 
            ref={titleRef} 
            className="heading-lg text-navy-dark text-center mb-6 animate-on-scroll"
          >
            Generic plans weren't made for <span className="text-navy">you</span>.
          </h2>
          
          <p 
            ref={textRef} 
            className="paragraph text-slate text-center mb-10 animate-on-scroll"
            style={{ transitionDelay: '100ms' }}
          >
            Smart Financial Planning delivers highly personalized financial guidance for business owners, 
            top-tier executives, doctors, and legal professionals—crafted around your distinct ambitions, 
            career trajectory, and lifestyle.
          </p>
          
          <div className="text-center">
            <a 
              ref={buttonRef}
              href="#profile" 
              className="button-secondary inline-flex items-center animate-on-scroll"
              style={{ transitionDelay: '200ms' }}
            >
              Discover Your Financial Profile
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
      </div>
    </section>
  );
};

export default IntroSection;
