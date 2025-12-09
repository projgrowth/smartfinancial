import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(1500);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const { chartData, retirementBalance, yearsToRetirement } = useMemo(() => {
    const years = retirementAge - currentAge;
    const data = [];
    let balance = currentSavings;
    
    for (let year = 0; year <= years; year++) {
      data.push({
        age: currentAge + year,
        balance: Math.round(balance),
      });
      
      // Compound monthly
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + expectedReturn / 100 / 12) + monthlyContribution;
      }
    }
    
    return {
      chartData: data,
      retirementBalance: Math.round(balance),
      yearsToRetirement: years,
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn]);

  const monthlyIncome = Math.round((retirementBalance * 0.04) / 12);

  return (
    <Card className="border-border/50 shadow-md">
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="form-label">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Retirement Age</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Current Savings</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
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
            <div>
              <label className="form-label">Expected Return (%)</label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="form-input"
                step="0.5"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Retirement Balance</p>
                <p className="text-2xl font-bold text-accent">${retirementBalance.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Years Until Retirement</p>
                <p className="text-xl font-semibold">{yearsToRetirement} years</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Est. Monthly Income (4% rule)</p>
                <p className="text-xl font-semibold text-primary">${monthlyIncome.toLocaleString()}/mo</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="hsl(var(--accent))" 
                fill="hsl(var(--accent) / 0.3)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetirementCalculator;