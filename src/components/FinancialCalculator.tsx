
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';

const FinancialCalculator = () => {
  return (
    <section id="calculators" className="section py-20 relative overflow-hidden">
      <GradientAccent variant="subtle" position="top-left" intensity="low" />
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            Financial Calculators
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-12">
            Explore our interactive financial calculators to help plan your financial future and visualize the power of strategic investing.
          </p>
        </ScrollReveal>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="compound-interest" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="compound-interest">Compound Interest</TabsTrigger>
              <TabsTrigger value="retirement">Retirement Planning</TabsTrigger>
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
