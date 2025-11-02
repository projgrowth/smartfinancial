
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';

const FinancialCalculator = () => {
  return (
    <section id="calculators" className="section relative overflow-hidden">
      <GradientAccent variant="subtle" position="top-left" intensity="low" />
      <div className="container-narrow relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-foreground text-center mb-4">
            Financial Calculators
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore our interactive financial calculators to help plan your financial future and visualize the power of strategic investing.
          </p>
        </ScrollReveal>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="compound-interest" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 data-[state=active]:shadow-md">
              <TabsTrigger value="compound-interest" className="data-[state=active]:shadow-md">Compound Interest</TabsTrigger>
              <TabsTrigger value="retirement" className="data-[state=active]:shadow-md">Retirement Calculator</TabsTrigger>
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
