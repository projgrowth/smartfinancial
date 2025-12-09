import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const CompoundInterestCalculator = React.memo(() => {
  // Display states (instant updates for UI responsiveness)
  const [displayPrincipal, setDisplayPrincipal] = useState<string>("10000");
  const [displayRate, setDisplayRate] = useState<string>("7");
  const [displayYears, setDisplayYears] = useState<string>("20");
  const [displayMonthlyContribution, setDisplayMonthlyContribution] = useState<string>("500");
  
  // Calculation states (debounced)
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(20);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [result, setResult] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateCompoundInterest = useCallback(() => {
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
  }, [principal, rate, years, monthlyContribution]);

  // Debounce display values to calculation states
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrincipal(Number(displayPrincipal) || 0);
      setRate(Number(displayRate) || 0);
      setYears(Number(displayYears) || 1);
      setMonthlyContribution(Number(displayMonthlyContribution) || 0);
    }, 750);
    return () => clearTimeout(timer);
  }, [displayPrincipal, displayRate, displayYears, displayMonthlyContribution]);

  // Recalculate when calculation states change
  useEffect(() => {
    calculateCompoundInterest();
  }, [calculateCompoundInterest]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const memoizedChartData = useMemo(() => chartData, [chartData]);

  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-150">
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
        <div className="grid-two-col gap-unified-md">
          <div className="space-component-xs">
            <div className="space-y-1">
              <label htmlFor="principal" className="form-label">
                Initial Investment
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <input
                  id="principal"
                  type="number"
                  value={displayPrincipal}
                  onChange={(e) => setDisplayPrincipal(e.target.value)}
                  className="block w-full pl-8 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="monthlyContribution" className="form-label">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <input
                  id="monthlyContribution"
                  type="number"
                  value={displayMonthlyContribution}
                  onChange={(e) => setDisplayMonthlyContribution(e.target.value)}
                  className="block w-full pl-8 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="rate" className="form-label">
                Annual Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  id="rate"
                  type="number"
                  value={displayRate}
                  onChange={(e) => setDisplayRate(e.target.value)}
                  className="block w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  step="0.1"
                  min="0"
                  max="30"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">%</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="years" className="form-label">
                Time Period (years)
              </label>
              <input
                id="years"
                type="number"
                value={displayYears}
                onChange={(e) => setDisplayYears(e.target.value)}
                className="block w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                min="1"
                max="50"
              />
            </div>
          </div>
          
          <div className="space-component-xs">
            <div className="bg-accent/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Future Value</p>
              <p className="heading-md text-primary">{formatCurrency(result)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Total Contributions: {formatCurrency(principal + (monthlyContribution * 12 * years))}
              </p>
              <p className="text-sm text-success font-medium">
                Interest Earned: {formatCurrency(result - (principal + (monthlyContribution * 12 * years)))}
              </p>
            </div>
            
            <div className="h-52 min-h-52 chart-contain">
              <ChartContainer
                config={{
                  amount: { theme: { light: "hsl(var(--accent))", dark: "hsl(var(--accent))" } },
                  principal: { theme: { light: "hsl(var(--muted-foreground))", dark: "hsl(var(--muted-foreground))" } },
                }}
                className="h-full"
              >
                <LineChart
                  data={memoizedChartData}
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
                            <div className="grid-two-col gap-unified-sm">
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
                      fill: "hsl(var(--accent))",
                      style: { cursor: "pointer" },
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="principal"
                    stroke="hsl(var(--muted-foreground))"
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
});

export default CompoundInterestCalculator;
