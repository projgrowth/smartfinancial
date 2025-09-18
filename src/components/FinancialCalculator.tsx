
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RevealOnScroll } from './ui/enhanced-animations';
import { AnimatedCounter, AnimatedProgress } from './ui/animated-counter';
import GradientAccent from './GradientAccent';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';

const FinancialCalculator = () => {
  return (
    <section id="calculators" className="section relative overflow-hidden">
      <GradientAccent variant="subtle" position="top-left" intensity="low" />
      <div className="container-site relative z-10">
        <RevealOnScroll direction="fade" duration={800}>
          <h2 className="heading-lg text-foreground text-center space-component-sm">
            Financial Calculators
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll 
          direction="up" 
          delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-fast')) || 100}
          duration={600}
        >
          <p className="text-center text-muted-foreground container-narrow mx-auto space-component-lg">
            Explore our interactive financial calculators to help plan your financial future and visualize the power of strategic investing.
          </p>
        </RevealOnScroll>
        
        {/* Enhanced stats showcase */}
        <RevealOnScroll 
          direction="up" 
          delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-normal')) || 200}
          duration={600}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-unified-lg space-component-lg text-center">
            <div className="space-component-xs">
              <AnimatedCounter 
                value={10000000} 
                prefix="$" 
                className="heading-lg text-primary"
                duration={2500}
                separator=","
              />
              <p className="text-body-sm text-muted-foreground">Average portfolio growth</p>
            </div>
            <div className="space-component-xs">
              <AnimatedCounter 
                value={25} 
                suffix="%" 
                className="heading-lg text-accent"
                duration={2000}
              />
              <p className="text-body-sm text-muted-foreground">Tax savings achieved</p>
            </div>
            <div className="space-component-xs">
              <AnimatedCounter 
                value={500} 
                suffix="+" 
                className="heading-lg text-foreground"
                duration={1800}
              />
              <p className="text-body-sm text-muted-foreground">Clients served</p>
            </div>
          </div>
        </RevealOnScroll>
        
        <div className="container-wide mx-auto">
          <Tabs defaultValue="compound-interest" className="w-full">
            <TabsList className="grid w-full grid-cols-2 space-component-lg">
              <TabsTrigger value="compound-interest">Compound Interest</TabsTrigger>
              <TabsTrigger value="retirement">Retirement Calculator</TabsTrigger>
            </TabsList>
            <TabsContent value="compound-interest">
              <CompoundInterestCalculator />
            </TabsContent>
            <TabsContent value="retirement">
              <RetirementCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FinancialCalculator;
