import React from 'react';
import { ChevronRight, Star, Shield, TrendingUp } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import ScrollReveal from './ScrollReveal';
import PrimaryButton from './PrimaryButton';
import BullIntegration from './BullIntegration';
import { MicroAnimations } from './ui/micro-animations';

const EnhancedCTA = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Average 25% portfolio growth for our clients"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Fiduciary duty - your interests always come first"
    },
    {
      icon: <Star className="w-5 h-5" />,
      text: "4.9/5 client satisfaction rating"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      <BullIntegration 
        variant="watermark" 
        size="lg" 
        className="opacity-[0.03] right-12 bottom-12"
      />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
      </div>
      
      <div className="container-custom mx-auto relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Trusted by 150+ Orlando & Lake Nona Professionals
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-foreground mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join successful professionals in Lake Nona and Orlando who've taken control of their wealth with our proven strategies.
            </p>
            
            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {benefit.icon}
                    </div>
                    <span className="text-sm text-muted-foreground">{benefit.text}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MicroAnimations.ScaleOnHover scale="sm">
                  <PrimaryButton 
                    onClick={() => smoothScrollTo('contact')}
                    className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
                    icon={<ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
                    iconPosition="right"
                  >
                    Schedule Your Free Consultation
                  </PrimaryButton>
                </MicroAnimations.ScaleOnHover>
                
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">
                    No obligation • 30-minute strategy session
                  </p>
                  <div className="flex items-center gap-1 justify-center sm:justify-start mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      Based on 150+ client reviews
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-lg border max-w-2xl mx-auto">
                <h3 className="text-lg font-heading font-medium text-card-foreground mb-3">
                  What You'll Get in Your Free Consultation:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Personalized financial assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Tax optimization strategies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Investment portfolio review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Retirement planning roadmap</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnhancedCTA;