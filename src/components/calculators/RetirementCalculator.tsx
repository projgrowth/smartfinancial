
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { Info } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [retirementGoal, setRetirementGoal] = useState<number>(1500000);
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyRate = expectedReturn / 100 / 12;
    
    // Future value calculation
    let futureValue = currentSavings;
    let yearlyData = [];
    
    // Calculate growth year by year
    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        futureValue += monthlyContribution;
        futureValue *= (1 + monthlyRate);
      }
      
      yearlyData.push({
        age: currentAge + year,
        savings: Math.round(futureValue),
        totalContributions: currentSavings + (monthlyContribution * 12 * year),
      });
    }
    
    // Calculate if goal is met
    const shortfall = retirementGoal - futureValue;
    const isGoalMet = futureValue >= retirementGoal;
    
    // Monthly income at 4% withdrawal rate
    const monthlyIncome = (futureValue * 0.04) / 12;
    
    setResult({
      futureValue: Math.round(futureValue),
      shortfall: Math.round(Math.abs(shortfall)),
      isGoalMet,
      monthlyIncome: Math.round(monthlyIncome),
      totalContributions: currentSavings + (monthlyContribution * 12 * yearsToRetirement),
    });
    
    setChartData(yearlyData);
  };

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, retirementGoal]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Retirement Calculator</CardTitle>
          <InteractiveTooltip
            trigger={<Info className="h-4 w-4 text-blue-500 cursor-help" />}
            content={
              <div className="text-sm">
                <p>Plan your retirement by calculating how much you need to save based on your goals and timeline.</p>
              </div>
            }
            interactive
            title="About Retirement Planning"
            maxWidth="md"
          />
        </div>
        <CardDescription>
          Plan for your retirement by estimating your future needs and savings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="currentAge" className="block text-sm font-medium text-charcoal mb-1">
                  Current Age
                </label>
                <input
                  id="currentAge"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="18"
                  max="80"
                />
              </div>
              
              <div>
                <label htmlFor="retirementAge" className="block text-sm font-medium text-charcoal mb-1">
                  Retirement Age
                </label>
                <input
                  id="retirementAge"
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="50"
                  max="80"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="currentSavings" className="block text-sm font-medium text-charcoal mb-1">
                Current Savings
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-charcoal/70">$</span>
                <input
                  id="currentSavings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="block w-full pl-8 pr-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-medium text-charcoal mb-1">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-charcoal/70">$</span>
                <input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="block w-full pl-8 pr-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="expectedReturn" className="block text-sm font-medium text-charcoal mb-1">
                Expected Annual Return (%)
              </label>
              <div className="relative">
                <input
                  id="expectedReturn"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step="0.1"
                  min="0"
                  max="15"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-charcoal/70">%</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="retirementGoal" className="block text-sm font-medium text-charcoal mb-1">
                Retirement Goal
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-charcoal/70">$</span>
                <input
                  id="retirementGoal"
                  type="number"
                  value={retirementGoal}
                  onChange={(e) => setRetirementGoal(Number(e.target.value))}
                  className="block w-full pl-8 pr-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div>
            {result && (
              <>
                <div className={`p-4 rounded-lg mb-4 ${result.isGoalMet ? 'bg-green-50/50' : 'bg-amber-50/50'}`}>
                  <p className="text-sm text-charcoal/70 mb-1">Projected Retirement Savings</p>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(result.futureValue)}</p>
                  <p className="text-sm text-charcoal/70 mt-2">
                    Monthly Income (4% rule): {formatCurrency(result.monthlyIncome)}
                  </p>
                  <p className={`text-sm font-medium mt-1 ${result.isGoalMet ? 'text-green-600' : 'text-amber-600'}`}>
                    {result.isGoalMet 
                      ? `✓ Goal exceeded by ${formatCurrency(result.futureValue - retirementGoal)}`
                      : `⚠ Shortfall of ${formatCurrency(result.shortfall)}`
                    }
                  </p>
                </div>
                
                <div className="h-52">
                  <ChartContainer
                    config={{
                      savings: { 
                        label: "Retirement Savings",
                        color: "hsl(var(--primary))",
                      },
                      totalContributions: { 
                        label: "Total Contributions",
                        color: "hsl(var(--muted-foreground))",
                      },
                    }}
                    className="h-full"
                  >
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="age"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        width={80}
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-card p-3 shadow-md">
                                <p className="text-sm font-medium text-card-foreground mb-1">Age {label}</p>
                                <div className="space-y-1">
                                  {payload.map((entry, index) => (
                                    <div key={index} className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-2">
                                        <div 
                                          className="w-3 h-3 rounded-full" 
                                          style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-xs text-muted-foreground">
                                          {entry.dataKey === 'savings' ? 'Retirement Savings' : 'Total Contributions'}
                                        </span>
                                      </div>
                                      <span className="text-sm font-bold">
                                        {formatCurrency(entry.value as number)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{
                          r: 6,
                          fill: "hsl(var(--primary))",
                          strokeWidth: 2,
                          stroke: "hsl(var(--background))",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalContributions"
                        stroke="hsl(var(--muted-foreground))"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetirementCalculator;
