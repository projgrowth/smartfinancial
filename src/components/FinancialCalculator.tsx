
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';

const FinancialCalculator = () => {
  return (
    <section 
      id="calculators"
      className="section-lg section-contain relative overflow-hidden bg-background"
      role="region"
      aria-labelledby="calculators-heading"
    >
      <GradientAccent variant="subtle" position="top-left" intensity="ultra-low" />
      <div className="container-narrow relative z-10">
        <ScrollReveal distance="8px">
          <h2 id="calculators-heading" className="heading-lg text-foreground text-center mb-4">
            Financial Calculators
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100} distance="6px">
          <p className="text-center text-muted-foreground text-body-lg max-w-2xl mx-auto mb-12">
            Explore our interactive financial calculators to help plan your financial future and visualize the power of strategic investing.
          </p>
        </ScrollReveal>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="compound-interest" className="w-full">
            <TabsList className="grid-two-col w-full mb-8">
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
