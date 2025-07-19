
import React, { useState } from 'react';
import { Info, X, Lightbulb, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Insight {
  id: string;
  title: string;
  content: string;
  type: 'tip' | 'insight' | 'warning';
  icon: React.ReactNode;
}

interface FloatingInsightsProps {
  insights: Insight[];
  className?: string;
}

const FloatingInsights: React.FC<FloatingInsightsProps> = ({ insights, className }) => {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);

  const getInsightStyles = (type: string) => {
    switch (type) {
      case 'tip':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'insight':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {insights.map((insight) => (
        <div key={insight.id} className="relative">
          <button
            onClick={() => setActiveInsight(activeInsight === insight.id ? null : insight.id)}
            className={cn(
              "flex items-center gap-3 w-full p-3 rounded-lg border transition-all duration-300 hover:shadow-md",
              getInsightStyles(insight.type),
              activeInsight === insight.id && "shadow-lg"
            )}
          >
            <div className="flex-shrink-0">
              {insight.icon}
            </div>
            <div className="flex-grow text-left">
              <h4 className="font-medium text-sm">{insight.title}</h4>
            </div>
            <div className="flex-shrink-0">
              {activeInsight === insight.id ? (
                <X className="w-4 h-4" />
              ) : (
                <Info className="w-4 h-4" />
              )}
            </div>
          </button>
          
          {activeInsight === insight.id && (
            <div className={cn(
              "absolute top-full left-0 right-0 mt-2 p-4 rounded-lg border shadow-lg bg-white z-10 animate-fade-in",
              "border-gray-200"
            )}>
              <p className="text-sm text-gray-700 leading-relaxed">
                {insight.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingInsights;
