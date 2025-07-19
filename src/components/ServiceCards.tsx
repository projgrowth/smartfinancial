import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';

const ServiceCards = () => {
  const services = [
    {
      title: 'Wealth Management',
      description: 'Comprehensive strategies to grow, protect, and transfer your wealth across generations.',
      icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><path d="m3 6 9-4 9 4"/><path d="M21 6v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6"/></svg>,
      features: [
        'Personalized financial planning',
        'Investment portfolio management',
        'Retirement income strategies',
        'Estate planning coordination'
      ]
    },
    {
      title: 'Investment Planning',
      description: 'Expert guidance to build a diversified portfolio aligned with your risk tolerance and financial goals.',
      icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><rect width="8" height="12" x="7" y="8" rx="1"/><rect width="8" height="8" x="7" y="3" rx="1"/></svg>,
      features: [
        'Asset allocation strategies',
        'Risk management and diversification',
        'Tax-efficient investing',
        'Ongoing portfolio monitoring'
      ]
    },
    {
      title: 'Retirement Planning',
      description: 'Strategies to help you retire comfortably with a sustainable income stream.',
      icon: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      features: [
        'Retirement needs analysis',
        'Social Security optimization',
        'Pension planning',
        '401(k) and IRA rollovers'
      ]
    }
  ];

  return (
    <section id="services" className="section-large bg-muted/30 relative overflow-hidden">
      <GradientAccent variant="blue" position="top-left" size="lg" intensity="low" animated />
      
      <div className="container-standard">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="heading-2 text-foreground mb-6">
              Comprehensive Financial Solutions
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <p className="text-large mx-auto">
              Every aspect of your financial life, expertly managed and strategically optimized 
              for your unique goals and circumstances.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid-three grid-gap-large">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100}>
              <div className="card-premium group h-full">
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg mr-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-4 text-foreground mb-2">{service.title}</h3>
                    <p className="text-body">{service.description}</p>
                  </div>
                </div>
                
                <ul className="spacing-small">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                      <span className="text-small">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <button className="btn-ghost text-accent hover:text-accent-foreground group w-full justify-center">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
