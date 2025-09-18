
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const RetirementCalculator = () => {
  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Retirement Calculator</CardTitle>
        <CardDescription>
          Plan for your retirement by estimating your future needs and savings
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-component-xl">
        <p className="text-primary space-component-sm">Coming Soon</p>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Our comprehensive retirement calculator will help you determine how much you need to save for a comfortable retirement based on your expected lifestyle and goals.
        </p>
      </CardContent>
    </Card>
  );
};

export default RetirementCalculator;
