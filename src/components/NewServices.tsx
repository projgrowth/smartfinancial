import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Shield, PiggyBank, FileText } from 'lucide-react';

const NewServices = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Wealth Management",
      description: "Comprehensive investment strategies designed to grow and preserve your wealth over time"
    },
    {
      icon: Shield,
      title: "Risk Management", 
      description: "Protect what matters most with tailored insurance and risk mitigation strategies"
    },
    {
      icon: PiggyBank,
      title: "Retirement Planning",
      description: "Build a retirement plan that ensures financial security and peace of mind"
    },
    {
      icon: FileText,
      title: "Estate Planning",
      description: "Preserve your legacy with comprehensive estate planning and wealth transfer strategies"
    }
  ];

  return (
    <section id="services" className="section-lg bg-muted/30">
      <div className="container-unified">
        {/* Section Header */}
        <div className="text-center space-component-lg">
          <h2 className="heading-lg">Comprehensive Financial Solutions</h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            We provide integrated financial services designed to address every aspect of your financial life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid-four-col gap-unified-md">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6 text-center space-component-sm">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="heading-xs">{service.title}</h3>
                <p className="text-body">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewServices;