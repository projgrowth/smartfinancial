
import React, { useState, useEffect } from 'react';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle, EnhancedCardDescription } from '@/components/ui/enhanced-card';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { AnimatedCounter, AnimatedProgress } from '@/components/ui/animated-counter';
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { Info, TrendingUp, DollarSign, Calendar } from 'lucide-react';
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
    <EnhancedCard 
      variant="premium" 
      tiltEffect={false}
      hoverGlow={true}
      className="hover:shadow-elegant transition-all duration-500"
    >
      <EnhancedCardHeader>
        <div className="flex items-center card-gap-sm">
          <EnhancedCardTitle>Compound Interest Calculator</EnhancedCardTitle>
          <InteractiveTooltip
            trigger={<Info className="icon-sm text-primary cursor-help" />}
            content={
              <div className="text-body-sm">
                <p>Compound interest allows your money to grow exponentially over time as you earn returns on both your initial investment and accumulated gains.</p>
              </div>
            }
            interactive
            title="About Compound Interest"
            maxWidth="md"
          />
        </div>
        <EnhancedCardDescription>
          See how your investments can grow over time with the power of compound interest
        </EnhancedCardDescription>
      </EnhancedCardHeader>
      <EnhancedCardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 card-gap-lg">
          {/* Enhanced Input Section */}
          <div className="space-component-lg">
            <EnhancedInput
              label="Initial Investment"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              icon={<DollarSign className="icon-sm" />}
              floatingLabel={true}
              className="transition-all duration-300"
            />
            
            <EnhancedInput
              label="Monthly Contribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              icon={<DollarSign className="icon-sm" />}
              floatingLabel={true}
              className="transition-all duration-300"
            />
            
            <EnhancedInput
              label="Annual Interest Rate (%)"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              step="0.1"
              min="0"
              max="30"
              icon={<TrendingUp className="icon-sm" />}
              floatingLabel={true}
              className="transition-all duration-300"
            />
            
            <EnhancedInput
              label="Time Period (years)"
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              min="1"
              max="50"
              icon={<Calendar className="icon-sm" />}
              floatingLabel={true}
              className="transition-all duration-300"
            />
          </div>
          
          {/* Enhanced Results Section */}
          <div className="space-component-lg">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 card-padding rounded-xl border border-primary/10">
              <div className="space-component-md">
                <div className="text-center">
                  <p className="text-body-sm font-medium text-muted-foreground content-item">Future Value</p>
                  <AnimatedCounter 
                    value={result} 
                    prefix="$" 
                    className="text-3xl font-bold text-primary"
                    duration={parseInt(getComputedStyle(document.documentElement).getPropertyValue('--counter-duration')) || 2000}
                    separator=","
                    isVisible={result > 0}
                  />
                </div>
                
                <div className="grid grid-cols-1 card-gap-sm">
                  <div className="flex justify-between items-center card-padding-sm bg-background/50 rounded-lg">
                    <span className="text-body-sm text-muted-foreground">Total Contributions</span>
                    <AnimatedCounter 
                      value={principal + (monthlyContribution * 12 * years)}
                      prefix="$"
                      className="font-semibold text-foreground"
                      duration={1800}
                      separator=","
                      isVisible={result > 0}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center card-padding-sm bg-success-subtle rounded-lg">
                    <span className="text-body-sm text-green-700">Interest Earned</span>
                    <AnimatedCounter 
                      value={result - (principal + (monthlyContribution * 12 * years))}
                      prefix="$"
                      className="font-semibold text-green-600"
                      duration={2200}
                      separator=","
                      isVisible={result > 0}
                    />
                  </div>
                </div>
                
                {/* Growth Progress Bar */}
                <AnimatedProgress
                  value={((result - (principal + (monthlyContribution * 12 * years))) / result) * 100}
                  max={100}
                  label="Interest Growth Rate"
                  showValue={true}
                  color="success"
                  className="content-item"
                  duration={2000}
                  delay={500}
                />
              </div>
            </div>
            
            {/* Enhanced Chart */}
            <div className="h-64 card-padding bg-muted/20 rounded-xl">
              <ChartContainer
                config={{
                  amount: { theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
                  principal: { theme: { light: "hsl(var(--muted-foreground))", dark: "hsl(var(--muted-foreground))" } },
                }}
                className="h-full"
              >
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="year"
                    tickLine={true}
                    className="text-xs"
                  />
                  <YAxis
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    width={60}
                    className="text-xs"
                    axisLine={true}
                    tickLine={true}
                    type="number"
                    domain={['auto', 'auto']}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background/95 backdrop-blur-sm card-padding-sm shadow-elegant">
                            <div className="grid grid-cols-1 card-gap-sm">
                              <div className="text-center">
                                <span className="text-body-xs text-muted-foreground">Year {payload[0].payload.year}</span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold text-primary">
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
                    strokeWidth={3}
                    dataKey="amount"
                    stroke="hsl(var(--primary))"
                    activeDot={{
                      r: 6,
                      fill: "hsl(var(--primary))",
                      style: { cursor: "pointer" },
                    }}
                    className="drop-shadow-sm"
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
      </EnhancedCardContent>
    </EnhancedCard>
  );
};

export default CompoundInterestCalculator;
