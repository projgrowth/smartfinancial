import React from 'react';
import { Shield, Users, Award, TrendingUp } from 'lucide-react';

const HeroTrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Shield,
      text: 'Fiduciary Standard',
      description: 'Always acting in your best interest'
    },
    {
      icon: Users,
      text: '500+ Clients',
      description: 'Trusted by professionals across Central Florida'
    },
    {
      icon: Award,
      text: '15+ Years',
      description: 'Combined team experience'
    },
    {
      icon: TrendingUp,
      text: 'Proven Results',
      description: 'Consistent wealth growth strategies'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Trust Statement */}
      <div className="text-center mb-8">
        <p className="text-muted-foreground/80 text-sm leading-relaxed">
          Trusted by ambitious professionals across Central Florida
        </p>
      </div>

      {/* Trust Indicators Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          
          return (
            <div 
              key={indicator.text}
              className="flex flex-col items-center text-center group"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* Icon Container */}
              <div className="relative mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
                  <Icon 
                    className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" 
                    aria-hidden="true"
                  />
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 w-12 h-12 rounded-xl bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Text Content */}
              <div className="space-y-1">
                <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-200">
                  {indicator.text}
                </p>
                <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-[120px] hidden sm:block">
                  {indicator.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Trust Element */}
      <div className="mt-8 pt-6 border-t border-border/30">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground/60">
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Licensed & Insured</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span>Fee Transparent</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span>Client First</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroTrustIndicators;