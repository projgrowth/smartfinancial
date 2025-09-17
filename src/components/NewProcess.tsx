import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Target } from 'lucide-react';

const NewProcess = () => {
  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Initial Consultation",
      description: "We start with a comprehensive review of your current financial situation, goals, and concerns."
    },
    {
      number: "02", 
      icon: Users,
      title: "Strategy Development",
      description: "Our team creates a personalized financial strategy tailored to your unique needs and objectives."
    },
    {
      number: "03",
      icon: Target,
      title: "Implementation & Monitoring", 
      description: "We implement your plan and provide ongoing monitoring and adjustments as your life evolves."
    }
  ];

  return (
    <section id="process" className="section-lg bg-background">
      <div className="container-unified">
        {/* Section Header */}
        <div className="text-center space-component-lg">
          <h2 className="heading-lg">Our Three-Step Process</h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            A proven approach to creating and implementing your personalized financial strategy.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid-three-col gap-unified-lg">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card border border-border text-center relative overflow-hidden">
              <CardContent className="p-8 space-component-sm">
                {/* Step Number */}
                <div className="text-6xl font-heading font-light text-accent/20 mb-4">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-accent" />
                </div>
                
                {/* Content */}
                <h3 className="heading-xs">{step.title}</h3>
                <p className="text-body">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProcess;