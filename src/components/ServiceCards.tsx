
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import AnimatedSectionTransition from './AnimatedSectionTransition';
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
    <ScrollReveal delay={delay}>
      <PremiumCard 
        variant="elevated" 
        size="lg"
        className={`card-equal-height group ring-1 ring-border/20 hover:ring-accent/40 hover:shadow-[0_8px_30px_-10px_hsl(var(--accent)/0.3)] transition-all duration-300 ${isTouchDevice ? 'touch-hover-mobile cursor-pointer' : ''}`}
        onClick={() => isTouchDevice && hapticFeedback('light')}
      >
        <PremiumCardHeader>
          <div className="mb-6 p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.4)] w-fit">
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
          <button 
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center text-primary font-medium touch-target group/link hover:text-accent transition-colors"
          >
            <span className="mr-2">Get started</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
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
    <>
      <section id="services" className="section-xl section-contain section-bg-accent relative overflow-hidden">
        <GradientAccent variant="subtle" position="top-left" intensity="low" />
        
        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="text-center space-component-lg">
              <h2 className="heading-lg mb-6 text-balance">
                Services Tailored to Your Needs
              </h2>
              <p className="text-body-lg mx-auto text-muted-strong text-balance">
                Strategic financial planning designed for high-performing professionals who expect exceptional results.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid-four-col">
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
            height={60}
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
