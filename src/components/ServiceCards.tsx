
import React, { useState } from 'react';
import { useIntersectionObserver, useStaggeredAnimation } from '../hooks/useIntersectionObserver';

interface ServiceCardProps {
  title: string;
  hoverText: string;
  delay: number;
  iconElement?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, hoverText, delay, iconElement }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>} 
      className={`transform transition-all duration-700 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        className="hover-card bg-white rounded-md p-8 h-64 flex flex-col justify-center items-center text-center shadow-md border border-lightgray/20 hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {iconElement && (
          <div className={`mb-4 text-gold transition-all duration-300 ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
            {iconElement}
          </div>
        )}
        
        <h3 className={`heading-sm text-charcoal mb-4 transition-all duration-300 ease-in-out ${
          isHovered ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {title}
        </h3>
        
        <div className={`hover-card-content transition-all duration-500 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-white mb-3 font-medium">{title}</p>
          <p className="text-lightgray text-sm">{hoverText}</p>
          <div className="mt-4 h-[1px] w-12 bg-gold/30"></div>
        </div>
      </div>
    </div>
  );
};

const ServiceCards = () => {
  const services = [
    {
      title: "Sophisticated Retirement Design",
      hoverText: "Architect your ideal retirement, optimized for tax efficiency and lifetime wealth."
    },
    {
      title: "Advanced Tax Strategy",
      hoverText: "Maximize your earnings with proactive, tailored tax strategies typically reserved for elite earners."
    },
    {
      title: "Strategic Investment Management",
      hoverText: "Customized investment solutions calibrated to your ambitions, risk tolerance, and professional growth."
    },
    {
      title: "Executive Insurance Solutions",
      hoverText: "Specialized coverage ensuring comprehensive protection without excess or gaps."
    }
  ];

  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const staggerDelays = useStaggeredAnimation(services.length, 150);

  return (
    <section id="services" className="section bg-offwhite bg-pattern">
      <div className="container-custom">
        <h2 
          ref={ref as React.RefObject<HTMLHeadingElement>}
          className={`heading-lg text-charcoal text-center mb-16 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Services Tailored to Your Needs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              hoverText={service.hoverText} 
              delay={staggerDelays[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
