
import React, { useEffect, useRef } from 'react';

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const processStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    processStepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Deep Discovery',
      description: 'We dive deep to understand your financial landscape, ambitions, and opportunities that others overlook.'
    },
    {
      number: '02',
      title: 'Bespoke Blueprint',
      description: 'Receive a custom-crafted financial strategy, from investments and tax optimization to advanced wealth protection.'
    },
    {
      number: '03',
      title: 'Growth & Guidance',
      description: 'Benefit from ongoing strategic reviews, adjustments, and proactive insights as your life evolves.'
    }
  ];

  return (
    <section id="process" className="section bg-navy-dark text-white">
      <div className="container-custom">
        <div 
          ref={sectionRef}
          className="animate-on-scroll"
        >
          <h2 className="heading-lg text-center mb-16">Our Process</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (processStepRefs.current[index] = el)}
              className="animate-on-scroll relative"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="glass-card bg-navy-light/30 hover:bg-navy-light/50 transition-all duration-500 p-8 rounded-lg h-full">
                <span className="text-gold text-4xl font-neue font-semibold opacity-80 block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-neue font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
