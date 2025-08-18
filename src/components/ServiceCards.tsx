
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import AnimatedSectionTransition from './AnimatedSectionTransition';
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent, PremiumCardFooter } from './ui/premium-card';
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
      <PremiumCard 
        variant="elevated" 
        size="lg"
        className="card-equal-height group"
      >
        <PremiumCardHeader>
          <div className="mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary/80">
            {icon}
          </div>
          <PremiumCardTitle className="heading-sm mb-4">
            {title}
          </PremiumCardTitle>
        </PremiumCardHeader>
        
        <PremiumCardContent className="card-content-grow">
          <p className="text-body">
            {description}
          </p>
        </PremiumCardContent>
        
        <PremiumCardFooter>
          <div className="flex items-center text-primary font-medium touch-target">
            <span className="mr-2">Learn more</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </PremiumCardFooter>
      </PremiumCard>
    </ScrollReveal>
  );
};

const ServiceCards = () => {
  const services = [
    {
      title: "Retirement Design",
      description: "Architect your ideal retirement, optimized for tax efficiency and lifetime wealth preservation.",
      icon: <FileSearch size={28} strokeWidth={1.5} />
    },
    {
      title: "Tax Strategy",
      description: "Maximize your earnings with proactive, tailored tax strategies reserved for elite earners.",
      icon: <CreditCard size={28} strokeWidth={1.5} />
    },
    {
      title: "Investment Management",
      description: "Custom investment solutions calibrated to your ambitions, risk tolerance, and growth targets.",
      icon: <BarChart4 size={28} strokeWidth={1.5} />
    },
    {
      title: "Wealth Protection",
      description: "Specialized coverage ensuring comprehensive protection for all your assets.",
      icon: <Shield size={28} strokeWidth={1.5} />
    }
  ];

  return (
    <>
      <section id="services" className="section-xl bg-gradient-to-br from-accent/5 via-background to-accent/10 relative overflow-hidden">
        <GradientAccent variant="subtle" position="top-left" intensity="low" />
        
        <div className="container-site relative z-10">
          <ScrollReveal>
            <div className="text-center space-component-lg">
              <h2 className="heading-lg mb-6">
                Services Tailored to Your Needs
              </h2>
              <p className="text-body-lg mx-auto">
                Strategic financial planning designed for high-performing professionals who expect exceptional results.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid-four-col gap-unified-lg">
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
        
        <div className="relative z-10 mt-10 md:mt-14">
          <AnimatedSectionTransition 
            style="diagonal" 
            colorScheme="light-to-dark" 
            position="bottom" 
            height={50}
            showIcon={true}
            iconType="arrow"
            onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </section>
    </>
  );
};

export default ServiceCards;
