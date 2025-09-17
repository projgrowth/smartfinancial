import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const NewHero = () => {
  const handleScheduleCall = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-xl bg-background">
      <div className="container-unified">
        <div className="text-center space-component-lg">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-body-sm text-muted-foreground mb-8">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Trusted by ambitious professionals in Central Florida
          </div>

          {/* Main Headline */}
          <h1 className="heading-display-fluid">
            Your wealth.{' '}
            <span className="text-accent font-medium">
              Compounded.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-body-xl max-w-3xl mx-auto space-component-sm">
            Tailored financial strategies for ambitious professionals who demand more than cookie-cutter solutions. 
            We help you build, protect, and grow your wealth.
          </p>

          {/* CTA Button */}
          <Button 
            onClick={handleScheduleCall}
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-medium rounded-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Schedule Your Private Strategy Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewHero;