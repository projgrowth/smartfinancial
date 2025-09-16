
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
          <h2 className="heading-lg text-foreground text-center mb-4">
            Financial Calculators
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll 
          direction="up" 
          delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-fast')) || 100}
          duration={600}
        >
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore our interactive financial calculators to help plan your financial future and visualize the power of strategic investing.
          </p>
        </RevealOnScroll>
        
        {/* Enhanced stats showcase */}
        <RevealOnScroll 
          direction="up" 
          delay={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-delay-normal')) || 200}
          duration={600}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
            <div className="space-y-2">
              <AnimatedCounter 
                value={10000000} 
                prefix="$" 
                className="text-2xl font-bold text-primary"
                duration={2500}
                separator=","
              />
              <p className="text-sm text-muted-foreground">Average portfolio growth</p>
            </div>
            <div className="space-y-2">
              <AnimatedCounter 
                value={25} 
                suffix="%" 
                className="text-2xl font-bold text-accent"
                duration={2000}
              />
              <p className="text-sm text-muted-foreground">Tax savings achieved</p>
            </div>
            <div className="space-y-2">
              <AnimatedCounter 
                value={500} 
                suffix="+" 
                className="text-2xl font-bold text-foreground"
                duration={1800}
              />
              <p className="text-sm text-muted-foreground">Clients served</p>
            </div>
          </div>
        </RevealOnScroll>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="compound-interest" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
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
