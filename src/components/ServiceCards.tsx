
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';

import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent, PremiumCardFooter } from '@/components/ui/premium-card';
import { ChevronRight, Shield, BarChart4, FileSearch, CreditCard } from 'lucide-react';
import { useTouchOptimizations } from '../hooks/useTouchOptimizations';

interface ServiceCardProps {
  title: string;
  description: string;
  delay: number;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ title, description, delay, icon }) => {
  const { isTouchDevice, hapticFeedback } = useTouchOptimizations();
  
  return (
    <ScrollReveal delay={delay} distance="8px">
      <PremiumCard 
        variant="elevated" 
        size="lg"
        className={`card-equal-height group hover:shadow-lg transition-all duration-150 ${isTouchDevice ? 'touch-hover-mobile cursor-pointer' : ''}`}
        onClick={() => isTouchDevice && hapticFeedback('light')}
      >
        <PremiumCardHeader className="space-component-xs">
          <div className="p-4 rounded-xl bg-accent/10 text-accent transition-transform duration-150 group-hover:scale-[1.02] w-fit border border-accent/20">
            {icon}
          </div>
          <PremiumCardTitle className="heading-sm">
            {title}
          </PremiumCardTitle>
        </PremiumCardHeader>
        
        <PremiumCardContent className="card-content-grow">
          <p className="text-body text-foreground/70">
            {description}
          </p>
        </PremiumCardContent>
        
        <PremiumCardFooter>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-primary font-medium touch-target group/link hover:text-accent transition-colors"
          >
            <span>Get started</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-150 group-hover/link:translate-x-1" />
          </button>
        </PremiumCardFooter>
      </PremiumCard>
    </ScrollReveal>
  );
});

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
    <section 
      id="services" 
      className="section-lg section-contain section-bg-accent relative overflow-hidden"
      role="region"
      aria-labelledby="services-heading"
    >
      <GradientAccent variant="subtle" position="top-left" intensity="ultra-low" />
      
      <div className="container-wide relative z-10">
        <ScrollReveal distance="8px">
          <div className="text-center space-component-lg">
            <div className="space-component-xs">
              <h2 id="services-heading" className="heading-lg text-balance">
                Services Tailored to Your Needs
              </h2>
              <p className="text-body-lg text-muted-foreground mx-auto text-balance max-w-2xl">
                Strategic financial planning designed for high-performing professionals who expect exceptional results.
              </p>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid-four-col">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              delay={index * 75} 
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
