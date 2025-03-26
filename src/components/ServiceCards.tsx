
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ChevronRight, Shield, BarChart4, FileSearch, CreditCard } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  delay: number;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, delay, icon }) => {
  return (
    <ScrollReveal delay={delay}>
      <div className="group h-full">
        <div className="h-full bg-white rounded-lg p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-blue-100 hover:translate-y-[-4px] flex flex-col">
          <div className="text-blue-500 mb-5 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600">
            {icon}
          </div>
          
          <h3 className="heading-sm text-charcoal mb-3 group-hover:text-blue-800 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-charcoal/70 flex-grow mb-4">
            {description}
          </p>
          
          <div className="flex items-center text-blue-500 font-medium mt-auto opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="mr-1">Learn more</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const ServiceCards = () => {
  const services = [
    {
      title: "Retirement Design",
      description: "Architect your ideal retirement, optimized for tax efficiency and lifetime wealth preservation.",
      icon: <FileSearch size={24} strokeWidth={1.5} />
    },
    {
      title: "Tax Strategy",
      description: "Maximize your earnings with proactive, tailored tax strategies reserved for elite earners.",
      icon: <CreditCard size={24} strokeWidth={1.5} />
    },
    {
      title: "Investment Management",
      description: "Custom investment solutions calibrated to your ambitions, risk tolerance, and growth targets.",
      icon: <BarChart4 size={24} strokeWidth={1.5} />
    },
    {
      title: "Wealth Protection",
      description: "Specialized coverage ensuring comprehensive protection for all your assets.",
      icon: <Shield size={24} strokeWidth={1.5} />
    }
  ];

  return (
    <section id="services" className="section bg-offwhite relative overflow-hidden py-24">
      <GradientAccent variant="subtle" position="top-left" intensity="low" />
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            Services Tailored to Your Needs
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-16">
            Strategic financial planning designed for high-performing professionals who expect exceptional results.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              delay={index * 100} 
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
