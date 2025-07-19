
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const RetirementCalculator = () => {
  return (
    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Retirement Calculator</CardTitle>
        <CardDescription>
          Plan for your retirement by estimating your future needs and savings
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center py-12">
        <p className="text-blue-500 mb-4">Coming Soon</p>
        <p className="text-charcoal/70 max-w-lg mx-auto">
          Our comprehensive retirement calculator will help you determine how much you need to save for a comfortable retirement based on your expected lifestyle and goals.
        </p>
      </CardContent>
    </Card>
  );
};

export default RetirementCalculator;
