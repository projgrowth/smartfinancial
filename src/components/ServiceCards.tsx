
import React, { useState, useRef, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  hoverText: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, hoverText, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef} 
      className="animate-on-scroll" 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        className="hover-card bg-white rounded-md p-8 h-64 flex flex-col justify-center items-center text-center shadow-md border border-lightgray/20 hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className="heading-sm text-charcoal mb-4 transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 0 : 1 }}>
          {title}
        </h3>
        
        <div className="hover-card-content">
          <p className="text-white mb-3 font-medium">{title}</p>
          <p className="text-lightgray text-sm">{hoverText}</p>
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

  const titleRef = useRef<HTMLHeadingElement>(null);

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
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section bg-offwhite bg-pattern">
      <div className="container-custom">
        <h2 
          ref={titleRef}
          className="heading-lg text-charcoal text-center mb-16 animate-on-scroll"
        >
          Services Tailored to Your Needs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              hoverText={service.hoverText} 
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
