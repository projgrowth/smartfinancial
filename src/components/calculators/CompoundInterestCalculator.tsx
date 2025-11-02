
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { Info } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(20);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [result, setResult] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateCompoundInterest = () => {
    let totalAmount = principal;
    let yearlyData = [];
    
    for (let year = 1; year <= years; year++) {
      // For each year
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution
        totalAmount += monthlyContribution;
        
        // Apply monthly interest (annual rate divided by 12)
        totalAmount *= (1 + (rate / 100) / 12);
      }
      
      yearlyData.push({
        year,
        amount: Math.round(totalAmount),
        principal: principal + (monthlyContribution * 12 * year),
      });
    }
    
    setResult(Math.round(totalAmount));
    setChartData(yearlyData);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, years, monthlyContribution]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Compound Interest Calculator</CardTitle>
          <InteractiveTooltip
            trigger={<Info className="h-4 w-4 text-primary cursor-help" />}
            content={
              <div className="text-sm">
                <p>Compound interest allows your money to grow exponentially over time as you earn returns on both your initial investment and accumulated gains.</p>
              </div>
            }
            interactive
            title="About Compound Interest"
            maxWidth="md"
          />
        </div>
        <CardDescription>
          See how your investments can grow over time with the power of compound interest
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium text-foreground mb-1">
                Initial Investment
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="block w-full pl-8 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-medium text-foreground mb-1">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="block w-full pl-8 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-foreground mb-1">
                Annual Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  id="rate"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  step="0.1"
                  min="0"
                  max="30"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">%</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="years" className="block text-sm font-medium text-foreground mb-1">
                Time Period (years)
              </label>
              <input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="block w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                min="1"
                max="50"
              />
            </div>
          </div>
          
          <div>
            <div className="bg-accent/10 p-4 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground mb-1">Future Value</p>
              <p className="heading-md text-primary">{formatCurrency(result)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Total Contributions: {formatCurrency(principal + (monthlyContribution * 12 * years))}
              </p>
              <p className="text-sm text-success font-medium">
                Interest Earned: {formatCurrency(result - (principal + (monthlyContribution * 12 * years)))}
              </p>
            </div>
            
            <div className="h-52">
              <ChartContainer
                config={{
                  amount: { theme: { light: "#3B82F6", dark: "#60A5FA" } },
                  principal: { theme: { light: "#9CA3AF", dark: "#6B7280" } },
                }}
                className="h-full"
              >
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    tickLine={true}
                  />
                  <YAxis
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    width={80}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Year
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.year}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Amount
                                </span>
                                <span className="font-bold">
                                  {formatCurrency(payload[0].payload.amount)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="amount"
                    activeDot={{
                      r: 6,
                      fill: "#3B82F6",
                      style: { cursor: "pointer" },
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="principal"
                    stroke="#9CA3AF"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompoundInterestCalculator;
