import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthlyContribution, setMonthlyContribution] = useState(500);

  const { chartData, finalValue, totalContributions, totalInterest } = useMemo(() => {
    const data = [];
    let balance = principal;
    let contributions = principal;
    
    for (let year = 0; year <= years; year++) {
      data.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(contributions),
      });
      
      // Add monthly contributions and compound
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + rate / 100 / 12) + monthlyContribution;
        contributions += monthlyContribution;
      }
    }
    
    return {
      chartData: data,
      finalValue: Math.round(balance),
      totalContributions: Math.round(contributions),
      totalInterest: Math.round(balance - contributions),
    };
  }, [principal, rate, years, monthlyContribution]);

  return (
    <Card className="border-border/50 shadow-md">
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="form-label">Initial Investment</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Annual Return Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="form-input"
                step="0.5"
              />
            </div>
            <div>
              <label className="form-label">Time Period (Years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Monthly Contribution</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Final Value</p>
                <p className="text-2xl font-bold text-accent">${finalValue.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Contributions</p>
                <p className="text-xl font-semibold">${totalContributions.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Interest Earned</p>
                <p className="text-xl font-semibold text-primary">${totalInterest.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="contributions" 
                stackId="1"
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.3)" 
                name="Contributions"
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stackId="2"
                stroke="hsl(var(--accent))" 
                fill="hsl(var(--accent) / 0.3)" 
                name="Total Balance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompoundInterestCalculator;